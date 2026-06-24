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

  // Brand selector list state (Interactive Image 4 & 5)
  const [selectedBrandIndex, setSelectedBrandIndex] = useState(0);

  // Mock brands data based on Wonderplace screenshots (Image 4 & 5)
  const brandsData = [
    {
      id: 'gola',
      name: '골라 (GOLA)',
      engName: 'GOLA',
      subtitle: 'HERITAGE AND LIFE STYLE CASUAL WEAR',
      desc1: '영국 스포츠 헤리티지 브랜드 골라(GOLA)는 100년이 넘는 역사적인 가치와 고유의 헤리티지를 현대적인 스포츠 라이프스타일 룩으로 재해석합니다.',
      desc2: '클래식한 스니커즈 라인업부터 가볍고 힙하게 걸칠 수 있는 에센셜 캡, 맨투맨, 액세서리까지 일상 속 캐주얼함을 제안합니다.',
      visualBg: 'bg-stone-900',
      tagline: 'SINCE 1905, BRITISH SPORTING HERITAGE',
      stickerText: 'GOLA CLASSIC',
      imageDesc: 'Heritage Cap & Sweatshirts Outfit'
    },
    {
      id: 'comoninoz',
      name: '코모니노즈 (COMONINOZ)',
      engName: 'COMONINOZ',
      subtitle: 'DAILY UNIQUE CASUAL WORKWEAR',
      desc1: '코모니노즈는 일상의 익숙함 속에서 새로운 시각을 제안하는 캐주얼 워크웨어 레이블입니다. 내구성 높은 원단과 실용적인 디테일을 자랑합니다.',
      desc2: '트렌디한 실루엣과 오리지널 워크웨어의 독창적인 결합을 통해 매 시즌 가장 실용적이면서 쿨한 데일리 아이템들을 선보입니다.',
      visualBg: 'bg-neutral-800',
      tagline: 'FUNCTIONAL & DESIGN EXPERIENCES',
      stickerText: 'WORKWEAR',
      imageDesc: 'Heavy Cotton Canvas Utility Jackets'
    },
    {
      id: 'wstandard',
      name: '더블유 스탠다드 (W.STANDARD)',
      engName: 'W.STANDARD',
      subtitle: 'MODERN ESSENTIAL BASIC CAPSULE',
      desc1: '더블유 스탠다드는 가장 베이직하면서도 현대적인 에센셜 라인업을 제시하는 캡슐 컬렉션 브랜드입니다.',
      desc2: '군더더기 없는 완벽한 피팅감과 정제된 컬러 패브릭만을 엄선해 누구나 언제든 완성도 높은 레이어드 스타일링을 구축할 수 있게 돕습니다.',
      visualBg: 'bg-stone-800',
      tagline: 'PREMIUM COMFORT EVERYDAY WEAR',
      stickerText: 'STANDARD',
      imageDesc: 'Minimalist Relaxed Fit Knitwear'
    },
    {
      id: 'deliccent',
      name: '델리센트 (DELICCENT)',
      engName: 'DELICCENT',
      subtitle: 'CHIC AND DELICATE CONTEMPORARY',
      desc1: '델리센트는 섬세한 감각과 시크한 분위기를 자아내는 컨템포러리 디자이너 레이블입니다. 독창적인 절개선과 우아한 실루엣이 돋보입니다.',
      desc2: '남녀 모두를 만족시키는 젠더리스 드레이프 코트, 유니크한 액세서리 세그먼트까지 현대 서울의 가장 앞서가는 트렌드를 대변합니다.',
      visualBg: 'bg-zinc-900',
      tagline: 'HIGH-END STREET CODES',
      stickerText: 'DELICATE CHIC',
      imageDesc: 'Avant-Garde Drape Trench Coats'
    },
    {
      id: 'outdoor',
      name: '아웃도어 프로덕츠 (OUTDOOR PRODUCTS)',
      engName: 'OUTDOOR PRODUCTS',
      subtitle: 'PACKABLE LIFESTYLE UTILITY ACCS',
      desc1: '아웃도어 프로덕츠는 실용적이고 기동성 넘치는 아웃도어 라이프스타일을 도심 속 캐주얼 패션에 이식한 독보적인 글로벌 캐주얼 기어 브랜드입니다.',
      desc2: '패커블 백팩, 기능성 아노락, 방수 버킷햇 등 합리적이면서도 모험적인 패션 라이프를 사랑하는 이들을 위한 최적의 필수 기어를 소개합니다.',
      visualBg: 'bg-stone-750',
      tagline: 'ADVENTURE IN COMFORTABLE GEAR',
      stickerText: 'GEAR LAB',
      imageDesc: 'Waterproof Packable Travel Gears'
    },
    {
      id: 'oceanpacific',
      name: '오션 퍼시픽 (OCEAN PACIFIC)',
      engName: 'OCEAN PACIFIC',
      subtitle: 'CALIFORNIA BEACH RETRO SURFER',
      desc1: '오션 퍼시픽은 따사로운 캘리포니아 해변의 서핑 컬처에 뿌리를 둔 글로벌 빈티지 스포츠 캐주얼웨어 브랜드입니다.',
      desc2: '여유로운 파도 소리를 닮은 코듀로이 숏츠, 화려한 레트로 타이다이 티셔츠 컬렉션을 제안하며 찬란한 휴일의 설렘을 공유합니다.',
      visualBg: 'bg-stone-900',
      tagline: 'WEST COAST SURFING SPIRITS',
      stickerText: 'RETRO SURF',
      imageDesc: 'Pigment Dyed Beach Pullovers'
    },
    {
      id: 'ordinaryholiday',
      name: '오디너리 홀리데이 (ORDINARY HOLIDAY)',
      engName: 'ORDINARY HOLIDAY',
      subtitle: 'LAZY AND COZY SWEET HOLIDAYS',
      desc1: '오디너리 홀리데이는 평범한 일상을 매력적인 휴일로 탈바꿈시키는 위트 있고 달콤한 컬러감의 패션 아이웨어 & 악세사리 브랜드입니다.',
      desc2: '독특한 타이포그래피 그래픽 디자인과 시그니처 폰 가방, 양말 등 포인트 하나로 유니크함을 더하는 컬렉션들로 가득합니다.',
      visualBg: 'bg-neutral-900',
      tagline: 'SWEET REBELLION OVER BOREDOM',
      stickerText: 'LAZY DAY',
      imageDesc: 'Bold Color Block Graphic Hoodies'
    },
    {
      id: 'fieldworker',
      name: '필드 워커 (FIELD WORKER)',
      engName: 'FIELD WORKER',
      subtitle: 'HEAVY DUTY UTILITY WORK UNIFORM',
      desc1: '필드 워커는 실제 현장의 내구성과 강인함을 고스란히 담아 현대적인 도심 실루엣으로 정제한 테크니컬 유틸리티 어패럴 브랜드입니다.',
      desc2: '다채로운 포켓 배치, 특수 코팅 나일론 아우터 등 혹독한 환경에서도 완벽한 기능과 세련된 존재감을 가감 없이 보여줍니다.',
      visualBg: 'bg-zinc-800',
      tagline: 'ULTIMATE PERFORMANCE APPAREL',
      stickerText: 'FIELD ACTIVE',
      imageDesc: 'Technical Windproof Shell Parkas'
    }
  ];

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

      {/* 3. BRANDS SHOWCASE COMPONENT: WONDERPLACE BRANDS PANEL (Image 4 & 5) */}
      <section id="brand-section" className="w-full max-w-7xl mx-auto px-6 md:px-12 text-left">
        
        <div className="border-b border-stone-200 pb-6 mb-12">
          <span className="text-[10px] font-mono tracking-[0.3em] font-black text-stone-400 block uppercase mb-3">
            att. BRAND PORTFOLIO
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-black tracking-tight uppercase">
            ATT. SELECT BRANDS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 text-xs sm:text-sm font-semibold text-stone-500 leading-relaxed">
            <p>
              우리는, att.만의 새로운 시각으로 패션 브랜드 전개 및 새로운 콘텐츠와 지속 가능한 브랜드 가치를 제공합니다. 독창적인 영감을 발견해 보세요.
            </p>
            <p>
              우리는, 패션을 통해 고객이 원하는 상품을, 고객이 만족하는 합리적인 가격으로 제안하며, 고객의 즐겁고 합리적인 소비생활에 기여하기 위해 연구합니다.
            </p>
          </div>
        </div>

        {/* Interactive Double Column Brand Selector (Fidelity to Image 4 & 5) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Brand Main Card View (Updates based on selector index) */}
          <div className="lg:col-span-7 bg-stone-50 border border-stone-200 p-8 flex flex-col justify-between relative shadow-sm rounded-lg min-h-[420px] transition-all duration-300">
            
            <div className="space-y-4">
              <span className="bg-black text-white text-[9px] font-mono font-bold px-2.5 py-1 uppercase tracking-widest inline-block">
                {brandsData[selectedBrandIndex].stickerText}
              </span>
              <p className="text-[11px] font-mono font-bold tracking-widest text-stone-400 uppercase">
                {brandsData[selectedBrandIndex].tagline}
              </p>
              
              <h3 className="text-2xl md:text-4xl font-extrabold text-stone-900 uppercase tracking-tight">
                {brandsData[selectedBrandIndex].name}
              </h3>
              <p className="text-[12px] font-mono font-bold text-stone-500 tracking-wider">
                {brandsData[selectedBrandIndex].subtitle}
              </p>

              <div className="space-y-3 pt-4 border-t border-stone-200 max-w-xl text-xs sm:text-sm font-semibold text-stone-600 leading-relaxed">
                <p>{brandsData[selectedBrandIndex].desc1}</p>
                <p>{brandsData[selectedBrandIndex].desc2}</p>
              </div>
            </div>

            {/* Simulated Model Wear Card */}
            <div className="mt-8 bg-stone-900 text-stone-100 p-4 border border-stone-800 flex items-center justify-between rounded hover:scale-[1.01] transition-transform">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded flex items-center justify-center font-mono text-[10px] font-bold text-stone-400">
                  PIC
                </div>
                <div>
                  <p className="text-xs font-bold text-white uppercase">{brandsData[selectedBrandIndex].engName} STYLING ITEM</p>
                  <p className="text-[10px] text-stone-400 font-semibold">{brandsData[selectedBrandIndex].imageDesc}</p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#E1FD80] tracking-widest uppercase">att COLLECTION ★</span>
            </div>

          </div>

          {/* Right Column: Clickable List Selector (Image 4 & 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="border border-stone-200 rounded-lg overflow-hidden divide-y divide-stone-100">
              {brandsData.map((brand, idx) => {
                const isSelected = selectedBrandIndex === idx;
                return (
                  <button
                    key={brand.id}
                    onClick={() => setSelectedBrandIndex(idx)}
                    className={`w-full text-left py-4 px-6 font-bold tracking-[0.05em] text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${
                      isSelected 
                        ? 'bg-black text-white px-8' 
                        : 'bg-white text-stone-600 hover:bg-stone-50 hover:text-black'
                    }`}
                  >
                    <span>{brand.name}</span>
                    <span className="font-mono text-[11px] font-bold text-stone-400">—</span>
                  </button>
                );
              })}
            </div>

            <button 
              onClick={() => onNavigate('shop')}
              className="w-full text-center py-4 bg-white border border-stone-800 text-stone-950 font-bold tracking-widest text-xs hover:bg-stone-950 hover:text-white transition-all uppercase flex items-center justify-center gap-2"
            >
              <span>MORE BRAND SHOP —</span>
            </button>
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 text-xs font-bold text-stone-800">
            <div className="bg-white border border-stone-200 p-4 hover:border-black transition-colors rounded">
              <Briefcase className="w-5 h-5 text-stone-500 mb-2" />
              <p className="font-bold text-stone-900">FASHION MD</p>
              <p className="text-[10px] text-stone-400 mt-1">신입/경력 수시 채용</p>
            </div>
            <div className="bg-white border border-stone-200 p-4 hover:border-black transition-colors rounded">
              <Layers className="w-5 h-5 text-stone-500 mb-2" />
              <p className="font-bold text-stone-900">CREATIVE DESIGN</p>
              <p className="text-[10px] text-stone-400 mt-1">액세서리/어패럴 가이더</p>
            </div>
            <div className="bg-white border border-stone-200 p-4 hover:border-black transition-colors rounded">
              <Sparkles className="w-5 h-5 text-stone-500 mb-2" />
              <p className="font-bold text-stone-900">MARKETING CREW</p>
              <p className="text-[10px] text-stone-400 mt-1">브랜드 브랜딩 기획</p>
            </div>
            <div className="bg-white border border-stone-200 p-4 hover:border-black transition-colors rounded">
              <MapPin className="w-5 h-5 text-stone-500 mb-2" />
              <p className="font-bold text-stone-900">RETAIL STORE</p>
              <p className="text-[10px] text-stone-400 mt-1">성수 오프라인 크루</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONTACT SECTION WITH KAKAO MAP INTEGRATION (Image 6) */}
      <section id="contact-section" className="w-full max-w-7xl mx-auto px-6 md:px-12 text-left relative z-10 border-t border-stone-100 pt-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column Address Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-6">
              <span className="text-[10px] font-mono tracking-[0.3em] font-black text-stone-400 block uppercase">
                CONTACT US
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-stone-900 leading-tight">
                고객의 패션 라이프를<br />
                책임질 att.와 함께
              </h2>
              
              <div className="space-y-4 pt-6 border-t border-stone-200 font-semibold text-stone-600 text-xs sm:text-sm">
                
                <div className="flex items-start gap-3">
                  <MapPin className="w-4.5 h-4.5 text-stone-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] font-bold text-stone-400 uppercase font-mono">HEAD OFFICE</p>
                    <p className="text-stone-800 font-bold mt-1">
                      04782 서울특별시 성동구 성수일로6길 33 (성수동2가) 아연디지털타워 5층
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4.5 h-4.5 text-stone-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] font-bold text-stone-400 uppercase font-mono">EMAIL INQUIRIES</p>
                    <p className="text-stone-800 font-bold mt-1">help@att-place.co.kr</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4.5 h-4.5 text-stone-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] font-bold text-stone-400 uppercase font-mono">CUSTOMER HELPLINE</p>
                    <p className="text-stone-800 font-bold mt-1">1668-3508 (평일 AM 10:00 - PM 5:00)</p>
                  </div>
                </div>

              </div>
            </div>

            <div className="pt-8">
              <a 
                href="https://map.kakao.com"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto text-center inline-block bg-black hover:bg-stone-800 text-white font-bold tracking-widest text-xs px-8 py-4 transition-all uppercase"
              >
                KAKAO MAP —
              </a>
            </div>
          </div>

          {/* Right Column: Stylized Interactive Mock Map (High Fidelity Image 6 Map) */}
          <div className="lg:col-span-7 h-[300px] md:h-[400px] bg-stone-100 border border-stone-200 relative overflow-hidden rounded-lg">
            
            {/* Map lines, grids, stations representation */}
            <div className="absolute inset-0 bg-stone-100 p-4">
              {/* Fake street layouts */}
              <div className="absolute top-10 left-0 right-0 h-[8px] bg-white transform rotate-3"></div>
              <div className="absolute bottom-20 left-0 right-0 h-[10px] bg-white transform -rotate-1"></div>
              <div className="absolute left-1/4 top-0 bottom-0 w-[12px] bg-white transform rotate-12"></div>
              <div className="absolute left-2/3 top-0 bottom-0 w-[8px] bg-white transform -rotate-6"></div>
              
              {/* Seongsu Station Box */}
              <div className="absolute top-8 left-[35%] bg-[#39FF14]/20 border-2 border-dashed border-[#39FF14] text-stone-900 font-bold text-[10px] p-2 rotate-[-5deg] rounded">
                성수역 (Seongsu Line 2)
              </div>

              {/* Ttukseom Station Box */}
              <div className="absolute bottom-16 left-[10%] bg-stone-200 border border-stone-300 text-stone-600 text-[9px] p-1.5 rounded">
                Ttukseom Area
              </div>

              {/* Map grid labels */}
              <span className="absolute top-24 left-12 text-[10px] text-stone-400 font-mono">Seongsui-ro 6-gil</span>
              <span className="absolute bottom-28 right-16 text-[10px] text-stone-400 font-mono">Achasan-ro</span>

              {/* Central Pin - att. Head Office (Fidelity Pin) */}
              <div className="absolute top-1/2 left-[55%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                {/* Decorative pulse ring */}
                <div className="absolute -top-1 w-10 h-10 rounded-full bg-black/10 animate-ping"></div>
                {/* Real pin */}
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-[11px] shadow-lg border border-white z-10">
                  att.
                </div>
                {/* Tooltip Label */}
                <div className="bg-black text-white text-[10px] font-bold px-3 py-1.5 mt-2 shadow-md rounded whitespace-nowrap text-center z-10">
                  <p className="font-extrabold tracking-wider">att. HEAD OFFICE</p>
                  <p className="text-[9px] text-stone-400 font-semibold mt-0.5">아연디지털타워 5층</p>
                </div>
              </div>

            </div>

            {/* Float decal */}
            <span className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm border border-stone-200 text-[10px] font-mono text-stone-500 px-2 py-1 rounded">
              SEOUL 성수동 AREA
            </span>

          </div>

        </div>

      </section>

    </div>
  );
}
