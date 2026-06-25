import React, { useState, useEffect } from 'react';
import { Gift, Ticket, Sparkles, Check, Star, Smile, Calendar, MessageSquare, Award, Trash2 } from 'lucide-react';
import { safeLocalStorageSetItem } from '../utils';
import { User } from '../types';

interface EventSubmission {
  id: string;
  name: string;
  contact: string;
  bgColor: string;
  wording: string;
  deco: string;
  createdAt: string;
}

// Helper function to send Telegram notifications
const sendTelegramNotification = async (sub: EventSubmission) => {
  const localToken = localStorage.getItem('att_telegram_bot_token');
  const localChatId = localStorage.getItem('att_telegram_chat_id');
  const token = localToken || (import.meta as any).env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = localChatId || (import.meta as any).env.VITE_TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn('Telegram Bot Token or Chat ID is missing. Please set VITE_TELEGRAM_BOT_TOKEN and VITE_TELEGRAM_CHAT_ID in environment variables or LocalStorage settings.');
    return { success: false, reason: 'missing_config' };
  }

  const message = `🔔 [att. 어태치] 새로운 와펜 체험 이벤트 응모!

👤 응모자 정보
• 이름: ${sub.name}
• 연락처/인스타ID: ${sub.contact}

🎨 커스텀 와펜 조합
• 배경 컬러: ${sub.bgColor}
• 캐릭터/데코: ${sub.deco}
• 자수 문구: ${sub.wording}

📅 응모 일시: ${new Date().toLocaleString('ko-KR')}`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.description || `HTTP 에러코드 ${response.status}`);
    }
    console.log('Telegram message sent successfully!');
    return { success: true };
  } catch (err: any) {
    console.error('Failed to send Telegram notification:', err);
    return { success: false, reason: 'api_error', message: err.message };
  }
};

// Helper function to send Telegram test message
const sendTelegramTestMessage = async (customToken?: string, customChatId?: string) => {
  const localToken = localStorage.getItem('att_telegram_bot_token');
  const localChatId = localStorage.getItem('att_telegram_chat_id');
  const token = customToken || localToken || (import.meta as any).env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = customChatId || localChatId || (import.meta as any).env.VITE_TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return { success: false, reason: 'missing_config' };
  }

  const message = `🔔 [att. 어태치] 텔레그램 연동 성공!
  
이 메시지가 보이신다면 봇 토큰과 채팅 ID가 정상적으로 연동된 상태입니다.
테스트 일시: ${new Date().toLocaleString('ko-KR')}`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.description || `HTTP 에러코드 ${response.status}`);
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, reason: 'api_error', message: err.message };
  }
};

interface EventViewProps {
  currentUser?: User | null;
}

