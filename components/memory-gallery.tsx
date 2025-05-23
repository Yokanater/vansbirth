"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface MemoryGalleryProps {
  onContinue: () => void
}

const memories = [
  {
    id: 1,
    title: "Basketball Dreams?",
    description: "4 am talking right during the advent of preboards because of coure we're just friends",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    title: "Class 10 Boards Over",
    description: "One of my favourite dates of ours, very peaceful very cool",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    title: "Board Game Party?",
    description: "This day was so fire, but I definitely don't remember it this well because of the board games",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 4,
    title: "Day before yesterday",
    description: "So fricking fun man, we just keep improving, we're in our prime and it will never end fr",
    image: "/placeholder.svg?height=400&width=600",
  },
]

export default function MemoryGallery({ onContinue }: MemoryGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const nextMemory = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % memories.length)
  }

  const prevMemory = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + memories.length) % memories.length)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <motion.h2
        className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Our Special Memories
      </motion.h2>

      <div className="relative w-full max-w-3xl mx-auto">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full"
          >
            <Card className="overflow-hidden bg-white/90 backdrop-blur-sm shadow-xl">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="h-64 md:h-auto overflow-hidden">
                    <motion.img
                      src={memories[currentIndex].image}
                      alt={memories[currentIndex].title}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                  <div className="p-6 flex flex-col justify-center">
                    <motion.h3
                      className="text-2xl font-bold mb-3 text-purple-700"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      {memories[currentIndex].title}
                    </motion.h3>
                    <motion.p
                      className="text-gray-600 mb-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      {memories[currentIndex].description}
                    </motion.p>
                    <motion.div
                      className="text-sm text-white-500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
                      Memory {currentIndex + 1} of {memories.length}
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-4">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 shadow-md"
            onClick={prevMemory}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </div>

        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-4">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 shadow-md"
            onClick={nextMemory}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <motion.div
        className="mt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <Button onClick={onContinue} className="bg-gradient-to-r from-purple-600 to-pink-500 text-white">
          See Your Gift
        </Button>
      </motion.div>
    </div>
  )
}
