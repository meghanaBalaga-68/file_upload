import { ConfigService } from '@nestjs/config';
export declare class FileUploadUtilsService {
    private readonly configService;
    constructor(configService: ConfigService);
    getMaxSize(type: string): number | undefined;
}
