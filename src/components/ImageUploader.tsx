import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { toast } from "sonner";

interface ImageUploaderProps {
  onImageSelect: (files: File[]) => void;
  isLoading?: boolean;
  multiple?: boolean;
}

export function ImageUploader({ onImageSelect, isLoading, multiple = false }: ImageUploaderProps) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setUploadedFiles(acceptedFiles);
        onImageSelect(acceptedFiles);
        toast.success(`${acceptedFiles.length} image(s) uploaded successfully!`);
      }
    },
    [onImageSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    multiple,
    disabled: isLoading,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
        isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300",
        isLoading && "opacity-50 cursor-not-allowed"
      )}
    >
      <input {...getInputProps()} />
      {isLoading ? (
        <div className="flex flex-col items-center space-y-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
          <p className="text-sm text-gray-500">Creating content...</p>
        </div>
      ) : uploadedFiles.length > 0 ? (
        <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center space-x-2">
            <Check className="h-6 w-6 text-green-500" />
            <p className="text-green-600 font-medium">
              {uploadedFiles.length} image(s) uploaded!
            </p>
          </div>
          <p className="text-xs text-gray-400">Click or drag to replace</p>
        </div>
      ) : isDragActive ? (
        <p className="text-blue-500">Drop the images here...</p>
      ) : (
        <div>
          <p className="text-gray-600">
            {multiple ? 'Drag & drop images here, or click to select' : 'Drag & drop an image here, or click to select'}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Supports: JPG, PNG, GIF, WebP
          </p>
        </div>
      )}
    </div>
  );
}