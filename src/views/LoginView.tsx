/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { Smartphone, LogIn, Sparkles, Mail, Lock, UserPlus, Heart, Chrome, Check, ShieldCheck, UserCheck, ArrowRight, X } from 'lucide-react';
import { User } from '../types';

interface LoginViewProps {
  onLoginSuccess: (user: User) => void;
  onNavigate: (view: string) => void;
}

export default function LoginView({ onLoginSuccess, onNavigate }: LoginViewProps) {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [instagramId, setInstagramId] = useState<string>('');

  // Interactive Social OAuth Signup Modal States
  const [showGoogleModal, setShowGoogleModal] = useState<boolean>(false);

  // Google Signup/Login Configuration State
  const [googleName, setGoogleName] = useState<string>('');
  const [googleEmail, setGoogleEmail] = useState<string>('');
  const [googleSuccessAlert, setGoogleSuccessAlert] = useState<boolean>(false);
  const [registeredGoogleEmail, setRegisteredGoogleEmail] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert('이메일 주소와 패스워드를 정확히 기입해 주세요!');
      return;
    }

    if (isSignUp && !name) {
      alert('가입자님의 이름을 채워주세요!');
      return;
    }

    // Set standard simulated user profile
    const registeredUser: User = {
      id: `user_${Date.now()}`,
      email,
      name: isSignUp ? name : email.split('@')[0],
      instagramId: instagramId || undefined,
      role: email === 'admin@att.com' ? 'admin' : 'customer'
    };

    onLoginSuccess(registeredUser);
    alert(`${registeredUser.name}님, Wacky Willy 어태치 스튜디오에 로그인 완료되었습니다! 🖤`);
    onNavigate('home');
  };

  // Trigger popup interactive OAuth flow
  const handleGoogleSignupSubmit = () => {
    if (!googleName || !googleEmail) {
      alert('가입하실 구글 닉네임과 이메일 정보를 기재해 주세요!');
      return;
    }

    if (!googleEmail.includes('@') || !googleEmail.includes('.')) {
      alert('올바른 구글 이메일 주소 형식(@, 점 포함)을 정확히 입력해 주세요!');
      return;
    }

    setRegisteredGoogleEmail(googleEmail);
    setGoogleSuccessAlert(true);
  };

  const handleConfirmGoogleSuccess = () => {
    const registeredUser: User = {
      id: `google_${Date.now().toString().slice(-6)}`,
      email: registeredGoogleEmail,
      name: googleName || registeredGoogleEmail.split('@')[0],
      role: 'customer'
    };

    onLoginSuccess(registeredUser);
    setGoogleSuccessAlert(false);
    setShowGoogleModal(false);
    // Reset fields
    setGoogleName('');
    setGoogleEmail('');
    onNavigate('mypage');
  };




  return (
    <div id="login-form-view" className="max-w-md mx-auto my-8 md:my-12 animate-fade-in">
      
      {/* Brand card */}
      <div className="bg-white rounded-3xl border border-stone-250 shadow-xs p-6 md:p-8 flex flex-col gap-6 relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-stone-50 pointer-events-none" />
        
        {/* Brand header */}
        <div className="text-center flex flex-col items-center gap-1.5">
          <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-900">
            <Heart className="w-5.5 h-5.5 fill-stone-950 text-stone-950 animate-pulse" />
          </div>
          <h2 className="text-xl md:text-2xl font-black text-stone-900 mt-2 tracking-tight uppercase">
            {isSignUp ? 'Wacky Willy 멤버십 가입' : 'Wacky Willy 계정 로그인'}
          </h2>
          <p className="text-[11px] text-stone-400 font-semibold uppercase tracking-wider">
            {isSignUp ? '나만의 스트리트 커스텀 취향저장소를 가꿔보세요' : '즐겨찾는 키링과 제작 주문내역 확인'}
          </p>
        </div>

        {/* Traditional Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {isSignUp && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-stone-600">성함 실명 *</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-xs">👤</span>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="홍길동..."
                  className="w-full text-xs text-stone-850 pl-9 pr-3.5 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:bg-white focus:border-pink-300 font-semibold"
                />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-stone-600">이메일 주소 *</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-stone-400" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com..."
                className="w-full text-xs text-stone-850 pl-10 pr-3.5 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:bg-white focus:border-pink-300 font-semibold"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-stone-600">패스워드 비밀번호 *</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-stone-400" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호 설정..."
                className="w-full text-xs text-stone-850 pl-10 pr-3.5 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:bg-white focus:border-pink-300 font-semibold"
              />
            </div>
          </div>

          {isSignUp && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-stone-600">인스타그램 아이디 (선택)</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-xs">@</span>
                <input 
                  type="text" 
                  value={instagramId}
                  onChange={(e) => setInstagramId(e.target.value)}
                  placeholder="att_instagram..."
                  className="w-full text-xs text-stone-850 pl-8 pr-3.5 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:bg-white focus:border-pink-300 font-semibold"
                />
              </div>
            </div>
          )}

          {/* Quick Mock Alert */}
          {!isSignUp && (
            <span className="text-[10px] text-pink-400 font-semibold text-right -mt-1 block">
              * 가상 계정으로 원하는 아무 값이나 입력해도 통과됩니다!
            </span>
          )}

          {/* Submit CTA */}
          <button
            type="submit"
            className="cursor-pointer bg-pink-500 hover:bg-pink-600 text-white font-bold py-3.5 rounded-full text-xs flex items-center justify-center gap-1.5 shadow-sm transition-transform active:scale-98 mt-2"
          >
            {isSignUp ? <UserPlus className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
            <span>{isSignUp ? '신규 프리미엄 회원가입' : '동작 로그인 인증'}</span>
          </button>

        </form>

        {/* Social logins separators */}
        <div className="relative flex items-center justify-center my-1.5">
          <div className="border-t border-stone-150 w-full" />
          <span className="absolute bg-white px-3.5 text-[10px] text-stone-400 font-semibold tracking-wider font-mono">
            OR SOCIAL QUICK ACCESS
          </span>
        </div>

        {/* Social Buttons */}
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => setShowGoogleModal(true)}
            className="cursor-pointer rounded-xl border border-stone-200/80 bg-white hover:bg-stone-50 py-3 text-xs font-bold text-stone-700 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Chrome className="w-4 h-4 text-red-500" />
            <span>Google 가입/로그인</span>
          </button>
        </div>

        {/* Form Toggle Switch Footer */}
        <div className="text-center pt-2 border-t border-stone-100">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="cursor-pointer text-xs font-bold text-stone-550 hover:text-stone-900 hover:underline"
          >
            {isSignUp ? '이미 와키윌리 계정이 있으신가요? 로그인' : '아직 계정이 없으신가요? 1초 멤버십 가입'}
          </button>
        </div>

      </div>

      {/* 1. GOOGLE INTERACTIVE SIGNUP OAUTH MODAL */}
      {showGoogleModal && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-stone-105 flex flex-col gap-5 relative text-left">
            
            {/* Close button - Always visible for quick exit */}
            <button 
              onClick={() => setShowGoogleModal(false)}
              className="absolute top-4 right-4 p-1.5 bg-stone-100 hover:bg-stone-200 rounded-full text-stone-400 hover:text-stone-700 cursor-pointer transition-colors z-10"
              type="button"
            >
              <X className="w-4 h-4" />
            </button>

            {googleSuccessAlert ? (
              <div className="flex flex-col gap-4 text-center py-4 animate-fade-in">
                {/* Glowing checkmark animation */}
                <div className="w-14 h-14 rounded-full bg-emerald-50 border-2 border-emerald-300 text-emerald-600 mx-auto flex items-center justify-center shadow-sm">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                
                <div className="space-y-1">
                  <h4 className="text-base font-extrabold text-stone-850 font-black">가입 인증 및 알림 전송 완료 📬</h4>
                  <p className="text-xs text-stone-500 font-semibold leading-relaxed font-semibold">
                    입력하신 구글 이메일인 <span className="text-stone-900 font-bold underline font-mono">{registeredGoogleEmail}</span> 주소로 
                    회원가입 완료 축하 알림과 <span className="text-stone-950 font-bold font-mono">Wacky Willy 3,000원 즉시 할인 웰컴 쿠폰 코드</span> 안내 메일이 완벽히 전송되었습니다!
                  </p>
                </div>

                <div className="bg-stone-50 p-3 rounded-2xl border border-stone-200 text-left text-[11px] text-stone-550 leading-relaxed font-semibold">
                  <div className="flex items-center gap-1.5 mb-1 text-stone-900 font-bold">
                    <Sparkles className="w-3.5 h-3.5 fill-stone-900" />
                    <span>회원 웰컴 보너스 특전</span>
                  </div>
                  <p className="font-semibold text-stone-600">• 이메일 검증 및 즉시 로그인 가입이 완료되어 사이트를 바로 이용하실 수 있습니다.</p>
                  <p className="font-semibold text-stone-600">• 신규 주문 결제 완료 시 이메일로 자동 배송 조회 알림이 실시간 수신됩니다.</p>
                </div>

                <button
                  type="button"
                  onClick={handleConfirmGoogleSuccess}
                  className="cursor-pointer w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-3 rounded-full text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs"
                >
                  <UserCheck className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span>멤버십 즉시 진입 및 쇼핑 시작</span>
                </button>
              </div>
            ) : (
              <>
                {/* Google Identity Brand header */}
                <div className="flex flex-col gap-1 items-start">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                      <Chrome className="w-5 h-5 text-stone-900" />
                    </div>
                    <span className="text-xs font-bold text-stone-400 font-mono">Google 계정으로 계속하기</span>
                  </div>
                  <h3 className="text-lg font-black text-stone-900 uppercase tracking-tight">Wacky Willy 가입</h3>
                  <p className="text-[11px] text-stone-400 font-semibold">
                    가입하실 이름과 실제 구글 이메일 주소를 입력해 주시면 가입 완료 즉시 승인 알림 메일과 웰컴 쿠폰팩을 보내 드립니다.
                  </p>
                </div>

                {/* Direct Customizable Google Inputs */}
                <div className="flex flex-col gap-3.5 mt-1">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold text-stone-605">가입인 성함 / 프로필 닉네임 *</span>
                    <input 
                      type="text" 
                      required
                      value={googleName}
                      onChange={(e) => setGoogleName(e.target.value)}
                      placeholder="이름 또는 닉네임 입력 (예: 이찬하)"
                      className="w-full text-xs text-stone-850 px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:bg-white focus:border-red-400 font-semibold"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold text-stone-605">구글 이메일 주소 *</span>
                    <input 
                      type="email" 
                      required
                      value={googleEmail}
                      onChange={(e) => setGoogleEmail(e.target.value)}
                      placeholder="구글 계정 이메일 주소 입력 (최종 알림 발송용)"
                      className="w-full text-xs text-stone-850 px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:bg-white focus:border-stone-450 font-semibold font-mono"
                    />
                  </div>
                </div>

                {/* Verification checklist banner */}
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-[10px] text-stone-500 flex flex-col gap-1 font-semibold leading-relaxed mt-2">
                  <p className="text-stone-900 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>데이터 안전 가입 보증</span>
                  </p>
                  <p>• 구글 간편가입을 통해 입력하신 이메일은 가입 승인 안내 및 주문 내역 알림 배달을 위해서만 암호화 전송됩니다.</p>
                  <p>• 외부 로그인 비밀번호는 어태치 시스템에 연동되지 않고 안전하게 보호됩니다.</p>
                </div>

                {/* Submission triggers */}
                <button
                  type="button"
                  onClick={handleGoogleSignupSubmit}
                  className="cursor-pointer w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-3.5 rounded-full text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs mt-2 uppercase tracking-wider"
                >
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  <span>동의하고 1초만에 회원가입 완료</span>
                </button>
              </>
            )}

          </div>
        </div>
      )}



    </div>
  );
}
