import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
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
}
