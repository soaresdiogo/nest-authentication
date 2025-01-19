import { AppModule } from '@/app.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';

describe('List Users (E2E)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let accessToken: string;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get(PrismaService);

    await app.init();
  });

  test('[GET] /users', async () => {
    const response = await request(app.getHttpServer()).post('/accounts').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(response.statusCode).toBe(201);
  });

  test('[POST] /sessions', async () => {
    const response = await request(app.getHttpServer()).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    });

    accessToken = response.body.access_token;

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      access_token: expect.any(String),
    });
  });

  test('[GET] /users', async () => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).toBe(200);
  });
});
