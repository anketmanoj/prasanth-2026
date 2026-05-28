import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Phase = 'idle' | 'cracking' | 'opening' | 'risen' | 'ready'

const SPARKLE_POSITIONS = [
  { top: '12%', left: '8%', delay: '0s' },
  { top: '18%', left: '88%', delay: '0.4s' },
  { top: '70%', left: '6%', delay: '0.8s' },
  { top: '75%', left: '90%', delay: '1.2s' },
  { top: '35%', left: '4%', delay: '0.2s' },
  { top: '50%', left: '92%', delay: '0.6s' },
]

export default function Envelope({ onOpen }: { onOpen: () => void }) {
  const [phase, setPhase] = useState<Phase>('idle')

  const handleSealClick = () => {
    if (phase !== 'idle') return
    setPhase('cracking')
    setTimeout(() => setPhase('opening'), 700)
    setTimeout(() => setPhase('risen'), 1500)
    setTimeout(() => setPhase('ready'), 2000)
  }

  const flapOpen = phase === 'opening' || phase === 'risen' || phase === 'ready'
  const cardRisen = phase === 'risen' || phase === 'ready'

  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Ghost 54 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span
          className="font-display font-bold leading-none"
          style={{ fontSize: 'clamp(200px, 35vw, 420px)', color: 'rgba(255,255,255,0.025)' }}
        >
          54
        </span>
      </div>

      {/* Sparkles */}
      {SPARKLE_POSITIONS.map((s, i) => (
        <span
          key={i}
          className="absolute text-amber-300/40 text-lg pointer-events-none select-none"
          style={{ top: s.top, left: s.left, animationDelay: s.delay, animation: 'twinkle 2.4s ease-in-out infinite' }}
        >
          ✦
        </span>
      ))}

      {/* Header */}
      <AnimatePresence>
        {(phase === 'idle' || phase === 'cracking') && (
          <motion.div
            key="header"
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24, transition: { duration: 0.3 } }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12 px-4"
          >
            <p
              className="uppercase tracking-[0.35em] text-xs mb-3 font-light"
              style={{ color: 'rgba(251,191,36,0.7)' }}
            >
              A message for
            </p>
            <h1 className="font-display font-bold shimmer-text" style={{ fontSize: 'clamp(52px, 10vw, 96px)' }}>
              Prasanth
            </h1>
            <p className="mt-3 tracking-widest text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
              on his 54th birthday · May 28th, 2026
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Envelope + card stack */}
      <div className="relative" style={{ perspective: '1400px' }}>
        {/* Card that rises */}
        <motion.div
          className="absolute left-1/2 rounded-t-2xl overflow-hidden z-0"
          style={{
            width: 320,
            height: 200,
            bottom: 0,
            x: '-50%',
            background: 'linear-gradient(160deg, #fffbf0 0%, #fff8e7 100%)',
            boxShadow: '0 -4px 30px rgba(255,215,0,0.15)',
          }}
          animate={{ y: cardRisen ? -170 : 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="h-full flex flex-col items-center justify-center p-6 text-center gap-3">
            <div className="text-3xl animate-float">🎂</div>
            <p className="font-display text-amber-900 text-base leading-snug font-semibold">
              For a man who makes<br />every moment golden
            </p>
            <p className="font-elegant text-amber-700/70 text-sm italic">— With love from your family</p>
          </div>
        </motion.div>

        {/* Envelope body */}
        <div
          className="relative z-10"
          style={{
            width: 380,
            height: 250,
            borderRadius: 4,
            background: 'linear-gradient(145deg, #fef9e7 0%, #fde68a 60%, #fef9e7 100%)',
            boxShadow: '0 24px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,215,0,0.25), inset 0 1px 0 rgba(255,255,255,0.9)',
          }}
        >
          {/* Envelope v-fold decorations (SVG lines) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 380 250"
            fill="none"
          >
            <line x1="0" y1="250" x2="190" y2="130" stroke="rgba(161,120,0,0.18)" strokeWidth="1" />
            <line x1="380" y1="250" x2="190" y2="130" stroke="rgba(161,120,0,0.18)" strokeWidth="1" />
            <line x1="0" y1="0" x2="190" y2="120" stroke="rgba(161,120,0,0.12)" strokeWidth="1" />
            <line x1="380" y1="0" x2="190" y2="120" stroke="rgba(161,120,0,0.12)" strokeWidth="1" />
            <text x="16" y="232" fill="rgba(161,120,0,0.35)" fontSize="14">✦</text>
            <text x="350" y="232" fill="rgba(161,120,0,0.35)" fontSize="14">✦</text>
            <text x="16" y="22" fill="rgba(161,120,0,0.35)" fontSize="14">✦</text>
            <text x="350" y="22" fill="rgba(161,120,0,0.35)" fontSize="14">✦</text>
          </svg>

          {/* Top flap (opens with 3D rotate) */}
          <motion.div
            className="absolute top-0 left-0 w-full pointer-events-none"
            style={{
              height: '55%',
              transformOrigin: 'top center',
              transformStyle: 'preserve-3d',
              zIndex: 20,
            }}
            animate={{ rotateX: flapOpen ? -170 : 0 }}
            transition={{ duration: 1.0, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Front face */}
            <div
              className="absolute inset-0"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                background: 'linear-gradient(180deg, #fef9e7 0%, #fde68a 100%)',
                backfaceVisibility: 'hidden',
              }}
            />
            {/* Back face (seen when open) */}
            <div
              className="absolute inset-0"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                background: 'linear-gradient(0deg, #fde68a 0%, #fbbf24 100%)',
                backfaceVisibility: 'hidden',
                transform: 'rotateX(180deg)',
              }}
            />
          </motion.div>

          {/* Wax seal */}
          <AnimatePresence>
            {phase !== 'risen' && phase !== 'ready' && (
              <motion.div
                key="seal"
                className="absolute left-1/2 top-1/2 z-30 cursor-pointer"
                style={{ x: '-50%', y: '-30%' }}
                animate={
                  phase === 'cracking'
                    ? {
                        scale: [1, 1.25, 0.85, 1.15, 0],
                        rotate: [0, -8, 10, -5, 15],
                        opacity: [1, 1, 1, 0.8, 0],
                      }
                    : { scale: 1, rotate: 0, opacity: 1 }
                }
                transition={phase === 'cracking' ? { duration: 0.65, times: [0, 0.2, 0.4, 0.7, 1] } : {}}
                onClick={handleSealClick}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-xl relative select-none"
                  style={{
                    background: 'radial-gradient(circle at 35% 35%, #dc2626, #7f1d1d)',
                    boxShadow: '0 4px 24px rgba(220,38,38,0.6), 0 0 0 3px rgba(255,215,0,0.5), inset 0 1px 3px rgba(255,255,255,0.25)',
                    animation: 'pulse-glow 2.5s ease-in-out infinite',
                  }}
                >
                  🌟
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        width: 5,
                        height: 5,
                        background: 'rgba(255,215,0,0.55)',
                        top: '50%',
                        left: '50%',
                        transform: `rotate(${i * 45}deg) translateY(-34px) translateX(-2.5px)`,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-10 min-h-[56px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {phase === 'idle' && (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm tracking-[0.25em] animate-pulse"
              style={{ color: 'rgba(251,191,36,0.45)' }}
            >
              ✦ click the seal to open ✦
            </motion.p>
          )}
          {phase === 'ready' && (
            <motion.button
              key="open"
              initial={{ opacity: 0, y: 16, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              onClick={onOpen}
              className="px-10 py-4 rounded-full font-display text-lg font-semibold text-black relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #ffd700 0%, #ffb300 50%, #ffd700 100%)',
                backgroundSize: '200% 100%',
                boxShadow: '0 8px 32px rgba(255,179,0,0.5), 0 2px 8px rgba(0,0,0,0.3)',
                animation: 'shimmer 2s linear infinite',
              }}
              whileHover={{ scale: 1.04, boxShadow: '0 12px 40px rgba(255,179,0,0.7)' }}
              whileTap={{ scale: 0.97 }}
            >
              Open Your Card →
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
