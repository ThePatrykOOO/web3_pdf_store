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
  controllers: [AuthController],
  providers: [
    UserService,
    ...userProvider,
    IsEmailUserAlreadyExistConstraint,
    // AuthService,
    JwtStrategy,
  ],
})
export class PanelAdminModule {}
