import { injectable, inject } from 'tsyringe';

import HandleError from '@middlewares/handleError';
import logger from '@logger/';

import Order from '@models/Order';
import IOrderRepository from '@repositories/interfaces/IOrderRepository';
import IResellerRepository from '@repositories/interfaces/IResellerRepository';

interface IRequest {
  code: string;
  value: number;
  resellerDocument: string;
};

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,

    @inject('ResellerRepository')
    private resellerRepository: IResellerRepository
  ) { }

  public async execute(orderData: IRequest): Promise<Order> {
    const { code, value, resellerDocument } = orderData;

    const formattedDocument = resellerDocument.replace(/[^\d]+/g, '');

    if (formattedDocument.length !== 11) {
      throw new HandleError('Invalid document format.');
    }

    const resellerExists = await this.resellerRepository.findByDocument(formattedDocument);

    if (!resellerExists) {
      throw new HandleError('Reseller not found.');
    }

    const status = formattedDocument === '15350946056'
      ? 'Aprovado'
      : 'Em validação';

    let cashbackPercentage;

    if (value <= 1000) {
      cashbackPercentage = 0.1;
    } else if (value > 1000 && value <= 1500) {
      cashbackPercentage = 0.15;
    } else {
      cashbackPercentage = 0.2;
    }

    const cashbackValue = value * cashbackPercentage;

    const order = await this.orderRepository.create({
      code,
      value: String(value),
      cashbackValue: String(cashbackValue),
      resellerDocument: formattedDocument,
      date: new Date(),
      status
    });

    logger.info(`New order created for the reseller #${resellerExists.document}. OrderID: ${order.id}`);

    return order;
  }
}

export default CreateOrderService;