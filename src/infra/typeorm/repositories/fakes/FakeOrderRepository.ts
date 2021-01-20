import { uuid } from 'uuidv4';

import IOrderRepository from '@repositories/interfaces/IOrderRepository';
import ICreateOrder from '@dtos/ICreateOrder';

import Order from '@models/Order';

class FakeOrderRepository implements IOrderRepository {
  private orders: Order[] = [];

  public async create(data: ICreateOrder): Promise<Order> {
    const order = new Order();

    Object.assign(order, data);

    this.orders.push(order);

    return order;
  }

  public async listAll(): Promise<Order[]> {
    const orders = this.orders;

    return orders;
  }
}

export default FakeOrderRepository;
