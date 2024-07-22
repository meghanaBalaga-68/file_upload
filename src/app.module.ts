import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FileUploadModule } from './CCD/file_upload/file_upload.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './CCD/file_upload/config/db.config';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig],
      expandVariables: true,
      envFilePath: `${process.env.NODE_ENV ?? ''}.env`
    }),
    TypeOrmModule.forRootAsync({
      useFactory: dbConfig,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../', 'public'),
      
    }),
    FileUploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
