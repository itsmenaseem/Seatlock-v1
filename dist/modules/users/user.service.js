"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUserService = authenticateUserService;
exports.createUserService = createUserService;
exports.getUserService = getUserService;
const mongodb_1 = require("mongodb");
const bad_request_error_1 = require("../../errors/bad-request.error");
const user_repository_1 = require("./user.repository");
const not_found_error_1 = require("../../errors/not-found.error");
/**
 * Authenticates a user using email and password.
 *
 * @param email - User's registered email address
 * @param password - Plain text password provided during login
 * @returns Authenticated user document if credentials are valid
 * @throws UnauthorizedError if email or password is incorrect
 */
async function authenticateUserService(email, password) {
    const user = await (0, user_repository_1.findUserByEmail)(email);
    if (!user)
        throw new bad_request_error_1.BadRequestError("Invalid Credentials");
    const isMatchPassword = await user.comparePassword(password);
    if (!isMatchPassword)
        throw new bad_request_error_1.BadRequestError("Invalid Credentials");
    return user;
}
/**
 * Creates a new user after validating uniqueness of email.
 *
 * @param email - User's email address
 * @param password - Plain text password
 * @returns Newly created user document
 * @throws BadRequestError if email already exists
 */
async function createUserService(data) {
    const existingUser = await (0, user_repository_1.findUserByEmail)(data.email);
    if (existingUser)
        throw new bad_request_error_1.BadRequestError("Email already exists");
    try {
        const user = await (0, user_repository_1.createUser)(data);
        return user;
    }
    catch (error) {
        if (error instanceof mongodb_1.MongoServerError) {
            if (error.code === "11000")
                throw new bad_request_error_1.BadRequestError("Email already exists");
        }
        throw error;
    }
}
/**
 * Retrieves a users.
 *
 * @param id - User's unique identifier
 * @throws NotFoundError if provided user's id does not exist
 * @returns User documents
 */
async function getUserService(id) {
    const user = await (0, user_repository_1.findUserById)(id);
    if (!user)
        throw new not_found_error_1.NotFoundError("User not found");
    return user;
}
//# sourceMappingURL=user.service.js.map