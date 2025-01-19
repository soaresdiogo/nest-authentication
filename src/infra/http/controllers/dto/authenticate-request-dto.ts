import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class AuthenticateRequestDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'johndoe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: '123456',
  })
  @IsString()
  password: string;

  constructor(name: string, email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
