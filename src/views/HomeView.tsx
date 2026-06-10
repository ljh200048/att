import React, { useState, useRef } from 'react';
import { 
  Heart, 
  Instagram, 
  ArrowRight,
  Upload, 
  X, 
  Sparkles,
  Camera,
  CheckCircle2,
  Send,
  Plus
} from 'lucide-react';
import { Product, User } from '../types';
import ProductCard from '../components/ProductCard';

interface HomeViewProps {
  products: Product[];
  onNavigate: (view: string, productId?: string, category?: string) => void;
  currentUser?: User | null;
}

export default function HomeView({ products, onNavigate, currentUser }: HomeViewProps) {
  
  // Custom uploaded style photos (Rule 8: user-uploaded photos only!)
  const [stylePhotos, setStylePhotos] = useState<Array<{ id: string; userTag: string; items: string; bg: string; sticker: string; stickerColor: string; customImg?: string }>>([
    { id: 'st_1', userTag: '@att_girl_99', items: '핫핑크 아크릴 하트', bg: 'bg-[#FF1493]/10', sticker: '♥', stickerColor: 'text-[#FF1493]' },
    { id: 'st_2', userTag: '@jelly_beanie', items: '젤리 곰돌이 세트', bg: 'bg-[#00BFFF]/10', sticker: 'ʕ·͡·ʔ', stickerColor: 'text-[#00BFFF]' },
    { id: 'st_3', userTag: '@cap_stitcher', items: '블루 스타 코튼 와펜', bg: 'bg-[#39FF14]/15', sticker: '★', stickerColor: 'text-[#39FF14]' },
    { id: 'st_4', userTag: '@pocket_cherry', items: '네온 라임 체리 키참', bg: 'bg-[#FEE500]/20', sticker: '☀', stickerColor: 'text-amber-500' }
  ]);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadFile, setUploadFile] = useState<string | null>(null);
  const [uploadUserTag, setUploadUserTag] = useState('@my_att_look');
  const [uploadGoodsTag, setUploadGoodsTag] = useState('핫핑크 하트 볼체인');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) convertToBase64(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) convertToBase64(file);
  };

  const convertToBase64 = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setUploadFile(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUploadSubmit = () => {
    if (!uploadFile) return;
    const newStyle = {
      id: `st_u_${Date.now()}`,
      userTag: uploadUserTag,
      items: uploadGoodsTag,
      bg: 'bg-white',
      sticker: '♥',
      stickerColor: 'text-[#FF1493]',
      customImg: uploadFile
    };
    setStylePhotos(prev => [newStyle, ...prev]);
    setUploadFile(null);
    setShowUploadModal(false);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 4500);
  };

  // Split products for section rendering
  const keyrings = products.filter(p => p.category === 'keyring');
  const wappens = products.filter(p => p.category === 'wappen');

  return (
    <div id="home-view-container" className="flex flex-col gap-12 md:gap-20 pb-20 select-none bg-[#FFFDF0]">
      
      {/* 1. HERO BANNER: STREET NEO-BRUTALIST HERO FRAME (Rule 1, 2, 6, 7 & 17) */}
      <section id="hero-neo-grid" className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2 md:pt-4">
        
        {/* Left Side Big Sticker Box: Title "ATTACH YOUR MOOD" */}
        <div className="lg:col-span-8 bg-white border-4 border-black p-8 md:p-12 flex flex-col justify-between relative shadow-[8px_8px_0px_rgba(0,0,0,1)] text-left">
          
          {/* Neon mini accent tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="bg-brand-pink text-white border-2 border-black font-black text-[10px] px-3 py-1 tracking-widest uppercase transform -rotate-2 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              att. OFFICIAL
            </span>
            <span className="bg-brand-lime text-black border-2 border-black font-brand-black text-[10px] px-3 py-1 tracking-widest uppercase transform rotate-1 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              Y2K STREET MOOD
            </span>
            <span className="bg-brand-blue text-black border-2 border-black font-black text-[10px] px-3 py-1 tracking-widest uppercase transform -rotate-1 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              CUSTOM WAFFENS & KEYRINGS;
            </span>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            {/* Rule 6: Main Phrase */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans text-black leading-none uppercase font-black tracking-tighter">
              ATTACH<br />
              <span className="text-brand-pink relative inline-block transform -rotate-1">
                YOUR MOOD
                <span className="absolute left-0 bottom-1 w-full h-3 bg-brand-lime/70 -z-10" />
              </span>
            </h1>

            {/* Rule 7: Sub Phrase */}
            <p className="text-sm md:text-base font-bold text-stone-800 leading-relaxed max-w-xl mt-6 border-l-4 border-brand-blue pl-4">
              키링과 와펜으로 나의 취향을 붙이다. 가방, 파우치, 옷, 모자 어디에든 att를 더해보세요.
            </p>
          </div>

          {/* Direct CTA Buttons Grid (Rule 13: Instagram & DM order) */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <button
              onClick={() => onNavigate('custom')}
              className="cursor-pointer bg-brand-pink hover:bg-black text-white hover:text-white font-black text-xs md:text-sm uppercase tracking-widest px-8 py-4.5 border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4.5 h-4.5 text-brand-lime fill-brand-lime animate-spin-slow" />
              <span>실시간 1:1 커스텀 주문하기</span>
            </button>

            <a
              href="https://www.instagram.com/att_attached/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-blue hover:bg-brand-lime hover:text-black text-black font-black text-xs md:text-sm uppercase tracking-widest px-8 py-4.5 border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Instagram className="w-4.5 h-4.5 text-brand-pink" />
              <span>인스타 DM 간편 주문상담</span>
            </a>
          </div>

          {/* Absolute corner decal widget */}
          <div className="absolute right-4 top-4 bg-brand-lime border-2 border-black px-3 py-1 font-mono text-[10px] font-black uppercase text-black rotate-12">
            ONLY REAL STYLE!
          </div>

        </div>

        {/* Right Side Visual Box (Purely CSS / SVG visual stickers obeying Rule 8) */}
        <div className="lg:col-span-4 bg-brand-black border-4 border-black p-8 flex flex-col justify-between text-left relative shadow-[8px_8px_0px_rgba(0,0,0,1)] text-[#FFFDF0]">
          
          <div className="border-b-2 border-white/20 pb-4">
            <p className="text-[10px] font-mono font-black text-brand-lime uppercase tracking-widest">BRAND philosophy</p>
            <h3 className="text-xl font-black mt-1 text-white">어태치의 의미</h3>
            <p className="text-[11px] font-bold text-stone-300 mt-2 leading-relaxed">
              att는 <span className="text-brand-pink underline font-black">attach(어태치)</span>에서 온 이름으로, 나의 지루한 일상 소품에 취향(taste)과 무드(mood)를 수제로 붙여 영구히 간직하는 감성을 선사합니다.
            </p>
          </div>

          {/* Interactive CSS Sticker preview card */}
          <div className="my-6 bg-white text-black p-4 border-3 border-black relative transform rotate-2 shadow-[4px_4px_0px_rgb(255,20,147)] hover:rotate-0 transition-transform">
            <span className="absolute -top-3.5 -left-3.5 bg-black text-[#FFFDF0] font-bold px-2 py-0.5 text-[9px] border border-black uppercase">
              att. STICKER
            </span>
            <div className="flex items-center gap-4 py-2">
              <div className="w-14 h-14 bg-brand-lime rounded-full border-2 border-black flex items-center justify-center font-black text-xl text-black">
                ☻
              </div>
              <div>
                <p className="text-xs font-black">My Customized Attacher</p>
                <p className="text-[10px] font-bold text-stone-500">가방, 에어팟, 비니 전천후 매치</p>
              </div>
            </div>
          </div>

          {/* Bottom links */}
          <div className="flex justify-between items-center text-[11px] font-mono font-black text-brand-lime">
            <span>STREET FITTING PREVIEW</span>
            <span>★★★★★</span>
          </div>

        </div>

      </section>

      {/* 2. CATEGORIES SELECTOR TABS RAIL (Rule 9 - Separate keyring and wappen) */}
      <section id="category-tabs" className="w-full text-left">
        <div className="bg-black text-[#FFFDF0] p-4 border-4 border-black shadow-[6px_6px_0px_rgba(255,20,147,1)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <span className="text-[10px] font-mono bg-brand-lime text-black font-black px-2 py-0.5 uppercase">카테고리 직항</span>
            <h3 className="text-lg font-black tracking-tight mt-1">원하는 커스텀 상품군을 골라보세요</h3>
          </div>

          <div className="flex flex-wrap gap-3 w-full sm:w-auto">
            <button
              onClick={() => onNavigate('shop', undefined, 'keyring')}
              className="flex-1 sm:flex-initial cursor-pointer bg-white text-black hover:bg-brand-pink hover:text-white font-black px-6 py-2.5 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-y-0.5 uppercase tracking-wider text-center"
            >
              🔑 키링 전상품 리스트 ({keyrings.length})
            </button>
            <button
              onClick={() => onNavigate('shop', undefined, 'wappen')}
              className="flex-1 sm:flex-initial cursor-pointer bg-white text-black hover:bg-brand-lime font-black px-6 py-2.5 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] active:translate-y-0.5 uppercase tracking-wider text-center"
            >
              🧵 와펜 전상품 리스트 ({wappens.length})
            </button>
          </div>
        </div>
      </section>

      {/* 3. KEYRINGS CATALOG SHOWCASE (Rule 9 - Keyring collection, Rule 18 - Cards style) */}
      <section id="keyring-showcase" className="text-left w-full">
        <div className="border-b-4 border-black pb-2 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end">
          <div>
            <span className="text-[10px] text-white bg-black px-2.5 py-1 font-mono font-black uppercase shadow-[2px_2px_0px_rgba(255,14,147,1)]">
              att KEYRINGS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight mt-2.5 uppercase">
              오리지널 아크릴 & 수제 키링 컬렉션
            </h2>
          </div>
          <button 
            onClick={() => onNavigate('shop', undefined, 'keyring')}
            className="cursor-pointer text-xs font-black text-brand-pink hover:underline uppercase flex items-center gap-1.5 mt-2 sm:mt-0"
          >
            <span>전체 키링 보러가기</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
        </div>

        {/* Grid featuring Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {keyrings.map(prod => (
            <ProductCard 
              key={prod.id}
              product={prod}
              onClick={() => onNavigate('detail', prod.id)}
            />
          ))}
        </div>
      </section>

      {/* 4. WAPPENS CATALOG SHOWCASE (Rule 9 - Wappen collection, Rule 18 - Cards style) */}
      <section id="wappen-showcase" className="text-left w-full">
        <div className="border-b-4 border-black pb-2 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end">
          <div>
            <span className="text-[10px] text-white bg-black px-2.5 py-1 font-mono font-black uppercase shadow-[2px_2px_0px_rgba(0,191,255,1)]">
              att WAPPENS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight mt-2.5 uppercase">
              Y2K 직편사 자수 와펜 패치 공방
            </h2>
          </div>
          <button 
            onClick={() => onNavigate('shop', undefined, 'wappen')}
            className="cursor-pointer text-xs font-black text-brand-blue hover:underline uppercase flex items-center gap-1.5 mt-2 sm:mt-0"
          >
            <span>전체 와펜 보러가기</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
        </div>

        {/* Grid featuring Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wappens.map(prod => (
            <ProductCard 
              key={prod.id}
              product={prod}
              onClick={() => onNavigate('detail', prod.id)}
            />
          ))}
        </div>
      </section>

      {/* 5. USER-UPLOADED INSTAGRAM THE STYLE EDIT GRID (Rule 8, 13 & 17) */}
      <section id="style-edit-section" className="w-full text-left bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_rgba(0,0,0,1)]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b-2 border-black pb-4 mb-6">
          <div className="text-left">
            <span className="text-[10px] font-mono bg-brand-lime text-black font-black px-2.5 py-0.5 uppercase">
              att STREET STYLING
            </span>
            <h2 className="text-xl md:text-2xl font-black text-black tracking-tight mt-1 uppercase">
              어태치 힙스터즈 라이프 스타일 착샷
            </h2>
            <p className="text-xs text-stone-500 font-bold mt-1">
              * 오직 사용자들이 직접 업로드해 실시간 공유한 커뮤니티 사진들로만 작동합니다!
            </p>
          </div>

          <button
            onClick={() => {
              if (!currentUser || currentUser.role !== 'admin') {
                alert('🔒 서비스 디자인 정책상 착샷 보드 업로드 및 이미지 변경 권한은 오직 관리자 계정(admin@att.com)에 독점 부여되어 있습니다.');
                return;
              }
              setShowUploadModal(true);
            }}
            className="cursor-pointer bg-brand-pink text-white hover:bg-black font-black text-xs uppercase px-5 py-2.5 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] mt-3 sm:mt-0 flex items-center gap-1.5"
          >
            <Camera className="w-4 h-4" />
            <span>내 착용사진 업로드</span>
          </button>
        </div>

        {/* Community style photo grid - Rule 8 Compliant, no unsplash, only stylized CSS placeholders or user uploaded */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stylePhotos.map((photo) => (
            <div 
              key={photo.id} 
              className="group relative border-2 border-black bg-[#FFFDF0] overflow-hidden aspect-square flex flex-col justify-end text-left cursor-pointer shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              {/* If actual uploaded base64 image exists, render it. Otherwise, render beautiful CSS sticker-vibe vectors (Rule 8) */}
              {photo.customImg ? (
                <img 
                  src={photo.customImg} 
                  alt={photo.items} 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className={`absolute inset-0 ${photo.bg} flex flex-col items-center justify-center p-4 border-b border-black`}>
                  <div className={`text-4xl font-black select-none ${photo.stickerColor} transform group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300`}>
                    {photo.sticker}
                  </div>
                  <div className="mt-4 bg-black text-[#FFFDF0] text-[8px] font-black px-1.5 py-0.5 border border-black uppercase rotate-[-6deg]">
                    {photo.items}
                  </div>
                </div>
              )}
              
              {/* Overlapping tag at top-left corner */}
              <div className="absolute top-2 left-2 z-10 bg-brand-lime border border-black text-black font-black text-[8px] px-1.5 py-0.5 shadow-md">
                <span>{photo.userTag}</span>
              </div>

              {/* Instagram icon at bottom-right of photo */}
              <div className="absolute bottom-2 right-2 text-white z-10 bg-brand-pink p-1 border border-black shadow-[1px_1px_0px_black]">
                <Instagram className="w-3 h-3 text-white" />
              </div>

              {/* Overlay with details */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-3 text-white">
                <p className="text-[10px] font-black text-brand-lime uppercase tracking-widest leading-none">att. ATTACHER LOOK</p>
                <p className="text-xs font-bold truncate mt-1">{photo.items} 코디 픽</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. INSTAGARM BRAND AND DM REDIRECT CALLOUT BENTO CARD (Rule 13) */}
      <section id="dm-redirect-cta" className="w-full text-left grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-[#00BFFF]/10 border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_rgba(0,0,0,1)] relative flex flex-col justify-between">
          <div>
            <span className="bg-black text-[#FFFDF0] text-[8.5px] font-mono px-2 py-0.5 border border-black font-black uppercase">
              Instagram Link Shortcuts
            </span>
            <h3 className="text-xl font-black text-black mt-4 uppercase">att 오리지널 계정 팔로우</h3>
            <p className="text-xs font-bold text-stone-750 mt-2 leading-relaxed">
              신규 에디션 릴리즈, 플리마켓 현장 스케치, 다른 스트릿 힙스터들의 키링 배치를 가장 신선하게 받아보실 수 있습니다.
            </p>
          </div>
          <a
            href="https://www.instagram.com/att_attached/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit cursor-pointer bg-white hover:bg-black hover:text-white text-black font-black text-xs uppercase px-5 py-2.5 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all mt-6 flex items-center gap-1.5"
          >
            <Instagram className="w-4 h-4 text-brand-pink" />
            <span>@att_mood 공식 채널 이동</span>
          </a>
        </div>

        <div className="bg-[#FF1493]/10 border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_rgba(0,0,0,1)] relative flex flex-col justify-between">
          <div>
            <span className="bg-[#FF1493] text-white text-[8.5px] font-mono px-2 py-0.5 border border-black font-black uppercase">
              Live DM Consultation
            </span>
            <h3 className="text-xl font-black text-black mt-4 uppercase">인스타 DM으로 제작 요청하기</h3>
            <p className="text-xs font-bold text-stone-750 mt-2 leading-relaxed">
              자수가 들어갈 도안 사진을 들고 오시거나, 사이즈/수량이 대량일 경우 인스타 메신저 DM 창을 주시면 1분 이내에 상담 가이드해 드립니다.
            </p>
          </div>
          <a
            href="https://www.instagram.com/att_attached/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit cursor-pointer bg-brand-lime hover:bg-black hover:text-white text-black font-black text-xs uppercase px-5 py-2.5 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all mt-6 flex items-center gap-1.5"
          >
            <Send className="w-4 h-4" />
            <span>실시간 DM 주문 메신저 켜기</span>
          </a>
        </div>

      </section>

      {/* 7. QUICK ACCESS CREATIVE STYLE UPLOAD MODAL */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-none border-4 border-black max-w-lg w-full overflow-hidden shadow-[8px_8px_0px_rgba(0,0,0,1)] relative p-6 animate-scaleIn text-left text-black">
            
            <button 
              onClick={() => setShowUploadModal(false)}
              className="absolute top-4 right-4 text-stone-500 hover:text-black cursor-pointer bg-stone-100 p-1 border-2 border-black"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-md sm:text-lg font-black text-black tracking-widest uppercase mb-1.5 flex items-center gap-2">
              <Camera className="w-5 h-5 text-brand-pink" />
              <span>나의 att 착용 샷 공유</span>
            </h3>
            <p className="text-xs text-stone-500 font-bold mb-4">
              키링 및 와펜을 붙여 스타일리시하게 코디한 나만의 가방이나 옷 메칭 사진을 올려주세요.
            </p>

            <div 
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => {
                if (!currentUser || currentUser.role !== 'admin') {
                  alert('🔒 서비스 디자인 정책상 착샷 보드 업로드 및 이미지 변경 권한은 오직 관리자 계정(admin@att.com)에 독점 부여되어 있습니다.');
                  return;
                }
                fileInputRef.current?.click();
              }}
              className="border-4 border-dashed border-stone-300 hover:border-brand-pink bg-stone-50 p-6 flex flex-col items-center justify-center cursor-pointer text-center gap-3 transition-colors mb-4 relative min-h-[160px]"
            >
              {uploadFile ? (
                <div className="absolute inset-0 w-full h-full p-2 bg-stone-100">
                  <img src={uploadFile} alt="Preview custom styling" className="w-full h-full object-contain" />
                </div>
              ) : (
                <>
                  <Upload className="w-8 h-8 text-stone-400 group-hover:text-black mt-2" />
                  <div>
                    <p className="text-xs font-black">클릭하거나 사진 파일을 여기로 끌어다 놓으세요</p>
                    <p className="text-[10px] text-stone-400 font-bold mt-1">이메일/로컬 저장 장치 이미지 업로드 전용</p>
                  </div>
                </>
              )}
            </div>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange}
              accept="image/*"
              className="hidden" 
            />

            <div className="grid grid-cols-2 gap-3 mb-4 text-xs font-bold">
              <div>
                <label className="block text-[10px] uppercase font-black text-stone-700 mb-1">인스타 아이디 / 필명</label>
                <input 
                  type="text" 
                  value={uploadUserTag}
                  onChange={(e) => setUploadUserTag(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border-2 border-black outline-none font-bold" 
                  placeholder="@your_insta"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-black text-stone-700 mb-1">매치 코디한 att 상품명</label>
                <input 
                  type="text" 
                  value={uploadGoodsTag}
                  onChange={(e) => setUploadGoodsTag(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border-2 border-black outline-none font-bold" 
                  placeholder="예: 핫핑크 체인키링"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowUploadModal(false)}
                className="cursor-pointer bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold p-3 text-xs uppercase text-center border-2 border-transparent"
              >
                취소
              </button>
              <button
                onClick={handleUploadSubmit}
                disabled={!uploadFile}
                className={`cursor-pointer font-black p-3 text-xs uppercase text-center border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] ${
                  uploadFile 
                    ? 'bg-brand-lime text-black hover:bg-black hover:text-[#FFFDF0]' 
                    : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                }`}
              >
                착샷 게시판 등재하기
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Success toast */}
      {showSuccessToast && (
        <div className="fixed bottom-6 left-6 z-50 bg-black text-brand-lime border-4 border-brand-lime p-4 flex items-center gap-3 shadow-[6px_6px_0px_rgba(0,0,0,1)] animate-bounce text-left">
          <Sparkles className="w-5 h-5 text-brand-pink fill-brand-pink animate-spin-slow" />
          <div className="text-xs">
            <span className="text-[#FFFDF0] font-black block leading-none">게시 성공 (UPLOAD COMPLETE)</span>
            <span className="text-[11px] text-[#FFFDF0]/90 font-bold mt-1 inline-block">나만의 스타일 착샷이 메인 커뮤니티 갤러리에 추가되었습니다!</span>
          </div>
        </div>
      )}

    </div>
  );
}
