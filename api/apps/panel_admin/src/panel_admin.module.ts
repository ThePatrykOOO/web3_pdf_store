import { Module } from '@nestjs/common';
import { DbModule } from '@app/db';
import { UtilsModule } from '@app/utils';
import { AuthController } from './auth.controller';
import { UserService } from '@app/db/entities/user/user.service';
import { userProvider } from '@app/db/entities/user/user.provider';
import { IsEmailUserAlreadyExistConstraint } from '@app/utils/decorators/email-exists.decorator';

@Module({
  imports: [UtilsModule, DbModule],
  controllers: [AuthController],
  providers: [UserService, ...userProvider, IsEmailUserAlreadyExistConstraint],
})
export class PanelAdminModule {}
