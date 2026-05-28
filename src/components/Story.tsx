import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { chapters } from '../data/chapters'

const BASE = import.meta.env.BASE_URL

interface Props {
  onFinish: () => void
}

export default function Story({ onFinish }: Props) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const chapter = chapters[current]
  const isLast = current === chapters.length - 1

  const go = (dir: number) => {
    if (dir > 0 && isLast) { onFinish(); return }
    setDirection(dir)
    setCurrent(c => Math.max(0, Math.min(chapters.length - 1, c + dir)))
  }

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
  }

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: chapter.bg }}>
      {/* Progress dots */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex gap-2">
        {chapters.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === current ? 24 : 8,
              height: 8,
              background: i === current ? chapter.accent : 'rgba(255,255,255,0.2)',
            }}
          />
        ))}
      </div>

      <AnimatePresence custom={direction} mode="wait">
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="min-h-screen flex flex-col items-center justify-center px-6 py-20"
        >
          {/* Chapter label */}
          <motion.p
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="uppercase tracking-[0.35em] text-xs font-light mb-2"
            style={{ color: `${chapter.accent}99` }}
          >
            {chapter.subtitle} · {chapter.year}
          </motion.p>

          {/* Chapter title */}
          <motion.h2
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="font-display font-bold text-center mb-10"
            style={{
              fontSize: 'clamp(32px, 6vw, 64px)',
              color: chapter.accent,
              textShadow: `0 0 40px ${chapter.accent}55`,
            }}
          >
            {chapter.title}
          </motion.h2>

          {/* Photos */}
          <div className={`flex gap-6 mb-10 flex-wrap justify-center ${chapter.images.length === 1 ? 'max-w-sm' : 'max-w-2xl'}`}>
            {chapter.images.map((img, i) => (
              <motion.div
                key={img.src}
                className="polaroid"
                initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: i === 0 ? -2 : 2,
                }}
                transition={{ delay: 0.25 + i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.04, rotate: 0, zIndex: 10 }}
                style={{ maxWidth: chapter.images.length === 1 ? 320 : 260 }}
              >
                <img
                  src={`${BASE}images/${img.src}`}
                  alt={img.caption}
                  className="w-full object-cover"
                  style={{
                    height: chapter.images.length === 1 ? 360 : 240,
                    transform: img.rotate ? `rotate(${img.rotate}deg)` : undefined,
                    display: 'block',
                  }}
                />
                <p className="mt-2 text-center font-elegant text-gray-600 text-sm italic leading-tight">
                  {img.caption}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Story text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38 }}
            className="max-w-xl text-center"
          >
            <h3
              className="font-display text-xl font-semibold mb-3"
              style={{ color: chapter.accent }}
            >
              {chapter.heading}
            </h3>
            <p className="text-white/70 leading-relaxed text-base font-light">
              {chapter.text}
            </p>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4">
        {current > 0 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => go(-1)}
            className="px-5 py-2.5 rounded-full text-sm font-medium transition-all"
            style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.6)',
              backdropFilter: 'blur(8px)',
            }}
            whileHover={{ background: 'rgba(255,255,255,0.14)' }}
          >
            ← Back
          </motion.button>
        )}
        <motion.button
          onClick={() => go(1)}
          className="px-8 py-3 rounded-full font-display font-semibold text-black text-sm"
          style={{
            background: `linear-gradient(135deg, ${chapter.accent}, ${chapter.accent}cc)`,
            boxShadow: `0 6px 24px ${chapter.accent}55`,
          }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          {isLast ? '🎉 The Finale →' : 'Next Chapter →'}
        </motion.button>
      </div>
    </div>
  )
}
