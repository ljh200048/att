import React, { useState } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, RefreshCw, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

interface ShopViewProps {
  products: Product[];
  onNavigate: (view: string, productId?: string, category?: string) => void;
  category: string;
  onSetCategory: (cat: string) => void;
}

type SortType = 'popular' | 'priceAsc' | 'priceDesc' | 'rating';

export default function ShopView({ products, onNavigate, category, onSetCategory }: ShopViewProps) {
  const searchQuery = ''; // we can keep it local for ease of typing inside this screen
  const [localSearch, setLocalSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortType>('popular');

  // Categories list
  const categories = [
    { value: 'all', label: '전체 (ALL)' },
    { value: 'keyring', label: '🔑 수제 감성 키링 (KEYRING)' },
    { value: 'wappen', label: '🧵 Y2K 자수 와펜 (WAPPEN)' }
  ];

  // Filtering products
  const filteredProducts = products.filter(product => {
    const categoryMatch = category === 'all' || product.category === category;
    const searchMatch = product.name.toLowerCase().includes(localSearch.toLowerCase()) || 
                        product.description.toLowerCase().includes(localSearch.toLowerCase());
    return categoryMatch && searchMatch;
  });

  // Sorting products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'priceAsc':
        return a.price - b.price;
      case 'priceDesc':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'popular':
      default:
        const scoreA = (a.isPopular ? 1000 : 0) + a.reviewCount;
        const scoreB = (b.isPopular ? 1000 : 0) + b.reviewCount;
        return scoreB - scoreA;
    }
  });

  const resetFilters = () => {
    onSetCategory('all');
    setLocalSearch('');
    setSortBy('popular');
  };

  return (
    <div id="shop-view-container" className="flex flex-col gap-8 pb-16 bg-[#FFFDF0]">
      
      {/* 1. Header Hero Banner */}
      <section className="flex flex-col gap-3.5 border-b-4 border-black pb-6 text-left">
        <span className="text-[10px] w-fit font-black bg-brand-pink text-white px-3 py-1.5 tracking-widest uppercase border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
          att GOODS SHOP CATALOG
        </span>
        <h1 className="text-3xl md:text-4xl font-black text-black tracking-widest uppercase font-sans">
          어태치 오리지널 굿즈 스토어
        </h1>
        <p className="text-xs md:text-sm text-stone-700 leading-relaxed font-bold tracking-tight">
          키링과 와펜으로 나만의 감정을 일상 가방, 옷, 모자에 커스텀해보세요. 100% 한땀자수 기공 패치 공정 및 고밀도 아크ril 기법을 통해 힙하게 피팅됩니다.
        </p>
      </section>

      {/* 2. Compact Controls & Search Filters (Neo-Brutalist Block) */}
      <section id="filters-and-controls" className="flex flex-col gap-4 bg-white p-5 border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] text-left">
        
        {/* Search & Sort Input Row */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search Box */}
          <div className="relative w-full md:max-w-sm block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
            <input 
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="핫핑크 하트, 자수 스타, 곰돌이..."
              className="w-full text-xs text-black pl-9 pr-4 py-3 bg-[#FFFDF0] border-2 border-black rounded-none focus:outline-none focus:bg-white font-extrabold"
            />
          </div>

          {/* Sort selection dropdown */}
          <div className="flex items-center gap-2.5 w-full md:w-auto justify-end select-none">
            <span className="text-xs text-stone-500 font-extrabold flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-black" />
              <span>정렬순:</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortType)}
              className="text-xs bg-[#FFFDF0] border-2 border-black text-black px-3.5 py-2.5 rounded-none cursor-pointer focus:outline-none font-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
            >
              <option value="popular">★ 인기 상품순</option>
              <option value="priceAsc">₩ 가격 낮은순</option>
              <option value="priceDesc">₩ 가격 높은순</option>
              <option value="rating">❤ 평점 최고순</option>
            </select>
          </div>

        </div>

        {/* Categories tags row */}
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t-2 border-black/10">
          <span className="text-xs text-stone-500 font-black mr-2 flex items-center gap-1.5 uppercase tracking-wider">
            <SlidersHorizontal className="w-3.5 h-3.5 text-black" />
            <span>선택 카테고리:</span>
          </span>
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => onSetCategory(cat.value)}
              className={`cursor-pointer text-[11px] font-black px-4 py-2 rounded-none border-2 transition-all ${
                category === cat.value
                  ? 'bg-black text-brand-lime border-black shadow-[3px_3px_0px_rgba(0,0,0,1)]'
                  : 'bg-white text-black border-stone-200 hover:border-black'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

      </section>

      {/* 3. Products Status count */}
      <section className="flex items-center justify-between text-xs text-stone-550 font-extrabold px-1 border-b-2 border-black/10 pb-2 text-left">
        <p>전체 어태치 제품 중 <strong className="text-black font-black text-sm">{sortedProducts.length}</strong>개 상품 진열 중</p>
        {(category !== 'all' || localSearch !== '' || sortBy !== 'popular') && (
          <button 
            onClick={resetFilters}
            className="flex items-center gap-1 text-brand-pink hover:text-black hover:underline cursor-pointer font-black text-[11px]"
          >
            <RefreshCw className="w-3.5 h-3.5 text-brand-pink animate-spin-slow" />
            <span>검색 필터 초기화</span>
          </button>
        )}
      </section>

      {/* 4. Products display or Empty state */}
      {sortedProducts.length > 0 ? (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {sortedProducts.map((product) => (
            <ProductCard 
              key={product.id}
              product={product}
              onClick={() => onNavigate('detail', product.id)}
            />
          ))}
        </section>
      ) : (
        <section className="text-center py-20 bg-white border-4 border-black p-8 flex flex-col items-center justify-center shadow-[6px_6px_0px_rgba(0,0,0,1)]">
          <div className="w-16 h-16 bg-brand-pink border-2 border-black flex items-center justify-center mb-4 transform -rotate-6">
            <ShoppingBag className="w-7 h-7 text-white" />
          </div>
          <h3 className="text-base font-black text-black">일치하는 관련 굿즈 모델이 존재하지 않습니다.</h3>
          <p className="text-xs text-stone-500 mt-1 max-w-xs leading-relaxed font-semibold">
            혹시 철자가 맞는지 검토하거나, 카테고리를 전체(ALL)로 변경하여 주시면 고맙겠습니다.
          </p>
          <button 
            onClick={resetFilters} 
            className="cursor-pointer mt-5 bg-brand-lime hover:bg-black text-black hover:text-white text-xs font-black px-6 py-2.5 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] uppercase"
          >
            전체 상품 카탈로그로 복귀
          </button>
        </section>
      )}

    </div>
  );
}
