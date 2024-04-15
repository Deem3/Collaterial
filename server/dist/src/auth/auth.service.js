"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt_1 = require("bcrypt");
const user_service_1 = require("../user/user.service");
const excludeElement_1 = require("../utils/excludeElement");
const prisma_service_1 = require("../../prisma/prisma.service");
let AuthService = class AuthService {
    constructor(userService, jwt, prisma) {
        this.userService = userService;
        this.jwt = jwt;
        this.prisma = prisma;
    }
    async register({ username, ...payload }) {
        const user = await this.prisma.user.findUnique({
            where: {
                username,
            },
        });
        if (user) {
            throw new common_1.ConflictException('User already exists');
        }
        const newUser = await this.prisma.user.create({
            data: {
                username,
                ...payload,
                password: await (0, bcrypt_1.hash)(payload.password, 10),
            },
        });
        const userWithoutPassword = (0, excludeElement_1.default)(newUser, ['password']);
        return userWithoutPassword;
    }
    async login(payload) {
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
    async validateUser({ username, password }) {
        const user = await this.userService.findUserByUsername(username);
        if (user && (await (0, bcrypt_1.compare)(password, user.password))) {
            const userWithoutPassword = (0, excludeElement_1.default)(user, ['password']);
            return userWithoutPassword;
        }
        throw new common_1.UnauthorizedException('Invalid credentials');
    }
    async refreshToken(userPromise) {
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
    async getUserFromPayload(payload) {
        const user = await payload;
        return {
            username: user.username,
            sub: user.sub,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map