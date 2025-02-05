import { Module } from '@nestjs/common';
import { MessagesModule } from '@messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PeopleModule } from '@people/people.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: process.env.ENVIRONMENT === 'dev',
    }),
    MessagesModule,
    PeopleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
