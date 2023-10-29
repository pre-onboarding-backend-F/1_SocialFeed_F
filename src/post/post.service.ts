import { User } from './../user/entities/user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository, Brackets, SelectQueryBuilder } from 'typeorm';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsException, StatsException } from '../commons/exception.message';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsQueryDto } from './dto/query-post.dto';
import { orderMappings } from 'src/commons/enums/order-role.enum';
import { SearchRole } from 'src/commons/enums/search-role.enum';

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
  
    async like(post: Post) {
        await this.postRepository.update(post.id, { likeCount: post.likeCount + 1 });
    }

    async share(post: Post) {
        await this.postRepository.update(post.id, { shareCount: post.shareCount + 1 });
    }

    async paginateQuery(query: SelectQueryBuilder<Post>, page: number, pageCount: number): Promise<Post[]> {
        const skip = page * pageCount;
        const posts = await query.skip(skip).take(pageCount).getMany();
        return posts;
    }

    async findPosts(query: PostsQueryDto, account: string) {
        const { type, hashtag, orderBy, order, search, searchBy, page } = query;

        let { pageCount } = query;
        pageCount = pageCount || 10;

        const qb = this.postRepository.createQueryBuilder('post');

        if (type) qb.where('post.type = :type', { type });

        if (hashtag) {
            const jsonHashtag = JSON.stringify(hashtag);
            qb.where('JSON_CONTAINS(post.hashtags, :hashtag) = 1', { hashtag: jsonHashtag });
        } else {
            qb.andWhere('JSON_CONTAINS(post.hashtags, JSON_QUOTE(:hashtag)) = 1', { hashtag: account });
        }

        if (orderMappings[orderBy]) {
            qb.orderBy(`post.${orderMappings[orderBy]}`, order === 'asc' ? 'ASC' : 'DESC');
        }

        if (search) {
            if (searchBy === SearchRole.titleContent) {
                qb.andWhere(
                    new Brackets((subQuery) => {
                        subQuery
                            .where('post.title LIKE :search', { search: `%${search}%` })
                            .orWhere('post.content LIKE :search', { search: `%${search}%` });
                    }),
                );
            } else {
                qb.andWhere(`post.${SearchRole[searchBy]} LIKE :search`, { search: `%${search}%` });
            }
        }

        const posts = await this.paginateQuery(qb, page, pageCount);

        const resultPosts = posts.map((post) => {
            if (post.content.length > 20) post.content = post.content.substring(0, 20) + '...';

            return post;
        });

        const response = {
            posts: resultPosts,
            postCount: resultPosts.length,
            pageCount: pageCount,
            page: page,
        };

        return response;
    }
}
