import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Role } from '@prisma/client';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== Role.ADMIN) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, description, logoUrl, website } = body;

    // Validação básica
    if (!name) {
      return NextResponse.json(
        { error: 'Nome é obrigatório' },
        { status: 400 }
      );
    }

    // Verifica se a marca existe
    const existingBrand = await prisma.brand.findUnique({
      where: { id: params.id }
    });

    if (!existingBrand) {
      return NextResponse.json(
        { error: 'Marca não encontrada' },
        { status: 404 }
      );
    }

    const brand = await prisma.brand.update({
      where: { id: params.id },
      data: {
        name,
        description,
        logoUrl,
        website
      }
    });

    return NextResponse.json(brand);
  } catch (error) {
    console.error('Erro ao atualizar marca:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar marca' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== Role.ADMIN) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      );
    }

    // Verifica se a marca existe
    const existingBrand = await prisma.brand.findUnique({
      where: { id: params.id }
    });

    if (!existingBrand) {
      return NextResponse.json(
        { error: 'Marca não encontrada' },
        { status: 404 }
      );
    }

    // Verifica se existem produtos associados
    const productsCount = await prisma.product.count({
      where: { brandId: params.id }
    });

    if (productsCount > 0) {
      return NextResponse.json(
        { error: 'Não é possível excluir uma marca que possui produtos' },
        { status: 400 }
      );
    }

    await prisma.brand.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ message: 'Marca excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir marca:', error);
    return NextResponse.json(
      { error: 'Erro ao excluir marca' },
      { status: 500 }
    );
  }
} 