import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/subcategories - Lista todas as subcategorias
export async function GET() {
  try {
    const subcategories = await prisma.subcategory.findMany({
      include: {
        category: true,
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

// POST /api/subcategories - Cria uma nova subcategoria (requer autenticação de admin)
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, slug, description, imageUrl, categoryId } = body;

    // Validação básica
    if (!name || !slug || !categoryId) {
      return NextResponse.json(
        { error: 'Dados inválidos' },
        { status: 400 }
      );
    }

    // Verifica se a categoria existe
    const category = await prisma.category.findUnique({
      where: { id: parseInt(categoryId) }
    });

    if (!category) {
      return NextResponse.json(
        { error: 'Categoria não encontrada' },
        { status: 404 }
      );
    }

    const subcategory = await prisma.subcategory.create({
      data: {
        name,
        slug,
        description,
        imageUrl,
        categoryId: parseInt(categoryId)
      }
    });

    return NextResponse.json(subcategory, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar subcategoria:', error);
    return NextResponse.json(
      { error: 'Erro ao criar subcategoria' },
      { status: 500 }
    );
  }
} 