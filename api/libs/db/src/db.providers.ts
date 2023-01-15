import { Sequelize } from 'sequelize-typescript';
import * as process from 'process';
import { User } from '@app/db/entities/user/user.entity';
import { Product } from '@app/db/entities/product/product.entity';
import { Order } from '@app/db/entities/order/order.entity';

export const dbProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        logging: parseInt(process.env.DB_LOGGING, 0) === 1,
      });
      // Add below all models
      sequelize.addModels([User, Product, Order]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
