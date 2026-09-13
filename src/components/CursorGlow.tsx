import { useEffect, useRef } from 'react';

const CursorGlow = () => {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX - 120}px, ${e.clientY - 120}px)`;
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0" style={{ opacity: 0.45 }}>
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 240,
          height: 240,
          borderRadius: '50%',
          background: 'conic-gradient(from 90deg, hsl(30 100% 70%), hsl(340 80% 65%), hsl(270 70% 65%), hsl(213 94% 68%), hsl(30 100% 70%))',
          filter: 'blur(80px)',
          opacity: 0.35,
          willChange: 'transform',
          transform: 'translate(-200px, -200px)',
        }}
      />
    </div>
  );
};

export default CursorGlow;
