import * as DotEnv from 'dotenv';
DotEnv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cors from 'cors';

const pacote = require( '../package.json' );

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
  .setTitle( pacote.name )
  .setDescription( pacote.description )
  .setVersion( pacote.version )
  .addTag('CMPaaS')
  .setSchemes('http', 'https')
  .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  app.use(cors());
  await app.listen(parseInt(process.env.PORT) || 3000);
}
bootstrap();
