// import { Controller, Post, UploadedFile, UseInterceptors, Get, Param, Res, Body } from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import { v4 as uuidv4 } from 'uuid';
// import  {  extname, join } from 'path';
// import { FileUploadService } from './file_upload.service';
// import { format } from 'date-fns';
// import { HttpException, HttpStatus } from '@nestjs/common';
// import { File_Upload } from './file_upload.entity';
// import { existsSync } from 'fs';
// import fs from 'fs';
// import * as sharp from 'sharp';


// @Controller('file')
// export class FileUploadController {
//     constructor(private readonly fileUploadService: FileUploadService) {}

//     @Post('upload')
//     @UseInterceptors(
//         FileInterceptor('file', {
//             storage: diskStorage({
//                 destination: './public/images',
//                 filename: (req, file, callback) => {
//                      const fileTypeName = extname(file.originalname);
//                      const unique_text = uuidv4();
//                      const timestamp = format(new Date(), 'dd-MM-yyyy_HH-mm-ss');
//                      const newFileName = ${unique_text}-${timestamp}${fileTypeName};
//                      callback(null, newFileName);
//                 },
//             }),

//             fileFilter: (req, file, callback) =>{
//                 const validateTypes = ['image/jpeg', 'image/png'];
//                 if(!validateTypes.includes(file.mimetype)){
//                     return callback(new HttpException('Invalid File Type', HttpStatus.BAD_REQUEST), false);
//                 }
//                 callback(null, true);
//             },
           
//         })
//     )

//     async uploadFile(@UploadedFile() file: Express.Multer.File){
//         if(!file){
//             throw new HttpException('File Not Found', HttpStatus.BAD_REQUEST);
//         }
//         let finalFilePath = file.path;
//         let finalFileName = file.filename;

//         // Compress the image if it's larger than 5 MB
//             const compressFilePath = join(__dirname, '../../../', 'public/images', compressed-${file.filename});
//             await sharp(file.path)
//                 .resize({ width: 1024, height: 1024, fit: sharp.fit.inside, withoutEnlargement: true })
//                 .toFormat('jpeg', { quality: 80 })
//                 .toFile(compressFilePath);

//             finalFilePath = compressFilePath;
//             finalFileName = compressed-${file.filename};

//         const file_URL = http://10.100.72.203:3000/${finalFileName};

// {
//     "image": ["image/jpeg", "image/png"],
//     "pdf": ["application/pdf"],
//     "text": ["text/plain"],
//     "xml": ["application/xml"],
//     "excel": ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
//     "word": ["application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
//     "audio": ["audio/mpeg"],
//     "ppt": ["application/vnd.ms-powerpoint","application/vnd.openxmlformats-officedocument.presentationml.presentation"],
//     "video": ["video/mp4, video/x-matroska, video/x-msvideo, video/quicktime, video/x-ms-wmv, video/x-flv, video/webm"]
    
// }


//         const fileData = {
//             filename: finalFileName,
//             path: finalFilePath,
//             file_type: file.mimetype,
//             size: file.size,
//         }
        
//         await this.fileUploadService.saveUploadFile(fileData);
//         return { file_URL};
//     }

//     @Get(':id')
//     async getFileById(@Param('id') id: string, @Res() res): Promise<File_Upload> {
//             const file = await this.fileUploadService.getFileById(id);
//             if (!file) {
//                 throw new HttpException('File not found', HttpStatus.NOT_FOUND);
//             }
//             const filePath =  file.path;
//             if (!existsSync(filePath)) {
//                 throw new HttpException('File path not found', HttpStatus.NOT_FOUND);
//             }
//             return res.sendFile(filePath);
//     }
// }