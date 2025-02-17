import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiResponseWrapper } from 'src/common/ApiResponseWrapper';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ArticleDto } from './dto/article.dto';
import { AdminDto } from 'src/admin/dto/admin.dto';
import { Public } from 'src/common/excludeAuth';
import { Role } from 'src/common/enmu';
import { Roles } from 'src/common/roles.decorator';
@Controller('article')
@ApiTags('文章接口')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @ApiOperation({description:'创建文章',summary:'创建文章'})
  @ApiResponseWrapper(String)
  @ApiBearerAuth()
  @Roles(Role.SUPER_ADMIN)
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }
  @Public()
  @Get()
  @ApiOperation({summary:'获取全部'})
  @ApiResponseWrapper(ArticleDto,true)
  findAll() {
    return this.articleService.findAll();
  }
  
  @Get('articleTitle/:title')
  @ApiOperation({summary:'标题搜索'})
  @ApiResponseWrapper(ArticleDto,true)
  @Public()
  findOneByTitle(@Param('title') title: string) {
    return this.articleService.findOneByTitle(title);
  }
  @Public()
  @Get('articleId/:id')
  @ApiOperation({summary:'id搜索'})
  @ApiResponseWrapper(ArticleDto)
  @ApiBearerAuth()
  findOneById(@Param('id')id:string){
    return this.articleService.findOneById(+id)

  }

  @Patch(':id')
  @ApiOperation({summary:'更新文章'})
  @ApiResponseWrapper(String)
  @ApiBearerAuth()
  @Roles(Role.SUPER_ADMIN)
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  @ApiOperation({summary:'删除文章 文章评论一并删除'})
  @ApiResponseWrapper(String)
  @ApiBearerAuth()
  @Roles(Role.SUPER_ADMIN)
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }

}
