import { useState, useRef, useEffect } from 'react'
import { Smile, ThumbsUp, Heart } from 'lucide-react'

// In a real application, replace this with your actual video URL
const VIDEO_URL = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"

const INTERACTION_POINTS = [
  { time: 5, type: 'continue' },
  { time: 15, type: 'reaction' },
  { time: 25, type: 'continue' },
  { time: 35, type: 'reaction' },
]

export default function FullScreenInteractiveVideoStory() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [currentInteraction, setCurrentInteraction] = useState<number | null>(null)
  const [flyingReactions, setFlyingReactions] = useState<{ id: number; type: string; x: number; y: number }[]>([])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const checkForInteractions = () => {
      const currentTime = video.currentTime
      const interactionIndex = INTERACTION_POINTS.findIndex(
        point => Math.abs(currentTime - point.time) < 0.5
      )

      if (interactionIndex !== -1 && interactionIndex !== currentInteraction) {
        video.pause()
        setCurrentInteraction(interactionIndex)
      }
    }

    video.addEventListener('timeupdate', checkForInteractions)
    return () => video.removeEventListener('timeupdate', checkForInteractions)
  }, [currentInteraction])

  const handleContinue = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setCurrentInteraction(null)
    }
  }

  const handleReaction = (reaction: string) => {
    const newReaction = {
      id: Date.now(),
      type: reaction,
      x: Math.random() * 80 + 10, // Random x position between 10% and 90%
      y: Math.random() * 40 + 30, // Random y position between 30% and 70%
    }
    setFlyingReactions(prev => [...prev, newReaction])
    setTimeout(() => {
      setFlyingReactions(prev => prev.filter(r => r.id !== newReaction.id))
    }, 2000)
    handleContinue()
  }

  return (
    <div className="fixed inset-0 bg-black">
      <video 
        ref={videoRef} 
        className="w-full h-full object-cover"
        controls={false}
        playsInline
      >
        <source src={VIDEO_URL} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {currentInteraction !== null && (
        <div className="absolute inset-0 flex items-center justify-center">
          {INTERACTION_POINTS[currentInteraction].type === 'continue' ? (
            <button 
              onClick={handleContinue} 
              className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-full transition duration-300 ease-in-out text-lg font-semibold"
              aria-label="Continue"
            >
              Continue
            </button>
          ) : (
            <div className="flex space-x-6">
              <button 
                onClick={() => handleReaction('haha')} 
                className="p-4 bg-yellow-400 hover:bg-yellow-500 rounded-full transition duration-300 ease-in-out"
                aria-label="React with Haha"
              >
                <Smile className="h-10 w-10 text-white" />
              </button>
              <button 
                onClick={() => handleReaction('like')} 
                className="p-4 bg-blue-500 hover:bg-blue-600 rounded-full transition duration-300 ease-in-out"
                aria-label="React with Like"
              >
                <ThumbsUp className="h-10 w-10 text-white" />
              </button>
              <button 
                onClick={() => handleReaction('love')} 
                className="p-4 bg-red-500 hover:bg-red-600 rounded-full transition duration-300 ease-in-out"
                aria-label="React with Love"
              >
                <Heart className="h-10 w-10 text-white" />
              </button>
            </div>
          )}
        </div>
      )}

      {flyingReactions.map(reaction => (
        <div
          key={reaction.id}
          className="absolute animate-fly-reaction"
          style={{
            left: `${reaction.x}%`,
            top: `${reaction.y}%`,
          }}
        >
          {reaction.type === 'haha' && <Smile className="h-10 w-10 text-yellow-400" />}
          {reaction.type === 'like' && <ThumbsUp className="h-10 w-10 text-blue-500" />}
          {reaction.type === 'love' && <Heart className="h-10 w-10 text-red-500" />}
        </div>
      ))}
    </div>
  )
}