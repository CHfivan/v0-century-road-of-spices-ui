"use client"

import { useState } from "react"
import { MarketplaceRow } from "./marketplace-row"
import { PlayerHand } from "./player-hand"
import { OpponentsSidebar } from "./opponents-sidebar"
import { SpiceCaravan } from "./spice-caravan"
import { PointCards } from "./point-cards"
import { GameHeader } from "./game-header"
import { PlayedCardsTab } from "./played-cards-tab"
import { cn } from "@/lib/utils"
import { devicePresets } from "./device-selector"

export default function GameBoard() {
  const [isHandVisible, setIsHandVisible] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isPlayedCardsOpen, setIsPlayedCardsOpen] = useState(false)
  const [currentDevice, setCurrentDevice] = useState<string>("Desktop 16:9")

  const deviceSize = devicePresets[currentDevice as keyof typeof devicePresets]
  const isDesktop = currentDevice === "Desktop 16:9"
  const scale = deviceSize.scale
  const cardScale = deviceSize.cardScale

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <div
        className="relative flex flex-col overflow-hidden border-2 border-gold/30 rounded-lg"
        style={{
          width: isDesktop ? "100%" : `${deviceSize.width}px`,
          height: isDesktop ? "100vh" : `${deviceSize.height}px`,
          maxWidth: "100%",
          maxHeight: "100vh",
          ["--ui-scale" as string]: scale,
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url('/spice-table-topview.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-background/70 pointer-events-none" />

        {/* Game Header with device selector */}
        <GameHeader currentDevice={currentDevice} onDeviceChange={setCurrentDevice} scale={scale} />

        {/* Main Game Area */}
        <div className="flex-1 flex relative overflow-hidden">
          <div
            className={cn("flex-1 flex flex-col transition-all duration-300")}
            style={{
              padding: `${12 * scale}px`,
              gap: `${12 * scale}px`,
              marginRight: isSidebarOpen ? `${200 * scale}px` : 0,
            }}
          >
            {/* Point Cards Row - use cardScale for cards */}
            <div className="flex-shrink-0">
              <PointCards scale={cardScale} />
            </div>

            {/* Merchant Cards Marketplace - use cardScale for cards */}
            <div className="flex-1 flex flex-col justify-center" style={{ gap: `${12 * scale}px` }}>
              <MarketplaceRow title="Merchant Cards" type="merchant" scale={cardScale} />
            </div>
          </div>

          {/* Opponents Sidebar */}
          <OpponentsSidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} scale={scale} />
        </div>

        {/* Player Hand */}
        <PlayerHand isVisible={isHandVisible} onToggle={() => setIsHandVisible(!isHandVisible)} scale={scale} />

        <PlayedCardsTab
          isOpen={isPlayedCardsOpen}
          onToggle={() => setIsPlayedCardsOpen(!isPlayedCardsOpen)}
          scale={scale}
        />

        <SpiceCaravan scale={scale} />
      </div>
    </div>
  )
}
