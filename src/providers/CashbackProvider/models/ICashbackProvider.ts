import ICashbackProviderResponse from '@dtos/ICashbackProviderResponse';

export default interface ICashbackProvider {
  get(document: string): Promise<ICashbackProviderResponse>;
}
