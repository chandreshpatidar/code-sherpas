import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  const config = new DocumentBuilder()
    .setTitle('Bank API')
    .setDescription('The banking simulation API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  let port = 3333;
  try {
    const newPort = parseInt(process.env.PORT, 10);
    if (!isNaN(newPort)) {
      port = newPort;
    }
  } catch (error) {
    console.error('Invalid PORT environment variable');
  }

  await app.listen(port);
}
bootstrap();
