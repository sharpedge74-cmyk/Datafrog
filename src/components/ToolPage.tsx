import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Download,
  ArrowRight,
  HelpCircle,
  FileCheck2,
  RefreshCw,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { ToolConfig, TOOLS_CONFIG } from '../config/tools';
import { CandyDropzone } from './CandyDropzone';
import { CandyAdSlot } from './CandyAdSlot';
import { processTool, ProcessResult } from '../engines/processor';
import { sound } from '../utils/sound';
import { fireCandyBurst } from '../utils/confetti';
import { CelebrationModal } from './CelebrationModal';

interface ToolPageProps {
  tool: ToolConfig;
  onSelectTool: (id: string) => void;
  comboCount: number;
  onIncrementCombo: () => void;
}

export const ToolPage: React.FC<ToolPageProps> = ({
  tool,
  onSelectTool,
  comboCount,
  onIncrementCombo,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [settings, setSettings] = useState<Record<string, any>>(tool.defaultSettings || {});
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ProcessResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [celebrationWord, setCelebrationWord] = useState<'Sweet!' | 'Delicious!' | 'Tasty!' | null>(null);
  const [screenShake, setScreenShake] = useState(false);

  // Reset tool state when switching tools
  useEffect(() => {
    setFiles([]);
    setSettings(tool.defaultSettings || {});
    setResult(null);
    setErrorMsg(null);
    setProgress(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [tool.id]);

  const handleSettingChange = (key: string, value: any) => {
    sound.playPop();
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleProcess = async () => {
    if (files.length === 0 && tool.accept !== 'none' && tool.id !== 'qr-code-generator' && tool.id !== 'placeholder-generator') {
      sound.playPop();
      setErrorMsg('Please select or drop an image first!');
      return;
    }

    try {
      sound.playPop();
      setErrorMsg(null);
      setIsProcessing(true);
      setProgress(10);

      // Progress animation ticker
      const interval = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + 15 : prev));
      }, 150);

      const res = await processTool(tool.id, files, settings, (p) => setProgress(p));
      clearInterval(interval);
      setProgress(100);

      setTimeout(() => {
        setIsProcessing(false);
        setResult(res);

        // Success Celebration!
        sound.playSuccess();
        fireCandyBurst();

        const words: Array<'Sweet!' | 'Delicious!' | 'Tasty!'> = ['Sweet!', 'Delicious!', 'Tasty!'];
        setCelebrationWord(words[Math.floor(Math.random() * words.length)]);

        onIncrementCombo();
        if (comboCount >= 1) {
          setScreenShake(true);
          setTimeout(() => setScreenShake(false), 500);
        }
      }, 350);
    } catch (err: any) {
      setIsProcessing(false);
      setProgress(0);
      setErrorMsg(err.message || 'An error occurred while processing your image.');
    }
  };

  const handleDownload = () => {
    if (!result) return;
    sound.playSweet();
    const a = document.createElement('a');
    a.href = result.downloadUrl;
    a.download = result.downloadName;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const relatedToolConfigs = tool.relatedTools
    .map((rId) => TOOLS_CONFIG.find((t) => t.id === rId))
    .filter(Boolean) as ToolConfig[];

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${screenShake ? 'shake-screen' : ''}`}>
      {/* 2. Tool Title (H1) + Description */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 bg-pink-100 text-[#ff5b99] text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider mb-3 border border-pink-200">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{tool.badge} IMAGE TOOL</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#4a2820] tracking-tight">
          {tool.name}
        </h1>
        <p className="mt-3 text-base sm:text-lg font-semibold text-[#7a5047] leading-relaxed">
          {tool.description}
        </p>

        {/* 7. Privacy Shield Badge */}
        <div className="mt-4 inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full border border-emerald-200 shadow-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>100% Private: your files never leave your device</span>
        </div>
      </div>

      {/* Main Tool Grid (Left Tool + Right Desktop Sidebar Ad) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        <div className="lg:col-span-3 space-y-6">
          {/* Tool Card Container */}
          <div className="candy-card p-6 sm:p-8">
            {/* 3. Drag and Drop Zone */}
            {tool.accept !== 'none' && (
              <div className="mb-6">
                <CandyDropzone
                  accept={tool.accept}
                  multiple={tool.multiple}
                  files={files}
                  onFilesSelected={(newFiles) => {
                    setFiles(newFiles);
                    setResult(null);
                    setErrorMsg(null);
                  }}
                  onRemoveFile={(idx) => {
                    const next = [...files];
                    next.splice(idx, 1);
                    setFiles(next);
                    setResult(null);
                  }}
                />
              </div>
            )}

            {/* Error Message Toast */}
            {errorMsg && (
              <div className="mb-6 p-4 rounded-2xl bg-red-50 border-2 border-red-200 text-red-700 text-sm font-bold flex items-center justify-between">
                <span>{errorMsg}</span>
                <button
                  onClick={() => setErrorMsg(null)}
                  className="text-xs font-extrabold uppercase bg-red-200 px-2 py-1 rounded-md"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* 4. Options Panel */}
            {tool.optionsConfig.length > 0 && (
              <div className="mb-6 p-5 sm:p-6 bg-pink-50/50 rounded-2xl border-2 border-pink-100">
                <h3 className="text-base font-bold text-[#4a2820] mb-4 flex items-center gap-2">
                  <span>🍬 Tool Options &amp; Tuning</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {tool.optionsConfig.map((opt) => (
                    <div key={opt.id} className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs sm:text-sm font-extrabold text-[#4a2820]">
                          {opt.label}
                        </label>
                        {opt.type === 'slider' && (
                          <span className="text-xs font-black text-[#ff5b99] bg-white px-2 py-0.5 rounded-full border border-pink-200">
                            {settings[opt.id] ?? opt.default}
                            {opt.unit || ''}
                          </span>
                        )}
                      </div>

                      {opt.type === 'slider' && (
                        <input
                          type="range"
                          min={opt.min}
                          max={opt.max}
                          step={opt.step || 1}
                          value={settings[opt.id] ?? opt.default}
                          onChange={(e) => handleSettingChange(opt.id, Number(e.target.value))}
                          className="candy-slider"
                        />
                      )}

                      {opt.type === 'select' && (
                        <select
                          value={settings[opt.id] ?? opt.default}
                          onChange={(e) => handleSettingChange(opt.id, e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-white border-2 border-pink-200 rounded-xl text-sm font-bold text-[#4a2820] focus:outline-none focus:border-[#ff5b99]"
                        >
                          {opt.options?.map((o) => (
                            <option key={String(o.value)} value={o.value}>
                              {o.label}
                            </option>
                          ))}
                        </select>
                      )}

                      {opt.type === 'number' && (
                        <input
                          type="number"
                          min={opt.min}
                          max={opt.max}
                          value={settings[opt.id] ?? opt.default}
                          onChange={(e) => handleSettingChange(opt.id, Number(e.target.value))}
                          className="w-full px-3.5 py-2 bg-white border-2 border-pink-200 rounded-xl text-sm font-bold text-[#4a2820]"
                        />
                      )}

                      {opt.type === 'text' && (
                        <input
                          type="text"
                          value={settings[opt.id] ?? opt.default}
                          onChange={(e) => handleSettingChange(opt.id, e.target.value)}
                          className="w-full px-3.5 py-2 bg-white border-2 border-pink-200 rounded-xl text-sm font-bold text-[#4a2820]"
                        />
                      )}

                      {opt.type === 'color' && (
                        <div className="flex items-center gap-3">
                          <input
                            type="color"
                            value={settings[opt.id] ?? opt.default}
                            onChange={(e) => handleSettingChange(opt.id, e.target.value)}
                            className="w-10 h-10 rounded-xl border-2 border-pink-200 cursor-pointer p-0.5 bg-white"
                          />
                          <span className="text-xs font-mono font-bold text-[#7a5047]">
                            {settings[opt.id] ?? opt.default}
                          </span>
                        </div>
                      )}

                      {opt.type === 'toggle' && (
                        <label className="flex items-center gap-2 cursor-pointer pt-1">
                          <input
                            type="checkbox"
                            checked={settings[opt.id] ?? opt.default}
                            onChange={(e) => handleSettingChange(opt.id, e.target.checked)}
                            className="w-5 h-5 accent-[#ff5b99] rounded cursor-pointer"
                          />
                          <span className="text-xs font-bold text-[#7a5047]">Enable option</span>
                        </label>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. Processing State or Primary Action Button */}
            {isProcessing ? (
              <div className="py-6 px-4 text-center">
                <div className="candy-progress-track max-w-md mx-auto mb-3">
                  <div className="candy-progress-fill" style={{ width: `${progress}%` }} />
                </div>
                <div className="text-sm font-extrabold text-[#ff5b99] animate-pulse">
                  Processing locally on device... {progress}%
                </div>
                <div className="text-xs text-[#7a5047] mt-1 font-semibold">
                  Zero cloud uploads. Your hardware is crunching pixels.
                </div>
              </div>
            ) : result ? (
              /* Success & Download Zone */
              <div className="p-6 bg-emerald-50/70 border-3 border-emerald-200 rounded-2xl text-center space-y-4">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mb-1">
                  <FileCheck2 className="w-8 h-8" />
                </div>

                <h4 className="text-2xl font-black text-[#4a2820]">
                  Ready to Download!
                </h4>

                {/* Before / After Size Comparison */}
                {result.beforeSize > 0 && result.afterSize > 0 && (
                  <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-extrabold">
                    <span className="text-gray-500 bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                      Original: {(result.beforeSize / 1024).toFixed(1)} KB
                    </span>
                    <ArrowRight className="w-4 h-4 text-emerald-500" />
                    <span className="text-emerald-800 bg-emerald-100 px-3.5 py-1 rounded-full border-2 border-emerald-300 shadow-sm flex items-center gap-1.5">
                      <span>Compressed: {(result.afterSize / 1024).toFixed(1)} KB</span>
                      <span className="bg-emerald-600 text-white px-2 py-0.5 rounded-full text-[11px] font-black">
                        -{Math.max(1, Math.round((1 - result.afterSize / result.beforeSize) * 100))}% Smaller
                      </span>
                    </span>
                  </div>
                )}

                {/* Extra info (e.g. extracted text or EXIF) */}
                {result.extraInfo?.textResult && (
                  <div className="text-left bg-white p-4 rounded-xl border border-emerald-200 text-xs font-mono text-[#4a2820] max-h-40 overflow-y-auto whitespace-pre-wrap">
                    {result.extraInfo.textResult}
                  </div>
                )}

                {result.extraInfo?.exifTags && (
                  <div className="text-left bg-white p-4 rounded-xl border border-emerald-200 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {Object.entries(result.extraInfo.exifTags).map(([k, v]) => (
                      <div key={k} className="flex justify-between border-b border-gray-100 pb-1">
                        <span className="font-bold text-[#4a2820]">{k}:</span>
                        <span className="text-[#7a5047] font-mono">{String(v)}</span>
                      </div>
                    ))}
                  </div>
                )}

                {result.extraInfo?.detectedFormat && (
                  <div className="bg-white p-4 rounded-xl border border-emerald-200 text-sm font-bold text-[#4a2820]">
                    <div>Detected Format: <span className="text-[#ff5b99]">{result.extraInfo.detectedFormat}</span></div>
                    <div className="text-xs text-[#7a5047] font-mono mt-1">Magic Bytes: {result.extraInfo.magicBytesHex}</div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                  <button
                    onClick={handleDownload}
                    className="candy-btn candy-btn-orange py-3.5 px-8 text-base shadow-lg animate-pulse"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download {result.isZip ? 'ZIP Archive' : 'Processed Image'}</span>
                  </button>

                  <button
                    onClick={() => {
                      sound.playPop();
                      setResult(null);
                    }}
                    className="candy-btn candy-btn-blue py-3 px-5 text-sm"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Process Another</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Ready CTA Button */
              <div className="pt-2 text-center">
                <button
                  onClick={handleProcess}
                  className="candy-btn candy-btn-green py-4 px-10 text-lg w-full sm:w-auto shadow-md"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Execute {tool.name}</span>
                </button>
              </div>
            )}

            {/* 5. Live Preview Area */}
            {result?.previewUrl && (
              <div className="mt-8 pt-6 border-t-2 border-pink-100 text-center">
                <h4 className="text-xs font-black uppercase text-[#7a5047] tracking-wider mb-3">
                  Live Result Preview
                </h4>
                <div className="max-w-md mx-auto max-h-80 rounded-2xl overflow-hidden border-3 border-white shadow-md bg-pink-50 flex items-center justify-center p-2">
                  <img
                    src={result.previewUrl}
                    alt="Processed Preview"
                    className="max-h-72 w-auto object-contain rounded-xl"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 8. Ad Slot Below Tool */}
          <CandyAdSlot placement="below-tool" />
        </div>

        {/* Desktop Sidebar Ad Slot */}
        <div className="hidden lg:block lg:col-span-1">
          <CandyAdSlot placement="sidebar" />
        </div>
      </div>

      {/* 8. Ad Slot Between Content Sections */}
      <CandyAdSlot placement="between-content" />

      {/* 9. Below the Fold: How-To Steps */}
      <div className="candy-card p-6 sm:p-10 my-10">
        <h2 className="text-2xl sm:text-3xl font-black text-[#4a2820] text-center mb-8">
          How to Use {tool.name} in 3 Simple Steps
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tool.howTo.map((step, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-gradient-to-b from-white to-pink-50/60 border-2 border-pink-100 text-center relative"
            >
              <div className="w-10 h-10 rounded-full bg-[#ff5b99] text-white font-black text-lg flex items-center justify-center mx-auto mb-3 shadow-md border-2 border-white">
                {idx + 1}
              </div>
              <h3 className="text-base font-extrabold text-[#4a2820] mb-2">
                Step {idx + 1}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-[#7a5047] leading-relaxed">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 9. Below the Fold: FAQ (5+ Q&As) */}
      <div className="candy-card p-6 sm:p-10 my-10">
        <h2 className="text-2xl sm:text-3xl font-black text-[#4a2820] text-center mb-8 flex items-center justify-center gap-3">
          <HelpCircle className="w-8 h-8 text-[#ff5b99]" />
          <span>Frequently Asked Questions</span>
        </h2>
        <div className="space-y-3 max-w-3xl mx-auto">
          {tool.faq.map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border-2 border-pink-100 overflow-hidden bg-white shadow-xs"
              >
                <button
                  onClick={() => {
                    sound.playPop();
                    setOpenFaqIndex(isOpen ? null : idx);
                  }}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between font-bold text-sm sm:text-base text-[#4a2820] hover:bg-pink-50/50 transition"
                >
                  <span>{item.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#ff5b99]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-[#7a5047] leading-relaxed border-t border-pink-50">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 9. Below the Fold: 300+ Words SEO Copy */}
      <div className="candy-card p-6 sm:p-10 my-10">
        <h2 className="text-xl sm:text-2xl font-black text-[#4a2820] mb-4">
          About {tool.name} &amp; Privacy-First Technology
        </h2>
        <div className="text-sm font-medium text-[#7a5047] leading-relaxed space-y-4 whitespace-pre-line">
          {tool.seoCopy}
        </div>
      </div>

      {/* 9. Below the Fold: Related Tools Grid */}
      {relatedToolConfigs.length > 0 && (
        <div className="my-12">
          <h2 className="text-2xl font-black text-[#4a2820] text-center mb-6">
            Related Free Image Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {relatedToolConfigs.map((rel) => (
              <div
                key={rel.id}
                onClick={() => {
                  sound.playPop();
                  onSelectTool(rel.id);
                }}
                className="candy-card p-4 cursor-pointer hover:border-[#ff5b99] transition text-center group"
              >
                <span className="text-[10px] font-black uppercase text-[#ff5b99] bg-pink-100 px-2 py-0.5 rounded-full">
                  {rel.badge}
                </span>
                <h3 className="text-base font-extrabold text-[#4a2820] mt-2 group-hover:text-[#ff5b99] transition-colors">
                  {rel.name}
                </h3>
                <p className="text-xs text-[#7a5047] mt-1 line-clamp-2">
                  {rel.shortDesc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sweet Celebration Banner Modal */}
      {celebrationWord && (
        <CelebrationModal
          word={celebrationWord}
          comboCount={comboCount}
          onDismiss={() => setCelebrationWord(null)}
        />
      )}
    </div>
  );
};
