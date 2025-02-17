
import { ApiProperty } from "@nestjs/swagger"
import { Gender } from 'src/common/enmu';

export class AdminDto {
    @ApiProperty()
    id:number
    @ApiProperty()
    name:string
    @ApiProperty()
    phoneNumber:string
    @ApiProperty()
    createTime:Date
    @ApiProperty()
    gender:Gender;
    @ApiProperty()
    role: string;

}