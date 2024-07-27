import { AppModule } from './app.module';
import { AppParser } from '@app/shared/parser/app.parser';

async function bootstrap() {
  await AppParser.persistence(AppModule);
}
bootstrap();
