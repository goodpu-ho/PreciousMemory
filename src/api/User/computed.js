import { prisma } from "../../../generated/prisma-client";

export default {
    User:{
        fullName: parent =>{            
            return `${parent.firstName} ${parent.lastName}`;
        },

        isFollowing: async (parent, _, {request}) =>{
            const {user} =  request;
            const {id:parentId} = parent;
            try{
                return prisma.$exists.user({
                    AND: [{id:parentId}, {followers_some : {id:user.id}}]
                });   
            }catch(error){
                console.log(error);
                return false;
            }

        },

        selfMe:(parent, _, {request}) => {
            const {user} = request;
            const {id:parentId} = parent;
            return user.id === parentId;
        }
    },

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
        }
    }
}