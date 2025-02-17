import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiOperation, ApiTags,ApiBearerAuth } from '@nestjs/swagger';
import { LoginAdminDto } from './dto/login-admin.dto';
import { Public } from 'src/common/excludeAuth';
import { ApiResponseWrapper } from 'src/common/ApiResponseWrapper';
import { AdminDto } from './dto/admin.dto';
import { ResLoginDto } from './dto/res.login.dto';
import { Roles } from 'src/common/roles.decorator';
import { Role } from 'src/common/enmu';
@Controller('admin')
@ApiTags('管理员接口')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Public()
  @Post('doLogin')
  @ApiOperation({
    summary:'登录接口'
  })
  @ApiResponseWrapper(ResLoginDto)
  doLogin(@Body() loginAdminDto:LoginAdminDto){
    return this.adminService.doLogin(loginAdminDto)
  }

  @Post()
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    summary:'添加用户接口'
  })
  @ApiResponseWrapper(String)
  @ApiBearerAuth()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }
  


  @Get()
  @ApiOperation({
    summary:'获取全部'
  })
  @Roles(Role.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiResponseWrapper(AdminDto,true)
  findAll() {
    return this.adminService.findAll();
  }
  @ApiBearerAuth()
  @Get(':id')
  @ApiOperation({
    summary:'获取某一个'
  })
  @Roles(Role.SUPER_ADMIN)
  @ApiResponseWrapper(AdminDto)
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary:'更新某一个'
  })
  @Roles(Role.SUPER_ADMIN)
  @ApiResponseWrapper(String)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary:'删除某个用户，同时删除他的所有评论'
  })
  @Roles(Role.SUPER_ADMIN)
  @ApiResponseWrapper(String)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
