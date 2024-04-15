"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function exclude(user, keys) {
    return Object.fromEntries(Object.entries(user).filter(([key]) => !keys.includes(key)));
}
exports.default = exclude;
//# sourceMappingURL=excludeElement.js.map