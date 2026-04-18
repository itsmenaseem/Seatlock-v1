"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserController = createUserController;
exports.loginUserController = loginUserController;
exports.logout = logout;
const user_service_1 = require("./user.service");
async function createUserController(req, res) {
    const { name, email, password } = req.body;
    const user = await (0, user_service_1.createUserService)({ email, password, name });
    const token = user.generateJWT();
    res.cookie("token", token, {
        sameSite: "lax",
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 Day
    });
    res.status(201).json({ user });
}
async function loginUserController(req, res) {
    const { email, password } = req.body;
    const user = await (0, user_service_1.authenticateUserService)(email, password);
    const token = user.generateJWT();
    res.cookie("token", token, {
        sameSite: "lax",
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 Day
    });
    return res.status(200).send({ user });
}
function logout(req, res) {
    res.cookie("token", "", {
        maxAge: 0
    });
    res.status(200).json({ message: "Logged Out" });
}
//# sourceMappingURL=user.controller.js.map