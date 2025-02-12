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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const file_upload_entity_1 = require("./file_upload.entity");
let FileUploadService = class FileUploadService {
    constructor(fileUploadRepository) {
        this.fileUploadRepository = fileUploadRepository;
    }
    async saveUploadFile(fileMetadata) {
        const file = this.fileUploadRepository.create(fileMetadata);
        await this.fileUploadRepository.save(file);
        return file;
    }
    async getFileById(id) {
        return this.fileUploadRepository.findOne({ where: { file_id: id } });
    }
};
exports.FileUploadService = FileUploadService;
exports.FileUploadService = FileUploadService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(file_upload_entity_1.File_Upload)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], FileUploadService);
//# sourceMappingURL=file_upload.service.js.map