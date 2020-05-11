import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../Utils";

export default {
    Mutation:{
        confirmSecret: async(_, args) => {
            const {email, secret} = args;
            const user = await prisma.user({email});
            if(user.loginSecret === secret){
                return generateToken(user.id);                
                // throw "TOKEN";
            }else{
                throw Error("wrong email/secret conviation");
            }
        }
    }
}   