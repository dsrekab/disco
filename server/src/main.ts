import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Logger } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false});
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.enableCors();

  await app.listen(process.env.APP_PORT);

  const logger = new Logger();

  logger.log(`Started and listening on port ${process.env.APP_PORT}`, 'bootstrap');
}
bootstrap();
