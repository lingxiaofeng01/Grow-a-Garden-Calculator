'use client';

import { useState } from 'react';
import { BookOpen } from 'lucide-react';

interface BlogImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
}

export function BlogImage({ src, alt, className = '', fallbackClassName = '' }: BlogImageProps) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div className={`bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg flex items-center justify-center group-hover:from-emerald-900/20 group-hover:to-slate-700 transition-all duration-300 ${fallbackClassName}`}>
        <BookOpen className="w-8 h-8 text-slate-500 group-hover:text-emerald-400 transition-colors" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setImageError(true)}
      loading="lazy"
    />
  );
} 