import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateResellerService from '@services/CreateResellerService';
import { classToClass } from 'class-transformer';

export default class ResellerController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, document, email, password } = request.body;

    const createReseller = container.resolve(CreateResellerService);

    const reseller = await createReseller.execute({
      name,
      document,
      email,
      password
    });

    return response.json(classToClass(reseller))
  };
}
