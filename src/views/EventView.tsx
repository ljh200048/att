import React, { useState, useEffect } from 'react';
import { Gift, Ticket, Sparkles, Check, Star, Smile, Calendar, MessageSquare, Award, Trash2 } from 'lucide-react';
import { safeLocalStorageSetItem } from '../utils';

interface EventSubmission {
  id: string;
  name: string;
  contact: string;
  bgColor: string;
  wording: string;
  deco: string;
  createdAt: string;
}

export default function EventView() {
  // Event 1: Welcome Coupon State
  const [downloadedCoupon, setDownloadedCoupon] = useState<boolean>(() => {
    return localStorage.getItem('att_coupon_downloaded') === 'true';
  });

  // Event 2: Raffle Drawing State
  const [submissions, setSubmissions] = useState<EventSubmission[]>(() => {
    const saved = localStorage.getItem('att_event_submissions');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    // Default initial mock submissions to make the board look alive and realistic
    return [
      {
        id: 'sub_1',
        name: '김은수',
        contact: '@eunsoo_oo',
        bgColor: '패션 네온 라임',
        wording: 'CHILL',
        deco: '불꽃 (Flame)',
        createdAt: '2026-06-24'
      },
      {
        id: 'sub_2',
        name: '이지훈',
        contact: '010-3344-****',
        bgColor: '미니멀 솔리드 블랙',
        wording: 'YOUTH',
        deco: '스마일 (Smile)',
        createdAt: '2026-06-23'
      },
      {
        id: 'sub_3',
        name: '최소연',
        contact: '@ssoy_att',
        bgColor: '스위트 하트 핑크',
        wording: 'LUCKY',
        deco: '스타 (Star)',
        createdAt: '2026-06-23'
      }
    ];
  });

  // Raffle Form State
  const [formName, setFormName] = useState('');
  const [formContact, setFormContact] = useState('');
  const [formBgColor, setFormBgColor] = useState('미니멀 솔리드 블랙');
  const [formWording, setFormWording] = useState('');
  const [formDeco, setFormDeco] = useState('스타 (Star)');
  const [formSuccess, setFormSuccess] = useState(false);

  // Event 3: Attendance Stamp State
  const [stamps, setStamps] = useState<string[]>(() => {
    const saved = localStorage.getItem('att_event_stamps');
    return saved ? JSON.parse(saved) : [];
  });

  // Save states to LocalStorage
  useEffect(() => {
    safeLocalStorageSetItem('att_coupon_downloaded', downloadedCoupon ? 'true' : 'false');
  }, [downloadedCoupon]);

  useEffect(() => {
    safeLocalStorageSetItem('att_event_submissions', JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    safeLocalStorageSetItem('att_event_stamps', JSON.stringify(stamps));
  }, [stamps]);

  // Handle Coupon Download
  const handleDownloadCoupon = () => {
    if (downloadedCoupon) return;
    setDownloadedCoupon(true);
    alert('🎉 3,000원 웰컴 할인 쿠폰이 정상 발급되었습니다!\n[MY PAGE] 또는 결제 단계에서 자동으로 적용됩니다.');
  };

  // Handle Raffle Form Submission
  const handleRaffleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formContact.trim() || !formWording.trim()) {
      alert('⚠️ 모든 응모 항목을 올바르게 작성해 주세요.');
      return;
    }
    if (formWording.length > 8) {
      alert('⚠️ 원하는 문구는 영문 대문자 기준 최대 8자까지만 입력 가능합니다.');
      return;
    }

    const newSubmission: EventSubmission = {
      id: `sub_${Date.now()}`,
      name: formName.trim(),
      contact: formContact.trim(),
      bgColor: formBgColor,
      wording: formWording.toUpperCase().trim(),
      deco: formDeco,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setSubmissions(prev => [newSubmission, ...prev]);
    setFormSuccess(true);
    setFormName('');
    setFormContact('');
    setFormWording('');

    setTimeout(() => {
      setFormSuccess(false);
    }, 4000);
  };

  // Delete submission (Helper for easier testing)
  const handleDeleteSubmission = (id: string) => {
    setSubmissions(prev => prev.filter(s => s.id !== id));
  };

  // Handle Attendance Stamp Press
  const handleStampPress = () => {
    if (stamps.length >= 5) {
      alert('🎁 이미 5개의 스탬프를 모두 완성하여 무료 배송 리워드 쿠폰을 수령하셨습니다!');
      return;
    }

    const todayStr = new Date().toISOString().split('T')[0];
    if (stamps.includes(todayStr)) {
      // Allow multi-stamping with custom debug instruction or just alert, let's allow multi stamping to make it fun and testable but warn nicely
      const confirmForce = window.confirm(
        '💡 오늘은 이미 스탬프를 획득하셨습니다!\n(※ 빠른 개발 테스트 및 시연을 위해 추가로 스탬프를 찍으시겠습니까?)'
      );
      if (!confirmForce) return;
      
      const debugStampId = `${todayStr}_debug_${Date.now()}`;
      setStamps(prev => [...prev, debugStampId]);
      return;
    }

    setStamps(prev => {
      const next = [...prev, todayStr];
      if (next.length === 5) {
        setTimeout(() => {
          alert('🎊 축하합니다!\n5일 연속 출석 스탬프 미션을 달성하셨습니다.\n[무료배송 쿠폰: ATTSHIPFREE]이 발급되었습니다!');
        }, 100);
      }
      return next;
    });
  };

  // Reset Stamp Board (Convenient testing)
  const handleResetStamps = () => {
    if (window.confirm('🔄 스탬프 보드를 초기화하시겠습니까?')) {
      setStamps([]);
    }
  };

  return (
    <div id="event-view-container" className="flex flex-col gap-16 pb-20">
      
      {/* 1. Header Section */}
      <section className="text-center max-w-2xl mx-auto flex flex-col items-center gap-4 mt-6">
        <span className="flex items-center gap-1.5 bg-black text-[#39FF14] border border-black px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>att. WAPPEN EXPERIENCE</span>
        </span>
        <h1 className="font-sans text-3xl md:text-5xl text-black font-extrabold tracking-tight mt-1 leading-tight uppercase">
          WAPPEN EXPERIENCE EVENT<br />
          <span className="text-stone-500 font-medium text-lg sm:text-xl md:text-2xl tracking-normal block mt-2.5">
            att. 오프라인 & 온라인 와펜 커스텀 체험 프로그램
          </span>
        </h1>
        <p className="text-xs text-stone-500 leading-relaxed font-semibold max-w-lg mt-1">
          직접 와펜을 고르고 디자인하는 즐거움을 느껴보세요! att.만의 고유한 체험 기회를 통해 나만의 커스텀 아이템을 제작하고 풍성한 선물 리워드를 받으실 수 있습니다.
        </p>
      </section>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: EVENTS CONTAINER (8/12) */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* EVENT 1: CUSTOM EMBROIDERY PATCH DRAWING (Raffle Submit Form) */}
          <div className="bg-white border-2 border-black p-6 md:p-8 shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-lg">
            <div className="space-y-4 border-b border-stone-150 pb-5 mb-6 text-left">
              <div className="flex items-center gap-2">
                <span className="bg-black text-[#39FF14] text-[9.5px] font-mono font-bold px-2 py-0.5 uppercase tracking-wider">
                  EVENT 01
                </span>
                <span className="text-[11px] font-bold text-stone-400 font-mono">1:1 CUSTOM RAFFLE</span>
              </div>
              <h3 className="text-xl md:text-2xl font-black text-stone-900 leading-tight">
                나만의 디자인 와펜 & 자수 패치 무료 체험 Event
              </h3>
              <p className="text-xs text-stone-500 font-semibold leading-relaxed">
                여러분이 직접 고른 배경 컬러와 캐릭터 데코, 문구 조합으로 세상에 단 하나뿐인 와펜을 디자인해 보세요!<br />
                매주 독창적이고 특별한 조합을 제출해 주신 5분을 선정하여 <span className="text-[#FF1493] font-black">att. 특제 핸드메이드 와펜 패치</span>로 실물 제작해 무료로 보내드립니다.
              </p>
            </div>

            {/* Application Interactive Form */}
            <form onSubmit={handleRaffleSubmit} className="space-y-4 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1.5">이름 (NAME)</label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="체험 신청자 성함"
                    className="w-full bg-stone-50 border border-stone-300 px-3.5 py-2.5 text-xs font-bold text-black outline-none focus:border-black rounded"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1.5">인스타그램 ID 또는 연락처</label>
                  <input
                    type="text"
                    value={formContact}
                    onChange={(e) => setFormContact(e.target.value)}
                    placeholder="예: @instagram_id 또는 010-XXXX-XXXX"
                    className="w-full bg-stone-50 border border-stone-300 px-3.5 py-2.5 text-xs font-bold text-black outline-none focus:border-black rounded"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1.5">체험하고 싶은 와펜 배경 컬러</label>
                  <select
                    value={formBgColor}
                    onChange={(e) => setFormBgColor(e.target.value)}
                    className="w-full cursor-pointer bg-stone-50 border border-stone-300 px-3.5 py-2.5 text-xs font-bold text-black outline-none focus:border-black rounded"
                  >
                    <option value="미니멀 솔리드 블랙">미니멀 솔리드 블랙</option>
                    <option value="패션 네온 라임">패션 네온 라임</option>
                    <option value="스위트 하트 핑크">스위트 하트 핑크</option>
                    <option value="오션 딥 블루">오션 딥 블루</option>
                    <option value="앤틱 빈티지 베이지">앤틱 빈티지 베이지</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1.5">매칭할 와펜 캐릭터/데코 선택</label>
                  <select
                    value={formDeco}
                    onChange={(e) => setFormDeco(e.target.value)}
                    className="w-full cursor-pointer bg-stone-50 border border-stone-300 px-3.5 py-2.5 text-xs font-bold text-black outline-none focus:border-black rounded"
                  >
                    <option value="스타 (Star)">스타 (Star)</option>
                    <option value="하트 (Heart)">하트 (Heart)</option>
                    <option value="스마일 (Smile)">스마일 (Smile)</option>
                    <option value="불꽃 (Flame)">불꽃 (Flame)</option>
                    <option value="데이지 꽃 (Flower)">데이지 꽃 (Flower)</option>
                    <option value="체리 (Cherry)">체리 (Cherry)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
                  와펜에 새길 영문 자수 문구 <span className="text-[#FF1493] font-black">(최대 8자 영문 대문자)</span>
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={formWording}
                    onChange={(e) => setFormWording(e.target.value)}
                    placeholder="예: UNIQUE, ATTACH"
                    maxLength={8}
                    className="w-full bg-stone-50 border border-stone-300 px-3.5 py-2.5 text-xs font-mono font-bold text-black outline-none focus:border-black rounded tracking-widest uppercase"
                    required
                  />
                  <span className="absolute right-3.5 text-[10px] font-mono text-stone-400 font-bold">
                    {formWording.length} / 8
                  </span>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full cursor-pointer bg-black text-white hover:bg-[#39FF14] hover:text-black font-black text-xs py-3.5 tracking-widest uppercase transition-colors border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                >
                  나만의 커스텀 와펜 체험 응모하기 —
                </button>
              </div>

              {formSuccess && (
                <div className="bg-[#39FF14]/15 border-2 border-dashed border-[#39FF14] text-stone-900 p-3.5 text-xs font-bold text-center mt-4 rounded">
                  🎉 디자인 제출 완료! 나만의 조합이 성공적으로 응모되었습니다. 선정되신 분께 개별 연락 후 제작에 들어갑니다!
                </div>
              )}
            </form>
          </div>

        </div>

        {/* RIGHT COLUMN: ATTENDANCE STAMPS SIDEBAR (4/12) */}
        <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-28">
          
          {/* ATTENDANCE CHECK STAMP CARD */}
          <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_rgba(0,0,0,1)] text-center rounded-lg relative overflow-hidden">
            {/* Stamp topper banner */}
            <div className="bg-stone-950 text-[#39FF14] text-[9px] font-mono font-black py-2 tracking-[0.2em] uppercase absolute top-0 left-0 right-0">
              STAMP MISSION
            </div>

            <div className="pt-6 space-y-4">
              <div className="flex justify-center">
                <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-[#FF1493]">
                  <Calendar className="w-6 h-6" />
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-black text-stone-900">
                  데일리 와펜 마스터 스탬프
                </h3>
                <p className="text-[11px] text-stone-500 font-semibold leading-relaxed">
                  매일 출석 도장을 찍고 와펜 체험을 응원받으세요!<br />
                  5일 완성 시 <span className="font-extrabold text-[#FF1493]">무료 배송 쿠폰</span> 자동 지급!
                </p>
              </div>

              {/* Stamp Progress Board (5 slots) */}
              <div className="flex items-center justify-center gap-2 py-4">
                {[1, 2, 3, 4, 5].map((num) => {
                  const isStamped = stamps.length >= num;
                  return (
                    <div 
                      key={num}
                      className={`w-10 h-10 rounded-full border-2 flex flex-col items-center justify-center font-mono font-bold text-xs relative transition-all duration-300 ${
                        isStamped
                          ? 'bg-[#39FF14] border-black text-black scale-105 rotate-6 shadow-sm'
                          : 'bg-stone-50 border-stone-200 text-stone-400'
                      }`}
                    >
                      {isStamped ? (
                        <div className="flex flex-col items-center justify-center">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span className="text-[7.5px] font-black -mt-0.5">att.</span>
                        </div>
                      ) : (
                        <span>{num}</span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Progress counter */}
              <div className="bg-stone-50 py-2.5 px-3 border border-stone-200 rounded text-xs font-bold text-stone-700 flex justify-between items-center">
                <span>현재 도장 개수</span>
                <span className="font-mono text-black font-extrabold text-sm">
                  {stamps.length} / 5
                </span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleStampPress}
                  className="w-full cursor-pointer bg-black hover:bg-[#FF1493] hover:text-white text-white font-black text-xs py-3.5 tracking-wider uppercase transition-colors border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                >
                  오늘의 와펜 스탬프 찍기 (Stamp)
                </button>

                {/* Reset helper */}
                {stamps.length > 0 && (
                  <button
                    onClick={handleResetStamps}
                    className="text-[10px] text-stone-400 hover:text-red-500 font-bold hover:underline cursor-pointer transition-colors block mx-auto"
                  >
                    스탬프 보드 리셋
                  </button>
                )}
              </div>

              {stamps.length >= 5 && (
                <div className="bg-[#FF1493]/10 border border-dashed border-[#FF1493] p-3 text-[11px] font-bold text-[#FF1493] rounded leading-relaxed">
                  🏆 리워드 획득 성공!<br />
                  쿠폰 코드: <span className="font-mono font-black select-all bg-white px-1.5 py-0.5 border border-[#FF1493]/30 rounded">ATTSHIPFREE</span>
                </div>
              )}
            </div>
          </div>

          {/* INSTAGRAM PHOTO REVIEW NOTIFICATION */}
          <div className="bg-[#111111] text-white border-2 border-black p-6 shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-lg text-left space-y-4">
            <div className="flex items-center gap-2">
              <span className="bg-[#39FF14] text-black text-[9px] font-mono font-bold px-2 py-0.5 uppercase tracking-wider">
                WAPPEN GIFT
              </span>
              <span className="text-[10px] text-stone-400 font-bold tracking-widest font-mono">SNS EVENT</span>
            </div>

            <h4 className="text-base font-black text-white">
              인스타그램 와펜 인증샷 이벤트
            </h4>

            <p className="text-xs text-stone-400 font-semibold leading-relaxed">
              제작하신 나만의 와펜 키링 패키지 또는 커스텀 빌더 가상 조합 스크린샷을 인스타그램 피드나 스토리에 필수 해시태그 <span className="text-[#39FF14] font-bold">#att #어태치 #와펜체험</span>와 함께 업로드하면 기프티콘 전원 증정!
            </p>

            <div className="pt-2 border-t border-stone-800 space-y-2.5 text-[11px] font-bold text-stone-300">
              <div className="flex justify-between">
                <span>참여자 전원</span>
                <span className="text-[#39FF14]">스타벅스 아메리카노</span>
              </div>
              <div className="flex justify-between">
                <span>우수 리뷰어 (매주 2명)</span>
                <span className="text-[#FF1493]">att. 한정판 가죽 키링 풀세트</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
