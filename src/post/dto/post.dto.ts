import { ApiProperty } from "@nestjs/swagger";


export class PostDto {
    
    @ApiProperty()
    id: number
    @ApiProperty()
    name: string
    @ApiProperty()
    handle: string
    @ApiProperty()
    createTime: Date
    @ApiProperty()
    images: string
    @ApiProperty()
    content: string

}