/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ChangeEvent, FormEvent } from 'react';
import { Shield, Plus, Edit, Trash2, Check, RefreshCw, Smartphone, Heart, MessageSquare, Award, Eye, Trash, Upload, Image } from 'lucide-react';
import { Product, Order, CustomOrder, Inquiry, Review, OrderStatus, User } from '../types';
import KeyringPreview from '../components/KeyringPreview';

interface AdminViewProps {
  products: Product[];
  orders: Order[];
  customOrders: CustomOrder[];
  inquiries: Inquiry[];
  reviews: Review[];
  onAddProduct: (product: Omit<Product, 'reviewCount' | 'rating'>) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onUpdateOrderStatus: (orderId: string, status: OrderStatus, trackingNo?: string) => void;
  onUpdateCustomOrderStatus: (customOrderId: string, status: OrderStatus, feedback?: string) => void;
  onAnswerInquiry: (inquiryId: string, reply: string) => void;
  onDeleteReview: (reviewId: string) => void;
  currentUser: User | null;
}

export default function AdminView({
  products,
  orders,
  customOrders,
  inquiries,
  reviews,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
  onUpdateCustomOrderStatus,
  onAnswerInquiry,
  onDeleteReview,
  currentUser,
}: AdminViewProps) {
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="max-w-md mx-auto my-12 p-8 bg-white border-4 border-black text-center shadow-[4px_4px_0px_rgba(0,0,0,1)] flex flex-col items-center gap-4">
        <Shield className="w-12 h-12 text-rose-500" />
        <h2 className="text-xl font-black text-stone-900 uppercase">접근이 제한되었습니다</h2>
        <p className="text-xs text-stone-500 font-semibold leading-relaxed">
          이 영역은 어태치 오피셜 관리자 전용 워크스페이스입니다. <br />
          관리자 계정(<strong>admin@att.com</strong> / 암호 자유)으로 로그인하신 상태에서만 상품 가격, 옵션 및 상품 대표 이미지 업로드 권한이 부여됩니다.
        </p>
      </div>
    );
  }

  // Tabs: 'catalog' | 'orders' | 'customs' | 'inquiries' | 'reviews'
  const [adminTab, setAdminTab] = useState<'catalog' | 'orders' | 'customs' | 'inquiries' | 'reviews'>('orders');

  // Product CRUD states
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form states for Product
  const [prodName, setProdName] = useState<string>('');
  const [prodPrice, setProdPrice] = useState<number>(5000);
  const [prodDesc, setProdDesc] = useState<string>('');
  const [prodCategory, setProdCategory] = useState<Product['category']>('acrylic');
  const [prodColors, setProdColors] = useState<string>('핑크, 블루, 화이트, 퍼플');
  const [prodOptions, setProdOptions] = useState<string>('기본, 글리터 (+500원), 홀로그램 (+800원)');
  const [prodSize, setProdSize] = useState<string>('약 6cm');
  const [prodMaterial, setProdMaterial] = useState<string>('친환경 아크릴, 니켈 마감 고리');
  const [prodLeadTime, setProdLeadTime] = useState<string>('3~5일 소요');
  const [prodImage, setProdImage] = useState<string>('');

  // Surcharging tracking numbers & feedbacks per active items
  const [tempTracking, setTempTracking] = useState<{ [orderId: string]: string }>({});
  const [tempFeedback, setTempFeedback] = useState<{ [customId: string]: string }>({});
  const [tempInquiryReply, setTempInquiryReply] = useState<{ [inquiryId: string]: string }>({});

  // Handle image upload inside Catalog editor helper
  const handleProductImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProdImage(reader.result as string);
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleSaveProduct = (e: FormEvent) => {
    e.preventDefault();
    if (!prodName || !prodPrice) return;

    const parsedColors = prodColors.split(',').map(c => c.trim()).filter(Boolean);
    const parsedOptions = prodOptions.split(',').map(o => o.trim()).filter(Boolean);

    if (editingProduct) {
      // Edit mode
      onUpdateProduct({
        ...editingProduct,
        name: prodName,
        price: Number(prodPrice),
        description: prodDesc,
        category: prodCategory,
        colors: parsedColors,
        options: parsedOptions,
        size: prodSize,
        material: prodMaterial,
        leadTime: prodLeadTime,
        images: prodImage ? [prodImage] : editingProduct.images
      });
      setEditingProduct(null);
    } else {
      // Add mode
      onAddProduct({
        id: `prod_${Date.now()}`,
        name: prodName,
        price: Number(prodPrice),
        description: prodDesc,
        category: prodCategory,
        colors: parsedColors,
        options: parsedOptions,
        size: prodSize,
        material: prodMaterial,
        leadTime: prodLeadTime,
        images: prodImage ? [prodImage] : [],
        shippingFee: 3000,
        isPopular: true
      });
      setIsAdding(false);
    }

    // Reset Form
    setProdName('');
    setProdPrice(5000);
    setProdDesc('');
    setProdCategory('acrylic');
    setProdColors('핑크, 블루, 화이트, 퍼플');
    setProdOptions('기본, 글리터 (+500원), 홀로그램 (+800원)');
    setProdSize('약 6cm');
    setProdMaterial('친환경 아크릴, 금속 고리');
    setProdLeadTime('3~5일 소요');
    setProdImage('');
  };

  const editTrigger = (prod: Product) => {
    setEditingProduct(prod);
    setProdName(prod.name);
    setProdPrice(prod.price);
    setProdDesc(prod.description);
    setProdCategory(prod.category);
    setProdColors(prod.colors.join(', '));
    setProdOptions(prod.options.join(', '));
    setProdSize(prod.size);
    setProdMaterial(prod.material);
    setProdLeadTime(prod.leadTime);
    setProdImage(prod.images[0] || '');
    setIsAdding(true);
  };

  const subNavClass = (tab: typeof adminTab) => {
    return `cursor-pointer flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all ${
      adminTab === tab 
        ? 'bg-rose-500 text-white shadow-xs' 
        : 'bg-stone-50 border border-stone-200/50 hover:bg-stone-100 text-stone-600'
    }`;
  };

  return (
    <div id="admin-workspace-layout" className="flex flex-col gap-6 pb-12 animate-fade-in text-stone-750">
      
      {/* Banner alert operational warnings */}
      <section className="bg-stone-900 text-stone-100 rounded-2xl p-5 md:p-6 border border-stone-800 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center font-bold">
            <Shield className="w-5.5 h-5.5 animate-pulse" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-white flex items-center gap-1">
              <span>att 어태치 관리 대시보드</span>
              <span className="text-[9px] bg-rose-600 text-white px-1.5 py-0.2 rounded font-mono font-black uppercase">EXPERIMENT MODE</span>
            </h1>
            <p className="text-[10px] text-stone-400 leading-normal font-medium max-w-xl mt-1 leading-relaxed">
              * 임시 체험용 운영자 조율 패널입니다. 상품 기획 수선, 모의 무통장입금 확인 수락, 운송장 교부, 상담 대답까지 실제 가상의 고객 MyPage와 실시간 상호작용이 연출됩니다.
            </p>
          </div>
        </div>
      </section>

      {/* Admin tabs choices list menu */}
      <section className="flex flex-wrap items-center gap-1.5 border-b border-stone-150 pb-2">
        <button onClick={() => setAdminTab('orders')} className={subNavClass('orders')}>주문 통합확인 ({orders.length}건)</button>
        <button onClick={() => setAdminTab('customs')} className={subNavClass('customs')}>1:1 도안조율 ({customOrders.length}건)</button>
        <button onClick={() => setAdminTab('catalog')} className={subNavClass('catalog')}>카탈로그 관리 ({products.length}종)</button>
        <button onClick={() => setAdminTab('inquiries')} className={subNavClass('inquiries')}>CS 답변소 ({inquiries.length}건)</button>
        <button onClick={() => setAdminTab('reviews')} className={subNavClass('reviews')}>후기 수선검열 ({reviews.length}건)</button>
      </section>

      {/* RENDER ACTIVE FORUMS COVERS */}
      <section className="min-h-[290px] bg-white rounded-2xl border border-stone-200/50 p-4 md:p-6 shadow-2xs">
        
        {/* TABS 1: Catalog Manager (CREATE AND EDIT PRODUCTS!) */}
        {adminTab === 'catalog' && (
          <div id="catalog-control" className="flex flex-col gap-6">
            
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-stone-800 uppercase tracking-widest">🛍️ 기성 스토어 키링 카탈로그 수정</h3>
              {!isAdding && (
                <button 
                  onClick={() => setIsAdding(true)}
                  className="cursor-pointer bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>신규 키링 등록 추가</span>
                </button>
              )}
            </div>

            {/* Editing and creating Form */}
            {isAdding && (
              <form onSubmit={handleSaveProduct} className="bg-stone-50 p-4 md:p-5 border rounded-xl border-stone-200 flex flex-col gap-4 animate-fade-in shadow-inner">
                <h4 className="text-xs font-black text-stone-800">
                  {editingProduct ? '⚙️ 기존 키링 등록정보 수선' : '✨ 신규 스토어 키링 자재 등록'}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-semibold">키링 상품명 *</label>
                    <input 
                      type="text" 
                      required
                      value={prodName}
                      onChange={(e) => setProdName(e.target.value)}
                      placeholder="제품 이름 기재..."
                      className="text-xs p-2.5 border bg-white rounded-lg focus:outline-none focus:border-rose-400 font-semibold"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-semibold">책정 판매가 (기본) *</label>
                    <input 
                      type="number" 
                      required
                      value={prodPrice}
                      onChange={(e) => setProdPrice(Number(e.target.value))}
                      placeholder="액수 기재..."
                      className="text-xs p-2.5 border bg-white rounded-lg focus:outline-none focus:border-rose-400 font-bold"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-semibold">지정 대분류 카테고리 *</label>
                    <select
                      value={prodCategory}
                      onChange={(e) => setProdCategory(e.target.value as any)}
                      className="text-xs p-2.5 border bg-white rounded-lg cursor-pointer"
                    >
                      <option value="acrylic">아크릴 키링</option>
                      <option value="character">캐릭터 키링</option>
                      <option value="name">이름 이니셜형</option>
                      <option value="photo">사진 추억형</option>
                      <option value="wording">문구 각인형</option>
                      <option value="gift">선물 패키징용</option>
                      <option value="custom">단독 커스텀용</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-semibold">조색 가능 컬러 믹스 (콤마로 구분, 예: 분홍, 하늘)</label>
                    <input 
                      type="text" 
                      value={prodColors}
                      onChange={(e) => setProdColors(e.target.value)}
                      placeholder="예: 핑크, 스카이, 화이트..."
                      className="text-xs p-2.5 border bg-white rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-semibold">선택 가능 펄 가공옵션 (콤마로 구분, 각각 옵션표)</label>
                    <input 
                      type="text" 
                      value={prodOptions}
                      onChange={(e) => setProdOptions(e.target.value)}
                      placeholder="예: 기본, 특수펄 (+500원)..."
                      className="text-xs p-2.5 border bg-white rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-semibold">기물 규격 크기</label>
                    <input type="text" value={prodSize} onChange={(e) => setProdSize(e.target.value)} className="p-2 border bg-white rounded-lg" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-semibold">원재료 자재</label>
                    <input type="text" value={prodMaterial} onChange={(e) => setProdMaterial(e.target.value)} className="p-2 border bg-white rounded-lg" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-semibold">제작 리드타임</label>
                    <input type="text" value={prodLeadTime} onChange={(e) => setProdLeadTime(e.target.value)} className="p-2 border bg-white rounded-lg" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-semibold">상품 실물 촬영 업로드 (선택, 우선순위 적용)</label>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleProductImageUpload} 
                      className="text-xs" 
                    />
                  </div>
                  {prodImage && (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <span>이미지 소스 캐싱됨</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-semibold">상품 상세 수식 슬로건 문구 *</label>
                  <textarea 
                    required
                    value={prodDesc}
                    onChange={(e) => setProdDesc(e.target.value)}
                    rows={2}
                    placeholder="이 키링의 감성을 나타내는 예쁜 소개 문구나 상세소개글을 편하게 입력해주세요..."
                    className="p-2.5 border bg-white rounded-lg text-xs"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button 
                    type="button"
                    onClick={() => {
                      setIsAdding(false);
                      setEditingProduct(null);
                      setProdName('');
                      setProdPrice(5000);
                      setProdDesc('');
                      setProdCategory('acrylic');
                      setProdColors('핑크, 블루, 화이트, 퍼플');
                      setProdOptions('기본, 글리터 (+500원), 홀로그램 (+800원)');
                      setProdSize('약 6cm');
                      setProdMaterial('친환경 아크릴, 금속 고리');
                      setProdLeadTime('3~5일 소요');
                      setProdImage('');
                    }}
                    className="cursor-pointer bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold p-3 text-xs uppercase text-center border-2 border-transparent rounded-lg"
                  >
                    취소
                  </button>
                  <button 
                    type="submit"
                    className="cursor-pointer bg-brand-pink text-white hover:bg-black font-black p-3 text-xs uppercase text-center border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] rounded-lg"
                  >
                    {editingProduct ? '수정사항 저장하기' : '새 기성상품 등록'}
                  </button>
                </div>
              </form>
            )}

            {/* Lists existing products in database */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map(p => (
                <div key={p.id} className="bg-stone-50 p-4 border border-stone-200/50 rounded-xl flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 font-semibold">
                      {p.images && p.images[0] ? (
                        <img 
                          src={p.images[0]} 
                          alt={p.name} 
                          className="w-12 h-12 rounded-lg object-contain bg-white border border-stone-250 shrink-0 p-1" 
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-pink-50 border border-pink-100 flex items-center justify-center font-hand text-pink-500 font-bold shrink-0">
                          att
                        </div>
                      )}
                      <div>
                        <h4 className="text-xs font-bold text-stone-950">{p.name}</h4>
                        <span className="text-[10px] text-stone-400 font-bold capitalize block mt-0.5">{p.id} / {p.price.toLocaleString()}원</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button 
                        type="button"
                        onClick={() => editTrigger(p)}
                        className="p-2 text-stone-500 hover:text-blue-500 bg-white hover:bg-blue-50 rounded-lg border border-stone-200 transition-colors cursor-pointer"
                        title="수정"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        type="button"
                        onClick={() => {
                          if (confirm('이 키링 상품을 정말 등록에서 해제 폐기합니까?')) {
                            onDeleteProduct(p.id);
                          }
                        }}
                        className="p-2 text-stone-500 hover:text-red-500 bg-white hover:bg-red-50 rounded-lg border border-stone-200 transition-colors cursor-pointer"
                        title="삭제"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Real-time Image Changer Panel */}
                  <div className="border-t border-stone-200/60 pt-3 flex flex-col gap-2 bg-stone-100/40 p-2.5 rounded-lg">
                    <div className="flex items-center justify-between font-bold">
                      <span className="text-[10px] font-black text-stone-600 flex items-center gap-1">
                        <Image className="w-3.5 h-3.5 text-rose-500" />
                        <span>📸 실시간 이미지 소스 교체 및 수정</span>
                      </span>
                      {p.images && p.images[0] && (
                        <button
                          type="button"
                          onClick={() => {
                            onUpdateProduct({
                              ...p,
                              images: []
                            });
                          }}
                          className="text-[9px] font-bold text-rose-500 hover:underline cursor-pointer"
                        >
                          이미지 전면 초기화
                        </button>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <label className="flex-1 cursor-pointer flex items-center justify-center gap-1 bg-white hover:bg-stone-50 text-stone-700 font-bold text-[10px] py-1.5 px-2.5 border border-stone-300 rounded shadow-3xs transition-all text-center">
                        <Upload className="w-3 h-3 text-stone-500" />
                        <span>파일선택</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => {
                            const files = e.target.files;
                            if (files && files[0]) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                onUpdateProduct({
                                  ...p,
                                  images: [reader.result as string]
                                });
                              };
                              reader.readAsDataURL(files[0]);
                            }
                          }}
                        />
                      </label>

                      <input 
                        type="text"
                        placeholder="또는 이미지 URL 주소 입력..."
                        value={p.images[0] || ''}
                        onChange={(e) => {
                          onUpdateProduct({
                            ...p,
                            images: e.target.value ? [e.target.value] : []
                          });
                        }}
                        className="flex-3 text-[10px] p-1.5 border border-stone-300 bg-white rounded focus:outline-none focus:border-rose-400 font-medium font-mono text-stone-700"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TABS 2: General Orders Manager */}
        {adminTab === 'orders' && (
          <div id="orders-control" className="flex flex-col gap-6">
            <h3 className="text-xs font-bold text-stone-800 uppercase tracking-widest border-b border-stone-100 pb-2">📦 고객 일반주문 명세 및 CS 검인</h3>

            {orders.length > 0 ? (
              <div className="flex flex-col gap-4">
                {orders.map((ord) => (
                  <div key={ord.id} className="border border-stone-200 p-4 rounded-xl flex flex-col gap-3 hover:border-pink-300/50 transition-colors shadow-2xs">
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-stone-100 pb-2.5">
                      <div>
                        <span className="text-[11px] text-stone-400 font-mono font-bold block">주문ID: {ord.id} ({ord.createdAt})</span>
                        <span className="text-xs font-extrabold text-stone-850 block mt-1">주문 수신자: {ord.userName} ({ord.phone}) | 이메일: {ord.email}</span>
                      </div>
                      
                      {/* Active Status Dropdown selector */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-bold text-stone-550 mr-1">배송단계 변경:</span>
                        <select
                          value={ord.status}
                          onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value as OrderStatus, tempTracking[ord.id])}
                          className="text-xs bg-white border border-stone-350 p-1.5 rounded-lg font-bold cursor-pointer focus:outline-none"
                        >
                          <option value="주문 접수">주문 접수 (입금 대기)</option>
                          <option value="결제 확인">결제 확인 (시안 준비)</option>
                          <option value="제작 중">제작 중 (아크릴 컷)</option>
                          <option value="배송 준비">배송 준비 (에어캡완충)</option>
                          <option value="배송 중">배송 중 (우체국택배)</option>
                          <option value="배송 완료">배송 완료 (도착 완료)</option>
                        </select>
                      </div>
                    </div>

                    {/* Ordered items listing inside Admin */}
                    <div className="bg-stone-50 p-3 rounded-lg border border-stone-200/40 text-xs flex flex-col gap-1.5">
                      {ord.items.map(it => (
                        <div key={it.id} className="flex justify-between font-semibold text-stone-700">
                          <p>• {it.name} <span className="text-stone-400">({it.quantity}개)</span></p>
                          <span>{(it.price * it.quantity).toLocaleString()}원</span>
                        </div>
                      ))}
                      <div className="border-t border-stone-200 pt-1.5 flex justify-between font-bold text-stone-900">
                        <span>청구 이체액 소계 (배송비3000포함)</span>
                        <span className="text-rose-600 font-black">{ord.totalPrice.toLocaleString()}원</span>
                      </div>
                    </div>

                    {/* Delivery addresses info */}
                    <div className="text-[11px] text-stone-500 font-semibold leading-relaxed">
                      <p>수신 주지: <strong>{ord.deliveryAddress}</strong></p>
                      <p>요청 메모: <strong>"{ord.deliveryMemo || '메모없음'}"</strong></p>
                      <p>송금 방법: <strong className="text-indigo-600 uppercase font-bold">{ord.paymentMethod}</strong> / 이체 확인 상태: <strong>{ord.status !== '주문 접수' ? '● 입금완료 확인' : '○ 입금 미확인'}</strong></p>
                    </div>

                    {/* Action form element: Update Courier tracking numbers */}
                    <div className="flex border-t border-stone-50 pt-2.5 items-center gap-2.5">
                      <label className="text-[11px] font-bold text-stone-600 shrink-0">우체국등기 송장번호 부여:</label>
                      <input 
                        type="text"
                        value={tempTracking[ord.id] !== undefined ? tempTracking[ord.id] : (ord.trackingNumber || '')}
                        onChange={(e) => setTempTracking({ ...tempTracking, [ord.id]: e.target.value })}
                        placeholder="예: 4212-04-1234..."
                        className="text-xs px-2.5 py-1.5 border hover:border-rose-300 rounded focus:outline-none w-full max-w-xs font-semibold"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          onUpdateOrderStatus(ord.id, ord.status, tempTracking[ord.id]);
                          alert('우체국 송장번호가 성공적으로 교부 저장되었습니다!');
                        }}
                        className="cursor-pointer bg-stone-900 hover:bg-stone-800 text-white font-bold text-[10px] px-3.5 py-1.5 rounded transition-transform"
                      >
                        송장번호 교부저장
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-stone-400 font-bold text-center py-10">쇼핑몰에 접수된 고객 일반주문이 없습니다.</p>
            )}
          </div>
        )}

        {/* TABS 3: Custom Design Room */}
        {adminTab === 'customs' && (
          <div id="customs-control" className="flex flex-col gap-6">
            <h3 className="text-xs font-bold text-stone-800 uppercase tracking-widest border-b border-stone-100 pb-2">✏️ 맞춤 도안 1:1 시안 실시간 조율방</h3>

            {customOrders.length > 0 ? (
              <div className="flex flex-col gap-4">
                {customOrders.map((cust) => (
                  <div key={cust.id} className="border border-stone-200 p-4 rounded-xl flex flex-col sm:flex-row gap-5 shadow-2xs">
                    
                    {/* Visual check container */}
                    <div className="flex-none w-full sm:w-[120px] flex flex-col items-center justify-center bg-stone-50 rounded-xl border p-2 shrink-0">
                      <KeyringPreview 
                        shape={cust.config.shape}
                        selectedColor={cust.config.selectedColor}
                        wording={cust.config.wording}
                        charmType={cust.config.charmType}
                        hasGlitter={cust.config.hasGlitter}
                        customImageRef={cust.config.customImageRef}
                        className="border-none p-1 shrink-0 bg-transparent min-h-0 w-full"
                        interactive={false}
                      />
                    </div>

                    {/* Metadata details config */}
                    <div className="flex-1 flex flex-col gap-2.5">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 border-b border-stone-100 pb-2">
                        <div>
                          <span className="text-[10px] text-stone-400 font-mono font-bold block">도안ID: {cust.id} ({cust.requestedAt})</span>
                          <span className="text-xs font-extrabold text-stone-850">신청: {cust.name} ({cust.instagramId || '@아이디없음'}) | 수량: {cust.quantity}개</span>
                        </div>
                        
                        {/* Selector stage status */}
                        <select
                          value={cust.status}
                          onChange={(e) => onUpdateCustomOrderStatus(cust.id, e.target.value as OrderStatus, tempFeedback[cust.id])}
                          className="text-xs bg-white border border-stone-300 p-1 rounded cursor-pointer font-bold"
                        >
                          <option value="주문 접수">시안 대기</option>
                          <option value="결제 확인">시안 확인 / 입금확인</option>
                          <option value="제작 중">수공 가송 중</option>
                          <option value="배송 준비">포장 대기</option>
                          <option value="배송 중">우체국 발송</option>
                          <option value="배송 완료">배송 완료</option>
                        </select>
                      </div>

                      {/* Technical specifications specs text */}
                      <div className="text-[11px] text-stone-600 bg-stone-50 p-2.5 rounded border border-stone-150 grid grid-cols-2 gap-2 font-semibold">
                        <p>형태: <span className="uppercase font-bold text-stone-900">{cust.config.shape}</span></p>
                        <p>펄안개: <span className="text-stone-900">{cust.config.hasGlitter}</span></p>
                        <p>특정 문안: <span className="font-mono text-rose-500 font-bold">"{cust.config.wording}"</span></p>
                        <p>포인트참: <span className="text-stone-950 font-bold">{cust.config.charmType}</span></p>
                      </div>

                      {/* Write custom feedback to client */}
                      <div className="flex flex-col gap-1 mt-1 border-t border-stone-50 pt-2">
                        <label className="text-[11px] font-bold text-stone-600">고객 마이페이지 시안대장 피드백 전송:</label>
                        <div className="flex gap-2">
                          <textarea
                            value={tempFeedback[cust.id] !== undefined ? tempFeedback[cust.id] : (cust.adminFeedback || '')}
                            onChange={(e) => setTempFeedback({ ...tempFeedback, [cust.id]: e.target.value })}
                            rows={2}
                            placeholder="예: 고객님 예쁜 하트형 분홍색 시안이 가공 전송완료 되었습니다. 참은 요청대로 리본형으로 정교하게 매칭해 드립니다!"
                            className="text-xs p-2 border rounded-lg focus:outline-none focus:border-rose-450 w-full font-semibold bg-white"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              onUpdateCustomOrderStatus(cust.id, cust.status, tempFeedback[cust.id]);
                              alert('시안교정 대답이 마이페이지로 안전하게 전송되었습니다!');
                            }}
                            className="bg-stone-900 hover:bg-stone-800 text-white font-bold text-[10px] px-3 rounded-lg shrink-0 flex items-center justify-center cursor-pointer"
                          >
                            <span>전송저장</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-stone-400 font-bold text-center py-10">제출된 고객 단독 커스텀 조율 도안이 없습니다.</p>
            )}
          </div>
        )}

        {/* TABS 4: Inquiry Reply Area */}
        {adminTab === 'inquiries' && (
          <div id="inquiries-control" className="flex flex-col gap-6">
            <h3 className="text-xs font-bold text-stone-800 uppercase tracking-widest border-b border-stone-100 pb-2">💬 CS 1:1 대화형 상담 및 답변서 교부</h3>

            {inquiries.length > 0 ? (
              <div className="flex flex-col gap-4">
                {inquiries.map((inq) => (
                  <div key={inq.id} className="border border-stone-200 p-4 rounded-xl flex flex-col gap-2.5 shadow-2xs">
                    
                    <div className="flex justify-between items-center text-xs border-b border-stone-100 pb-2 font-semibold">
                      <div>
                        <span className="text-stone-400 font-mono text-[10px] block">Inquiry ID: {inq.id}</span>
                        <span className="text-stone-850 mt-0.5">작성: {inq.userName} ({inq.email})</span>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${inq.isAnswered ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-900'}`}>
                        {inq.isAnswered ? '답변완료 확인' : '답변대기 필요'}
                      </span>
                    </div>

                    <div className="bg-stone-50 p-2.5 rounded text-xs font-semibold text-stone-650 leading-relaxed border font-mono">
                      <p className="text-[10px] text-stone-400">질문 유형: {inq.inquiryType}</p>
                      <p className="mt-1 text-stone-900 font-sans">"{inq.content}"</p>
                    </div>

                    {/* Reply form */}
                    <div className="flex gap-2 items-end mt-1 border-t border-stone-50 pt-2">
                      <div className="flex-1 flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-stone-550">공식 답변서 작성:</label>
                        <input 
                          type="text"
                          value={tempInquiryReply[inq.id] !== undefined ? tempInquiryReply[inq.id] : (inq.reply || '')}
                          onChange={(e) => setTempInquiryReply({ ...tempInquiryReply, [inq.id]: e.target.value })}
                          placeholder="CS 공식 답변 작성..."
                          className="text-xs p-2 border hover:border-rose-300 rounded focus:outline-none w-full font-semibold"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          onAnswerInquiry(inq.id, tempInquiryReply[inq.id] || '');
                          alert('해당 CS 문의 답변이 마이페이지 전송 완료되었습니다! ✓');
                        }}
                        className="cursor-pointer bg-rose-500 hover:bg-rose-600 text-white font-bold text-[10px] px-4 py-2 rounded shadow-2xs shrink-0"
                      >
                        답글전송
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-stone-400 font-bold text-center py-10">대기 중인 CS 안심 상담건이 존재하지 않습니다.</p>
            )}
          </div>
        )}

        {/* TABS 5: Reviews Moderation */}
        {adminTab === 'reviews' && (
          <div id="reviews-control" className="flex flex-col gap-6">
            <h3 className="text-xs font-bold text-stone-800 uppercase tracking-widest border-b border-stone-100 pb-2">⭐ 스포어 실시간 후기 수선관리</h3>

            {reviews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviews.map((rev) => (
                  <div key={rev.id} className="bg-stone-50 p-4 border border-stone-200 rounded-xl flex items-start justify-between gap-4 text-xs font-semibold">
                    <div className="flex-1">
                      <p className="font-extrabold text-stone-850">{rev.userName} 님 / 별점 {rev.rating}점</p>
                      <span className="text-[10px] text-pink-600 bg-pink-50 border px-2 py-0.2 rounded-full inline-block mt-0.5 mb-1.5">{rev.productName}</span>
                      <p className="text-stone-550 leading-relaxed font-medium">"{rev.content}"</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('이 고객 후기를 정말 폐기합니까?')) {
                          onDeleteReview(rev.id);
                        }
                      }}
                      className="p-1.5 rounded-lg border border-red-200 hover:bg-red-50 text-red-500 shrink-0 cursor-pointer flex items-center justify-center bg-white"
                      title="후기 검열삭제"
                    >
                      <Trash className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-stone-400 font-bold text-center py-10">스토어에 배치된 리뷰가 없습니다.</p>
            )}
          </div>
        )}

      </section>

    </div>
  );
}
