"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadUtilsModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const file_util_1 = require("./file.util");
const config_2 = require("@nestjs/config");
let FileUploadUtilsModule = class FileUploadUtilsModule {
};
exports.FileUploadUtilsModule = FileUploadUtilsModule;
exports.FileUploadUtilsModule = FileUploadUtilsModule = __decorate([
    (0, common_1.Module)({
        imports: [config_2.ConfigModule],
        providers: [file_util_1.FileUploadUtilsService, config_1.ConfigService],
        exports: [file_util_1.FileUploadUtilsService],
    })
], FileUploadUtilsModule);
//# sourceMappingURL=file.util.module.js.map