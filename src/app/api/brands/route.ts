import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const brands = await prisma.brand.findMany();
    return NextResponse.json(brands);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar marcas' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const brand = await prisma.brand.create({
      data: {
        name: body.name,
        description: body.description,
        slug: body.name.toLowerCase().replace(/\s+/g, '-'),
      },
    });
    return NextResponse.json(brand);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao criar marca' },
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
        { error: 'ID da marca não fornecido' },
        { status: 400 }
      );
    }

    await prisma.brand.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Marca removida com sucesso' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao remover marca' },
      { status: 500 }
    );
  }
} 