"use client"

import { useEffect, useRef } from "react"

interface ParticleBackgroundProps {
  currentSection: string
}

export default function ParticleBackground({ currentSection }: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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

    // Particle class
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor(x: number, y: number, size: number, speedX: number, speedY: number, color: string) {
        this.x = x
        this.y = y
        this.size = size
        this.speedX = speedX
        this.speedY = speedY
        this.color = color
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width
        if (this.x > canvas.width) this.x = 0
        if (this.y < 0) this.y = canvas.height
        if (this.y > canvas.height) this.y = 0
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }

    // Create particles based on current section
    let particles: Particle[] = []
    const createParticles = () => {
      particles = []

      // Different particle configurations for each section
      let count = 100
      let colors = ["#ff66b3", "#9966ff", "#66b3ff"]
      let maxSpeed = 0.5
      let maxSize = 3

      switch (currentSection) {
        case "greeting":
          colors = ["#ff66b3", "#9966ff", "#66b3ff"]
          count = 100
          maxSpeed = 0.5
          maxSize = 3
          break
        case "gallery":
          colors = ["#66ffcc", "#ff66b3", "#ffcc66"]
          count = 150
          maxSpeed = 0.3
          maxSize = 2
          break
        case "gift":
          colors = ["#ffcc66", "#ff9966", "#ff6666"]
          count = 120
          maxSpeed = 0.7
          maxSize = 4
          break
        case "fireworks":
          colors = ["#ff6666", "#ffcc66", "#66ffcc", "#66b3ff", "#9966ff"]
          count = 200
          maxSpeed = 1
          maxSize = 3
          break
        default:
          break
      }

      for (let i = 0; i < count; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const size = Math.random() * maxSize + 0.5
        const speedX = (Math.random() - 0.5) * maxSpeed
        const speedY = (Math.random() - 0.5) * maxSpeed
        const color = colors[Math.floor(Math.random() * colors.length)]

        particles.push(new Particle(x, y, size, speedX, speedY, color))
      }
    }

    // Animation loop
    const animate = () => {
      if (!ctx) return

      // Create gradient background based on current section
      let gradient
      switch (currentSection) {
        case "greeting":
          gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
          gradient.addColorStop(0, "#1a0033")
          gradient.addColorStop(1, "#330033")
          break
        case "gallery":
          gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
          gradient.addColorStop(0, "#003333")
          gradient.addColorStop(1, "#330033")
          break
        case "gift":
          gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
          gradient.addColorStop(0, "#331a00")
          gradient.addColorStop(1, "#330033")
          break
        case "fireworks":
          gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
          gradient.addColorStop(0, "#000033")
          gradient.addColorStop(1, "#1a0033")
          break
        default:
          gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
          gradient.addColorStop(0, "#000000")
          gradient.addColorStop(1, "#1a0033")
      }

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      requestAnimationFrame(animate)
    }

    createParticles()
    animate()

    // Recreate particles when section changes
    const sectionChangeHandler = () => {
      createParticles()
    }

    sectionChangeHandler()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [currentSection])

  return <canvas ref={canvasRef} className="absolute inset-0" />
}
