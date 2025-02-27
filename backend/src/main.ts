import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { colorText } from './utils/color.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for all origins
  app.enableCors({
    origin: '*',
  });

  await app.listen(process.env.PORT ?? 8080);
  console.log(`
    /********************************************
     * 🚀 ${colorText('Backend Server is Running!', 'cyan')} 🚀
     * 
     * ▶ ${colorText('URL:', 'green')} http://localhost:${colorText(process.env.PORT ?? '3000', 'yellow')}
     * ▶ ${colorText('Mode:', 'magenta')} ${colorText(process.env.NODE_ENV?.toUpperCase() ?? 'development', 'red')}
     ********************************************/
    `);
}
bootstrap();
