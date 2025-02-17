import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { AdminJwt } from './admin/dto/admin.jwt';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from './common/roles.decorator';
import { Role } from './common/enmu';
import { ApiResponseWrapper } from './common/ApiResponseWrapper';
@Controller('test')
@ApiTags('测试用接口')
export class AppController {
  constructor(private readonly appService: AppService) {}



  @ApiBearerAuth()
  @Get('auth')
  @ApiResponseWrapper(String)
  getAuth(@Req() request:Request) {
    const admin = request['admin'] as AdminJwt
    return admin
  }
  @Roles(Role.SUPER_ADMIN)
  @ApiBearerAuth()
  @Get('/role')
  @ApiResponseWrapper(String)
  @ApiOperation({
    description:'是否为管理员',
    summary:'测试权限'
  })
  getRole(){
    return "管理员好"
  }

}
