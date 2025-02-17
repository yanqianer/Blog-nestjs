import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository, DataSource } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { LoginAdminDto } from './dto/login-admin.dto';
import { JwtService } from '@nestjs/jwt';
import { AdminJwt } from './dto/admin.jwt';
import { Comment } from 'src/comment/entities/comment.entity';

@Injectable()
export class AdminService {
  constructor(@InjectRepository(Admin) private readonly admin: Repository<Admin>,
    private jwtService: JwtService,
    private dataSource: DataSource

  ) { }

  async doLogin(loginAdminDto: LoginAdminDto) {

    try {
      const admin = await this.admin.findOne({
        where: {
          name: loginAdminDto.name
        }
      })

      if (!admin) {
        throw new NotFoundException('未查找到用户')

      }
      if (loginAdminDto.password != admin.password) {
        throw new UnauthorizedException('密码错误')
      }
      const { password, ...result } = admin

      const payload = { id: admin.id, name: admin.name,role:admin.role };
      // const payload = new AdminJwt(admin.id,admin.name)

      return {
        user: result,
        access_token: await this.jwtService.signAsync(payload),
      };
    }
    catch (error) {
      throw error
    };
  }
  create(createAdminDto: CreateAdminDto) {
    const admin = plainToInstance(Admin, createAdminDto);
    try {
      this.admin.save(admin);
    }
    catch (error) {
      throw new HttpException(error.message, 500)
    }
    return '保存成功'
  }

  findAll() {
    // return this.admin.find();
    const data = this.admin.find()
    data.then((res) => {
      res.forEach((res) => {
        const { password, ...result } = res
        return result
      })
    })
    return data
  }
  findOneByName(name: string) {
    return this.admin.findOne({
      where: {
        name: name
      }
    })
  }
  async findOne(id: number) {

    const data = await this.admin.findOne({
      where: {
        id: id
      }
    })
      return data

  }
  async update(id: number, updateAdminDto: UpdateAdminDto) {
    return this.admin.update(id, updateAdminDto)
  }
  //事务
  async remove(id: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect()
    await queryRunner.startTransaction()

    try {
      await queryRunner.manager.delete(Comment, {
        admin: {
          id: id
        }
      })//删除一定要自底向上删除，这里要先删除comment，因为admin被comment依赖着,不能先删除admin
      await queryRunner.manager.delete(Admin, id)
      await queryRunner.commitTransaction();
      
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.log(error)
      throw error
    }
    finally {
      await queryRunner.release();
    }
    return '删除成功'
  }



}
