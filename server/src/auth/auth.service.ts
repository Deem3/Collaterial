import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import exclude from 'src/utils/excludeElement';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async register({ username, ...payload }: RegisterDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (user) {
      throw new ConflictException('User already exists');
    }
    const newUser = await this.prisma.user.create({
      data: {
        username,
        ...payload,
        password: await hash(payload.password, 10),
      },
    });
    const userWithoutPassword = exclude(newUser, ['password']);
    return userWithoutPassword;
  }

  async login(payload: LoginDto) {
    const user = await this.validateUser(payload);
    const tokenPayload = {
      username: user.username,
      sub: {
        id: user.id,
        createdAt: user.createdAt,
        role: user.role,
      },
    };
    return {
      user,
      backendToken: {
        accessToken: await this.jwt.signAsync(tokenPayload, {
          secret: process.env.jwtSecretKey,
          expiresIn: '1h',
        }),
        refreshToken: await this.jwt.signAsync(tokenPayload, {
          secret: process.env.jwtRefreshTokenKey,
          expiresIn: '12h',
        }),
      },
    };
  }
  async validateUser({ username, password }: LoginDto) {
    const user = await this.userService.findUserByUsername(username);
    if (user && (await compare(password, user.password))) {
      const userWithoutPassword = exclude(user, ['password']);
      return userWithoutPassword;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async refreshToken(userPromise: Promise<any>) {
    const user = await userPromise;
    const payload = {
      username: user.username,
      sub: user.sub,
    };
    return {
      accessToken: await this.jwt.signAsync(payload, {
        secret: process.env.jwtSecretKey,
        expiresIn: '1h',
      }),
      refreshToken: await this.jwt.signAsync(payload, {
        secret: process.env.jwtRefreshTokenKey,
        expiresIn: '12h',
      }),
    };
  }

  async getUserFromPayload(payload: Promise<any>) {
    const user = await payload;
    return {
      username: user.username,
      sub: user.sub,
    };
  }
}
