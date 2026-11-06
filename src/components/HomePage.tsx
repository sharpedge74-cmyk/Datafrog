import React, { useState } from 'react';
import {
  Sparkles,
  Shield,
  Zap,
  Lock,
  Search,
  ArrowRight,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { CATEGORIES, TOOLS_CONFIG, ToolConfig } from '../config/tools';
import { sound } from '../utils/sound';

interface HomePageProps {
  onSelectTool: (id: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onSelectTool }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openHomeFaq, setOpenHomeFaq] = useState<number | null>(null);

  const filteredTools = TOOLS_CONFIG.filter((t) => {
    const matchesCat = selectedCategory === 'all' || t.category === selectedCategory;
    const matchesQuery =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const popularTools = TOOLS_CONFIG.filter((t) => t.badge === 'POPULAR').slice(0, 8);

  const homeFaqs = [
    {
      q: 'How can DataFrog process images without uploading them?',
      a: 'We leverage modern client-side browser technologies: HTML5 Canvas, WebAssembly (WASM), and the Web Workers API. Your device\'s own CPU and GPU perform all pixel manipulation, cropping, and compression inside your browser memory. Your files are never sent over the internet.',
    },
    {
      q: 'Is DataFrog really 100% free with no limits?',
      a: 'Yes! Because we do not pay for heavy backend cloud servers or database storage, we pass those savings directly to you. There are no subscriptions, no credit card prompts, and no daily conversion limits.',
    },
    {
      q: 'What is the maximum file size supported?',
      a: 'DataFrog comfortably processes files up to 50MB. Because operations run on your local machine, performance depends on your device RAM rather than network bandwidth.',
    },
    {
      q: 'Can I use DataFrog offline without internet?',
      a: 'Yes! DataFrog is built as a Progressive Web App (PWA). Once you visit the site, our service worker caches the core application so you can open and use all image tools anywhere, even on an airplane or without WiFi.',
    },
    {
      q: 'Does DataFrog add any watermarks to my photos?',
      a: 'Never! All outputs are clean, high-resolution, and 100% watermark-free.',
    },
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="pt-8 pb-14 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-pink-100 text-[#ff5b99] text-xs sm:text-sm font-extrabold px-4 py-1.5 rounded-full uppercase tracking-wider mb-5 border-2 border-pink-200 shadow-xs">
          <Sparkles className="w-4 h-4" />
          <span>50+ FREE TOOLS • 100% CLIENT-SIDE • ZERO UPLOADS</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#4a2820] tracking-tight leading-[1.1]">
          Free Image Tools that <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600">
            Never Upload Your Files.
          </span>
        </h1>

        <p className="mt-5 text-base sm:text-xl font-semibold text-[#7a5047] max-w-2xl mx-auto leading-relaxed">
          Crunch, resize, convert, edit, and enhance photos at lightning speed. Everything runs locally on your device with complete privacy.
        </p>

        {/* Big Candy Search Bar */}
        <div className="mt-8 max-w-xl mx-auto relative">
          <div className="relative flex items-center shadow-lg rounded-full">
            <Search className="w-6 h-6 absolute left-4 text-[#ff5b99] pointer-events-none" />
            <input
              type="text"
              placeholder="Search all 50+ tools (e.g. compress to 100kb, png to svg, crop)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-13 pr-6 py-4 bg-white border-3 border-pink-200 rounded-full text-base sm:text-lg font-bold text-[#4a2820] placeholder-pink-300 focus:outline-none focus:border-[#ff5b99] shadow-inner"
            />
          </div>
        </div>

        {/* Category Level Cards */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          <div
            onClick={() => {
              sound.playPop();
              setSelectedCategory('all');
            }}
            className={`candy-level-tile ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-br from-pink-400 to-purple-500 text-white shadow-lg scale-105'
                : 'bg-white text-[#4a2820] hover:border-pink-300'
            }`}
          >
            <div className="text-2xl mb-1">🌟</div>
            <div className="text-sm font-black">All Tools</div>
            <div className="text-[11px] opacity-80 font-bold">{TOOLS_CONFIG.length} Utilities</div>
          </div>

          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count = TOOLS_CONFIG.filter((t) => t.category === cat.id).length;
            return (
              <div
                key={cat.id}
                onClick={() => {
                  sound.playPop();
                  setSelectedCategory(cat.id);
                }}
                className={`candy-level-tile ${
                  isSelected
                    ? 'bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-lg scale-105'
                    : 'bg-white text-[#4a2820] hover:border-pink-300'
                }`}
              >
                <div className="text-2xl mb-1">
                  {cat.id === 'compress' ? '🗜️' : cat.id === 'convert' ? '🔄' : cat.id === 'edit' ? '🎨' : cat.id === 'ai' ? '✨' : cat.id === 'privacy' ? '🛡️' : '📐'}
                </div>
                <div className="text-sm font-black">{cat.name.split(' ')[0]}</div>
                <div className="text-[11px] opacity-80 font-bold">{count} Tools</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Level Map Grid of Tool Tiles */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#4a2820]">
              {selectedCategory === 'all'
                ? 'Explore All Tools'
                : CATEGORIES.find((c) => c.id === selectedCategory)?.name}
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-[#7a5047]">
              Showing {filteredTools.length} free browser image tools
            </p>
          </div>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-xs font-bold text-[#ff5b99] hover:underline"
            >
              View All Tools →
            </button>
          )}
        </div>

        {/* Candy Grid with Level-path feel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => {
                sound.playPop();
                onSelectTool(tool.id);
              }}
              className="candy-card p-5 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`candy-badge ${
                      tool.badge === 'AI'
                        ? 'bg-purple-500'
                        : tool.badge === 'POPULAR'
                        ? 'bg-[#ff5b99]'
                        : tool.badge === 'NEW'
                        ? 'bg-emerald-500'
                        : 'bg-amber-500'
                    }`}
                  >
                    {tool.badge}
                  </span>
                  <span className="text-xs font-bold text-gray-400 capitalize">
                    {tool.category}
                  </span>
                </div>

                <h3 className="text-lg font-black text-[#4a2820] group-hover:text-[#ff5b99] transition-colors leading-snug">
                  {tool.name}
                </h3>

                <p className="mt-2 text-xs font-semibold text-[#7a5047] line-clamp-2 leading-relaxed">
                  {tool.shortDesc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-pink-100 flex items-center justify-between text-xs font-extrabold text-[#ff5b99]">
                <span>Launch Tool</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Most Popular Tools Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="candy-card p-6 sm:p-10 bg-gradient-to-br from-white via-pink-50/40 to-white">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-black text-amber-500 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider">
              ⭐ Community Favorites
            </span>
            <h2 className="text-3xl font-black text-[#4a2820] mt-2">
              Most Popular Tools
            </h2>
            <p className="text-sm font-semibold text-[#7a5047] mt-1">
              Top daily tools used by designers, developers, and photographers worldwide.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {popularTools.map((tool) => (
              <div
                key={tool.id}
                onClick={() => {
                  sound.playPop();
                  onSelectTool(tool.id);
                }}
                className="p-4 rounded-2xl bg-white border-2 border-pink-100 hover:border-[#ff5b99] cursor-pointer shadow-xs hover:shadow-md transition text-center group"
              >
                <div className="text-sm font-black text-[#4a2820] group-hover:text-[#ff5b99] transition-colors">
                  {tool.name}
                </div>
                <div className="text-[11px] text-[#7a5047] mt-1 line-clamp-1 font-medium">
                  {tool.shortDesc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Private Matters Section (3 Pillars) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-[#4a2820]">
            Why In-Browser Privacy Matters
          </h2>
          <p className="mt-2 text-sm sm:text-base font-semibold text-[#7a5047]">
            Most image converters quietly upload your private family photos and confidential contract scans to remote servers. We don't.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="candy-card p-6 sm:p-8 text-center">
            <div className="w-16 h-16 rounded-3xl bg-pink-100 text-[#ff5b99] flex items-center justify-center mx-auto mb-4 border-2 border-white shadow-md">
              <Lock className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-[#4a2820] mb-2">0% Uploads Guaranteed</h3>
            <p className="text-xs sm:text-sm font-semibold text-[#7a5047] leading-relaxed">
              Files are converted inside your browser's sandboxed memory using the HTML5 Canvas API. Zero bytes ever travel across the internet.
            </p>
          </div>

          <div className="candy-card p-6 sm:p-8 text-center">
            <div className="w-16 h-16 rounded-3xl bg-yellow-100 text-amber-600 flex items-center justify-center mx-auto mb-4 border-2 border-white shadow-md">
              <Zap className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-[#4a2820] mb-2">Instant Hardware Speed</h3>
            <p className="text-xs sm:text-sm font-semibold text-[#7a5047] leading-relaxed">
              No uploading gigabytes over slow broadband. Your device's multi-core CPU and GPU render images with zero queue times.
            </p>
          </div>

          <div className="candy-card p-6 sm:p-8 text-center">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 border-2 border-white shadow-md">
              <Shield className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-[#4a2820] mb-2">No Accounts or Tracking</h3>
            <p className="text-xs sm:text-sm font-semibold text-[#7a5047] leading-relaxed">
              No logins, no password requirements, no telemetry, and no cookies watching your every click. True open web software.
            </p>
          </div>
        </div>
      </section>

      {/* Global FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="candy-card p-6 sm:p-10">
          <h2 className="text-3xl font-black text-[#4a2820] text-center mb-8 flex items-center justify-center gap-3">
            <HelpCircle className="w-8 h-8 text-[#ff5b99]" />
            <span>Frequently Asked Questions</span>
          </h2>

          <div className="space-y-3">
            {homeFaqs.map((faq, idx) => {
              const isOpen = openHomeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border-2 border-pink-100 overflow-hidden bg-white shadow-xs"
                >
                  <button
                    onClick={() => {
                      sound.playPop();
                      setOpenHomeFaq(isOpen ? null : idx);
                    }}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between font-bold text-sm sm:text-base text-[#4a2820] hover:bg-pink-50/50 transition"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#ff5b99]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-[#7a5047] leading-relaxed border-t border-pink-50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
