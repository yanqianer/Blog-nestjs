import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Admin } from './entities/admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
@Module({
  imports:[TypeOrmModule.forFeature([Admin]),
  PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.register({
    global: true,
    secret: jwtConstants.secret, // 从环境变量获取密钥
    signOptions: { expiresIn: '2h' }, // 令牌有效期
  }),
],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
