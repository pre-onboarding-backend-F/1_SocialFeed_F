import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { AtGuard } from 'src/commons/guards/access.token.guard';
import { User } from 'src/user/entities/user.entity';
import { GetUser } from 'src/commons/decorators/get.user.decorator';
import { ResponseMessage } from 'src/commons/decorators/response.key.decorator';
import { PostResponseMessage } from 'src/commons/class/post.response.message';

@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post()
    @UseGuards(AtGuard)
    @ResponseMessage(PostResponseMessage.CREATE_POST)
    async createPost(@GetUser() user: User, @Body() createPostDto: CreatePostDto) {
        return await this.postService.createPost(user, createPostDto);
    }

    @Get('/:postId')
    async getPost(@Param('postId') postId: string) {
        return await this.postService.getPost(postId);
    }
}
