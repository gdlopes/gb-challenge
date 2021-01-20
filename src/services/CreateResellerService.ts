import { injectable, inject } from 'tsyringe';

import HandleError from '@middlewares/handleError';
import logger from '@logger/';

import Reseller from '@models/Reseller';
import IResellerRepository from '@repositories/interfaces/IResellerRepository';
import IHashProvider from '@providers/HashProvider/models/IHashProvider';

interface IRequest {
  name: string;
  document: string;
  email: string;
  password: string;
};

@injectable()
class CreateResellerService {
  constructor(
    @inject('ResellerRepository')
    private resellerRepository: IResellerRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) { }

  public async execute(resellerData: IRequest): Promise<Reseller> {
    const resellerExists = await this.resellerRepository.findByEmail(resellerData.email);

    if (resellerExists) throw new HandleError('Email already used.');

    const hashedPassword = await this.hashProvider.generateHash(resellerData.password)

    const reseller = await this.resellerRepository.create({
      ...resellerData,
      password: hashedPassword
    });

    logger.info(`New reseller created !`);

    return reseller;
  }
}

export default CreateResellerService;