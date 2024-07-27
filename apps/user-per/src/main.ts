import { AppModule } from './app.module';
import { AppParser } from '@app/shared';

async function bootstrap() {
  await AppParser.persistence(AppModule);
}
bootstrap();
