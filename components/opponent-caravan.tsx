"use client"

import { SpiceIcon } from "./spice-icon"
import { Trophy } from "lucide-react"

interface OpponentCaravanProps {
  caravan: { yellow: number; red: number; green: number; brown: number }
  coins: { gold: number; silver: number }
  points: number
  scale?: number
}

export function OpponentCaravan({ caravan, coins, points, scale = 1 }: OpponentCaravanProps) {
  const maxCapacity = 10

  const spiceSlots: (("yellow" | "red" | "green" | "brown") | null)[] = []
  const spiceTypes: ("yellow" | "red" | "green" | "brown")[] = ["yellow", "red", "green", "brown"]

  spiceTypes.forEach((type) => {
    for (let i = 0; i < caravan[type]; i++) {
      spiceSlots.push(type)
    }
  })

  while (spiceSlots.length < maxCapacity) {
    spiceSlots.push(null)
  }

  const currentCount = spiceSlots.filter(Boolean).length

  return (
    <div className="relative bg-secondary/30 rounded border border-border/50" style={{ padding: `${8 * scale}px` }}>
      {/* Points Badge */}
      <div
        className="absolute bg-gold text-card font-bold rounded-full border border-amber-300 flex items-center"
        style={{
          top: `${-8 * scale}px`,
          left: `${-8 * scale}px`,
          padding: `${2 * scale}px ${6 * scale}px`,
          gap: `${2 * scale}px`,
          fontSize: `${9 * scale}px`,
        }}
      >
        <Trophy style={{ width: `${10 * scale}px`, height: `${10 * scale}px` }} />
        {points}
      </div>

      {/* Coins Badge */}
      {(coins.gold > 0 || coins.silver > 0) && (
        <div
          className="absolute bg-card border border-border rounded-full flex items-center"
          style={{
            top: `${-8 * scale}px`,
            right: `${-8 * scale}px`,
            padding: `${2 * scale}px ${6 * scale}px`,
            gap: `${4 * scale}px`,
          }}
        >
          {coins.gold > 0 && (
            <div className="flex items-center" style={{ gap: `${2 * scale}px` }}>
              <div
                className="rounded-full bg-gold border border-amber-300"
                style={{ width: `${10 * scale}px`, height: `${10 * scale}px` }}
              />
              <span className="font-bold text-gold" style={{ fontSize: `${8 * scale}px` }}>
                {coins.gold}
              </span>
            </div>
          )}
          {coins.silver > 0 && (
            <div className="flex items-center" style={{ gap: `${2 * scale}px` }}>
              <div
                className="rounded-full bg-gray-300 border border-gray-400"
                style={{ width: `${10 * scale}px`, height: `${10 * scale}px` }}
              />
              <span className="font-bold text-gray-300" style={{ fontSize: `${8 * scale}px` }}>
                {coins.silver}
              </span>
            </div>
          )}
        </div>
      )}

      {/* 10-box grid (5x2) */}
      <div className="grid grid-cols-5" style={{ gap: `${2 * scale}px`, marginTop: `${8 * scale}px` }}>
        {spiceSlots.map((spice, i) => (
          <div
            key={i}
            className="rounded-sm border border-border/30 bg-background/30 flex items-center justify-center"
            style={{ width: `${16 * scale}px`, height: `${16 * scale}px` }}
          >
            {spice && <SpiceIcon type={spice} size="sm" variant="square" scale={scale * 0.7} />}
          </div>
        ))}
      </div>

      <div
        className="text-muted-foreground text-center"
        style={{ fontSize: `${8 * scale}px`, marginTop: `${4 * scale}px` }}
      >
        {currentCount}/{maxCapacity}
      </div>
    </div>
  )
}
