import { useEffect, useRef, useState } from 'react'

const SCALE = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25]
const PATTERN = [0, 2, 4, 2, 5, 4, 2, 0, 1, 3, 5, 3, 4, 6, 5, 3]
const NOTE_GAP = 550

function buildMusic(ctx: AudioContext) {
  const master = ctx.createGain()
  master.gain.value = 0.12
  master.connect(ctx.destination)

  const delayNode = ctx.createDelay(2)
  delayNode.delayTime.value = 0.28
  const delayGain = ctx.createGain()
  delayGain.gain.value = 0.35
  delayNode.connect(delayGain)
  delayGain.connect(delayNode)
  delayGain.connect(master)

  const filter = ctx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 2000
  filter.connect(master)

  let idx = 0
  let timerId: ReturnType<typeof setTimeout>

  function playNext() {
    const freq = SCALE[PATTERN[idx % PATTERN.length]]
    idx++

    const osc1 = ctx.createOscillator()
    const osc2 = ctx.createOscillator()
    const g = ctx.createGain()

    osc1.type = 'sine'
    osc2.type = 'triangle'
    osc1.frequency.value = freq
    osc2.frequency.value = freq * 2.005

    osc1.connect(g)
    osc2.connect(g)
    g.connect(filter)
    g.connect(delayNode)

    g.gain.setValueAtTime(0, ctx.currentTime)
    g.gain.linearRampToValueAtTime(0.07, ctx.currentTime + 0.06)
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.4)

    osc1.start()
    osc2.start()
    osc1.stop(ctx.currentTime + 1.5)
    osc2.stop(ctx.currentTime + 1.5)

    timerId = setTimeout(playNext, NOTE_GAP)
  }

  playNext()

  return () => {
    clearTimeout(timerId)
    master.gain.setValueAtTime(master.gain.value, ctx.currentTime)
    master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5)
  }
}

export default function Music() {
  const [playing, setPlaying] = useState(false)
  const ctxRef = useRef<AudioContext | null>(null)
  const stopRef = useRef<(() => void) | null>(null)

  useEffect(() => () => { stopRef.current?.(); ctxRef.current?.close() }, [])

  const toggle = () => {
    if (playing) {
      stopRef.current?.()
      stopRef.current = null
      setPlaying(false)
    } else {
      if (!ctxRef.current) ctxRef.current = new AudioContext()
      if (ctxRef.current.state === 'suspended') ctxRef.current.resume()
      stopRef.current = buildMusic(ctxRef.current)
      setPlaying(true)
    }
  }

  return (
    <button
      onClick={toggle}
      title={playing ? 'Mute music' : 'Play music'}
      className="fixed bottom-5 left-5 z-50 w-11 h-11 rounded-full flex items-center justify-center transition-all"
      style={{
        background: playing
          ? 'rgba(255,215,0,0.2)'
          : 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,215,0,0.3)',
        backdropFilter: 'blur(8px)',
        boxShadow: playing ? '0 0 20px rgba(255,215,0,0.3)' : 'none',
      }}
    >
      <span className="text-lg">{playing ? '🎵' : '🔇'}</span>
    </button>
  )
}
