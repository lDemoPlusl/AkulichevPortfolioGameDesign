"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface PixelBackgroundProps {
  className?: string
}

interface Entity {
  x: number
  y: number
  width: number
  height: number
  color: string
  vx: number
  vy: number
  type: "character" | "platform" | "cloud" | "collectible" | "particle"
  frame: number
  frameCount: number
  frameDelay: number
  frameTimer: number
  active: boolean
}

interface MousePosition {
  x: number
  y: number
  active: boolean
}

export function PixelBackground({ className }: PixelBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const entitiesRef = useRef<Entity[]>([])
  const animationFrameRef = useRef<number>(0)
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0, active: false })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const lastTimeRef = useRef<number>(0)

  // Initialize canvas and entities
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return

      const canvas = canvasRef.current
      const width = window.innerWidth
      const height = window.innerHeight

      // Set canvas dimensions
      canvas.width = width
      canvas.height = height
      setDimensions({ width, height })

      // Generate entities based on new dimensions
      entitiesRef.current = generateEntities(width, height)
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  // Handle mouse interactions
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY, active: true })
    }

    const handleMouseLeave = () => {
      setMousePosition((prev) => ({ ...prev, active: false }))
    }

    const handleMouseEnter = () => {
      setMousePosition((prev) => ({ ...prev, active: true }))
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [])

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return

    const ctx = canvasRef.current.getContext("2d", { alpha: true })
    if (!ctx) return

    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp
      const deltaTime = timestamp - lastTimeRef.current
      lastTimeRef.current = timestamp

      // Clear canvas
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      // Draw grid
      drawGrid(ctx, dimensions.width, dimensions.height)

      // Update and draw entities
      updateEntities(entitiesRef.current, mousePosition, dimensions, deltaTime)
      drawEntities(ctx, entitiesRef.current)

      // Request next frame
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [dimensions, mousePosition])

  return <canvas ref={canvasRef} className={cn("fixed top-0 left-0 w-full h-full -z-10 opacity-30", className)} />
}

// Generate initial entities
function generateEntities(width: number, height: number): Entity[] {
  const entities: Entity[] = []

  // Characters (small game sprites that move around)
  for (let i = 0; i < 8; i++) {
    entities.push({
      x: Math.random() * width,
      y: Math.random() * height * 0.7,
      width: 8 + Math.random() * 8,
      height: 8 + Math.random() * 8,
      color: getRandomColor(),
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.2,
      type: "character",
      frame: 0,
      frameCount: 4,
      frameDelay: 10,
      frameTimer: 0,
      active: true,
    })
  }

  // Platforms (horizontal surfaces for characters to "stand" on)
  const platformCount = Math.max(5, Math.floor(width / 300))
  for (let i = 0; i < platformCount; i++) {
    const platformWidth = 50 + Math.random() * 150
    entities.push({
      x: (width / platformCount) * i + Math.random() * (width / platformCount - platformWidth),
      y: height * (0.5 + Math.random() * 0.4),
      width: platformWidth,
      height: 8 + Math.random() * 8,
      color: getRandomColor(),
      vx: 0,
      vy: 0,
      type: "platform",
      frame: 0,
      frameCount: 1,
      frameDelay: 0,
      frameTimer: 0,
      active: true,
    })
  }

  // Clouds
  for (let i = 0; i < 5; i++) {
    entities.push({
      x: Math.random() * width,
      y: Math.random() * height * 0.3,
      width: 40 + Math.random() * 60,
      height: 20 + Math.random() * 30,
      color: "#FFFFFF",
      vx: (Math.random() - 0.5) * 0.2,
      vy: 0,
      type: "cloud",
      frame: 0,
      frameCount: 1,
      frameDelay: 0,
      frameTimer: 0,
      active: true,
    })
  }

  // Collectibles (stars, coins, etc.)
  for (let i = 0; i < 12; i++) {
    entities.push({
      x: Math.random() * width,
      y: Math.random() * height,
      width: 6 + Math.random() * 6,
      height: 6 + Math.random() * 6,
      color: "#FFD700", // Gold color
      vx: 0,
      vy: 0,
      type: "collectible",
      frame: 0,
      frameCount: 2,
      frameDelay: 30,
      frameTimer: 0,
      active: true,
    })
  }

  return entities
}

