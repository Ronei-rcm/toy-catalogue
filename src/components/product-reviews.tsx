'use client';

import { useState } from 'react';
import { Star, ThumbsUp, MessageSquare, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';

interface Review {
  id: string;
  user: {
    name: string;
    avatar: string;
    initials: string;
  };
  rating: number;
  date: string;
  comment: string;
  likes: number;
  replies: Reply[];
}

interface Reply {
  id: string;
  user: {
    name: string;
    avatar: string;
    initials: string;
  };
  date: string;
  comment: string;
}

const mockReviews: Review[] = [
  {
    id: '1',
    user: {
      name: 'João Silva',
      avatar: '/images/team/joao.jpg',
      initials: 'JS',
    },
    rating: 5,
    date: '2024-03-15',
    comment: 'Excelente produto! Meu filho adorou e já pediu mais um.',
    likes: 12,
    replies: [
      {
        id: '1-1',
        user: {
          name: 'Maria Santos',
          avatar: '/images/team/maria.jpg',
          initials: 'MS',
        },
        date: '2024-03-16',
        comment: 'Concordo! A qualidade é impressionante.',
      },
    ],
  },
  {
    id: '2',
    user: {
      name: 'Pedro Oliveira',
      avatar: '/images/team/pedro.jpg',
      initials: 'PO',
    },
    rating: 4,
    date: '2024-03-14',
    comment: 'Bom produto, mas poderia ter mais peças.',
    likes: 5,
    replies: [],
  },
];

export function ProductReviews() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(0);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const { toast } = useToast();

  const handleSubmitReview = () => {
    if (!newReview.trim() || rating === 0) {
      toast({
        title: 'Erro',
        description: 'Por favor, preencha todos os campos.',
        variant: 'destructive',
      });
      return;
    }

    const review: Review = {
      id: Date.now().toString(),
      user: {
        name: 'Usuário Atual',
        avatar: '',
        initials: 'UA',
      },
      rating,
      date: new Date().toISOString().split('T')[0],
      comment: newReview,
      likes: 0,
      replies: [],
    };

    setReviews((prev) => [review, ...prev]);
    setNewReview('');
    setRating(0);

    toast({
      title: 'Avaliação enviada',
      description: 'Sua avaliação foi publicada com sucesso!',
    });
  };

  const handleSubmitReply = (reviewId: string) => {
    if (!replyText.trim()) {
      toast({
        title: 'Erro',
        description: 'Por favor, digite sua resposta.',
        variant: 'destructive',
      });
      return;
    }

    const reply: Reply = {
      id: `${reviewId}-${Date.now()}`,
      user: {
        name: 'Usuário Atual',
        avatar: '',
        initials: 'UA',
      },
      date: new Date().toISOString().split('T')[0],
      comment: replyText,
    };

    setReviews((prev) =>
      prev.map((review) =>
        review.id === reviewId
          ? { ...review, replies: [...review.replies, reply] }
          : review
      )
    );

    setReplyText('');
    setReplyTo(null);

    toast({
      title: 'Resposta enviada',
      description: 'Sua resposta foi publicada com sucesso!',
    });
  };

  const handleLike = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((review) =>
        review.id === reviewId
          ? { ...review, likes: review.likes + 1 }
          : review
      )
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Avaliações do Produto</h2>
        <div className="flex items-center gap-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-5 w-5 ${
                  star <= rating
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-muted-foreground'
                } cursor-pointer`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {rating}/5 estrelas
          </span>
        </div>
        <Textarea
          placeholder="Compartilhe sua experiência com este produto..."
          className="mt-4"
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
        />
        <Button className="mt-4" onClick={handleSubmitReview}>
          Enviar Avaliação
        </Button>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border rounded-lg p-4">
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarImage src={review.user.avatar} />
                <AvatarFallback>{review.user.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{review.user.name}</p>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(review.date).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(review.id)}
                  >
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    {review.likes}
                  </Button>
                </div>
                <p className="mt-2">{review.comment}</p>
              </div>
            </div>

            {/* Respostas */}
            {review.replies.length > 0 && (
              <div className="mt-4 ml-12 space-y-4">
                {review.replies.map((reply) => (
                  <div key={reply.id} className="flex items-start gap-4">
                    <Avatar>
                      <AvatarImage src={reply.user.avatar} />
                      <AvatarFallback>{reply.user.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{reply.user.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(reply.date).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                      <p className="mt-1">{reply.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Formulário de resposta */}
            {replyTo === review.id ? (
              <div className="mt-4 ml-12">
                <Textarea
                  placeholder="Digite sua resposta..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <div className="flex gap-2 mt-2">
                  <Button
                    size="sm"
                    onClick={() => handleSubmitReply(review.id)}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Responder
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setReplyTo(null);
                      setReplyText('');
                    }}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="mt-4 ml-12"
                onClick={() => setReplyTo(review.id)}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Responder
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 