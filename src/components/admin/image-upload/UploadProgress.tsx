
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { UploadProgressProps } from './types';

const UploadProgress: React.FC<UploadProgressProps> = ({ progress }) => {
  return (
    <div className="space-y-2">
      <Progress value={progress} className="h-2 w-full" />
      <p className="text-xs text-muted-foreground">
        Enviando imagem... {Math.round(progress)}%
      </p>
    </div>
  );
};

export default UploadProgress;
