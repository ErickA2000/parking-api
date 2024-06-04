import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//* Add roles
async function createRoles(): Promise<void> {
  const count = await prisma.role.count();

  if (count === 0) {
    await prisma.role.createMany({
      data: [
        {
          name: "admin",
          description: "Rol administrador"
        },
        {
          name: "socio",
          description: "Rol socio"
        }
      ]
    });
  }
}

createRoles().catch((err) => {
  console.error(err);
});

export default prisma;
