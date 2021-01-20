import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import HandleError from '@middlewares/handleError';

import Reseller from '@models/Reseller';

import IResellerRepository from '@repositories/interfaces/IResellerRepository';
import IHashProvider from '@providers/HashProvider/models/IHashProvider';

import authConfig from '@config/auth';
import logger from '@logger/';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  reseller: Reseller;
  token: string;
}

@injectable()
class AuthenticateResellerService {
  constructor(
    @inject('ResellerRepository')
    private resellerRepository: IResellerRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) { }
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const reseller = await this.resellerRepository.findByEmail(email);

    if (!reseller) throw new HandleError('Incorrect email or password !');

    const passwordMatched = await this.hashProvider.compareHash(password, reseller.password);

    if (!passwordMatched) throw new HandleError('Incorrect email or password !');

    delete reseller.password;

    const token = sign({}, authConfig.secret, {
      subject: reseller.id,
      expiresIn: authConfig.expiresIn
    });

    logger.info(`Reseller #${reseller.document} authenticated !`);

    return {
      reseller,
      token
    };
  }
}

export default AuthenticateResellerService;