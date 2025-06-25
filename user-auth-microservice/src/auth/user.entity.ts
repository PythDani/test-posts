import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
 import { IsString, IsEmail, Length, IsNotEmpty } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  name!: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  lastname!: string;

  @Length(3, 20)
  @IsNotEmpty()
  @Column()
  birthdate!: string;
  
  @Length(3, 20)
  @IsNotEmpty()
  @Column()
  username!: string;

  
  @Column()
  @IsNotEmpty()
  password!: string;
}
