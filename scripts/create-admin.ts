import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { hashPassword } from "../src/lib/auth/password";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set.");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

function getArg(flag: string) {
  const index = process.argv.indexOf(flag);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

async function main() {
  const email =
    getArg("--email") ?? process.argv[2] ?? process.env.ADMIN_EMAIL;
  const password =
    getArg("--password") ?? process.argv[3] ?? process.env.ADMIN_PASSWORD;
  const fullName =
    getArg("--name") ??
    process.argv[4] ??
    process.env.ADMIN_FULL_NAME ??
    "Administrator";

  if (!email || !password) {
    console.error(
      "Usage: npm run admin:create -- --email <email> --password <password> [--name <full name>]",
    );
    console.error(
      "Or set ADMIN_EMAIL, ADMIN_PASSWORD, and optional ADMIN_FULL_NAME in .env",
    );
    process.exit(1);
  }

  if (password.length < 8) {
    console.error("Password must be at least 8 characters.");
    process.exit(1);
  }

  const existing = await prisma.admin.findUnique({ where: { email } });

  if (existing) {
    console.log(`Admin already exists for ${email}`);
    return;
  }

  const passwordHash = await hashPassword(password);

  const admin = await prisma.admin.create({
    data: {
      email,
      fullName,
      passwordHash,
    },
  });

  console.log("Admin created successfully.");
  console.log(`ID: ${admin.id}`);
  console.log(`Name: ${admin.fullName}`);
  console.log(`Email: ${admin.email}`);
}

main()
  .catch((error) => {
    console.error("Failed to create admin:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
