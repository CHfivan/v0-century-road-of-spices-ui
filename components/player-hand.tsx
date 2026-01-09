"use client"

import { useState } from "react"
import { ChevronUp, ChevronDown, Hand } from "lucide-react"
import { MerchantCard } from "./merchant-card"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface PlayerHandProps {
  isVisible: boolean
  onToggle: () => void
  scale?: number
}

const handCards = [
  { id: 101, name: "Basic Trade", cost: null, effect: "Gain 2 yellow spices", spices: { yellow: 2 } },
  { id: 102, name: "Upgrade", cost: null, effect: "Upgrade 2 spices", spices: null },
  { id: 103, name: "Desert Route", cost: { yellow: 1 }, effect: "Gain 1 red spice", spices: { red: 1 } },
  { id: 104, name: "Mountain Pass", cost: { red: 1 }, effect: "Gain 2 green", spices: { green: 2 } },
  { id: 105, name: "Royal Favor", cost: { green: 1 }, effect: "Gain 1 brown", spices: { brown: 1 } },
  { id: 106, name: "Caravan Rest", cost: null, effect: "Retrieve all cards", spices: null },
  { id: 107, name: "Spice Exchange", cost: { yellow: 2 }, effect: "Trade for any 2", spices: { red: 1, green: 1 } },
]

export function PlayerHand({ isVisible, onToggle, scale = 1 }: PlayerHandProps) {
  const [selectedCard, setSelectedCard] = useState<number | null>(null)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const handHeight = 160 * scale
  const cardWidth = 100 * scale
  const cardOverlap = cardWidth * 0.2
  const caravanWidth = 160 * scale + 32 * scale // caravan width + padding

  return (
    <div
      className={cn("relative transition-all duration-500 ease-out")}
      style={{ height: isVisible ? `${handHeight}px` : "0px" }}
    >
      <button
        onClick={onToggle}
        className="absolute z-20 flex items-center rounded-t-lg bg-card border-2 border-b-0 border-gold/40 hover:border-gold transition-colors left-1/2 -translate-x-1/2"
        style={{
          top: `${-36 * scale}px`,
          gap: `${8 * scale}px`,
          padding: `${8 * scale}px ${16 * scale}px`,
        }}
      >
        <Hand style={{ width: `${16 * scale}px`, height: `${16 * scale}px` }} className="text-gold" />
        <span className="font-medium text-foreground" style={{ fontSize: `${12 * scale}px` }}>
          Your Hand ({handCards.length})
        </span>
        {isVisible ? (
          <ChevronDown
            style={{ width: `${16 * scale}px`, height: `${16 * scale}px` }}
            className="text-muted-foreground"
          />
        ) : (
          <ChevronUp
            style={{ width: `${16 * scale}px`, height: `${16 * scale}px` }}
            className="text-muted-foreground"
          />
        )}
      </button>

      {/* Hand Container */}
      <div
        className={cn(
          "h-full bg-gradient-to-t from-card via-card to-card/80 border-t-2 border-gold/30 backdrop-blur-sm",
          "transition-all duration-500",
          !isVisible && "opacity-0",
        )}
      >
        {isVisible && (
          <div className="h-full flex flex-col">
            <div
              className="flex-1 flex items-center"
              style={{
                paddingLeft: `${caravanWidth + 16 * scale}px`,
                paddingRight: `${16 * scale}px`,
                paddingTop: `${12 * scale}px`,
              }}
            >
              <div className="relative flex items-end">
                {handCards.map((card, index) => {
                  const isHovered = hoveredCard === card.id
                  const hoveredIndex = handCards.findIndex((c) => c.id === hoveredCard)
                  const isAfterHovered = hoveredCard !== null && hoveredIndex < index

                  return (
                    <div
                      key={card.id}
                      className="transition-all duration-200 ease-out"
                      style={{
                        marginLeft: index === 0 ? 0 : `-${cardOverlap}px`,
                        zIndex: isHovered ? 50 : index,
                        transform: isHovered
                          ? `translateX(-${20 * scale}px) translateY(-${15 * scale}px) scale(1.1)`
                          : isAfterHovered
                            ? `translateX(${cardWidth * 0.3}px)`
                            : "none",
                      }}
                      onMouseEnter={() => setHoveredCard(card.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <MerchantCard
                        card={card}
                        isInHand
                        isSelected={selectedCard === card.id}
                        onClick={() => setSelectedCard(selectedCard === card.id ? null : card.id)}
                        scale={scale}
                      />
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="flex justify-center pb-2" style={{ gap: `${12 * scale}px` }}>
              <Button
                variant="outline"
                className="border-gold/40 text-gold hover:bg-gold/10 hover:border-gold bg-transparent"
                disabled={selectedCard === null}
                style={{ fontSize: `${11 * scale}px`, padding: `${5 * scale}px ${10 * scale}px` }}
              >
                Play Card
              </Button>
              <Button
                variant="outline"
                className="border-bronze/40 text-bronze hover:bg-bronze/10 hover:border-bronze bg-transparent"
                style={{ fontSize: `${11 * scale}px`, padding: `${5 * scale}px ${10 * scale}px` }}
              >
                Rest (Retrieve All)
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
