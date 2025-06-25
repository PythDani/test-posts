import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../shared/jwt.strategy';
import { HttpModule  } from '@nestjs/axios';
import { SeedService } from './seed.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
    HttpModule 
  ],
  controllers: [PostsController],
  providers: [PostsService, JwtStrategy, SeedService],
})
export class PostsModule {}
