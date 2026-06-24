import { Star, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: any;
  product: Product;
  onClick: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const isKeyring = product.category === 'keyring';

  return (
    <div 
      id={`product-card-${product.id}`}
      onClick={onClick}
      className="group bg-white border border-stone-200 hover:border-black transition-all duration-300 flex flex-col overflow-hidden cursor-pointer h-full relative"
    >
      {/* Elegantly minimal discount badge */}
      {product.discountRate && product.discountRate > 0 && (
        <span className="absolute top-3 left-3 z-10 bg-black text-white text-[9px] font-bold px-2 py-1 tracking-wider uppercase">
          {product.discountRate}% OFF
        </span>
      )}

      {/* Category Tag */}
      <span className="absolute top-3 right-3 z-10 text-[8px] font-bold tracking-widest px-2 py-1 bg-stone-100 text-stone-600 uppercase">
        {isKeyring ? 'KEYRING' : 'WAPPEN'}
      </span>

      {/* Product Image Frame */}
      <div className="relative overflow-hidden bg-stone-50 border-b border-stone-100 flex-none pb-[100%]">
        {product.images && product.images.length > 0 ? (
          <img 
            src={product.images[0]} 
            alt={product.name} 
            referrerPolicy="no-referrer"
            className="absolute inset-0 object-contain p-6 w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[10px] font-mono text-stone-400 font-bold bg-stone-50">
            NO IMAGE
          </div>
        )}

        {/* View Detail overlay screen */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <div className="bg-white/95 backdrop-blur-sm text-black text-[11px] font-bold px-4 py-2 border border-stone-250 flex items-center gap-1.5 shadow-sm transform translate-y-2 group-hover:translate-y-0 transition-all tracking-widest uppercase">
            <Eye className="w-3.5 h-3.5" />
            <span>VIEW DETAILS</span>
          </div>
        </div>
      </div>

      {/* Details Box */}
      <div className="p-4 flex flex-col flex-1 bg-white">
        
        {/* Rating and category label */}
        <div className="flex items-center justify-between mb-1">
          <span className="text-[9px] font-bold text-stone-400 tracking-wider uppercase">
            {isKeyring ? 'att. ACRYLIC ART' : 'att. EMBROIDERY'}
          </span>
          <div className="flex items-center gap-0.5 text-[9px] font-semibold text-stone-500">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{product.rating.toFixed(1)}</span>
          </div>
        </div>

        <h3 className="text-xs font-bold text-stone-900 tracking-tight group-hover:text-black transition-colors line-clamp-1 mb-1.5 uppercase font-sans">
          {product.name}
        </h3>

        <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed flex-1 font-medium">
          {product.description}
        </p>

        {/* Prices Row */}
        <div className="flex items-center justify-between pt-3 border-t border-stone-100 mt-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-bold text-black">
              ₩{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] text-stone-400 line-through font-medium">
                ₩{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <div className="text-[9px] font-bold text-stone-500 group-hover:text-black transition-colors uppercase tracking-widest">
            BUY NOW
          </div>
        </div>

      </div>

    </div>
  );
}
