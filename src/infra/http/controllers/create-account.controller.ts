import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { HttpCode } from '@nestjs/common';
import { ConflictException } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { z } from 'zod';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import { Public } from '@/infra/auth/public';

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>;

@Controller('/accounts')
@Public()
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  @HttpCode(201)
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password } = createAccountBodySchema.parse(body);

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithSameEmail) {
      throw new ConflictException(
        'Another user with same email already exists.'
      );
    }

    const hashedPassword = await hash(password, 8);

    await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  }
}
