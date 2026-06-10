/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Heart, Compass, Sparkles, Star } from 'lucide-react';

export default function IntroView() {
  return (
    <div id="intro-view-container" className="flex flex-col gap-12 md:gap-16 pb-16">
      
      {/* Editorial primary header section */}
      <section className="text-center max-w-2xl mx-auto flex flex-col items-center gap-4 mt-6">
        <span className="flex items-center gap-1.5 bg-stone-950 border border-stone-950 px-3 py-1 rounded-full text-[10px] text-white font-black shadow-inner font-mono tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-[#EEFF00]" />
          <span>OUR ESSENCE</span>
        </span>
        
        <h1 className="font-hand text-4xl md:text-5xl text-stone-950 font-black tracking-tight mt-1 leading-tight select-none uppercase">
          ATTACH YOUR WIT & WORDING<br />
          <span className="text-rose-600 font-extrabold">Wacky Willy</span>
        </h1>
        
        <p className="text-xs md:text-sm text-stone-500 font-semibold tracking-wider font-mono uppercase">
          와키윌리, Wacky Willy — 매일 곁에 머무는 사소하지만 완벽한 스트릿 무드의 고품격 키링
        </p>
      </section>

      {/* Philosophy Main body with gorgeous text block panels */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
        <div className="flex flex-col gap-5 text-left bg-white p-6 md:p-8 rounded-3xl border border-stone-200/80 shadow-xs">
          <div className="w-10 h-10 rounded-full bg-stone-105 bg-stone-100 flex items-center justify-center text-stone-950">
            <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
          </div>
          <h2 className="text-lg font-bold text-stone-950 tracking-tight">
            와키윌리(Wacky Willy)는 '위트 있는 조립식 스트릿 감성'을 제안하는 프리미엄 커스텀 키링 스튜디오입니다.
          </h2>
          <p className="text-xs md:text-xs text-stone-500 leading-relaxed font-semibold">
            키링은 가방 구석이나 파우치 끈, 에어팟에 달린 단순한 악세사리가 아닙니다.
            그날의 매치, 옷차림, 코디에 부합하는 위트 있는 정체성을 고정시킴으로써,
            나만의 고유한 라이프스타일을 가장 직관적으로 드러내는 작은 예술품이자 패션 굿즈입니다.
          </p>
        </div>

        <div className="flex flex-col gap-5 text-left bg-white p-6 md:p-8 rounded-3xl border border-stone-200/80 shadow-xs">
          <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-950">
            <Compass className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-stone-955 tracking-tight">
            손끝으로 정교하게 어셈블리하는 고난도 1:1 디테일 핸드메이드
          </h2>
          <p className="text-xs md:text-xs text-stone-505 leading-relaxed font-semibold">
            와키윌리는 공장식 대형 금형에서 찍어만 내는 얇은 플라스틱 고리를 납품하지 않습니다.
            고탄성의 최고 등급 아크릴과 한 땀 단위 자수로 마감된 최고 가공 패브릭 스트랩 부속 파츠를
            숙련된 아티스트 디자이너가 실시간 도안에 맞춰 정성스레 피팅하여 내구성 높은 견고함을 완성합니다.
          </p>
        </div>
      </section>

      {/* Styled Large Center Quote Panel */}
      <section className="bg-stone-50 p-10 md:p-14 text-center rounded-3xl border border-stone-200 max-w-4xl mx-auto relative overflow-hidden">
        <p className="font-hand text-xl md:text-2xl font-black text-stone-950 max-w-lg mx-auto leading-relaxed uppercase">
          "작지만 고운 무언가가 하루를 바꾸고, <br />
          마침내 나만의 본진을 세우는 작은 디테일이 됩니다.<br />
          Wacky Willy는 당신의 힙한 정체성을 붙여냅니다."
        </p>
        
        <div className="flex justify-center items-center gap-1 mt-6 text-stone-800">
          <Star className="w-3 h-3 fill-rose-500 text-rose-500" />
          <Star className="w-3 h-3 fill-rose-500 text-rose-500" />
          <Star className="w-3.5 h-3.5 fill-[#EEFF00] text-stone-950" style={{ transform: 'scale(1.2)' }} />
          <Star className="w-3 h-3 fill-rose-500 text-rose-500" />
          <Star className="w-3 h-3 fill-rose-500 text-rose-500" />
        </div>
        
        <span className="text-[10px] text-stone-400 mt-2 block font-extrabold tracking-widest font-mono">
          EST. 2026 / ATTACH EMOTION TO YOUR LIFE
        </span>
      </section>

      {/* Step description lists or details */}
      <section className="max-w-4xl mx-auto flex flex-col gap-6">
        <h3 className="text-xs font-black text-stone-955 text-center uppercase tracking-widest border-b border-stone-200 pb-2.5">
          Wacky Willy 키링이 탄생하는 올바른 공정 라인
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs flex flex-col gap-2">
            <span className="font-mono text-sm font-black text-stone-400 uppercase">Step 01.</span>
            <p className="text-xs font-bold text-stone-900">온라인 빌더 구상</p>
            <p className="text-[10px] text-stone-500 leading-relaxed font-semibold">
              원하는 디자인 레이블과 문자를 1:1 온라인 시각화 빌더에서 실시간 프리뷰로 조합하고 제출합니다.
            </p>
          </div>
          
          <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs flex flex-col gap-2">
            <span className="font-mono text-sm font-black text-[#EEFF00] bg-stone-900 px-1 py-0.5 rounded-sm w-fit uppercase">Step 02.</span>
            <p className="text-xs font-bold text-stone-900">1:1 시안 수동 확정</p>
            <p className="text-[10px] text-stone-500 leading-relaxed font-semibold">
              제작에 착수하기 전 담당 디자이너가 인스타 DM 또는 연락 수단을 활용하여 완성도 높은 디테일 피드백을 수락받습니다.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs flex flex-col gap-2">
            <span className="font-mono text-sm font-black text-stone-400 uppercase">Step 03.</span>
            <p className="text-xs font-bold text-stone-900">핸드크래프트 레이저 세공</p>
            <p className="text-[10px] text-stone-500 leading-relaxed font-semibold">
              고해상 자수 마감 혹은 고도화 에폭시 코팅 글리터 마감으로 수작업 마무리 가공합니다.
            </p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-xs flex flex-col gap-2">
            <span className="font-mono text-sm font-black text-stone-400 uppercase">Step 04.</span>
            <p className="text-xs font-bold text-stone-900">선물용 프리미엄 패징 발송</p>
            <p className="text-[10px] text-stone-500 leading-relaxed font-semibold">
              Wacky Willy 전용 고정 실버 버클 플라스틱 지퍼백 패키징에 봉인하여 안전하게 발송처리 합니다.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
