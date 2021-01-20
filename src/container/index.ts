import 'reflect-metadata';

import { container } from 'tsyringe';

import IResellerRepository from '@repositories/interfaces/IResellerRepository';
import ResellerRepository from '@repositories/ResellerRepository';

import IHashProvider from '@providers/HashProvider/models/IHashProvider';
import HashProvider from '@providers/HashProvider/implementations/BCryptHashProvider';

import IOrderRepository from '@repositories/interfaces/IOrderRepository';
import OrderRepository from '@repositories/OrderRepository';

import ICashbackProvider from '@providers/CashbackProvider/models/ICashbackProvider';
import BoticarioCashbackProvider from '@providers/CashbackProvider/implementations/BoticarioCashbackProvider';

container.registerSingleton<IResellerRepository>(
  'ResellerRepository',
  ResellerRepository
);

container.registerSingleton<IHashProvider>(
  'HashProvider',
  HashProvider
);

container.registerSingleton<IOrderRepository>(
  'OrderRepository',
  OrderRepository
);

container.registerSingleton<ICashbackProvider>(
  'CashbackProvider',
  BoticarioCashbackProvider
);