import { getRepository, Repository } from 'typeorm';

import IResellerRepository from '@repositories/interfaces/IResellerRepository';
import ICreateReseller from '@dtos/ICreateReseller';

import Reseller from '@models/Reseller';

export default class ResellerRepository implements IResellerRepository {
  private ormRepository: Repository<Reseller>;

  constructor() {
    this.ormRepository = getRepository(Reseller);
  }

  public async create(data: ICreateReseller): Promise<Reseller> {
    const reseller = await this.ormRepository.create(data);

    await this.ormRepository.save(reseller);

    return reseller;
  }

  public async findByEmail(email: string): Promise<Reseller | undefined> {
    const resellerExists = await this.ormRepository.findOne({
      where: {
        email
      }
    });

    return resellerExists;
  }

  public async findByDocument(document: string): Promise<Reseller | undefined> {
    const resellerExists = await this.ormRepository.findOne({
      where: {
        document
      }
    });

    return resellerExists;
  }
};