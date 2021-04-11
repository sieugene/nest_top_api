import { AuthDto } from './../src/auth/dto/auth.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect } from 'mongoose';

const loginDto: AuthDto = {
  login: 'a@a.ru',
  password: '1',
};

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let access_token: string;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/login (POST) - success', async (done) => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(200)
      .then(({ body }: request.Response) => {
        access_token = body.access_token;
        expect(access_token).toBeDefined();
        done();
      });
  });

  it('/auth/login (POST) - fail (wrong password)', async (done) => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...loginDto, password: '0' })
      .expect(401)
      .then(({ body }: request.Response) => {
        console.log(body, 'wrong password body');
        expect(body.message).toBe('Неверный пароль');
        done();
      });
  });
  it('/auth/login (POST) - fail (wrong email)', async (done) => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...loginDto, login: '0' })
      .expect(401)
      .then(({ body }: request.Response) => {
        console.log(body, 'wrong email body');
        expect(body.message).toBe('Пользователь не найден');
        done();
      });
  });
  afterAll(() => {
    disconnect();
  });
});
