import { ApiProperty } from "@nestjs/swagger"
import { Gender } from "src/common/enmu"

export class CreateAdminDto {
        @ApiProperty()
        name:string
        @ApiProperty()
        password:string
        @ApiProperty()
        phoneNumber:string
        @ApiProperty()
        gender:Gender
        @ApiProperty()
        role:string
}
