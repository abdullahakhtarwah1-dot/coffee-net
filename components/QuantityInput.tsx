"use client";

export function QuantityInput({ value, max, onChange, label, min = 1 }: { value: number; max: number; onChange: (n: number) => void; label: string; min?: number }) {
  return (
    <div className="qty" role="group" aria-label={label}>
      <button type="button" onClick={() => onChange(value - 1)} disabled={value <= min} aria-label="Decrease quantity">−</button>
      <output aria-live="polite">{value}</output>
      <button type="button" onClick={() => onChange(value + 1)} disabled={value >= max} aria-label="Increase quantity">+</button>
    </div>
  );
}
