"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface FireworksDisplayProps {
  onContinue: () => void
}

export default function FireworksDisplay({ onContinue }: FireworksDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [message, setMessage] = useState("Happy Birthday!")
  const [customMessage, setCustomMessage] = useState("")
  const [isCustomizing, setIsCustomizing] = useState(false)

  // Fireworks animation
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Firework class
    class Firework {
      x: number
      y: number
      targetX: number
      targetY: number
      speed: number
      angle: number
      distance: number
      traveled: number
      color: string
      trail: Array<{ x: number; y: number }>
      trailLength: number

      constructor(targetX: number, targetY: number) {
        // Start position
        this.x = canvas.width * Math.random()
        this.y = canvas.height

        // Target position
        this.targetX = targetX || canvas.width * Math.random()
        this.targetY = targetY || canvas.height * 0.2 * Math.random()

        // Calculate angle and distance
        this.angle = Math.atan2(this.targetY - this.y, this.targetX - this.x)
        this.speed = 2 + Math.random() * 3
        this.distance = Math.sqrt(Math.pow(this.targetX - this.x, 2) + Math.pow(this.targetY - this.y, 2))
        this.traveled = 0

        // Appearance
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`
        // Initialize trail with starting position
        this.trail = [{ x: this.x, y: this.y }]
        this.trailLength = 5 + Math.floor(Math.random() * 10)
      }

      update() {
        // Move along angle
        this.x += Math.cos(this.angle) * this.speed
        this.y += Math.sin(this.angle) * this.speed

        // Add to trail
        this.trail.push({ x: this.x, y: this.y })
        if (this.trail.length > this.trailLength) {
          this.trail.shift()
        }

        // Update traveled distance
        this.traveled += this.speed

        // Return true if reached target
        return this.traveled >= this.distance
      }

      draw() {
        if (!ctx) return

        // Only draw trail if it has elements
        if (this.trail.length > 0) {
          // Draw trail
          ctx.beginPath()
          ctx.moveTo(this.trail[0].x, this.trail[0].y)

          for (let i = 1; i < this.trail.length; i++) {
            ctx.lineTo(this.trail[i].x, this.trail[i].y)
          }

          ctx.strokeStyle = this.color
          ctx.lineWidth = 2
          ctx.stroke()
        }

        // Draw head
        ctx.beginPath()
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2)
        ctx.fillStyle = "white"
        ctx.fill()
      }
    }

    // Particle class (for explosion)
    class Particle {
      x: number
      y: number
      angle: number
      speed: number
      friction: number
      gravity: number
      color: string
      alpha: number
      decay: number

      constructor(x: number, y: number, color: string) {
        this.x = x
        this.y = y
        this.angle = Math.random() * Math.PI * 2
        this.speed = Math.random() * 6 + 1
        this.friction = 0.95
        this.gravity = 0.2
        this.color = color
        this.alpha = 1
        this.decay = Math.random() * 0.03 + 0.02
      }

      update() {
        // Apply friction
        this.speed *= this.friction

        // Apply gravity
        this.x += Math.cos(this.angle) * this.speed
        this.y += Math.sin(this.angle) * this.speed + this.gravity

        // Fade out
        this.alpha -= this.decay

        // Return true if still visible
        return this.alpha > 0
      }

      draw() {
        if (!ctx) return

        ctx.globalAlpha = this.alpha
        ctx.beginPath()
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.globalAlpha = 1
      }
    }

    // Arrays to store fireworks and particles
    const fireworks: Firework[] = []
    const particles: Particle[] = []

    // Launch fireworks automatically
    const autoLaunch = () => {
      if (Math.random() < 0.05) {
        fireworks.push(new Firework(canvas.width * Math.random(), canvas.height * 0.3 * Math.random()))
      }
    }

    // Create explosion
    const createExplosion = (x: number, y: number, color: string) => {
      const particleCount = 50 + Math.floor(Math.random() * 50)
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(x, y, color))
      }
    }

    // Animation loop
    const animate = () => {
      // Clear canvas with semi-transparent black for trail effect
      if (!ctx) return
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw fireworks
      for (let i = fireworks.length - 1; i >= 0; i--) {
        const firework = fireworks[i]
        firework.draw()

        // If firework reached target, remove it and create explosion
        if (firework.update()) {
          createExplosion(firework.x, firework.y, firework.color)
          fireworks.splice(i, 1)
        }
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i]
        particle.draw()

        // Remove particle if faded out
        if (!particle.update()) {
          particles.splice(i, 1)
        }
      }

      // Launch new fireworks
      autoLaunch()

      // Draw celebration message
      ctx.font = "bold 40px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      // Create gradient text
      const gradient = ctx.createLinearGradient(
        canvas.width / 2 - 150,
        canvas.height / 2,
        canvas.width / 2 + 150,
        canvas.height / 2,
      )
      gradient.addColorStop(0, "#ff66b3")
      gradient.addColorStop(0.5, "#9966ff")
      gradient.addColorStop(1, "#66b3ff")

      ctx.fillStyle = gradient
      ctx.fillText(message, canvas.width / 2, canvas.height / 2)

      requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Click to launch fireworks
    const handleClick = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY

      // Launch 3 fireworks to clicked position
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          fireworks.push(new Firework(x + (Math.random() * 100 - 50), y + (Math.random() * 100 - 50)))
        }, i * 200)
      }
    }

    canvas.addEventListener("click", handleClick)

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      canvas.removeEventListener("click", handleClick)
    }
  }, [message])

  // Handle custom message
  const handleCustomMessage = () => {
    if (customMessage.trim()) {
      setMessage(customMessage.trim())
    }
    setIsCustomizing(false)
  }

  return (
    <div className="absolute left-0 min-h-[100vh] w-full">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 cursor-pointer"
        title="Click anywhere to launch fireworks!"
      />

      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center gap-4">
        {isCustomizing ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/50 backdrop-blur-md p-4 rounded-lg"
          >
            <input
              type="text"
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Enter your message"
              className="px-4 py-2 rounded-md bg-black/50 border border-pink-500/50 text-white mb-2 w-full"
              maxLength={30}
            />
            <div className="flex gap-2">
              <Button onClick={handleCustomMessage} className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                Set Message
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsCustomizing(false)}
                className="border-pink-500/50 text-pink-400"
              >
                Cancel
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-3 items-center">

            <Button onClick={onContinue} className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
              Back to Card
            </Button>

            <motion.p
              className="text-white/70 text-sm mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              Click anywhere on the screen to create fireworks!
            </motion.p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
