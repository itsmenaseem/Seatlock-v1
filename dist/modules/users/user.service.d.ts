import { UserDoc } from "./user.model";
import { CreateUser } from "../../types/create-user.type";
/**
 * Authenticates a user using email and password.
 *
 * @param email - User's registered email address
 * @param password - Plain text password provided during login
 * @returns Authenticated user document if credentials are valid
 * @throws UnauthorizedError if email or password is incorrect
 */
export declare function authenticateUserService(email: string, password: string): Promise<UserDoc>;
/**
 * Creates a new user after validating uniqueness of email.
 *
 * @param email - User's email address
 * @param password - Plain text password
 * @returns Newly created user document
 * @throws BadRequestError if email already exists
 */
export declare function createUserService(data: CreateUser): Promise<UserDoc>;
/**
 * Retrieves a users.
 *
 * @param id - User's unique identifier
 * @throws NotFoundError if provided user's id does not exist
 * @returns User documents
 */
export declare function getUserService(id: string): Promise<UserDoc>;
//# sourceMappingURL=user.service.d.ts.map