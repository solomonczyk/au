import { PrismaClient, Prisma } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createMockPrisma(): PrismaClient {
  const modelHandler: ProxyHandler<object> = {
    get(_t, method) {
      if (String(method) === "then") return undefined;
      return async (...args: any[]) => {
        const m = String(method);
        if (["count", "aggregate"].includes(m)) return 0;
        if (["findFirst", "findUnique"].includes(m)) return null;
        if (m === "findMany") return [];
        if (["create", "update", "upsert"].includes(m)) return {};
        if (["delete", "deleteMany"].includes(m)) return { count: 0 };
        return null;
      };
    },
  };

  return new Proxy({} as PrismaClient, {
    get(_t, prop) {
      if (typeof prop === "symbol") return undefined;
      const str = String(prop);
      if (str === "then") return undefined;
      if (["$connect", "$disconnect", "$on"].includes(str)) return async () => {};
      if (str === "$use") return () => {};
      if (str === "$transaction") return async (fn: any) => {
        if (typeof fn === "function") return fn(prisma);
        return [];
      };
      return new Proxy({}, modelHandler);
    },
  });
}

function createPrisma(): PrismaClient {
  try {
    if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL not configured");
    return new PrismaClient({
      adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
    });
  } catch (e) {
    console.warn("[Prisma] Database unavailable — using mock client:", (e as Error).message);
    return createMockPrisma();
  }
}

export const prisma = globalForPrisma.prisma ?? createPrisma();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export { Prisma };
