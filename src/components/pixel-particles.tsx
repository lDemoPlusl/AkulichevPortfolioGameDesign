import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface PixelParticlesProps {
  className?: string
  density?: number
  speed?: number
}

interface Particle {
  x: number
  y: number
  size: number
  color: string
  vx: number
  vy: number
  life: number
  maxLife: number
}

export function PixelParticles({ className, density = 20, speed = 1 }: PixelParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationFrameRef = useRef<number>(0)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      // Initialize particles
      particlesRef.current = []
      for (let i = 0; i < density; i++) {
        particlesRef.current.push(createParticle())
      }
    }

    const createParticle = (): Particle => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 1 + Math.random() * 3,
        color: getRandomColor(),
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        life: 0,
        maxLife: 100 + Math.random() * 200,
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle, index) => {
        // Update particle
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life++

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Reset particle if it's lived its life
        if (particle.life >= particle.maxLife) {
          particlesRef.current[index] = createParticle()
        }

        // Draw particle
        const opacity = 1 - particle.life / particle.maxLife
        ctx.fillStyle = hexToRgba(particle.color, opacity * 0.5)
        ctx.fillRect(Math.floor(particle.x), Math.floor(particle.y), Math.ceil(particle.size), Math.ceil(particle.size))
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener("resize", handleResize)
    handleResize()
    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [density, speed])

  return <canvas ref={canvasRef} className={cn("fixed top-0 left-0 w-full h-full -z-20 opacity-30", className)} />
}

// Helper functions
function getRandomColor(): string {
  const colors = [
    "#ec4899", // pink-500
    "#a855f7", // purple-500
    "#3b82f6", // blue-500
    "#10b981", // emerald-500
    "#eab308", // yellow-500
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

function hexToRgba(hex: string, alpha: number): string {
  const r = Number.parseInt(hex.slice(1, 3), 16)
  const g = Number.parseInt(hex.slice(3, 5), 16)
  const b = Number.parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

