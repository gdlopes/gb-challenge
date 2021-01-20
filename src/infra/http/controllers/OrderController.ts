import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateOrderService from '@services/CreateOrderService';
import ListOrderService from '@services/ListOrderService';

export default class OrderController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      code,
      value,
      resellerDocument
    } = request.body;

    const createOrder = container.resolve(CreateOrderService);

    const reseller = await createOrder.execute({
      code,
      value,
      resellerDocument
    });

    return response.json(classToClass(reseller))
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listOrders = container.resolve(ListOrderService);

    const orders = await listOrders.execute();

    return response.json(orders);
  }
}
