import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Injectable()
export class UploadService {
  storage = diskStorage({
    destination: './uploads', // 存储目录
    filename: (req, file, callback) => {
      if (!file) {
        return callback(new Error('No file uploaded'), '');
      }
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const fileExt = extname(file.originalname);
      callback(null, `${uniqueSuffix}${fileExt}`);
    },
  });
}
