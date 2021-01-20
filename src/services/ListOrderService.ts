import { injectable, inject } from 'tsyringe';

import logger from '@logger/';

import Order from '@models/Order';
import IOrderRepository from '@repositories/interfaces/IOrderRepository';

@injectable()
class ListOrderService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository
  ) { }

  public async execute(): Promise<Order[]> {
    const orders = await this.orderRepository.listAll();

    const formattedOrders = orders.map(order => {
      delete order.id;
      delete order.resellerDocument;

      return order;
    });

    logger.info(`There is ${formattedOrders.length} orders to list !`);

    return formattedOrders;
  }
}

export default ListOrderService;