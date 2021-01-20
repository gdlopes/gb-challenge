import Reseller from '@models/Reseller';
import ICreateReseller from '@dtos/ICreateReseller';

export default interface IResellerRepository {
  create(data: ICreateReseller): Promise<Reseller>;
  findByEmail(email: string): Promise<Reseller | undefined>;
  findByDocument(document: string): Promise<Reseller | undefined>;
}