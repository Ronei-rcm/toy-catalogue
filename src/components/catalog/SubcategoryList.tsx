
import React from 'react';
import { Subcategory } from '@/types/product';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface SubcategoryListProps {
  subcategories: Subcategory[];
  activeSubcategory: string | null;
  setActiveSubcategory: (subcategoryId: string | null) => void;
}

const SubcategoryList: React.FC<SubcategoryListProps> = ({ 
  subcategories, 
  activeSubcategory, 
  setActiveSubcategory 
}) => {
  if (subcategories.length === 0) return null;
  
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Subcategorias</h2>
        <Button variant="ghost" onClick={() => setActiveSubcategory(null)}>
          Ver todas
        </Button>
      </div>
      <div className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar">
        {subcategories.map((subcategory) => (
          <div
            key={subcategory.id}
            onClick={() => setActiveSubcategory(subcategory.id)}
            className={`flex-shrink-0 w-[200px] cursor-pointer ${
              activeSubcategory === subcategory.id ? 'ring-2 ring-primary' : ''
            }`}
          >
            <Card className="h-full overflow-hidden">
              <div className="h-24 bg-muted overflow-hidden">
                {subcategory.imageUrl && (
                  <img 
                    src={subcategory.imageUrl} 
                    alt={subcategory.name} 
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <CardContent className="p-3">
                <h3 className="font-medium text-sm">{subcategory.name}</h3>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubcategoryList;
