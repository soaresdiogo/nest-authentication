import { Module } from '@nestjs/common';
import { CreateAccountController } from './controllers/create-account.controller';
import { AuthenticateController } from './controllers/authenticate.controller';
import { UsersController } from './controllers/users.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    UsersController,
  ],
  providers: [],
})
export class HttpModule {}
