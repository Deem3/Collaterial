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
exports.RegisterDto = void 0;
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
class RegisterDto {
}
exports.RegisterDto = RegisterDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(8, 20, { message: 'Password must be between 8 and 20 characters' }),
    (0, class_validator_1.Matches)(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter',
    }),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsEnum)([client_1.ROLE.MANAGER, client_1.ROLE.EMPLOYEE]),
    __metadata("design:type", String)
], RegisterDto.prototype, "role", void 0);
//# sourceMappingURL=register.dto.js.map