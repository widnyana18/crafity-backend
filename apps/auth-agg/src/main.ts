import { AppParser } from "@app/shared";
import { AppModule } from "./app.module";

async function bootstrap() {
  await AppParser.aggregation(AppModule);
}
bootstrap();
