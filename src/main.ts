import * as DotEnv from 'dotenv';
DotEnv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cors from 'cors';

const pacote = require( '../package.json' );
const fs = require( 'fs' );

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
  .setTitle( pacote.name )
  .setDescription( pacote.description )
  .setVersion( pacote.version )
  .addTag('CMPaaS')
  .setSchemes('http', 'https')
  .setBasePath('v1')
  .addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app, options);
  fs.writeFileSync( 'swagger.json', JSON.stringify( document ) )


  SwaggerModule.setup('docs', app, document);

  app.use(cors());
  app.setGlobalPrefix('v1');
  await app.listen(parseInt(process.env.PORT) || 3000);
}
bootstrap();
