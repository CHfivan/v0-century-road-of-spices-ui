"use client"

import { Flame, Coins, Users } from "lucide-react"
import { DeviceSelector } from "./device-selector"

interface GameHeaderProps {
  currentDevice: string
  onDeviceChange: (device: string) => void
  scale?: number
}

export function GameHeader({ currentDevice, onDeviceChange, scale = 1 }: GameHeaderProps) {
  return (
    <header
      className="relative z-10 flex items-center justify-between bg-card/80 backdrop-blur-sm border-b-2 border-gold/30"
      style={{ padding: `${12 * scale}px ${24 * scale}px` }}
    >
      {/* Left - Game Logo */}
      <div className="flex items-center" style={{ gap: `${12 * scale}px` }}>
        <div
          className="rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center"
          style={{ width: `${40 * scale}px`, height: `${40 * scale}px` }}
        >
          <Flame style={{ width: `${24 * scale}px`, height: `${24 * scale}px` }} className="text-background" />
        </div>
        <div>
          <h1 className="font-bold text-gold tracking-wider" style={{ fontSize: `${18 * scale}px` }}>
            CENTURY
          </h1>
          <p className="text-muted-foreground tracking-widest" style={{ fontSize: `${10 * scale}px` }}>
            ROAD OF SPICES
          </p>
        </div>
      </div>

      {/* Center - Turn Info */}
      <div className="flex items-center" style={{ gap: `${24 * scale}px` }}>
        <div className="text-center">
          <p className="text-muted-foreground uppercase tracking-wider" style={{ fontSize: `${10 * scale}px` }}>
            Current Turn
          </p>
          <p className="text-gold font-semibold" style={{ fontSize: `${14 * scale}px` }}>
            Player 1
          </p>
        </div>
        <div className="bg-border" style={{ width: "1px", height: `${32 * scale}px` }} />
        <div className="text-center">
          <p className="text-muted-foreground uppercase tracking-wider" style={{ fontSize: `${10 * scale}px` }}>
            Round
          </p>
          <p className="text-foreground font-semibold" style={{ fontSize: `${14 * scale}px` }}>
            5 / 20
          </p>
        </div>
      </div>

      {/* Right - Player Stats & Device Selector */}
      <div className="flex items-center" style={{ gap: `${16 * scale}px` }}>
        <div
          className="flex items-center rounded-full bg-secondary/50 border border-border"
          style={{ gap: `${8 * scale}px`, padding: `${4 * scale}px ${12 * scale}px` }}
        >
          <Coins style={{ width: `${16 * scale}px`, height: `${16 * scale}px` }} className="text-gold" />
          <span className="font-medium" style={{ fontSize: `${14 * scale}px` }}>
            12 pts
          </span>
        </div>
        <div
          className="flex items-center rounded-full bg-secondary/50 border border-border"
          style={{ gap: `${8 * scale}px`, padding: `${4 * scale}px ${12 * scale}px` }}
        >
          <Users style={{ width: `${16 * scale}px`, height: `${16 * scale}px` }} className="text-bronze" />
          <span className="font-medium" style={{ fontSize: `${14 * scale}px` }}>
            4 Players
          </span>
        </div>
        <DeviceSelector currentDevice={currentDevice} onDeviceChange={onDeviceChange} />
      </div>
    </header>
  )
}
