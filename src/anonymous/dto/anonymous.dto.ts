import { ApiProperty } from "@nestjs/swagger"



export class AnonymousDto {
    @ApiProperty()
    id:number
    @ApiProperty()
    name:string
    @ApiProperty()
    email:string
    @ApiProperty()
    content:string
    @ApiProperty()
    createTime:Date
    // @Column()
    // avatar: string; // 头像 URL
}
