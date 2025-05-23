"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

interface BirthdayCardProps {
  onContinue: () => void
}

export default function BirthdayCard({ onContinue }: BirthdayCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setShowMessage(true)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [isOpen])

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <motion.div
        className="relative w-full max-w-md mx-auto"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className={`bg-white rounded-lg shadow-2xl overflow-hidden transition-all duration-1000 ${
            isOpen ? "h-[500px]" : "h-[300px]"
          }`}
        >
          <motion.div
            className="relative h-full w-full"
            initial={false}
            animate={{ rotateX: isOpen ? 180 : 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Card Cover */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-600 flex flex-col items-center justify-center p-6 backface-hidden"
              style={{ backfaceVisibility: "hidden" }}
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <Sparkles className="h-16 w-16 text-yellow-300 mb-4" />
              </motion.div>
              <motion.h2
                className="text-3xl font-bold text-white mb-2 text-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Happy Birthday!
              </motion.h2>
              <motion.p
                className="text-white/80 text-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                Click to open your special card
              </motion.p>
            </div>

            {/* Card Inside */}
            <div
              className="absolute inset-0 bg-white flex flex-col items-center justify-center p-8 backface-hidden"
              style={{ backfaceVisibility: "hidden", transform: "rotateX(180deg)" }}
            >
              {showMessage && (
                <motion.div
                  className="flex flex-col items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <motion.h1
                    className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-6"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                  >
                    Happy Birthday!
                  </motion.h1>

                  <motion.div
                    className="space-y-4 text-center mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  >
                    <p className="text-lg text-gray-700">To the most amazing girlfriend in the world!</p>
                    <p className="text-gray-600">
                      On this special day, I want to celebrate you and all the joy you bring to my life.
                    </p>
                    <p className="text-gray-600">You make every day brighter just by being you.</p>
                    <p className="font-medium text-pink-600 mt-4">I love you! ❤️</p>
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                  >
                    <Button onClick={onContinue} className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                      See Your Memories
                    </Button>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>

        {!isOpen && (
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <Button onClick={() => setIsOpen(true)} size="lg" className="bg-white text-pink-600 hover:bg-white/90">
              Open Your Card
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
