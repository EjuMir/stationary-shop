"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StationaryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const stationary_controller_1 = require("./stationary.controller");
const router = express_1.default.Router();
router.post('/products', stationary_controller_1.StationaryControllers.createStationaryProduct);
router.get('/products', stationary_controller_1.StationaryControllers.getAllProduct);
router.get('/products/:id', stationary_controller_1.StationaryControllers.getSingleProduct);
router.put('/products/:id', stationary_controller_1.StationaryControllers.updateOneProduct);
exports.StationaryRoutes = router;
