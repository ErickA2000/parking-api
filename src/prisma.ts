import { hashPassword } from "@Helpers/password";
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

//* Add users
async function createUsers(): Promise<void> {
  const count = await prisma.user.count();

  if (count === 0) {
    const role = await prisma.role.findFirst({
      where: {
        name: "admin"
      }
    });

    if (role === null) throw new Error("Role not found");

    await prisma.user.createMany({
      data: [
        {
          email: "admin@example.com",
          password: await hashPassword("Admin@1234"),
          name: "Admin",
          idRole: role?.id
        }
      ]
    });
  }
}

createRoles().catch((err) => {
  console.error(err);
});

createUsers().catch((err) => {
  console.error(err);
});

export default prisma;
