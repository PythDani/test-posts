import { IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsNotEmpty()
  message!: string;

  @Column()
  userId!: number;

  @Column()
  publishedAt!: Date;

  @Column({ default: 0 })
  likes!: number;
}
