'use client';

import { useCallback } from 'react';

interface WatermarkedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager' | undefined;
  fetchPriority?: 'high' | 'low' | 'auto' | undefined;
  style?: React.CSSProperties;
}

export function WatermarkedImage({
  src,
  alt,
  className = '',
  loading,
  fetchPriority,
  style,
}: WatermarkedImageProps) {
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`} style={style} onContextMenu={handleContextMenu}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover pointer-events-none"
        draggable={false}
        loading={loading}
        fetchPriority={fetchPriority}
      />
      {/* Center watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span
          className="text-white/25 font-serif text-xl sm:text-2xl md:text-3xl font-bold tracking-[0.3em] select-none"
          style={{
            textShadow: '0 1px 3px rgba(0,0,0,0.3)',
            transform: 'rotate(-25deg)',
          }}
        >
          澳门指导
        </span>
      </div>
    </div>
  );
}