import { isAuthenticated } from "../../../middleware"
import { prisma } from "../../../../generated/prisma-client";
import { ROOM_FRAGMENT } from "../../../fragment";

export default {
    Query:{
        seeRooms: (_, __, {request}) => {
            isAuthenticated(request);
            const {user} = request;

            return prisma.rooms({where:{
                participants_some:{
                    id:user.id
                }
            }}).$fragment(ROOM_FRAGMENT);

        }
    }
}