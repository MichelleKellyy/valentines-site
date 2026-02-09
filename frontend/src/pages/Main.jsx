import { useMemo, useState } from 'react'
import confetti from 'canvas-confetti'

function Main() {
  const [showNotes, setShowNotes] = useState(false)
  const [noteRevealed, setNoteRevealed] = useState(false)
  const [meterValue, setMeterValue] = useState(0)
  const [meterMessage, setMeterMessage] = useState('')
  const [broken, setBroken] = useState(false)

  const runMeter = () => {
    setMeterValue(100)
    setBroken(true)
    setMeterMessage('⚠️ System overloaded… meter broke! ⚠️')
}

  // soft floating hearts
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
    <div className="min-h-screen w-screen bg-linear-to-b from-pink-200 via-rose-300 to-red-400 flex items-center justify-center overflow-hidden relative px-4">

      {/* FLOATING HEARTS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {hearts.map((heart, i) => (
          <span
            key={i}
            className="absolute text-pink-200 opacity-40 animate-float-slow"
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

      {/* MAIN CARD */}
      <div className="relative z-10 w-[min(820px,95vw)] rounded-3xl shadow-2xl border-8 border-white/70 bg-white/25 backdrop-blur-md p-8 md:p-12 flex flex-col items-center gap-8">

        {/* HERO TEXT */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            Hi there 💕
          </h1>
          <p className="text-white/80 text-base md:text-lg">
            Press play first. Trust me.
          </p>
        </div>

        {/* SPOTIFY PLAYLIST */}
        <div className="w-full max-w-xl rounded-2xl overflow-hidden shadow-lg border-4 border-white/60 bg-white">
          <iframe
            title="Spotify Playlist"
            className="w-full h-[380px]"
            style={{ borderRadius: '12px' }}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            src="https://open.spotify.com/embed/playlist/30sj7Hq5HqlZUsSk99P8uc?utm_source=generator"
          />
        </div>

        {/* WHY THESE SONGS */}
        <div className="w-full max-w-xl text-center">
          <button
            onClick={() => setShowNotes(!showNotes)}
            className="text-white/90 underline underline-offset-4 hover:text-white transition"
          >
            {showNotes ? 'Hide notes' : 'Why these songs?'}
          </button>

          {showNotes && (
            <div className="mt-4 bg-white/25 backdrop-blur-md border border-white/40 rounded-2xl p-4 text-white/90 text-sm space-y-2">
              <p>🎧 This one reminds me of our first real conversation.</p>
              <p>🚗 This one feels like late-night drives and quiet laughs.</p>
              <p>🌙 This one is for when everything slows down.</p>
              <p>💗 Some of them are just… you.</p>
            </div>
          )}
        </div>
        
        {/* LOVE METER */}
        <div className="w-full max-w-md mt-6 bg-white/25 backdrop-blur-md border border-white/40 rounded-2xl p-5 text-center">
        <h2 className="text-white font-semibold text-lg mb-3">
            Valentine Compatibility Test
        </h2>

        <p className="text-white/80 text-sm mb-4">
            Totally “accurate”. Maybe.
        </p>

        {/* BAR */}
        <div className="w-full h-4 bg-white/40 rounded-full overflow-hidden mb-4">
            <div
            className={`h-full transition-all duration-700 ${broken ? 'bg-red-500 animate-pulse' : 'bg-rose-500'}`}
            style={{ width: `${meterValue}%` }}
            />
        </div>

        {/* RESULT */}
        {meterMessage && (
            <p className="text-white text-sm mb-4">
            {meterMessage}
            </p>
        )}

        {/* BUTTON */}
        <button
            onClick={runMeter}
            className="border-2 border-white/70 px-6 py-2 rounded-xl bg-white text-rose-600 hover:bg-rose-50 font-medium transition"
        >
            Run test
        </button>
        </div>

        {/* HIDDEN NOTE */}
        <div className="mt-4 text-center">
          {!noteRevealed ? (
            <button
              onClick={() => setNoteRevealed(true)}
              className="text-white/70 hover:text-white transition text-sm"
            >
              click me :)
            </button>
          ) : (
            <p className="text-white/90 text-sm md:text-base">
              Hopefully we can listen to this playlist in the same room one day :)
            </p>
          )}
        </div>
      </div>

      {/* FLOAT ANIMATION */}
      <style>{`
        @keyframes floatSlow {
          0% { transform: translateY(110vh); opacity: 0; }
          20% { opacity: 0.4; }
          100% { transform: translateY(-10vh); opacity: 0; }
        }
        .animate-float-slow {
          animation: floatSlow 18s linear infinite;
        }
      `}</style>

    </div>
  )
}

export default Main
