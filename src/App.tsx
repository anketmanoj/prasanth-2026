import { useState } from 'react'
import Particles from './components/Particles'
import Envelope from './components/Envelope'
import Story from './components/Story'
import Finale from './components/Finale'
import Music from './components/Music'

type Stage = 'envelope' | 'story' | 'finale'

export default function App() {
  const [stage, setStage] = useState<Stage>('envelope')

  return (
    <div className="relative min-h-screen bg-[#0d0620] overflow-x-hidden font-sans">
      <Particles />
      <Music />
      {stage === 'envelope' && <Envelope onOpen={() => setStage('story')} />}
      {stage === 'story' && <Story onFinish={() => setStage('finale')} />}
      {stage === 'finale' && <Finale />}
    </div>
  )
}
