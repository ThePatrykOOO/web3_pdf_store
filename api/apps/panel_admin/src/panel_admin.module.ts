import { Module } from '@nestjs/common';
import { DbModule } from '@app/db';
import { UtilsModule } from '@app/utils';

@Module({
  imports: [UtilsModule, DbModule],
  controllers: [],
  providers: [],
})
export class PanelAdminModule {}
