import React, { useState } from 'react';
import { 
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Mail,
  Phone,
  Briefcase,
  Layers,
  Sparkles
} from 'lucide-react';
import { Product, User } from '../types';
import ProductCard from '../components/ProductCard';

interface HomeViewProps {
  products: Product[];
  onNavigate: (view: string, productId?: string, category?: string) => void;
  currentUser?: User | null;
}

export default function HomeView({ products, onNavigate, currentUser }: HomeViewProps) {
  
  // Slide indicator state for Hero section
  const [heroSlide, setHeroSlide] = useState(0);

  // Hero carousel sliders
  const slides = [
    {
      title: 'A PLACE OF att.',
      sub: '놀라움이 가득한 장소, 일상 속 특별한 패션과 취향을 붙이는 룩을 지향합니다.',
      visual: (
        <div className="absolute inset-0 flex items-center justify-center bg-stone-50 overflow-hidden">
          {/* Stylized Modern Silhouette Fashion Model Art Frame (Wonderplace Look) */}
          <div className="relative w-full h-full flex items-center justify-around px-12 md:px-24">
            {/* Outline decorative typography */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03]">
              <span className="font-sans font-black text-[22vw] leading-none tracking-widest text-black">ATT.</span>
            </div>
            {/* Left Model Dummy Frame */}
            <div className="hidden sm:flex flex-col items-center relative transform -rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="w-56 h-80 bg-stone-200 border border-stone-300 relative flex flex-col justify-center items-center p-6 rounded shadow-sm text-center">
                <div className="absolute inset-2 border border-stone-300/30"></div>
                <span className="bg-black text-white text-[9px] font-mono font-bold px-2.5 py-1 tracking-wider uppercase mb-3">att. SELECTION</span>
                <p className="text-[13px] font-bold text-stone-950 leading-tight">MTR Wool Trench Coat</p>
                <p className="text-[11px] font-mono text-stone-500 font-bold mt-1">₩ 189,000</p>
              </div>
            </div>
            {/* Right Model Dummy Frame */}
            <div className="flex flex-col items-center relative transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="w-60 h-84 bg-stone-150 border border-stone-250 relative flex flex-col justify-center items-center p-6 rounded shadow-sm text-center">
                <div className="absolute inset-2 border border-stone-300/30"></div>
                <span className="bg-stone-900 text-white text-[9px] font-mono font-bold px-2.5 py-1 tracking-wider uppercase mb-3">att. LIFESTYLE</span>
                <p className="text-[13px] font-bold text-stone-950 leading-tight">Y2K Leather Hobo Bag</p>
                <p className="text-[11px] font-mono text-stone-500 font-bold mt-1">₩ 74,000</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'SEASON ESSENTIAL',
      sub: '트렌디한 감성과 고밀도 가치를 선사하는 독창적인 데일리 패션 라인업',
      visual: (
        <div className="absolute inset-0 bg-stone-100 flex items-center justify-center overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-center px-10">
            <div className="text-center max-w-xl">
              <span className="text-[11px] font-mono text-stone-500 font-bold tracking-[0.3em] block mb-4 uppercase">NEW RELEASE</span>
              <h3 className="text-2xl md:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight uppercase">
                FALL WINTER CAPSULE<br />EDITORIAL LOOK
              </h3>
              <p className="text-xs font-semibold text-stone-500 mt-4 leading-relaxed max-w-md mx-auto">
                가장 정교한 디테일과 편안함을 선사하는 FW 캐주얼 레이어드를 지금 확인해 보세요.
              </p>
              <button 
                onClick={() => onNavigate('shop')}
                className="mt-6 border border-stone-800 text-stone-900 hover:bg-stone-900 hover:text-white px-6 py-2.5 text-xs font-bold tracking-widest transition-all uppercase"
              >
                GO STORES —
              </button>
            </div>
          </div>
        </div>
      )
    }
  ];

  const handleNextHero = () => {
    setHeroSlide((prev) => (prev + 1) % slides.length);
  };
  const handlePrevHero = () => {
    setHeroSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Split products for display (Acrylic / Eco keyring list requested in prompt)
  const keyrings = products.filter(p => p.category === 'keyring');
  const wappens = products.filter(p => p.category === 'wappen');

  return (
    <div id="home-view-container" className="flex flex-col gap-24 md:gap-36 pb-20 select-none bg-white">
      
      {/* 1. HERO BANNER: WONDERPLACE LAYOUT (Image 1) */}
      <section id="hero-slider-section" className="w-full relative h-[500px] md:h-[620px] bg-white overflow-hidden border-b border-stone-100">
        
        {/* Floating Vertical Slide Indicator */}
        <div className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col space-y-6 text-stone-400 font-mono text-[11px] font-bold">
          <button onClick={() => setHeroSlide(0)} className={`transition-all text-left flex items-center gap-2 ${heroSlide === 0 ? 'text-black font-extrabold translate-x-1' : 'hover:text-black'}`}>
            <span>— 01</span>
          </button>
          <button onClick={() => setHeroSlide(1)} className={`transition-all text-left flex items-center gap-2 ${heroSlide === 1 ? 'text-black font-extrabold translate-x-1' : 'hover:text-black'}`}>
            <span>— 02</span>
          </button>
        </div>

        {/* Floating Vertical Social links on bottom-left */}
        <div className="absolute left-6 md:left-10 bottom-8 z-20 hidden md:flex flex-col space-y-3 font-mono text-[10px] font-bold text-stone-500 uppercase tracking-widest">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors rotate-90 origin-left mt-8 block">facebook</a>
          <a href="https://www.instagram.com/att_attached/" target="_blank" rel="noreferrer" className="hover:text-black transition-colors rotate-90 origin-left mt-10 block">instagram</a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-black transition-colors rotate-90 origin-left mt-8 block font-semibold">youtube</a>
        </div>

        {/* Floating Large Title Text over Slider (Image 1) */}
        <div className="absolute left-6 md:left-32 top-16 md:top-20 z-10 text-left max-w-xl pointer-events-none">
          <h1 className="text-3xl md:text-5xl font-extrabold text-black tracking-tight leading-none uppercase">
            NO.1<br />
            <span className="text-stone-900 font-medium text-lg sm:text-xl md:text-2xl tracking-normal block mt-2.5">
              커스텀 패치 편집샵
            </span>
            <span className="tracking-[0.1em] font-black text-2xl md:text-3xl mt-1 block">
              ATT.
            </span>
          </h1>

          <div className="mt-8 border-l border-stone-400 pl-4 max-w-sm">
            <h4 className="text-[11px] font-mono font-bold tracking-widest text-stone-900 uppercase">
              ATTACH
            </h4>
            <p className="text-[11px] text-stone-500 leading-relaxed font-semibold mt-2">
              att.(어태치)는 놀라움이 가득한 장소 라는 슬로건으로 다양한 패션+라이프를 제안하며 차별화된 룩과 독창적 정체성을 지향하는 패션 편집 플랫폼입니다.
            </p>
          </div>
        </div>

        {/* Slide Visual Container */}
        {slides[heroSlide].visual}

        {/* Slider Controls overlay (Image 1) */}
        <div className="absolute right-6 md:right-16 top-1/2 -translate-y-1/2 z-20 flex flex-col space-y-4">
          <button 
            onClick={handlePrevHero}
            className="cursor-pointer w-10 h-10 md:w-12 md:h-12 border border-stone-300 bg-white hover:bg-black hover:text-white hover:border-black text-stone-800 flex items-center justify-center transition-all shadow-sm rounded-full"
          >
            <ChevronLeft className="w-5 h-5 stroke-[1.5]" />
          </button>
          <button 
            onClick={handleNextHero}
            className="cursor-pointer w-10 h-10 md:w-12 md:h-12 border border-stone-300 bg-white hover:bg-black hover:text-white hover:border-black text-stone-800 flex items-center justify-center transition-all shadow-sm rounded-full"
          >
            <ChevronRight className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Bottom Slide indicator dot line */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroSlide(i)}
              className={`w-2 h-2 rounded-full transition-all ${heroSlide === i ? 'w-6 bg-black' : 'bg-stone-300 hover:bg-stone-400'}`}
            />
          ))}
        </div>

      </section>

      {/* 2. ABOUT SECTION: MAKE FUN PLACE (Image 2 & 3) */}
      <section id="about-section" className="w-full max-w-7xl mx-auto px-6 md:px-12 text-left relative overflow-hidden">
        
        {/* Giant Watermark outline typography in background (Image 3) */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.02] text-center w-full z-0 whitespace-nowrap">
          <p className="font-sans font-black text-[12vw] tracking-[0.1em] text-black">ATTACH</p>
          <p className="font-sans font-black text-[12vw] tracking-[0.1em] text-black">A PLACE OF ATT</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Text Block */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] font-mono tracking-[0.3em] font-black text-stone-400 block uppercase">
              ABOUT
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-black leading-tight tracking-[0.02em] uppercase">
              MAKE FUN PLACE<br />
              <span className="font-sans font-medium text-stone-400">ATT. PLACE</span>
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-stone-600 leading-relaxed max-w-xl">
              국내외 'UP & COMING' 브랜드, 'FRESH & UNIQUE' 신진 디자이너 레이블, 'TRENDY & SEASONAL ESSENTIAL' 패션 제품 등... 다양하고 특별한 라인업을 통해 차별화된 패션을 지향합니다.
            </p>
            <div className="pt-2">
              <button 
                onClick={() => onNavigate('shop')}
                className="group border border-stone-850 text-stone-900 hover:bg-black hover:text-white font-bold text-xs tracking-widest px-6 py-3.5 transition-all flex items-center gap-2 uppercase"
              >
                <span>MORE —</span>
              </button>
            </div>
          </div>

          {/* Right Floating Overlapping Circles Block (Image 2 & 3) */}
          <div className="lg:col-span-6 flex justify-center items-center h-[280px] sm:h-[350px] relative">
            
            {/* Circle 1: TRENDY (with outline border diamond) */}
            <div className="absolute top-4 left-6 sm:left-12 w-32 h-32 rounded-full bg-stone-100 hover:bg-stone-200 border border-dashed border-stone-400 flex flex-col items-center justify-center p-3 text-center transition-all duration-300 hover:scale-105 shadow-sm z-20">
              <span className="text-[10px] font-mono font-bold text-stone-400">01</span>
              <span className="text-xs font-black tracking-wider text-stone-950 mt-1">TRENDY</span>
            </div>

            {/* Circle 2: FRESH (solid black) */}
            <div className="absolute top-16 right-6 sm:right-12 w-36 h-36 rounded-full bg-black flex flex-col items-center justify-center p-4 text-center transition-all duration-300 hover:scale-105 shadow-md z-30 text-white">
              <span className="text-[10px] font-mono text-stone-400 font-bold">02</span>
              <span className="text-sm font-black tracking-widest mt-1">FRESH</span>
              <span className="text-[9px] text-stone-500 font-mono mt-1">UNIQUE ATTS</span>
            </div>

            {/* Circle 3: ESSENTIAL (half-layered black) */}
            <div className="absolute bottom-4 left-16 sm:left-32 w-32 h-32 rounded-full bg-stone-900 text-stone-100 flex flex-col items-center justify-center p-3 text-center transition-all duration-300 hover:scale-105 shadow-md z-40">
              <span className="text-[10px] font-mono text-stone-400 font-bold">03</span>
              <span className="text-xs font-black tracking-widest mt-1">ESSENTIAL</span>
            </div>

            {/* Circle 4: UNIQUE (translucent gray) */}
            <div className="absolute bottom-8 right-12 sm:right-24 w-28 h-28 rounded-full bg-stone-50 border border-stone-200 text-stone-800 flex flex-col items-center justify-center p-3 text-center transition-all duration-300 hover:scale-105 shadow-sm z-10">
              <span className="text-[10px] font-mono text-stone-400">04</span>
              <span className="text-xs font-bold mt-1">UNIQUE</span>
            </div>

          </div>

        </div>

      </section>

      {/* 4. KEYRING & ACCESSORIES SHOWCASE (User Requested: "아크릴과 에코 키링 컬렉션 이미지를 바꿈") */}
      <section id="keyring-showcase" className="w-full max-w-7xl mx-auto px-6 md:px-12 text-left">
        
        <div className="border-b border-stone-200 pb-5 mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end">
          <div>
            <span className="text-[10px] font-mono tracking-[0.3em] font-black text-stone-400 block mb-2 uppercase">
              att. CUSTOM ACCESSORIES
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-950 tracking-tight uppercase">
              아크릴 & 에코 키링 컬렉션
            </h2>
            <p className="text-xs text-stone-500 font-semibold mt-1">
              * 가방, 파우치, 헤드폰 케이스 등에 힙한 위트를 더하는 수제 아크릴 & 자수 키참 리미티드 에디션
            </p>
          </div>

          <button 
            onClick={() => onNavigate('shop')}
            className="text-xs font-bold text-stone-800 hover:underline flex items-center gap-1 mt-3 sm:mt-0 uppercase tracking-widest"
          >
            <span>전체 상품 보기</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* High-Fidelity Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map(prod => (
            <ProductCard 
              key={prod.id}
              product={prod}
              onClick={() => onNavigate('detail', prod.id)}
            />
          ))}
        </div>

        {/* 1:1 Custom Request Banner */}
        <div className="mt-12 bg-stone-50 border border-stone-200 p-8 text-center flex flex-col md:flex-row items-center justify-between gap-6 rounded-lg">
          <div className="text-left space-y-1">
            <span className="bg-black text-white text-[8px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-widest">att. SERVICE</span>
            <h4 className="text-base font-extrabold text-stone-900 mt-1">1:1 맞춤형 나만의 아크릴 굿즈 제작 서비스</h4>
            <p className="text-[11px] font-medium text-stone-500">인스타그램 가이드 상담을 통해 동아리나 개인 특별 각인 맞춤형 디자인을 요청하세요.</p>
          </div>
          <button 
            onClick={() => onNavigate('custom')}
            className="bg-black hover:bg-stone-800 text-white font-bold text-xs tracking-widest px-6 py-3.5 transition-colors uppercase whitespace-nowrap"
          >
            커스텀 오더 신청하기 —
          </button>
        </div>

      </section>

      {/* 5. RECRUIT SECTION (Interactive Careers Module matching Image 1 menu) */}
      <section id="recruit-section" className="w-full max-w-7xl mx-auto px-6 md:px-12 text-left bg-stone-50 border border-stone-200 py-16 rounded-xl">
        <div className="max-w-3xl space-y-6">
          <span className="text-[10px] font-mono tracking-[0.3em] font-black text-stone-400 block uppercase">
            RECRUIT
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-stone-950 tracking-tight uppercase leading-none">
            GO FORWARD WITH ATT.
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-stone-600 leading-relaxed">
            att.(어태치)는 새로운 시각으로 트렌드를 제안하며 지속 가능한 패션 가치를 탐구하는 라이프스타일 셀렉샵입니다. 
            우리와 함께 창의적인 영감을 나눌 열정 가득한 인재들을 언제나 기다리고 있습니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 text-xs font-bold text-stone-800 max-w-2xl mx-auto w-full">
            <a 
              href="mailto:collaboration@att-wappen.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white border border-stone-200 p-5 hover:border-black hover:scale-[1.02] active:scale-[0.98] transition-all rounded-lg block group text-center md:text-left"
            >
              <Sparkles className="w-5 h-5 text-stone-500 mb-2 group-hover:text-black transition-colors mx-auto md:mx-0" />
              <p className="font-bold text-stone-900 group-hover:text-black transition-colors">MARKETING CREW</p>
              <p className="text-[10px] text-stone-400 mt-1 font-semibold">브랜드 협업 제안 문의하기 ↗</p>
            </a>
            <a 
              href="https://www.instagram.com/att_attached?igsh=MTNnczE4a25rdzlweg==" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white border border-stone-200 p-5 hover:border-black hover:scale-[1.02] active:scale-[0.98] transition-all rounded-lg block group text-center md:text-left"
            >
              <MapPin className="w-5 h-5 text-stone-500 mb-2 group-hover:text-black transition-colors mx-auto md:mx-0" />
              <p className="font-bold text-stone-900 group-hover:text-black transition-colors">RETAIL STORE</p>
              <p className="text-[10px] text-stone-400 mt-1 font-semibold">성수 오프라인 인스타그램 ↗</p>
            </a>
          </div>
        </div>
      </section>



    </div>
  );
}
