import { ApiProperty } from "@nestjs/swagger"

export class CreateAnonymousDto {
    @ApiProperty()
    name:string
    @ApiProperty()
    email:string
    @ApiProperty()
    content:string
    @ApiProperty()
    targetId:number 



}
