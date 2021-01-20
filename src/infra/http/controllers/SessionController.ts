import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateResellerService from '@services/AuthenticateResellerService';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateReseller = container.resolve(AuthenticateResellerService);

    const { reseller, token } = await authenticateReseller.execute({
      email,
      password
    });

    return response.json({ reseller, token });
  };
}