// Update entity positions and states
function updateEntities(
  entities: Entity[],
  mouse: MousePosition,
  dimensions: { width: number; height: number },
  deltaTime: number,
) {
  const dt = Math.min(deltaTime, 32) / 16 // Cap delta time and normalize to ~60fps

  entities.forEach((entity) => {
    // Update animation frames
    entity.frameTimer++
    if (entity.frameTimer >= entity.frameDelay) {
      entity.frame = (entity.frame + 1) % entity.frameCount
      entity.frameTimer = 0
    }

    // Character behavior
    if (entity.type === "character") {
      // Apply gravity
      entity.vy += 0.01 * dt

      // Check for platform collisions
      const onPlatform = entities.some(
        (platform) =>
          platform.type === "platform" &&
          entity.y + entity.height <= platform.y + 2 &&
          entity.y + entity.height >= platform.y - 2 &&
          entity.x + entity.width > platform.x &&
          entity.x < platform.x + platform.width,
      )

      if (onPlatform) {
        entity.vy = 0

        // Random jumping
        if (Math.random() < 0.005 * dt) {
          entity.vy = -0.8 - Math.random() * 0.5
        }
      }

      // Mouse interaction - characters are attracted to mouse position
      if (mouse.active) {
        const dx = mouse.x - (entity.x + entity.width / 2)
        const dy = mouse.y - (entity.y + entity.height / 2)
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 150) {
          // Move towards mouse
          entity.vx += (dx / distance) * 0.02 * dt

          // Don't affect y velocity too much to maintain platform physics
          if (!onPlatform) {
            entity.vy += (dy / distance) * 0.005 * dt
          }

          // Limit velocity
          const maxSpeed = 1
          const currentSpeed = Math.sqrt(entity.vx * entity.vx + entity.vy * entity.vy)
          if (currentSpeed > maxSpeed) {
            entity.vx = (entity.vx / currentSpeed) * maxSpeed
            entity.vy = (entity.vy / currentSpeed) * maxSpeed
          }
        }
      }

      // Apply friction
      entity.vx *= 0.98

      // Update position
      entity.x += entity.vx * dt
      entity.y += entity.vy * dt

      // Screen boundaries with bounce
      if (entity.x < 0) {
        entity.x = 0
        entity.vx *= -0.8
      }
      if (entity.x + entity.width > dimensions.width) {
        entity.x = dimensions.width - entity.width
        entity.vx *= -0.8
      }
      if (entity.y < 0) {
        entity.y = 0
        entity.vy *= -0.8
      }
      if (entity.y + entity.height > dimensions.height) {
        entity.y = dimensions.height - entity.height
        entity.vy = -Math.abs(entity.vy) * 0.5
      }
    }

    // Cloud behavior
    if (entity.type === "cloud") {
      // Move clouds horizontally
      entity.x += entity.vx * dt

      // Wrap around screen
      if (entity.x + entity.width < 0) {
        entity.x = dimensions.width
      }
      if (entity.x > dimensions.width) {
        entity.x = -entity.width
      }
    }

    // Collectible behavior
    if (entity.type === "collectible") {
      // Floating animation
      entity.y += Math.sin(Date.now() * 0.002 + entity.x) * 0.1 * dt

      // Spin animation
      entity.frame = Math.floor(Date.now() * 0.005 + entity.x) % entity.frameCount

      // Mouse interaction - collectibles move away from mouse
      if (mouse.active) {
        const dx = mouse.x - (entity.x + entity.width / 2)
        const dy = mouse.y - (entity.y + entity.height / 2)
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          // Move away from mouse
          entity.x -= (dx / distance) * 0.5 * dt
          entity.y -= (dy / distance) * 0.5 * dt
        }
      }

      // Keep within bounds
      entity.x = Math.max(0, Math.min(dimensions.width - entity.width, entity.x))
      entity.y = Math.max(0, Math.min(dimensions.height - entity.height, entity.y))
    }
  })

  // Add particles occasionally
  if (Math.random() < 0.05 * dt) {
    entities.push({
      x: Math.random() * dimensions.width,
      y: dimensions.height,
      width: 2 + Math.random() * 3,
      height: 2 + Math.random() * 3,
      color: getRandomColor(),
      vx: (Math.random() - 0.5) * 0.5,
      vy: -0.5 - Math.random() * 1,
      type: "particle",
      frame: 0,
      frameCount: 1,
      frameDelay: 0,
      frameTimer: 0,
      active: true,
    })
  }

  // Update particles
  entities.forEach((entity, index) => {
    if (entity.type === "particle") {
      entity.x += entity.vx * dt
      entity.y += entity.vy * dt
      entity.vy += 0.01 * dt // Gravity

      // Fade out by reducing size
      entity.width *= 0.99
      entity.height *= 0.99

      // Remove when too small or off-screen
      if (entity.width < 0.5 || entity.y < 0 || entity.y > dimensions.height) {
        entity.active = false
      }
    }
  })

  // Remove inactive entities
  for (let i = entities.length - 1; i >= 0; i--) {
    if (!entities[i].active) {
      entities.splice(i, 1)
    }
  }
}

