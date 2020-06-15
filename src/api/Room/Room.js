import { prisma } from "../../../generated/prisma-client";

export default {
  Room: {
    participants: ({ id }) => prisma.room({ id }).participants(),
    message: ({ id }) => prisma.room({ id }).message()
  }
};