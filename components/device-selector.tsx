"use client"

import { Monitor, Smartphone } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

interface DeviceSelectorProps {
  currentDevice: string
  onDeviceChange: (device: string) => void
}

export const devicePresets = {
  "Samsung A71": { width: 960, height: 432, scale: 0.6, cardScale: 0.65 },
  "iPhone SE 2022": { width: 667, height: 375, scale: 0.55, cardScale: 0.55 },
  "Desktop 16:9": { width: 1280, height: 720, scale: 1, cardScale: 1.5 },
} as const

export function DeviceSelector({ currentDevice, onDeviceChange }: DeviceSelectorProps) {
  const device = devicePresets[currentDevice as keyof typeof devicePresets]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="border-gold/40 text-gold hover:bg-gold/10 bg-card gap-2">
          {currentDevice === "Desktop 16:9" ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
          <span className="text-xs">{currentDevice}</span>
          <span className="text-[10px] text-muted-foreground">
            ({device.width}x{device.height})
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-card border-gold/30">
        {Object.entries(devicePresets).map(([name, preset]) => (
          <DropdownMenuItem
            key={name}
            onClick={() => onDeviceChange(name)}
            className={`cursor-pointer ${currentDevice === name ? "bg-gold/20 text-gold" : ""}`}
          >
            {name === "Desktop 16:9" ? <Monitor className="w-4 h-4 mr-2" /> : <Smartphone className="w-4 h-4 mr-2" />}
            <span>{name}</span>
            <span className="text-[10px] text-muted-foreground ml-auto">
              {preset.width}x{preset.height}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
