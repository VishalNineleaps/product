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
exports.ProductService = void 0;
const dbConfig_1 = require("../db/dbConfig");
const Product_1 = require("../entities/Product");
class ProductService {
    constructor() {
        this.getProduct = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield this.productRepository.findBy({ id });
                return product;
            }
            catch (err) {
                throw err;
            }
        });
        this.createProduct = (product) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newproduct = yield this.productRepository.save(product);
                return newproduct;
            }
            catch (err) {
                throw err;
            }
        });
        this.updateProduct = (product, id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedProduct = yield this.productRepository.update(id, product);
                return updatedProduct;
            }
            catch (err) {
                throw err;
            }
        });
        this.deleteProduct = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedProduct = yield this.productRepository.delete(id);
                return deletedProduct;
            }
            catch (err) {
                throw err;
            }
        });
        this.productRepository = dbConfig_1.AppDataSource.getRepository(Product_1.Product);
    }
}
exports.ProductService = ProductService;
//# sourceMappingURL=ProductService.js.map