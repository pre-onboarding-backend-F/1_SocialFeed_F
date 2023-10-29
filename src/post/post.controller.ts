import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post()
    async createPost(@Body() createPostDto: CreatePostDto) {
        return await this.postService.createPost(createPostDto);
    }

    @Get('/:postId')
    async getPost(@Param('postId') postId: String) {
        return await this.postService.getPost(postId);
    }
}
