
import React from 'react';
import { Upload, X, RotateCcw, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ImagePreviewProps } from './types';
import UploadProgress from './UploadProgress';

const ImagePreview: React.FC<ImagePreviewProps> = ({
  imageUrl,
  onRemove,
  onReset,
  progress,
  isUploading,
  onChangeClick
}) => {
  return (
    <div className="space-y-4">
      <div className="relative mx-auto max-w-xs">
        <img
          src={imageUrl}
          alt="Visualização"
          className="mx-auto max-h-64 object-contain rounded-md"
        />
        <Button
          variant="destructive"
          size="icon"
          className="absolute -top-2 -right-2 h-8 w-8 rounded-full"
          onClick={onRemove}
          disabled={isUploading}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      {isUploading && progress !== undefined && (
        <UploadProgress progress={progress} />
      )}
      
      <div className="flex justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          disabled={isUploading}
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Resetar
        </Button>
        
        <Button
          variant="secondary"
          size="sm"
          onClick={onChangeClick}
          disabled={isUploading}
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Trocar imagem
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ImagePreview;
