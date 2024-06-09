import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import database from './database';
import { winstonConfig } from './utils/logger.config';
import { WinstonModule } from 'nest-winston';
import { Logger } from '@nestjs/common';

const logger = new Logger('boostrap');

async function assertDatabaseConnection(): Promise<void> {
  try {
    await database.authenticate();
    await database.sync();
    logger.log('Connection has been established successfully.');
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
  }
}

async function bootstrap() {  

  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonConfig)
  });

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('API')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  
  SwaggerModule.setup('api', app, document);

  await assertDatabaseConnection();

  await app.listen(3000);  
}


bootstrap();
