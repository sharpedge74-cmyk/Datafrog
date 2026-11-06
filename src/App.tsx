import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { ToolPage } from './components/ToolPage';
import { CandyBackground } from './components/CandyBackground';
import { TOOLS_CONFIG, ToolConfig } from './config/tools';

export default function App() {
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [comboCount, setComboCount] = useState<number>(0);
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  // Parse tool from URL on mount and handle popstate (clean plain URLs)
  useEffect(() => {
    const parseUrl = () => {
      // 1. Check path slug first (e.g. /image-compressor or /tool/image-compressor)
      const pathSlug = window.location.pathname.replace(/^\/(tool\/)?/, '').replace(/\/$/, '');
      if (pathSlug && TOOLS_CONFIG.some((t) => t.id === pathSlug)) {
        setActiveToolId(pathSlug);
        // If there was any legacy ?tool= in query, clean it up to plain path
        if (window.location.search.includes('tool=')) {
          window.history.replaceState({ tool: pathSlug }, '', `/${pathSlug}`);
        }
        return;
      }

      // 2. Legacy check: if user arrived via ?tool=slug, automatically rewrite to plain /slug
      const params = new URLSearchParams(window.location.search);
      const toolParam = params.get('tool');
      if (toolParam && TOOLS_CONFIG.some((t) => t.id === toolParam)) {
        setActiveToolId(toolParam);
        window.history.replaceState({ tool: toolParam }, '', `/${toolParam}`);
        return;
      }

      setActiveToolId(null);
    };

    parseUrl();
    window.addEventListener('popstate', parseUrl);
    return () => window.removeEventListener('popstate', parseUrl);
  }, []);

  // Online / Offline listeners
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Register PWA Service Worker
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV !== 'development') {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // SW registration fallback
      });
    }
  }, []);

  // Update SEO meta tags & JSON-LD dynamically
  const activeTool = activeToolId
    ? TOOLS_CONFIG.find((t) => t.id === activeToolId) || null
    : null;

  useEffect(() => {
    if (activeTool) {
      document.title = `${activeTool.name} - Free 100% In-Browser Image Tool | DataFrog`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', activeTool.seoDescription);

      // JSON-LD SoftwareApplication + FAQPage
      const schemaData = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'SoftwareApplication',
            name: activeTool.name,
            operatingSystem: 'Any',
            applicationCategory: 'MultimediaApplication',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            description: activeTool.seoDescription,
          },
          {
            '@type': 'FAQPage',
            mainEntity: activeTool.faq.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: f.answer,
              },
            })),
          },
        ],
      };

      let scriptTag = document.getElementById('tool-schema-jsonld') as HTMLScriptElement | null;
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'tool-schema-jsonld';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.text = JSON.stringify(schemaData);
    } else {
      document.title = 'DataFrog Tools - 100% In-Browser Free Image Studio (50+ Tools)';
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute(
          'content',
          '50+ free, fast image tools that run 100% locally in your browser. Compress, resize, convert, edit, and enhance images with zero uploads and maximum privacy.'
        );
      }
      const scriptTag = document.getElementById('tool-schema-jsonld');
      if (scriptTag) scriptTag.remove();
    }
  }, [activeTool]);

  const handleSelectTool = (id: string) => {
    setActiveToolId(id);
    const newUrl = `/${id}`;
    window.history.pushState({ tool: id }, '', newUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setActiveToolId(null);
    window.history.pushState({}, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex flex-col selection:bg-pink-300 selection:text-pink-900">
      {/* Drifting Candy Shapes Background */}
      <CandyBackground />

      {/* Header */}
      <Header
        onNavigateHome={handleNavigateHome}
        onSelectTool={handleSelectTool}
        activeToolId={activeToolId}
      />

      {/* Main Content Area */}
      <main className="flex-1 relative z-10">
        {activeTool ? (
          <ToolPage
            tool={activeTool}
            onSelectTool={handleSelectTool}
            comboCount={comboCount}
            onIncrementCombo={() => setComboCount((prev) => prev + 1)}
          />
        ) : (
          <HomePage onSelectTool={handleSelectTool} />
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectTool={handleSelectTool}
        onNavigateHome={handleNavigateHome}
        isOnline={isOnline}
      />
    </div>
  );
}
