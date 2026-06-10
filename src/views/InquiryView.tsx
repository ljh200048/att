/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { Send, MessageSquare, Flame, CheckCircle, ShieldAlert, Instagram } from 'lucide-react';
import { Inquiry } from '../types';

interface InquiryViewProps {
  inquiries: Inquiry[];
  onAddInquiry: (inquiry: Omit<Inquiry, 'id' | 'requestedAt' | 'isAnswered'>) => void;
  currentUserEmail?: string;
  currentUserName?: string;
}

export default function InquiryView({
  inquiries,
  onAddInquiry,
  currentUserEmail = '',
  currentUserName = '',
}: InquiryViewProps) {
  // Form input states
  const [userName, setUserName] = useState<string>(currentUserName);
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>(currentUserEmail);
  const [instagramId, setInstagramId] = useState<string>('');
  const [inquiryType, setInquiryType] = useState<Inquiry['inquiryType']>('상품 문의');
  const [content, setContent] = useState<string>('');
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!userName || !email || !content) {
      alert('필수 기재사항(작성자 이름, 이메일 주소, 상세 문의 내용)을 정확하게 채워주세요!');
      return;
    }

    onAddInquiry({
      userName,
      phone,
      email,
      instagramId: instagramId || undefined,
      inquiryType,
      content,
    });

    setIsSubmittedSuccess(true);
    setTimeout(() => {
      setIsSubmittedSuccess(false);
      setContent('');
      setInstagramId('');
      setPhone('');
    }, 2000);
  };

  return (
    <div id="inquiry-page-view" className="flex flex-col gap-8 pb-12">
      
      {/* Title description category */}
      <section className="flex flex-col gap-2 border-b border-pink-50 pb-5">
        <h1 className="text-2xl md:text-3xl font-extrabold text-stone-800 tracking-tight">
          att 고객 안심 지원센터
        </h1>
        <p className="text-xs md:text-sm text-stone-550 leading-relaxed font-semibold">
          제작 중인 키링 진행 상황, 원판 마감 문의, 협찬 제의 등 무엇이든 궁금한 사항을 전송해 주세요. 성의껏 응대해 드립니다.
        </p>
      </section>

      {/* Grid: 1. Split contact layout form, 2. Instagram Direct messaging links banner */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: Direct DM pitch & Inquiry guidelines */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          
          <div className="bg-linear-to-br from-pink-500 to-purple-600 text-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <h3 className="text-base font-extrabold tracking-tight flex items-center gap-1.5">
              <Instagram className="w-5.5 h-5.5" />
              <span>실시간 Instagram DM 상담</span>
            </h3>
            <p className="text-[11px] text-pink-100 leading-relaxed font-semibold">
              현재 가공 문의 및 시안 진행 단독 교정은 공식 인스타그램 다이렉트 메시지가 가장 밀도 있고 신속하게 응답됩니다. 
              상담원과 실시간으로 대화하며 펜던트 레이아웃을 조절하실 수 있습니다.
            </p>
            <a 
              href="https://www.instagram.com/att_attached/"
              target="_blank"
              rel="noreferrer"
              className="bg-white hover:bg-stone-50 text-indigo-700 text-center font-bold text-xs py-2.5 rounded-full shadow-inner block transition-colors"
            >
              인스타 DM 상담 즉시개설
            </a>
          </div>

          {/* Core operating hours sheet info */}
          <div className="bg-stone-50 border border-stone-200/50 rounded-2xl p-4 text-xs font-semibold text-stone-500 leading-relaxed flex flex-col gap-2">
            <label className="text-[11px] font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-pink-500 fill-pink-500 animate-pulse" />
              <span>CS 운영 표준사항</span>
            </label>
            <p>• 답변 완료는 평균 2시간 이내에 마이페이지에서 즉각 조치됩니다.</p>
            <p>• 이메일을 정확히 남겨 주시면 시안 완료 알림이 동보 전송됩니다.</p>
            <p>• 긴급한 수령일 변경 건은 연락처 전화번호를 지정해 남기시면 문자 안내 드립니다.</p>
          </div>

        </div>

        {/* Right column: Form details */}
        <div className="lg:col-span-8 bg-white border border-pink-50 rounded-2xl p-6 md:p-8 flex flex-col gap-6">
          <h2 className="text-sm font-extrabold text-stone-800 uppercase tracking-widest flex items-center gap-1 bg-pink-50/20 px-3 py-1.5 rounded-full w-fit">
            <MessageSquare className="w-4 h-4 text-pink-500" />
            <span>1:1 기재 문의글 작성 접수</span>
          </h2>

          {isSubmittedSuccess ? (
            <div className="text-center py-10 bg-emerald-50/40 rounded-2xl border border-emerald-200 p-6 flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center border border-emerald-300">
                <CheckCircle className="w-7 h-7" />
              </div>
              <h4 className="text-sm font-bold text-stone-850">문의 전송 접수가 완벽하게 승인되었습니다!</h4>
              <p className="text-xs text-stone-500">
                이 문의사항은 하위 '마이페이지 문의 이력' 또는 좌측 상단 '관리자 대시보드'에서 직접 답변을 달아보는 시뮬레이션을 즐길 수 있습니다.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4.5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-stone-600">이름 성함 *</label>
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="작성자 성명..."
                    className="text-xs text-stone-800 bg-stone-50 border border-stone-200 rounded-xl p-3 focus:outline-none focus:bg-white focus:border-pink-400 font-semibold"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-stone-600">선택 문의분류 유형 *</label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value as any)}
                    className="text-xs bg-stone-50 border border-stone-200 text-stone-850 p-3 rounded-xl cursor-pointer focus:outline-none focus:bg-white focus:border-pink-400 font-semibold"
                  >
                    <option value="상품 문의">상품 문의</option>
                    <option value="커스텀 제작 문의">커스텀 제작 문의 (도안 협의)</option>
                    <option value="배송 문의">배송 문의 (송장 추적)</option>
                    <option value="교환/환불 문의">교환/환불 문의</option>
                    <option value="제양/협찬 문의">제휴/협찬 문의</option>
                    <option value="기타 문의">기타 문의</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5 sm:col-span-1">
                  <label className="text-xs font-bold text-stone-600">연락처 전화번호</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="010-1234-5678..."
                    className="text-xs text-stone-800 bg-stone-50 border border-stone-200 rounded-xl p-3 focus:outline-none focus:bg-white focus:border-pink-400 font-semibold"
                  />
                </div>
                <div className="flex flex-col gap-1.5 sm:col-span-1">
                  <label className="text-xs font-bold text-stone-600">수신 이메일 주소 *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com..."
                    className="text-xs text-stone-800 bg-stone-50 border border-stone-200 rounded-xl p-3 focus:outline-none focus:bg-white focus:border-pink-400 font-semibold"
                  />
                </div>
                <div className="flex flex-col gap-1.5 sm:col-span-1">
                  <label className="text-xs font-bold text-stone-600">인스타그램 ID</label>
                  <input
                    type="text"
                    value={instagramId}
                    onChange={(e) => setInstagramId(e.target.value)}
                    placeholder="@att_insta..."
                    className="text-xs text-stone-800 bg-stone-50 border border-stone-200 rounded-xl p-3 focus:outline-none focus:bg-white focus:border-pink-400 font-semibold"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-stone-600">상세 문의 사유 및 세부 진술 *</label>
                <textarea
                  required
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="궁금하신 아크릴 배형 판넬 규격이나, 희망하는 시안 색감 옵션, 단체 선물 수량 공급 등 필요한 세부 명세들을 상세하게 기재하여 보내주세요."
                  className="w-full text-xs text-stone-850 bg-stone-50 border border-stone-200 rounded-xl p-3 focus:outline-none focus:bg-white focus:border-pink-400 font-semibold font-sans leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="cursor-pointer bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs py-3.5 rounded-full flex items-center justify-center gap-1.5 shadow-xs transition-colors mt-2"
              >
                <span>제출하여 문의 접수 완료하기</span>
                <Send className="w-3.5 h-3.5" />
              </button>

            </form>
          )}

        </div>

      </section>

      {/* Mini warning list prompt */}
      <section className="bg-amber-50 rounded-2xl border border-amber-200 text-[11px] p-4 font-semibold text-amber-800 flex items-center gap-2 max-w-4xl mx-auto">
        <ShieldAlert className="w-4.5 h-4.5 text-amber-600 flex-none animate-bounce" />
        <p>
          개인정보 노출 방지를 위해 타인에게 민감한 계좌 정보나 전화번호 등은 인스타 DM 상담을 통한 1:1 메시지 통로에서 보존 처리하시는 것을 적극 추천합니다.
        </p>
      </section>

    </div>
  );
}
