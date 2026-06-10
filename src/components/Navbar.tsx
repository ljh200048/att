import React, { useState } from 'react';
import { Search, Heart, User, ShoppingBag, Eye, X, ShieldAlert, Sparkles, LogOut, Instagram } from 'lucide-react';
import { User as UserType } from '../types';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, productId?: string, category?: string) => void;
  cartCount: number;
  currentUser: UserType | null;
  onLogout: () => void;
}

export default function Navbar({
  currentView,
  onNavigate,
  cartCount,
  currentUser,
  onLogout,
}: NavbarProps) {
  const [searchText, setSearchText] = useState('');

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onNavigate('shop');
    }
  };

  const menuItems = [
    { en: 'HOME', kr: '홈', view: 'home', category: undefined },
    { en: 'KEYRING', kr: '키링', view: 'shop', category: 'keyring' },
    { en: 'WAPPEN', kr: '와펜', view: 'shop', category: 'wappen' },
    { en: 'CUSTOM', kr: '커스텀 주문', view: 'custom', category: undefined },
    { en: 'REVIEW', kr: '후기', view: 'review', category: undefined },
    { en: 'ABOUT', kr: '브랜드 소개', view: 'intro', category: undefined },
    { en: 'CONTACT', kr: '문의', view: 'inquiry', category: undefined },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FFFDF0] border-b-4 border-black select-none font-sans">
      
      {/* Promo Marquee Strip */}
      <div className="w-full bg-brand-black text-[#FFFDF0] py-2 px-4 border-b-2 border-black overflow-hidden flex items-center justify-between text-[11px] font-mono tracking-wider">
        <div className="flex items-center gap-6 animate-pulse">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3 H-3 text-brand-lime fill-brand-lime" />
            <span className="font-extrabold text-[#FFFDF0]">ATTACH YOUR MOOD - 일상에 취향을 붙이는 시간, att!</span>
          </div>
          <span className="hidden md:inline text-brand-pink font-black">★★★ 5만원 이상 무료 배송 & 1:1 커스텀 프리뷰 서비스 개설 ★★★</span>
        </div>

        {/* Instargram DM Shortcuts & Quick Actions */}
        <div className="flex items-center gap-4">
          <a
            href="https://www.instagram.com/att_attached/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[10px] bg-brand-pink text-white font-extrabold px-2 py-0.5 border border-black shadow-[1px_1px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all"
          >
            <Instagram className="w-3 h-3" />
            <span className="hidden sm:inline">인스타그램 DM 주문</span>
          </a>

          {currentUser ? (
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-brand-lime font-black underline decoration-2">{currentUser.name} 님</span>
              <button 
                onClick={onLogout} 
                className="cursor-pointer text-[10px] font-extrabold text-brand-pink hover:underline uppercase flex items-center gap-0.5"
              >
                <LogOut className="w-3 h-3" />
                <span>로그아웃</span>
              </button>
            </div>
          ) : (
            <button 
              onClick={() => onNavigate('login')} 
              className="cursor-pointer text-[10px] font-extrabold text-brand-blue hover:underline uppercase"
            >
              로그인 / 회원가입
            </button>
          )}
        </div>
      </div>

      {/* Main navigation header (Neo-Brutalist Layout) */}
      <div className="w-full px-4 md:px-8 py-3 flex items-center justify-between gap-4 bg-white">
        
        {/* Brand Logo: Hip Y2K / Neo-Brutalist badge structure */}
        <button 
          onClick={() => onNavigate('home')} 
          className="group cursor-pointer focus:outline-none flex items-center gap-2 text-left"
        >
          <div className="bg-brand-pink text-black border-3 border-black p-2 font-black text-2xl tracking-tighter uppercase transform -rotate-3 scale-100 group-hover:scale-105 group-hover:rotate-3 transition-transform shadow-[4px_4px_0px_rgb(0,0,0)]">
            att
          </div>
          <div className="hidden sm:block">
            <p className="text-[12px] font-black leading-none uppercase tracking-widest text-black">어태치</p>
            <p className="text-[8px] font-extrabold text-stone-500 tracking-tight mt-0.5 uppercase">ATTACH YOUR MOOD</p>
          </div>
        </button>

        {/* Desktop Custom Navigation Menu (Rule 4 & 5 hybrid layout showing EN + KR subtitles) */}
        <nav className="hidden lg:flex items-center gap-1.5">
          {menuItems.map((item) => {
            const isActive = currentView === item.view;
            return (
              <button
                key={item.en}
                onClick={() => onNavigate(item.view, undefined, item.category)}
                className={`cursor-pointer px-3.5 py-1.5 border-2 border-transparent transition-all hover:bg-brand-black hover:text-white hover:border-black rounded-none flex flex-col items-center justify-center group ${
                  isActive 
                    ? 'bg-brand-lime text-black border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)]' 
                    : ''
                }`}
              >
                <span className="text-[13px] font-black tracking-widest font-sans transition-all">{item.en}</span>
                <span className={`text-[9px] font-bold tracking-tight opacity-70 group-hover:text-brand-lime ${isActive ? 'text-black opacity-90' : 'text-stone-500'}`}>{item.kr}</span>
              </button>
            );
          })}

          {/* Login Menu directly in list if and only if not logged in */}
          <button
            onClick={() => currentUser ? onNavigate('mypage') : onNavigate('login')}
            className={`cursor-pointer px-3.5 py-1.5 border-2 border-transparent transition-all hover:bg-brand-black hover:text-white hover:border-black rounded-none flex flex-col items-center justify-center group ${
              currentView === 'login' || currentView === 'mypage' ? 'bg-brand-blue text-black border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)]' : ''
            }`}
          >
            <span className="text-[13px] font-black tracking-widest font-sans">{currentUser ? 'MYPAGE' : 'LOGIN'}</span>
            <span className="text-[9px] font-bold tracking-tight text-stone-500 group-hover:text-brand-blue">{currentUser ? '마이페이지' : '로그인'}</span>
          </button>
        </nav>

        {/* Right utilities rail */}
        <div className="flex items-center gap-3">
          
          {/* Quick Search */}
          <div className="relative hidden md:flex items-center bg-[#FFFDF0] border-2 border-black px-2 py-1 shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-all">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleSearchKeyPress}
              placeholder="취향 굿즈 검색"
              className="bg-transparent text-xs font-bold outline-none w-28 text-black placeholder-stone-450 mr-1"
            />
            {searchText && (
              <button onClick={() => setSearchText('')} className="p-0.5 text-stone-500 hover:text-black">
                <X className="w-3 h-3" />
              </button>
            )}
            <Search className="w-3.5 h-3.5 text-black" />
          </div>

          {/* Inquiry Indicator */}
          <button 
            onClick={() => onNavigate('inquiry')} 
            className="p-1.5 border-2 border-black bg-white shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-[#FFFDF0] transition-colors relative cursor-pointer hover:translate-y-[1px] hover:shadow-[1px_1px_0px_rgba(0,0,0,1)]"
            title="고객 문의"
          >
            <Eye className="w-4 h-4 text-black" />
          </button>

          {/* Cart / Bag Icon with Neo-Brutalist Sticker Style Counter */}
          <button 
            onClick={() => onNavigate('mypage')} 
            className="p-1.5 bg-brand-lime border-2 border-black text-black shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all relative cursor-pointer hover:translate-y-[-1px]"
            title="장바구니 및 주문결제"
          >
            <ShoppingBag className="w-4.5 h-4.5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-none bg-brand-pink text-[9px] font-black text-white flex items-center justify-center border-2 border-black shadow-[1px_1px_0px_rgba(0,0,0,1)] animate-bounce font-mono">
                {cartCount}
              </span>
            )}
          </button>

          {/* admin icon */}
          <button
            onClick={() => onNavigate('admin')}
            className={`cursor-pointer hidden sm:flex items-center gap-1 px-2.5 py-1 border-2 border-black text-[10px] font-bold shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-brand-black hover:text-white transition-all ${
              currentView === 'admin' ? 'bg-brand-pink text-white shadow-[1px_1px_0px_rgba(0,0,0,1)] translate-y-0.5' : 'bg-brand-blue text-black'
            }`}
            title="관리자 콘솔"
          >
            <ShieldAlert className="w-3 h-3" />
            <span>ADMIN</span>
          </button>

        </div>

      </div>

      {/* Mobile Sub Navigation (Strict alignment to Rule 4 & 5 for small viewports too) */}
      <div className="lg:hidden flex items-center justify-start gap-1 h-12 bg-white border-t-2 border-black overflow-x-auto px-2 py-1 text-xs no-scrollbar">
        {menuItems.map((item) => {
          const isActive = currentView === item.view;
          return (
            <button 
              key={item.en}
              onClick={() => onNavigate(item.view, undefined, item.category)} 
              className={`flex-none text-[10px] uppercase px-3 py-1 font-black transition-all cursor-pointer border-2 ${
                isActive 
                  ? 'bg-brand-lime text-black border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]' 
                  : 'bg-white border-transparent text-stone-600 hover:bg-stone-100 hover:border-black'
              }`}
            >
              <span>{item.kr}</span>
            </button>
          );
        })}
        
        {/* Mobile Page indicator */}
        <button 
          onClick={() => onNavigate('mypage')} 
          className={`flex-none text-[10px] uppercase px-3 py-1 font-black transition-all cursor-pointer border-2 ${
            currentView === 'mypage' 
              ? 'bg-brand-blue text-black border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]' 
              : 'bg-white border-transparent text-stone-600 hover:bg-stone-100'
          }`}
        >
          <span>내 쇼핑백</span>
        </button>

        {/* Mobile Admin toggle */}
        <button 
          onClick={() => onNavigate('admin')} 
          className={`flex-none text-[10px] uppercase px-3 py-1 font-black transition-all cursor-pointer border-2 ${
            currentView === 'admin' 
              ? 'bg-brand-pink text-white border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]' 
              : 'bg-white border-transparent text-stone-600 hover:bg-stone-100'
          }`}
        >
          <span>관리자</span>
        </button>
      </div>

    </header>
  );
}
