import { HttpException, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { Like, Repository,DataSource } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CommentService } from 'src/comment/comment.service';
import { Comment } from 'src/comment/entities/comment.entity';


@Injectable()
export class ArticleService {

  constructor(
      @InjectRepository(Article)
      private readonly article:Repository<Article>,
      private dataSource: DataSource
  ){}
  async create(createArticleDto: CreateArticleDto) {
    const newArticle = {} as Article
    Object.assign(newArticle,createArticleDto)
    try{this.article.save(newArticle)}
    catch(error){
      throw new HttpException(error.message,500)
    }
    return 'This action adds a new article';
  }
  findAll() {
    return this.article.find();
  }
  async findOneByTitle(title:string) {
    const article =  await this.article.findOne({
      where:{
        title:Like(`%${title}%`)
      }
    })
    if (!article) {
      throw new HttpException(`名字 为 ${title} 的文章不存在`,500);
    }
    return article
    
  }
   async findOneById(id:number){
    
     const article = await this.article.findOne({
      where:{
        id:id
      }
    })
    if (!article) {
      throw new HttpException(`ID 为 ${id} 的文章不存在`,500);
    }
    return article
  }
  async findOne(article:Article){
    return this.article.findOne({
      where:article
    })
  }
  async update(id: number, updateArticleDto: UpdateArticleDto) {
     this.article.update(id,updateArticleDto)
     return '更新成功'
  }
  
  async remove(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect()
    await queryRunner.startTransaction()
    
    try{
        await queryRunner.manager.delete(Article,id)
        await queryRunner.manager.delete(Comment,{
          targetId:id
        })
        await queryRunner.commitTransaction();

    }catch(error){
      await queryRunner.rollbackTransaction();
    }
    finally{
      await queryRunner.release();
    }
    return '删除成功'
  } 
}
