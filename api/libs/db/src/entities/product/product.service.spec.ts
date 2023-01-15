import { Sequelize } from 'sequelize';
import { testingDb } from '@app/utils/testing/testing-db';
import { ProductService } from '@app/db/entities/product/product.service';
import {
  CurrencySymbol,
  Product,
} from '@app/db/entities/product/product.entity';
import { ProductDto } from '../../../../../apps/panel_admin/src/dto/product.dto';
import { User, UserRole } from '@app/db/entities/user/user.entity';

describe('ProductService', () => {
  let productService: ProductService;
  let db: Sequelize;

  beforeAll(async () => {
    // Initiate Sequelize with SQLite and our models
    db = await testingDb([Product, User]);

    // Instantiate our service with our model
    productService = new ProductService(Product);
  });

  afterEach(async () => {
    await db.truncate();
  });

  afterAll(() => db.close());
  //
  it('should return product list', async (): Promise<void> => {
    await Product.create();
    await Product.create();
    await Product.create();

    const result: Product[] = await productService.productList();

    expect(result).toHaveLength(3);
  });

  it('should return product by id', async (): Promise<void> => {
    const product: Product = await Product.create();

    const result: Product = await productService.findProductById(product.id);

    expect(result.id).toEqual(product.id);
  });

  it('should return Product by id with not exists', async (): Promise<void> => {
    try {
      await productService.findProductById(0);
    } catch (e) {
      expect(e.message).toBe('Not Found Exception');
    }
  });

  it('should store product success', async (): Promise<void> => {
    const user: User = await User.create({
      email: 'john@example.com',
      role: UserRole.SELLER,
    });

    const dto: ProductDto = {
      seller_id: user.id,
      name: 'Product',
      description: 'Lorem Ipsum',
      price: 0.2,
      currency_symbol: CurrencySymbol.ETH,
    };

    await productService.storeProduct(dto);

    expect(
      await Product.findOne({
        where: {
          seller_id: user.id,
          name: 'Product',
          description: 'Lorem Ipsum',
          price: 0.2,
          currency_symbol: CurrencySymbol.ETH,
        },
      }),
    ).toBeTruthy();
  });

  it('should update product success', async (): Promise<void> => {
    const user: User = await User.create({
      email: 'john@example.com',
      role: UserRole.SELLER,
    });

    const product: Product = await Product.create();

    const dto: ProductDto = {
      seller_id: user.id,
      name: 'Product',
      description: 'Lorem Ipsum',
      price: 0.2,
      currency_symbol: CurrencySymbol.ETH,
    };
    await productService.updateProduct(product.id, dto);

    expect(
      await Product.findOne({
        where: {
          seller_id: user.id,
          name: 'Product',
          description: 'Lorem Ipsum',
          price: 0.2,
          currency_symbol: CurrencySymbol.ETH,
        },
      }),
    ).toBeTruthy();
  });

  it('should delete product success', async (): Promise<void> => {
    const user: User = await User.create({
      email: 'john@example.com',
      role: UserRole.SELLER,
    });

    const product: Product = await Product.create({
      seller_id: user.id,
      name: 'Product',
      description: 'Lorem Ipsum',
      price: 0.2,
      currency_symbol: CurrencySymbol.ETH,
    });

    await productService.deleteProduct(product.id);

    expect(
      await Product.findOne({
        where: {
          id: product.id,
        },
      }),
    ).toBeFalsy();
  });
});
