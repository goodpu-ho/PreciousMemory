import { isAuthenticated } from "../../../middleware";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editUser: async (_, args, { request }) => {
      isAuthenticated(request);
      const { user } = request;
      const { username, email, firstName, lastName, bio } = args;
      return prisma.updateUser({
        where: { id: user.id },
        data: { username, email, firstName, lastName, bio }
      });
    },
  },
};
