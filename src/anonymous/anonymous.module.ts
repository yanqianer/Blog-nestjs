import { Module } from '@nestjs/common';
import { AnonymousService } from './anonymous.service';
import { AnonymousController } from './anonymous.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Anonymous } from './entities/anonymous.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Anonymous])],
  controllers: [AnonymousController],
  providers: [AnonymousService],
})
export class AnonymousModule {}
