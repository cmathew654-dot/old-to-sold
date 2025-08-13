interface PriceChipProps {
  price: number
  className?: string
}

export function PriceChip({ price, className = "" }: PriceChipProps) {
  return <div className={`font-mono font-medium text-xl text-[#0B3D2E] ${className}`}>${price}</div>
}
