import { isAuthenticated } from "../../../middleware"
import { prisma } from "../../../../generated/prisma-client";
import { USER_FRAGMENT } from "../../../fragment";

export default {
    Query:{
        me: async (_, __, {request}) => {
            isAuthenticated(request);
            const {user} = request;
            return await prisma.user({id: user.id});            

        }
    }
}