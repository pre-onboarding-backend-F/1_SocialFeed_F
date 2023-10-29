import { User } from './../user/entities/user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsException, StatsException } from '../commons/exception.message';
import { CreatePostDto } from './dto/create-post.dto';
@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
    ) {}

    async createPost(user: User, createPostDto: CreatePostDto): Promise<Post> {
        const { title, content, hashtags, type } = createPostDto;

        if (Array.isArray(hashtags)) {
            const newPost = this.postRepository.create({
                title,
                content,
                hashtags: [user.account, ...hashtags],
                type,
                user,
            });

            await this.postRepository.save(newPost);
            return newPost;
        } else {
            const newPost = this.postRepository.create({
                title,
                content,
                hashtags: [user.account, hashtags],
                type,
                user,
            });
            await this.postRepository.save(newPost);
            return newPost;
        }
    }

    async findOne(postId: string): Promise<Post | null> {
        return this.postRepository.findOne({ where: { id: postId } });
    }

    async getPost(postId: string): Promise<Post> {
        const findPost = await this.findOne(postId);
        if (!findPost) throw new BadRequestException(PostsException.POST_NOT_EXISTS);
        const viewCount = findPost.viewCount + 1;
        const result = await this.postRepository.save({ ...findPost, viewCount });
        return result;
    }

    async getStats(statsQueryDto) {
        if (!statsQueryDto.value) statsQueryDto.value = 'COUNT';
        if (!statsQueryDto.end) statsQueryDto.end = new Date().toISOString();
        if (!statsQueryDto.start) {
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
            statsQueryDto.start = sevenDaysAgo.toISOString();
        }
        const svenDays = 7 * 24 * 60 * 60 * 1000;

        if (new Date(statsQueryDto.end).getTime() - new Date(statsQueryDto.start).getTime() > svenDays)
            throw new BadRequestException(StatsException.STATS_MAX_SEVEN_DAY);

        const qb = this.postRepository.createQueryBuilder('post').select('DATE(post.createdAt');

        if (statsQueryDto.value === 'count') {
            //qb.addSelect('COUNT(post.id)', 'sum');
        } else if (statsQueryDto.value === 'view_count') {
            qb.addSelect('COUNT(viewCount)', 'sum');
        } else if (statsQueryDto.value === 'like_count') {
            qb.addSelect('COUNT(likeCount)', 'sum');
        } else if (statsQueryDto.value === 'share_count') {
            qb.addSelect('COUNT(shareCount)', 'sum');
        }

        const result = await qb
            .andWhere('DATE(post.createdAt) BETWEEN (:start, INTERVAL 1 DAY) AND :end', {
                start: statsQueryDto.start,
                end: statsQueryDto.end,
            })
            .groupBy('DATE(post.createdAt)')
            .getRawMany();
    }
}
