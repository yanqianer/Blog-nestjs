import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBearerAuth, ApiOperation, ApiResetContentResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/excludeAuth';
import { ApiResponseWrapper } from 'src/common/ApiResponseWrapper';
import { PostDto } from './dto/post.dto';

@ApiTags('动态接口')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  
  @ApiOperation({
    description: '创建一个帖子',
    summary:'创建一个帖子'
  })
  @ApiBearerAuth()
  @Post()
  @ApiResponseWrapper(String)
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }
  @ApiResponseWrapper(PostDto,true)
  @Public()
  @ApiOperation({
    description: '获取全部帖子',
    summary:'获取全部帖子'
  })
  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @ApiOperation({
    description: '删除某一个帖子',
    summary:'删除某一个帖子'
  })
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }


  @Public()
  @ApiOperation({
    summary:'分页请求获取'
  })
  @ApiResponseWrapper(PostDto,true)
  @Get(':page')
  getByPage(@Param('page') page:number){
    return this.postService.getArticles(page)
  }



}
