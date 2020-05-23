import { isAuthenticated } from "../../../middleware"
import { prisma } from "../../../../generated/prisma-client";
import { USER_FRAGMENT } from "../../../fragment";

export default {
    Query:{
        me: async (_, __, {request}) => {
            isAuthenticated(request);
            const {user} = request;
            const userPf = await prisma.user({id: user.id});
            const posts = await prisma.user({id: user.id}).posts();
            return{
                user:userPf,
                posts
            };

        }
    },
    User:{
        fullName: parent =>{            
            return `${parent.firstName} ${parent.lastName}`;
        }
    }
}