"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface AudioVisualizerProps {
  audioRef: React.RefObject<HTMLAudioElement>
}

export default function AudioVisualizer({ audioRef }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || !audioRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = 100
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Set up audio analyzer
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const analyzer = audioContext.createAnalyser()
    analyzer.fftSize = 256

    const audioSource = audioContext.createMediaElementSource(audioRef.current)
    audioSource.connect(analyzer)
    analyzer.connect(audioContext.destination)

    const bufferLength = analyzer.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    // Animation function
    const animate = () => {
      requestAnimationFrame(animate)

      analyzer.getByteFrequencyData(dataArray)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const barWidth = canvas.width / bufferLength
      let x = 0

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] / 2

        // Create gradient for bars
        const gradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight)
        gradient.addColorStop(0, "#ff66b3")
        gradient.addColorStop(1, "#9966ff")

        ctx.fillStyle = gradient
        ctx.fillRect(x, canvas.height - barHeight, barWidth - 1, barHeight)

        x += barWidth
      }
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      if (audioContext.state !== "closed") {
        audioContext.close()
      }
    }
  }, [audioRef])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
