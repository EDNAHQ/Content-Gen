import { ImageUploader } from "@/components/ImageUploader";

interface ImageUploadSectionProps {
  files?: File[];
  isLoading: boolean;
  onImageSelect: (files: File[]) => void;
  label?: string;
}

export function ImageUploadSection({ 
  files, 
  isLoading, 
  onImageSelect,
  label = "Upload Images"
}: ImageUploadSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700">{label}</p>
        <ImageUploader 
          onImageSelect={onImageSelect} 
          isLoading={isLoading}
          multiple={true}
        />
      </div>
      {files && files.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">
            Selected Images ({files.length}):
          </p>
          <div className="grid grid-cols-2 gap-2">
            {files.map((file, index) => (
              <div key={index} className="text-sm text-gray-600 truncate">
                {file.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}