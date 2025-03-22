'use client';

import { useState, useEffect } from 'react';
import { Bell, X, ShoppingBag, Tag, Gift, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Notification {
  id: string;
  type: 'order' | 'offer' | 'gift' | 'shipping';
  title: string;
  message: string;
  date: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'order',
    title: 'Pedido Confirmado',
    message: 'Seu pedido #12345 foi confirmado e está sendo processado.',
    date: '2024-03-20T10:30:00',
    read: false,
  },
  {
    id: '2',
    type: 'offer',
    title: 'Oferta Especial',
    message: '20% de desconto em todos os brinquedos educativos!',
    date: '2024-03-19T15:45:00',
    read: false,
  },
  {
    id: '3',
    type: 'gift',
    title: 'Presente Surpresa',
    message: 'Ganhe um brinde na sua próxima compra acima de R$ 200!',
    date: '2024-03-18T09:15:00',
    read: true,
  },
  {
    id: '4',
    type: 'shipping',
    title: 'Envio em Andamento',
    message: 'Seu pedido #12345 está a caminho!',
    date: '2024-03-17T14:20:00',
    read: true,
  },
];

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'order':
      return <ShoppingBag className="h-5 w-5" />;
    case 'offer':
      return <Tag className="h-5 w-5" />;
    case 'gift':
      return <Gift className="h-5 w-5" />;
    case 'shipping':
      return <Truck className="h-5 w-5" />;
    default:
      return <Bell className="h-5 w-5" />;
  }
};

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Notificações</h3>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
              >
                Marcar todas como lidas
              </Button>
            )}
            {notifications.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAll}
              >
                Limpar todas
              </Button>
            )}
          </div>
        </div>
        <ScrollArea className="h-[400px]">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              Nenhuma notificação
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-muted/50 cursor-pointer ${
                    !notification.read ? 'bg-muted/30' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{notification.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(notification.date).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.message}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        setNotifications((prev) =>
                          prev.filter((n) => n.id !== notification.id)
                        );
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        {notifications.length > 0 && (
          <div className="p-4 border-t">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              Fechar
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
} 