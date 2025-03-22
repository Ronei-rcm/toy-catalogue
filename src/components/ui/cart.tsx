import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Cart({ isOpen, onClose }: CartProps) {
  const { items, removeFromCart, updateQuantity, getTotal, getItemCount } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16">
        <div className="w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-xl">
            <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-medium text-gray-900">Carrinho de Compras</h2>
                <div className="ml-3 h-7 flex items-center">
                  <button
                    type="button"
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={onClose}
                  >
                    <span className="sr-only">Fechar painel</span>
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              {items.length === 0 ? (
                <div className="mt-8 text-center">
                  <p className="text-gray-500">Seu carrinho está vazio</p>
                  <Link
                    href="/"
                    className="mt-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-500"
                    onClick={onClose}
                  >
                    Continuar comprando
                  </Link>
                </div>
              ) : (
                <div className="mt-8">
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {items.map((item) => (
                        <li key={item.product.id} className="py-6 flex">
                          <div className="relative flex-shrink-0 w-24 h-24 rounded-md overflow-hidden">
                            <Image
                              src={item.product.imageUrl || '/images/placeholder.jpg'}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                              sizes="96px"
                            />
                          </div>

                          <div className="ml-4 flex-1 flex flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <Link href={`/produtos/${item.product.id}`}>
                                    {item.product.name}
                                  </Link>
                                </h3>
                                <p className="ml-4">R$ {item.product.price.toFixed(2)}</p>
                              </div>
                            </div>
                            <div className="flex-1 flex items-end justify-between text-sm">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() =>
                                    updateQuantity(item.product.id, item.quantity - 1)
                                  }
                                  className="p-1 rounded-full hover:bg-gray-100"
                                >
                                  <Minus className="h-4 w-4" />
                                </button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <button
                                  onClick={() =>
                                    updateQuantity(item.product.id, item.quantity + 1)
                                  }
                                  className="p-1 rounded-full hover:bg-gray-100"
                                >
                                  <Plus className="h-4 w-4" />
                                </button>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeFromCart(item.product.id)}
                                className="font-medium text-red-600 hover:text-red-500"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>R$ {getTotal().toFixed(2)}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Frete e impostos calculados no checkout.
                </p>
                <div className="mt-6">
                  <Link
                    href="/checkout"
                    className="flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                    onClick={onClose}
                  >
                    Finalizar compra
                  </Link>
                </div>
                <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                  <p>
                    ou{' '}
                    <Link
                      href="/"
                      className="text-blue-600 font-medium hover:text-blue-500"
                      onClick={onClose}
                    >
                      Continuar comprando
                      <span aria-hidden="true"> &rarr;</span>
                    </Link>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 