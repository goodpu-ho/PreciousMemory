import { isAuthenticated } from "../../../middleware"
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation:{
        editPost: async (_, args, {request}) => {
            isAuthenticated(request);
            const {user} = request;
            const{id, caption, location, action} = args;
            const post = await prisma.$exists.post({id, user:{id:user.id}});
            if(post){
                if(action === "EDIT"){
                    return prisma.updatePost(
                        {
                            data : {caption, location},
                            where:{id}
                        }
                    )
                } else if(action === "DELETE") {
                    return prisma.deletePost({id});
                }

            }else {
                throw Error("You can't do that");
            }

        }
    }
}