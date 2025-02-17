import { ApiProperty } from "@nestjs/swagger";


export class LoginAdminDto{
    @ApiProperty()
    name:string
    @ApiProperty()
    password:string
}