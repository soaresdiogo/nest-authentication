import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common';
import { HttpCode } from '@nestjs/common';
import { ConflictException } from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import { Public } from '@/infra/auth/public';
import { RegisterUserUseCase } from '@/domain/application/use-cases/register-user';
import { UserAlreadyExistsError } from '@/domain/application/use-cases/errors/user-already-exists-error';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user-dto';

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;

@ApiTags('Accounts')
@Controller('/accounts')
@Public()
export class CreateAccountController {
  constructor(private registerUser: RegisterUserUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a new user account' })
  @ApiBody({
    description: 'Payload to create a new account',
    type: CreateUserDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Account created successfully.',
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict: User already exists.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: Invalid input data.',
  })
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password } = body;

    const result = await this.registerUser.execute({
      name,
      email,
      password,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case UserAlreadyExistsError:
          throw new ConflictException(error.message);
        default:
          throw new BadRequestException(error.message);
      }
    }
  }
}
