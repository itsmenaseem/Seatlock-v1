"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmail = findUserByEmail;
exports.findUserById = findUserById;
exports.createUser = createUser;
const user_model_1 = require("./user.model");
function findUserByEmail(email) {
    return user_model_1.User.findOne({ email }).select("+password");
}
function findUserById(id) {
    return user_model_1.User.findById(id);
}
function createUser(data) {
    return user_model_1.User.create({
        ...data,
    });
}
//# sourceMappingURL=user.repository.js.map