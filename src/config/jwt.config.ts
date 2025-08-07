import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig = async (
  configService: ConfigService,
): Promise<JwtModuleOptions> => ({
  secret: configService.get<string>('JWT_ACCESS_SECRET') || 'default-secret',
  signOptions: {
    expiresIn: configService.get<string>('JWT_ACCESS_EXPIRATION') || '15m',
  },
});

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}