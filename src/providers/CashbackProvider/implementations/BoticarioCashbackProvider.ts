import axios from 'axios';

import ICashbackProvider from '../models/ICashbackProvider';
import ICashbackProviderResponse from '@dtos/ICashbackProviderResponse';

export default class BoticarioCashbackProvider implements ICashbackProvider {
  public async get(document: string): Promise<ICashbackProviderResponse> {
    const url = `${process.env.PROVIDER_URL}?cpf=${document}`;
    const config = {
      headers: {
        Authorization: `Bearer ${process.env.PROVIDER_TOKEN}`
      }
    }

    const apiResponse = await axios.get(url, config);
    const { body: { credit } } = apiResponse.data;

    return { credit };
  }
}