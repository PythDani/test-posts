import { Controller, Post as HttpPost, Body, Get, Param, UseGuards, Request } from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../shared/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @HttpPost('create')
  create(@Body('message') message: string, @Request() req) {
    console.log('user', req.user);
    return this.postsService.create(message, req.user.userId);
  }

  @Get('all')
  findAll() {
    return this.postsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @HttpPost(':id/like')
  like(@Param('id') id: number) {
    return this.postsService.likePost(id);
  }
}
