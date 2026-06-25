/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { ShoppingBag, CreditCard, Clipboard, Compass, Info, Heart, Trash2, CheckCircle2, Ticket, ShieldQuestion, MessageCircle } from 'lucide-react';
import { CartItem, Order, CustomOrder, Inquiry, User } from '../types';
import KeyringPreview from '../components/KeyringPreview';

interface MyPageViewProps {
  currentUser: User | null;
  cartItems: CartItem[];
  orders: Order[];
  customOrders: CustomOrder[];
  inquiries: Inquiry[];
  onRemoveFromCart: (id: string) => void;
  onUpdateCartQty: (id: string, qty: number) => void;
  onClearCart: () => void;
  onPlaceOrder: (orderDetails: {
    recipientName: string;
    deliveryAddress: string;
    deliveryMemo: string;
    paymentMethod: Order['paymentMethod'];
    phone: string;
  }) => void;
  onNavigate: (view: string) => void;
}

export default function MyPageView({
  currentUser,
  cartItems,
  orders,
  customOrders,
  inquiries,
  onRemoveFromCart,
  onUpdateCartQty,
  onClearCart,
  onPlaceOrder,
  onNavigate,
}: MyPageViewProps) {
  // Tabs: 'cart' | 'orders' | 'customs' | 'inquiries' | 'wish'
  const [activeTab, setActiveTab] = useState<'cart' | 'orders' | 'customs' | 'inquiries'>('cart');

  // Checkout address attributes
  const [recipientName, setRecipientName] = useState<string>(currentUser?.name || '');
  const [phone, setPhone] = useState<string>('');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [deliveryMemo, setDeliveryMemo] = useState<string>('조심히 안전하게 배송해 주세요.');
  const [paymentMethod, setPaymentMethod] = useState<Order['paymentMethod']>('무통장 입금');
  const [isOrderSubmitted, setIsOrderSubmitted] = useState<boolean>(false);

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const finalPayTotal = cartTotal > 0 ? cartTotal + 3000 : 0; // 3000 Shipping

  // Handle Checkout submission trigger
  const handleCheckout = (e: FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert('장바구니에 상품을 최소 1개 이상 올려주세요!');
      return;
    }

    if (!recipientName || !phone || !deliveryAddress) {
      alert('배송 수령인 성함, 대표 연락처, 그리고 정확한 자택 배송 주소를 채워주세요!');
      return;
    }

    onPlaceOrder({
      recipientName,
      deliveryAddress,
      deliveryMemo,
      paymentMethod,
      phone,
    });

    setIsOrderSubmitted(true);
    setTimeout(() => {
      setIsOrderSubmitted(false);
      onClearCart();
      setPhone('');
      setDeliveryAddress('');
      setActiveTab('orders'); // Jump to orders history directly!
    }, 2000);
  };

  const navItemClass = (tab: typeof activeTab) => {
    return `cursor-pointer flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold transition-all ${
      activeTab === tab 
        ? 'bg-stone-900 text-white shadow-xs' 
        : 'bg-white text-stone-600 border border-stone-150 hover:border-stone-400'
    }`;
  };

  return (
    <div id="mypage-layout" className="flex flex-col gap-8 pb-12">
      
      {/* Upper header summary panel */}
      <section className="bg-stone-50 p-6 rounded-2xl border border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-stone-950 flex items-center justify-center font-extrabold text-white text-lg shadow-inner uppercase">
            {currentUser?.name.slice(0, 2) || 'WW'}
          </div>
          <div>
            <h1 className="text-base font-extrabold text-stone-900 tracking-tight">
              {currentUser?.name || '비회원 고객'} 님의 취향 저장소
            </h1>
            <p className="text-[11px] text-stone-400 font-semibold font-mono uppercase tracking-wider mt-0.5">
              Wacky Willy PREMIUM MEMBERSHIP / {currentUser?.email || 'lch200048@gmail.com'}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          {currentUser?.role === 'admin' && (
            <button
              onClick={() => onNavigate('admin')}
              className="cursor-pointer bg-stone-900 text-white font-bold text-xs px-4 py-2 rounded-full transition-colors"
            >
              운영 관리센터
            </button>
          )}
        </div>
      </section>

      {/* Navigation Subtabs menu lists */}
      <section className="flex flex-wrap items-center gap-2 border-b border-stone-200 pb-3">
        <button onClick={() => setActiveTab('cart')} className={navItemClass('cart')}>장바구니 ({cartItems.length})</button>
        <button onClick={() => setActiveTab('orders')} className={navItemClass('orders')}>주문 전체내역 ({orders.length})</button>
        <button onClick={() => setActiveTab('customs')} className={navItemClass('customs')}>1:1 커스텀 요청 ({customOrders.length})</button>
        <button onClick={() => setActiveTab('inquiries')} className={navItemClass('inquiries')}>상담 문의내역 ({inquiries.length})</button>
      </section>

      {/* Active Tab render container */}
      <section className="min-h-[320px]">
        
        {/* TAB 1: Shopping Cart */}
        {activeTab === 'cart' && (
          <div id="cart-workspace" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
            {isOrderSubmitted ? (
              <div className="lg:col-span-12 text-center py-16 bg-white rounded-2xl border border-stone-200 p-6 flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full bg-emerald-150 text-emerald-600 border border-emerald-300 flex items-center justify-center animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-base font-bold text-stone-900">수공예품 키링 주문서가 전송되었습니다!</h3>
                <p className="text-xs text-stone-500 leading-relaxed font-semibold">
                  계좌 수동 이체 입금이 확인되는 즉시 실시간 레이저 아크릴 가공이 개시됩니다.<br />
                  <span className="text-amber-800 font-extrabold">💬 귀하의 연락처 계정으로 실시간 배송 추적 및 전자 영수증 안내용 카카오 알림톡 연동이 완료되었습니다!</span><br />
                  이용해 주셔서 감사드리며, '주문내역' 탭에서 제작 준비 단계를 수시 모니터링해 보세요!
                </p>
              </div>
            ) : cartItems.length > 0 ? (
              <>
                {/* Left side cart items list */}
                <div className="lg:col-span-7 flex flex-col gap-3">
                  <h3 className="text-xs font-bold text-stone-600 uppercase tracking-widest px-1">담긴 수공 기물</h3>
                  {cartItems.map((item) => (
                    <div 
                      key={item.id}
                      className="bg-white rounded-xl border border-stone-200 p-4 flex items-center justify-between gap-4 shadow-2xs hover:shadow-xs transition-shadow"
                    >
                      <div className="flex items-center gap-3">
                        {/* Simple aesthetic square keyring visual badge */}
                        <div className="w-11 h-11 rounded-lg bg-[#EEFF00] border border-stone-900 flex items-center justify-center font-mono text-stone-950 font-black text-xs shadow-xs flex-none">
                          Willy
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-stone-900 line-clamp-1">{item.name}</h4>
                          <p className="text-[10px] text-stone-400 mt-0.5">컬러: {item.selectedColor} | 타입: {item.selectedOption}</p>
                          <p className="text-xs font-extrabold text-stone-900 mt-1">{(item.price).toLocaleString()}원</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Qty incrementer */}
                        <div className="flex items-center gap-1 bg-stone-100 p-0.5 rounded-full border border-stone-200">
                          <button 
                            onClick={() => onUpdateCartQty(item.id, Math.max(1, item.quantity - 1))}
                            className="w-5.5 h-5.5 bg-white rounded-full flex items-center justify-center text-[10px] font-bold focus:outline-none cursor-pointer"
                          >
                            -
                          </button>
                          <span className="text-[11px] font-extrabold text-stone-850 px-1.5 w-5 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateCartQty(item.id, item.quantity + 1)}
                            className="w-5.5 h-5.5 bg-white rounded-full flex items-center justify-center text-[10px] font-bold focus:outline-none cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        {/* Delete Trash button */}
                        <button 
                          onClick={() => onRemoveFromCart(item.id)}
                          className="p-1.5 text-stone-300 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors cursor-pointer"
                          title="삭제"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}

                  <button 
                    onClick={onClearCart}
                    className="text-stone-400 hover:text-stone-700 font-bold text-xs text-right cursor-pointer mr-2 mt-1 flex items-center gap-1 justify-end"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>전체 비우기</span>
                  </button>
                </div>

                {/* Right side checkouts form values */}
                <form onSubmit={handleCheckout} className="lg:col-span-5 bg-white border border-stone-200 p-5 md:p-6 rounded-2xl flex flex-col gap-4">
                  <h3 className="text-xs font-bold text-stone-600 uppercase tracking-widest border-b border-stone-100 pb-2">📦 안전 배송 수령지 입력</h3>
                  
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-stone-500">대표 수령인 실명 *</label>
                    <input 
                      type="text" 
                      required
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="받으시는 분 이름..."
                      className="text-xs text-stone-800 bg-stone-50 border border-stone-200 rounded-lg p-2.5 focus:outline-none focus:bg-white focus:border-stone-400 font-semibold"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-stone-500">배송 수신 대표 전화번호 *</label>
                    <input 
                      type="tel" 
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="연락 연락처 기입..."
                      className="text-xs text-stone-800 bg-stone-50 border border-stone-200 rounded-lg p-2.5 focus:outline-none focus:bg-white focus:border-stone-400 font-semibold"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-stone-500">정확한 자택 배달 배송 주소 *</label>
                    <input 
                      type="text" 
                      required
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="상세 번지, 호수까지 기입..."
                      className="text-xs text-stone-800 bg-stone-50 border border-stone-200 rounded-lg p-2.5 focus:outline-none focus:bg-white focus:border-stone-400 font-semibold"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-stone-500">배송 기사 요청사항 메모</label>
                    <input 
                      type="text" 
                      value={deliveryMemo}
                      onChange={(e) => setDeliveryMemo(e.target.value)}
                      placeholder="부재 시 경비실에 맡겨 주세요 등..."
                      className="text-xs text-stone-800 bg-stone-50 border border-stone-200 rounded-lg p-2.5 focus:outline-none focus:bg-white focus:border-stone-300 font-medium"
                    />
                  </div>

                  {/* Kakao notification billing setup choice */}
                  <div className="bg-[#FEE500]/10 border border-[#FEE500]/30 rounded-xl p-3 flex flex-col gap-1.5 mt-1 text-left">
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input 
                        type="checkbox"
                        defaultChecked={true}
                        className="rounded text-amber-500 focus:ring-amber-400 h-4 w-4 mt-0.5 cursor-pointer accent-stone-900" 
                      />
                      <div className="text-[10px] text-stone-700 leading-normal font-semibold">
                        <p className="font-extrabold text-[#191919] flex items-center gap-1">
                          <span>💬 매칭 카카오톡으로 배송 조회 & 영수증 알림톡 수령</span>
                        </p>
                        <p className="text-[9px] text-stone-400 font-normal mt-0.5 leading-relaxed">
                          체크하시면 위의 배송 수신 전화번호와 연동된 카카오톡으로 배송 개시, 우체국 송장 번호 정보 및 영수증 메세지가 알림톡으로 실시간 자동 전송됩니다.
                        </p>
                      </div>
                    </label>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-stone-500">수동 이체 송금 결제 방식 선택 *</label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value as any)}
                      className="text-xs bg-stone-50 border border-stone-200 text-stone-850 p-2.5 rounded-lg cursor-pointer focus:outline-none focus:bg-white"
                    >
                      <option value="무통장 입금">무통장 계좌 수동 입금</option>
                      <option value="토스 송금">토스 머니 빠른 송금</option>
                      <option value="카카오페이 송금">카카오페이 계좌 이체</option>
                    </select>
                  </div>

                  {/* Pricing bill outline details */}
                  <div className="bg-stone-50 p-3 rounded-lg border border-stone-200/40 text-[11px] text-stone-500 flex flex-col gap-1 mt-2.5">
                    <div className="flex justify-between"><span>주문 기물 소계</span><span className="text-stone-850 font-bold">{cartTotal.toLocaleString()}원</span></div>
                    <div className="flex justify-between"><span>우체국 안심 배송비</span><span className="text-stone-850 font-bold">3,000원</span></div>
                    <div className="flex justify-between border-t border-stone-200 pt-1.5 mt-1 font-bold text-xs">
                      <span className="text-stone-850">최종 청구 계좌이체액</span>
                      <span className="text-rose-600 font-black">{finalPayTotal.toLocaleString()}원</span>
                    </div>
                  </div>

                  {/* Transfer guidance visual helper panel */}
                  <div className="bg-amber-50 rounded-xl p-2.5 border border-amber-200/50 text-[10px] text-amber-800 font-medium flex flex-col gap-0.5">
                    <p className="font-bold flex items-center gap-1 mb-0.5 uppercase">
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>수동 송금 이체 수선안내</span>
                    </p>
                    <p>• 입금 계좌: 신한은행 110-456-224877 (이재호)</p>
                    <p>• 예금주명과 주문 수령인이 동일해야 자동 전산 대응 처리됩니다.</p>
                  </div>

                  <button
                    type="submit"
                    className="cursor-pointer bg-stone-950 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-full flex items-center justify-center gap-1 shadow-sm transition-transform active:scale-98"
                  >
                    <span>수공제품 주문 요청 접수</span>
                  </button>
                </form>
              </>
            ) : (
              /* Cart empty state layout */
              <div className="lg:col-span-12 text-center py-20 bg-white/45 rounded-3xl border border-dashed border-stone-200 flex flex-col items-center justify-center p-6">
                <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center text-stone-850 mb-4">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-stone-800">장바구니가 고요히 비어 있습니다.</h3>
                <p className="text-xs text-stone-500 mt-1 max-w-xs leading-relaxed font-semibold">
                  키링 스토어 카탈로그에서 마음에 드는 아기자기한 이니셜/하트 리본 키링을 채색하여 담아보세요!
                </p>
                <button
                  onClick={() => onNavigate('shop')}
                  className="cursor-pointer mt-4 bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-bold px-5 py-2.5 rounded-full transition-colors"
                >
                  새로운 키링 구경가기
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Orders History */}
        {activeTab === 'orders' && (
          <div id="orders-stack" className="flex flex-col gap-4 animate-fade-in">
            <h3 className="text-xs font-bold text-stone-600 uppercase tracking-widest px-1">📦 결제 및 배송 실시간 상황판</h3>
            
            {orders.length > 0 ? (
              orders.map((ord) => (
                <div 
                  key={ord.id}
                  className="bg-white border border-stone-200 p-5 rounded-2xl shadow-2xs flex flex-col gap-4 hover:shadow-xs transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                    <div>
                      <span className="text-[10px] text-stone-400 font-mono font-bold block">주문서 고유 일련번호: {ord.id}</span>
                      <span className="text-[10px] text-stone-400 font-mono font-medium block mt-0.5">접수 일자: {ord.createdAt}</span>
                    </div>
                    {/* Delivery Shipment Badge status */}
                    <span className={`text-xs font-bold px-3.5 py-1 rounded-full border ${
                      ord.status === '배송 완료' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      ord.status === '배송 중' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      ord.status === '제작 중' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' :
                      'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {ord.status}
                    </span>
                  </div>

                  {/* Order items lists listing */}
                  <div className="divide-y divide-stone-50">
                    {ord.items.map((it) => (
                      <div key={it.id} className="py-2.5 flex items-center justify-between text-xs font-semibold">
                        <div className="flex items-center gap-2">
                          <span className="inline-block w-1.5 h-1.5 bg-stone-900 rounded-full" />
                          <span className="text-stone-850">{it.name}</span>
                          <span className="text-stone-400 font-normal">({it.quantity}개)</span>
                        </div>
                        <span className="text-stone-900 font-bold">{(it.price * it.quantity).toLocaleString()}원</span>
                      </div>
                    ))}
                  </div>

                  {/* Summary of checkout values */}
                  <div className="bg-stone-50 p-3 rounded-xl text-xs font-semibold text-stone-500 grid grid-cols-1 sm:grid-cols-2 gap-2 border border-stone-200/35">
                    <div>
                      <p>• 수취 성함: <strong className="text-stone-800">{ord.recipientName} 님</strong> / 연락처: <strong className="text-stone-700">{ord.phone || '공개전 수취'}</strong></p>
                      <p>• 배송 자택주소: <strong className="text-stone-850 font-normal">{ord.deliveryAddress}</strong></p>
                    </div>
                    <div className="sm:text-right border-t sm:border-t-0 sm:border-l border-stone-200/50 sm:pl-4 pt-2 sm:pt-0">
                      <p>이체방식: <strong>{ord.paymentMethod}</strong> 수동 지정</p>
                      <p className="text-stone-900 font-bold mt-0.5">최종 이체액: <span className="text-rose-500 font-black">{ord.totalPrice.toLocaleString()}원</span></p>
                    </div>
                  </div>

                  {/* Real-time Tracking number display if any exists */}
                  {ord.trackingNumber && (
                    <div className="bg-blue-50 border border-blue-150 p-2.5 rounded-xl text-[10px] text-blue-800 font-bold flex items-center gap-1">
                      <Ticket className="w-4 h-4 animate-spin-slow" />
                      <span>우체국 안심 배송 운송장 번호: {ord.trackingNumber}</span>
                    </div>
                  )}

                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white/45 rounded-2xl border border-dashed border-stone-200 flex flex-col items-center justify-center p-6">
                <p className="text-xs text-stone-400 font-bold">아직 결제/주문서 요청 접수 이력이 없습니다!</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Custom Keyring Requests */}
        {activeTab === 'customs' && (
          <div id="customs-stack" className="flex flex-col gap-4 animate-fade-in">
            <h3 className="text-xs font-bold text-stone-600 uppercase tracking-widest px-1">✨ 나만의 1:1 커스텀 접수 현장</h3>
            
            {customOrders.length > 0 ? (
              customOrders.map((cust) => (
                <div 
                  key={cust.id}
                  className="bg-white border border-stone-200 p-5 rounded-2xl shadow-2xs flex flex-col sm:flex-row gap-6 hover:shadow-xs transition-shadow relative"
                >
                  {/* Left structural mini preview */}
                  <div className="flex-none w-full sm:w-[130px] flex flex-col items-center justify-center bg-stone-50 rounded-xl border border-stone-100 p-2 h-auto shrink-0">
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

                  {/* Right metadata description details */}
                  <div className="flex-1 flex flex-col gap-3 justify-between">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-50 pb-2">
                        <div>
                          <span className="text-[10px] text-stone-400 font-mono font-bold block">1:1 커스텀 키: {cust.id}</span>
                          <span className="text-[10px] text-stone-400 font-mono block mt-0.5">설계 진술일: {cust.requestedAt}</span>
                        </div>
                        <span className={`text-[11px] font-bold px-3 py-0.5 rounded-full border ${
                          cust.status === '배송 완료' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                          cust.status === '제작 중' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' :
                          'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          {cust.status}
                        </span>
                      </div>

                      {/* Configurations specifications */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px] text-stone-500 font-semibold leading-relaxed">
                        <p>• 프레임: <strong className="text-stone-850 uppercase">{cust.config.shape}형</strong></p>
                        <p>• 안개펄: <strong>{cust.config.hasGlitter}</strong></p>
                        <p>• 문안: <strong className="text-stone-850 font-mono font-extrabold">"{cust.config.wording}"</strong></p>
                        <p>• 펜던트참: <strong className="text-stone-900 font-bold">{cust.config.charmType}</strong></p>
                      </div>

                      {/* Admin feedback replies layout bubble */}
                      {cust.adminFeedback ? (
                        <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 mt-3 flex items-start gap-2 text-[11px] text-stone-600 leading-relaxed font-semibold">
                          <MessageCircle className="w-4.5 h-4.5 text-stone-900 shrink-0 mt-0.5 animate-pulse" />
                          <div>
                            <p className="text-stone-900 font-extrabold mb-0.5">Wacky Willy 작가 피드백 조율:</p>
                            <p>"{cust.adminFeedback}"</p>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-stone-50/50 p-2.5 border border-stone-200/40 rounded-xl text-[10px] text-stone-400 font-medium leading-relaxed mt-2.5">
                          ✍️ 현재 수공 담당자가 디자인 레이아웃을 꼼꼼하게 검토하고 있습니다. 
                          잠시만 기다려 주시면 인스타 계정 대화나 이 이메일 확인창에 시안 대답을 남겨드릴게요!
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between border-t border-stone-50 pt-2.5 mt-2 text-[11px]">
                      <span className="text-stone-400 font-semibold">신청 세트 개수: {cust.quantity}개</span>
                      <span className="text-rose-500 font-extrabold">추가 정산예정액: 약 {cust.price.toLocaleString()}원</span>
                    </div>

                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white/45 rounded-2xl border border-dashed border-stone-200 flex flex-col items-center justify-center p-6">
                <p className="text-xs text-stone-400 font-bold">아직 단독 1:1 커스텀 키링 빌더 설계 접수 이력이 없습니다!</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: Sent Inquiries */}
        {activeTab === 'inquiries' && (
          <div id="inquiries-stack" className="flex flex-col gap-4 animate-fade-in">
            <h3 className="text-xs font-bold text-stone-600 uppercase tracking-widest px-1">💬 대화형 문의 내역 정리</h3>
            
            {inquiries.length > 0 ? (
              inquiries.map((inq) => (
                <div 
                  key={inq.id}
                  className="bg-white border border-stone-200 p-5 rounded-2xl shadow-2xs flex flex-col gap-3 hover:shadow-xs transition-shadow"
                >
                  <div className="flex justify-between items-center border-b border-stone-100 pb-2">
                    <div>
                      <span className="text-stone-400 font-mono text-[10px]">등록 키: {inq.id}</span>
                      <p className="text-xs font-black text-stone-850 bg-stone-100 px-2.5 py-0.5 rounded-full w-fit mt-1">
                        {inq.inquiryType}
                      </p>
                    </div>
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${
                      inq.isAnswered ? 'bg-[#E8F5E9] text-emerald-800 border-emerald-200' : 'bg-[#FFF9C4] text-amber-900 border-amber-300'
                    }`}>
                      {inq.isAnswered ? '✓ 답변완료' : '접수 검토중'}
                    </span>
                  </div>

                  {/* Customer Question text */}
                  <div className="text-xs leading-relaxed font-semibold text-stone-700 bg-stone-50/50 p-3 rounded-xl border border-stone-150/40">
                    <p className="text-stone-400 text-[10px] uppercase font-mono tracking-wider font-extrabold mb-1">My Question:</p>
                    <p>"{inq.content}"</p>
                  </div>

                  {/* Admin Reply text bubble */}
                  {inq.reply ? (
                    <div className="text-xs leading-relaxed font-semibold text-stone-900 bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                      <p className="text-stone-600 text-[10px] uppercase font-mono tracking-wider font-extrabold mb-1">Wacky Willy Official Reply:</p>
                      <p>"{inq.reply}"</p>
                    </div>
                  ) : (
                    <p className="text-[10px] text-stone-400 px-1">
                      * 접수된 문의 답변은 상단 '관리자 대시보드'에서 직접 답변 작성 시뮬레이션을 완료할 수도 있습니다.
                    </p>
                  )}

                  <span className="text-stone-400 font-mono text-[9px] text-right block mt-1">접수 시간: {inq.requestedAt}</span>

                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white/45 rounded-2xl border border-dashed border-stone-200 flex flex-col items-center justify-center p-6">
                <p className="text-xs text-stone-400 font-bold">전송된 CS 문의글 접수 기록이 비어 있습니다!</p>
              </div>
            )}
          </div>
        )}

      </section>

    </div>
  );
}
