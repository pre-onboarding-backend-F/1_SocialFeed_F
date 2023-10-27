import { Body, Controller, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post()
    async createPost(@Body() createPostDto: CreatePostDto) {
        return await this.postService.createPost(createPostDto);
    }
}
