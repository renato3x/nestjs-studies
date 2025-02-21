import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /**
   * Pipes in NestJS are a feature used for data transformation and validation.
   * They can be applied at the method, controller, or globally to process incoming requests.
   * Common use cases include validating request payloads (using class-validator)
   * and transforming data types (e.g., converting strings to numbers).
   * NestJS provides built-in pipes like ValidationPipe and ParseIntPipe,
   * but custom pipes can also be created to handle specific logic.
   *
   * ValidationPipe:
   *
   * This built-in pipe is used to validate incoming request data using class-validator.
   * It ensures that data meets predefined constraints before reaching the route handler.
   * It supports features like automatic DTO validation, error handling, and transformation.
   * Example usage: `@UsePipes(new ValidationPipe({ whitelist: true }))`
   * - `whitelist: true` removes properties that are not in the DTO.
   * - `forbidNonWhitelisted: true` throws an error if extra properties are present.
   *
   * In this case, we're using ValidationPipe as a global Pipe to validate our DTOs.
   *
   * to define global pipes, go in main.ts, at bootstrap function and use the method `setGlobalPipes`
   * and define the pipes which will used in all endpoints
   */

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove keys that doesn't exists in DTO
      forbidNonWhitelisted: true, // send error when some field out of DTO is sent
      transform: false, // try transform the data types
    }),
  );
  app.setGlobalPrefix('api');
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
