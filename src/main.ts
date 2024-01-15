import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { IsUserAuthed } from './auth/guards/is-user-authed.guard';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // Important to make sure any path/route exposed in the gateway will require for the user to be an Wasder
  // admin user. This check will get bypassed if you annotate a given route with the decorator @Public
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new IsUserAuthed(reflector));

  app.use(helmet({ contentSecurityPolicy: false }));

  await app.listen(3000, '::');
}
bootstrap();
