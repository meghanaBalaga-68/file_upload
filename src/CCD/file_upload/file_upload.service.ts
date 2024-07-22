import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { File_Upload } from './file_upload.entity';



@Injectable()
export class FileUploadService {
    constructor(
        @InjectRepository(File_Upload)
        private readonly fileUploadRepository: Repository<File_Upload>,
      
    ) {}


    async saveUploadFile(fileMetadata: Partial<File_Upload>) {
        const file = this.fileUploadRepository.create(fileMetadata);
        await this.fileUploadRepository.save(file);
        return file;
    }

    async getFileById(id: string): Promise<File_Upload> {
        return this.fileUploadRepository.findOne({ where: { file_id: id } });
    }

    
}