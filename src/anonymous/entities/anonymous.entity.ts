import { Column, Entity,CreateDateColumn,PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Anonymous {
   @PrimaryGeneratedColumn()
    id:number
    @Column()
    name:string
    @Column({default:'test@.com'})
    email:string
    @Column({type:'text'})
    content:string
    @CreateDateColumn()
    createTime:Date
    @Column()
    targetId:number //评论的哪个文章
    // @Column()
    // avatar: string; // 头像 URL
}
