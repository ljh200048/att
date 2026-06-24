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
    { en: 'About Us', kr: '회사소개', view: 'home', scrollTarget: 'about-section' },
    { en: 'RECRUIT', kr: '인재채용', view: 'home', scrollTarget: 'recruit-section' },
    { en: 'SHOP', kr: '스토어', view: 'shop', category: 'all' },
    { en: 'EVENT', kr: '와펜 체험 이벤트', view: 'event' },
    { en: 'CONTACT', kr: '고객지원', view: 'inquiry' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-stone-200 select-none font-sans">
      
      {/* Top Utility Bar - Very minimal & elegant */}
      <div className="w-full bg-stone-50 border-b border-stone-100 py-1.5 px-6 flex items-center justify-between text-[11px] text-stone-500 tracking-wider">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-stone-600">NO.1 FASHION & LIFESTYLE SELECT SHOP</span>
        </div>

        <div className="flex items-center gap-5">
          {currentUser ? (
            <div className="flex items-center gap-3">
              <span className="text-stone-800 font-bold hover:underline cursor-pointer" onClick={() => onNavigate('mypage')}>
                {currentUser.name} 님
              </span>
              <span className="text-stone-300">|</span>
              <button 
                onClick={onLogout} 
                className="cursor-pointer text-[10px] font-semibold text-stone-500 hover:text-black uppercase"
              >
                LOGOUT
              </button>
            </div>
          ) : (
            <button 
              onClick={() => onNavigate('login')} 
              className="cursor-pointer text-[10px] font-semibold text-stone-500 hover:text-black uppercase"
            >
              LOGIN / JOIN
            </button>
          )}

          {/* Admin toggle if customer is admin */}
          {currentUser?.role === 'admin' && (
            <button
              onClick={() => onNavigate('admin')}
              className={`cursor-pointer text-[10px] font-semibold tracking-wider hover:text-black uppercase flex items-center gap-1 ${
                currentView === 'admin' ? 'text-black font-extrabold' : 'text-stone-400'
              }`}
            >
              ADMIN
            </button>
          )}
        </div>
      </div>

      {/* Main navigation header */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-10 py-5 flex items-center justify-between gap-4">
        
        {/* Brand Logo - Spaced out modern typography */}
        <button 
          onClick={() => onNavigate('home')} 
          className="group cursor-pointer focus:outline-none flex items-center"
        >
          <div className="font-sans font-extrabold text-2xl md:text-3xl tracking-[0.2em] text-black uppercase transition-all hover:opacity-85">
            A T T .
          </div>
        </button>

        {/* Desktop Navigation Menu (Wonderplace Layout) */}
        <nav className="hidden lg:flex items-center gap-10">
          {menuItems.map((item) => {
            const isActive = currentView === item.view;
            return (
              <button
                key={item.en}
                onClick={() => {
                  onNavigate(item.view, undefined, item.category);
                  if (item.scrollTarget) {
                    setTimeout(() => {
                      const el = document.getElementById(item.scrollTarget);
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                  }
                }}
                className={`cursor-pointer font-bold text-[13.5px] tracking-[0.12em] transition-colors relative py-1 uppercase ${
                  isActive 
                    ? 'text-black font-black' 
                    : 'text-stone-600 hover:text-black'
                }`}
              >
                <span>{item.en}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-black" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right utilities rail */}
        <div className="flex items-center gap-4">
          
          {/* Quick Search */}
          <div className="relative hidden md:flex items-center border-b border-stone-300 py-1 px-1 hover:border-black transition-colors">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleSearchKeyPress}
              placeholder="SEARCH"
              className="bg-transparent text-xs font-semibold outline-none w-28 text-black placeholder-stone-400 uppercase tracking-widest mr-1"
            />
            {searchText && (
              <button onClick={() => setSearchText('')} className="p-0.5 text-stone-400 hover:text-black">
                <X className="w-3 h-3" />
              </button>
            )}
            <Search className="w-3.5 h-3.5 text-stone-800" />
          </div>

          {/* Cart Icon */}
          <button 
            onClick={() => onNavigate('mypage')} 
            className="p-1.5 text-stone-700 hover:text-black transition-colors relative cursor-pointer"
            title="장바구니 및 주문결제"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[15px] h-[15px] px-1 rounded-full bg-black text-[8px] font-bold text-white flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile menu trigger */}
          <button 
            onClick={() => onNavigate('shop')}
            className="lg:hidden p-1.5 text-stone-700 hover:text-black cursor-pointer"
          >
            <div className="w-5 h-[2px] bg-black mb-1.5"></div>
            <div className="w-5 h-[2px] bg-black mb-1.5"></div>
            <div className="w-5 h-[2px] bg-black"></div>
          </button>

        </div>

      </div>

      {/* Mobile Sub Navigation (Clean, minimal line) */}
      <div className="lg:hidden flex items-center justify-around h-11 bg-stone-50 border-t border-stone-200 overflow-x-auto px-4 text-[11px] font-bold tracking-wider uppercase no-scrollbar">
        {menuItems.map((item) => {
          const isActive = currentView === item.view;
          return (
            <button 
              key={item.en}
              onClick={() => {
                onNavigate(item.view, undefined, item.category);
                if (item.scrollTarget) {
                  setTimeout(() => {
                    const el = document.getElementById(item.scrollTarget);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 100);
                }
              }} 
              className={`flex-none py-1.5 px-2 cursor-pointer ${
                isActive ? 'text-black border-b-2 border-black font-extrabold' : 'text-stone-500'
              }`}
            >
              <span>{item.en}</span>
            </button>
          );
        })}
      </div>

    </header>
  );
}
