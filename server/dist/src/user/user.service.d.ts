import { PrismaService } from 'prisma/prisma.service';
import { RegisterDto } from 'src/auth/dto/register.dto';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createUser(payload: RegisterDto): Promise<{
        id: string;
        username: string;
        password: string;
        role: import(".prisma/client").$Enums.ROLE;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findUserByUsername(username: string): Promise<{
        id: string;
        username: string;
        password: string;
        role: import(".prisma/client").$Enums.ROLE;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
