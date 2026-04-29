"use client";

import { CldUploadWidget } from "next-cloudinary";
import { UploadCloud } from "lucide-react";

interface CloudinaryUploadProps {
  onUploadSuccess: (url: string) => void;
}

export default function CloudinaryUpload({ onUploadSuccess }: CloudinaryUploadProps) {
  return (
    <CldUploadWidget 
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "unsigned_preset"}
      onSuccess={(result: any) => {
        if (result.info && result.info.secure_url) {
          onUploadSuccess(result.info.secure_url);
        }
      }}
    >
      {({ open }) => {
        return (
          <button
            type="button"
            onClick={() => open()}
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-600">Click to upload image</span>
          </button>
        );
      }}
    </CldUploadWidget>
  );
}
