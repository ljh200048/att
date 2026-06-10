import { Instagram, Youtube, ArrowUp, Send, ShieldAlert } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string, productId?: string, category?: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="brand-footer" className="w-full bg-black text-[#FFFDF0] text-xs mt-16 border-t-8 border-black">
      
      {/* 1. WELCOME GIFT & SOCIAL INTERACTION BANNER (Neo-Brutalism Style) */}
      <div className="bg-brand-pink text-black py-12 px-6 border-b-4 border-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-left max-w-2xl">
            <span className="bg-black text-[#FFFDF0] font-black px-2.5 py-1 text-[10px] tracking-widest uppercase">
              INSTAGRAM & REAL DM ORDER
            </span>
            <h3 className="text-2xl md:text-3xl font-black mt-3 tracking-tight leading-tight uppercase font-sans">
              ATTACH YOUR MOOD - att!
            </h3>
            <p className="text-xs md:text-sm font-bold text-black/80 mt-2 leading-relaxed">
              나의 취향과 무드를 일상 가방, 파우치, 에어팟 케이스, 재킷, 모자에 어태치해보세요.<br />
              사이트 주문 외에도 인스타그램 DM을 통한 1:1 맞춤 제작 실시간 상담 및 결제가 가능합니다.
            </p>
          </div>

          {/* Quick Buttons Grid */}
          <div className="flex flex-wrap gap-4 w-full md:w-auto">
            <a 
              href="https://www.instagram.com/att_attached/" 
              target="_blank" 
              rel="noreferrer"
              className="flex-1 md:flex-initial bg-black text-white hover:bg-brand-lime hover:text-black font-black text-sm px-6 py-4 border-4 border-black shadow-[4px_4px_0px_rgba(255,255,255,1)] hover:shadow-none transition-all flex items-center justify-center gap-2"
            >
              <Instagram className="w-5 h-5 text-brand-pink animate-pulse" />
              <span>att 인스타그램 연결</span>
            </a>

            <a 
              href="https://www.instagram.com/att_attached/" 
              target="_blank" 
              rel="noreferrer"
              className="flex-1 md:flex-initial bg-brand-lime text-black hover:bg-black hover:text-white font-black text-sm px-6 py-4 border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              <span>실시간 DM 주문하기</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. SUB NAVIGATION LINKS BAR */}
      <div className="border-b-2 border-black px-4 md:px-8 py-5 bg-stone-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 font-bold tracking-tight">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[#FFFDF0]">
            <button onClick={() => onNavigate('home')} className="hover:text-brand-lime transition-colors cursor-pointer">홈</button>
            <span className="text-stone-700">|</span>
            <button onClick={() => onNavigate('shop', undefined, 'keyring')} className="hover:text-brand-lime transition-colors cursor-pointer">키링 카탈로그</button>
            <span className="text-stone-700">|</span>
            <button onClick={() => onNavigate('shop', undefined, 'wappen')} className="hover:text-brand-lime transition-colors cursor-pointer">와펜 카탈로그</button>
            <span className="text-stone-700">|</span>
            <button onClick={() => onNavigate('custom')} className="hover:text-brand-lime text-brand-pink transition-colors cursor-pointer">1:1 커스텀 주문제작</button>
            <span className="text-stone-700">|</span>
            <button onClick={() => onNavigate('review')} className="hover:text-brand-lime transition-colors cursor-pointer">사용자 포토후기</button>
            <span className="text-stone-700">|</span>
            <button onClick={() => onNavigate('intro')} className="hover:text-brand-lime transition-colors cursor-pointer">브랜드 소개</button>
            <span className="text-stone-700">|</span>
            <button onClick={() => onNavigate('inquiry')} className="hover:text-brand-lime transition-colors cursor-pointer">1:1 문의 채널</button>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-white">
            <a href="https://www.instagram.com/att_attached/" target="_blank" rel="noreferrer" className="hover:text-brand-pink transition-colors bg-black p-2 border-2 border-black rounded-none shadow-[2px_2px_0px_rgba(255,255,255,0.2)]">
              <Instagram className="w-4 h-4 text-brand-pink" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-brand-lime transition-colors bg-black p-2 border-2 border-black rounded-none shadow-[2px_2px_0px_rgba(255,255,255,0.2)]">
              <Youtube className="w-4 h-4 text-brand-lime" />
            </a>
          </div>
        </div>
      </div>

      {/* 3. BUSINESS INFORMATION & FOOTER GRID */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 text-stone-400 font-medium font-sans">
        
        {/* Left Side: Business Registration & Info (lg:span-7) */}
        <div className="lg:col-span-7 flex flex-col gap-4 text-left border-b lg:border-b-0 border-stone-900 pb-8 lg:pb-0">
          <div className="flex items-center gap-3">
            <span className="text-lg font-black text-white tracking-widest font-sans uppercase bg-brand-pink text-black px-2 py-0.5 border border-black">
              att. 어태치
            </span>
            <span className="text-[10px] text-stone-550 border border-stone-800 px-2 py-0.5">커스텀 패브릭 와펜 & 키링 전문 브랜드</span>
          </div>
          <div className="space-y-1 text-[11px] text-stone-500 leading-relaxed font-semibold">
            <p>att(어태치) 디자인 그룹 주식회사</p>
            <p>충청북도 청주시 소재</p>
            <p>개인정보관리책임자: <a href="mailto:lch200048@gmail.com" className="text-brand-pink hover:underline">lch200048@gmail.com</a></p>
            <p>고객센터: 1544-6486 <span className="text-stone-800 mx-1">|</span> 평일 10:00 - 17:00</p>
            <p>토·일·공휴일 휴무</p>
          </div>
          <p className="text-[10px] text-stone-600 mt-4 leading-normal font-mono font-bold">
            © att. All rights reserved.
          </p>
        </div>

        {/* Right Side: Quick Links Navigation */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-6 text-left">
          {/* About Column */}
          <div className="flex flex-col gap-3.5">
            <h4 className="text-[13px] font-bold text-white tracking-wider border-b border-stone-800 pb-1.5">att BRAND STORY</h4>
            <div className="flex flex-col gap-2 text-[11px] text-stone-500 font-bold">
              <button onClick={() => onNavigate('intro')} className="hover:text-brand-pink transition-colors cursor-pointer text-left">어태치의 탄생 배경 (attach)</button>
              <button onClick={() => onNavigate('intro')} className="hover:text-brand-pink transition-colors cursor-pointer text-left">나의 취향을 일상에 더하다</button>
              <button onClick={() => onNavigate('custom')} className="hover:text-brand-lime transition-colors cursor-pointer text-left font-black">1:1 실시간 수제 상담신청</button>
              <button onClick={() => onNavigate('review')} className="hover:text-brand-pink transition-colors cursor-pointer text-left">어태치 힙스터즈 착용 가이드</button>
            </div>
          </div>

          {/* Customer Service Column */}
          <div className="flex flex-col gap-3.5 relative">
            <h4 className="text-[13px] font-bold text-white tracking-wider border-b border-stone-800 pb-1.5">HELP CENTER</h4>
            <div className="flex flex-col gap-2 text-[11px] text-stone-500 font-bold">
              <button onClick={() => onNavigate('inquiry')} className="hover:text-brand-pink transition-colors cursor-pointer text-left">1:1 맞춤 가공 상담</button>
              <button onClick={() => onNavigate('mypage')} className="hover:text-brand-pink transition-colors cursor-pointer text-left">주문 제작 상태 / 배송 추적</button>
              <button onClick={() => onNavigate('inquiry')} className="hover:text-brand-pink transition-colors cursor-pointer text-left">교환 / 파손 긴급 케어 가이드</button>
            </div>
            
            <div className="mt-2 pt-2 border-t border-stone-900 text-left">
              <p className="text-[14px] font-black text-brand-lime font-mono">1544-6486</p>
              <p className="text-[9px] text-stone-600 font-bold">점심시간: PM 12:00 ~ PM 1:00</p>
            </div>

            {/* Float logo at the corner of footer */}
            <div className="absolute right-0 bottom-0 bg-brand-pink text-black p-2 font-black border-2 border-black shadow-[2px_2px_0px_white] select-none w-12 h-12 flex items-center justify-center hover:scale-105 transition-transform transform rotate-6">
              att
            </div>
          </div>

        </div>
      </div>

      {/* Floating Scroll to Top button at bottom-right of viewport */}
      <div className="bg-black py-4 text-center border-t-2 border-stone-800 px-6 flex items-center justify-between text-[10px] text-stone-500">
        <p>어태치(att)는 일상 가방, 자켓, 모자에 나만의 유니크한 취향을 장식하는 최고의 플랫폼입니다.</p>
        <button 
          onClick={scrollToTop}
          className="bg-stone-900 hover:bg-brand-lime hover:text-black border-2 border-black text-white px-3.5 py-1.5 rounded-none transition-colors flex items-center gap-1 cursor-pointer font-black shadow-[2px_2px_0px_rgba(255,255,255,0.1)]"
        >
          <span>TOP</span>
          <ArrowUp className="w-3.5 h-3.5 text-brand-pink animate-bounce" />
        </button>
      </div>

    </footer>
  );
}
