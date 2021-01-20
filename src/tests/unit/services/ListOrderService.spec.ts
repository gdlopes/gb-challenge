process.env.APP_ENVIRONMENT = 'test';

import FakeOrderRepository from '@repositories/fakes/FakeOrderRepository';
import ListOrderService from '@services/ListOrderService';

let fakeOrderRepository: FakeOrderRepository;
let listOrders: ListOrderService;

describe('ListOrderService', () => {
  beforeEach(() => {
    fakeOrderRepository = new FakeOrderRepository();

    listOrders = new ListOrderService(
      fakeOrderRepository
    );
  });

  describe('when the there is orders to list', () => {
    it('should be able to list orders', async () => {
      await fakeOrderRepository.create({
        code: '123',
        value: '1000',
        resellerDocument: '12312312323',
        cashbackValue: '100',
        status: 'Em validação'
      });

      const orders = await listOrders.execute();

      expect(orders).toEqual(
        expect.arrayContaining([
          {
            code: '123',
            value: '1000',
            cashbackValue: '100',
            status: 'Em validação'
          }
        ])
      );
    });
  });
});
