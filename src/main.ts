import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import compression from 'compression';
import helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  app.use(compression());

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Ease Courier Gateway')
    .setDescription(
      'Courier Aggregator APIs for integrating multiple courier partners.',
    )
    .setVersion('1.0.0')
    .addTag('Orders')
    .addTag('Tracking')
    .addTag('Health')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3000);

  console.log(
    `Application running on http://localhost:${process.env.PORT ?? 3000}`,
  );

  console.log(
    `Swagger available at http://localhost:${process.env.PORT ?? 3000}/docs`,
  );
}

bootstrap();
