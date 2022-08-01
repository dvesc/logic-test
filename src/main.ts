import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { init_process } from './logic_module/files_handler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  init_process();
}
bootstrap();
