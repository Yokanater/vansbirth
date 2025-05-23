"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import { Button } from "@/components/ui/button"
import { Gift } from "lucide-react"

interface GiftRevealProps {
  onContinue: () => void
}

export default function GiftReveal({ onContinue }: GiftRevealProps) {
  const [isOpened, setIsOpened] = useState(false)
  const [isShaking, setIsShaking] = useState(false)

  const handleOpenGift = () => {
    setIsOpened(true)

    // Trigger confetti
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    })
  }

  const handleShake = () => {
    if (!isOpened) {
      setIsShaking(true)
      setTimeout(() => setIsShaking(false), 1000)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <motion.h2
        className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        A Special Gift For You
      </motion.h2>

      <div className="relative">
        <motion.div
          className="relative cursor-pointer"
          onClick={isOpened ? undefined : handleShake}
          animate={isShaking ? { rotate: [0, -10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          {!isOpened ? (
            <motion.div
              className="relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-64 h-64 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg shadow-2xl flex items-center justify-center">
                <div className="absolute w-full h-full">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-10 bg-amber-400 rounded-md" />
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-1 h-20 bg-amber-400" />
                </div>
                <Gift className="h-24 w-24 text-white" />
              </div>

              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <p className="text-pink-600 font-medium">Click to open!</p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              className="w-64 bg-white rounded-lg shadow-2xl p-6 text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold text-pink-600 mb-4">Your Gift</h3>
                <p className="text-gray-700 mb-4">
                  This is a placeholder for your actual gift message. You can customize this with the real gift details!
                </p>
                <p className="text-gray-600 italic mb-4">
                  "Maybe it's concert tickets, a special date, or something meaningful you've been wanting..."
                </p>
                <p className="font-medium text-purple-600">I hope you love it! ❤️</p>
              </motion.div>
            </motion.div>
          )}
        </motion.div>

        {!isOpened && (
          <motion.div
            className="absolute -bottom-16 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <Button onClick={handleOpenGift} className="bg-gradient-to-r from-amber-500 to-pink-500 text-white">
              Open Your Gift
            </Button>
          </motion.div>
        )}
      </div>

      {isOpened && (
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Button onClick={onContinue} variant="outline" className="border-pink-500 text-pink-600 hover:bg-pink-50">
            Back to Greeting
          </Button>
        </motion.div>
      )}
    </div>
  )
}
