import { Module } from '@nestjs/common';
import { FileUploadController } from './file_upload.controller';
import { FileUploadService } from './file_upload.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File_Upload } from './file_upload.entity';
import { MulterModule, MulterModuleOptions } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { FileUploadUtilsService } from './util/file.util';
import { FileUploadUtilsModule } from './util/file.util.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([File_Upload]),
    MulterModule.registerAsync({
      imports: [FileUploadUtilsModule],
      inject: [FileUploadUtilsService],
      useFactory: (fileUploadUtilsService: FileUploadUtilsService): MulterModuleOptions => {
         const maxSize = fileUploadUtilsService.getMaxSize('VIDEO' || 'IMAGE' || 'APPLICATION' || 'TEXT' || 'AUDIO'); // Assuming 'VIDEO' here, adjust as needed
        return {
          dest: './public',
          limits: {
            fileSize: maxSize,
          },
        };
      },
    }),
  ],
  providers: [FileUploadService, FileUploadUtilsService],
  controllers: [FileUploadController],
  exports: [FileUploadService],
})
export class FileUploadModule {}