"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sparkles, Heart } from "lucide-react"

interface BirthdayCard3DProps {
  onContinue: () => void
}

export default function BirthdayCard3D({ onContinue }: BirthdayCard3DProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [showMessage, setShowMessage] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Mouse tracking for 3D effect
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-300, 300], [15, -15])
  const rotateY = useTransform(x, [-300, 300], [-15, 15])

  const controls = useAnimation()

  // Handle mouse move for 3D effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || isOpen) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  // Reset position when mouse leaves
  const handleMouseLeave = () => {
    if (isOpen) return

    x.set(0)
    y.set(0)
    setIsHovering(false)
  }

  // Handle card opening
  useEffect(() => {
    if (isOpen) {
      // Trigger confetti when card opens

      // Show message after card opens
      const timer = setTimeout(() => {
        setShowMessage(true)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Floating hearts animation
  const renderFloatingHearts = () => {
    return Array.from({ length: 20 }).map((_, i) => {
      const size = Math.random() * 20 + 10
      const duration = Math.random() * 10 + 10
      const initialX = Math.random() * 100
      const initialDelay = Math.random() * 5

      return (
        <motion.div
          key={i}
          className="absolute text-pink-500 opacity-70"
          style={{
            left: `${initialX}%`,
            bottom: "-50px",
            fontSize: `${size}px`,
          }}
          initial={{ y: 0 }}
          animate={{
            y: "-100vh",
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
            rotate: [0, 360, 720, 1080],
          }}
          transition={{
            duration,
            delay: initialDelay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          💜
        </motion.div>
      )
    })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] min-w-[100vw] relative overflow-hidden">
      {/* Floating hearts in background */}
      {isOpen && renderFloatingHearts()}

      <motion.div
        ref={cardRef}
        className="relative w-full max-w-md mx-auto perspective-1000"
        style={{
          rotateX: isOpen ? 0 : rotateX,
          rotateY: isOpen ? 0 : rotateY,
          z: 100,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={handleMouseLeave}
        animate={controls}
      >
        <motion.div
          className={`relative bg-transparent rounded-xl shadow-2xl overflow-hidden transition-all duration-1000 transform-style-3d ${
            isOpen ? "h-[500px]" : "h-[300px]"
          }`}
          whileHover={isOpen ? {} : { scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="relative h-full w-full transform-style-3d"
            initial={false}
            animate={{
              rotateX: isOpen ? 180 : 0,
              z: isOpen ? 50 : 0,
            }}
            transition={{
              duration: 1.5,
              ease: [0.16, 1, 0.3, 1], // Spring-like easing
              z: { delay: isOpen ? 0 : 1 },
            }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Card Cover */}
            <div
              className="absolute inset-0 backface-hidden rounded-xl"
              style={{
                backfaceVisibility: "hidden",
                background: "linear-gradient(135deg, #ff66b3 0%, #9966ff 50%, #66b3ff 100%)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              }}
            >
              <div className="absolute inset-0 bg-black/10 rounded-xl" />

              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="relative"
                >
                  <Sparkles className="h-20 w-20 text-white mb-4" />
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                    }}
                  >
                    <Sparkles className="h-20 w-20 text-yellow-300 mb-4" />
                  </motion.div>
                </motion.div>

                <motion.h2
                  className="text-4xl font-bold text-white mb-2 text-center drop-shadow-lg"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  Happy Birthday!
                </motion.h2>

                <motion.p
                  className="text-white/90 text-center"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  Click to open your special card
                </motion.p>

                {isHovering && !isOpen && (
                  <motion.div
                    className="absolute inset-0 bg-white/10 rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.div>
            </div>

            {/* Card Inside */}
            <div
              className="absolute inset-0 bg-white flex flex-col items-center justify-center p-8 backface-hidden rounded-xl"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateX(180deg)",
                background: "linear-gradient(135deg, #fff8f8 0%, #fff 100%)",
              }}
            >
              {showMessage && (
                <motion.div
                  className="flex flex-col items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <motion.div
                    className="relative mb-6"
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, 0, -5, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                    }}
                  >
                    <Heart className="h-16 w-16 text-pink-500 fill-pink-500" />
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        opacity: [0, 0.7, 0],
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                      }}
                    >
                      <Heart className="h-16 w-16 text-pink-400 fill-pink-400" />
                    </motion.div>
                  </motion.div>

                  <motion.h1
                    className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-6 text-center"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                  >
                    Happy Birthday Princess
                  </motion.h1>

                  <motion.div
                    className="space-y-4 text-center mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  >
                    <p className="text-lg text-gray-700">To </p>
                    <p className="text-gray-600">
                      From November 18, to May 24, You impress me and make me fall in love with you every day.
                    </p>
                    <p className="text-gray-600">You make every day brighter just by being you.</p>
                    <p className="font-medium text-pink-600 mt-4">I love you! 💜</p>
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                  >
                    <Button
                      onClick={onContinue}
                      className="bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:opacity-90 transition-all duration-300"
                    >
                      A little slideshow
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
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => setIsOpen(true)}
              size="lg"
              className="bg-white text-pink-600 hover:bg-white/90 shadow-lg"
            >
              Open Your Card
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
