import { Module } from '@nestjs/common';
import { DbModule } from '@app/db';
import { UtilsModule } from '@app/utils';
import { AuthController } from './auth.controller';
import { UserService } from '@app/db/entities/user/user.service';
import { userProvider } from '@app/db/entities/user/user.provider';
import { IsEmailUserAlreadyExistConstraint } from '@app/utils/decorators/email-exists.decorator';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@app/db/entities/user/auth/jwt.strategy';
import { UserController } from './user.controller';
import { SellerExistsDecorator } from '@app/utils/decorators/seller-exists.decorator';
import { ProductController } from './product.controller';
import { ProductService } from '@app/db/entities/product/product.service';
import { productProvider } from '@app/db/entities/product/product.provider';

@Module({
  imports: [
    UtilsModule,
    DbModule,
    PassportModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1440m' },
    }),
  ],
  controllers: [AuthController, UserController, ProductController],
  providers: [
    UserService,
    ...userProvider,
    ProductService,
    ...productProvider,
    IsEmailUserAlreadyExistConstraint,
    SellerExistsDecorator,
    // AuthService,
    JwtStrategy,
  ],
})
export class PanelAdminModule {}
