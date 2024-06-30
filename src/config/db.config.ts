import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entity/user.entity';

export const databaseConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
  type: 'postgres',
  url: configService.get<string>('DATABASE_URL'),
  entities: [User],
  synchronize: true,
});
