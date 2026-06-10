/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent, MouseEvent } from 'react';
import { 
  Star, 
  MessageSquarePlus, 
  ThumbsUp, 
  Sparkles, 
  Check, 
  Filter, 
  MessageSquare, 
  Heart 
} from 'lucide-react';
import { Review } from '../types';

interface ReviewViewProps {
  reviews: Review[];
  onAddReview: (review: Omit<Review, 'id' | 'date'>) => void;
}

export default function ReviewView({ reviews, onAddReview }: ReviewViewProps) {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [ratingFilter, setRatingFilter] = useState<number | 'all'>('all');

  // Submit Form States
  const [userName, setUserName] = useState<string>('');
  const [rating, setRating] = useState<number>(5);
  const [productName, setProductName] = useState<string>('att 오리지널 와펜 패브릭 스트랩 키링');
  const [content, setContent] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  
  // Likes counter representation
  const [reviewLikes, setReviewLikes] = useState<Record<string, number>>({
    'rev_1': 24,
    'rev_2': 18,
    'rev_3': 31,
    'rev_4': 15,
    'rev_5': 27,
    'rev_6': 19,
    'rev_7': 12,
    'rev_8': 35,
  });

  const handleLikeReview = (id: string, e: MouseEvent) => {
    e.stopPropagation();
    setReviewLikes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const handleSubmitReview = (e: FormEvent) => {
    e.preventDefault();
    if (!userName || !content) {
      alert('작성자 닉네임과 상세 피드백 리뷰를 꼭 작성해 주세요!');
      return;
    }

    onAddReview({
      userName,
      productName,
      rating,
      content,
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setShowForm(false);
      // Reset form fields
      setUserName('');
      setRating(5);
      setProductName('att 오리지널 와펜 패브릭 스트랩 키링');
      setContent('');
    }, 1500);
  };

  // Filter reviews
  const filteredReviews = reviews.filter(rev => {
    const matchesRating = ratingFilter === 'all' || rev.rating === ratingFilter;
    return matchesRating;
  });

  // Compute stats metrics
  const totalStarSum = reviews.reduce((sum, r) => sum + r.rating, 0);
  const averageRating = reviews.length > 0 ? (totalStarSum / reviews.length).toFixed(1) : '5.0';

  return (
    <div id="review-view-container" className="flex flex-col gap-8 pb-12">
      
      {/* Title block */}
      <section className="flex flex-col gap-2 border-b border-pink-50 pb-5">
        <h1 className="text-2xl md:text-3xl font-extrabold text-stone-800 tracking-tight flex items-center gap-2">
          <span>att 구매자 리얼스토리</span>
          <span className="text-[10px] bg-pink-100 text-pink-600 px-2.5 py-1 rounded-full font-bold font-mono flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-600" /> TEXT REVIEWS
          </span>
        </h1>
        <p className="text-xs md:text-sm text-stone-550 leading-relaxed font-semibold">
          언제나 소중하고 정직한 시안 이야기를 담아주는 att 구매 고객님들의 솔직한 텍스트 후기를 실시간 구경해 보세요.
        </p>
      </section>

      {/* Analytics overall score banner */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded-2xl border border-pink-50 shadow-xs items-center">
        
        {/* Metric total core */}
        <div className="text-center md:border-r border-stone-100 flex flex-col items-center justify-center p-3">
          <span className="text-[11px] font-bold text-stone-400 font-mono tracking-widest block mb-1">TOTAL SATISFACTION</span>
          <div className="flex items-baseline gap-1.5 justify-center">
            <span className="text-4xl font-black text-rose-500 font-sans tracking-tight">{averageRating}</span>
            <span className="text-sm font-bold text-stone-400">/ 5.0</span>
          </div>
          <div className="flex gap-0.5 justify-center mt-1.5 text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                className={`w-4.5 h-4.5 ${i < Math.round(Number(averageRating)) ? 'fill-amber-400 text-amber-500' : 'text-stone-200'}`} 
              />
            ))}
          </div>
          <span className="text-stone-400 font-semibold text-[10px] mt-2 block">
            전체 등록 후기 수: {reviews.length}건
          </span>
        </div>

        {/* Short value pitches */}
        <div className="md:col-span-2 text-left px-0 md:px-6 flex flex-col gap-2 bg-pink-50/15 p-4 rounded-xl border border-pink-100/30">
          <p className="text-xs text-stone-705 font-bold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-pink-400 fill-pink-400" />
            <span>att 자수 패브릭 스트랩 품질 안내:</span>
          </p>
          <ul className="text-[11px] text-stone-500 space-y-1 font-semibold list-inside list-disc leading-relaxed">
            <li>고농축 수공예 자수 실사 가공을 통해 튀어나옴이나 보풀 풀림 방지 완비</li>
            <li>탄탄한 고밀도 면 100% 자카드 웨빙 원단 및 알루미늄 마감 캡 적용</li>
            <li>우체국 안심 포장으로 주문 접수 후 수제 직조되어 정성스레 발송됩니다</li>
          </ul>
        </div>

      </section>

      {/* TEXT REVIEW LISTING DASHBOARD */}
      <section className="bg-stone-50/50 p-6 rounded-3xl border border-stone-200/50 flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-pink-500 text-white rounded-xl">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm md:text-base font-extrabold text-stone-800">✍️ 정직한 구매 후기 전용관</h2>
              <p className="text-[10px] text-stone-400 font-bold">합리적이고 믿을 수 있는 실제 고객님들의 솔직 담백 리뷰</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowForm(!showForm)}
            className="cursor-pointer bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs px-4 py-2.5 rounded-full flex items-center gap-1.5 transition-all shadow-xs"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>구매 리뷰 작성하기</span>
          </button>
        </div>

        {/* Form Expanded Block */}
        {showForm && (
          <div id="write-review-form" className="bg-white border-2 border-dashed border-pink-200 p-6 rounded-2xl animate-fade-in shadow-xs">
            {isSuccess ? (
              <div className="text-center py-6 flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 mb-2 flex items-center justify-center border border-emerald-300">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-xs font-bold text-stone-800">구매자 리뷰가 등록되어 실시간 전달되었습니다!</h4>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="flex flex-col gap-4">
                <h3 className="text-xs font-extrabold text-stone-800 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                  <span>✍️ 실시간 100% 리얼 후기 작성하기</span>
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-stone-605">작성자 닉네임 *</label>
                    <input 
                      type="text"
                      required
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="예: 민정, att_love..."
                      className="text-xs text-stone-800 bg-stone-50 border border-stone-200 rounded-xl p-2.5 focus:outline-none focus:border-pink-400 font-semibold focus:bg-white"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-stone-605">구매한 패브릭 키링 모델 *</label>
                    <select
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      className="text-xs bg-stone-50 border border-stone-200 text-stone-850 p-2.5 rounded-xl cursor-pointer focus:outline-none focus:border-pink-400 font-semibold focus:bg-white"
                    >
                      <option value="att 오리지널 와펜 패브릭 스트랩 키링">att 오리지널 와펜 패브릭 스트랩 키링</option>
                      <option value="att 스포티 헤드폰 & 클라우드 퍼스트 스트랩">att 스포티 헤드폰 & 클라우드 퍼스트 스트랩</option>
                      <option value="앤틱 일러스트 기타 & 파일럿 항공기 키링">앤틱 일러스트 기타 & 파일럿 항공기 키링</option>
                      <option value="스트릿 오락기 & 익스트림 스케이트보드 키링">스트릿 오락기 & 익스트림 스케이트보드 키링</option>
                      <option value="att 러브 에브리웨어 & 뚱냥이 자수 스트랩">att 러브 에브리웨어 & 뚱냥이 자수 스트랩</option>
                      <option value="att 1:1 풀커스텀 DIY 스포츠 스트랩 빌더">att 1:1 풀커스텀 DIY 스포츠 스트랩 빌더</option>
                    </select>
                  </div>
                </div>

                {/* Rating selection buttons */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-stone-605">고객 평가 정성 별점</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 focus:outline-none cursor-pointer transform hover:scale-110"
                      >
                        <Star className={`w-5 h-5 ${star <= rating ? 'fill-amber-400 text-amber-500' : 'text-stone-200'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Review content */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-stone-605">정밀 상세 내용 *</label>
                  <textarea
                    required
                    rows={3}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="면 스트랩 품질, 이니셜 자수 디테일, 우체국 배송 마감소감 등을 기탄없이 공유해 주세요."
                    className="w-full text-xs text-stone-800 bg-stone-50 border border-stone-200 rounded-xl p-3 focus:outline-none focus:border-pink-400 font-medium focus:bg-white"
                  />
                </div>

                {/* Action buttons */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="cursor-pointer flex-1 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs py-2.5 rounded-full font-bold transition-all"
                  >
                    작성 취소
                  </button>
                  <button
                    type="submit"
                    className="cursor-pointer flex-1 bg-pink-500 hover:bg-pink-600 text-white text-xs py-2.5 rounded-full font-bold transition-all shadow-xs"
                  >
                    리뷰 평점 등록하기
                  </button>
                </div>

              </form>
            )}
          </div>
        )}

        {/* Filters Panel */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white p-3.5 rounded-2xl border border-stone-200/60 shadow-2xs">
          
          <div className="flex items-center gap-1">
            <span className="text-xs font-extrabold text-stone-700">전체 리뷰 목록 ({filteredReviews.length}건)</span>
          </div>

          {/* Rating Filters */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <span className="text-[10px] font-bold text-stone-400 shrink-0 flex items-center gap-1">
              <Filter className="w-3 h-3" /> 별점 필터:
            </span>
            {[
              { label: '전체등급', val: 'all' },
              { label: '5★ 만족', val: 5 },
              { label: '4★ 우수', val: 4 },
              { label: '3★ 보통', val: 3 }
            ].map(f => (
              <button
                key={f.label}
                onClick={() => setRatingFilter(f.val as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  ratingFilter === f.val 
                    ? 'bg-rose-50 border border-rose-200 text-rose-600' 
                    : 'bg-stone-50 border border-stone-200/50 text-stone-605 hover:bg-stone-100'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

        </div>

        {/* FEED GRID (Clean elegant list cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {filteredReviews.length === 0 ? (
            <div className="col-span-full text-center py-12 text-stone-400 font-bold bg-white rounded-3xl border border-stone-200/50">
              선택하신 별점 조건에 맞는 후기가 아직 없습니다.
            </div>
          ) : (
            filteredReviews.map((rev) => (
              <div 
                key={rev.id}
                className="bg-white border border-stone-205 p-5 rounded-2xl shadow-3xs flex flex-col justify-between hover:shadow-xs transition-shadow duration-200 group h-full relative"
              >
                {/* Upper stats card user name */}
                <div>
                  <div className="flex items-center justify-between mb-3 border-b border-stone-100 pb-2">
                    <div>
                      <h4 className="text-xs font-extrabold text-stone-800 flex items-center gap-1">
                        <span>{rev.userName} 님</span>
                      </h4>
                      <span className="text-[10px] text-stone-400 font-medium font-mono block mt-0.5">{rev.date}</span>
                    </div>
                    <div className="flex gap-0.5 text-amber-500">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star 
                          key={idx} 
                          className={`w-3.5 h-3.5 ${idx < rev.rating ? 'fill-amber-400 text-amber-500' : 'text-stone-200'}`} 
                        />
                      ))}
                    </div>
                  </div>

                  <span className="inline-block bg-pink-50 text-pink-600 border border-pink-100/50 rounded-full px-2 py-0.5 text-[10px] font-bold mb-2">
                    {rev.productName}
                  </span>

                  <p className="text-xs text-stone-600 leading-relaxed font-semibold">
                    "{rev.content}"
                  </p>
                </div>

                {/* Bottom thumb row buttons */}
                <div className="flex items-center justify-between border-t border-stone-50 pt-2.5 mt-4">
                  <span className="text-[10px] text-emerald-600 bg-emerald-50 border border-emerald-100 px-1.5 py-0.2 rounded font-bold">
                    ✓ 인증 구매 완료
                  </span>
                  <div className="flex items-center gap-2">
                    <button 
                      type="button"
                      onClick={(e) => handleLikeReview(rev.id, e)}
                      className="flex items-center gap-1 text-[10px] text-stone-400 hover:text-pink-500 cursor-pointer font-bold"
                    >
                      <ThumbsUp className="w-3 h-3 text-rose-500 fill-rose-50" />
                      <span>공감 ({reviewLikes[rev.id] || 0})</span>
                    </button>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>

      </section>

    </div>
  );
}
