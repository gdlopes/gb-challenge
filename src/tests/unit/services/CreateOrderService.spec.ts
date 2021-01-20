process.env.APP_ENVIRONMENT = 'test';

import HandleError from '@middlewares/handleError';

import FakeOrderRepository from '@repositories/fakes/FakeOrderRepository';
import FakeResellerRepository from '@repositories/fakes/FakeResellerRepository';
import CreateOrderService from '@services/CreateOrderService';

let fakeOrderRepository: FakeOrderRepository;
let fakeResellerRepository: FakeResellerRepository;
let createOrder: CreateOrderService;

describe('CreateOrderService', () => {
  beforeEach(() => {
    fakeOrderRepository = new FakeOrderRepository();
    fakeResellerRepository = new FakeResellerRepository();

    createOrder = new CreateOrderService(
      fakeOrderRepository,
      fakeResellerRepository
    );
  });

  describe('when the order has all the information needed', () => {
    it('should be able to create a new order', async () => {
      await fakeResellerRepository.create({
        name: 'Gustavo Lopes',
        document: '12312312309',
        email: 'gustavo@gmail.com',
        password: '123456'
      });

      const order = await createOrder.execute({
        code: '123',
        resellerDocument: '12312312309',
        value: 200
      });

      expect(order.resellerDocument).toBe('12312312309');
    });
  });

  describe('when the order has value lower than 1000', () => {
    it('should calculate 10% of cashback', async () => {
      await fakeResellerRepository.create({
        name: 'Gustavo Lopes',
        document: '12312312309',
        email: 'gustavo@gmail.com',
        password: '123456'
      });

      const order = await createOrder.execute({
        code: '123',
        resellerDocument: '12312312309',
        value: 800
      });

      expect(order.cashbackValue).toBe('80');
    });
  });

  describe('when the order has value between 1000 and 1500', () => {
    it('should calculate 15% of cashback', async () => {
      await fakeResellerRepository.create({
        name: 'Gustavo Lopes',
        document: '12312312309',
        email: 'gustavo@gmail.com',
        password: '123456'
      });

      const order = await createOrder.execute({
        code: '123',
        resellerDocument: '12312312309',
        value: 1300
      });

      expect(order.cashbackValue).toBe('195');
    });
  });

  describe('when the order has value bigger than 1500', () => {
    it('should calculate 20% of cashback', async () => {
      await fakeResellerRepository.create({
        name: 'Gustavo Lopes',
        document: '12312312309',
        email: 'gustavo@gmail.com',
        password: '123456'
      });

      const order = await createOrder.execute({
        code: '123',
        resellerDocument: '12312312309',
        value: 2000
      });

      expect(order.cashbackValue).toBe('400');
    });
  });

  describe('when the order has an invalid document', () => {
    it('should not be able to create an order', async () => {
      await expect(
        createOrder.execute({
          code: '123',
          resellerDocument: '123123123099999999',
          value: 200
        })
      ).rejects.toBeInstanceOf(HandleError);
    });
  });

  describe('when the order had a non existing reseller', () => {
    it('should not be able to create an order', async () => {
      expect(
        createOrder.execute({
          code: '123',
          resellerDocument: '99999999999',
          value: 200
        })
      ).rejects.toBeInstanceOf(HandleError);
    });
  });

  describe('when the order has special document (15350946056)', () => {
    it('should create order with status APROVADO', async () => {
      await fakeResellerRepository.create({
        name: 'Special reseller',
        document: '15350946056',
        email: 'teste@gmail.com',
        password: '123456'
      });

      const order = await createOrder.execute({
        code: '123',
        resellerDocument: '15350946056',
        value: 200
      });

      expect(order.status).toBe('Aprovado');
    });
  });
});
