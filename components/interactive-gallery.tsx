"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface InteractiveGalleryProps {
  onContinue: () => void
}

// Sample memories - replace with actual memories and photos
const memories = [
  {
    id: 0,
    title: "Mehr Chadha Ka Ghar",
    description: "Ahh yes cuddling through a horror movie because we're just friends and you're scared",
    image: "/shit.jpg?height=400&width=600",
    color: "lightblue",
  },
  {
    id: 1,
    title: "Basketball Dreams?",
    description: "4 am talking right during the advent of preboards because of coure we're just friends (no)",
    image: "/kobe.jpg?height=400&width=600",
    color: "pink",
  },
  {
    id: 2,
    title: "Class 10 Boards Over",
    description: "One of my favourite dates of ours, very peaceful very cool",
    image: "/snickers.jpg?height=400&width=600",
     color: "orange",
  },
  {
    id: 3,
    title: "Board Game Party?",
    description: "This day was so fire, but I definitely don't remember it this well because of the board games",
    image: "/ghar.JPG?height=400&width=600",
     color: "lightgreen",
  },
  {
    id: 4,
    title: "Day before yesterday",
    description: "So fricking fun man, we just keep improving, we're in our prime and it will never end fr",
    image: "/birthday.jpg?height=400&width=600",
     color: "yellow",  
  },
]


export default function InteractiveGallery({ onContinue }: InteractiveGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)
  const controls = useAnimation()

  // Handle auto play
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setDirection(1)
        setCurrentIndex((prevIndex) => (prevIndex + 1) % memories.length)
      }, 3000)
    } else if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [isAutoPlaying])

  // Navigation functions
  const nextMemory = () => {
    if (isAutoPlaying) {
      setIsAutoPlaying(false)
    }
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % memories.length)
  }

  const prevMemory = () => {
    if (isAutoPlaying) {
      setIsAutoPlaying(false)
    }
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + memories.length) % memories.length)
  }

  // Toggle zoom effect
  const toggleZoom = () => {
    setIsZoomed(!isZoomed)
  }

  // Toggle auto play
  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying)
  }

  // Animation variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  }

  // Particle effect on memory change
  useEffect(() => {
    controls.start({
      opacity: [0, 1, 0],
      scale: [0, 1.5, 0],
      transition: { duration: 1 },
    })
  }, [currentIndex, controls])

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <motion.h2
        className="text-3xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          background: `linear-gradient(to right, ${memories[currentIndex].color}, #ffffff)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Our Special Memories
      </motion.h2>

      <div className="relative w-full max-w-4xl mx-auto">
        {/* Particle effect on memory change */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center"
          animate={controls}
        >
          <div className="w-20 h-20 rounded-full" style={{ background: memories[currentIndex].color }} />
        </motion.div>

        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <Card
              className="overflow-hidden bg-black/50 backdrop-blur-md shadow-2xl border-none"
              style={{
                boxShadow: `0 20px 50px -10px ${memories[currentIndex].color}40`,
              }}
            >
              <div className="grid md:grid-cols-2 gap-0">
                <div className="h-64 md:h-auto overflow-hidden relative">
                  <motion.div
                    className="absolute inset-0 z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isZoomed ? 0.7 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ background: memories[currentIndex].color }}
                  />

                  <motion.img
                    src={memories[currentIndex].image}
                    alt={memories[currentIndex].title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: isZoomed ? 1.5 : 1 }}
                    transition={{ duration: 0.8 }}
                    style={{ filter: isZoomed ? "saturate(1.5)" : "none", width: "500px", height: "500px" }}
                  />

                  <motion.button
                    className="absolute bottom-4 right-4 z-20 bg-black/50 backdrop-blur-sm p-2 rounded-full text-white"
                    onClick={toggleZoom}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ZoomIn size={20} />
                  </motion.button>
                </div>

                <div className="p-6 flex flex-col justify-center bg-gradient-to-br from-black/70 to-black/30">
                  <motion.h3
                    className="text-2xl font-bold mb-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    style={{ color: memories[currentIndex].color }}
                  >
                    {memories[currentIndex].title}
                  </motion.h3>

                  <motion.p
                    className="text-white/80 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    {memories[currentIndex].description}
                  </motion.p>

                  <motion.div
                    className="text-sm text-white/60"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    Memory {currentIndex + 1} of {memories.length}
                  </motion.div>
                </div>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <motion.div
          className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-4 z-10"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 border-white/20 text-white shadow-lg"
            onClick={prevMemory}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </motion.div>

        <motion.div
          className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-4 z-10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 border-white/20 text-white shadow-lg"
            onClick={nextMemory}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </motion.div>
      </div>

      <motion.div
        className="mt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <Button
          onClick={onContinue}
          className="bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90 transition-all duration-300"
        >
          See Your Gift
        </Button>
      </motion.div>
    </div>
  )
}
