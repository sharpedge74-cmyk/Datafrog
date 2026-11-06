/**
 * Candy Match Game Confetti & Sweet Burst Engine
 * Spawns bouncing jelly beans, star candies, and sweets.
 */

interface CandyParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  shape: 'circle' | 'bean' | 'star' | 'square';
  rotation: number;
  vRot: number;
  life: number;
  maxLife: number;
}

export function fireCandyBurst(originX?: number, originY?: number) {
  if (typeof window === 'undefined') return;

  // Respect prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '999999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    canvas.remove();
    return;
  }

  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);

  const startX = originX ?? width / 2;
  const startY = originY ?? height * 0.45;

  const candyColors = [
    '#ff3b4e', // cherry
    '#ff8c21', // orange
    '#ffd000', // lemon
    '#25d366', // lime
    '#00b4d8', // blue raspberry
    '#9b5de5', // grape
    '#ff5b99', // bubblegum
  ];

  const shapes: Array<'circle' | 'bean' | 'star' | 'square'> = ['circle', 'bean', 'star', 'square'];

  const particleCount = 70;
  const particles: CandyParticle[] = [];

  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 4 + Math.random() * 11;
    particles.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 4, // initial upward kick
      color: candyColors[Math.floor(Math.random() * candyColors.length)],
      size: 7 + Math.random() * 10,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 12,
      life: 0,
      maxLife: 60 + Math.random() * 40,
    });
  }

  let animationFrameId: number;

  function render() {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    let activeCount = 0;

    for (const p of particles) {
      if (p.life >= p.maxLife) continue;
      activeCount++;

      p.life++;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.22; // gravity
      p.vx *= 0.98; // air resistance
      p.rotation += p.vRot;

      const progress = p.life / p.maxLife;
      const alpha = 1 - Math.pow(progress, 2);

      ctx.save();
      ctx.globalAlpha = Math.max(0, alpha);
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);

      ctx.fillStyle = p.color;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;

      if (p.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      } else if (p.shape === 'bean') {
        // Jelly bean oval
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size / 1.7, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      } else if (p.shape === 'square') {
        // Wrapped sweet
        ctx.beginPath();
        ctx.roundRect(-p.size / 2, -p.size / 2, p.size, p.size, 3);
        ctx.fill();
        ctx.stroke();
      } else if (p.shape === 'star') {
        // 5-point candy star
        ctx.beginPath();
        for (let s = 0; s < 5; s++) {
          const a1 = (s * 4 * Math.PI) / 5 - Math.PI / 2;
          const a2 = ((s + 0.5) * 4 * Math.PI) / 5 - Math.PI / 2;
          const r1 = p.size * 0.7;
          const r2 = p.size * 0.35;
          if (s === 0) ctx.moveTo(Math.cos(a1) * r1, Math.sin(a1) * r1);
          else ctx.lineTo(Math.cos(a1) * r1, Math.sin(a1) * r1);
          ctx.lineTo(Math.cos(a2) * r2, Math.sin(a2) * r2);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }

      ctx.restore();
    }

    if (activeCount > 0) {
      animationFrameId = requestAnimationFrame(render);
    } else {
      cancelAnimationFrame(animationFrameId);
      canvas.remove();
    }
  }

  animationFrameId = requestAnimationFrame(render);
}
