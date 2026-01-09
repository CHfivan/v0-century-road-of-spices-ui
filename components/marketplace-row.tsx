import { MerchantCard } from "./merchant-card"

interface MarketplaceRowProps {
  title: string
  type: "merchant" | "point"
  scale?: number
}

const merchantCards = [
  { id: 1, name: "Spice Trader", cost: null, effect: "Gain 2 yellow spices", spices: { yellow: 2 } },
  { id: 2, name: "Caravan Master", cost: { yellow: 1 }, effect: "Upgrade 2 spices", spices: null },
  { id: 3, name: "Desert Guide", cost: { yellow: 2 }, effect: "Gain 1 red, 1 green", spices: { red: 1, green: 1 } },
  { id: 4, name: "Merchant Prince", cost: { red: 1 }, effect: "Trade for 3 yellow", spices: { yellow: 3 } },
  { id: 5, name: "Silk Road Veteran", cost: { green: 1 }, effect: "Gain 2 brown", spices: { brown: 2 } },
  { id: 6, name: "Eastern Emissary", cost: { brown: 1 }, effect: "Upgrade 3 spices", spices: null },
]

export function MarketplaceRow({ title, scale = 1 }: MarketplaceRowProps) {
  return (
    <div className="relative">
      {/* Section Title */}
      <div className="flex items-center" style={{ gap: `${12 * scale}px`, marginBottom: `${10 * scale}px` }}>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <h2
          className="font-semibold text-gold uppercase"
          style={{ fontSize: `${11 * scale}px`, letterSpacing: "0.25em" }}
        >
          {title}
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      </div>

      {/* Cards Row - reduced gap for smaller screens */}
      <div className="flex justify-center flex-wrap" style={{ gap: `${10 * scale}px` }}>
        {merchantCards.map((card, index) => (
          <div key={card.id} className="relative">
            {/* Cost indicator for cards beyond the first */}
            {index > 0 && (
              <div
                className="absolute left-1/2 -translate-x-1/2 flex"
                style={{ top: `${-10 * scale}px`, gap: `${2 * scale}px` }}
              >
                {Array.from({ length: index }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-sm bg-spice-yellow border border-gold-dark"
                    style={{ width: `${8 * scale}px`, height: `${8 * scale}px` }}
                  />
                ))}
              </div>
            )}
            <MerchantCard card={card} scale={scale} />
          </div>
        ))}
      </div>
    </div>
  )
}
