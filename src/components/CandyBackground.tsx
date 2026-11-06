import React from 'react';

export const CandyBackground: React.FC = () => {
  return (
    <div className="candy-bg-elements" aria-hidden="true">
      {/* Floating Gumdrop 1 */}
      <div className="floating-candy" style={{ top: '8%', left: '4%', animationDelay: '0s', animationDuration: '22s' }}>
        <svg width="60" height="60" viewBox="0 0 64 64" fill="none">
          <path d="M12 48 C12 24, 52 24, 52 48 C52 54, 12 54, 12 48 Z" fill="#ff5b99" opacity="0.6" />
          <circle cx="26" cy="36" r="4" fill="#ffffff" opacity="0.8" />
        </svg>
      </div>

      {/* Floating Swirl Lollipop 2 */}
      <div className="floating-candy" style={{ top: '22%', right: '6%', animationDelay: '3s', animationDuration: '26s' }}>
        <svg width="70" height="70" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="28" r="22" fill="#ffd000" opacity="0.5" />
          <path d="M32 6 Q32 28 46 28 Q46 44 32 44" stroke="#ff8c21" strokeWidth="4" fill="none" opacity="0.6" />
          <line x1="32" y1="50" x2="32" y2="62" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </div>

      {/* Floating Candy Star 3 */}
      <div className="floating-candy" style={{ top: '45%', left: '8%', animationDelay: '5s', animationDuration: '20s' }}>
        <svg width="45" height="45" viewBox="0 0 64 64" fill="none">
          <polygon points="32,6 40,24 58,24 44,36 50,54 32,42 14,54 20,36 6,24 24,24" fill="#00b4d8" opacity="0.5" />
        </svg>
      </div>

      {/* Floating Wrapped Sweet 4 */}
      <div className="floating-candy" style={{ top: '65%', right: '8%', animationDelay: '1s', animationDuration: '24s' }}>
        <svg width="65" height="65" viewBox="0 0 64 64" fill="none">
          <polygon points="6,24 16,32 6,40" fill="#9b5de5" opacity="0.5" />
          <polygon points="58,24 48,32 58,40" fill="#9b5de5" opacity="0.5" />
          <circle cx="32" cy="32" r="16" fill="#ff5b99" opacity="0.6" />
          <circle cx="32" cy="32" r="14" fill="#9b5de5" opacity="0.5" />
        </svg>
      </div>

      {/* Floating Jelly Bean 5 */}
      <div className="floating-candy" style={{ top: '85%', left: '15%', animationDelay: '4s', animationDuration: '18s' }}>
        <svg width="55" height="55" viewBox="0 0 64 64" fill="none">
          <path d="M16 32 C16 18, 48 18, 48 32 C48 46, 28 46, 16 32 Z" fill="#25d366" opacity="0.5" />
          <ellipse cx="28" cy="26" rx="4" ry="2" fill="#ffffff" opacity="0.7" />
        </svg>
      </div>

      {/* Floating Candy Drop 6 */}
      <div className="floating-candy" style={{ top: '75%', right: '20%', animationDelay: '7s', animationDuration: '28s' }}>
        <svg width="50" height="50" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="18" fill="#ff8c21" opacity="0.4" />
          <path d="M22 26 Q32 16 42 26" stroke="#ffffff" strokeWidth="3" fill="none" opacity="0.6" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
};
