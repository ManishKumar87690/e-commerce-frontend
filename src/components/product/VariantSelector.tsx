"use client";
import type { ProductVariant } from "@/types/product";
import { cn } from "@/lib/cn";

interface VariantSelectorProps {
  attributes: Record<string, string[]>;
  variants: ProductVariant[];
  selectedAttributes: Record<string, string>;
  onAttributeChange: (key: string, value: string) => void;
}

const COLOR_MAP: Record<string, string> = {
  black: "bg-gray-900 border-gray-900", white: "bg-white border-gray-300",
  red: "bg-red-500 border-red-500", blue: "bg-blue-500 border-blue-500",
  pink: "bg-pink-400 border-pink-400", silver: "bg-gray-300 border-gray-300",
};

export function VariantSelector({ attributes, variants, selectedAttributes, onAttributeChange }: VariantSelectorProps) {
  const isAttributeAvailable = (key: string, value: string) => {
    const testAttrs = { ...selectedAttributes, [key]: value };
    return variants.some((v) => {
      const otherKeys = Object.keys(testAttrs).filter((k) => k !== key);
      const otherMatch = otherKeys.every((k) => !testAttrs[k] || v.attributes[k] === testAttrs[k]);
      return v.attributes[key] === value && otherMatch && v.stock > 0;
    });
  };
  return (
    <div className="flex flex-col gap-4">
      {Object.entries(attributes).map(([key, values]) => (
        <div key={key}>
          <p className="text-sm font-medium mb-2 capitalize">{key}: <span className="font-normal text-muted-foreground">{selectedAttributes[key] ?? "Select"}</span></p>
          {key === "color" ? (
            <div className="flex flex-wrap gap-2">
              {values.map((value) => {
                const isSelected = selectedAttributes[key] === value;
                const isAvailable = isAttributeAvailable(key, value);
                return (
                  <button key={value} onClick={() => isAvailable && onAttributeChange(key, value)} disabled={!isAvailable} title={value} aria-label={`Select color: ${value}`}
                    className={cn("w-8 h-8 rounded-full border-2 transition-all", COLOR_MAP[value] ?? "bg-gray-400", isSelected ? "ring-2 ring-primary ring-offset-2" : "", !isAvailable ? "opacity-30 cursor-not-allowed" : "cursor-pointer hover:scale-110")} />
                );
              })}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {values.map((value) => {
                const isSelected = selectedAttributes[key] === value;
                const isAvailable = isAttributeAvailable(key, value);
                return (
                  <button key={value} onClick={() => isAvailable && onAttributeChange(key, value)} disabled={!isAvailable}
                    className={cn("h-9 min-w-[2.5rem] px-3 rounded-md border text-sm font-medium transition-colors", isSelected ? "bg-primary text-primary-foreground border-primary" : "bg-background hover:bg-muted border-input", !isAvailable ? "opacity-40 cursor-not-allowed line-through" : "cursor-pointer")}>{value}</button>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
