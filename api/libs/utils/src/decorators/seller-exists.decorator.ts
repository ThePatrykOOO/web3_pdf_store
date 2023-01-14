import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UserService } from '@app/db/entities/user/user.service';

@ValidatorConstraint({ name: 'isSellerExist', async: true })
@Injectable()
export class SellerExistsDecorator implements ValidatorConstraintInterface {
  constructor(protected readonly usersService: UserService) {}

  async validate(id: number): Promise<boolean> {
    return await this.usersService.sellerExists(id);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'Seller not exists.';
  }
}

export function IsSellerExist(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: SellerExistsDecorator,
    });
  };
}
