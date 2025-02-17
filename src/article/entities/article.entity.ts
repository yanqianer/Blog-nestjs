import { Comment } from 'src/comment/entities/comment.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @CreateDateColumn()
    createTime: Date;  // 创建时间，默认当前时间

    @UpdateDateColumn()
    updateTime: Date;  // 更新时间，每次修改都会自动更新

    @Column({ default: 'test' })
    image: string;

    @Column({ type: 'longtext' })
    content: string;



}
