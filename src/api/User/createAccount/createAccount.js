import {prisma} from "../../../../generated/prisma-client";

export default {
    Mutation:{
        createAccount: async (_, args) =>{
            const {username, email, firstName="", lastName="", bio=""} = args;
            const exist = await prisma.$exists.user({
                OR:[
                    {
                        username
                    },
                    {email}
                ]
            });
            if(exist){
                throw Error("This username is already taken");
            }
            try{
                await prisma.createUser({
                    username,
                    email,
                    firstName,
                    lastName,
                    bio
                });
                return true;
            } catch(e) {
                console.log(e.messgae);
                return false;
            }
            
        }
    }
}