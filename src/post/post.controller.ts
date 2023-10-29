import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { AtGuard } from 'src/commons/guards/access.token.guard';
import { User } from 'src/user/entities/user.entity';
import { GetUser } from 'src/commons/decorators/get.user.decorator';
import { ResponseMessage } from 'src/commons/decorators/response.key.decorator';
import { PostResponseMessage } from 'src/commons/class/post.response.message';
import { PostGuard } from 'src/commons/guards/post.guard';
import { GetPost } from 'src/commons/decorators/get.post.decorator';
import { Post as PostType } from './entities/post.entity';

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

    @Patch('like/:postId')
    @UseGuards(AtGuard, PostGuard)
    @ResponseMessage(PostResponseMessage.LIKE)
    async like(@GetPost() post: PostType) {
        return await this.postService.like(post);
    }

    @Patch('share/:postId')
    @UseGuards(AtGuard, PostGuard)
    @ResponseMessage(PostResponseMessage.SHARE)
    async share(@GetPost() post: PostType) {
        return await this.postService.share(post);
    }
}
