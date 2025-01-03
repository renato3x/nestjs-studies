import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { ConceptsManualModule } from './concepts-manual/concepts-manual.module';
import { ConceptsAutoModule } from './concepts-auto/concepts-auto.module';

/**
 * A module in NestJS is a class annotated with the `@Module()` decorator,
 * serving as a structural unit to group related functionality like controllers,
 * providers, and services. It organizes the application into cohesive blocks,
 * making it scalable and maintainable.
 *
 * Key points:
 * - Defined using the `@Module()` decorator.
 * - Contains `imports`, `controllers`, `providers`, and `exports`.
 * - The root module (e.g., `AppModule`) serves as the application's entry point.
 * - Feature modules group specific functionalities (e.g., UsersModule, ProductsModule).
 * - Shared modules provide common services to multiple modules.
 * - Supports dynamic modules for runtime customization.
 */

@Module({
  imports: [ConceptsManualModule, ConceptsAutoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
