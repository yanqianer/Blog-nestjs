import { ApiProperty } from "@nestjs/swagger"
import { AdminDto } from "./admin.dto"
export class ResLoginDto{
    @ApiProperty()
    user:AdminDto
    @ApiProperty()
    access_token:string
}