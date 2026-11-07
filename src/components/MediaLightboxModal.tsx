import React from 'react';
import { X, Play, Maximize2, ExternalLink } from 'lucide-react';

interface MediaLightboxModalProps {
  item: {
    title: string;
    category: string;
    imageUrl: string;
    description: string;
    videoUrl?: string;
  } | null;
  onClose: () => void;
  onInquire?: (title: string) => void;
}

export const MediaLightboxModal: React.FC<MediaLightboxModalProps> = ({ item, onClose, onInquire }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md">
      <div className="bg-[#242424] border border-white/20 max-w-4xl w-full p-4 sm:p-6 text-stone-100 relative shadow-2xl max-h-[95vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-stone-400 hover:text-white border border-white/20 bg-stone-900"
          aria-label="Close media lightbox"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="font-mono text-xs text-stone-400 mb-2 uppercase">
          PLATE ARCHIVE // {item.category}
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white uppercase font-display mb-4 pr-10">
          {item.title}
        </h3>

        {/* Media Frame (Video Player or High-Res Image) */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-black border border-white/10 mb-4">
          {item.videoUrl ? (
            <video
              src={item.videoUrl}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain"
            />
          ) : (
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-contain"
            />
          )}
        </div>

        {/* Caption & Specs */}
        <div className="p-4 bg-stone-950 border border-white/10 space-y-2">
          <div className="text-xs font-mono text-[#E9E0D7] uppercase tracking-wider">
            TECHNICAL ATTRIBUTES & WORK DONE:
          </div>
          <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
            {item.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10 mt-4 text-xs font-mono text-stone-400">
          <span>DAS ON-SITE ARCHIVE</span>
          <div className="flex items-center gap-2">
            {onInquire && (
              <button
                onClick={() => onInquire(item.title)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white uppercase font-semibold transition-colors flex items-center gap-1.5"
              >
                <span>Inquire on WhatsApp</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 border border-white/20 hover:border-white text-stone-300 hover:text-white uppercase transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
