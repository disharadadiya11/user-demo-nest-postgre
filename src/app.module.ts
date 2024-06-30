import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/db.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthMiddleware } from './shared/middleware/auth.middleware';
import { protectedRoutes } from './shared/middleware/auth.routes';
import * as cors from 'cors';
import { JwtService } from './shared/service/jwt.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Path to your uploads folder
      serveRoot: '/uploads', // Virtual path for serving static files
    }),
    TypeOrmModule.forRootAsync({
      useFactory: databaseConfig,
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [],
  providers: [JwtService],
})
export class AppModule implements NestModule {
  constructor(private readonly configService: ConfigService) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors()).forRoutes('*');
    consumer.apply(AuthMiddleware).forRoutes(...protectedRoutes);
  }
}
