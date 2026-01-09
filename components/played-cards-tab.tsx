"use client"
import { ChevronUp, ChevronDown, History } from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"

interface PlayedCardsTabProps {
  isOpen: boolean
  onToggle: () => void
  scale?: number
}

// Sample played cards data
const playedCards = [
  { id: 1, name: "Basic Trade", turn: 1 },
  { id: 2, name: "Upgrade", turn: 2 },
  { id: 3, name: "Desert Route", turn: 3 },
  { id: 4, name: "Mountain Pass", turn: 4 },
]

export function PlayedCardsTab({ isOpen, onToggle, scale = 1 }: PlayedCardsTabProps) {
  const panelHeight = 120 * scale
  const panelWidth = 180 * scale

  return (
    <div
      className="absolute z-30 transition-all duration-300"
      style={{
        left: `${16 * scale}px`,
        bottom: `${160 * scale}px`,
      }}
    >
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="flex items-center rounded-t-lg bg-card border-2 border-b-0 border-gold/40 hover:border-gold transition-colors"
        style={{
          gap: `${6 * scale}px`,
          padding: `${6 * scale}px ${12 * scale}px`,
        }}
      >
        <History style={{ width: `${14 * scale}px`, height: `${14 * scale}px` }} className="text-gold" />
        <span className="font-medium text-foreground" style={{ fontSize: `${10 * scale}px` }}>
          Played ({playedCards.length})
        </span>
        {isOpen ? (
          <ChevronDown
            style={{ width: `${12 * scale}px`, height: `${12 * scale}px` }}
            className="text-muted-foreground"
          />
        ) : (
          <ChevronUp
            style={{ width: `${12 * scale}px`, height: `${12 * scale}px` }}
            className="text-muted-foreground"
          />
        )}
      </button>

      {/* Panel */}
      <div
        className={cn(
          "bg-card/95 backdrop-blur-sm border-2 border-gold/30 rounded-r-lg rounded-bl-lg overflow-hidden transition-all duration-300",
          !isOpen && "opacity-0 pointer-events-none",
        )}
        style={{
          width: `${panelWidth}px`,
          height: isOpen ? `${panelHeight}px` : 0,
        }}
      >
        <ScrollArea className="h-full">
          <div style={{ padding: `${8 * scale}px`, display: "flex", flexDirection: "column", gap: `${6 * scale}px` }}>
            {playedCards.map((card) => (
              <div
                key={card.id}
                className="flex items-center justify-between rounded bg-secondary/50 border border-border/50"
                style={{ padding: `${6 * scale}px ${8 * scale}px` }}
              >
                <span className="text-foreground" style={{ fontSize: `${9 * scale}px` }}>
                  {card.name}
                </span>
                <span className="text-muted-foreground" style={{ fontSize: `${8 * scale}px` }}>
                  T{card.turn}
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
