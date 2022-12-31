import { Column, Model, Table } from 'sequelize-typescript';

export enum UserRole {
  SELLER = 'SELLER',
  ADMIN = 'ADMIN',
}

@Table({
  tableName: 'users',
  timestamps: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
})
export class User extends Model<User> {
  @Column
  first_name: string;

  @Column
  last_name: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column({ defaultValue: UserRole.SELLER })
  role: UserRole;

  @Column
  public_address: string;

  @Column
  created_at: Date;

  @Column
  updated_at: Date;

  @Column
  deleted_at: Date;
}
