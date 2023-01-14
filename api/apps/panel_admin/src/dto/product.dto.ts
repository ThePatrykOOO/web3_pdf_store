import { IsEnum, IsNumber, IsString, Length, Min } from 'class-validator';
import { CurrencySymbol } from '@app/db/entities/product/product.entity';
import { IsSellerExist } from '@app/utils/decorators/seller-exists.decorator';

export class ProductDto {
  @IsSellerExist()
  public seller_id: number;

  @IsString()
  @Length(3, 255)
  public name: string;

  @IsString()
  @Length(20, 2000)
  public description: string;

  @IsNumber()
  @Min(0)
  public price: number;

  @IsEnum(CurrencySymbol)
  public currency_symbol: CurrencySymbol;
}
