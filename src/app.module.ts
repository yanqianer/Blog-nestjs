import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { ResponseInterceptor } from './common/interceptor/ResInterceptor';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from './common/auth.guard';
import { ArticleModule } from './article/article.module';
import { CommentModule } from './comment/comment.module';
import { UploadModule } from './upload/upload.module';
import { RolesGuard } from './common/roles.guard';
import { AnonymousModule } from './anonymous/anonymous.module';
import { PostModule } from './post/post.module';
import { ThrottlerModule,ThrottlerGuard } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    imports: [ConfigModule], // 引入 ConfigModule
    inject: [ConfigService], // 注入 ConfigService
    useFactory:(configService: ConfigService)=>({

      type: 'mysql',
      host: configService.get<string>('DATABASE_HOST'),
      port: configService.get<number>('DATABASE_PORT'), 
      username: configService.get<string>('DATABASE_USERNAME'),
      password: configService.get<string>('DATABASE_PASSWORD'),
      database: 'nodejs',
      synchronize: true,
      autoLoadEntities: true,
    })
   
  }), AdminModule, ArticleModule, CommentModule, UploadModule, AnonymousModule, PostModule,
  
  ThrottlerModule.forRoot([{
    ttl: 10000,
    limit: 10,

  }]),
  ConfigModule.forRoot({
    envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    isGlobal: true,
  })

],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    },
     {
      provide: APP_GUARD,
    useClass: ThrottlerGuard,
    } 
  ],
})
export class AppModule { }
