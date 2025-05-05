import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomValidationPipe } from './pipes/custom-validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const CLIENT_URL = config.getOrThrow<string>('CLIENT_URL');
  app.useGlobalPipes(new CustomValidationPipe());

  app.enableCors({
    credentials: true,
    origin: CLIENT_URL,
  });

  await app.listen(3000);
}
bootstrap();
