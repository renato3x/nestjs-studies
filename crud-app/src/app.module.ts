import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MessagesModule } from '@messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PeopleModule } from '@people/people.module';
import { SimpleMiddleware } from '@common/middlewares/simple.middleware';
import { APP_FILTER } from '@nestjs/core';
import { ErrorHandlerFilter } from '@common/filters/error-handler.filter';

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
  providers: [
    /*
      This is how you can use a Filter globally.
      This way lets you use the Nest's Dependency Injection.

      you can set global filters in main.ts file using the `useGlobalFilters` function
      but you will not have the Nest's Dependency Injection in these filters
    */
    {
      provide: APP_FILTER,
      useClass: ErrorHandlerFilter,
    },
  ],
})
export class AppModule implements NestModule {
  /* 
    This is how you can add global middlewares in your code

    1. Implements the NestModule Interface (optional)
    2. Add the `configure` method with the `consumer parameter`
    3. The `apply` function define which middlewares you want to use
    4. Define which routes you want to use this or these middlewares
    5. "*" means you will use this middleware globally.
    
    you can set global filters in main.ts file using the `use` function
      but you will not have the Nest's Dependency Injection in these middlewares
  */
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SimpleMiddleware).forRoutes('*');
  }
}
