import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from '@app/db/entities/user/auth/admin.guard';
import { ProductService } from '@app/db/entities/product/product.service';
import { Product } from '@app/db/entities/product/product.entity';
import { ProductDto } from './dto/product.dto';

@UseGuards(AdminGuard)
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('')
  async index(): Promise<Product[]> {
    return await this.productService.productList();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async show(@Param('id') id: number): Promise<Product> {
    return await this.productService.findProductById(id);
  }

  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async store(@Body() productDto: ProductDto): Promise<Product> {
    return await this.productService.storeProduct(productDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id') id: number,
    @Body() productDto: ProductDto,
  ): Promise<void> {
    await this.productService.updateProduct(id, productDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: number): Promise<void> {
    await this.productService.deleteProduct(id);
  }
}
