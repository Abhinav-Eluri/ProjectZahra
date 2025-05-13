import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: Retrieve all visible images for public display
export async function GET(request) {
  try {
    // Get all visible images
    const images = await prisma.image.findMany({
      where: {
        visible: true
      },
      orderBy: { 
        priority: 'asc' 
      },
      select: {
        id: true,
        file_id: true,
        filePath: true,
        description: true,
        price: true,
        visible: true,
        priority: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error fetching public images:', error);
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}