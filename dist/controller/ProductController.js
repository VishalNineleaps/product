"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const express_1 = require("express");
const ProductService_1 = require("../service/ProductService");
class ProductController {
    constructor() {
        this.getProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req['params'];
            const product = yield this.productService.getProduct(Number(id));
            res.send(product);
        });
        this.createProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const product = req['body'];
            const newProduct = yield this.productService.createProduct(product);
            res.send(newProduct);
        });
        this.updateProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const product = req['body'];
            const id = req['params'];
            const updatedProduct = yield this.productService.updateProduct(product, Number(id));
            res.send(updatedProduct);
        });
        this.deleteProduct = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req['params'];
            yield this.productService.deleteProduct(Number(id));
            res.send('Product deleted');
        });
        this.router = (0, express_1.Router)();
        this.productService = new ProductService_1.ProductService();
        this.routes();
    }
    routes() {
        this.router.get('/:id', this.getProduct);
        this.router.post('/', this.createProduct);
        this.router.put('/', this.updateProduct);
        this.router.delete('/', this.deleteProduct);
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=ProductController.js.map