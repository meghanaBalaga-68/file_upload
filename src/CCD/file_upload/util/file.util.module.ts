import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileUploadUtilsService } from './file.util';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [FileUploadUtilsService, ConfigService],
  exports: [FileUploadUtilsService],
})
export class FileUploadUtilsModule {}