import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(payload: RegisterDto): Promise<Omit<{
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
    refreshToken(req: any): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    me(req: any): Promise<{
        username: any;
        sub: any;
    }>;
}
