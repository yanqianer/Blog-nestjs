import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { request } from 'http';
import { AdminJwt } from 'src/admin/dto/admin.jwt';
import { Article } from 'src/article/entities/article.entity';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponseWrapper } from 'src/common/ApiResponseWrapper';
import { CommentDto } from './dto/comment.dto';
import { Public } from 'src/common/excludeAuth';
import { Roles } from 'src/common/roles.decorator';
import { Role } from 'src/common/enmu';
@ApiTags('评论功能')
@Controller('comment')

export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @ApiOperation({
    summary:'创建一条评论'
  })
  @Post()
  @Roles(Role.SUPER_ADMIN,Role.ADMIN)
  @ApiBearerAuth()
  @ApiResponseWrapper(String)
  create(@Body() createCommentDto: CreateCommentDto,@Req() request:Request) {
    const admin = request['admin'] as AdminJwt
    createCommentDto.adminId = admin.id
    return this.commentService.create(createCommentDto);
  }
  @Public()
  @ApiOperation({
    summary:'获取某个文章的评论'
  })
  @Get(':id')
  @ApiBearerAuth()
  @ApiResponseWrapper(CommentDto,true)
  findAllByArticleId(@Param('id') ArticleId:number) {
    return this.commentService.findAllByArticleId(ArticleId);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.commentService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
  //   return this.commentService.update(+id, updateCommentDto);
  // }
  @ApiOperation({
    summary:'删除某篇文章的全部评论'
  })
  @Delete(':articleId')
  @ApiBearerAuth()
  @ApiResponseWrapper(String)
  @Roles(Role.SUPER_ADMIN)
  remove(@Param('articleId') articleId: string) {
    return this.commentService.removeByArticleId(+articleId);
  }
  


}
