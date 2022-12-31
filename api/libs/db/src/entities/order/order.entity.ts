import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Product } from '@app/db/entities/product/product.entity';

@Table({
  tableName: 'orders',
  timestamps: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
})
export class Order extends Model<Order> {
  @ForeignKey(() => Product)
  @Column
  product_id: number;

  @Column
  buyer_public_address: string;

  @Column
  seller_public_address: string;

  @Column
  price: number;

  @Column
  currency_symbol: string;

  @Column
  created_at: Date;

  @Column
  updated_at: Date;

  @Column
  deleted_at: Date;

  @BelongsTo(() => Product)
  product: Product;
}
