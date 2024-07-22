"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadModule = void 0;
const common_1 = require("@nestjs/common");
const file_upload_controller_1 = require("./file_upload.controller");
const file_upload_service_1 = require("./file_upload.service");
const typeorm_1 = require("@nestjs/typeorm");
const file_upload_entity_1 = require("./file_upload.entity");
const platform_express_1 = require("@nestjs/platform-express");
const file_util_1 = require("./util/file.util");
const file_util_module_1 = require("./util/file.util.module");
let FileUploadModule = class FileUploadModule {
};
exports.FileUploadModule = FileUploadModule;
exports.FileUploadModule = FileUploadModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([file_upload_entity_1.File_Upload]),
            platform_express_1.MulterModule.registerAsync({
                imports: [file_util_module_1.FileUploadUtilsModule],
                inject: [file_util_1.FileUploadUtilsService],
                useFactory: (fileUploadUtilsService) => {
                    const maxSize = fileUploadUtilsService.getMaxSize('VIDEO' || 'IMAGE' || 'APPLICATION' || 'TEXT' || 'AUDIO');
                    return {
                        dest: './public',
                        limits: {
                            fileSize: maxSize,
                        },
                    };
                },
            }),
        ],
        providers: [file_upload_service_1.FileUploadService, file_util_1.FileUploadUtilsService],
        controllers: [file_upload_controller_1.FileUploadController],
        exports: [file_upload_service_1.FileUploadService],
    })
], FileUploadModule);
//# sourceMappingURL=file_upload.module.js.map