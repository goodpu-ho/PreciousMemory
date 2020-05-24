import { prisma } from "../../../generated/prisma-client";

export default {
    Post:{
        isLiked: async(parent, _, {request}) => {
            const {user} = request;
            const {id} = parent;            
            return prisma.$exists.like({
                AND: [
                    {
                        user:{
                            id:user.id
                        }
                    },
                    {
                        Post:{
                            id
                        }
                    }
                ]
            });
        },
        likeCount: parent =>
        prisma
          .likesConnection({
            where: { Post: { id: parent.id } }
          })
          .aggregate()
          .count()
    }
}