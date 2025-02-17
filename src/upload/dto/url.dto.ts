import { ApiProperty } from "@nestjs/swagger"

export class UrlDto{
    @ApiProperty()
    message:string
    @ApiProperty()
    imageUrl:string


}
