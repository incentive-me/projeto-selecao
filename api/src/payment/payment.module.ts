import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Balance } from 'src/balance/entities/balance.entity';
import { Payment } from './entities/payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Balance])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
