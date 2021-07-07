import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AccountService } from './application/services/account.service';
import { InitGenesis } from './application/services/init.service';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  app.get(InitGenesis)
  
}
bootstrap();
