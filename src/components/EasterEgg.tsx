import { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from 'next-themes';
import redKeyImg from '@/assets/red-key.png';
import redKeyDarkImg from '@/assets/limbo-key-dark.png';

const GRID_COLS = 2;
const GRID_ROWS = 4;
const KEY_COUNT = GRID_COLS * GRID_ROWS;
const KEY_SIZE = 80;
const KEY_GAP = 6;
const SHUFFLE_INTERVAL = 150;

const STEP_MAP: number[][] = [
  [2, 4, 1, 3, 6, 8, 5, 7],
  [2, 4, 1, 3, 7, 5, 8, 6],
  [3, 1, 4, 2, 6, 8, 5, 7],
  [3, 1, 4, 2, 7, 5, 8, 6],
  [2, 4, 1, 6, 3, 8, 5, 7],
  [3, 1, 5, 2, 7, 4, 8, 6],
  [2, 1, 4, 3, 6, 5, 8, 7],
  [4, 3, 2, 1, 8, 7, 6, 5],
  [3, 4, 5, 6, 7, 8, 2, 1],
  [8, 7, 1, 2, 3, 4, 5, 6],
  [1, 3, 2, 5, 4, 7, 8, 6],
  [1, 3, 2, 5, 4, 8, 6, 7],
  [4, 2, 6, 1, 7, 3, 8, 5],
  [4, 2, 6, 1, 8, 3, 5, 7],
  [2, 4, 6, 1, 8, 3, 7, 5],
  [4, 1, 6, 2, 8, 3, 7, 5],
  [2, 3, 1, 5, 4, 7, 6, 8],
  [3, 1, 2, 5, 4, 7, 6, 8],
  [5, 6, 7, 8, 1, 2, 3, 4],
  [8, 7, 6, 5, 4, 3, 2, 1],
  [1, 2, 3, 4, 5, 6, 7, 8],
];

const EXCLUDED = new Set([8, 9, 18, 19, 20]);

function getRandomPattern(): number {
  let p = -1;
  while (p === -1 || EXCLUDED.has(p)) {
    p = Math.floor(Math.random() * STEP_MAP.length);
  }
  return p;
}

function buildShuffleSequence(): number[][] {
  const seq: number[][] = [];
  for (let i = 1; i <= 26; i++) {
    if (i === 6) seq.push(STEP_MAP[18]);
    else if (i === 10) seq.push(STEP_MAP[8]);
    else if (i === 19) seq.push(STEP_MAP[9]);
    else if (i === 26) seq.push(STEP_MAP[20]);
    else seq.push(STEP_MAP[getRandomPattern()]);
  }
  return seq;
}

function getGridPosition(slotIndex: number) {
  const col = slotIndex % GRID_COLS;
  const row = Math.floor(slotIndex / GRID_COLS);
  return {
    x: col * (KEY_SIZE + KEY_GAP),
    y: row * (KEY_SIZE + KEY_GAP),
  };
}

function applyPattern(currentSlots: number[], pattern: number[]): number[] {
  const newSlots = new Array(KEY_COUNT);
  for (let i = 0; i < KEY_COUNT; i++) {
    const targetSlot = pattern[i] - 1;
    newSlots[targetSlot] = currentSlots[i];
  }
  return newSlots;
}

type GamePhase = 'hidden' | 'revealing' | 'highlighting' | 'shuffling' | 'picking' | 'result';

const TITLE_BAR_H = 24;

function KeyWindow({ isHighlighted, isRevealed, isPickable, isCorrectResult, onClick, keyImg }: {
  isHighlighted: boolean;
  isRevealed: boolean;
  isPickable: boolean;
  isCorrectResult: boolean;
  onClick: () => void;
  keyImg: string;
}) {
  const glowing = isHighlighted || isCorrectResult;
  return (
    <div
      onClick={onClick}
      style={{
        width: KEY_SIZE,
        height: KEY_SIZE,
        opacity: isRevealed ? 1 : 0,
        transform: isRevealed ? 'scale(1)' : 'scale(0.3)',
        cursor: isPickable ? 'pointer' : 'default',
        userSelect: 'none' as const,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        overflow: 'hidden',
        border: glowing ? '2px solid #00ff41' : '2px solid #444',
        boxShadow: glowing
          ? '0 0 20px rgba(0,255,65,0.5), 0 0 40px rgba(0,255,65,0.2)'
          : isPickable
            ? '0 2px 8px rgba(0,0,0,0.5)'
            : '0 1px 3px rgba(0,0,0,0.3)',
        transition: 'opacity 0.3s, transform 0.3s, border-color 0.2s, box-shadow 0.2s',
      }}
    >
      <div
        style={{
          height: TITLE_BAR_H,
          background: glowing
            ? 'linear-gradient(180deg, #00cc33 0%, #009926 100%)'
            : 'linear-gradient(180deg, #0058a8 0%, #003d7a 100%)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 4px',
          gap: 3,
          flexShrink: 0,
        }}
      >
        <img src={keyImg} alt="" style={{ width: 14, height: 14 }} draggable={false} />
        <span style={{
          color: '#fff',
          fontSize: 10,
          fontFamily: '"Segoe UI", Tahoma, sans-serif',
          fontWeight: 600,
          letterSpacing: 0.3,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          flex: 1,
        }}>
          Key
        </span>
        <div style={{ display: 'flex', gap: 2, flexShrink: 0 }}>
          <div style={{ width: 10, height: 10, borderRadius: 1, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 8, color: '#fff', lineHeight: 1 }}>_</span>
          </div>
          <div style={{ width: 10, height: 10, borderRadius: 1, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 7, color: '#fff', lineHeight: 1 }}>x</span>
          </div>
        </div>
      </div>
      <div
        style={{
          flex: 1,
          background: glowing
            ? 'linear-gradient(135deg, #001a00 0%, #002200 50%, #001a00 100%)'
            : 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={keyImg}
          alt=""
          draggable={false}
          style={{
            width: KEY_SIZE * 0.45,
            height: KEY_SIZE * 0.45,
            filter: glowing
              ? 'drop-shadow(0 0 6px #00ff41) brightness(1.4)'
              : 'none',
            transition: 'filter 0.2s',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
}

function BSODScreen() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#0078d7',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '10vh 12vw',
        fontFamily: '"Segoe UI", sans-serif',
        color: '#fff',
        animation: 'bsodFadeIn 0.15s ease-out',
      }}
      data-testid="bsod-screen"
    >
      <div style={{ fontSize: 'clamp(80px, 12vw, 140px)', fontWeight: 200, lineHeight: 1, marginBottom: 20 }}>:(</div>
      <div style={{ fontSize: 'clamp(16px, 2.5vw, 24px)', fontWeight: 300, lineHeight: 1.6, maxWidth: 700 }}>
        Your PC ran into a problem and needs to restart. We're just collecting some error info, and then we'll restart for you.
      </div>
      <div style={{ marginTop: 40, fontSize: 'clamp(12px, 1.5vw, 16px)', fontWeight: 300, opacity: 0.8 }}>
        0% complete
      </div>
      <div style={{ marginTop: 60, fontSize: 'clamp(10px, 1.2vw, 13px)', fontWeight: 300, opacity: 0.7 }}>
        <div>For more information about this issue and possible fixes, visit</div>
        <div>https://www.windows.com/stopcode</div>
        <div style={{ marginTop: 16 }}>
          If you call a support person, give them this info:
        </div>
        <div>Stop code: SKILL_ISSUE</div>
      </div>
    </div>
  );
}

const EasterEgg = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const keyImg = isDark ? redKeyDarkImg : redKeyImg;
  const [visible] = useState(() => Math.random() < 1 / 50);
  const [showGame, setShowGame] = useState(false);
  const [phase, setPhase] = useState<GamePhase>('hidden');
  const [keySlots, setKeySlots] = useState<number[]>([]);
  const [correctKeyId, setCorrectKeyId] = useState(0);
  const [highlightedKey, setHighlightedKey] = useState<number | null>(null);
  const [resultType, setResultType] = useState<'correct' | 'wrong' | null>(null);
  const [revealedCount, setRevealedCount] = useState(0);
  const [showBSOD, setShowBSOD] = useState(false);
  const shuffleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stepRef = useRef(0);
  const shuffleSeqRef = useRef<number[][]>([]);

  const gridWidth = GRID_COLS * KEY_SIZE + (GRID_COLS - 1) * KEY_GAP;
  const gridHeight = GRID_ROWS * KEY_SIZE + (GRID_ROWS - 1) * KEY_GAP;

  const cleanup = useCallback(() => {
    if (shuffleTimerRef.current) {
      clearTimeout(shuffleTimerRef.current);
      shuffleTimerRef.current = null;
    }
  }, []);

  const startGame = useCallback(() => {
    cleanup();
    const initial = Array.from({ length: KEY_COUNT }, (_, i) => i);
    setKeySlots(initial);
    const correct = Math.floor(Math.random() * KEY_COUNT);
    setCorrectKeyId(correct);
    setHighlightedKey(null);
    setResultType(null);
    setRevealedCount(0);
    setShowBSOD(false);
    setPhase('revealing');
    stepRef.current = 0;
  }, [cleanup]);

  useEffect(() => {
    if (phase === 'revealing') {
      if (revealedCount < KEY_COUNT) {
        const timer = setTimeout(() => {
          setRevealedCount((c) => c + 1);
        }, 150);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setHighlightedKey(correctKeyId);
          setPhase('highlighting');
        }, 400);
        return () => clearTimeout(timer);
      }
    }
  }, [phase, revealedCount, correctKeyId]);

  useEffect(() => {
    if (phase === 'highlighting') {
      const timer = setTimeout(() => {
        setHighlightedKey(null);
        shuffleSeqRef.current = buildShuffleSequence();
        stepRef.current = 0;
        setPhase('shuffling');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'shuffling') {
      const seq = shuffleSeqRef.current;
      if (stepRef.current < seq.length) {
        const pattern = seq[stepRef.current];
        const isLastStep = stepRef.current === seq.length - 1;

        shuffleTimerRef.current = setTimeout(() => {
          setKeySlots((prev) => applyPattern(prev, pattern));
          stepRef.current += 1;
        }, isLastStep ? SHUFFLE_INTERVAL * 2 : SHUFFLE_INTERVAL);

        return () => {
          if (shuffleTimerRef.current) clearTimeout(shuffleTimerRef.current);
        };
      } else {
        const timer = setTimeout(() => {
          setPhase('picking');
        }, 400);
        return () => clearTimeout(timer);
      }
    }
  }, [phase, keySlots]);

  const handleKeyClick = (keyId: number) => {
    if (phase !== 'picking') return;

    setPhase('result');

    if (keyId === correctKeyId) {
      setResultType('correct');
      setHighlightedKey(keyId);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      setResultType('wrong');
      setTimeout(() => {
        setShowBSOD(true);
        setTimeout(() => {
          document.documentElement.innerHTML = '';
          document.documentElement.style.background = '#0078d7';
          setTimeout(() => {
            window.location.replace('about:blank');
          }, 800);
        }, 3000);
      }, 500);
    }
  };

  const handleOpen = () => {
    setShowGame(true);
    startGame();
  };

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes bsodFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      <div className="flex justify-center mt-4 mb-2">
        <button
          onClick={handleOpen}
          className="opacity-30 hover:opacity-80 transition-opacity duration-500 focus:outline-none"
          data-testid="button-easter-egg"
          aria-label="Secret"
        >
          <img src={keyImg} alt="" className="w-7 h-7" draggable={false} />
        </button>
      </div>

      {showBSOD && <BSODScreen />}

      {showGame && !showBSOD && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #0a0a1a 0%, #0d1117 40%, #161b22 100%)',
          }}
          data-testid="modal-limbo-keygen"
        >
          <div className="flex flex-col items-center gap-5">
            <div
              style={{
                width: gridWidth + 40,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 6,
                padding: '16px 20px 20px',
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <img src={keyImg} alt="" style={{ width: 16, height: 16 }} draggable={false} />
                  <span
                    style={{
                      color: '#c9d1d9',
                      fontSize: 13,
                      fontFamily: '"Segoe UI", sans-serif',
                      fontWeight: 600,
                      letterSpacing: 0.5,
                    }}
                    data-testid="text-game-title"
                  >
                    LIMBO - Key Shuffle
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center mb-3">
                <span
                  style={{
                    color: phase === 'picking' ? '#ffa657' : '#8b949e',
                    fontSize: 11,
                    fontFamily: '"Segoe UI", monospace',
                    letterSpacing: 1.5,
                    textTransform: 'uppercase',
                    textShadow: phase === 'picking' ? '0 0 8px rgba(255,166,87,0.4)' : 'none',
                    transition: 'color 0.3s, text-shadow 0.3s',
                  }}
                  data-testid="text-game-status"
                >
                  {phase === 'revealing' && 'Initializing...'}
                  {phase === 'highlighting' && 'Remember this key'}
                  {phase === 'shuffling' && 'Shuffling...'}
                  {phase === 'picking' && 'Choose your key'}
                  {phase === 'result' && resultType === 'correct' && 'Correct! Restarting...'}
                  {phase === 'result' && resultType === 'wrong' && '...'}
                </span>
              </div>

              <div
                className="relative mx-auto"
                style={{
                  width: gridWidth,
                  height: gridHeight,
                }}
              >
                {keySlots.map((keyId, slotIndex) => {
                  const pos = getGridPosition(slotIndex);
                  const isRevealed = slotIndex < revealedCount || phase !== 'revealing';
                  const isHighlighted = highlightedKey === keyId;
                  const isPickable = phase === 'picking';
                  const isCorrectResult = resultType === 'correct' && isHighlighted;

                  return (
                    <div
                      key={keyId}
                      data-testid={`button-key-${keyId}`}
                      style={{
                        position: 'absolute',
                        left: pos.x,
                        top: pos.y,
                        transition: phase === 'shuffling'
                          ? 'left 0.13s ease-in-out, top 0.13s ease-in-out'
                          : 'all 0.3s ease',
                      }}
                    >
                      <KeyWindow
                        isHighlighted={isHighlighted}
                        isRevealed={isRevealed}
                        isPickable={isPickable}
                        isCorrectResult={isCorrectResult}
                        onClick={() => handleKeyClick(keyId)}
                        keyImg={keyImg}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default EasterEgg;