// Draw all entities to canvas
function drawEntities(ctx: CanvasRenderingContext2D, entities: Entity[]) {
  // Sort entities by type for layering
  const sortedEntities = [...entities].sort((a, b) => {
    const typeOrder: Record<string, number> = {
      cloud: 1,
      platform: 2,
      collectible: 3,
      character: 4,
      particle: 5,
    }
    return typeOrder[a.type] - typeOrder[b.type]
  })

  sortedEntities.forEach((entity) => {
    ctx.save()

    switch (entity.type) {
      case "character":
        drawCharacter(ctx, entity)
        break
      case "platform":
        drawPlatform(ctx, entity)
        break
      case "cloud":
        drawCloud(ctx, entity)
        break
      case "collectible":
        drawCollectible(ctx, entity)
        break
      case "particle":
        drawParticle(ctx, entity)
        break
    }

    ctx.restore()
  })
}

// Draw a pixel art character
function drawCharacter(ctx: CanvasRenderingContext2D, entity: Entity) {
  const x = Math.floor(entity.x)
  const y = Math.floor(entity.y)
  const width = Math.floor(entity.width)
  const height = Math.floor(entity.height)

  // Body
  ctx.fillStyle = entity.color
  ctx.fillRect(x, y, width, height)

  // Eyes
  ctx.fillStyle = "#FFFFFF"
  ctx.fillRect(x + width * 0.2, y + height * 0.2, width * 0.2, height * 0.2)
  ctx.fillRect(x + width * 0.6, y + height * 0.2, width * 0.2, height * 0.2)

  // Mouth
  ctx.fillStyle = "#000000"
  ctx.fillRect(x + width * 0.3, y + height * 0.6, width * 0.4, height * 0.1)

  // Legs (animated)
  if (entity.frame % 2 === 0) {
    ctx.fillStyle = entity.color
    ctx.fillRect(x + width * 0.2, y + height, width * 0.2, height * 0.3)
    ctx.fillRect(x + width * 0.6, y + height, width * 0.2, height * 0.3)
  } else {
    ctx.fillStyle = entity.color
    ctx.fillRect(x + width * 0.1, y + height, width * 0.2, height * 0.3)
    ctx.fillRect(x + width * 0.7, y + height, width * 0.2, height * 0.3)
  }
}

// Draw a platform
function drawPlatform(ctx: CanvasRenderingContext2D, entity: Entity) {
  const x = Math.floor(entity.x)
  const y = Math.floor(entity.y)
  const width = Math.floor(entity.width)
  const height = Math.floor(entity.height)

  // Main platform
  ctx.fillStyle = entity.color
  ctx.fillRect(x, y, width, height)

  // Top highlight
  ctx.fillStyle = lightenColor(entity.color, 30)
  ctx.fillRect(x, y, width, Math.max(1, height * 0.3))

  // Pixel details
  for (let i = 0; i < width; i += 4) {
    if (Math.random() > 0.7) {
      ctx.fillStyle = darkenColor(entity.color, 20)
      ctx.fillRect(x + i, y, 2, height)
    }
  }
}

