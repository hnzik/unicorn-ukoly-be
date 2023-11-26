"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("./routes/api"));
const paths_1 = __importDefault(require("./routes/paths"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
mongoose_1.default.connect(process.env.DATABASE_URL)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error(err));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(paths_1.default.Base, api_1.default);
app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
        res.status(401).send({ error: "Unauthorized" });
    }
});
exports.default = app;
