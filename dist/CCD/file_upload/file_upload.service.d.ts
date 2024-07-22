import { Repository } from 'typeorm';
import { File_Upload } from './file_upload.entity';
export declare class FileUploadService {
    private readonly fileUploadRepository;
    constructor(fileUploadRepository: Repository<File_Upload>);
    saveUploadFile(fileMetadata: Partial<File_Upload>): Promise<File_Upload>;
    getFileById(id: string): Promise<File_Upload>;
}
