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
exports.StationaryProductServices = void 0;
const stationary_model_1 = require("./stationary.model");
const createStationaryProductInDB = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield stationary_model_1.StationaryModel.create(product);
    return result;
});
const getAllProductFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield stationary_model_1.StationaryModel.find();
    return result;
});
const getSingleProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield stationary_model_1.StationaryModel.findOne({ _id: new Object(id) });
    return result;
});
const updateProductInDB = (id, updateProduct) => __awaiter(void 0, void 0, void 0, function* () {
    const newUpdatedTime = (updateProduct.updatedAt = Date.now());
    const updatedProduct = Object.assign(Object.assign({}, updateProduct), { updatedAt: newUpdatedTime });
    const result = yield stationary_model_1.StationaryModel.findByIdAndUpdate(id, { updatedProduct });
    console.log(result);
    return result;
});
exports.StationaryProductServices = {
    createStationaryProductInDB,
    getAllProductFromDB,
    getSingleProductFromDB,
    updateProductInDB,
};
