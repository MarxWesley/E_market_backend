import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors({
    origin: 'http://localhost:8081',
  })

  const config = new DocumentBuilder()
    .setTitle('API E-Market')
    .setDescription('API desenvolvida para o aplicativo de e-commerce, E-Market')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('App', 'Tag para teste')
    .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('e_market/swagger', app, document); //localhost:3000/swagger

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();