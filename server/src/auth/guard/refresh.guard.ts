import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class RefreshToken implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException('Token not found');
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.jwtRefreshTokenKey,
      });
      request['user'] = payload;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token expired');
      }
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization.split(' ') ?? [];
    return type === 'Refresh' ? token : undefined;
  }
}
