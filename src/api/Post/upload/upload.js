import { isAuthenticated } from "../../../middleware"
import { prisma } from "../../../../generated/prisma-client";

export default{
    Mutation:{
        upload: async(_, args, {request}) =>{
            
            isAuthenticated(request);

            const {user} = request;
            const {caption, files} = args;
            const post = await prisma.createPost({caption, user:{ connect :{id:user.id}}});

            files.forEach( async file => {
                // file 은 많은 url들의 array라는 것을 기억해야 한다.
                await prisma.createFile({
                    url : file,
                    post:{
                        connect:{
                            id:post.id
                        }
                    }
                })
            });

            return post;
        }
    }
}