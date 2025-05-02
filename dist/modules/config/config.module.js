"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AppConfigModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfigModule = void 0;
const common_1 = require("@nestjs/common");
const config_service_1 = require("./config.service");
const config_1 = require("@nestjs/config");
let AppConfigModule = AppConfigModule_1 = class AppConfigModule {
    static forRoot() {
        return {
            module: AppConfigModule_1,
            imports: [config_1.ConfigModule],
            providers: [config_service_1.AppConfigService],
            exports: [config_service_1.AppConfigService],
        };
    }
};
exports.AppConfigModule = AppConfigModule;
exports.AppConfigModule = AppConfigModule = AppConfigModule_1 = __decorate([
    (0, common_1.Module)({})
], AppConfigModule);
//# sourceMappingURL=config.module.js.map