import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import logger from '@logger/';

import ICashbackProvider from '@providers/CashbackProvider/models/ICashbackProvider';
import ICashbackProviderResponse from '@dtos/ICashbackProviderResponse';

@injectable()
class ShowAccumulatedCashbackService {
  constructor(
    @inject('CashbackProvider')
    private cashbackProvider: ICashbackProvider
  ) { }

  public async execute(document: string): Promise<ICashbackProviderResponse> {
    const accumulatedCashback = await this.cashbackProvider.get(document);

    logger.info(`The accumulated cashback for the reseller #${document} is ${accumulatedCashback.credit}`);

    return accumulatedCashback;
  }
}

export default ShowAccumulatedCashbackService;