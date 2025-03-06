import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
// handle REST API routes GET,POST,...

import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  // get action by prisma
  const result = await prisma.product.findMany({ include: { images: true } });

  return NextResponse.json({
    data: result,
  });
}
// POST / PUT / DELETE
