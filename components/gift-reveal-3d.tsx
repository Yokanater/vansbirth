"use client"

import { useState, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
import confetti from "canvas-confetti"
import { Button } from "@/components/ui/button"
import { Gift } from "lucide-react"

interface GiftReveal3DProps {
  onContinue: () => void
}

export default function GiftReveal3D({ onContinue }: GiftReveal3DProps) {
  const [isOpened, setIsOpened] = useState(false)
  const [isShaking, setIsShaking] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [showGlitter, setShowGlitter] = useState(false)
  const giftRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()

  // Handle gift opening
  const handleOpenGift = () => {
    // Play opening animation
    controls.start({
      rotateY: [0, 360],
      scale: [1, 1.2, 0.8, 1],
      transition: { duration: 1.5, ease: "easeInOut" },
    })

    // Delay the actual opening to sync with animation
    setTimeout(() => {
      setIsOpened(true)

      // Trigger confetti explosion
      const canvasConfetti = () => {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 },
          colors: ["#ff66b3", "#9966ff", "#66b3ff", "#ffcc66"],
        })
      }

      // Multiple confetti bursts
      canvasConfetti()
      setTimeout(canvasConfetti, 300)
      setTimeout(canvasConfetti, 600)

      // Show glitter effect
      setShowGlitter(true)
    }, 750)
  }

  // Handle gift shaking
  const handleShake = () => {
    if (!isOpened && !isShaking) {
      setIsShaking(true)

      // Play sound effect
      const audio = new Audio("/gift-shake.mp3")
      audio.volume = 0.3
      audio.play().catch((e) => console.log("Audio playback prevented:", e))

      setTimeout(() => setIsShaking(false), 1000)
    }
  }

  // Render glitter particles
  const renderGlitter = () => {
    return Array.from({ length: 50 }).map((_, i) => {
      const size = Math.random() * 8 + 2
      const duration = Math.random() * 2 + 1
      const delay = Math.random() * 2

      return (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: size,
            height: size,
            background: `radial-gradient(circle at center, white 0%, ${
              ["#ff66b3", "#9966ff", "#66b3ff", "#ffcc66"][Math.floor(Math.random() * 4)]
            } 70%, transparent 100%)`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: "0 0 4px white",
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
          }}
          transition={{
            duration,
            delay,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: Math.random() * 3,
          }}
        />
      )
    })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] relative">
      <motion.h2
        className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        A Special Gift For You
      </motion.h2>

      <div className="relative perspective-1000">
        <motion.div
          ref={giftRef}
          className="relative cursor-pointer"
          onClick={isOpened ? undefined : handleShake}
          animate={controls}
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
          whileHover={isOpened ? {} : { scale: 1.05 }}
        >
          {!isOpened ? (
            <motion.div
              className="relative transform-style-3d"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                rotateY: isShaking ? [0, -15, 15, -15, 15, -15, 15, 0] : 0,
                rotateZ: isShaking ? [0, -5, 5, -5, 5, -5, 5, 0] : 0,
                y: isShaking ? [0, -10, 5, -5, 5, -5, 5, 0] : 0,
              }}
              transition={{
                duration: isShaking ? 0.8 : 0.8,
                ease: isShaking ? "easeInOut" : "easeOut",
              }}
            >
              {/* 3D Gift Box */}
              <div className="w-64 h-64 relative transform-style-3d" style={{ transformStyle: "preserve-3d" }}>
                {/* Front face */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg shadow-2xl flex items-center justify-center"
                  style={{
                    transform: "translateZ(32px)",
                    boxShadow: isHovering
                      ? "0 0 30px rgba(255, 102, 179, 0.7)"
                      : "0 20px 50px -10px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <Gift className="h-24 w-24 text-white" />
                </div>

                {/* Back face */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg"
                  style={{ transform: "rotateY(180deg) translateZ(32px)" }}
                />

                {/* Top face */}
                <div
                  className="absolute top-0 left-0 w-full h-[64px] bg-gradient-to-r from-amber-400 to-yellow-300 origin-bottom"
                  style={{ transform: "rotateX(-90deg) translateZ(32px)" }}
                />

                {/* Bottom face */}
                <div
                  className="absolute bottom-0 left-0 w-full h-[64px] bg-gradient-to-r from-amber-500 to-yellow-400 origin-top"
                  style={{ transform: "rotateX(90deg) translateZ(32px)" }}
                />

                {/* Left face */}
                <div
                  className="absolute top-0 left-0 w-[64px] h-full bg-gradient-to-b from-amber-400 to-yellow-300 origin-right"
                  style={{ transform: "rotateY(-90deg) translateZ(32px)" }}
                />

                {/* Right face */}
                <div
                  className="absolute top-0 right-0 w-[64px] h-full bg-gradient-to-b from-amber-500 to-yellow-400 origin-left"
                  style={{ transform: "rotateY(90deg) translateZ(32px)" }}
                />

                {/* Ribbon */}
                <div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-[64px] bg-pink-400 z-10"
                  style={{ transform: "translateX(-50%) translateZ(33px)" }}
                />
                <div
                  className="absolute top-0 left-0 w-full h-full pointer-events-none"
                  style={{ transform: "translateZ(33px)" }}
                >
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-full bg-pink-400" />
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 rotate-45 origin-top w-16 h-32 bg-pink-400" />
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -rotate-45 origin-top w-16 h-32 bg-pink-400" />
                </div>
              </div>

              {/* Hover instruction */}
              <motion.div
                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-6 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <p className="text-pink-300 font-medium">Click to shake, double-click to open!</p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              className="w-64 bg-black/40 backdrop-blur-md rounded-lg shadow-2xl p-6 text-center relative overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Glitter effect */}
              {showGlitter && renderGlitter()}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <motion.h3
                  className="text-2xl font-bold text-pink-400 mb-4"
                  animate={{
                    color: ["#ff66b3", "#9966ff", "#66b3ff", "#ffcc66", "#ff66b3"],
                  }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                >
                  Your Gift
                </motion.h3>

                <motion.div
                  className="text-white/90 mb-4 p-4 rounded-lg bg-white/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <p className="mb-3">
                    Well I can't really give you a gift rn, but I can give you a virtual one! 🎁
                 
                  </p>
                  <p className="italic mb-3">
                    Just kidding, I hope you don't mind the chupa chups
                  </p>
                  <p className="font-medium text-pink-300">I love you so much my vans off the wall my veenie hut jr my big chungus my paplu MY LOVE</p>
                </motion.div>

                {/* Gift image or icon */}
                <motion.div
                  className="mt-4 flex justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: [0, 10, 0, -10, 0] }}
                  transition={{
                    scale: { delay: 0.7, duration: 0.5, ease: "backOut" },
                    rotate: { delay: 1.2, duration: 2, repeat: Number.POSITIVE_INFINITY },
                  }}
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
                    <Gift className="h-8 w-8 text-white" />
                  </div>
                </motion.div>
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
            <Button
              onClick={handleOpenGift}
              className="bg-gradient-to-r from-amber-500 to-pink-500 text-white hover:opacity-90 transition-all duration-300"
              onDoubleClick={handleOpenGift}
            >
              Open Your Gift
            </Button>
          </motion.div>
        )}
      </div>

      {isOpened && (
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Button
            onClick={onContinue}
            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90 transition-all duration-300"
          >
            Celebrate!
          </Button>
        </motion.div>
      )}
    </div>
  )
}
