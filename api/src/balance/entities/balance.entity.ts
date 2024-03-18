import { Payment } from "../../payment/entities/payment.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'balances'})
export class Balance {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, type: 'varchar', length: 100 })
    name: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    description: string;

    @Column({ nullable: false, type: 'decimal', precision: 18, scale: 2})
    initialValue: number;

    @Column({ nullable: false, type: 'decimal', precision: 18, scale: 2})
    finalValue: number;

    @OneToMany(() => Payment, (payment) => payment.balance)
    payment: Payment[];
}
