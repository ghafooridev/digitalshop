import { PrismaClient } from '@prisma/client';
import type * as PrismaType from '@prisma/client';

export const prisma = new PrismaClient();
export type { PrismaType };
