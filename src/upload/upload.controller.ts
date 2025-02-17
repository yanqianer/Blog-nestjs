import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { Express } from 'express';  // 引入 Express 类型

import { ApiBody, ApiConsumes, ApiOperation, ApiTags ,ApiBearerAuth } from '@nestjs/swagger';
import { Public } from 'src/common/excludeAuth';
import { ApiResponseWrapper } from 'src/common/ApiResponseWrapper';
import { UrlDto } from './dto/url.dto';
import { Roles } from 'src/common/roles.decorator';
import { Role } from 'src/common/enmu';
@ApiTags('文件上传')
@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService: UploadService) { }
    @Post('image')
    @ApiOperation({ summary: '上传图片' }) 
    @UseInterceptors(FileInterceptor('file', { storage: new UploadService().storage }))
    @ApiConsumes('multipart/form-data')
    @ApiResponseWrapper(UrlDto)
    @ApiBearerAuth()
    @Roles(Role.SUPER_ADMIN)
    @ApiBody({
        description: '上传的图片文件',
        schema: {
          type: 'object',
          properties: {
            file: {
              type: 'string',
              format: 'binary', // Swagger 规定的二进制文件格式
            },
          },
        },
      })
    uploadImage(@UploadedFile() file: Express.Multer.File) {
      console.log(file)
      if (!file) {
        throw new Error('File is undefined');
      }
        return {
            message: '上传成功！',
            imageUrl: `/uploads/${file.filename}`, // 返回图片 URL
        };
    }
}
