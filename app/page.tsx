"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Gift, Cake, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import dynamic from "next/dynamic"
import ParticleBackground from "@/components/particle-background"
import AudioVisualizer from "@/components/audio-visualizer"
import LoadingScreen from "@/components/loading-screen"

// Dynamically import components to improve initial load time
const BirthdayCard3D = dynamic(() => import("@/components/birthday-card-3d"), {
  loading: () => <div className="h-[500px] w-full flex items-center justify-center">Loading amazing card...</div>,
})
const InteractiveGallery = dynamic(() => import("@/components/interactive-gallery"), {
  loading: () => <div className="h-[500px] w-full flex items-center justify-center">Loading memories...</div>,
})
const GiftReveal3D = dynamic(() => import("@/components/gift-reveal-3d"), {
  loading: () => <div className="h-[500px] w-full flex items-center justify-center">Loading surprise...</div>,
})
const FireworksDisplay = dynamic(() => import("@/components/fireworks-display"), {
  loading: () => <div className="h-[500px] w-full flex items-center justify-center">Loading celebration...</div>,
})

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentSection, setCurrentSection] = useState("loading")
  const [playMusic, setPlayMusic] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Handle initial loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      setCurrentSection("greeting")
    }, 3500)

    return () => clearTimeout(timer)
  }, [])

  // Handle audio playback
  useEffect(() => {
    if (audioRef.current) {
      if (playMusic) {
        audioRef.current.play().catch((e) => console.log("Audio playback prevented:", e))
      } else {
        audioRef.current.pause()
      }
    }
  }, [playMusic])

  // Enable music on first interaction
  const handleFirstInteraction = () => {
    if (!hasInteracted) {
      setHasInteracted(true)
      setPlayMusic(true)
    }
  }

  const sections = {
    loading: <LoadingScreen />,
    greeting: <BirthdayCard3D onContinue={() => setCurrentSection("gallery")} />,
    gallery: <InteractiveGallery onContinue={() => setCurrentSection("gift")} />,
    gift: <GiftReveal3D onContinue={() => setCurrentSection("fireworks")} />,
    fireworks: <FireworksDisplay onContinue={() => setCurrentSection("greeting")} />,
  }

  return (
    <main className="relative min-h-screen bg-black overflow-hidden" onClick={handleFirstInteraction}>
      {/* Dynamic background */}
      <div className="fixed inset-0 z-0">
        <ParticleBackground currentSection={currentSection} />
      </div>

      {/* Audio elements */}
      <audio ref={audioRef} src="/cherimoya.mp3" loop className="hidden" />

      {/* Audio visualizer */}
      {playMusic && (
        <div className="fixed bottom-0 w-[110vw] left-0 right-0 h-16 z-10 opacity-70">
          <AudioVisualizer audioRef={audioRef} />
        </div>
      )}

      {/* Controls */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-black/30 backdrop-blur-sm border-pink-500/50 hover:bg-black/50 transition-all duration-300"
          onClick={() => setPlayMusic(!playMusic)}
        >
          {playMusic ? <Volume2 className="h-4 w-4 text-pink-400" /> : <VolumeX className="h-4 w-4 text-pink-400" />}
        </Button>
      </div>

      {/* Navigation */}
      {!isLoading && (
        <motion.div
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <NavButton
            icon={<Heart className="h-4 w-4 mr-2" />}
            label="Card"
            isActive={currentSection === "greeting"}
            onClick={() => setCurrentSection("greeting")}
          />
          <NavButton
            icon={<Cake className="h-4 w-4 mr-2" />}
            label="Memories"
            isActive={currentSection === "gallery"}
            onClick={() => setCurrentSection("gallery")}
          />
          <NavButton
            icon={<Gift className="h-4 w-4 mr-2" />}
            label="Gift"
            isActive={currentSection === "gift"}
            onClick={() => setCurrentSection("gift")}
          />
          <NavButton
            icon={<span className="mr-2">✨</span>}
            label="Celebrate"
            isActive={currentSection === "fireworks"}
            onClick={() => setCurrentSection("fireworks")}
          />
        </motion.div>
      )}

      {/* Main content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto min-w-[100vw] py-12 px-4 relative z-10 min-h-screen flex items-center justify-center"
        >
          {sections[currentSection]}
        </motion.div>
      </AnimatePresence>
    </main>
  )
}

// Navigation button component
function NavButton({ icon, label, isActive, onClick }) {
  return (
    <Button
      variant="outline"
      size="sm"
      className={`rounded-full backdrop-blur-sm transition-all duration-300 ${
        isActive
          ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white border-transparent"
          : "bg-black/30 border-pink-500/50 text-pink-400 text-pink-500 hover:bg-black/50 hover:text-white"
      }`}
      onClick={onClick}
    >
      {icon}
      {label}
    </Button>
  )
}
