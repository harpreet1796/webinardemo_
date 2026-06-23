import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)

declare global {
    // allow global `var` declarations
    // eslint-disable-next-line no-var, vars-on-top
    var prisma: PrismaClient | undefined;
}

export const prismaClient = globalThis.prisma || new PrismaClient();
export const prisma = new PrismaClient({ adapter })
if (process.env.NODE_ENV !== 'production') globalThis.prisma = prismaClient;