import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowAccumulatedCashbackService from '@services/ShowAccumulatedCashbackService';

export default class CashbackController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { document } = request.params;

    const showCashback = container.resolve(ShowAccumulatedCashbackService);

    const accumulatedCashback = await showCashback.execute(document);

    return response.json({
      reseller: document,
      accumulatedCashback
    });
  };
}
