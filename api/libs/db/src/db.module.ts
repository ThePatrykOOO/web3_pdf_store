import { Module } from '@nestjs/common';
import { dbProviders } from '@app/db/db.providers';

@Module({
  providers: [...dbProviders],
  exports: [...dbProviders],
})
export class DbModule {}
