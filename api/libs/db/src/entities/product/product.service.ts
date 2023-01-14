import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '@app/db/entities/product/product.entity';
import { ProductDto } from '../../../../../apps/panel_admin/src/dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: typeof Product,
  ) {}

  async productList(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }

  async findProductById(id: number): Promise<Product> {
    const product: Product = await this.productRepository.findOne({
      where: { id: id },
    });

    if (!product) {
      throw new NotFoundException(Product, 'Product not found');
    }
    return product;
  }

  async storeProduct(productDto: ProductDto): Promise<Product> {
    return await this.productRepository.create({
      seller_id: productDto.seller_id,
      name: productDto.name,
      slug: this.generateSlugProduct(productDto.name),
      description: productDto.description,
      price: productDto.price,
      currency_symbol: productDto.currency_symbol,
    });
  }

  async updateProduct(id: number, productDto: ProductDto): Promise<void> {
    const product: Product = await this.findProductById(id);

    product.seller_id = productDto.seller_id;
    product.name = productDto.name;
    product.slug = this.generateSlugProduct(productDto.name);
    product.description = productDto.description;
    product.price = productDto.price;
    product.currency_symbol = productDto.currency_symbol;
    await product.save();
  }

  async deleteProduct(id: number) {
    const product: Product = await this.findProductById(id);
    await product.destroy();
  }

  private generateSlugProduct(name): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}
