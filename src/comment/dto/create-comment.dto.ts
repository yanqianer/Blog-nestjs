import { ApiProperty } from "@nestjs/swagger"


export class CreateCommentDto {
        @ApiProperty()
        content:string //内容
        @ApiProperty()
        adminId:number //谁评论的
        @ApiProperty()
        targetId:number //评论的哪个文章
}
