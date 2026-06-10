import { Star, Eye, ShoppingCart, Heart, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: any;
  product: Product;
  onClick: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const isKeyring = product.category === 'keyring';
  
  // Calculate a slight default rotation based on the product ID to make the list feel alive like real overlapping stickers!
  const getRotationClass = (id: string) => {
    const sum = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return sum % 2 === 0 ? '-rotate-1 hover:rotate-1' : 'rotate-1 hover:-rotate-1';
  };

  return (
    <div 
      id={`product-card-${product.id}`}
      onClick={onClick}
      className={`group bg-white rounded-none border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-300 flex flex-col overflow-hidden cursor-pointer h-full relative ${getRotationClass(product.id)}`}
    >
      {/* Heavy Brutalist Discount Balloon */}
      {product.discountRate && product.discountRate > 0 && (
        <span className="absolute top-3 left-3 z-10 bg-brand-pink text-white text-[10px] font-black px-2.5 py-1.5 uppercase border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
          {product.discountRate}% OFF
        </span>
      )}

      {/* Product Category Sticker Tag */}
      <span className={`absolute top-3 right-3 z-10 text-[9px] font-black px-2.5 py-1.5 border-2 border-black uppercase shadow-[2px_2px_0px_rgba(0,0,0,1)] ${
        isKeyring ? 'bg-brand-lime text-black' : 'bg-brand-blue text-black'
      }`}>
        {isKeyring ? '🔑 KEYRING' : '🧵 WAPPEN'}
      </span>

      {/* Product Image Frame */}
      <div className="relative overflow-hidden bg-[#FFFDF0] border-b-4 border-black flex-none pb-[100%]">
        {product.images && product.images.length > 0 ? (
          <img 
            src={product.images[0]} 
            alt={product.name} 
            referrerPolicy="no-referrer"
            className="absolute inset-0 object-contain p-4 w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[10px] font-mono text-stone-400 font-bold bg-[#FFFDF0]">
            NO IMAGE
          </div>
        )}

        {/* View Detail overlay screen */}
        <div className="absolute inset-0 bg-brand-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
          <div className="bg-brand-lime text-black text-[11px] font-black px-5 py-3 border-2 border-black flex items-center gap-2 shadow-[3px_3px_0px_rgba(0,0,0,1)] transform translate-y-2 group-hover:translate-y-0 transition-all font-mono">
            <Eye className="w-4 h-4" />
            <span>SELECT ATTACHER DETAILS</span>
          </div>
        </div>
      </div>

      {/* Details Box */}
      <div className="p-5 flex flex-col flex-1 bg-white">
        
        {/* Rating and review small bubble */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] font-mono font-black text-brand-pink tracking-widest uppercase">
            {isKeyring ? 'att acrylic arts' : 'att high quality embroidery'}
          </span>
          <div className="flex items-center gap-1 text-[10px] font-black text-black">
            <Star className="w-3.5 h-3.5 fill-[#FEE500] text-black stroke-2" />
            <span>{product.rating.toFixed(1)}</span>
          </div>
        </div>

        <h3 className="text-sm font-black text-black tracking-tight group-hover:text-brand-pink transition-colors line-clamp-1 mb-2 uppercase font-sans">
          {product.name}
        </h3>

        <p className="text-[11px] text-stone-600 line-clamp-2 leading-relaxed flex-1 font-bold">
          {product.description}
        </p>

        {/* Prices Row */}
        <div className="flex items-center justify-between pt-3.5 border-t-2 border-black/10 mt-4">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-extrabold text-black">
                ₩{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-[10px] text-stone-400 line-through font-bold">
                  ₩{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          <div className="text-[10px] font-mono font-extrabold text-[#FFFDF0] bg-black px-2 py-0.5 uppercase tracking-tighter">
            GET_MOOD
          </div>
        </div>

      </div>

    </div>
  );
}
