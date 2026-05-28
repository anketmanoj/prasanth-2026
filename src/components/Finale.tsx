import { useEffect, useRef, useState } from 'react'
import confetti from 'canvas-confetti'
import { motion } from 'framer-motion'

const BASE = import.meta.env.BASE_URL

const FAMILY_PHOTOS = [
  { src: 'bed93ecb-d6aa-4251-a6c5-acf16d07fab4_Original.jpg', rotate: -2 },
  { src: 'IMG_8019_Original.jpg', rotate: 1 },
  { src: 'PHOTO-family-sunglasses.jpg', rotate: -1 },
  { src: 'Picture 133_Original.jpg', rotate: 2 },
  { src: 'IMG_7336_Original.jpg', rotate: -1.5 },
]

const WISHES = [
  'May every day forward feel like the best is still to come.',
  'Thank you for being the kind of dad who shows up — always.',
  '54 is just the beginning of the best chapter.',
]

export default function Finale() {
  const fired = useRef(false)
  const [wishIdx, setWishIdx] = useState(0)

  useEffect(() => {
    if (fired.current) return
    fired.current = true

    const burst = () => {
      confetti({ particleCount: 140, spread: 80, origin: { x: 0.3, y: 0.5 }, colors: ['#ffd700', '#ff69b4', '#a78bfa', '#34d399', '#fff'] })
      confetti({ particleCount: 140, spread: 80, origin: { x: 0.7, y: 0.5 }, colors: ['#ffd700', '#ff69b4', '#38bdf8', '#fbbf24', '#fff'] })
    }

    burst()
    const t1 = setTimeout(burst, 800)
    const t2 = setTimeout(burst, 1600)
    const t3 = setTimeout(() => {
      confetti({ particleCount: 200, spread: 120, startVelocity: 35, origin: { x: 0.5, y: 0.3 }, colors: ['#ffd700', '#ffa500', '#fff8a0', '#ffecb3'] })
    }, 2400)

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  useEffect(() => {
    const t = setInterval(() => setWishIdx(i => (i + 1) % WISHES.length), 3500)
    return () => clearInterval(t)
  }, [])

  const fireMore = () => {
    confetti({ particleCount: 180, spread: 100, origin: { x: Math.random(), y: 0.4 }, colors: ['#ffd700', '#ff69b4', '#a78bfa', '#34d399', '#38bdf8'] })
  }

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-start overflow-x-hidden py-16 px-6"
      style={{ background: 'linear-gradient(160deg, #0d0620 0%, #1a0a35 50%, #0d0620 100%)' }}
    >
      {/* Confetti trigger btn */}
      <button
        onClick={fireMore}
        className="fixed top-5 right-5 z-50 text-2xl"
        title="More confetti!"
      >
        🎊
      </button>

      {/* Main heading */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-6"
      >
        <p className="uppercase tracking-[0.35em] text-xs font-light mb-3" style={{ color: 'rgba(251,191,36,0.7)' }}>
          Today, we celebrate
        </p>
        <h1
          className="font-display font-bold shimmer-text leading-tight"
          style={{ fontSize: 'clamp(40px, 8vw, 88px)' }}
        >
          Happy 54th Birthday,
        </h1>
        <h1
          className="font-display font-bold leading-tight"
          style={{ fontSize: 'clamp(44px, 9vw, 100px)', color: '#ffd700', textShadow: '0 0 60px rgba(255,215,0,0.5)' }}
        >
          Prasanth!
        </h1>
      </motion.div>

      {/* Rotating wish */}
      <motion.div
        key={wishIdx}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12 max-w-lg"
      >
        <p className="font-elegant italic text-white/60 text-lg leading-relaxed">
          "{WISHES[wishIdx]}"
        </p>
      </motion.div>

      {/* Photo strip */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="flex gap-4 mb-12 flex-wrap justify-center"
      >
        {FAMILY_PHOTOS.map((p, i) => (
          <motion.div
            key={p.src}
            className="polaroid flex-shrink-0"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1, rotate: p.rotate }}
            transition={{ delay: 0.5 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.07, rotate: 0, zIndex: 10 }}
            style={{ width: 140 }}
          >
            <img
              src={`${BASE}images/${p.src}`}
              alt=""
              className="w-full object-cover"
              style={{ height: 160, display: 'block' }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Signature */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="text-center"
        style={{
          border: '1px solid rgba(255,215,0,0.2)',
          borderRadius: 16,
          padding: '32px 48px',
          background: 'rgba(255,215,0,0.04)',
          backdropFilter: 'blur(12px)',
          maxWidth: 480,
        }}
      >
        <p className="text-white/40 text-xs uppercase tracking-widest mb-3">With all our love</p>
        <p className="font-display text-3xl font-semibold" style={{ color: '#ffd700' }}>
          Ammu, Kunju &amp; Salini
        </p>
        <p className="font-elegant italic text-white/50 mt-3 text-base">
          You're our favourite human. Always have been. Always will be.
        </p>
        <div className="flex justify-center gap-3 mt-5 text-2xl">
          {'❤️🎂🌟🎊✨'.split('').map((e, i) => (
            <span
              key={i}
              style={{ animation: `float 4s ease-in-out infinite`, animationDelay: `${i * 0.3}s` }}
              className="inline-block"
            >
              {e}
            </span>
          ))}
        </div>
      </motion.div>

      {/* 54 ghost */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 select-none">
        <span
          className="font-display font-bold leading-none"
          style={{ fontSize: 'clamp(200px, 40vw, 500px)', color: 'rgba(255,215,0,0.025)' }}
        >
          54
        </span>
      </div>
    </div>
  )
}
