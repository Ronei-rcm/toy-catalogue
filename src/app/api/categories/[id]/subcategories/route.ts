import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/categories/[id]/subcategories - Lista todas as subcategorias de uma categoria
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const categoryId = parseInt(params.id);

    // Verifica se a categoria existe
    const category = await prisma.category.findUnique({
      where: { id: categoryId }
    });

    if (!category) {
      return NextResponse.json(
        { error: 'Categoria não encontrada' },
        { status: 404 }
      );
    }

    const subcategories = await prisma.subcategory.findMany({
      where: { categoryId },
      include: {
        products: {
          select: {
            id: true,
            name: true,
            price: true,
            imageUrl: true,
            status: true
          }
        }
      }
    });

    return NextResponse.json(subcategories);
  } catch (error) {
    console.error('Erro ao buscar subcategorias:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar subcategorias' },
      { status: 500 }
    );
  }
} 