export default function EventView({ currentUser }: EventViewProps) {
  const isAdmin = currentUser?.role === 'admin' || localStorage.getItem('att_is_local_admin') === 'true';

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
  const [formConsent, setFormConsent] = useState(false);

  // Telegram settings states for Developer/Admin Panel
  const [localToken, setLocalTokenState] = useState(() => localStorage.getItem('att_telegram_bot_token') || '');
  const [localChatId, setLocalChatIdState] = useState(() => localStorage.getItem('att_telegram_chat_id') || '');
  const [lastSubmissionStatus, setLastSubmissionStatus] = useState<{ success?: boolean; reason?: string; message?: string } | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [testResult, setTestResult] = useState<{ success?: boolean; message?: string } | null>(null);
  const [searchKeyword, setSearchKeyword] = useState('');

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
    if (!formConsent) {
      alert('⚠️ 개인정보 수집 및 이용에 동의하셔야 이벤트 응모가 완료됩니다.');
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
    
    // Reset status and send notification
    setLastSubmissionStatus(null);
    sendTelegramNotification(newSubmission).then((res) => {
      setLastSubmissionStatus(res);
    });

    setFormSuccess(true);
    setFormName('');
    setFormContact('');
    setFormWording('');
    setFormConsent(false);

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
        <span className="flex items-center gap-1.5 bg-black text-white border border-black px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#39FF14] animate-pulse" />
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

              {/* Privacy Consent Checkbox */}
              <div className="bg-stone-50 border border-stone-200 p-3.5 rounded space-y-2 mt-4">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formConsent}
                    onChange={(e) => setFormConsent(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-black rounded border-stone-300 text-black cursor-pointer"
                    required
                  />
                  <span className="text-xs font-bold text-stone-700">
                    [필수] 개인정보 수집 및 이용 동의
                  </span>
                </label>
                <div className="text-[10px] text-stone-400 font-semibold leading-normal pl-6">
                  수집 항목: 이름, 인스타그램 ID/연락처, 응모 내역<br />
                  수집 목적: 이벤트 당첨자 선정 및 실물 와펜 제작/리워드 제공<br />
                  보유 및 이용 기간: 이벤트 당첨자 발표 및 경품 발송 후 30일 이내 지체 없이 파기
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

              {lastSubmissionStatus && !lastSubmissionStatus.success && (
                <div className="bg-amber-50 border-2 border-amber-500/30 text-amber-900 p-4 text-xs font-semibold mt-4 rounded space-y-2 text-left">
                  <div className="flex items-center gap-1.5 text-amber-800 font-extrabold">
                    <span>⚠️ 텔레그램 알림 전송 실패 안내 (관리자 참고용)</span>
                  </div>
                  <p className="text-[11px] text-stone-600 leading-relaxed">
                    디자인 응모는 브라우저(로컬)에 저장되었으나, 텔레그램 연동 정보가 비어 있거나 올바르지 않아 실시간 알림 메시지가 봇으로 전송되지 못했습니다.
                  </p>
                  <p className="text-[11px] text-stone-600 leading-relaxed">
                    {lastSubmissionStatus.reason === 'missing_config' ? (
                      <span>이유: 봇 토큰(Token) 또는 채팅 ID(Chat ID)가 설정되어 있지 않습니다. 페이지 하단의 <strong>⚙️ 텔레그램 알림 연동 및 관리자 설정</strong> 가이드를 통해 설정해 주세요.</span>
                    ) : (
                      <span>에러 메시지: <code className="bg-amber-100 px-1.5 py-0.5 rounded text-amber-950 font-mono font-bold">{lastSubmissionStatus.message}</code></span>
                    )}
                  </p>
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

      {/* 4. Telegram Bot Developer / Admin Configuration Panel */}
      {isAdmin && (
        <section className="bg-stone-50 border-2 border-black p-6 md:p-8 rounded-lg text-left mt-8 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-5 mb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="bg-black text-[#39FF14] text-[9.5px] font-mono font-bold px-2 py-0.5 uppercase tracking-wider">
                  ADMIN CONSOLE
                </span>
                <span className="text-[11px] font-bold text-stone-505 font-mono">TELEGRAM BOT SYNC</span>
              </div>
              <h3 className="text-xl font-black text-stone-900 leading-tight">
                ⚙️ 텔레그램 알림 연동 및 관리자 설정
              </h3>
              <p className="text-xs text-stone-500 font-semibold leading-relaxed">
                고객들의 응모 현황을 실시간으로 텔레그램 메신저로 받아볼 수 있는 연동 설정 창입니다.
              </p>
            </div>
            
            <button
              type="button"
              onClick={() => setShowSettings(!showSettings)}
              className="self-start sm:self-center bg-black hover:bg-stone-800 text-white font-black text-[11px] px-4 py-2 uppercase tracking-wider transition-all border border-black rounded shadow-[2px_2px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
            >
              {showSettings ? '설정창 접기 ▲' : '설정창 열기 ▼'}
            </button>
          </div>

          {showSettings && (
            <div className="space-y-6">
              {/* Real-time Connection Status Indicators */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-stone-200 p-4 rounded flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-bold text-stone-400 uppercase">연동 상태 (STATUS)</div>
                    <div className="text-sm font-black text-stone-800 mt-1 flex items-center gap-1.5">
                      {localToken && localChatId ? (
                        <>
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                          <span className="text-emerald-700 font-bold">브라우저(로컬) 연동 활성화</span>
                        </>
                      ) : (import.meta as any).env.VITE_TELEGRAM_BOT_TOKEN && (import.meta as any).env.VITE_TELEGRAM_CHAT_ID ? (
                        <>
                          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse inline-block" />
                          <span className="text-blue-700 font-bold">환경 변수(ENV) 연동 활성화</span>
                        </>
                      ) : (
                        <>
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                          <span className="text-rose-700 font-bold">연동되지 않음</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-stone-200 p-4 rounded flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-bold text-stone-400 uppercase">연동 우선순위</div>
                    <p className="text-[11px] text-stone-505 font-semibold leading-relaxed mt-1">
                      로컬 브라우저 입력값 (우선) &gt; 배포 환경 변수 (ENV) 순서로 적용됩니다.
                    </p>
                  </div>
                </div>
              </div>

              {/* Config Form */}
              <div className="bg-white border border-stone-200 p-5 rounded space-y-4">
                <h4 className="text-xs font-black text-stone-800 uppercase tracking-wider">
                  🔑 실시간 브라우저 연동 키 입력
                </h4>
                <p className="text-[11px] text-stone-505 font-semibold -mt-2 leading-relaxed">
                  이 브라우저에 연동 키를 즉시 저장하여 테스트할 수 있습니다. (Netlify 설정 없이도 즉시 작동)
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1">Telegram Bot Token</label>
                    <input
                      type="password"
                      value={localToken}
                      onChange={(e) => setLocalTokenState(e.target.value)}
                      placeholder="예: 123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ"
                      className="w-full bg-stone-50 border border-stone-300 px-3.5 py-2.5 text-xs font-mono font-bold text-black outline-none focus:border-black rounded"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1">Telegram Chat ID</label>
                    <input
                      type="text"
                      value={localChatId}
                      onChange={(e) => setLocalChatIdState(e.target.value)}
                      placeholder="예: 987654321 또는 그룹채팅 ID (-100123...)"
                      className="w-full bg-stone-50 border border-stone-300 px-3.5 py-2.5 text-xs font-mono font-bold text-black outline-none focus:border-black rounded"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      localStorage.setItem('att_telegram_bot_token', localToken.trim());
                      localStorage.setItem('att_telegram_chat_id', localChatId.trim());
                      alert('💾 브라우저에 텔레그램 연동 정보가 성공적으로 임시 저장되었습니다!');
                      window.location.reload();
                    }}
                    className="bg-black hover:bg-stone-800 text-white font-black text-xs px-4 py-2.5 uppercase tracking-wider transition-all border border-black rounded shadow-[2px_2px_0px_rgba(0,0,0,1)] cursor-pointer"
                  >
                    기기에 설정 저장하기
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('🔄 로컬에 저장된 설정을 초기화하고 기본 환경변수(ENV) 값으로 복구하시겠습니까?')) {
                        localStorage.removeItem('att_telegram_bot_token');
                        localStorage.removeItem('att_telegram_chat_id');
                        setLocalTokenState('');
                        setLocalChatIdState('');
                        alert('🔄 로컬 설정이 성공적으로 초기화되었습니다!');
                        window.location.reload();
                      }
                    }}
                    className="bg-white hover:bg-stone-100 text-stone-700 font-bold text-xs px-4 py-2.5 border border-stone-300 rounded cursor-pointer"
                  >
                    설정 초기화 (기본값)
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      const tokenToUse = localToken.trim() || (import.meta as any).env.VITE_TELEGRAM_BOT_TOKEN;
                      const chatIdToUse = localChatId.trim() || (import.meta as any).env.VITE_TELEGRAM_CHAT_ID;
                      
                      if (!tokenToUse || !chatIdToUse) {
                        alert('⚠️ 토큰이나 채팅 ID가 비어 있어 테스트를 진행할 수 없습니다.');
                        return;
                      }

                      setTestResult({ message: '테스트 알림 메시지를 전송 중...' });
                      const res = await sendTelegramTestMessage(tokenToUse, chatIdToUse);
                      if (res.success) {
                        setTestResult({ success: true, message: '🎉 성공! 입력하신 텔레그램 방으로 테스트 알림이 발송되었습니다. 메신저를 확인해 보세요!' });
                      } else {
                        setTestResult({ success: false, message: `❌ 전송 실패! 사유: ${res.message || '알 수 없는 오류'}` });
                      }
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-black text-xs px-4 py-2.5 uppercase tracking-wider transition-all rounded shadow-[2px_2px_0px_rgba(0,0,0,0.15)] cursor-pointer"
                  >
                    ⚡ 연동 테스트 메시지 전송
                  </button>
                </div>

                {testResult && (
                  <div className={`p-3.5 rounded text-xs font-bold ${
                    testResult.success === true ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' :
                    testResult.success === false ? 'bg-rose-50 border border-rose-200 text-rose-800' :
                    'bg-stone-100 border border-stone-200 text-stone-600'
                  }`}>
                    {testResult.message}
                  </div>
                )}
              </div>

              {/* 📋 와펜 체험 이벤트 응모 명단 관리 대시보드 */}
              <div className="bg-white border border-stone-200 p-5 rounded space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
                  <div>
                    <h4 className="text-sm font-black text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                      <span>📋 와펜 체험 이벤트 실시간 응모 현황</span>
                      <span className="bg-rose-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-mono">
                        {submissions.length}건
                      </span>
                    </h4>
                    <p className="text-[11px] text-stone-505 font-semibold leading-relaxed">
                      사용자가 웹사이트에서 응모한 디자인 명단입니다. (브라우저 로컬 저장소 기준)
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (submissions.length === 0) {
                          alert('⚠️ 내보낼 응모 내역이 없습니다.');
                          return;
                        }
                        const headers = ['이름', '연락처/SNS', '배경색', '문구', '장식(데코)', '응모일'];
                        const rows = submissions.map(s => [
                          s.name,
                          s.contact,
                          s.bgColor,
                          s.wording,
                          s.deco,
                          s.createdAt
                        ]);
                        const csvContent = "\uFEFF" + [headers.join(','), ...rows.map(r => r.map(val => `"${val.replace(/"/g, '""')}"`).join(','))].join('\n');
                        
                        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.setAttribute('href', url);
                        link.setAttribute('download', `att_event_submissions_${new Date().toISOString().split('T')[0]}.csv`);
                        link.style.visibility = 'hidden';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        alert('💾 엑셀(Excel)에서 바로 쓸 수 있는 CSV 파일로 다운로드되었습니다!');
                      }}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold px-3 py-1.5 rounded flex items-center gap-1 transition-all shadow-[1px_1px_0px_rgba(0,0,0,0.1)] cursor-pointer"
                    >
                      📥 엑셀(CSV) 다운로드
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm('⚠️ 정말로 모든 응모 내역을 삭제하고 초기화하시겠습니까?\n(기본 제공되는 예시 데이터 3건을 제외한 모든 입력 정보가 완전히 지워집니다.)')) {
                          setSubmissions([]);
                          alert('🔄 응모 명단이 초기화되었습니다!');
                        }
                      }}
                      className="bg-stone-100 hover:bg-stone-200 text-stone-600 text-[11px] font-bold px-3 py-1.5 rounded transition-all cursor-pointer"
                    >
                      🗑️ 전체 초기화
                    </button>
                  </div>
                </div>

                {/* 검색 필터 */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="🔍 이름, 연락처/SNS, 문구 등으로 검색..."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 px-3 py-2 text-xs font-semibold text-black outline-none focus:border-black rounded"
                  />
                  {searchKeyword && (
                    <button
                      type="button"
                      onClick={() => setSearchKeyword('')}
                      className="bg-stone-100 hover:bg-stone-200 text-xs text-stone-600 px-3 py-2 rounded font-bold"
                    >
                      지우기
                    </button>
                  )}
                </div>

                {/* 테이블 목록 */}
                <div className="border border-stone-200 rounded overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-stone-100 border-b border-stone-200 font-bold text-stone-700">
                          <th className="p-3">응모일</th>
                          <th className="p-3">이름</th>
                          <th className="p-3">연락처/SNS</th>
                          <th className="p-3">키링 디자인 설정 (배경색 / 문구 / 데코)</th>
                          <th className="p-3 text-center">동작</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100 font-medium text-stone-600">
                        {submissions.filter(s => {
                          if (!searchKeyword.trim()) return true;
                          const kw = searchKeyword.toLowerCase();
                          return (
                            s.name.toLowerCase().includes(kw) ||
                            s.contact.toLowerCase().includes(kw) ||
                            s.bgColor.toLowerCase().includes(kw) ||
                            s.wording.toLowerCase().includes(kw) ||
                            s.deco.toLowerCase().includes(kw)
                          );
                        }).length === 0 ? (
                          <tr>
                            <td colSpan={5} className="p-8 text-center text-stone-400 font-semibold bg-stone-50/50">
                              📪 검색 조건에 맞는 응모 내역이 없습니다.
                            </td>
                          </tr>
                        ) : (
                          submissions
                            .filter(s => {
                              if (!searchKeyword.trim()) return true;
                              const kw = searchKeyword.toLowerCase();
                              return (
                                s.name.toLowerCase().includes(kw) ||
                                s.contact.toLowerCase().includes(kw) ||
                                s.bgColor.toLowerCase().includes(kw) ||
                                s.wording.toLowerCase().includes(kw) ||
                                s.deco.toLowerCase().includes(kw)
                              );
                            })
                            .map((sub) => (
                              <tr key={sub.id} className="hover:bg-stone-50/80 transition-colors">
                                <td className="p-3 font-mono text-[11px] whitespace-nowrap">{sub.createdAt}</td>
                                <td className="p-3 font-extrabold text-stone-900 whitespace-nowrap">{sub.name}</td>
                                <td className="p-3 font-mono text-stone-800 whitespace-nowrap">{sub.contact}</td>
                                <td className="p-3 space-y-1">
                                  <div className="flex flex-wrap items-center gap-1.5">
                                    <span className="bg-stone-100 border border-stone-200 text-stone-800 px-1.5 py-0.5 rounded text-[10px] font-bold">
                                      🎨 {sub.bgColor}
                                    </span>
                                    <span className="bg-black text-[#39FF14] px-2 py-0.5 rounded text-[10px] font-mono font-black tracking-wider">
                                      🔤 {sub.wording}
                                    </span>
                                    <span className="bg-rose-50 border border-rose-100 text-rose-700 px-1.5 py-0.5 rounded text-[10px] font-bold">
                                      🎀 {sub.deco}
                                    </span>
                                  </div>
                                </td>
                                <td className="p-3 text-center whitespace-nowrap">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (window.confirm(`⚠️ [${sub.name}] 고객님의 응모 건을 삭제하시겠습니까?`)) {
                                        handleDeleteSubmission(sub.id);
                                      }
                                    }}
                                    className="text-rose-600 hover:text-rose-800 font-extrabold text-[11px] px-2.5 py-1 hover:bg-rose-50 rounded transition-all cursor-pointer"
                                  >
                                    삭제
                                  </button>
                                </td>
                              </tr>
                            ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Korean Guides */}
              <div className="bg-stone-100 border border-stone-200 p-5 rounded space-y-4">
                <h4 className="text-xs font-black text-stone-800 uppercase tracking-wider">
                  📖 쉽고 빠른 텔레그램 연동 3단계 가이드 (How-to Guide)
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-stone-600 leading-relaxed font-semibold">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-black text-[#39FF14] flex items-center justify-center font-mono font-black text-[10px]">1</span>
                      <span className="font-extrabold text-stone-900">텔레그램 봇 만들기</span>
                    </div>
                    <ol className="list-decimal pl-5 space-y-1 font-medium text-stone-500">
                      <li>텔레그램 앱에서 <span className="text-stone-800 font-extrabold">@BotFather</span> 검색하기</li>
                      <li>채팅방에 <code className="bg-stone-200 px-1 py-0.5 rounded font-bold text-stone-800">/newbot</code> 입력하기</li>
                      <li>봇의 이름과 아이디 입력 후 발급되는 <span className="text-blue-600 font-bold">HTTP API Token</span> 복사해서 위에 입력하기</li>
                    </ol>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-black text-[#39FF14] flex items-center justify-center font-mono font-black text-[10px]">2</span>
                      <span className="font-extrabold text-stone-900">내 채팅 ID(Chat ID) 찾기</span>
                    </div>
                    <ol className="list-decimal pl-5 space-y-1 font-medium text-stone-500">
                      <li>내가 만든 봇 채팅방에 들어가서 <span className="text-stone-800 font-extrabold">/start</span> 버튼 누르기 (★필수!)</li>
                      <li>텔레그램 검색창에 <span className="text-stone-800 font-extrabold">@GetMyChatID_Bot</span> 검색하기</li>
                      <li>이 봇과의 채팅방에서 발급되는 <span className="text-blue-600 font-bold">Your Chat ID</span> 숫자형 ID 복사해서 위에 입력하기</li>
                    </ol>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-black text-[#39FF14] flex items-center justify-center font-mono font-black text-[10px]">3</span>
                      <span className="font-extrabold text-stone-900">Netlify에 영구 설정하기</span>
                    </div>
                    <p className="font-medium text-stone-500 leading-relaxed pl-7">
                      브라우저에 저장하면 내 폰/컴퓨터에서만 작동합니다. 다른 모든 사용자들의 응모 현황까지 알림을 받으시려면 Netlify 배포 환경 변수에 설정하셔야 합니다:
                    </p>
                    <ol className="list-decimal pl-12 space-y-1 font-medium text-stone-500">
                      <li>Netlify 사이트 대시보드 &gt; Site Settings</li>
                      <li>Environment Variables 메뉴로 가기</li>
                      <li><span className="text-stone-800 font-bold font-mono">VITE_TELEGRAM_BOT_TOKEN</span> 과 <span className="text-stone-800 font-bold font-mono">VITE_TELEGRAM_CHAT_ID</span> 변수를 추가하고 값을 붙여넣기</li>
                      <li>사이트를 <span className="text-[#FF1493] font-bold">Clear cache & deploy</span>로 재배포하기</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

    </div>
  );
}
