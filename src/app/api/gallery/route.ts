import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const galleryImages = await prisma.galleryImage.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(galleryImages);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch gallery images' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const galleryImage = await prisma.galleryImage.create({
      data: {
        title: data.title,
        price: data.price,
        imageUrl: data.imageUrl,
      }
    });
    return NextResponse.json(galleryImage, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create gallery image' }, { status: 500 });
  }
}
