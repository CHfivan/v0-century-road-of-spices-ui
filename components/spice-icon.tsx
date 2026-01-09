import { cn } from "@/lib/utils"

interface SpiceIconProps {
  type: "yellow" | "red" | "green" | "brown"
  size?: "sm" | "md" | "lg"
  scale?: number
}

const spiceColors = {
  yellow: "bg-spice-yellow border-gold shadow-[0_0_8px_rgba(234,179,8,0.4)]",
  red: "bg-spice-red border-red-900 shadow-[0_0_8px_rgba(220,38,38,0.4)]",
  green: "bg-spice-green border-green-900 shadow-[0_0_8px_rgba(34,197,94,0.4)]",
  brown: "bg-spice-brown border-amber-900 shadow-[0_0_8px_rgba(180,83,9,0.4)]",
}

const baseSizes = {
  sm: 10, // smaller base sizes
  md: 14,
  lg: 20,
}

export function SpiceIcon({ type, size = "md", scale = 1 }: SpiceIconProps) {
  const pixelSize = baseSizes[size] * scale

  return (
    <div
      className={cn("border transition-transform hover:scale-110 rounded-sm", spiceColors[type])}
      style={{ width: `${pixelSize}px`, height: `${pixelSize}px` }}
    />
  )
}
