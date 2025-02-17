import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';

import { plainToInstance } from 'class-transformer';
import { Comment } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from 'src/admin/entities/admin.entity';
@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly comment: Repository<Comment>
  ) { }
  async create(createCommentDto: CreateCommentDto) { // TODO:如果有一个不存在的角色发送创建评论请求，会导致服务崩溃，需要检验角色合法性。除了评论创建还有其他地方需要验证角色合法性吗，
    const newComment = plainToInstance(Comment, createCommentDto)
    console.log(newComment)
    newComment.admin = {
      id: createCommentDto.adminId//评论创建时用户非法会报错，其他的呢，我有什么其他的数据库操作需要用到合法的用户吗？删除某个角色时顺便删评论？这个应该没事，我的评论都是具有外键约束的，所以有就是合法的，就可以删除
    } as Admin
    try {
      await this.comment.save(newComment)
    } catch (error) {
      throw error
    }
    return '添加成功';
  }

  async findAllByArticleId(ArticleId: number) {
    const list = await this.comment.find({
      where: {
        targetId: ArticleId

      }
    })
    return list;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} comment`;
  // }

  // update(id: number, updateCommentDto: UpdateCommentDto) {
  //   return `This action updates a #${id} comment`;
  // }
  //删除某篇文章的全部评论
  removeByArticleId(articleId: number) {
    return this.comment.delete({
      targetId: articleId
    })
  }

  //删除某个角色的全部评论
  removeByAdminId(adminId: number) {
    return this.comment.delete({
      admin: {
        id: adminId
      }
    })
  }
}
