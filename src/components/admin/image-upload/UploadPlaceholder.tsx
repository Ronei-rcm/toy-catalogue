
import React from 'react';
import { Upload, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UploadPlaceholderProps } from './types';

const UploadPlaceholder: React.FC<UploadPlaceholderProps> = ({
  onUploadClick,
  isUploading,
  errorMessage,
  maxSizeMB
}) => {
  return (
    <div className="py-8 flex flex-col items-center gap-4">
      <div className="bg-muted rounded-full p-4">
        <ImageIcon className="h-8 w-8 text-muted-foreground" />
      </div>
      
      <div className="space-y-2">
        <p className="text-sm font-medium">
          Arraste uma imagem ou clique para upload
        </p>
        <p className="text-xs text-muted-foreground">
          Formatos suportados: JPG, PNG ou GIF (máx {maxSizeMB}MB)
        </p>
      </div>
      
      {errorMessage && (
        <p className="text-sm text-red-500 font-medium">
          {errorMessage}
        </p>
      )}
      
      <Button 
        variant="secondary" 
        onClick={onUploadClick}
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
            Selecionar arquivo
          </>
        )}
      </Button>
    </div>
  );
};

export default UploadPlaceholder;
