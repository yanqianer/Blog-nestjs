import { Column } from "typeorm";

export class comment2{
    id:number;

    name:string

    email:string

    @Column({type:'text'})
    content:string

    avatar:string


}