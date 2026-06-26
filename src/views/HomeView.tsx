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
        <div className={`absolute left-6 md:left-10 bottom-24 z-20 hidden md:flex flex-col space-y-3 font-mono text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${isDarkBg ? 'text-stone-400' : 'text-stone-500'}`}>
          <a href="https://www.instagram.com/att_attached/" target="_blank" rel="noreferrer" className={`transition-colors rotate-90 origin-left mt-2 block ${isDarkBg ? 'hover:text-white' : 'hover:text-black'}`}>instagram</a>
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
                #ATT with
              </span>
              <span className="text-[10px] font-mono tracking-[0.2em] font-black uppercase text-stone-500">
                EST. 2026
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-[0.01em] uppercase">
              STICK YOUR VIBE,<br />
              <span className="text-[#FF1493]">TAG YOUR ______!!</span>
            </h2>
            
            <div className="text-xs sm:text-sm font-semibold leading-relaxed max-w-xl text-stone-700 space-y-2">
              <p>
                나만의 무드, 이름, 문구, 캐릭터, 기억하고 싶은 순간까지<br />
                당신이 원하는 빈칸을 채워 세상에 하나뿐인 커스텀 포인트를 만들어보세요.
              </p>
              <p className="text-stone-500 text-[11px] sm:text-xs">
                좋아하는 단어, 나만의 캐릭터, 오늘의 기분, 오래 기억하고 싶은 순간까지 당신이 채우는 빈칸이 곧 #ATT의 커스텀이 됩니다.
              </p>
            </div>
            
            <div className="pt-2">
              <button 
                onClick={() => onNavigate('custom')}
                className="group bg-[#39FF14] text-black hover:bg-white hover:text-black font-black text-xs tracking-widest px-8 py-4 transition-all duration-300 flex items-center gap-2 uppercase border-2 border-black shadow-[4px_4px_0px_rgba(255,20,147,1)] active:translate-x-1 active:translate-y-1 active:shadow-none cursor-pointer"
              >
                <span>CHOOSE YOUR VIBE ↗</span>
              </button>
            </div>
          </div>

          {/* Right Street Culture Bento Badges Grid (Completely responsive and non-overlapping!) */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4 w-full">
            
            {/* Patch Card 1 */}
            <div className="backdrop-blur-xs border-2 p-4 rounded-xl flex flex-col justify-between h-36 transition-all group shadow-md bg-white border-stone-300 hover:border-[#39FF14]">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono text-[#39FF14] font-black bg-[#39FF14]/10 px-2 py-0.5 rounded">01 / TAG YOUR MOOD</span>
                <span className="w-2 h-2 rounded-full bg-[#39FF14] group-hover:animate-ping" />
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-wider group-hover:text-[#39FF14] transition-colors text-black">WAPPEN PLAY</p>
                <p className="text-[10px] mt-1 font-semibold text-stone-500">의류, 키링 등의 커스텀 부착</p>
              </div>
            </div>

            {/* Patch Card 2 */}
            <div className="backdrop-blur-xs border-2 p-4 rounded-xl flex flex-col justify-between h-36 transition-all group shadow-md bg-white border-stone-300 hover:border-[#FF1493]">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono text-[#FF1493] font-black bg-[#FF1493]/10 px-2 py-0.5 rounded">02 / TAG YOUR ART</span>
                <span className="w-2 h-2 rounded-full bg-[#FF1493] group-hover:animate-ping" />
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-wider group-hover:text-[#FF1493] transition-colors text-black">GRAFIC ART</p>
                <p className="text-[10px] mt-1 font-semibold text-stone-500">수제 그래픽 아트 키링</p>
              </div>
            </div>

            {/* Patch Card 3 */}
            <div className="backdrop-blur-xs border-2 p-4 rounded-xl flex flex-col justify-between h-36 transition-all group shadow-md bg-white border-stone-300 hover:border-[#39FF14]">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono text-[#39FF14] font-black bg-[#39FF14]/10 px-2 py-0.5 rounded">03 / TAG YOUR THING</span>
                <span className="w-2 h-2 rounded-full bg-[#39FF14] group-hover:animate-ping" />
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-wider group-hover:text-[#39FF14] transition-colors text-black">POUCH</p>
                <p className="text-[10px] mt-1 font-semibold text-stone-500">파우치에 나의 것들을 담기</p>
              </div>
            </div>

            {/* Patch Card 4 */}
            <div className="backdrop-blur-xs border-2 p-4 rounded-xl flex flex-col justify-between h-36 transition-all group shadow-md bg-white border-stone-300 hover:border-[#FF1493]">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono text-[#FF1493] font-black bg-[#FF1493]/10 px-2 py-0.5 rounded">04 / TAG YOUR ______</span>
                <span className="w-2 h-2 rounded-full bg-[#FF1493] group-hover:animate-ping" />
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-wider group-hover:text-[#FF1493] transition-colors text-black">BLANK</p>
                <p className="text-[10px] mt-1 font-semibold text-stone-500">나만의 디자인을 표현하는 커스텀 와펜</p>
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



      </section>

      {/* 5. ORDER SECTION */}
      <section 
        id="custom-order-section" 
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
            ORDER
          </span>
          <h2 className={`text-3xl md:text-5xl font-black tracking-tight uppercase leading-none ${
            recruitBgImage ? 'text-white' : 'text-stone-900'
          }`}>
            custom with #Att
          </h2>
          <p className={`text-xs sm:text-sm font-semibold leading-relaxed ${
            recruitBgImage ? 'text-stone-200' : 'text-stone-600'
          }`}>
            <span className="block font-black text-sm mb-2 uppercase tracking-wider">att service</span>
            어태치는 새로운 시각으로 트랜드를 제안하는 브랜드입니다.<br />
            어태치 사이트를 통해 문의해주시거나 인스타그램 문의를 통해 개인 맞춤형 디자인을 요청하세요.
          </p>
 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 text-xs font-bold text-stone-800 max-w-2xl mx-auto w-full">
            <div 
              onClick={() => onNavigate('custom')}
              className={`border p-5 hover:scale-[1.02] active:scale-[0.98] transition-all rounded-lg block group text-center md:text-left cursor-pointer ${
                recruitBgImage ? 'bg-black/60 border-stone-700 text-white hover:border-white' : 'bg-white border-stone-200 text-stone-850 hover:border-black'
              }`}
            >
              <Sparkles className={`w-5 h-5 mb-2 group-hover:text-black transition-colors mx-auto md:mx-0 ${
                recruitBgImage ? 'text-stone-400 group-hover:text-[#39FF14]' : 'text-stone-500'
              }`} />
              <p className={`font-bold group-hover:text-black transition-colors ${recruitBgImage ? 'text-[#39FF14]' : 'text-stone-900'}`}>사이트 문의</p>
              <p className={`text-[10px] mt-1 font-semibold ${recruitBgImage ? 'text-stone-300' : 'text-stone-400'}`}>나만의 커스텀 오더 신청하기 ↗</p>
            </div>
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
              <p className={`font-bold group-hover:text-black transition-colors ${recruitBgImage ? 'text-[#39FF14]' : 'text-stone-900'}`}>인스타그램 문의</p>
              <p className={`text-[10px] mt-1 font-semibold ${recruitBgImage ? 'text-stone-300' : 'text-stone-400'}`}>실시간 인스타 시안 상담하기 ↗</p>
            </a>
          </div>
        </div>
      </section>



    </div>
  );
}
