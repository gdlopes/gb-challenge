import ICashbackProvider from '../models/ICashbackProvider';

import ICashbackProviderResponse from '@dtos/ICashbackProviderResponse';

class FakeCashbackProvider implements ICashbackProvider {
  public async get(document: string): Promise<ICashbackProviderResponse> {
    const randomNumber = () => {
      return Math.floor(Math.random() * (2000 - 0 + 1)) + 0;
    }

    return {
      credit: randomNumber()
    };
  }
}

export default FakeCashbackProvider;
