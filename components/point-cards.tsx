import { SpiceIcon } from "./spice-icon"
import { Crown } from "lucide-react"

interface PointCardsProps {
  scale?: number
}

const pointCards = [
  { id: 1, points: 8, cost: { brown: 2, green: 1 }, hasCoin: true },
  { id: 2, points: 12, cost: { brown: 3, red: 1 }, hasCoin: false },
  { id: 3, points: 15, cost: { brown: 2, green: 2 }, hasCoin: true },
  { id: 4, points: 18, cost: { brown: 4 }, hasCoin: false },
  { id: 5, points: 20, cost: { brown: 3, green: 2 }, hasCoin: false },
]

export function PointCards({ scale = 1 }: PointCardsProps) {
  return (
    <div className="relative">
      {/* Section Title */}
      <div className="flex items-center" style={{ gap: `${12 * scale}px`, marginBottom: `${10 * scale}px` }}>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <h2
          className="font-semibold text-gold uppercase"
          style={{ fontSize: `${10 * scale}px`, letterSpacing: "0.25em" }}
        >
          Victory Point Cards
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      </div>

      {/* Cards Row - reduced gap and size for better fit */}
      <div className="flex justify-center" style={{ gap: `${8 * scale}px` }}>
        {pointCards.map((card) => (
          <div
            key={card.id}
            className="relative rounded-lg bg-gradient-to-b from-gold-dark/30 to-card border-2 border-gold/40 cursor-pointer transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:border-gold hover:shadow-[0_0_15px_rgba(212,175,55,0.4)]"
            style={{ width: `${75 * scale}px`, height: `${100 * scale}px` }}
          >
            {/* Ornate corner decorations */}
            <div
              className="absolute border-t-2 border-l-2 border-gold/60 rounded-tl"
              style={{
                top: `${3 * scale}px`,
                left: `${3 * scale}px`,
                width: `${10 * scale}px`,
                height: `${10 * scale}px`,
              }}
            />
            <div
              className="absolute border-t-2 border-r-2 border-gold/60 rounded-tr"
              style={{
                top: `${3 * scale}px`,
                right: `${3 * scale}px`,
                width: `${10 * scale}px`,
                height: `${10 * scale}px`,
              }}
            />
            <div
              className="absolute border-b-2 border-l-2 border-gold/60 rounded-bl"
              style={{
                bottom: `${3 * scale}px`,
                left: `${3 * scale}px`,
                width: `${10 * scale}px`,
                height: `${10 * scale}px`,
              }}
            />
            <div
              className="absolute border-b-2 border-r-2 border-gold/60 rounded-br"
              style={{
                bottom: `${3 * scale}px`,
                right: `${3 * scale}px`,
                width: `${10 * scale}px`,
                height: `${10 * scale}px`,
              }}
            />

            {/* Bonus coin indicator */}
            {card.hasCoin && (
              <div
                className="absolute rounded-full bg-gold flex items-center justify-center shadow-lg"
                style={{
                  top: `${-6 * scale}px`,
                  right: `${-6 * scale}px`,
                  width: `${16 * scale}px`,
                  height: `${16 * scale}px`,
                }}
              >
                <Crown style={{ width: `${8 * scale}px`, height: `${8 * scale}px` }} className="text-background" />
              </div>
            )}

            {/* Points */}
            <div className="text-center" style={{ paddingTop: `${8 * scale}px` }}>
              <span className="font-bold text-gold" style={{ fontSize: `${20 * scale}px` }}>
                {card.points}
              </span>
              <p className="text-muted-foreground uppercase" style={{ fontSize: `${6 * scale}px` }}>
                points
              </p>
            </div>

            {/* Cost */}
            <div
              className="absolute left-0 right-0 flex justify-center flex-wrap"
              style={{ bottom: `${6 * scale}px`, gap: `${2 * scale}px`, padding: `0 ${6 * scale}px` }}
            >
              {card.cost.yellow &&
                Array.from({ length: card.cost.yellow }).map((_, i) => (
                  <SpiceIcon key={`y-${i}`} type="yellow" size="sm" scale={scale} />
                ))}
              {card.cost.red &&
                Array.from({ length: card.cost.red }).map((_, i) => (
                  <SpiceIcon key={`r-${i}`} type="red" size="sm" scale={scale} />
                ))}
              {card.cost.green &&
                Array.from({ length: card.cost.green }).map((_, i) => (
                  <SpiceIcon key={`g-${i}`} type="green" size="sm" scale={scale} />
                ))}
              {card.cost.brown &&
                Array.from({ length: card.cost.brown }).map((_, i) => (
                  <SpiceIcon key={`b-${i}`} type="brown" size="sm" scale={scale} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
