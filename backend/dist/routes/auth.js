"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const AuthRouter = (0, express_1.Router)();
AuthRouter.post("/register", auth_1.register);
AuthRouter.post("/login", auth_1.login);
AuthRouter.put("/update_details", auth_1.updateDetails);
AuthRouter.put("/update_password", auth_1.updatePassword);
exports.default = AuthRouter;
