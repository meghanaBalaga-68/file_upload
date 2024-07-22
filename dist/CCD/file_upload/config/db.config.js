"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const file_upload_entity_1 = require("../file_upload.entity");
exports.default = (0, config_1.registerAs)('orm.config', () => ({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'test',
    entities: [file_upload_entity_1.File_Upload],
    synchronize: true,
    driver: require('mysql2')
}));
//# sourceMappingURL=db.config.js.map