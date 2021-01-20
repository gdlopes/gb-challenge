import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orders')
class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  value: string;

  @Column()
  cashbackValue: string;

  @Column('timestamp with time zone')
  date: Date;

  @Column()
  resellerDocument: string;

  @Column()
  status: string;
}

export default Order;