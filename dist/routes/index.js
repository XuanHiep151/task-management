"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = __importDefault(require("./task/index"));
const index_2 = __importDefault(require("./user/index"));
const router = (0, express_1.Router)();
router.use('/task', index_1.default);
router.use('/user', index_2.default);
exports.default = router;
