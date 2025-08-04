import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

// This interface defines the props the component accepts.
interface FileUploaderProps {
  onFileSelect: (file: File) => void;
}

// A helper function to format file size.
const formatSize = (size: number) => `${(size / (1024 * 1024)).toFixed(2)} MB`;
const maxFileSize = 5 * 1024 * 1024; // Example: 5MB max file size.

function FileUploader({ onFileSelect }: FileUploaderProps) {
  // State to hold the selected file.
  const [file, setFile] = useState<File | null>(null);

  // Callback function that runs when a file is dropped or selected.
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile); // Update the local state with the file.
      onFileSelect(selectedFile); // Pass the file up to the parent component.
    }
  }, [onFileSelect]);

  // Hook from react-dropzone to get props for the dropzone elements.
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] }, // Accepts only PDF files.
    maxSize: maxFileSize,
  });

  // Function to remove the selected file.
  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents the dropzone click event from firing.
    setFile(null);
  };

  return (
    <div className="w-full gradient-border">
      {/* getRootProps provides necessary event handlers like onClick, onKeyDown, etc. */}
      <div {...getRootProps()} className="p-8 border-dashed border-2 border-gray-300 text-center">
        {/* getInputProps provides props for the hidden file input element. */}
        <input {...getInputProps()} />

        {file ? (
          // If a file is selected, display its name, size, and a remove button.
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src="/icons/pdf-icon.svg" alt="pdf" className="w-8 h-8" />
              <div className="text-left">
                <p className="text-md font-semibold">{file.name}</p>
                <p className="text-sm text-gray-500">{formatSize(file.size)}</p>
              </div>
            </div>
            <button onClick={removeFile} className="p-1 rounded-full hover:bg-gray-200">
              <img src="/icons/cross.svg" alt="remove" className="w-4 h-4" />
            </button>
          </div>
        ) : (
          // If no file is selected, show the upload prompt.
          <div className="space-y-2">
            <img src="/icons/upload-cloud.svg" alt="upload" className="mx-auto w-12 h-12" />
            <p className="text-lg text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-lg text-gray-500">PDF (max {formatSize(maxFileSize)})</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FileUploader;