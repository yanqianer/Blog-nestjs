import { ApiProperty } from '@nestjs/swagger';

export class ResponseResult<T> {
  @ApiProperty({ description: '响应状态码' })
    code: number;
    @ApiProperty({ description: '响应消息' })
    msg: string;
    @ApiProperty({ description: '响应数据', required: false })
    data?: T;
    @ApiProperty({ description: '响应时间' })
    timestamp: number;
  
    constructor(code: number, msg: string, data?: T) {
      this.code = code;
      this.msg = msg;
      this.data = data;
      this.timestamp = Date.now();
    }
  }
  