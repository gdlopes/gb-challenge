import { uuid } from 'uuidv4';

import IResellerRepository from '@repositories/interfaces/IResellerRepository';
import ICreateReseller from '@dtos/ICreateReseller';

import Reseller from '@models/Reseller';

class FakeResellerRepository implements IResellerRepository {
  private resellers: Reseller[] = [];

  public async create(data: ICreateReseller): Promise<Reseller> {
    const reseller = new Reseller();

    Object.assign(reseller, { id: uuid() }, data);

    this.resellers.push(reseller);

    return reseller;
  }

  public async findByEmail(email: string): Promise<Reseller | undefined> {
    const reseller = this.resellers.find(reseller => reseller.email === email);

    return reseller;
  }

  public async findByDocument(document: string): Promise<Reseller | undefined> {
    const reseller = this.resellers.find(reseller => reseller.document === document);

    return reseller;
  }
}

export default FakeResellerRepository;
