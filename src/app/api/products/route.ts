import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/products - Lista todos os produtos com filtros opcionais
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        brand: true,
      },
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar produtos' },
      { status: 500 }
    );
  }
}

// POST /api/products - Cria um novo produto (requer autenticação de admin)
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
    const {
      name,
      description,
      price,
      stock,
      imageUrl,
      categoryId,
      status = 'active',
      brandId
    } = body;

    // Validação básica
    if (!name || !description || !price || !categoryId || !brandId) {
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

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        stock: parseInt(stock) || 0,
        imageUrl,
        categoryId: parseInt(categoryId),
        status,
        brandId: parseInt(brandId)
      }
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    return NextResponse.json(
      { error: 'Erro ao criar produto' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID do produto não fornecido' },
        { status: 400 }
      );
    }

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Produto removido com sucesso' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao remover produto' },
      { status: 500 }
    );
  }
} 