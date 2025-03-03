import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Migration started...");
  console.log("resetting database...");

  prisma.$transaction([
    prisma.user.deleteMany(),
    // other table as needed
  ]);

  // User
  const hashPassword = await bcrypt.hash("Admin@123", 10);
  const user = await prisma.user.upsert({
    where: {
      email: "admin@admin.com",
    },
    update: {},
    create: {
      email: "admin@admin.com",
      password: hashPassword,
    },
  });

  const profile = await prisma.profile.create({
    data: {
      address: "Texas, Navada",
      avatar: "",
      bio: "Hey there!",
      firstName: "John",
      lastName: "Doe",
      userId: user.id,
    },
  });

  const userDetail = await prisma.user.findUnique({
    where: {
      email: "admin@admin.com",
    },
    include: { profile: true },
  });

  console.log(userDetail);
}

main()
  .then(async () => {
    console.log("Seed complete!");
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
