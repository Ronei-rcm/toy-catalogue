
export interface ImageUploadProps {
  imageUrl: string;
  onChange: (url: string) => void;
  label?: string;
  maxSizeMB?: number;
}

export interface ImagePreviewProps {
  imageUrl: string;
  onRemove: () => void;
  onReset: () => void;
  progress?: number;
  isUploading: boolean;
  onChangeClick: () => void;
}

export interface UploadPlaceholderProps {
  onUploadClick: () => void;
  isUploading: boolean;
  errorMessage: string | null;
  maxSizeMB: number;
}

export interface UploadProgressProps {
  progress: number;
}
