import React, { useState } from 'react';
import { ArrowLeft, ShoppingBag, Heart, Check, PlaneTakeoff, RefreshCcw, Info, Star, HelpCircle, Layers, ShieldAlert } from 'lucide-react';
import { Product, CartItem, User } from '../types';
import { compressImage } from '../utils';

interface DetailViewProps {
  product: Product;
  onNavigate: (view: string, productId?: string, category?: string) => void;
  onAddToCart: (item: Omit<CartItem, 'id'>) => void;
  onBuyNow: (item: Omit<CartItem, 'id'>) => void;
  currentUser: User | null;
  onUpdateProduct: (product: Product) => void;
}

export default function DetailView({
  product,
  onNavigate,
  onAddToCart,
  onBuyNow,
  currentUser,
  onUpdateProduct,
}: DetailViewProps) {
  const isWappen = product.category === 'wappen';
  
  // Option Selectors (using defaults or custom options)
  const [selectedColor, setSelectedColor] = useState<string>(product.colors?.[0] || '핫핑크');
  const [selectedOption, setSelectedOption] = useState<string>(product.options?.[0] || 'M (표준 사이즈)');
  const [quantity, setQuantity] = useState<number>(1);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isAddedSuccess, setIsAddedSuccess] = useState<boolean>(false);

  // Wappen Specific options defined for Rule 10
  const wappenEmbroideryMethod = "고밀도 100% 직수 자수 가공 (Tatami Stitch Line)";
  const wappenAttachmentMethod = "열전사 다립질 밀착 (Hot-Ironing) / 후면 옷핀 가공 선택 가능";
  const wappenLeadTime = "핸드메이드 맞춤가공 특성 상 입금 확인 후 영업일 기준 2~4일 소요";
  const wappenUsageLocation = "에코백/백팩 가방, 파우치 필통, 티셔츠/청재킷 옷, 캠프캡/비니 모자";

  const totalPrice = product.price * quantity;

  // Handle flow triggers
  const handleAddToCart = () => {
    onAddToCart({
      productId: product.id,
      name: `${product.name} [색상: ${selectedColor} / 옵션: ${selectedOption}]`,
      price: product.price,
      image: product.images[0] || '', 
      selectedColor,
      selectedOption,
      quantity,
    });
    
    setIsAddedSuccess(true);
    setTimeout(() => setIsAddedSuccess(false), 2500);
  };

  const handleBuyNow = () => {
    onBuyNow({
      productId: product.id,
      name: `${product.name} [색상: ${selectedColor} / 옵션: ${selectedOption}]`,
      price: product.price,
      image: product.images[0] || '',
      selectedColor,
      selectedOption,
      quantity,
    });
  };

  return (
    <div id="product-detail-layout" className="flex flex-col gap-10 pb-16 bg-[#FFFDF0] select-none text-left">
      
      {/* 1. Return Tracker Link */}
      <div className="flex items-center justify-between border-b-4 border-black pb-3">
        <button 
          onClick={() => onNavigate('shop')}
          className="flex items-center gap-1.5 text-xs font-black text-black hover:text-brand-pink cursor-pointer group uppercase tracking-widest bg-white border-2 border-black px-4 py-2 shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform text-brand-pink" />
          <span>어태치 전상품 카탈로그 돌아가기</span>
        </button>
      </div>

      {/* PURCHASE FLOW ROADMAP (Rule 14 Demonstration) */}
      <div className="bg-black text-[#FFFDF0] p-4 border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] select-none">
        <p className="text-[10px] font-mono font-black text-brand-lime uppercase tracking-widest text-center md:text-left">
          FLOW DIAGRAM :: att EASY BUY PATH
        </p>
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-y-2 gap-x-2.5 mt-2.5 text-[10px] font-black">
          <span className="bg-brand-pink text-white px-2 py-1 border border-black rotate-[-2deg]">1. 상품 보기</span>
          <span className="text-stone-600">→</span>
          <span className="bg-brand-blue text-black px-2 py-1 border border-black rotate-[1deg] font-extrabold animate-pulse">2. 옵션 상세선택 (현재 단계)</span>
          <span className="text-stone-600">→</span>
          <span className="bg-[#FFFDF0] text-black px-2 py-1 border border-black">3. 장바구니 / 바로구매 누르기</span>
          <span className="text-stone-600">→</span>
          <span className="bg-[#FFFDF0] text-black px-2 py-1 border border-black">4. 주문 정보 및 수령지 입력</span>
          <span className="text-stone-600">→</span>
          <span className="bg-brand-lime text-black px-2 py-1 border border-black rotate-[-1deg]">5. 결제 및 제작안내 확인</span>
        </div>
      </div>

      {/* 2. Main Product Config Area */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Side: Real custom inline SVG product vector illustration (Rule 8 compliant) */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <div className="sticky top-28">
            <div className="border-4 border-black bg-white p-6 relative pb-[100%] shadow-[6px_6px_0px_rgba(0,0,0,1)]">
              {product.images && product.images.length > 0 ? (
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 object-contain p-8 w-full h-full transform hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-xs font-mono font-black text-stone-400 bg-neutral-100">
                  NO ATTACHER IMAGE AVAILABLE
                </div>
              )}
            </div>
            
            <div className="bg-[#FFFDF0] border-4 border-black p-4 mt-4 text-center transform -rotate-1 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              <p className="text-[10px] text-black font-black tracking-wider uppercase">
                ⚙ att. HANDMADE LAB. :: 100% 수작업 맞춤형 일러스트 기공
              </p>
            </div>

            {/* Admin-only Image Modification tool */}
            {currentUser && currentUser.role === 'admin' && (
              <div className="bg-amber-50 border-4 border-black p-5 mt-4 shadow-[4px_4px_0px_rgba(0,0,0,1)] text-left flex flex-col gap-3">
                <div className="flex items-center gap-1.5 border-b-2 border-black pb-1.5">
                  <span className="text-xs">🛠️</span>
                  <span className="text-xs font-black text-black uppercase tracking-wider">관리자 전용: 상품 대표 이미지 교체</span>
                </div>
                
                <p className="text-[10px] text-stone-600 font-bold leading-normal">
                  * 현재 로그인된 계정은 관리자 권한을 보유하고 있습니다. 상품 실물 촬영 파일을 업로드하거나, 외부 이미지 URL 주소를 직접 입력하여 실시간으로 변경을 적용할 수 있습니다.
                </p>

                <div className="flex flex-col gap-2">
                  {/* File Upload Option */}
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-black">방법 1: 컴퓨터에서 이미지 파일 업로드</span>
                    <label className="cursor-pointer flex items-center justify-center gap-1.5 bg-white hover:bg-stone-50 text-black font-black text-xs py-2.5 px-4 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all text-center">
                      <span>📁 이미지 파일 선택하기</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => {
                          const files = e.target.files;
                          if (files && files[0]) {
                            const reader = new FileReader();
                            reader.onloadend = async () => {
                              const compressed = await compressImage(reader.result as string);
                              onUpdateProduct({
                                ...product,
                                images: [compressed]
                              });
                              alert('상품 이미지 파일이 성공적으로 교체 저장되었습니다! 🎉');
                            };
                            reader.readAsDataURL(files[0]);
                          }
                        }}
                      />
                    </label>
                  </div>

                  {/* Divider line */}
                  <div className="flex items-center gap-2 py-1">
                    <span className="h-[1px] bg-black/10 flex-1"></span>
                    <span className="text-[9px] font-black text-stone-400">OR</span>
                    <span className="h-[1px] bg-black/10 flex-1"></span>
                  </div>

                  {/* URL Input Option */}
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-black">방법 2: 외부 이미지 URL 직접 입력</span>
                    <div className="flex gap-2">
                      <input 
                        type="text"
                        placeholder="https://example.com/image.png ..."
                        value={product.images[0] || ''}
                        onChange={(e) => {
                          onUpdateProduct({
                            ...product,
                            images: e.target.value ? [e.target.value] : []
                          });
                        }}
                        className="flex-1 text-xs p-2 border-2 border-black bg-white font-mono text-stone-800 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => alert('입력하신 이미지 URL이 실시간 반영되었습니다! ✓')}
                        className="bg-black text-white hover:bg-stone-900 font-black text-xs px-4 py-2 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer"
                      >
                        적용
                      </button>
                    </div>
                  </div>

                  {product.images && product.images.length > 0 && (
                    <div className="pt-1.5 border-t border-dashed border-black/10 flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          onUpdateProduct({
                            ...product,
                            images: []
                          });
                          alert('상품 이미지가 성공적으로 삭제되었습니다! ✓');
                        }}
                        className="text-red-500 hover:underline text-[10px] font-bold cursor-pointer flex items-center gap-1"
                      >
                        <span>이미지 삭제하기 (초기화)</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Options Custom Form (Rule 10 focus) */}
        <div className="lg:col-span-6 bg-white border-4 border-black p-6 md:p-8 flex flex-col gap-6 shadow-[8px_8px_0px_rgba(0,0,0,1)]">
          
          {/* Header metadata */}
          <div className="border-b-2 border-black pb-5 text-left">
            <span className="text-[10px] bg-black text-brand-lime font-black px-3 py-1.5 border border-black uppercase tracking-wider">
              {product.category === 'keyring' ? '🔑 KEYRING EDITION' : '🧵 WAPPEN EDITION'}
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-black tracking-tight font-sans mt-3 uppercase">
              {product.name}
            </h1>
            <p className="text-xs md:text-sm text-stone-600 leading-relaxed font-bold mt-2">
              {product.description}
            </p>

            <div className="flex items-center justify-between mt-4 flex-wrap gap-2">
              <div className="flex items-baseline gap-2.5">
                <span className="text-lg md:text-2xl font-black text-black font-mono">
                  ₩{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-stone-400 line-through font-bold">
                    ₩{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1 text-[11px] font-black text-black bg-brand-lime/25 border-2 border-black px-2.5 py-1">
                <Star className="w-4 h-4 fill-[#FEE500] text-black stroke-2" />
                <span>평점: {product.rating.toFixed(1)}</span>
                <span className="text-stone-500 font-bold ml-1">({product.reviewCount}개 후기)</span>
              </div>
            </div>
          </div>

          {/* Color Selection (Rule 10: 색상) */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black text-black uppercase tracking-wider flex items-center justify-between">
              <span>🎨 색상 옵션 선택</span>
              <span className="text-[10px] text-brand-pink font-black">현재 픽: {selectedColor}</span>
            </label>
            <div className="flex flex-wrap gap-2 select-none">
              {product.colors && product.colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`cursor-pointer text-xs font-black px-4 py-2.5 rounded-none border-2 transition-all ${
                    selectedColor === color 
                      ? 'bg-black border-black text-[#FFFDF0] shadow-[2px_2px_0px_rgba(255,14,147,1)]' 
                      : 'bg-white border-stone-200 hover:border-black text-stone-700'
                  }`}
                >
                  <span>{color}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Size Options (Rule 10: 사이즈) */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black text-black uppercase tracking-wider flex items-center justify-between">
              <span>📏 규격/포장 방식 선택</span>
              <span className="text-[10px] text-brand-blue font-black">현재 픽: {selectedOption}</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              {product.options && product.options.map(opt => (
                <button
                  key={opt}
                  onClick={() => setSelectedOption(opt)}
                  className={`cursor-pointer w-full text-left font-black text-xs p-3 rounded-none border-2 flex items-center justify-between transition-all ${
                    selectedOption === opt 
                      ? 'bg-black border-black text-brand-lime shadow-[2px_2px_0px_rgba(0,191,255,1)]' 
                      : 'bg-white border-stone-250 hover:border-black text-stone-700'
                  }`}
                >
                  <span>{opt}</span>
                  {selectedOption === opt && <Check className="w-4 h-4 text-brand-lime" />}
                </button>
              ))}
            </div>
          </div>

          {/* IF WAPPEN :: DISPLAY SPECIAL SPECIFICATIONS SHEET FOR RULE 10 */}
          {isWappen && (
            <div className="bg-[#00BFFF]/5 border-2 border-black p-4 text-xs font-bold leading-relaxed space-y-2 text-left relative">
              <div className="absolute -top-3.5 right-3 bg-brand-blue text-black border border-black font-black px-2 py-0.5 text-[8.5px] uppercase">
                Wappen Specs
              </div>
              
              <h4 className="text-black font-black text-xs mb-2 leading-none uppercase tracking-wide">
                🧵 와펜 제작 및 구조 데이터 고지 (국내 수직제 기준)
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1.5 text-stone-750 pt-2 border-t border-black/10">
                <p><strong>자수 방식 :</strong> {wappenEmbroideryMethod}</p>
                <p><strong>부착 방식 :</strong> {wappenAttachmentMethod}</p>
                <p><strong>제작 기간 :</strong> {wappenLeadTime}</p>
                <p><strong>사용 위치 :</strong> {wappenUsageLocation}</p>
                <p><strong>기본 정규 규격 :</strong> {product.size}</p>
                <p><strong>갑피 원자재 :</strong> {product.material}</p>
              </div>
            </div>
          )}

          {/* IF KEYRING :: DISPLAY SPECIAL DETAILED SPECS SHEET */}
          {!isWappen && (
            <div className="bg-[#FF1493]/5 border-2 border-black p-4 text-xs font-bold leading-relaxed space-y-2 text-left relative">
              <div className="absolute -top-3.5 right-3 bg-brand-pink text-white border border-black font-black px-2 py-0.5 text-[8.5px] uppercase">
                Keyring Specs
              </div>
              <h4 className="text-black font-black text-xs mb-2 leading-none uppercase tracking-wide">
                🔑 키링 부속 사양 및 자재 배송 데이터 고지
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1.5 text-stone-750 pt-2 border-t border-black/10 text-[11px]">
                <p><strong>재질/소재:</strong> {product.material || '고급 주조 아크릴 및 신주 합금 링'}</p>
                <p><strong>제품 사이즈:</strong> {product.size || '가로 4.5cm x 세로 5cm (체인 약 10cm)'}</p>
                <p><strong>기본 배송비:</strong> ₩{(product.shippingFee || 3000).toLocaleString()} (5만원 이상 무료배송)</p>
                <p><strong>예상 출고 기간:</strong> {product.leadTime || '1~3 영업일 이내 출고 예정'}</p>
                <p><strong>고리 방식:</strong> 서지컬스틸 오링 / 볼체인 마운트 기본가공</p>
                <p><strong>원산지 가공:</strong> 100% att 디자인 스튜디오 수작업 보증</p>
              </div>
            </div>
          )}

          {/* Quantity selector multiplier bar (Rule 10: 수량) */}
          <div className="flex items-center justify-between border-t-2 border-black pt-4">
            <span className="text-xs font-black text-black uppercase">🛒 주문 개수 설정</span>
            <div className="flex items-center gap-1 bg-white p-1 border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 bg-[#FFFDF0] flex items-center justify-center text-xs font-black hover:bg-black hover:text-white transition-colors cursor-pointer"
              >
                -
              </button>
              <span className="text-xs font-black text-black px-4 w-10 text-center">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 bg-[#FFFDF0] flex items-center justify-center text-xs font-black hover:bg-black hover:text-white transition-colors cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          {/* Total Cost Display */}
          <div className="flex items-end justify-between bg-black text-[#FFFDF0] p-4 border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)]">
            <span className="text-xs font-black uppercase text-stone-300">총 결제 예정 금액</span>
            <span className="text-xl font-black font-mono text-brand-lime">
              ₩{totalPrice.toLocaleString()}
            </span>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Heart Favorite Toggle */}
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-3.5 border-2 border-black cursor-pointer transition-all flex items-center justify-center shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] ${
                isFavorite 
                  ? 'bg-brand-pink text-white animate-pulse' 
                  : 'bg-white text-stone-850 hover:bg-stone-50'
              }`}
              title="찜하기_어태치"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-white text-white' : ''}`} />
            </button>

            {/* Add Cart button */}
            <button
              onClick={handleAddToCart}
              className="cursor-pointer flex-1 bg-white hover:bg-black hover:text-brand-lime text-black border-2 border-black py-4 font-black text-xs uppercase flex items-center justify-center gap-1.5 transition-all shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
            >
              <ShoppingBag className="w-4 h-4 text-brand-pink" />
              <span>장바구니 담기</span>
            </button>

            {/* Pay direct button */}
            <button
              onClick={handleBuyNow}
              className="cursor-pointer flex-1 bg-black hover:bg-brand-pink text-[#FFFDF0] py-4 font-black text-xs uppercase flex items-center justify-center gap-1.5 transition-all tracking-wider border-2 border-transparent shadow-[3px_3px_0px_rgba(255,14,147,0.3)] hover:translate-y-0.5"
            >
              <span>바로 주문 및 결제안내 가기</span>
            </button>
          </div>

          {/* Success toast info */}
          {isAddedSuccess && (
            <div className="bg-black text-brand-lime border border-brand-lime text-[11px] p-3.5 flex items-center gap-2 justify-center">
              <Check className="w-4 h-4 text-brand-pink" />
              <span className="text-white font-bold">장바구니에 완벽 추가 완료! 홈 화면 우측 상단 장바구니에서 주문을 완료하세요.</span>
            </div>
          )}

        </div>

      </section>

      {/* 3. Safe delivery guidance banner */}
      <section className="bg-white border-4 border-black p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8 shadow-[6px_6px_0px_rgba(0,0,0,1)] text-left">
        <div className="flex gap-4">
          <div className="w-10 h-10 bg-brand-pink border-2 border-black flex items-center justify-center flex-none transform rotate-3">
            <PlaneTakeoff className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="text-xs font-black text-black uppercase mb-1">우체국 맞춤 특송 (익일배송)</h4>
            <p className="text-[11px] text-stone-600 leading-relaxed font-bold">
              어태치의 모든 굿즈는 한땀씩 정성 가공 후 우체국 소포를 통해 먼지 방지 안심 패킹하여 익일 특송 안전 송장 지원합니다.
            </p>
          </div>
        </div>

        <div className="flex gap-4 md:border-l-2 border-black md:pl-8">
          <div className="w-10 h-10 bg-brand-blue border-2 border-black flex items-center justify-center flex-none transform -rotate-3">
            <RefreshCcw className="w-5 h-5 text-black" />
          </div>
          <div>
            <h4 className="text-xs font-black text-black uppercase mb-1">한땀 수공 파손 긴급케어 쿠폰</h4>
            <p className="text-[11px] text-stone-600 leading-relaxed font-bold">
              배송 중 자수 풀림이나 아크릴 깨짐 문제 접수 시, 수령 후 10일 이내에 즉각 무료 100% 무상 전액 재가습 가공 교환해 드릴 것을 수임합니다.
            </p>
          </div>
        </div>

        <div className="flex gap-4 md:border-l-2 border-black md:pl-8">
          <div className="w-10 h-10 bg-brand-lime border-2 border-black flex items-center justify-center flex-none transform rotate-6">
            <Info className="w-5 h-5 text-black" />
          </div>
          <div>
            <h4 className="text-xs font-black text-black uppercase mb-1">1:1 도안 변경 무료 취소</h4>
            <p className="text-[11px] text-stone-600 leading-relaxed font-bold">
              100% 맞춤 제작 들어가기 전 기공 검수 시에는 인스타 DM 또는 카카오 채널을 통해 자유로운 디자인 및 칼라 변경/취소가 전액 무료로 이뤄집니다.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
