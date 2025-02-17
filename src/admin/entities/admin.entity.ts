
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Gender,Role } from 'src/common/enmu';
@Entity()
export class Admin {
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    name:string
    @Column({default:'111111'})
    password:string
    @Column()
    phoneNumber:string
    @Column({type:"timestamp",default: () => 'CURRENT_TIMESTAMP'})
    createTime:Date
    @Column({
        type:"enum",
        enum:Gender,
        default:Gender.UNKNOWN
    })
    gender:Gender;
    @Column({
        type: 'enum',
        enum: Role,
        default: Role.ADMIN,
    })
    role: string;
}
