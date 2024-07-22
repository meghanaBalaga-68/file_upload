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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const path_1 = require("path");
const file_upload_service_1 = require("./file_upload.service");
const date_fns_1 = require("date-fns");
const common_2 = require("@nestjs/common");
const fs_1 = require("fs");
const sharp_1 = __importDefault(require("sharp"));
const fs_2 = require("fs");
let FileUploadController = class FileUploadController {
    constructor(fileUploadService) {
        this.fileUploadService = fileUploadService;
    }
    async uploadFile(file) {
        if (!file) {
            throw new common_2.HttpException('File Not Found', common_2.HttpStatus.BAD_REQUEST);
        }
        const fileTypeName = (0, path_1.extname)(file.originalname);
        const timestamp = (0, date_fns_1.format)(new Date(), 'dd-MM-yyyy_HH-mm-ss');
        7;
        let finalFileName = file.filename;
        let finalFilePath = file.path;
        if (file.mimetype.startsWith('image')) {
            try {
                const tempFilePath = (0, path_1.join)(file.destination, `compressed-${file.filename}`);
                await (0, sharp_1.default)(file.path)
                    .resize({ width: 1024, height: 1024, fit: sharp_1.default.fit.inside, withoutEnlargement: true })
                    .toFormat('jpeg', { quality: 80 })
                    .toFile(tempFilePath);
                (0, fs_2.renameSync)(tempFilePath, finalFilePath);
                finalFileName = `compressed-${file.filename}`;
            }
            catch (error) {
                console.error('Error compressing image:', error);
            }
        }
        else {
            (0, fs_2.renameSync)(file.path, finalFilePath);
        }
        const fileData = {
            filename: `${finalFileName}-${timestamp}${fileTypeName}`,
            path: finalFilePath,
            file_type: file.mimetype,
            size: file.size,
        };
        await this.fileUploadService.saveUploadFile(fileData);
        const file_URL = `http://10.100.72.203:3000/${finalFileName}`;
        return { file_URL };
    }
    async streamFileById(id, res) {
        const file = await this.fileUploadService.getFileById(id);
        if (!file) {
            throw new common_2.HttpException('File not found', common_2.HttpStatus.NOT_FOUND);
        }
        const filePath = file.path;
        if (!(0, fs_1.existsSync)(filePath)) {
            throw new common_2.HttpException('File path not found', common_2.HttpStatus.NOT_FOUND);
        }
        const fileStream = (0, fs_1.createReadStream)(filePath);
        fileStream.pipe(res);
    }
};
exports.FileUploadController = FileUploadController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FileUploadController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)('stream/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FileUploadController.prototype, "streamFileById", null);
exports.FileUploadController = FileUploadController = __decorate([
    (0, common_1.Controller)('file'),
    __metadata("design:paramtypes", [file_upload_service_1.FileUploadService])
], FileUploadController);
//# sourceMappingURL=file_upload.controller.js.map