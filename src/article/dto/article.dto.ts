import { ApiProperty } from "@nestjs/swagger";



export class ArticleDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    title: string;
    @ApiProperty()
    createTime: Date;  // 创建时间，默认当前时间
    @ApiProperty()
    updateTime: Date;  // 更新时间，每次修改都会自动更新
    @ApiProperty()
    image: string;
    @ApiProperty()
    content: string;
}
