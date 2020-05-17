import {generateSecret, sendSecretMail} from "../../../Utils"
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        requestSecret: async(_, args) => {            
            const {email} = args;
            const loginSecret = generateSecret();                        
            try{                
                await sendSecretMail(email, loginSecret);
                await prisma.updateUser({data:{loginSecret}, where:{email}});
                return true;
            } catch(error){
                console.log(error);
                return false;
            }
        }
    }
};