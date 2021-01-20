process.env.APP_ENVIRONMENT = 'test';

import FakeCashbackProvider from '@providers/CashbackProvider/fakes/FakeCashbackProvider';
import ShowAccumulatedCashbackService from '@services/ShowAccumulatedCashbackService';

let fakeCashbackProvider: FakeCashbackProvider;
let showCashback: ShowAccumulatedCashbackService;

describe('ShowAccumulatedCashbackService', () => {
  beforeEach(() => {
    fakeCashbackProvider = new FakeCashbackProvider();

    showCashback = new ShowAccumulatedCashbackService(
      fakeCashbackProvider
    );
  });

  describe('when the there is orders to list', () => {
    it('should be able to list orders', async () => {
      const cashback = await showCashback.execute('12312312323');

      expect(cashback).toEqual(
        expect.objectContaining({
          credit: expect.any(Number)
        })
      );
    });
  });
});
