import Order from '@models/Order';
import ICreateOrder from '@dtos/ICreateOrder';

export default interface IResellerRepository {
  create(data: ICreateOrder): Promise<Order>;
  listAll(): Promise<Order[]>;
}