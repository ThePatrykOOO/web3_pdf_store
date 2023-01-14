import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Memcache from 'memcache-pp';
import * as memcachedStore from 'cache-manager-memcached-store';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    CacheModule.register({
      store: memcachedStore,
      driver: Memcache,
      isGlobal: true,
      host: process.env.MEMCACHE_HOST || 'localhost',
      port: process.env.MEMCACHE_PORT || '11211',
    }),
  ],
  providers: [],
  exports: [],
})
export class UtilsModule {}
