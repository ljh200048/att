/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { Sparkles, ArrowRight, Upload, Info, CheckCircle2, ShieldQuestion, Heart, Smartphone, Trash } from 'lucide-react';
import { CustomOrder, CustomKeyringConfig } from '../types';
import KeyringPreview from '../components/KeyringPreview';

interface CustomOrderViewProps {
  onAddCustomOrder: (order: Omit<CustomOrder, 'id' | 'requestedAt' | 'status' | 'price'>) => void;
  currentUserEmail?: string;
  currentUserName?: string;
}

export default function CustomOrderView({
  onAddCustomOrder,
  currentUserEmail = '',
  currentUserName = '',
}: CustomOrderViewProps) {
  // Stepper State
  const [step, setStep] = useState<number>(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [name, setName] = useState<string>(currentUserName);
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>(currentUserEmail);
  const [instagramId, setInstagramId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [requests, setRequests] = useState<string>('');
  const [referenceImage, setReferenceImage] = useState<string>(''); // base64 representation if uploaded

  // Keyring Configuration State (The core real-time parameters)
  const [keyringType, setKeyringType] = useState<string>('Wacky Willy 오리지널 자수 스트랩 1:1 풀커스텀');
  const [shape, setShape] = useState<'heart' | 'circle' | 'square' | 'star' | 'bear'>('heart');
  const [selectedColor, setSelectedColor] = useState<string>('딥블랙');
  const [wording, setWording] = useState<string>('WILLY');
  const [charmType, setCharmType] = useState<'heart' | 'ribbon' | 'bear' | 'star' | 'flower' | 'none'>('ribbon');
  const [hasGlitter, setHasGlitter] = useState<'none' | 'basic' | 'holographic'>('basic');

  // Interactive base colors list for fabric webbing strap
  const baseColorPalettes = [
    { name: '러블리핑크', color: '#FFD1D7' },
    { name: '소프트라벤더', color: '#E1D5F5' },
    { name: '스카이블루', color: '#C5E3FC' },
    { name: '크림화이트', color: '#FAFAF9' },
    { name: '허니옐로우', color: '#FFF59D' },
    { name: '피치살구', color: '#FFE0B2' },
    { name: '딥블랙', color: '#292524' },
    { name: '네이비블루', color: '#1E293B' }
  ];

  // Handle local reference image uploaded by standard user file selection
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setReferenceImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileSelection = () => {
    fileInputRef.current?.click();
  };

  // Submit and package the configuration payload
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!name || !phone || !email) {
      alert('주문자 성함, 대표 연락처, 그리고 결제용 이메일을 모두 입력해 주세요!');
      return;
    }

    const config: CustomKeyringConfig = {
      keyringType,
      shape,
      selectedColor,
      wording,
      charmType,
      hasGlitter,
      customImageRef: referenceImage || undefined
    };

    onAddCustomOrder({
      userId: 'customer_simulated',
      name,
      phone,
      email,
      instagramId: instagramId || undefined,
      config,
      quantity,
    });

    setStep(3); // success view
  };

  const resetBuilder = () => {
    setStep(1);
    setName(currentUserName);
    setPhone('');
    setEmail(currentUserEmail);
    setInstagramId('');
    setQuantity(1);
    setRequests('');
    setReferenceImage('');
    setShape('heart');
    setSelectedColor('딥블랙');
    setWording('WILLY');
    setCharmType('ribbon');
    setHasGlitter('basic');
  };

  return (
    <div id="custom-builder-view" className="flex flex-col gap-8 pb-12">
      
      {/* Title intro description banner */}
      <section className="flex flex-col gap-2 border-b border-stone-200 pb-5">
        <h1 className="text-2xl md:text-3xl font-black text-stone-900 tracking-tight flex items-center gap-2 uppercase">
          <Sparkles className="w-7 h-7 text-stone-900 animate-spin-slow" />
          <span>Wacky Willy 1:1 SPECIAL CUSTOM HOUSE</span>
        </h1>
        <p className="text-xs md:text-sm text-stone-550 leading-relaxed font-semibold">
          와키윌리의 독창적인 실시간 시안 빌더 시스템을 활용하여 모양을 다듬고 참 구성을 바꿔 세상에 존재하지 않았던 감성을 창조하세요.
        </p>
      </section>

      {step === 3 ? (
        /* Success screen */
        <section className="bg-white rounded-3xl border border-stone-200 p-8 md:p-12 text-center max-w-lg mx-auto flex flex-col items-center justify-center gap-6 shadow-xs animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center animate-bounce border-2 border-emerald-100">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-stone-900 font-black">CUSTOM DESIGN POSTED!</h2>
            <p className="text-xs text-stone-500 mt-2 leading-relaxed font-semibold">
              제출해 주신 1:1 맞춤 제작 정보가 Wacky Willy 아틀리에에 무사히 보관되었습니다.<br />
              지정해 주신 연락처의 <span className="text-amber-800 font-bold underline">카카오 알림톡(💬)</span> 및 인스타그램 DM을 통해 디자이너가 조색 구성한 실시간 핀 배치 도안을 즉시 수신하실 수 있습니다!
            </p>
          </div>
          <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/50 w-full text-xs text-left divide-y divide-stone-100">
            <div className="flex justify-between py-1.5"><span className="text-stone-400">주문 접수자</span><span className="text-stone-800 font-bold">{name}님</span></div>
            <div className="flex justify-between py-1.5"><span className="text-stone-400">메인 데코 와펜</span><span className="text-stone-800 font-bold uppercase">{shape} 자수 스트랩</span></div>
            <div className="flex justify-between py-1.5"><span className="text-stone-400">선택 스트랩 색상</span><span className="text-stone-800 font-bold">{selectedColor}</span></div>
            <div className="flex justify-between py-1.5"><span className="text-stone-400">자수 알파벳 이니셜</span><span className="text-stone-800 font-mono font-bold">"{wording}"</span></div>
          </div>
          <div className="flex gap-2 w-full">
            <button 
              onClick={() => resetBuilder()}
              className="cursor-pointer flex-1 bg-stone-100 hover:bg-stone-200 text-stone-700 py-3 rounded-full text-xs font-bold transition-all"
            >
              새로 커스텀 만들기
            </button>
          </div>
        </section>
      ) : (
        /* Side by Side Split interactive form page */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Panel: Real-time updated preview card */}
          <div className="lg:col-span-4 flex flex-col gap-3 sticky top-24">
            <h2 className="text-xs font-black text-stone-900 uppercase tracking-widest flex items-center gap-1">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>실시간 빌딩 가상 시안</span>
            </h2>
            <KeyringPreview 
              shape={shape}
              selectedColor={selectedColor}
              wording={wording}
              charmType={charmType}
              hasGlitter={hasGlitter}
              customImageRef={referenceImage || undefined}
              className="h-[360px] bg-white border-4 shadow-xs border-stone-900"
              interactive={true}
            />
            
            {/* Custom info alert box */}
            <div className="bg-stone-50 p-4 border border-stone-200 rounded-xl flex gap-2.5 text-xs text-stone-500 leading-relaxed font-semibold">
              <Info className="w-5 h-5 text-stone-900 flex-none" />
              <p>
                선택하신 고밀도 면 원단 자수 스트랩, 정교한 와펜 패치 및 사틴 이니셜 자수가 실시간 업데이트 배합 시뮬레이팅됩니다. 실제 제작 수공예품 역시 이 시안을 골자로 전문가가 정성 들여 직조 배포합니다.
              </p>
            </div>
          </div>

          {/* Right Panel: Stepper forms config choices */}
          <div className="lg:col-span-8 bg-white border border-stone-200 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
            
            {/* Stepper indicators header */}
            <div className="flex items-center gap-2 border-b border-stone-100 pb-4">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step === 1 ? 'bg-stone-950 text-white' : 'bg-stone-100 text-stone-700'}`}>1</span>
              <span className="text-xs font-bold text-stone-900">키링 시안 설계 리스트</span>
              <div className="flex-1 h-[2px] bg-stone-100 mx-2" />
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step === 2 ? 'bg-stone-950 text-white' : 'bg-stone-100 text-stone-550'}`}>2</span>
              <span className="text-xs font-bold text-stone-900 font-semibold">인적 정보 및 파일 접수</span>
            </div>

            {step === 1 ? (
              /* Step 1: Real-time customization fields */
              <div id="builder-choices-form" className="flex flex-col gap-6 animate-fade-in">
                
                {/* 1. Base shape outline choice */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-stone-600">1. 메인 무드 포인트 데코 와펜</span>
                  <div className="grid grid-cols-5 gap-2">
                    {[
                      { icon: '❤️', val: 'heart', label: '러브가랜드' },
                      { icon: '🍕', val: 'circle', label: '피자슬라이스' },
                      { icon: '🛹', val: 'star', label: '스케이트보드' },
                      { icon: '🧸', val: 'bear', label: '파일럿베어' },
                      { icon: '🎧', val: 'square', label: '헤드폰스트릿' }
                    ].map(item => (
                      <button
                        key={item.val}
                        onClick={() => setShape(item.val as any)}
                        className={`cursor-pointer border py-2.5 rounded-xl flex flex-col items-center justify-center gap-1 text-[11px] font-bold transition-all ${
                          shape === item.val 
                            ? 'bg-stone-900 border-stone-900 text-white font-black' 
                            : 'bg-white border-stone-150 hover:border-stone-400 hover:text-stone-900 text-stone-605'
                        }`}
                      >
                        <span className="text-lg">{item.icon}</span>
                        <span className="truncate w-full text-center">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Color Choice layout in circular grid */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-stone-600">2. 코튼 웨빙 스트랩 원단 색상 마감</span>
                  <div className="grid grid-cols-4 gap-2">
                    {baseColorPalettes.map(palette => (
                      <button
                        key={palette.name}
                        onClick={() => setSelectedColor(palette.name)}
                        className={`cursor-pointer border p-2 rounded-xl flex flex-col items-center gap-1.5 transition-all text-[10px] font-bold ${
                          selectedColor === palette.name
                            ? 'bg-stone-900 border-stone-900 text-white'
                            : 'bg-white border-stone-150 hover:border-stone-450'
                        }`}
                      >
                        <span className="w-5 h-5 rounded-full border border-stone-250 animate-pulse" style={{ background: palette.color }} />
                        <span className="truncate w-full text-center">{palette.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Personalized logo text etching */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-stone-600">3. 세로 배열 알파벳 이니셜 자수 (최대 5자)</span>
                  <input
                    type="text"
                    maxLength={5}
                    value={wording}
                    onChange={(e) => setWording(e.target.value)}
                    placeholder="예: PLAY, Willy, LOVE 등..."
                    className="w-full text-xs text-stone-800 bg-stone-50 border border-stone-250 rounded-xl p-3 focus:outline-none focus:bg-white focus:border-stone-450 font-semibold uppercase tracking-wider"
                  />
                  <span className="text-[10px] text-stone-400 leading-normal font-semibold">
                    * 이니셜 자수 알파벳은 3~4자 배치하는 구조가 가장 스트랩 비율상 예쁘고 돋보입니다.
                  </span>
                </div>

                {/* 4. Accessory item hanger */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-stone-600">4. 다이렉트 보조 패츠 참 고리 추가</span>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {[
                      { unicode: '➰', val: 'ribbon', label: '파스텔리본' },
                      { unicode: '🎗️', val: 'heart', label: '미니하트참' },
                      { unicode: '🧸', val: 'bear', label: '퍼플베어참' },
                      { unicode: '⭐', val: 'star', label: '스타링참' },
                      { unicode: '🌸', val: 'flower', label: '블라썸데이지' },
                      { unicode: '❌', val: 'none', label: '없음' }
                    ].map(opt => (
                      <button
                        key={opt.val}
                        onClick={() => setCharmType(opt.val as any)}
                        className={`cursor-pointer select-none border py-2 rounded-xl flex flex-col items-center justify-center gap-1 text-[10px] font-bold transition-all ${
                          charmType === opt.val
                            ? 'bg-stone-900 border-stone-900 text-white'
                            : 'bg-white border-stone-150 hover:border-stone-400'
                        }`}
                      >
                        <span className="text-base">{opt.unicode}</span>
                        <span className="truncate w-full text-center">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. Glitter configuration options */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold text-stone-600">5. 이니셜 링/카라비너 마감 재질 마킹</span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { icon: '📀', val: 'none', label: '실버 O링 클립' },
                      { icon: '🔱', val: 'basic', label: '골드 하트고리 (+500원)' },
                      { icon: '⚙️', val: 'holographic', label: '앤틱 매트블랙 후크' }
                    ].map(opt => (
                      <button
                        key={opt.val}
                        onClick={() => setHasGlitter(opt.val as any)}
                        className={`cursor-pointer border py-2.5 rounded-xl flex flex-col items-center justify-center gap-1.5 text-[11px] font-bold transition-all ${
                          hasGlitter === opt.val
                            ? 'bg-stone-900 border-stone-900 text-white'
                            : 'bg-white border-stone-150 hover:border-stone-400'
                        }`}
                      >
                        <span className="text-base">{opt.icon}</span>
                        <span>{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form Stepper button trigger */}
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="cursor-pointer bg-stone-950 hover:bg-stone-850 text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-full flex items-center justify-center gap-1 px-4 mt-2 transition-all shadow-md active:scale-98"
                >
                  <span>다음 단계: 주문서 정보 입력</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>
            ) : (
              /* Step 2: Customer details billing and sketches upload */
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 animate-fade-in">
                
                {/* Product spec summary block */}
                <div className="bg-stone-50 border border-stone-200/50 p-4 rounded-xl text-xs text-stone-600 flex flex-col gap-1">
                  <p className="font-bold text-stone-900">선택 명세서 요약:</p>
                  <p>• 메인 데코 와펜: <strong className="uppercase">{shape}</strong>형 디자인 와펜 / 마감색상: <strong className="text-stone-900">{selectedColor}</strong> 원단 스트랩</p>
                  <p>• 자수 이니셜: <strong className="font-mono">"{wording}"</strong> / 보조 매치 참: <strong className="text-stone-905">{charmType}</strong> 데코 / 고리 아일렛: <strong>{hasGlitter}</strong> 지정</p>
                </div>

                {/* General Customer Attributes standard inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-stone-600">주문자 성함 *</label>
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="대표 수령인 이름..."
                      className="text-xs text-stone-800 bg-stone-50 border border-stone-200 rounded-xl p-3 focus:outline-none focus:bg-white focus:border-stone-450 font-semibold"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-stone-600">연락처 전화번호 *</label>
                    <input 
                      type="tel" 
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="010-1234-5678형태..."
                      className="text-xs text-stone-800 bg-stone-50 border border-stone-200 rounded-xl p-3 focus:outline-none focus:bg-white focus:border-stone-450 font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-stone-600">이메일 주소 *</label>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="결제 확인 이메일 양식..."
                      className="text-xs text-stone-800 bg-stone-50 border border-stone-200 rounded-xl p-3 focus:outline-none focus:bg-white focus:border-stone-450 font-semibold"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-stone-600">인스타그램 ID (DM 시안 연락용)</label>
                    <input 
                      type="text" 
                      value={instagramId}
                      onChange={(e) => setInstagramId(e.target.value)}
                      placeholder="@내아이디 기입..."
                      className="text-xs text-stone-800 bg-stone-50 border border-stone-200 rounded-xl p-3 focus:outline-none focus:bg-white focus:border-stone-450 font-semibold"
                    />
                  </div>
                </div>

                {/* Kakao notification alert select */}
                <div className="bg-[#FEE500]/10 border border-[#FEE500]/30 rounded-2xl p-4 flex flex-col gap-2">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input 
                      type="checkbox"
                      defaultChecked={true}
                      className="rounded text-amber-500 focus:ring-amber-400 h-4 w-4 mt-0.5 cursor-pointer accent-stone-900" 
                    />
                    <div className="text-[11px] text-stone-700 leading-normal font-semibold">
                      <p className="font-extrabold text-[#191919] flex items-center gap-1">
                        <span>💬 완성된 1:1 시안을 카카오톡 알림망으로 직접 전송받기</span>
                        <span className="bg-[#FEE500] text-[9px] text-amber-950 font-black px-1.5 py-0.2 rounded-full uppercase">RECOMMENDED</span>
                      </p>
                      <p className="text-[10px] text-stone-500 leading-normal mt-0.5 font-normal">
                        체크해 주시면 위에 입력해 주신 연락처 전화번호로 디자이너 배정 직후 완성된 배치 조색안과 손글씨 스케치 조율 메세지가 카카오톡 알림톡으로 다단 즉시 자동 구성됩니다.
                      </p>
                    </div>
                  </label>
                </div>

                {/* Hand sketch uploads system drag and drop preview file list */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-stone-600">참고 수제 이니셜 스케치 업로드(선택)</label>
                  <input 
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="relative">
                    <div 
                      onClick={triggerFileSelection}
                      className="cursor-pointer border-2 border-dashed border-stone-200 hover:border-stone-400 rounded-2xl bg-stone-50 hover:bg-stone-100/30 p-5 text-center flex flex-col items-center justify-center gap-2 transition-all"
                    >
                      {referenceImage ? (
                        <div className="relative flex flex-col items-center">
                          <img 
                            src={referenceImage} 
                            alt="업로드 시안 지석" 
                            className="w-16 h-16 rounded-lg object-cover border border-stone-200" 
                          />
                          <span className="text-[10px] text-[#EEFF00] bg-stone-900 border border-stone-900 px-1 py-0.5 rounded-sm font-bold block mt-1.5 animate-pulse">
                            이미지 전송 완료! 클릭 시 교체
                          </span>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-7 h-7 text-stone-400" />
                          <span className="text-xs font-bold text-stone-600">컴퓨터 혹은 모바일 기기 내 참고 이미지 보조선 선택</span>
                          <span className="text-[9px] text-stone-400 leading-normal font-medium leading-relaxed">
                            원하는 손글씨 모양이나 캡처 도면이 있다면 단원 전송해 주세요.<br />
                            JPG, PNG 등 일반 파일을 모두 지원합니다.
                          </span>
                        </>
                      )}
                    </div>
                    {referenceImage && (
                      <div className="mt-2 text-center">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setReferenceImage('');
                          }}
                          className="bg-red-500 hover:bg-red-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-md border border-black shadow-[1px_1px_0px_rgba(0,0,0,1)] hover:translate-y-[-1px] transition-all cursor-pointer inline-flex items-center gap-1"
                        >
                          <Trash className="w-3 h-3" />
                          <span>이미지 삭제하기</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quantity selection form item row */}
                <div className="flex items-center justify-between border-t border-stone-100 pt-3">
                  <span className="text-xs font-bold text-stone-600">제작 세트 수량</span>
                  <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-full">
                    <button 
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-6.5 h-6.5 bg-white rounded-full flex items-center justify-center text-xs font-bold focus:outline-none cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-xs font-extrabold text-stone-800 px-3 w-8 text-center">{quantity}</span>
                    <button 
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-6.5 h-6.5 bg-white rounded-full flex items-center justify-center text-xs font-bold focus:outline-none cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Optional requests input text block */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-stone-600">그 외 추가 설계 요청사항</label>
                  <textarea 
                    value={requests}
                    onChange={(e) => setRequests(e.target.value)}
                    rows={2}
                    placeholder="예: 리본 끈은 조금만 길게 늘려 수제 조색해주세요. 혹은 투명 참 위치를 조율하고 싶어요."
                    className="w-full text-xs text-stone-800 bg-stone-50 border border-stone-200 rounded-xl p-3 focus:outline-none focus:bg-white focus:border-stone-450 font-medium"
                  />
                </div>

                {/* Back and submit action row button group */}
                <div className="flex gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="cursor-pointer flex-1 bg-stone-100 hover:bg-stone-200 text-stone-700 py-3.5 rounded-full text-xs font-bold transition-all"
                  >
                    시안 단계로 복귀
                  </button>
                  <button
                    type="submit"
                    className="cursor-pointer flex-1 bg-stone-950 hover:bg-stone-800 text-white font-bold py-3.5 rounded-full text-xs flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-98"
                  >
                    <span>커스텀 주문 전송하기</span>
                    <Smartphone className="w-4.5 h-4.5" />
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>
      )}

    </div>
  );
}
