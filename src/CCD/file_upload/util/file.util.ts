import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileUploadUtilsService {
  constructor(private readonly configService: ConfigService) {}

  getMaxSize(type: string): number | undefined {
    const sizeString = this.configService.get<string>(`CCD_${type}UPLOADSIZE`);
    if (!sizeString) return undefined;

    const units: { [key: string]: number } = {
      KB: 1024,
      MB: 1024 * 1024,
      GB: 1024 * 1024 * 1024,
    };

    const parsed = sizeString.match(/^(\d+)([KMG]B)$/);
    if (!parsed) return undefined;

    const [, size, unit] = parsed;
    return parseInt(size) * units[unit];
  }
}