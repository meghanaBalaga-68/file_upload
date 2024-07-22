import { FileUploadService } from './file_upload.service';
export declare class FileUploadController {
    private readonly fileUploadService;
    constructor(fileUploadService: FileUploadService);
    uploadFile(file: Express.Multer.File): Promise<{
        file_URL: string;
    }>;
    streamFileById(id: string, res: any): Promise<void>;
}
