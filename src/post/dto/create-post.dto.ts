import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {


    @ApiProperty()
    name:string
    @ApiProperty()
    images:string
    @ApiProperty()
    content:string


}
