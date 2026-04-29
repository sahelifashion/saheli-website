import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    await prisma.galleryImage.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete gallery image' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const data = await request.json();
    const galleryImage = await prisma.galleryImage.update({
      where: { id },
      data: {
        title: data.title,
        price: data.price,
        imageUrl: data.imageUrl,
      }
    });
    return NextResponse.json(galleryImage);
  } catch (error) {
    console.error("Update gallery error:", error);
    return NextResponse.json({ error: 'Failed to update gallery image' }, { status: 500 });
  }
}
