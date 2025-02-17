import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
@Injectable()
export class PostService {

  constructor(
    @InjectRepository(Post)
    private readonly post: Repository<Post>) {
  }
  create(createPostDto: CreatePostDto) {
    try {
      this.post.save(createPostDto)
    } catch (error) {
      throw error
    }
    return '保存成功';
  }
  async findAll() {
    try {
      const result = await this.post.find()
      return result
    } catch (error) {
      throw error
    }
  }
  remove(postId: number) {
    try {
      this.post.delete(postId)
      return `This action removes a #${postId} post`;
    }
    catch (error) {
      throw error
    }
  }
  async getArticles(page: number, pageSize: number = 10) {
    const [items, total] = await this.post.findAndCount({
      take: pageSize, // 限制每页数据条数
      skip: (page - 1) * pageSize, // 跳过前面的数据
      order: {
        createTime: 'DESC' // 按创建时间倒序排列  
      },
    });
    return items;
  }
}
