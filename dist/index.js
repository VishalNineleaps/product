"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProductController_1 = require("./controller/ProductController");
require('dotenv').config();
class Index {
    constructor() {
        this.app = (0, express_1.default)();
        this.configuration();
        this.productController = new ProductController_1.ProductController;
        this.routes();
    }
    configuration() {
        this.app.set('port', process.env.PORT || 9000);
    }
    routes() {
        this.app.use('/api/product/', this.productController.router);
        this.app.get('/', (req, res) => {
            res.send('Working Product Service');
        });
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Listening to port : ${this.app.get('port')}`);
        });
    }
}
const index = new Index();
index.start();
//# sourceMappingURL=index.js.map