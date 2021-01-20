process.env.APP_ENVIRONMENT = 'test';

import HandleError from '@middlewares/handleError';

import FakeResellerRepository from '@repositories/fakes/FakeResellerRepository';
import FakeHashProvider from '@providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateReseller from '@services/AuthenticateResellerService';

let fakeResellerRepository: FakeResellerRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateReseller: AuthenticateReseller;

describe('AuthenticateReseller', () => {
  beforeEach(() => {
    fakeResellerRepository = new FakeResellerRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateReseller = new AuthenticateReseller(
      fakeResellerRepository,
      fakeHashProvider
    );
  });

  describe('when the reseller uses the right credential', () => {
    it('should be able to authenticate', async () => {
      const reseller = await fakeResellerRepository.create({
        name: 'Gustavo Lopes',
        document: '12312312309',
        email: 'gustavo@gmail.com',
        password: '123456'
      });

      const response = await authenticateReseller.execute({
        email: 'gustavo@gmail.com',
        password: '123456',
      });

      expect(response).toHaveProperty('token');
      expect(response.reseller).toEqual(reseller);
    });
  });

  describe('when the reseller try to authenticate an non existing email', () => {
    it('should not be able to authenticate', async () => {
      await expect(
        authenticateReseller.execute({
          email: 'gustavo@gmail.com',
          password: '123456',
        })
      ).rejects.toBeInstanceOf(HandleError);
    });
  });

  describe('when the reseller try to authenticate an invalid password', () => {
    it('should not be able to authenticate', async () => {
      await fakeResellerRepository.create({
        name: 'Gustavo Lopes',
        document: '12312312309',
        email: 'gustavo@gmail.com',
        password: '123456'
      });

      await expect(
        authenticateReseller.execute({
          email: 'gustavo@gmail.com',
          password: 'invalid-password',
        })
      ).rejects.toBeInstanceOf(HandleError);
    });
  });
});
