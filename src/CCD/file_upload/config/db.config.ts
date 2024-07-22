import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { File_Upload } from "../file_upload.entity";




export default registerAs('orm.config', (): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'test',
    entities: [File_Upload],
    synchronize: true,
    driver: require('mysql2')
}));