"use client"

import { cn } from "@/lib/utils"
import { SpiceIcon } from "./spice-icon"

interface MerchantCardProps {
  card: {
    id: number
    name: string
    cost: { yellow?: number; red?: number; green?: number; brown?: number } | null
    effect: string
    spices: { yellow?: number; red?: number; green?: number; brown?: number } | null
  }
  isInHand?: boolean
  isSelected?: boolean
  onClick?: () => void
  scale?: number
}

export function MerchantCard({ card, isInHand, isSelected, onClick, scale = 1 }: MerchantCardProps) {
  const allSpices: Array<{ type: "yellow" | "red" | "green" | "brown" }> = []
  if (card.spices) {
    if (card.spices.yellow) {
      for (let i = 0; i < card.spices.yellow; i++) allSpices.push({ type: "yellow" })
    }
    if (card.spices.red) {
      for (let i = 0; i < card.spices.red; i++) allSpices.push({ type: "red" })
    }
    if (card.spices.green) {
      for (let i = 0; i < card.spices.green; i++) allSpices.push({ type: "green" })
    }
    if (card.spices.brown) {
      for (let i = 0; i < card.spices.brown; i++) allSpices.push({ type: "brown" })
    }
  }

  return (
    <div
      onClick={onClick}
      className={cn(
        "relative rounded-lg cursor-pointer transition-all duration-300",
        "bg-gradient-to-b from-card to-secondary border-2",
        "hover:scale-105 hover:-translate-y-2",
        isSelected
          ? "border-gold shadow-[0_0_20px_rgba(212,175,55,0.5)] scale-105 -translate-y-2"
          : "border-border hover:border-gold/60",
        isInHand && "hover:z-10",
      )}
      style={{ width: `${100 * scale}px`, height: `${140 * scale}px` }}
    >
      {/* Card Frame - Ornate Border */}
      <div className="absolute rounded-md border border-gold/20" style={{ inset: `${4 * scale}px` }} />

      {/* Card Content */}
      <div className="relative h-full flex flex-col" style={{ padding: `${8 * scale}px` }}>
        {/* Card Header */}
        <div
          className="text-center border-b border-gold/20"
          style={{ paddingTop: `${4 * scale}px`, paddingBottom: `${4 * scale}px` }}
        >
          <h3 className="font-semibold text-gold truncate" style={{ fontSize: `${9 * scale}px` }}>
            {card.name}
          </h3>
        </div>

        <div
          className="flex-1 flex items-start rounded bg-background/30"
          style={{ margin: `${6 * scale}px 0`, padding: `${3 * scale}px` }}
        >
          {card.spices && allSpices.length > 0 && (
            <div className="flex flex-col" style={{ gap: `${2 * scale}px` }}>
              {allSpices.map((spice, i) => (
                <SpiceIcon key={`s-${i}`} type={spice.type} size="sm" scale={scale} />
              ))}
            </div>
          )}
          {!card.spices && (
            <div className="flex-1 flex items-center justify-center" style={{ fontSize: `${20 * scale}px` }}>
              <span className="text-gold">⬆️</span>
            </div>
          )}
        </div>

        {/* Card Effect */}
        <div
          className="text-center border-t border-gold/20"
          style={{ paddingTop: `${4 * scale}px`, paddingBottom: `${4 * scale}px` }}
        >
          <p className="text-muted-foreground leading-tight" style={{ fontSize: `${7 * scale}px` }}>
            {card.effect}
          </p>
        </div>

        {/* Cost Badge */}
        {card.cost && (
          <div
            className="absolute left-1/2 -translate-x-1/2 flex bg-card rounded border border-border"
            style={{
              bottom: `${-6 * scale}px`,
              gap: `${1 * scale}px`,
              padding: `${2 * scale}px ${3 * scale}px`,
            }}
          >
            {card.cost.yellow &&
              Array.from({ length: card.cost.yellow }).map((_, i) => (
                <SpiceIcon key={`cy-${i}`} type="yellow" size="sm" scale={scale * 0.8} />
              ))}
            {card.cost.red &&
              Array.from({ length: card.cost.red }).map((_, i) => (
                <SpiceIcon key={`cr-${i}`} type="red" size="sm" scale={scale * 0.8} />
              ))}
            {card.cost.green &&
              Array.from({ length: card.cost.green }).map((_, i) => (
                <SpiceIcon key={`cg-${i}`} type="green" size="sm" scale={scale * 0.8} />
              ))}
            {card.cost.brown &&
              Array.from({ length: card.cost.brown }).map((_, i) => (
                <SpiceIcon key={`cb-${i}`} type="brown" size="sm" scale={scale * 0.8} />
              ))}
          </div>
        )}
      </div>

      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-t from-gold/10 to-transparent" />
    </div>
  )
}
