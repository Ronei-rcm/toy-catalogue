
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { toast } from '@/components/ui/use-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast({
      description: `${product.name} added to cart`,
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Wishlist functionality to be implemented
    toast({
      description: `${product.name} added to wishlist`,
    });
  };

  return (
    <Link 
      to={`/product/${product.id}`} 
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="glass-card rounded-2xl overflow-hidden">
        {/* Product Image */}
        <div className="relative overflow-hidden aspect-square bg-gray-100">
          {!isImageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="loading-spinner" />
            </div>
          )}
          <img
            src={product.imageUrl}
            alt={product.name}
            className={`object-cover w-full h-full transition-transform duration-500 
              ${isHovered ? 'scale-110' : 'scale-100'}
              ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIsImageLoaded(true)}
          />
          
          {/* Quick action buttons */}
          <div 
            className={`absolute bottom-0 left-0 right-0 flex items-center justify-between p-4 
              transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <Button 
              size="icon" 
              variant="secondary" 
              className="rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-900"
              onClick={handleWishlist}
            >
              <Heart className="h-4 w-4" />
              <span className="sr-only">Add to wishlist</span>
            </Button>
            <Button 
              size="icon" 
              variant="secondary" 
              className="rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-900"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="sr-only">Add to cart</span>
            </Button>
          </div>
        </div>
        
        {/* Product Info */}
        <div className="p-4">
          <div className="flex items-center text-sm text-muted-foreground mb-1">
            <Star className="h-3.5 w-3.5 fill-primary text-primary mr-1" />
            <span>4.5 (24 reviews)</span>
          </div>
          <h3 className="font-medium text-lg line-clamp-1">{product.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{product.description}</p>
          <div className="mt-3 flex items-end justify-between">
            <div className="font-semibold">${product.price.toFixed(2)}</div>
            <div className="text-xs text-muted-foreground">
              {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left`}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
