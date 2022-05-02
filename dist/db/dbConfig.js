"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const Product_1 = require("../entities/Product");
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Password@123",
    database: "productdb",
    entities: [Product_1.Product],
    synchronize: true,
    logging: false,
});
//# sourceMappingURL=dbConfig.js.map