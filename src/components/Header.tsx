import React, { useState } from 'react';
import { Volume2, VolumeX, Download, ShieldCheck, Search, X } from 'lucide-react';
import { sound } from '../utils/sound';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { CATEGORIES, TOOLS_CONFIG } from '../config/tools';

interface HeaderProps {
  onNavigateHome: () => void;
  onSelectTool: (id: string) => void;
  activeToolId?: string | null;
}

export const Header: React.FC<HeaderProps> = ({ onNavigateHome, onSelectTool }) => {
  const [isMuted, setIsMuted] = useState(sound.isMuted);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const { isInstallable, isIOS, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);

  const handleSoundToggle = () => {
    const nextMuted = sound.toggleMute();
    setIsMuted(nextMuted);
  };

  const filteredTools = searchQuery.trim()
    ? TOOLS_CONFIG.filter(
        (t) =>
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 8)
    : [];

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b-2 border-white/60 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <div
          onClick={() => {
            sound.playPop();
            onNavigateHome();
          }}
          className="flex items-center gap-3 cursor-pointer group select-none flex-shrink-0"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-400 to-green-500 p-1 border-2 border-white shadow-md group-hover:scale-105 transition-transform">
            <img src="/icon.svg" alt="DataFrog Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight text-[#4a2820] group-hover:text-[#ff5b99] transition-colors">
                DataFrog<span className="text-[#ff5b99]">.</span>
              </span>
              <span className="hidden sm:inline-block bg-pink-100 text-pink-600 text-xs px-2.5 py-0.5 rounded-full font-bold border border-pink-200">
                100% IN-BROWSER
              </span>
            </div>
            <p className="text-xs font-semibold text-[#7a5047] hidden md:block">
              Free 50+ Client-Side Image Tools
            </p>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="relative flex-1 max-w-md hidden sm:block">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 absolute left-3.5 text-[#ff5b99] pointer-events-none" />
            <input
              type="text"
              placeholder="Search 50+ image tools (e.g. compress, png, crop)..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchDropdown(true);
              }}
              onFocus={() => setShowSearchDropdown(true)}
              className="w-full pl-11 pr-9 py-2.5 bg-pink-50/70 border-2 border-pink-200 rounded-full text-sm font-semibold text-[#4a2820] placeholder-pink-400 focus:outline-none focus:border-[#ff5b99] focus:bg-white shadow-inner transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-pink-400 hover:text-pink-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Search Dropdown Results */}
          {showSearchDropdown && filteredTools.length > 0 && (
            <div className="absolute top-14 left-0 right-0 bg-white rounded-2xl shadow-xl border-2 border-pink-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="text-xs font-bold text-[#7a5047] px-3 py-1 uppercase tracking-wider">
                Matching Tools ({filteredTools.length})
              </div>
              <div className="space-y-1 mt-1">
                {filteredTools.map((tool) => (
                  <div
                    key={tool.id}
                    onClick={() => {
                      sound.playPop();
                      onSelectTool(tool.id);
                      setShowSearchDropdown(false);
                      setSearchQuery('');
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-pink-50 cursor-pointer transition"
                  >
                    <div>
                      <div className="text-sm font-bold text-[#4a2820]">{tool.name}</div>
                      <div className="text-xs text-[#7a5047] line-clamp-1">{tool.shortDesc}</div>
                    </div>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-pink-100 text-[#ff5b99]">
                      {tool.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            className={`p-2.5 rounded-full border-2 transition-all shadow-sm ${
              isMuted
                ? 'bg-gray-100 border-gray-300 text-gray-500 hover:bg-gray-200'
                : 'bg-yellow-100 border-yellow-300 text-amber-600 hover:scale-105'
            }`}
            title={isMuted ? 'Sound is OFF (Click to Unmute)' : 'Sound is ON (Click to Mute)'}
            aria-label="Toggle Sound Effects"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 animate-pulse" />}
          </button>

          {/* PWA Install Button */}
          {isInstallable && (
            <button
              onClick={() => {
                sound.playPop();
                install();
              }}
              className="candy-btn candy-btn-green text-xs sm:text-sm py-2 px-3 sm:px-4 shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span className="hidden md:inline">Install App</span>
            </button>
          )}

          {isIOS && (
            <button
              onClick={() => {
                sound.playPop();
                setShowIOSModal(true);
              }}
              className="candy-btn candy-btn-blue text-xs sm:text-sm py-2 px-3 shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Install PWA</span>
            </button>
          )}

          {/* Privacy Badge */}
          <div className="hidden lg:flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-200 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>0% Uploads / 100% Local</span>
          </div>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 overflow-x-auto flex items-center gap-2 scrollbar-none border-t border-pink-100/60">
        <button
          onClick={() => {
            sound.playPop();
            onNavigateHome();
          }}
          className="text-xs font-bold px-3 py-1 rounded-full bg-pink-100 text-[#ff5b99] hover:bg-pink-200 transition whitespace-nowrap"
        >
          All 50+ Tools
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              sound.playPop();
              const firstTool = TOOLS_CONFIG.find((t) => t.category === cat.id);
              if (firstTool) onSelectTool(firstTool.id);
            }}
            className="text-xs font-bold px-3 py-1 rounded-full bg-white text-[#7a5047] hover:bg-pink-50 hover:text-[#ff5b99] border border-pink-100 transition whitespace-nowrap"
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* iOS Safari Install Guide Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border-4 border-pink-200 text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-pink-100 flex items-center justify-center text-[#ff5b99] mb-4">
              <Download className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-[#4a2820]">Install DataFrog on iOS</h3>
            <p className="mt-2 text-sm text-[#7a5047] leading-relaxed">
              1. Tap the <strong>Share</strong> button in your Safari toolbar.<br />
              2. Scroll down and tap <strong>Add to Home Screen</strong>.<br />
              3. Launch DataFrog like a native app anytime, even offline!
            </p>
            <button
              onClick={() => setShowIOSModal(false)}
              className="candy-btn candy-btn-pink mt-5 w-full py-2.5 text-sm"
            >
              Got It!
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
