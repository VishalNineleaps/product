import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { EnumType } from "typescript";


export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
}


@Entity('user')
export class User {

    constructor(username: string, password: string, role: UserRole) {
        this.username = username;
        this.password = password;
        this.user_role=role;
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;
    
    @Column({
        type: 'enum',
        enum:UserRole,
        default: UserRole.USER
    })
    user_role: UserRole;
}