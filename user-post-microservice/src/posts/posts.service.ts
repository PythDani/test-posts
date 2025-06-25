import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    private readonly httpService: HttpService,
  ) {}

  create(message: string, userId: number) {
    const post = this.postsRepository.create({
      message,
      userId,
      publishedAt: new Date(),
    });
    return this.postsRepository.save(post);
  }

  // findAll() {
  //   return this.postsRepository.find({ order: { publishedAt: 'DESC' } });
  // }

  async findAll() {
    const posts = await this.postsRepository.find({ order: { publishedAt: 'DESC' } });

    // Fetch users in parallel
    const postsWithUsers = await Promise.all(
      posts.map(async (post) => {
        try {
          const userResponse = await lastValueFrom(
            this.httpService.get(`http://auth-service:3000/users/${post.userId}`)
          );
          return {
            ...post,
            user: userResponse.data,
          };
        } catch (e) {
          return {
            ...post,
            user: null,
          };
        }
      }),
    );

    return postsWithUsers;
  }

  async likePost(id: number) {
    const post = await this.postsRepository.findOne({ where: { id } });
    if (post) {
      post.likes += 1;
      return this.postsRepository.save(post);
    }
    return null;
  }
}
