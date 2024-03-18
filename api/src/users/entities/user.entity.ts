import {
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    Entity,
  } from 'typeorm';

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    name: string;

    @Column({ unique: true, nullable: false, type: 'varchar', length: 200 })
    email: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    password: string;

    @CreateDateColumn()
    createdAt: Date;
}
