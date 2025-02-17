import { Column, Entity, PrimaryGeneratedColumn,CreateDateColumn,ManyToOne, OneToMany } from "typeorm";
import { Admin } from "src/admin/entities/admin.entity";
import { Article } from "src/article/entities/article.entity";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id:number //id 
    @Column()
    content:string //内容
    @ManyToOne(()=>Admin,{
        eager:true,//自动查出关联的
    })
    admin:Admin //谁评论的
    @Column()
    targetId:number //评论的哪个文章
    @CreateDateColumn()
    createTime: Date;  // 创建时间，默认当前时间
}
