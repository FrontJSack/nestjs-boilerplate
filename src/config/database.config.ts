import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const databaseConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  const isProduction = configService.get<string>('NODE_ENV') === 'production';
  
  return {
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
    
    entities: [],
    autoLoadEntities: true,
    synchronize: !isProduction && configService.get<boolean>('DB_SYNCHRONIZE', false),
    logging: !isProduction && configService.get<boolean>('DB_LOGGING', false),
    
    namingStrategy: new SnakeNamingStrategy(),
    
    ssl: isProduction ? { rejectUnauthorized: false } : false,
  };
};