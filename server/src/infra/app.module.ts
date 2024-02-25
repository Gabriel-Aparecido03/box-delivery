import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { CryptographyModule } from './cryptography/cryptography.module';
import { AuthModule } from './auth/auth.module';
import { HttpModule } from './http/http.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [DatabaseModule,CryptographyModule,AuthModule,HttpModule,EventsModule],
})
export class AppModule {}
