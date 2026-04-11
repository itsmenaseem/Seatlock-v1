
import { CreateUser } from "../../types/create-user.type";
import { User, UserDoc } from "./user.model";




export function findUserByEmail(email: string): Promise<UserDoc | null> {
  return User.findOne({ email }).select("+password");
}

export  function findUserById(id: string): Promise<UserDoc | null> {
  return User.findById(id);
}

export function createUser(data: CreateUser): Promise<UserDoc> {
  return User.create({
    ...data,
  });
}



