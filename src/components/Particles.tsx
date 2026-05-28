import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  color: string
  isStar: boolean
  rotation: number
  rotSpeed: number
}

const COLORS = ['#ffd700', '#ffecb3', '#fff8a0', '#ffa500', '#e2b96a', '#fffde0']

function drawStar(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, rot: number) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(rot)
  ctx.beginPath()
  for (let i = 0; i < 5; i++) {
    const a = (i * Math.PI * 4) / 5 - Math.PI / 2
    const ai = a + Math.PI / 5
    if (i === 0) ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r)
    else ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r)
    ctx.lineTo(Math.cos(ai) * r * 0.4, Math.sin(ai) * r * 0.4)
  }
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}

export default function Particles() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    let raf: number

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles: Particle[] = Array.from({ length: 70 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 1,
      speed: Math.random() * 0.6 + 0.15,
      opacity: Math.random() * 0.5 + 0.15,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      isStar: Math.random() > 0.55,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.015,
    }))

    const t0 = performance.now()

    function draw(now: number) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        p.y -= p.speed
        p.rotation += p.rotSpeed
        if (p.y < -10) {
          p.y = canvas.height + 10
          p.x = Math.random() * canvas.width
        }
        const pulse = 0.6 + 0.4 * Math.sin((now - t0) * 0.001 + p.x * 0.01)
        ctx.globalAlpha = p.opacity * pulse
        ctx.fillStyle = p.color
        if (p.isStar) drawStar(ctx, p.x, p.y, p.size, p.rotation)
        else {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={ref} className="fixed inset-0 pointer-events-none z-0" />
}
