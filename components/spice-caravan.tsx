"use client"

import { SpiceIcon } from "./spice-icon"
import { Trophy } from "lucide-react"

interface SpiceCaravanProps {
  scale?: number
}

export function SpiceCaravan({ scale = 1 }: SpiceCaravanProps) {
  const caravan = [
    { type: "yellow" as const, count: 4 },
    { type: "red" as const, count: 2 },
    { type: "green" as const, count: 1 },
    { type: "brown" as const, count: 0 },
  ]

  const coins = { gold: 2, silver: 1 }
  const victoryPoints = 15

  const maxCapacity = 10
  const currentCount = caravan.reduce((sum, s) => sum + s.count, 0)

  const spiceSlots: (("yellow" | "red" | "green" | "brown") | null)[] = []
  caravan.forEach((spice) => {
    for (let i = 0; i < spice.count; i++) {
      spiceSlots.push(spice.type)
    }
  })
  while (spiceSlots.length < maxCapacity) {
    spiceSlots.push(null)
  }

  return (
    <div
      className="absolute z-30"
      style={{
        bottom: `${16 * scale}px`,
        left: `${16 * scale}px`,
      }}
    >
      <div
        className="relative bg-card/95 backdrop-blur-sm rounded-lg border-2 border-bronze/40"
        style={{
          padding: `${12 * scale}px`,
          width: `${160 * scale}px`,
        }}
      >
        {/* Victory Points Badge - top left */}
        <div
          className="absolute bg-gold text-card font-bold rounded-full border-2 border-amber-300 flex items-center shadow-lg"
          style={{
            top: `${-10 * scale}px`,
            left: `${-10 * scale}px`,
            padding: `${4 * scale}px ${8 * scale}px`,
            gap: `${4 * scale}px`,
            fontSize: `${12 * scale}px`,
          }}
        >
          <Trophy style={{ width: `${12 * scale}px`, height: `${12 * scale}px` }} />
          {victoryPoints}
        </div>

        {/* Coins Badge - top right */}
        <div
          className="absolute bg-card border-2 border-bronze/50 rounded-full flex items-center shadow-lg"
          style={{
            top: `${-10 * scale}px`,
            right: `${-10 * scale}px`,
            padding: `${4 * scale}px ${8 * scale}px`,
            gap: `${4 * scale}px`,
          }}
        >
          {coins.gold > 0 && (
            <div className="flex items-center" style={{ gap: `${2 * scale}px` }}>
              <div
                className="rounded-full bg-gold border border-amber-300"
                style={{ width: `${14 * scale}px`, height: `${14 * scale}px` }}
              />
              <span className="font-bold text-gold" style={{ fontSize: `${10 * scale}px` }}>
                {coins.gold}
              </span>
            </div>
          )}
          {coins.silver > 0 && (
            <div className="flex items-center" style={{ gap: `${2 * scale}px`, marginLeft: `${4 * scale}px` }}>
              <div
                className="rounded-full bg-gray-300 border border-gray-400"
                style={{ width: `${14 * scale}px`, height: `${14 * scale}px` }}
              />
              <span className="font-bold text-gray-300" style={{ fontSize: `${10 * scale}px` }}>
                {coins.silver}
              </span>
            </div>
          )}
        </div>

        {/* Title */}
        <div
          className="text-bronze uppercase tracking-wider text-center"
          style={{ fontSize: `${8 * scale}px`, marginTop: `${4 * scale}px`, marginBottom: `${8 * scale}px` }}
        >
          Your Caravan
        </div>

        <div className="grid grid-cols-5" style={{ gap: `${4 * scale}px` }}>
          {spiceSlots.map((spice, i) => (
            <div
              key={i}
              className="rounded-sm border border-bronze/30 bg-secondary/50 flex items-center justify-center"
              style={{ width: `${24 * scale}px`, height: `${24 * scale}px` }}
            >
              {spice && <SpiceIcon type={spice} size="sm" variant="square" scale={scale * 0.9} />}
            </div>
          ))}
        </div>

        {/* Capacity text */}
        <div
          className="text-muted-foreground text-center"
          style={{ fontSize: `${8 * scale}px`, marginTop: `${8 * scale}px` }}
        >
          {currentCount} / {maxCapacity}
        </div>
      </div>
    </div>
  )
}
