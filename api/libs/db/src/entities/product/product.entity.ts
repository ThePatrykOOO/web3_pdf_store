import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '@app/db/entities/user/user.entity';

export enum CurrencySymbol {
  ETH = 'ETH',
  // BTC = 'BTC', TODO to implement
}

@Table({
  tableName: 'products',
  timestamps: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
})
export class Product extends Model<Product> {
  @ForeignKey(() => User)
  @Column
  seller_id: number;

  @Column
  name: string;

  @Column
  slug: string;

  @Column
  description: string;

  @Column
  price: number;

  @Column
  currency_symbol: CurrencySymbol;

  @Column
  created_at: Date;

  @Column
  updated_at: Date;

  @Column
  deleted_at: Date;

  @BelongsTo(() => User)
  seller: User;
}
