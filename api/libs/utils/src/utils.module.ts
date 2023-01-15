import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Memcache from 'memcache-pp';
import * as memcachedStore from 'cache-manager-memcached-store';
import { DbModule } from '@app/db';

@Module({
  imports: [
    DbModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    CacheModule.register({
      store: memcachedStore,
      driver: Memcache,
      isGlobal: true,
      options: {
        hosts: [`${process.env.MEMCACHE_HOST}:${process.env.MEMCACHE_PORT}`],
      },
    }),
  ],
  providers: [],
  exports: [],
})
export class UtilsModule {}
