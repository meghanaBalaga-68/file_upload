import { Controller, Post, UploadedFile, UseInterceptors, Get, Param, Res, Body, Header, StreamableFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import  {  extname, join } from 'path';
import { FileUploadService } from './file_upload.service';
import { format } from 'date-fns';
import { HttpException, HttpStatus } from '@nestjs/common';
import { createReadStream, createWriteStream, existsSync, statSync } from 'fs';
import  sharp from 'sharp';
import { ConfigService } from '@nestjs/config';
import { renameSync } from 'fs';



type mimeTypes = {
    [key: string]: string[];
}


@Controller('file')
export class FileUploadController {
    constructor(private readonly fileUploadService: FileUploadService,
    ) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))

    async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<{file_URL: string}>{
        
        if(!file){
            throw new HttpException('File Not Found', HttpStatus.BAD_REQUEST);
        }

        const fileTypeName = extname(file.originalname);
        const timestamp = format(new Date(), 'dd-MM-yyyy_HH-mm-ss');
        // const finalFileName = `${file.filename}-${timestamp}${fileTypeName}`;
        // const finalFilePath = join(__dirname, '../../public', finalFileName);
      
        // convert to string to number
        // const fileType = file.mimetype.split('/')[0].toUpperCase();
        // const maxSizeEnvVar = `CCD_${fileType}UPLOADSIZE`;
        // const maxSize = this.configService.get<number>(maxSizeEnvVar);
        
        

        // if (!maxSize || file.size > maxSize) {
        //     throw new HttpException(`File size exceeds limit of ${maxSizeEnvVar}`, HttpStatus.BAD_REQUEST);
        // }
7
        let finalFileName = file.filename;
        let finalFilePath = file.path;

         // Check if file is an image for compression
         if (file.mimetype.startsWith('image')) {
            try {
                const tempFilePath = join(file.destination, `compressed-${file.filename}`);
                
                await sharp(file.path)
                  .resize({ width: 1024, height: 1024, fit: sharp.fit.inside, withoutEnlargement: true })
                  .toFormat('jpeg', { quality: 80 })
                  .toFile(tempFilePath);
        
                // Replace the original file with the compressed one
                renameSync(tempFilePath, finalFilePath);
                finalFileName = `compressed-${file.filename}`;
              } catch (error) {
                console.error('Error compressing image:', error);
              }
        }else{
            renameSync(file.path, finalFilePath);
        }

        
        


        const fileData = {
            filename: `${finalFileName}-${timestamp}${fileTypeName}`,
            path: finalFilePath,
            file_type: file.mimetype,
            size: file.size,
        }
        
        await this.fileUploadService.saveUploadFile(fileData);
        const file_URL = `http://10.100.72.203:3000/${finalFileName}`;
        return { file_URL };
    }

    


    // async compressFile(inputFilePath: string, outputFilePath: string): Promise<void> {
    //     const pipelineAsync = promisify(pipeline);
    //     const readStream = createReadStream(inputFilePath);
    //     const writeStream = createWriteStream(outputFilePath);
    //     await pipelineAsync(
    //         readStream,
    //         zlib.createGzip(),
    //         writeStream
    //     );
    // }

    // @Get(':id')
    // async getFileById(@Param('id') id: string, @Res() res): Promise<File_Upload> {
    //         const file = await this.fileUploadService.getFileById(id);
    //         if (!file) {
    //             throw new HttpException('File not found', HttpStatus.NOT_FOUND);
    //         }
    //         const filePath =  file.path;
    //         if (!existsSync(filePath)) {
    //             throw new HttpException('File path not found', HttpStatus.NOT_FOUND);
    //         }
    //         return res.sendFile(filePath);
    // }

    
    @Get('stream/:id')
    async streamFileById(@Param('id') id: string, @Res() res): Promise<void> {
        const file = await this.fileUploadService.getFileById(id);
        if (!file) {
            throw new HttpException('File not found', HttpStatus.NOT_FOUND);
        }

        const filePath = file.path;
        if (!existsSync(filePath)) {
            throw new HttpException('File path not found', HttpStatus.NOT_FOUND);
        }

     
        const fileStream = createReadStream(filePath);
        fileStream.pipe(res);
    }
}