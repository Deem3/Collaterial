import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { PrismaService } from 'prisma/prisma.service';
export declare class AuthService {
    private readonly userService;
    private readonly jwt;
    private readonly prisma;
    constructor(userService: UserService, jwt: JwtService, prisma: PrismaService);
    register({ username, ...payload }: RegisterDto): Promise<Omit<{
        id: string;
        username: string;
        password: string;
        role: import(".prisma/client").$Enums.ROLE;
        createdAt: Date;
        updatedAt: Date;
    }, "password">>;
    login(payload: LoginDto): Promise<{
        user: Omit<{
            id: string;
            username: string;
            password: string;
            role: import(".prisma/client").$Enums.ROLE;
            createdAt: Date;
            updatedAt: Date;
        }, "password">;
        backendToken: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    validateUser({ username, password }: LoginDto): Promise<Omit<{
        id: string;
        username: string;
        password: string;
        role: import(".prisma/client").$Enums.ROLE;
        createdAt: Date;
        updatedAt: Date;
    }, "password">>;
    refreshToken(userPromise: Promise<any>): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    getUserFromPayload(payload: Promise<any>): Promise<{
        username: any;
        sub: any;
    }>;
}
