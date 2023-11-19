import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { banner } from './banner';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Cat toxic plant')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customCss: `
        .swagger-container {
            min-height: 100vh;
            background: rgba(255,210,144,0.4)
        }
        .swagger-ui .topbar {
            background: linear-gradient(270deg, rgba(52,29,7,1) 0%, rgba(88,72,51,1) 64%, rgba(255,210,144,1) 100%);
            height: 155px;
            box-shadow: 1px 8px 24px 0px rgba(66, 68, 90, 1);
        }

        .topbar-wrapper {
            visibility: hidden;
        }

        .information-container.wrapper {
            margin-top: -120px
        }

        .swagger-ui .info {
            margin: 10px 0 80px;
        }

        .swagger-ui .info .title {
            color: white;
              font-family: 'Brush Script MT', cursive;
              font-size: 50px;
        }

        .topbar-wrapper .link:after {
            content: url('swaggerImg');
            width: 10px;
            height: 10px;
            scale: 0.035;
            visibility: visible;
            display: block;
            margin-top: -40px;
            position: absolute;
            right: 100px
        }`,
  });
  await app.listen(3000);
  console.log(banner);
}
bootstrap();
