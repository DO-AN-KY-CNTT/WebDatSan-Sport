import React from 'react';
import { Images } from 'lucide-react';
import type { Court } from '../../types';

type CourtGalleryProps = { court: Court; activeImageIndex: number; onSelectImage: (index: number) => void };

const fallbackImage = 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=1000';

export const CourtGallery: React.FC<CourtGalleryProps> = ({ court, activeImageIndex, onSelectImage }) => {
  const images = court.images?.length ? court.images : [fallbackImage];
  const activeImage = images[activeImageIndex] || images[0];

  return (
    <section aria-label={`Hình ảnh ${court.name}`} className="grid gap-3 sm:grid-cols-[minmax(0,1.8fr)_minmax(220px,.9fr)]">
      <figure className="relative h-[300px] overflow-hidden rounded-[var(--sb-radius-lg)] bg-[#f1e9ea] sm:h-[430px]">
        <img
          src={activeImage}
          alt={court.name}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = fallbackImage;
          }}
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-[var(--sb-ink)]/85 px-3 py-2 text-xs font-bold text-white"><Images aria-hidden="true" className="h-4 w-4" />{images.length} ảnh sân</div>
      </figure>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-1 sm:grid-rows-2">
        {images.slice(0, 2).map((image, index) => (
          <button key={`${image}-${index}`} type="button" onClick={() => onSelectImage(index)} aria-label={`Xem ảnh ${index + 1}`} aria-pressed={activeImageIndex === index} className={`group relative min-h-32 overflow-hidden rounded-[var(--sb-radius-lg)] border-2 bg-[#f1e9ea] text-left ${activeImageIndex === index ? 'border-[var(--sb-accent)]' : 'border-transparent'}`}>
            <img
              src={image}
              alt=""
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = fallbackImage;
              }}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {index === 1 && images.length > 2 && <span className="absolute bottom-3 right-3 rounded-full bg-white px-3 py-1 text-xs font-bold text-[var(--sb-ink)]">Xem thêm</span>}
          </button>
        ))}
      </div>
    </section>
  );
};
