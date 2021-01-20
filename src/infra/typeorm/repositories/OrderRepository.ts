import { getRepository, Repository } from 'typeorm';

import IOrderRepository from '@repositories/interfaces/IOrderRepository';
import ICreateOrder from '@dtos/ICreateOrder';

import Order from '@models/Order';

export default class OrderRepository implements IOrderRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  public async create(data: ICreateOrder): Promise<Order> {
    const order = await this.ormRepository.create(data);

    await this.ormRepository.save(order);

    return order;
  }

  public async listAll(): Promise<Order[]> {
    const orders = await this.ormRepository.find();

    return orders;
  }
};