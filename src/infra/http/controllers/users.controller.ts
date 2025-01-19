import { Controller, Get, UseGuards } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard';

@Controller('/users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async handle(@CurrentUser() user: UserPayload) {
    const users = await this.prisma.user.findMany();

    return { userLogged: user, users };
  }
}
