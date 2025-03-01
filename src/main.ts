import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: '*',
  })

  const configSwagger = new DocumentBuilder()
    .setDescription('API lista de tarefas')
    .setBasePath('localhost:8080')
    .setTitle('Lista de Tarefas')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, configSwagger)
  SwaggerModule.setup('docs', app, documentFactory)

  app.useGlobalPipes(new ValidationPipe(
    {whitelist: true, } // remove todos valores que passados a mais
  ))

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
