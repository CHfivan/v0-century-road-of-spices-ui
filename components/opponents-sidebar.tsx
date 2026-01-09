"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, User, Eye, Hand, PlayCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { OpponentCaravan } from "./opponent-caravan"
import { ScrollArea } from "@/components/ui/scroll-area"

interface OpponentsSidebarProps {
  isOpen: boolean
  onToggle: () => void
  scale?: number
}

const opponents = [
  {
    id: 1,
    name: "Marcus the Trader",
    color: "#3b82f6",
    points: 15,
    caravan: { yellow: 3, red: 2, green: 1, brown: 0 },
    coins: { gold: 1, silver: 0 },
    handCount: 5,
    playedCards: ["Spice Exchange", "Desert Route", "Merchant Guild"],
  },
  {
    id: 2,
    name: "Elena of the East",
    color: "#ef4444",
    points: 12,
    caravan: { yellow: 1, red: 3, green: 2, brown: 1 },
    coins: { gold: 0, silver: 2 },
    handCount: 3,
    playedCards: ["Caravan Master", "Silk Road"],
  },
  {
    id: 3,
    name: "Lord Ashworth",
    color: "#22c55e",
    points: 18,
    caravan: { yellow: 2, red: 1, green: 3, brown: 2 },
    coins: { gold: 2, silver: 1 },
    handCount: 7,
    playedCards: ["Royal Decree", "Trade Alliance", "Eastern Route", "Spice Monopoly"],
  },
]

export function OpponentsSidebar({ isOpen, onToggle, scale = 1 }: OpponentsSidebarProps) {
  const [hoveredPlayedCards, setHoveredPlayedCards] = useState<number | null>(null)

  const sidebarWidth = 200 * scale

  return (
    <>
      <button
        onClick={onToggle}
        className={cn(
          "absolute z-20 flex items-center rounded-l-lg",
          "bg-card border-2 border-r-0 border-gold/40 hover:border-gold transition-all",
        )}
        style={{
          right: isOpen ? `${sidebarWidth}px` : "0px",
          top: "25%",
          padding: `${16 * scale}px ${4 * scale}px`,
          gap: `${4 * scale}px`,
        }}
      >
        {isOpen ? (
          <ChevronRight style={{ width: `${16 * scale}px`, height: `${16 * scale}px` }} className="text-gold" />
        ) : (
          <ChevronLeft style={{ width: `${16 * scale}px`, height: `${16 * scale}px` }} className="text-gold" />
        )}
        <span
          className="font-medium text-foreground"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", fontSize: `${11 * scale}px` }}
        >
          Opponents
        </span>
      </button>

      {/* Sidebar Panel */}
      <div
        className={cn(
          "absolute top-0 right-0 h-full bg-card/95 backdrop-blur-sm border-l-2 border-gold/30",
          "transition-transform duration-300 ease-out z-10",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
        style={{ width: `${sidebarWidth}px` }}
      >
        {/* Header */}
        <div className="border-b border-border" style={{ padding: `${10 * scale}px` }}>
          <div className="flex items-center" style={{ gap: `${8 * scale}px` }}>
            <Eye style={{ width: `${14 * scale}px`, height: `${14 * scale}px` }} className="text-gold" />
            <h2 className="font-semibold text-gold" style={{ fontSize: `${12 * scale}px` }}>
              Other Players
            </h2>
          </div>
        </div>

        {/* Opponents List */}
        <ScrollArea className="h-[calc(100%-44px)]">
          <div style={{ padding: `${10 * scale}px`, display: "flex", flexDirection: "column", gap: `${10 * scale}px` }}>
            {opponents.map((opponent) => (
              <div
                key={opponent.id}
                className="relative rounded-lg border border-border bg-secondary/20 overflow-hidden"
              >
                {/* Player Header */}
                <div
                  className="flex items-center justify-between"
                  style={{
                    padding: `${6 * scale}px`,
                    borderLeft: `3px solid ${opponent.color}`,
                  }}
                >
                  <div className="flex items-center" style={{ gap: `${6 * scale}px` }}>
                    <div
                      className="rounded-full flex items-center justify-center"
                      style={{
                        width: `${18 * scale}px`,
                        height: `${18 * scale}px`,
                        backgroundColor: opponent.color,
                      }}
                    >
                      <User style={{ width: `${10 * scale}px`, height: `${10 * scale}px` }} className="text-white" />
                    </div>
                    <p className="font-medium text-foreground" style={{ fontSize: `${9 * scale}px` }}>
                      {opponent.name}
                    </p>
                  </div>

                  <div className="flex items-center" style={{ gap: `${8 * scale}px` }}>
                    {/* Hand count */}
                    <div className="flex items-center text-muted-foreground" style={{ gap: `${3 * scale}px` }}>
                      <Hand style={{ width: `${11 * scale}px`, height: `${11 * scale}px` }} />
                      <span className="font-medium" style={{ fontSize: `${9 * scale}px` }}>
                        {opponent.handCount}
                      </span>
                    </div>

                    {/* Played cards with hover tooltip */}
                    <div
                      className="relative flex items-center text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                      style={{ gap: `${3 * scale}px` }}
                      onMouseEnter={() => setHoveredPlayedCards(opponent.id)}
                      onMouseLeave={() => setHoveredPlayedCards(null)}
                    >
                      <PlayCircle style={{ width: `${11 * scale}px`, height: `${11 * scale}px` }} />
                      <span className="font-medium" style={{ fontSize: `${9 * scale}px` }}>
                        {opponent.playedCards.length}
                      </span>

                      {hoveredPlayedCards === opponent.id && (
                        <div
                          className="fixed z-[100] bg-card border border-gold/30 rounded-lg shadow-xl"
                          style={{
                            top: `${80 * scale}px`,
                            right: `${20 * scale}px`,
                            padding: `${8 * scale}px`,
                            width: `${150 * scale}px`,
                          }}
                        >
                          <p
                            className="text-gold uppercase tracking-wider font-medium"
                            style={{ fontSize: `${8 * scale}px`, marginBottom: `${6 * scale}px` }}
                          >
                            Played Cards
                          </p>
                          <div style={{ display: "flex", flexDirection: "column", gap: `${4 * scale}px` }}>
                            {opponent.playedCards.map((card, i) => (
                              <div
                                key={i}
                                className="rounded bg-secondary/50 text-foreground border border-border/50"
                                style={{ fontSize: `${8 * scale}px`, padding: `${3 * scale}px ${6 * scale}px` }}
                              >
                                {card}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Caravan with same format as player */}
                <div style={{ padding: `0 ${6 * scale}px ${6 * scale}px` }}>
                  <OpponentCaravan
                    caravan={opponent.caravan}
                    coins={opponent.coins}
                    points={opponent.points}
                    scale={scale}
                  />
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  )
}
