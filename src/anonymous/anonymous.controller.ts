import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnonymousService } from './anonymous.service';
import { CreateAnonymousDto } from './dto/create-anonymous.dto';
import { UpdateAnonymousDto } from './dto/update-anonymous.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiResponseWrapper } from 'src/common/ApiResponseWrapper';
import { Public } from 'src/common/excludeAuth';
import { Roles } from 'src/common/roles.decorator';
import { Role } from 'src/common/enmu';
import { AnonymousDto } from './dto/anonymous.dto';
@ApiTags('匿名评论功能')
@Controller('anonymous')
export class AnonymousController {
  constructor(private readonly anonymousService: AnonymousService) { }
  @ApiOperation({
    summary: '匿名创建评论'
  })
  @ApiResponseWrapper(String)
  @Post()
  @Public()
  create(@Body() createAnonymousDto: CreateAnonymousDto) {
    return this.anonymousService.create(createAnonymousDto);
  }

  @Public()
  @ApiOperation({
    summary: '获取某个文章的匿名评论'
  })
  @Get(':articleId')
  @ApiBearerAuth()
  @ApiResponseWrapper(AnonymousDto, true)
  findAllByArticleId(@Param('articleId') articleId:number) {
    return this.anonymousService.findAllByArticleId(+articleId);
  }


  @ApiOperation({
    summary:'删除某篇文章的全部匿名评论'
  })
  @Delete(':articleId')
  @ApiBearerAuth()
  @ApiResponseWrapper(String)
  @Roles(Role.SUPER_ADMIN)
  remove(@Param('articleId') articleId: number) {
    return this.anonymousService.remove(+articleId);
  }
}
