import React, { useState } from 'react';
import axios from 'axios';
import { Upload, RefreshCw, X } from 'lucide-react';

interface ImageUploaderProps {
  onUploadComplete?: (imageData: { name: string; url: string }) => void;
  onError?: (error: string) => void;
  className?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onUploadComplete,
  onError,
  className = '',
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(null);
      setPreview(null);
      return;
    }

    const file = e.target.files[0];
    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreview(null);
    
    // Clear file input
    const fileInput = document.getElementById('image-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Call the callback with the uploaded image data
      if (onUploadComplete) {
        onUploadComplete(response.data);
      }

      // Clear the selection
      clearSelection();
    } catch (error) {
      console.error('Upload failed:', error);
      if (onError) {
        onError('Failed to upload image.');
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={`${className}`}>
      <div className="mb-4">
        <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 mb-2">
          Select Image
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 
                     file:mr-4 file:py-2 file:px-4
                     file:rounded file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100"
        />
      </div>

      {preview && (
        <div className="mb-4 relative">
          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
            <img 
              src={preview} 
              alt="Preview" 
              className="w-full h-full object-contain" 
            />
          </div>
          <button 
            type="button"
            onClick={clearSelection}
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-red-50"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div