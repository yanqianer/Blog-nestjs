import { ApiProperty } from "@nestjs/swagger";
import { Admin } from "src/admin/entities/admin.entity";
import { AdminDto } from "src/admin/dto/admin.dto";
export class CommentDto{
        @ApiProperty()
        id:number //id 
        @ApiProperty()
        content:string //内容
        @ApiProperty()
        admin:AdminDto //谁评论的
        @ApiProperty()
        targetId:number //评论的哪个文章
        @ApiProperty()
        createTime: Date;  // 创建时间，默认当前时间

}