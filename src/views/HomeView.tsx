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
  aboutBgImage?: string;
  slide2BgImage?: string;
  slide1BgImage?: string;
  customBannerBgImage?: string;
  recruitBgImage?: string;
}

export default function HomeView({ 
  products, 
  onNavigate, 
  currentUser, 
  aboutBgImage: propAboutBgImage, 
  slide2BgImage: propSlide2BgImage,
  slide1BgImage: propSlide1BgImage,
  customBannerBgImage: propCustomBannerBgImage,
  recruitBgImage: propRecruitBgImage
}: HomeViewProps) {
  
  // Split products for display (Acrylic / Eco keyring list requested in prompt)
  const keyrings = products.filter(p => p.category === 'keyring');
  const wappens = products.filter(p => p.category === 'wappen');

  const firstWappen = wappens[0] || products.find(p => p.id === 'love-everywhere-patch') || products[0];
  const secondWappen = wappens[1] || products.find(p => p.id === 'retro-arcade-wappen') || products[1];

  // Active background images: Use custom uploaded one if available, otherwise default to empty (white background) per user request
  const slide1BgImage = propSlide1BgImage || "";
  const slide2BgImage = propSlide2BgImage || "";
  const aboutBgImage = propAboutBgImage || "";
  const customBannerBgImage = propCustomBannerBgImage || "";
  const recruitBgImage = propRecruitBgImage || "";

  // Check if the hero slide has a background image
  const isDarkBg = !!slide1BgImage;

  return (
    <div id="home-view-container" className="flex flex-col gap-24 md:gap-36 pb-20 select-none bg-white">
      
      {/* 1. HERO BANNER: WONDERPLACE LAYOUT (Image 1) */}
      <section id="hero-slider-section" className="w-full relative h-[500px] md:h-[620px] bg-white overflow-hidden border-b border-stone-100">
        
        {/* Floating Vertical Social links on bottom-left */}
        <div className={`absolute left-6 md:left-10 bottom-8 z-20 hidden md:flex flex-col space-y-3 font-mono text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${isDarkBg ? 'text-stone-400' : 'text-stone-500'}`}>
          <a href="https://www.instagram.com/att_attached/" target="_blank" rel="noreferrer" className={`transition-colors rotate-90 origin-left mt-10 block ${isDarkBg ? 'hover:text-white' : 'hover:text-black'}`}>instagram</a>
        </div>

        {/* Floating Large Title Text over Slider (Image 1) */}
        <div 
          className={`absolute left-6 md:left-32 top-16 md:top-20 z-10 text-left max-w-xl pointer-events-none transition-all duration-300 rounded-xl ${
            slide1BgImage
              ? 'bg-black/25 p-6 backdrop-blur-[2px] border border-white/10 shadow-lg'
              : 'p-0 bg-transparent'
          } ${
            isDarkBg ? 'text-white' : 'text-black'
          }`}
          style={{
            textShadow: isDarkBg ? '0 2px 8px rgba(0,0,0,0.5)' : 'none'
          }}
        >
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-none uppercase">
            NO.1<br />
            <span className={`font-medium text-lg sm:text-xl md:text-2xl tracking-normal block mt-2.5 transition-colors ${
              isDarkBg ? 'text-white/90' : 'text-stone-900'
            }`}>
              커스텀 패치 편집샵
            </span>
            <span className="tracking-[0.1em] font-black text-2xl md:text-3xl mt-1 block">
              #ATT
            </span>
          </h1>

          <div className={`mt-8 border-l pl-4 max-w-sm transition-colors ${
            isDarkBg ? 'border-white/30' : 'border-stone-400'
          }`}>
            <h4 className={`text-[11px] font-mono font-bold tracking-widest uppercase transition-colors ${
              isDarkBg ? 'text-white' : 'text-stone-900'
            }`}>
              ATTACH
            </h4>
            <p className={`text-[11px] leading-relaxed font-semibold mt-2 transition-colors ${
              isDarkBg ? 'text-stone-300' : 'text-stone-500'
            }`}>
              가방, 파우치, 모자, 키링 위에<br />
              귀여운 취향, 키치한 감성, 나만의 문구와 무드를 더하는 곳<br />
              내 물건을 더 나답게 만드는 작은 커스텀<br />
              당신의 취향을 붙이다 #ATT
            </p>
          </div>
        </div>

        {/* Slide Visual Container */}
        <div 
          style={slide1BgImage ? { backgroundImage: `url(${slide1BgImage})`, backgroundPosition: 'center', backgroundSize: 'cover' } : {}}
          className={`absolute inset-0 flex items-center justify-end overflow-hidden transition-all duration-300 ${
            slide1BgImage ? 'bg-black/30' : 'bg-white bg-[radial-gradient(rgba(0,0,0,0.03)_1px,transparent_1px)] [background-size:20px_20px]'
          }`}
        >
          {/* Outline decorative typography */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03]">
            <span className={`font-sans font-black text-[22vw] leading-none tracking-widest ${slide1BgImage ? 'text-white' : 'text-black'}`}>#ATT</span>
          </div>
        </div>

      </section>

      {/* 2. ABOUT SECTION: STREET CULTURE PLAYGROUND (Image 2 & 3) */}
      <section 
        id="about-section" 
        className="w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-16 py-16 md:py-24 rounded-2xl border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] text-left relative overflow-hidden transition-all duration-300 bg-stone-100"
      >
        {/* Decorative Grid Lines / Cyber Street Elements (light gray grid lines) */}
        <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-black to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-black to-transparent" />
          <div className="absolute top-1/4 left-10 w-24 h-24 border border-dashed border-black/30 rounded-full animate-[spin_20s_linear_infinite]" />
          <div className="absolute bottom-1/4 right-10 w-32 h-32 border border-dashed border-black/30 rounded-full animate-[spin_30s_linear_infinite]" />
        </div>

        {/* Giant Watermark outline typography in background */}
        <div className="absolute bottom-4 right-6 select-none pointer-events-none opacity-[0.03] text-right z-0 hidden md:block">
          <p className="font-sans font-black text-[10vw] tracking-tighter leading-none text-black">STREET</p>
          <p className="font-sans font-black text-[10vw] tracking-tighter leading-none text-black">PLAYGROUND</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 text-stone-950">
          
          {/* Left Text Block */}
          <div className="lg:col-span-6 space-y-6 transition-all duration-300 rounded-2xl p-0 bg-transparent">
            <div className="inline-flex items-center gap-2">
              <span className="bg-[#39FF14] text-black text-[10px] font-mono font-black px-2.5 py-1 uppercase tracking-widest rounded-sm">
                STREET ARCHIVE
              </span>
              <span className="text-[10px] font-mono tracking-[0.2em] font-black uppercase text-stone-500">
                EST. 2026
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-[0.01em] uppercase">
              STICK YOUR VIBE,<br />
              <span className="text-[#FF1493]">RULE THE STREET!</span>
            </h2>
            
            <p className="text-xs sm:text-sm font-semibold leading-relaxed max-w-xl text-stone-700">
              어태치(att.)는 나만의 서브컬처적 취향과 힙한 영감을 일상 속 의류, 가방, 아웃도어 기물에 거침없이 붙여 표현하는 국내 유일의 1:1 스트릿 커스텀 와펜 플랫폼입니다. 정형화된 일상에 자신만의 아트웍 패치를 더해 룩을 수선해 보세요!
            </p>
            
            <div className="pt-2">
              <button 
                onClick={() => onNavigate('shop')}
                className="group bg-[#39FF14] text-black hover:bg-white hover:text-black font-black text-xs tracking-widest px-8 py-4 transition-all duration-300 flex items-center gap-2 uppercase border-2 border-black shadow-[4px_4px_0px_rgba(255,20,147,1)] active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                <span>GET THE PATCHES ↗</span>
              </button>
            </div>
          </div>

          {/* Right Street Culture Bento Badges Grid (Completely responsive and non-overlapping!) */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4 w-full">
            
            {/* Patch Card 1 */}
            <div className="backdrop-blur-xs border-2 p-4 rounded-xl flex flex-col justify-between h-36 transition-all group shadow-md bg-white border-stone-300 hover:border-[#39FF14]">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono text-[#39FF14] font-black bg-[#39FF14]/10 px-2 py-0.5 rounded">01 / STICK</span>
                <span className="w-2 h-2 rounded-full bg-[#39FF14] group-hover:animate-ping" />
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-wider group-hover:text-[#39FF14] transition-colors text-black">WAPPEN PLAY</p>
                <p className="text-[10px] mt-1 font-semibold text-stone-500">의류, 가구 등 어디든 커스텀 부착</p>
              </div>
            </div>

            {/* Patch Card 2 */}
            <div className="backdrop-blur-xs border-2 p-4 rounded-xl flex flex-col justify-between h-36 transition-all group shadow-md bg-white border-stone-300 hover:border-[#FF1493]">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono text-[#FF1493] font-black bg-[#FF1493]/10 px-2 py-0.5 rounded">02 / GRAPHIC</span>
                <span className="w-2 h-2 rounded-full bg-[#FF1493] group-hover:animate-ping" />
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-wider group-hover:text-[#FF1493] transition-colors text-black">HIP DESIGNS</p>
                <p className="text-[10px] mt-1 font-semibold text-stone-500">서브컬처 감성의 수제 그래픽 아트</p>
              </div>
            </div>

            {/* Patch Card 3 */}
            <div className="backdrop-blur-xs border-2 p-4 rounded-xl flex flex-col justify-between h-36 transition-all group shadow-md bg-white border-stone-300 hover:border-[#39FF14]">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono text-[#39FF14] font-black bg-[#39FF14]/10 px-2 py-0.5 rounded">03 / CREATOR</span>
                <span className="w-2 h-2 rounded-full bg-[#39FF14] group-hover:animate-ping" />
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-wider group-hover:text-[#39FF14] transition-colors text-black">1:1 DIRECT</p>
                <p className="text-[10px] mt-1 font-semibold text-stone-500">커스텀 도안과 완벽한 밀착 소통</p>
              </div>
            </div>

            {/* Patch Card 4 */}
            <div className="backdrop-blur-xs border-2 p-4 rounded-xl flex flex-col justify-between h-36 transition-all group shadow-md bg-white border-stone-300 hover:border-[#FF1493]">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono text-[#FF1493] font-black bg-[#FF1493]/10 px-2 py-0.5 rounded">04 / CREW</span>
                <span className="w-2 h-2 rounded-full bg-[#FF1493] group-hover:animate-ping" />
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-wider group-hover:text-[#FF1493] transition-colors text-black">att. ARCHIVE</p>
                <p className="text-[10px] mt-1 font-semibold text-stone-500">무한한 믹스매치 컬렉션 기획</p>
              </div>
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
        <div 
          style={customBannerBgImage ? { backgroundImage: `url(${customBannerBgImage})`, backgroundPosition: 'center', backgroundSize: 'cover' } : {}}
          className={`mt-12 p-8 text-center flex flex-col md:flex-row items-center justify-between gap-6 rounded-lg relative overflow-hidden transition-all duration-300 ${
            customBannerBgImage ? 'border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]' : 'bg-stone-50 border border-stone-200'
          }`}
        >
          {customBannerBgImage && (
            <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none" />
          )}
          <div className="text-left space-y-1 relative z-10">
            <span className={`text-[8px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-widest ${
              customBannerBgImage ? 'bg-[#39FF14] text-black font-black' : 'bg-black text-white'
            }`}>att. SERVICE</span>
            <h4 className={`text-base font-extrabold mt-1 ${customBannerBgImage ? 'text-white' : 'text-stone-900'}`}>1:1 맞춤형 나만의 아크릴 굿즈 제작 서비스</h4>
            <p className={`text-[11px] font-medium ${customBannerBgImage ? 'text-stone-200' : 'text-stone-500'}`}>인스타그램 가이드 상담을 통해 동아리나 개인 특별 각인 맞춤형 디자인을 요청하세요.</p>
          </div>
          <button 
            onClick={() => onNavigate('custom')}
            className={`font-bold text-xs tracking-widest px-6 py-3.5 transition-all uppercase whitespace-nowrap relative z-10 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer ${
              customBannerBgImage ? 'bg-[#39FF14] text-black hover:bg-white hover:text-black' : 'bg-black text-white hover:bg-stone-800'
            }`}
          >
            커스텀 오더 신청하기 —
          </button>
        </div>

      </section>

      {/* 5. RECRUIT SECTION (Interactive Careers Module matching Image 1 menu) */}
      <section 
        id="recruit-section" 
        style={recruitBgImage ? { backgroundImage: `url(${recruitBgImage})`, backgroundPosition: 'center', backgroundSize: 'cover' } : {}}
        className={`w-full max-w-7xl mx-auto px-6 md:px-12 text-left py-16 rounded-xl relative overflow-hidden transition-all duration-300 ${
          recruitBgImage ? 'border-2 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)]' : 'bg-stone-50 border border-stone-200'
        }`}
      >
        {recruitBgImage && (
          <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none" />
        )}
        <div className="max-w-3xl space-y-6 relative z-10">
          <span className={`text-[10px] font-mono tracking-[0.3em] font-black block uppercase ${
            recruitBgImage ? 'text-[#39FF14]' : 'text-stone-400'
          }`}>
            RECRUIT
          </span>
          <h2 className={`text-3xl md:text-5xl font-black tracking-tight uppercase leading-none ${
            recruitBgImage ? 'text-white' : 'text-stone-900'
          }`}>
            GO FORWARD WITH #ATT
          </h2>
          <p className={`text-xs sm:text-sm font-semibold leading-relaxed ${
            recruitBgImage ? 'text-stone-200' : 'text-stone-600'
          }`}>
            att.(어태치)는 새로운 시각으로 트렌드를 제안하며 지속 가능한 패션 가치를 탐구하는 라이프스타일 셀렉샵입니다. 
            우리와 함께 창의적인 영감을 나눌 열정 가득한 인재들을 언제나 기다리고 있습니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 text-xs font-bold text-stone-800 max-w-2xl mx-auto w-full">
            <a 
              href="mailto:collaboration@att-wappen.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`border p-5 hover:scale-[1.02] active:scale-[0.98] transition-all rounded-lg block group text-center md:text-left ${
                recruitBgImage ? 'bg-black/60 border-stone-700 text-white hover:border-white' : 'bg-white border-stone-200 text-stone-850 hover:border-black'
              }`}
            >
              <Sparkles className={`w-5 h-5 mb-2 group-hover:text-black transition-colors mx-auto md:mx-0 ${
                recruitBgImage ? 'text-stone-400 group-hover:text-[#39FF14]' : 'text-stone-500'
              }`} />
              <p className={`font-bold group-hover:text-black transition-colors ${recruitBgImage ? 'text-[#39FF14]' : 'text-stone-900'}`}>MARKETING CREW</p>
              <p className={`text-[10px] mt-1 font-semibold ${recruitBgImage ? 'text-stone-300' : 'text-stone-400'}`}>브랜드 협업 제안 문의하기 ↗</p>
            </a>
            <a 
              href="https://www.instagram.com/att_attached?igsh=MTNnczE4a25rdzlweg==" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`border p-5 hover:scale-[1.02] active:scale-[0.98] transition-all rounded-lg block group text-center md:text-left ${
                recruitBgImage ? 'bg-black/60 border-stone-700 text-white hover:border-white' : 'bg-white border-stone-200 text-stone-850 hover:border-black'
              }`}
            >
              <MapPin className={`w-5 h-5 mb-2 group-hover:text-black transition-colors mx-auto md:mx-0 ${
                recruitBgImage ? 'text-stone-400 group-hover:text-[#39FF14]' : 'text-stone-500'
              }`} />
              <p className={`font-bold group-hover:text-black transition-colors ${recruitBgImage ? 'text-[#39FF14]' : 'text-stone-900'}`}>RETAIL STORE</p>
              <p className={`text-[10px] mt-1 font-semibold ${recruitBgImage ? 'text-stone-300' : 'text-stone-400'}`}>att 인스타그램 ↗</p>
            </a>
          </div>
        </div>
      </section>



    </div>
  );
}
