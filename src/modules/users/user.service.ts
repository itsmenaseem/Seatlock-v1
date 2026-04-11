
import { MongoServerError } from "mongodb";
import { BadRequestError } from "../../errors/bad-request.error";
import { UnauthorizedError } from "../../errors/unautorized.error";
import {  UserDoc } from "./user.model";
import { createUser, findUserByEmail, findUserById } from "./user.repository";
import { NotFoundError } from "../../errors/not-found.error";
import { CreateUser } from "../../types/create-user.type";

/**
 * Authenticates a user using email and password.
 *
 * @param email - User's registered email address
 * @param password - Plain text password provided during login
 * @returns Authenticated user document if credentials are valid
 * @throws UnauthorizedError if email or password is incorrect
 */
export async function authenticateUserService(email:string,password:string):Promise<UserDoc>{
    const user = await findUserByEmail(email);
    if(!user)throw new BadRequestError("Invalid Credentials");
    const isMatchPassword = await user.comparePassword(password)
    if(!isMatchPassword)throw new BadRequestError("Invalid Credentials");
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

export async function createUserService(data:CreateUser):Promise<UserDoc>{
    const existingUser = await findUserByEmail(data.email);
    if(existingUser)throw new BadRequestError("Email already exists")
    try {
        const user = await createUser(data);
        return user
    } catch (error) {
        if(error instanceof MongoServerError){
            if(error.code === "11000")throw new BadRequestError("Email already exists")
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

export  async function getUserService(id:string):Promise<UserDoc>{
    const user = await findUserById(id);
    if(!user)throw new NotFoundError("User not found");
    return user;
}






