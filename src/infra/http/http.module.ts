import { Module } from '@nestjs/common';
import { CreateAccountController } from './controllers/create-account.controller';
import { AuthenticateController } from './controllers/authenticate.controller';
import { UsersController } from './controllers/users.controller';
import { DatabaseModule } from '../database/database.module';
import { RegisterUserUseCase } from '@/domain/application/use-cases/register-user';
import { AuthenticateUserUseCase } from '@/domain/application/use-cases/authenticate-user';
import { CryptographyModule } from '../cryptography/cryptography.module';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    UsersController,
  ],
  providers: [RegisterUserUseCase, AuthenticateUserUseCase],
})
export class HttpModule {}
