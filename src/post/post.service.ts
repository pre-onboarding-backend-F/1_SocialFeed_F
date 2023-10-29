import { User } from './../user/entities/user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsException } from '../commons/exception.message';
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

    async like(post: Post) {
        await this.postRepository.update(post.id, { likeCount: post.likeCount + 1 });
    }

    async share(post: Post) {
        await this.postRepository.update(post.id, { shareCount: post.shareCount + 1 });
    }
}
