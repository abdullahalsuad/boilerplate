import {
  ValidationPipe,
  Logger,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  const configService = app.get(ConfigService);
  const apiPrefix = configService.get<string>('apiPrefix') || 'api';

  // Set Global API Prefix
  app.setGlobalPrefix(apiPrefix);

  // Security
  app.use(
    helmet({
      crossOriginResourcePolicy: false,
      referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    }),
  );

  app.enableCors({
    origin: true, // This allows any origin while satisfying the credentials requirement
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  // Global Logic
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalInterceptors(
    new ResponseInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );

  // Swagger Documentation - Only show in non-production environments
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('MyRizq API')
      .setDescription('Professional backend for MyRizq application')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
      customSiteTitle: 'MyRizq API Documentation',
    });
  }

  const port = process.env.PORT ?? 8000;
  await app.listen(port);

  logger.log(`🚀 Server is running on: http://localhost:${port}`);
  logger.log(`📜 Documentation available at: http://localhost:${port}/docs`);
}
bootstrap();
