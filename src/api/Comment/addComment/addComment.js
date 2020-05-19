import { isAuthenticated } from "../../../middleware"
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation:{
        addComment: async (_, args, { request }) => {
            isAuthenticated(request);
            const {text, postId} = args;
            const {user} = request;
            const comment = await prisma.createComment({
                user: {
                    connect: {
                        id: user.id
                    }
                },
                Post: {
                    connect: {
                        id: postId
                    }
                },
                text
            });
            return comment
        }
    }
}