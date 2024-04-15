import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { ROLE } from '@prisma/client';
import { Request } from 'express';
import { ROLES_KEY } from 'src/decorator/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<ROLE[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) return false;
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.jwtSecretKey,
      });
      const {
        sub: { role: roles },
      } = payload;
      return requiredRoles.some((role) => roles?.includes(role));
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token expired');
      }
    }
  }
  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
