import { useState } from 'react'
import confetti from 'canvas-confetti'

function Landing() {
  const [noPos, setNoPos] = useState({ x: 60, y: 30 })
  const handleYes = () => {
    confetti({
      particleCount: 250,
      spread: 200,
      origin: { y: 0.41, x: 0.41 },
      startVelocity: 35,
    })
  }

  const moveButton = () => {
    const x = Math.random() * 70 + 15
    const y = Math.random() * 45 + 35
    setNoPos({ x, y })
  }

  return (
    <div className='overflow-hidden h-screen w-screen bg-linear-to-b from-pink-300 via-rose-400 to-red-500 flex items-center justify-center'>
      <div className='shadow-2xl border-8 border-white/70 rounded-3xl bg-white/20 backdrop-blur-md flex flex-col items-center justify-start relative w-[min(720px,92vw)] h-[68svh] p-10 md:p-14'>
        <h1 className='text-3xl md:text-4xl font-extrabold text-white mb-10 text-center'>
          Will you be my Valentine?
        </h1>

        <div className='w-full flex justify-center'>
          <button className='mr-70 border-4 border-white/80 px-10 py-3 rounded-2xl bg-white text-rose-600 hover:bg-rose-50 text-lg md:text-xl font-semibold shadow-md transition'
          onClick={handleYes}>
            Yes
          </button>
        </div>

        <button
          className='absolute border-4 border-white/80 px-10 py-3 rounded-2xl bg-white text-rose-600 hover:bg-rose-50 text-lg md:text-xl font-semibold shadow-md transition-all duration-150'
          style={{ left: `${noPos.x}%`, top: `${noPos.y}%` }}
          onMouseEnter={moveButton}
          onTouchStart={moveButton}
        >
          No
        </button>
        <p className='text-white/70 mt-50 ml-85'>no is looking a littleee shyyyy btw...</p>
      </div>
    </div>
  )
}

export default Landing