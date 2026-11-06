import React, { useRef, useState, useEffect, DragEvent } from 'react';
import { Upload, Image as ImageIcon, X, Files } from 'lucide-react';
import { sound } from '../utils/sound';

interface CandyDropzoneProps {
  accept: string;
  multiple: boolean;
  files: File[];
  onFilesSelected: (files: File[]) => void;
  onRemoveFile: (index: number) => void;
}

export const CandyDropzone: React.FC<CandyDropzoneProps> = ({
  accept,
  multiple,
  files,
  onFilesSelected,
  onRemoveFile,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clipboard paste listener (Ctrl+V / Cmd+V)
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      const pastedFiles: File[] = [];
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith('image/')) {
          const file = items[i].getAsFile();
          if (file) pastedFiles.push(file);
        }
      }

      if (pastedFiles.length > 0) {
        sound.playDrop();
        if (multiple) {
          onFilesSelected([...files, ...pastedFiles]);
        } else {
          onFilesSelected([pastedFiles[0]]);
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [files, multiple, onFilesSelected]);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      sound.playDrop();
      const droppedList = Array.from(e.dataTransfer.files);
      if (multiple) {
        onFilesSelected([...files, ...droppedList]);
      } else {
        onFilesSelected([droppedList[0]]);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      sound.playDrop();
      const picked = Array.from(e.target.files);
      if (multiple) {
        onFilesSelected([...files, ...picked]);
      } else {
        onFilesSelected([picked[0]]);
      }
    }
    // reset input value so re-selecting the same file fires onChange
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept={accept === 'none' ? undefined : accept}
        multiple={multiple}
        onChange={handleInputChange}
        className="hidden"
      />

      {files.length === 0 ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => {
            sound.playPop();
            fileInputRef.current?.click();
          }}
          className={`candy-dropzone p-8 sm:p-12 text-center transition-all ${
            isDragOver ? 'drag-active' : 'hover:border-[#ff5b99] hover:bg-pink-50/40'
          }`}
        >
          {/* Animated floating sweet icon */}
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-pink-400 to-purple-500 text-white flex items-center justify-center shadow-lg border-4 border-white mb-4 transform hover:scale-110 transition duration-300">
            <Upload className="w-10 h-10 animate-bounce" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#4a2820] tracking-tight">
            Drop your pictures here
          </h3>

          <p className="mt-2 text-sm sm:text-base font-semibold text-[#7a5047] max-w-md mx-auto">
            or click to browse files from your device. You can also press{' '}
            <kbd className="px-2 py-0.5 bg-white border border-pink-200 rounded text-xs font-mono shadow-sm">
              Ctrl+V
            </kbd>{' '}
            to paste from clipboard.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              className="candy-btn candy-btn-green py-3 px-6 text-base"
              onClick={(e) => {
                e.stopPropagation();
                sound.playPop();
                fileInputRef.current?.click();
              }}
            >
              <ImageIcon className="w-5 h-5" />
              <span>Choose {multiple ? 'Files' : 'Image'}</span>
            </button>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs font-bold text-[#ff5b99]">
            {multiple ? (
              <span className="flex items-center gap-1">
                <Files className="w-4 h-4" /> Multiple files supported (bulk processing)
              </span>
            ) : (
              <span>Single file processor (max 50MB)</span>
            )}
          </div>
        </div>
      ) : (
        /* Selected Files Grid Preview */
        <div className="p-4 bg-white/90 rounded-3xl border-3 border-pink-200 shadow-md">
          <div className="flex items-center justify-between pb-3 border-b border-pink-100 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-[#4a2820]">
                Selected {files.length} {files.length === 1 ? 'file' : 'files'}
              </span>
              <span className="text-xs bg-pink-100 text-[#ff5b99] px-2.5 py-0.5 rounded-full font-extrabold">
                {(files.reduce((a, b) => a + b.size, 0) / 1024).toFixed(1)} KB Total
              </span>
            </div>
            <button
              onClick={() => {
                sound.playPop();
                fileInputRef.current?.click();
              }}
              className="text-xs font-bold text-[#ff5b99] hover:underline"
            >
              + Add More Files
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-60 overflow-y-auto p-1">
            {files.map((f, idx) => (
              <div
                key={`${f.name}-${idx}`}
                className="relative group rounded-2xl border-2 border-pink-100 bg-pink-50/50 p-2 text-center overflow-hidden hover:shadow-md transition"
              >
                <div className="w-full h-20 rounded-xl bg-white flex items-center justify-center overflow-hidden mb-1">
                  {f.type.startsWith('image/') ? (
                    <img
                      src={URL.createObjectURL(f)}
                      alt={f.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs font-bold text-gray-500 uppercase">
                      {f.name.split('.').pop()}
                    </span>
                  )}
                </div>
                <div className="text-xs font-bold text-[#4a2820] truncate">{f.name}</div>
                <div className="text-[10px] text-[#7a5047]">{(f.size / 1024).toFixed(0)} KB</div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    sound.playPop();
                    onRemoveFile(idx);
                  }}
                  className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-80 hover:opacity-100 shadow transition"
                  title="Remove file"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
