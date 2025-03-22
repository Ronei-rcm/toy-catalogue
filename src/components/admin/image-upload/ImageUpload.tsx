
import React, { useState, useRef, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { ImageUploadProps } from './types';
import ImagePreview from './ImagePreview';
import UploadPlaceholder from './UploadPlaceholder';
import { validateImageFile, simulateUploadProgress, readFileAsDataURL } from './utils';

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  imageUrl, 
  onChange,
  label = 'Imagem do produto',
  maxSizeMB = 5 
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const displayUrl = previewUrl || imageUrl;
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  // Reset da mensagem de erro quando a imagem muda
  useEffect(() => {
    if (displayUrl) {
      setErrorMessage(null);
    }
  }, [displayUrl]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setErrorMessage(null);
    
    if (!file) return;
    
    // Validar arquivo
    const { isValid, errorMessage } = validateImageFile(file, maxSizeBytes);
    if (!isValid) {
      setErrorMessage(errorMessage);
      return;
    }
    
    // Simular upload
    setIsUploading(true);
    const progressInterval = simulateUploadProgress(
      setUploadProgress,
      () => {
        setIsUploading(false);
        toast({
          title: 'Imagem enviada',
          description: 'A imagem foi carregada com sucesso',
        });
      }
    );
    
    try {
      // Ler arquivo como URL de dados
      const dataUrl = await readFileAsDataURL(file);
      setPreviewUrl(dataUrl);
      onChange(dataUrl);
    } catch (error) {
      clearInterval(progressInterval);
      setIsUploading(false);
      setErrorMessage('Erro ao ler o arquivo');
      toast({
        title: 'Erro',
        description: 'Não foi possível processar a imagem',
        variant: 'destructive',
      });
    }
  };
  
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleRemoveImage = () => {
    setPreviewUrl(null);
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setUploadProgress(0);
  };
  
  const handleResetImage = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="font-medium text-sm">{label}</div>
      
      <div className={`border-2 border-dashed rounded-lg p-4 text-center ${errorMessage ? 'border-red-500' : 'border-input'}`}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        
        {displayUrl ? (
          <ImagePreview 
            imageUrl={displayUrl}
            onRemove={handleRemoveImage}
            onReset={handleResetImage}
            progress={uploadProgress}
            isUploading={isUploading}
            onChangeClick={handleButtonClick}
          />
        ) : (
          <UploadPlaceholder 
            onUploadClick={handleButtonClick}
            isUploading={isUploading}
            errorMessage={errorMessage}
            maxSizeMB={maxSizeMB}
          />
        )}
      </div>
      
      {imageUrl && !previewUrl && !isUploading && (
        <p className="text-xs text-muted-foreground">
          URL atual: {imageUrl.length > 50 ? `${imageUrl.substring(0, 50)}...` : imageUrl}
        </p>
      )}
    </div>
  );
};

export default ImageUpload;
