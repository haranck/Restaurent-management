import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { ENV } from "./env.config";

const pool = new Pool({ connectionString: ENV.DATABASE_URL });
const adapter = new PrismaPg(pool);

const prismaClientSingleton = (): PrismaClient => {
    return new PrismaClient({ adapter });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (ENV.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}