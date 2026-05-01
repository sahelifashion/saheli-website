import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const product = await prisma.product.create({
      data: {
        name: data.name,
        category: data.category,
        description: data.description,
        price: parseFloat(data.price) || 0,
        imageUrl: data.imageUrl,
        images: data.images ? JSON.stringify(data.images) : "[]",
        inStock: data.inStock !== undefined ? data.inStock : true,
      }
    });
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Create product error:", error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
