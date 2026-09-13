import { useEffect, useRef, useState, useCallback } from 'react';

const HEX_SIZE = 52;
const HEX_GAP = 4;
const HEX_WIDTH = HEX_SIZE + HEX_GAP;
const HEX_HEIGHT = (HEX_SIZE * Math.sqrt(3)) / 2 + HEX_GAP;
const COLS_DESKTOP = 3;
const PANEL_WIDTH = COLS_DESKTOP * HEX_WIDTH + HEX_WIDTH * 0.25;

function hexPoints(cx: number, cy: number, r: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 6;
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  }).join(' ');
}

interface HexCell {
  col: number;
  row: number;
  cx: number;
  cy: number;
  variant: number;
  colorIdx: number;
}

function buildGrid(totalHeight: number, cols: number, gridWidth: number): HexCell[] {
  const rows = Math.ceil(totalHeight / HEX_HEIGHT) + 2;
  const cells: HexCell[] = [];
  let seed = 7;
  const sRand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const offset = row % 2 === 0 ? 0 : HEX_WIDTH * 0.5;
      const cx = col * HEX_WIDTH + HEX_SIZE / 2 + offset;
      const cy = row * HEX_HEIGHT + HEX_SIZE / 2;

      if (cx > gridWidth + HEX_SIZE) continue;

      const variant = sRand() < 0.12 ? 0 : sRand() < 0.4 ? 1 : sRand() < 0.6 ? 2 : 3;

      cells.push({ col, row, cx, cy, variant, colorIdx: Math.floor(sRand() * 6) });
    }
  }
  return cells;
}

const COLORS_LIGHT = ['#ff8c00', '#ffa500', '#ffd700', '#ff9f43', '#ffba08', '#f5a623'];
const COLORS_DARK = ['#7c3aed', '#8b5cf6', '#a78bfa', '#c084fc', '#d946ef', '#6366f1'];

function renderCells(
  cells: HexCell[],
  scrollProgress: number,
  isDark: boolean,
  flipX: boolean,
  containerWidth: number,
) {
  const colors = isDark ? COLORS_DARK : COLORS_LIGHT;
  const r = HEX_SIZE / 2 - 2;

  return cells.map((cell, i) => {
    const normalizedY = cell.cy / (cells[cells.length - 1]?.cy || 1);
    const disintegrateStart = normalizedY * 0.6;
    const progress = Math.max(0, (scrollProgress - disintegrateStart) / (1 - disintegrateStart));
    const d = Math.min(1, progress * 1.8);

    const opacity = (1 - d) * (cell.variant === 0 ? 0 : cell.variant === 1 ? 0.35 : cell.variant === 2 ? 0.2 : 0.12);
    if (opacity < 0.01) return null;

    const driftX = (((i * 31) % 100) - 50) * d * 1.5;
    const driftY = (((i * 17) % 80) - 40) * d;
    const rotDeg = (((i * 13) % 60) - 30) * d;
    const scale = 1 - d * 0.3;

    const cx = flipX ? containerWidth - cell.cx : cell.cx;
    const color = colors[cell.colorIdx % colors.length];

    return (
      <g
        key={i}
        style={{
          transform: `translate(${driftX}px, ${driftY}px) rotate(${rotDeg}deg) scale(${scale})`,
          transformOrigin: `${cx}px ${cell.cy}px`,
          transition: 'transform 0.12s linear',
        }}
        opacity={opacity}
      >
        {cell.variant === 1 && (
          <polygon
            points={hexPoints(cx, cell.cy, r)}
            fill={color}
            fillOpacity={0.25}
            stroke={color}
            strokeWidth={1.5}
            strokeOpacity={0.5}
          />
        )}

        {cell.variant === 2 && (
          <>
            <polygon
              points={hexPoints(cx, cell.cy, r)}
              fill="none"
              stroke={color}
              strokeWidth={1.8}
              strokeOpacity={0.6}
            />
            <polygon
              points={hexPoints(cx, cell.cy, r * 0.5)}
              fill="none"
              stroke={color}
              strokeWidth={1.2}
              strokeOpacity={0.4}
            />
          </>
        )}

        {cell.variant === 3 && (
          <polygon
            points={hexPoints(cx, cell.cy, r)}
            fill="none"
            stroke={color}
            strokeWidth={1.5}
            strokeOpacity={0.3}
          />
        )}
      </g>
    );
  });
}

const HexagonDecor = () => {
  const [desktopCells, setDesktopCells] = useState<HexCell[]>([]);
  const [mobileCells, setMobileCells] = useState<HexCell[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains('dark'));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  const computeGrids = useCallback(() => {
    const h = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, window.innerHeight);
    const w = window.innerWidth;
    const mobile = w < 768;
    setIsMobile(mobile);
    setScreenWidth(w);

    if (mobile) {
      const mobileCols = Math.ceil(w / HEX_WIDTH) + 1;
      setMobileCells(buildGrid(h, mobileCols, w));
    } else {
      setDesktopCells(buildGrid(h, COLS_DESKTOP, PANEL_WIDTH));
    }
  }, []);

  useEffect(() => {
    computeGrids();
    const obs = new ResizeObserver(computeGrids);
    obs.observe(document.body);
    window.addEventListener('resize', computeGrids);
    return () => {
      obs.disconnect();
      window.removeEventListener('resize', computeGrids);
    };
  }, [computeGrids]);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const top = window.scrollY;
        const max = document.body.scrollHeight - window.innerHeight;
        setScrollProgress(max > 0 ? top / max : 0);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (isMobile) {
    return (
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <svg width={screenWidth} height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
          {renderCells(mobileCells, scrollProgress, isDark, false, screenWidth)}
        </svg>
      </div>
    );
  }

  return (
    <>
      <div
        className="fixed top-0 left-0 h-full pointer-events-none z-0"
        style={{ width: PANEL_WIDTH, overflow: 'hidden' }}
      >
        <svg width={PANEL_WIDTH} height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
          {renderCells(desktopCells, scrollProgress, isDark, false, PANEL_WIDTH)}
        </svg>
      </div>
      <div
        className="fixed top-0 right-0 h-full pointer-events-none z-0"
        style={{ width: PANEL_WIDTH, overflow: 'hidden' }}
      >
        <svg width={PANEL_WIDTH} height="100%" style={{ position: 'absolute', top: 0, right: 0 }}>
          {renderCells(desktopCells, scrollProgress, isDark, true, PANEL_WIDTH)}
        </svg>
      </div>
    </>
  );
};

export default HexagonDecor;
