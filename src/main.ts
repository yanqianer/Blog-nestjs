import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ResponseResult } from './common/ResponseResult';
import { CatchEverythingFilter } from './common/GlobalExceptionFilter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import helmet from 'helmet';
async function bootstrap() {
  const options = new DocumentBuilder()
    .setTitle('中文文档')
    .setDescription('开发文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const document = SwaggerModule.createDocument(app, options,{
    extraModels: [ResponseResult],
  });
  SwaggerModule.setup('/api-docs', app, document,{
    jsonDocumentUrl:'api-json',
  });
  app.enableCors();
  const httpAdapterHost =app.get(HttpAdapterHost)
  app.useGlobalFilters(new CatchEverythingFilter(httpAdapterHost));
  app.useStaticAssets(join(__dirname, '..', 'uploads'), { prefix: '/uploads' });
  app.use(helmet());
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
