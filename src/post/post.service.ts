import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsException } from '../commons/exception.message';
@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>,
    ) {}

    async createPost(createPostDto): Promise<Post> {
        const { userId, ...createPost } = createPostDto;
        const result = await this.postRepository.save({
            ...createPost,
            user: {
                id: userId,
            },
        });
        return result;
    }

    async findOne(postId): Promise<Post | null> {
        return this.postRepository.findOne({ where: { id: postId } });
    }

    async getPost(postId): Promise<Post> {
        const findPost = await this.findOne(postId);
        if (!findPost) throw new BadRequestException(PostsException.POST_NOT_EXISTS);
        const viewCount = findPost.viewCount + 1;
        const result = await this.postRepository.save({ ...findPost, viewCount });
        return result;
    }
}
