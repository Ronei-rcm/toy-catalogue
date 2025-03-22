
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Link 
      to={`/catalog?category=${category.name.toLowerCase().replace(/ /g, '-')}`}
      className="block group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="glass-card rounded-2xl overflow-hidden">
        {/* Category Image */}
        <div className="relative overflow-hidden aspect-[5/3] bg-gray-100">
          {!isImageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="loading-spinner" />
            </div>
          )}
          <img
            src={category.imageUrl}
            alt={category.name}
            className={`object-cover w-full h-full transition-transform duration-500 
              ${isHovered ? 'scale-110' : 'scale-100'}
              ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIsImageLoaded(true)}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="font-semibold text-xl">{category.name}</h3>
              <div 
                className={`flex items-center mt-2 text-sm transition-all duration-300 
                  ${isHovered ? 'translate-x-2' : 'translate-x-0'}`}
              >
                <span className="mr-1">Explore</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
