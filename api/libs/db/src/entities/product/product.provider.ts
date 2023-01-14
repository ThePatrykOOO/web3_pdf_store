import { Product } from '@app/db/entities/product/product.entity';

export const productProvider = [
  {
    provide: 'PRODUCT_REPOSITORY',
    useValue: Product,
  },
];
