import { Injectable } from '@nestjs/common';
import { CreateAnonymousDto } from './dto/create-anonymous.dto';
import { UpdateAnonymousDto } from './dto/update-anonymous.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Anonymous } from './entities/anonymous.entity';
@Injectable()
export class AnonymousService {

  constructor(
    @InjectRepository(Anonymous)
    private readonly anonymous: Repository<Anonymous>
  ) {
  }


  create(createAnonymousDto: CreateAnonymousDto) {
    try {
      this.anonymous.save(createAnonymousDto)

    } catch (error) {
      throw error
    }
    return '保存成功';
  }

  async findAllByArticleId(articleId:number) {
    try {
      const result = await this.anonymous.find({
        where:{
          targetId:articleId
        }
      })
      return result;
    } catch (error) {
      throw error
    }

  }


  remove(articleId: number) {
    try{
      this.anonymous.delete({
        targetId:articleId
      })
    }catch(error){
      throw error
    }

    return `博客${articleId} 的评论删除完毕`;
  }
}
