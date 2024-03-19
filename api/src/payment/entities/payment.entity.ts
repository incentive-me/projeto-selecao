import { Balance } from "../../balance/entities/balance.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'payments'})
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, type: 'varchar', length: 100 })
    name: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    description: string;

    @Column({ nullable: false, type: 'decimal', precision: 18, scale: 2})
    value: number;

    @ManyToOne(() => Balance)
    @JoinColumn({ name: 'id_balance' })
    balance: Balance;
}
