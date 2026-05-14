"use client";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { APP_CONFIG } from "@/constants/config";
interface QuantitySelectorProps { value: number; onChange: (value: number) => void; min?: number; max?: number; disabled?: boolean; }
export function QuantitySelector({ value, onChange, min = 1, max = APP_CONFIG.maxCartQuantity, disabled = false }: QuantitySelectorProps) {
  return (
    <div className="flex items-center border rounded-md overflow-hidden w-fit">
      <Button type="button" variant="ghost" size="icon" className="h-9 w-9 rounded-none" onClick={() => onChange(Math.max(min, value - 1))} disabled={disabled || value <= min}><Minus className="h-3.5 w-3.5" /></Button>
      <Input type="number" value={value} onChange={(e) => { const p = parseInt(e.target.value, 10); if (!isNaN(p)) onChange(Math.min(max, Math.max(min, p))); }} min={min} max={max} disabled={disabled} className="w-12 h-9 text-center border-0 border-x rounded-none focus-visible:ring-0 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" />
      <Button type="button" variant="ghost" size="icon" className="h-9 w-9 rounded-none" onClick={() => onChange(Math.min(max, value + 1))} disabled={disabled || value >= max}><Plus className="h-3.5 w-3.5" /></Button>
    </div>
  );
}
