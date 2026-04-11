import mongoose, { Schema } from "mongoose";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { jwtConfig } from "../../configs/jwt.config";


export interface UserDoc extends Document {
    name:string;
    email:string;
    password:string;
    comparePassword(password: string): Promise<boolean>;
    generateJWT(): string;
}

const userSchema = new Schema<UserDoc>({
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        select:false
    }
},{
    timestamps:true,
    toJSON:{
        transform(doc,ret:any){
            ret.id = ret._id;
            delete ret._id
            delete ret.__v
            delete ret.password
            return ret
        }
    }
});


userSchema.pre("save",async function(){
    if(this.isModified("password")){
        this.password = await bcryptjs.hash(this.password,10);
    }

})

userSchema.methods.comparePassword = async function(this:UserDoc, candidatePassword: string): Promise<boolean> {
    return await bcryptjs.compare(candidatePassword, this.password);
};

userSchema.methods.generateJWT = function(this):string{
        if (!jwtConfig.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
        }
    const payload = {
        id:this._id,
        email:this.email,
        role:this.role,
        status:this.status
    }
    const token = jwt.sign(payload,jwtConfig.JWT_SECRET!,{
        expiresIn:"1h"
    });
    return token
}

// creating email index for faster query
// userSchema.index({ email: 1 });

export const User = mongoose.model<UserDoc>("user",userSchema);
