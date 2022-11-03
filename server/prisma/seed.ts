import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Ada Lovelace",
      email: "adalovelace@gmail.com",
      avatarUrl: "https://github.com/rhenandias.png",
    },
  });

  const pool = await prisma.pool.create({
    data: {
      title: "Bolão da Programação",
      code: "BOL123",
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-05T12:00:00.000Z",
      firstTeamCountryCode: "BR",
      secondTeamCountryCode: "FR",
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-08T12:00:00.000Z",
      firstTeamCountryCode: "DE",
      secondTeamCountryCode: "AR",

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 3,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              },
            },
          },
        },
      },
    },
  });
}

main();
