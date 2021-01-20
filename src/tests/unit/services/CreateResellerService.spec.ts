process.env.APP_ENVIRONMENT = 'test';

import HandleError from '@middlewares/handleError';

import FakeResellerRepository from '@repositories/fakes/FakeResellerRepository';
import FakeHashRepository from '@providers/HashProvider/fakes/FakeHashProvider';
import CreateResellerService from '@services/CreateResellerService';

let fakeResellerRepository: FakeResellerRepository;
let fakeHashRepository: FakeHashRepository;
let createReseller: CreateResellerService;

describe('CreateResellerService', () => {
  beforeEach(() => {
    fakeHashRepository = new FakeHashRepository();
    fakeResellerRepository = new FakeResellerRepository();

    createReseller = new CreateResellerService(
      fakeResellerRepository,
      fakeHashRepository
    );
  });

  describe('when the reseller has all the information needed', () => {
    it('should be able to create a new reseller', async () => {
      const reseller = await createReseller.execute({
        name: 'Gustavo Lopes',
        document: '12312312309',
        email: 'gustavo@gmail.com',
        password: '123456'
      });

      expect(reseller.name).toBe('Gustavo Lopes');
    });
  });

  describe('when the reseller has an email already used', () => {
    it('should not be able to create a new reseller', async () => {
      const reseller = await createReseller.execute({
        name: 'Gustavo Lopes',
        document: '12312312309',
        email: 'gustavo@gmail.com',
        password: '123456'
      });

      await expect(
        createReseller.execute({
          name: 'Gustavo Lopes',
          document: '12312312309',
          email: 'gustavo@gmail.com',
          password: '123456'
        })
      ).rejects.toBeInstanceOf(HandleError);
    });
  });
});
