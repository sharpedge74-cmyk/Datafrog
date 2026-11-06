import React, { useEffect } from 'react';
import { Star, Sparkles } from 'lucide-react';

interface CelebrationModalProps {
  word: 'Sweet!' | 'Delicious!' | 'Tasty!' | 'Superb!';
  comboCount: number;
  onDismiss: () => void;
}

export const CelebrationModal: React.FC<CelebrationModalProps> = ({
  word,
  comboCount,
  onDismiss,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 2800);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div
      onClick={onDismiss}
      className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center p-4"
    >
      <div className="sweet-banner pointer-events-auto cursor-pointer bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-1.5 rounded-3xl shadow-2xl border-4 border-white transform hover:scale-105 transition">
        <div className="bg-white/95 px-8 py-6 rounded-2xl text-center backdrop-blur-sm relative overflow-hidden">
          {/* Sparkle decorative icons */}
          <div className="absolute top-2 left-3 text-yellow-400 animate-spin">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="absolute bottom-2 right-3 text-pink-400 animate-bounce">
            <Star className="w-5 h-5 fill-current" />
          </div>

          <div className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 tracking-tight uppercase">
            {word}
          </div>

          <p className="mt-1 text-sm font-bold text-[#7a5047]">
            Your images are processed &amp; ready!
          </p>

          {comboCount > 1 && (
            <div className="mt-3 inline-flex items-center gap-1.5 bg-yellow-400 text-amber-950 font-black text-xs sm:text-sm px-4 py-1 rounded-full shadow-md border-2 border-white animate-pulse">
              <span>🔥 COMBO x{comboCount}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
