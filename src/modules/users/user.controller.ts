import { Request, Response } from "express";
import { authenticateUserService, createUserService, getUserService,  } from "./user.service";



export async function createUserController(req: Request, res: Response) {
    const {name,email,password} = req.body;
   const user = await createUserService({email,password,name});
   const token = user.generateJWT();
     res.cookie("token",token,{
      sameSite:"lax",
      httpOnly:true,
       maxAge: 24 * 60 * 60 * 1000 // 1 Day
     })
   res.status(201).json({user})
}



export async function loginUserController(req: Request, res: Response){
    const {email,password} = req.body;
     const user = await authenticateUserService(email,password);
     const token = user.generateJWT();
     res.cookie("token",token,{
      sameSite:"lax",
      httpOnly:true,
       maxAge: 24 * 60 * 60 * 1000 // 1 Day
     })
     return res.status(200).send({user});
}
