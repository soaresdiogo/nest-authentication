import { Controller, Get, UseGuards } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import { UserPayload } from '@/infra/auth/jwt.strategy';
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard';
import { ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@Controller('/users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class UsersController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users (requires authentication)' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved users and logged-in user details.',
    schema: {
      example: {
        userLogged: {
          sub: 'user-id',
          username: 'johndoe',
          email: 'johndoe@example.com',
        },
        users: [
          {
            id: '1',
            name: 'John Doe',
            email: 'johndoe@example.com',
          },
          {
            id: '2',
            name: 'Jane Smith',
            email: 'janesmith@example.com',
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, invalid or missing token.',
  })
  async handle(@CurrentUser() user: UserPayload) {
    const users = await this.prisma.user.findMany();
    return { userLogged: user, users };
  }
}
