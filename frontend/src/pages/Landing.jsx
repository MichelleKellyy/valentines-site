import { useState, useEffect, useMemo } from 'react'
import confetti from 'canvas-confetti'

function Landing() {
  const [opened, setOpened] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [sealBroken, setSealBroken] = useState(false)
  const [noPos, setNoPos] = useState({ x: 60, y: 30 })

  const handleYes = () => {
    confetti({
      particleCount: 250,
      spread: 200,
      origin: { y: 0.4, x: 0.5 },
      startVelocity: 35,
    })
  }

  useEffect(() => {
    if (opened) {
      setTimeout(() => setExpanded(true), 700)
    }
  }, [opened])

  const moveNo = () => {
    const x = Math.random() * 65 + 15
    const y = Math.random() * 45 + 35
    setNoPos({ x, y })
  }

  /* 💖 Freeze heart positions so background never glitches */
  const hearts = useMemo(
    () =>
      [...Array(24)].map(() => ({
        left: Math.random() * 100,
        delay: Math.random() * 10,
        size: Math.random() * 26 + 12,
      })),
    []
  )

  return (
    <div className="h-screen w-screen bg-linear-to-b from-pink-300 via-rose-400 to-red-500 flex items-center justify-center overflow-hidden relative">

      {/* FLOATING HEARTS (STABLE) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {hearts.map((heart, i) => (
          <span
            key={i}
            className="absolute text-pink-300 opacity-40 animate-float"
            style={{
              left: `${heart.left}%`,
              animationDelay: `${heart.delay}s`,
              fontSize: `${heart.size}px`,
            }}
          >
            ♥
          </span>
        ))}
      </div>

      {/* ENVELOPE INTRO */}
      {!expanded && (
        <div className="relative w-[520px] h-[360px] [perspective:1200px]">
          <div className="absolute inset-0 bg-rose-200 rounded-3xl shadow-2xl overflow-hidden">

            {/* FLAP */}
            <div
              className={`absolute top-0 left-0 w-full h-1/2 bg-rose-300 origin-top transition-all duration-700 z-20 ${
                opened
                  ? '[transform:rotateX(180deg)] opacity-0'
                  : 'opacity-100'
              }`}
            />

            {/* WAX SEAL (ONE SOLID PIECE) */}
            {!sealBroken && (
              <div
                className="absolute z-40 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                w-20 h-20 rounded-full bg-red-600 cursor-pointer
                shadow-inner shadow-black/40 flex items-center justify-center
                transition-transform duration-300 hover:scale-105"
                onClick={(e) => {
                  e.stopPropagation()
                  setSealBroken(true)
                  setTimeout(() => setOpened(true), 150)
                }}
              >
                <span className="text-white text-2xl font-bold">❤</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MAIN CARD */}
      <div
        className={`absolute transition-all duration-700 ease-out ${
          expanded
            ? 'w-[min(720px,92vw)] h-[68svh] scale-100 opacity-100 pointer-events-auto'
            : 'w-[480px] h-[320px] scale-90 opacity-0 pointer-events-none'
        }`}
      >
        <div className="shadow-2xl border-8 border-white/70 rounded-3xl bg-white/20 backdrop-blur-md flex flex-col items-center justify-start relative w-full h-full p-10 md:p-14">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-10 text-center">
            Will you be my Valentine?
          </h1>

          <div className="w-full flex justify-center">
            <button
              className="border-4 border-white/80 px-10 py-3 rounded-2xl bg-white text-rose-600 hover:bg-rose-50 text-lg md:text-xl font-semibold shadow-md transition"
              onClick={handleYes}
            >
              Yes
            </button>
          </div>

          <button
            className="absolute border-4 border-white/80 px-10 py-3 rounded-2xl bg-white text-rose-600 text-lg md:text-xl font-semibold shadow-md transition-all duration-200"
            style={{
              left: `${noPos.x}%`,
              top: `${noPos.y}%`,
            }}
            onMouseEnter={moveNo}
            onTouchStart={moveNo}
          >
            No
          </button>

          <p className="text-white/70 mt-8 text-center">
            no is looking a littleee shyyyy btw...
          </p>
        </div>
      </div>

      {/* FLOAT ANIMATION */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(100vh); opacity: 0; }
          20% { opacity: 0.4; }
          100% { transform: translateY(-10vh); opacity: 0; }
        }
        .animate-float {
          animation: float 12s linear infinite;
        }
      `}</style>

    </div>
  )
}

export default Landing