// Draw a cloud
function drawCloud(ctx: CanvasRenderingContext2D, entity: Entity) {
  const x = Math.floor(entity.x)
  const y = Math.floor(entity.y)
  const width = Math.floor(entity.width)
  const height = Math.floor(entity.height)

  // Cloud base (semi-transparent)
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)"

  // Main cloud body
  ctx.fillRect(x + width * 0.2, y, width * 0.6, height)
  ctx.fillRect(x, y + height * 0.3, width, height * 0.4)

  // Cloud details
  ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
  ctx.fillRect(x + width * 0.1, y + height * 0.2, width * 0.3, height * 0.3)
  ctx.fillRect(x + width * 0.5, y + height * 0.1, width * 0.4, height * 0.4)
}

// Draw a collectible item
function drawCollectible(ctx: CanvasRenderingContext2D, entity: Entity) {
  const x = Math.floor(entity.x)
  const y = Math.floor(entity.y)
  const size = Math.floor(entity.width) // Assuming width = height for collectibles

  // Star or coin shape based on frame
  if (entity.frame === 0) {
    // Star shape (simplified for pixels)
    ctx.fillStyle = entity.color
    ctx.fillRect(x + size * 0.5 - 1, y, 2, size)
    ctx.fillRect(x, y + size * 0.5 - 1, size, 2)

    // Highlight
    ctx.fillStyle = lightenColor(entity.color, 50)
    ctx.fillRect(x + size * 0.5 - 1, y, 1, 1)
  } else {
    // Coin shape
    ctx.fillStyle = entity.color
    ctx.fillRect(x, y, size, size)

    // Highlight
    ctx.fillStyle = lightenColor(entity.color, 50)
    ctx.fillRect(x + 1, y + 1, size - 2, 1)

    // Shadow
    ctx.fillStyle = darkenColor(entity.color, 30)
    ctx.fillRect(x + 1, y + size - 2, size - 2, 1)
  }

  // Glow effect
  ctx.globalAlpha = 0.2 + 0.1 * Math.sin(Date.now() * 0.005)
  ctx.fillStyle = entity.color
  ctx.fillRect(x - 1, y - 1, size + 2, size + 2)
  ctx.globalAlpha = 1.0
}

// Draw a particle
function drawParticle(ctx: CanvasRenderingContext2D, entity: Entity) {
  const x = Math.floor(entity.x)
  const y = Math.floor(entity.y)
  const width = Math.floor(entity.width)
  const height = Math.floor(entity.height)

  ctx.fillStyle = entity.color
  ctx.globalAlpha = Math.min(1, width / 3) // Fade out as it gets smaller
  ctx.fillRect(x, y, width, height)
  ctx.globalAlpha = 1.0
}

// Draw background grid
function drawGrid(ctx: CanvasRenderingContext2D, width: number, height: number) {
  ctx.strokeStyle = "rgba(67, 56, 202, 0.1)" // indigo-700 with low opacity
  ctx.lineWidth = 1

  const gridSize = 24

  // Draw vertical lines
  for (let x = 0; x < width; x += gridSize) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, height)
    ctx.stroke()
  }

  // Draw horizontal lines
  for (let y = 0; y < height; y += gridSize) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
    ctx.stroke()
  }
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

function lightenColor(color: string, amount: number): string {
  return adjustColor(color, amount)
}

function darkenColor(color: string, amount: number): string {
  return adjustColor(color, -amount)
}

function adjustColor(color: string, amount: number): string {
  // Convert hex to RGB
  let r = Number.parseInt(color.substring(1, 3), 16)
  let g = Number.parseInt(color.substring(3, 5), 16)
  let b = Number.parseInt(color.substring(5, 7), 16)

  // Adjust RGB values
  r = Math.max(0, Math.min(255, r + amount))
  g = Math.max(0, Math.min(255, g + amount))
  b = Math.max(0, Math.min(255, b + amount))

  // Convert back to hex
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`
}

