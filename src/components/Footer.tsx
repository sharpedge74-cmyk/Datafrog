import React from 'react';
import { ShieldCheck, Heart, Sparkles, Wifi, WifiOff } from 'lucide-react';
import { CATEGORIES, TOOLS_CONFIG } from '../config/tools';
import { sound } from '../utils/sound';

interface FooterProps {
  onSelectTool: (id: string) => void;
  onNavigateHome: () => void;
  isOnline: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTool, onNavigateHome, isOnline }) => {
  return (
    <footer className="mt-20 border-t-4 border-white bg-white/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <div
              onClick={() => {
                sound.playPop();
                onNavigateHome();
              }}
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-400 to-green-500 p-1 border-2 border-white shadow-sm">
                <img src="/icon.svg" alt="DataFrog Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-xl font-black text-[#4a2820]">
                DataFrog<span className="text-[#ff5b99]">.tools</span>
              </span>
            </div>

            <p className="text-xs font-semibold text-[#7a5047] leading-relaxed">
              50+ free, fast image tools that run 100% locally in your browser. Zero uploads, zero tracking, maximum privacy.
            </p>

            {/* Offline Status Badge */}
            <div className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-[#ff5b99]">
              {isOnline ? (
                <>
                  <Wifi className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Online &amp; PWA Ready</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-500" />
                  <span>Offline Mode (Cached locally)</span>
                </>
              )}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-black uppercase text-[#4a2820] tracking-wider mb-3">
              Categories
            </h4>
            <ul className="space-y-2 text-xs font-bold text-[#7a5047]">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      sound.playPop();
                      const first = TOOLS_CONFIG.find((t) => t.category === cat.id);
                      if (first) onSelectTool(first.id);
                    }}
                    className="hover:text-[#ff5b99] transition text-left"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Fast Links */}
          <div>
            <h4 className="text-xs font-black uppercase text-[#4a2820] tracking-wider mb-3">
              Top Utilities
            </h4>
            <ul className="space-y-2 text-xs font-bold text-[#7a5047]">
              {['image-compressor', 'compress-to-100kb', 'passport-photo-resizer', 'crop-image', 'heic-to-jpg', 'background-remover'].map((id) => {
                const t = TOOLS_CONFIG.find((item) => item.id === id);
                if (!t) return null;
                return (
                  <li key={id}>
                    <button
                      onClick={() => {
                        sound.playPop();
                        onSelectTool(t.id);
                      }}
                      className="hover:text-[#ff5b99] transition text-left"
                    >
                      {t.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Privacy Guarantee */}
          <div>
            <h4 className="text-xs font-black uppercase text-[#4a2820] tracking-wider mb-3">
              100% Client Privacy
            </h4>
            <div className="p-3.5 bg-emerald-50/80 rounded-2xl border border-emerald-200 text-xs font-semibold text-emerald-900 space-y-2">
              <div className="flex items-center gap-1.5 font-extrabold text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero Server Uploads</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Your images never leave your computer or smartphone. All image processing operations are performed directly within your browser’s client memory.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-pink-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-bold text-[#7a5047]">
          <div>
            © {new Date().getFullYear()} DataFrog Tools. Free, Open &amp; Private.
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-current" />
            <span>and sweet candy pixels</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
