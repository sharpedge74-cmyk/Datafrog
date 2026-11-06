import React from 'react';
import { Sparkles } from 'lucide-react';

interface CandyAdSlotProps {
  placement: 'below-tool' | 'sidebar' | 'between-content';
}

export const CandyAdSlot: React.FC<CandyAdSlotProps> = ({ placement }) => {
  if (placement === 'sidebar') {
    return (
      <div
        className="candy-ad-slot w-full min-h-[300px] p-4 text-center select-none"
        style={{ minHeight: '300px' }}
      >
        <div className="text-[11px] font-bold text-gray-400 tracking-wider uppercase mb-2">
          Sponsor / Community Space
        </div>
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-400 to-purple-500 text-white flex items-center justify-center mb-3 shadow-md">
          <Sparkles className="w-7 h-7" />
        </div>
        <div className="text-base font-extrabold text-[#4a2820]">
          100% Free &amp; Private
        </div>
        <p className="text-xs text-[#7a5047] mt-1 max-w-[200px]">
          DataFrog Tools will always remain 100% in-browser with zero subscriptions and zero data tracking.
        </p>
        <div className="mt-4 text-[11px] font-bold text-[#ff5b99] bg-pink-50 px-3 py-1 rounded-full border border-pink-200">
          Clean Web Pledge
        </div>
      </div>
    );
  }

  if (placement === 'below-tool') {
    return (
      <div
        className="candy-ad-slot w-full my-6 p-4 text-center select-none"
        style={{ minHeight: '90px' }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full max-w-3xl px-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-sm">
              ✓
            </span>
            <div className="text-left">
              <span className="text-sm font-bold text-[#4a2820]">
                Clean In-Browser Execution
              </span>
              <p className="text-xs text-[#7a5047]">
                Your pictures are rendered with hardware acceleration in local client memory.
              </p>
            </div>
          </div>
          <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider bg-white/80 px-2 py-0.5 rounded border border-gray-200">
            DataFrog Safe
          </span>
        </div>
      </div>
    );
  }

  // between-content
  return (
    <div
      className="candy-ad-slot w-full my-8 p-5 text-center select-none"
      style={{ minHeight: '100px' }}
    >
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
        <span className="text-xl">🍬</span>
        <div>
          <div className="text-sm font-bold text-[#4a2820]">
            Loving DataFrog Image Tools?
          </div>
          <div className="text-xs text-[#7a5047]">
            Bookmark this site or press Install to use all 50+ image utilities offline anytime!
          </div>
        </div>
        <span className="text-xl">🐸</span>
      </div>
    </div>
  );
};
