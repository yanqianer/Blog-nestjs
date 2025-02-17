import { Entity } from "typeorm";
import { PrimaryGeneratedColumn,Column,CreateDateColumn } from "typeorm";


@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    name:string
    @Column({default:'wzz'})
    handle:string
    @CreateDateColumn()
    createTime:Date
    @Column({type:'text'})
    images:string
    @Column()
    content:string
}
