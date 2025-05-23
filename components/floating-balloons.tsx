"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Balloon {
  id: number
  x: number
  y: number
  size: number
  color: string
  delay: number
  duration: number
}

const colors = ["bg-pink-400", "bg-purple-400", "bg-blue-400", "bg-yellow-400", "bg-red-400", "bg-green-400"]

export default function FloatingBalloons() {
  const [balloons, setBalloons] = useState<Balloon[]>([])

  useEffect(() => {
    const generateBalloons = () => {
      const newBalloons: Balloon[] = []

      for (let i = 0; i < 15; i++) {
        newBalloons.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 20 + 100,
          size: Math.random() * 30 + 30,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 5,
          duration: Math.random() * 10 + 15,
        })
      }

      setBalloons(newBalloons)
    }

    generateBalloons()
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {balloons.map((balloon) => (
        <motion.div
          key={balloon.id}
          className={`absolute ${balloon.color} rounded-full`}
          style={{
            left: `${balloon.x}%`,
            bottom: `-${balloon.size}px`,
            width: `${balloon.size}px`,
            height: `${balloon.size * 1.2}px`,
            borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
          }}
          initial={{ y: 0 }}
          animate={{
            y: `-${balloon.y + 100}vh`,
            x: [0, Math.random() * 50 - 25, Math.random() * 50 - 25, Math.random() * 50 - 25, 0],
          }}
          transition={{
            duration: balloon.duration,
            delay: balloon.delay,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-[1px] h-[40px] bg-gray-300" />
        </motion.div>
      ))}
    </div>
  )
}
