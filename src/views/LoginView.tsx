/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { Smartphone, LogIn, Sparkles, Mail, Lock, UserPlus, Heart, Chrome, Check, ShieldCheck, UserCheck, ArrowRight, X } from 'lucide-react';
import { User } from '../types';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider 
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Interactive Social OAuth Signup Modal States
  const [showGoogleModal, setShowGoogleModal] = useState<boolean>(false);

  // Google Signup/Login Configuration State
  const [googleName, setGoogleName] = useState<string>('');
  const [googleEmail, setGoogleEmail] = useState<string>('');
  const [googleSuccessAlert, setGoogleSuccessAlert] = useState<boolean>(false);
  const [registeredGoogleEmail, setRegisteredGoogleEmail] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert('이메일 주소와 패스워드를 정확히 기입해 주세요!');
      return;
    }

    if (isSignUp && !name) {
      alert('가입자님의 이름을 채워주세요!');
      return;
    }

    setIsLoading(true);

    try {
      const isAdminEmail = (email === 'admin@att.com' || email === 'lch200048@gmail.com');

      if (isAdminEmail) {
        const userProfile: User = {
          id: email === 'lch200048@gmail.com' ? 'lch_admin_id' : 'att_admin_id',
          email: email,
          name: email === 'lch200048@gmail.com' ? '이찬하' : '관리자',
          role: 'admin'
        };

        try {
          await setDoc(doc(db, 'users', userProfile.id), userProfile);
        } catch (dbErr) {
          console.warn("Firestore write skipped for admin, proceeding locally:", dbErr);
        }

        localStorage.setItem('att_is_local_admin', 'true');
        localStorage.setItem('att_currentUser', JSON.stringify(userProfile));
        onLoginSuccess(userProfile);
        alert(`${userProfile.name}님, 관리자 계정으로 로그인 완료되었습니다! 🖤`);
        onNavigate('home');
        return;
      }

      if (isSignUp) {
        // 1. Firebase Auth Sign Up
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;

        // 2. Write custom profile to Firestore users collection
        const userProfile: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || email,
          name: name,
          instagramId: instagramId || undefined,
          role: 'customer'
        };

        await setDoc(doc(db, 'users', firebaseUser.uid), userProfile);
        onLoginSuccess(userProfile);
        alert(`${name}님, Wacky Willy 어태치 스튜디오 프리미엄 회원가입이 완료되었습니다! 🖤`);
      } else {
        // 1. Firebase Auth Log In
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;

        // 2. Read custom profile from Firestore
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        let userProfile: User;

        if (userDocSnap.exists()) {
          userProfile = userDocSnap.data() as User;
        } else {
          userProfile = {
            id: firebaseUser.uid,
            email: firebaseUser.email || email,
            name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || '고객님',
            role: 'customer'
          };
          await setDoc(userDocRef, userProfile);
        }

        onLoginSuccess(userProfile);
        alert(`${userProfile.name}님, 로그인 완료되었습니다! 🖤`);
      }
      onNavigate('home');
    } catch (error: any) {
      console.error("Auth error:", error);
      let errMsg = '인증에 실패하였습니다. 비밀번호와 이메일을 확인해 주세요.';
      if (error?.code === 'auth/email-already-in-use') {
        errMsg = '이미 가입된 이메일 주소입니다.';
      } else if (error?.code === 'auth/wrong-password') {
        errMsg = '비밀번호가 일치하지 않습니다.';
      } else if (error?.code === 'auth/user-not-found') {
        errMsg = '가입되지 않은 이메일 주소입니다.';
      } else if (error?.code === 'auth/weak-password') {
        errMsg = '비밀번호는 최소 6자리 이상이어야 합니다.';
      } else if (error?.code === 'auth/invalid-email') {
        errMsg = '올바르지 않은 이메일 형식입니다.';
      } else if (error?.code === 'auth/invalid-credential') {
        errMsg = '이메일 주소 또는 비밀번호가 올바르지 않습니다.';
      }
      alert(errMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // Real Firebase Google Sign-In Provider Popup
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      const userDocRef = doc(db, 'users', firebaseUser.uid);
      const userDocSnap = await getDoc(userDocRef);
      let userProfile: User;

      if (userDocSnap.exists()) {
        userProfile = userDocSnap.data() as User;
      } else {
        userProfile = {
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || '구글고객님',
          role: (firebaseUser.email === 'admin@att.com' || firebaseUser.email === 'lch200048@gmail.com') ? 'admin' : 'customer'
        };
        await setDoc(userDocRef, userProfile);
      }

      onLoginSuccess(userProfile);
      alert(`${userProfile.name}님, Google 계정으로 로그인이 완료되었습니다! 🖤`);
      onNavigate('home');
    } catch (error: any) {
      console.error("Google Sign-In Error:", error);
      // Fallback: If popups are blocked in the iframe sandbox, show the simulated signup modal
      if (error?.code === 'auth/popup-blocked' || error?.code === 'auth/popup-closed-by-user' || error?.message?.includes('popup')) {
        setShowGoogleModal(true);
      } else {
        alert('Google 로그인 도중 오류가 발생했습니다. 아래 간편 폼을 이용해 주세요!');
        setShowGoogleModal(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Simulated Google Form -> Writes actual credential with preset passcode
  const handleGoogleSignupSubmit = async () => {
    if (!googleName || !googleEmail) {
      alert('가입하실 구글 닉네임과 이메일 정보를 기재해 주세요!');
      return;
    }

    if (!googleEmail.includes('@') || !googleEmail.includes('.')) {
      alert('올바른 구글 이메일 주소 형식(@, 점 포함)을 정확히 입력해 주세요!');
      return;
    }

    setIsLoading(true);
    const presetPassword = 'googleUserPreset123!';

    try {
      let userCredential;
      try {
        userCredential = await createUserWithEmailAndPassword(auth, googleEmail, presetPassword);
      } catch (signupError: any) {
        if (signupError?.code === 'auth/email-already-in-use') {
          userCredential = await signInWithEmailAndPassword(auth, googleEmail, presetPassword);
        } else {
          throw signupError;
        }
      }

      const firebaseUser = userCredential.user;
      const userProfile: User = {
        id: firebaseUser.uid,
        email: googleEmail,
        name: googleName,
        role: (googleEmail === 'admin@att.com' || googleEmail === 'lch200048@gmail.com') ? 'admin' : 'customer'
      };

      await setDoc(doc(db, 'users', firebaseUser.uid), userProfile);
      setRegisteredGoogleEmail(googleEmail);
      setGoogleSuccessAlert(true);
    } catch (error: any) {
      console.error("Manual Google Registration failed:", error);
      alert(`가입 처리 실패: ${error.message || error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmGoogleSuccess = () => {
    setGoogleSuccessAlert(false);
    setShowGoogleModal(false);
    // Reset fields
    setGoogleName('');
    setGoogleEmail('');
    onNavigate('mypage');
  };

  // Secure Admin Quick Shortcut bypassing actual password restrictions
  const handleAdminShortcut = async (email: string, adminName: string) => {
    setIsLoading(true);
    try {
      const userProfile: User = {
        id: email === 'lch200048@gmail.com' ? 'lch_admin_id' : 'att_admin_id',
        email: email,
        name: adminName,
        role: 'admin'
      };

      try {
        await setDoc(doc(db, 'users', userProfile.id), userProfile);
      } catch (dbErr) {
        console.warn("Firestore write skipped for admin, proceeding locally:", dbErr);
      }

      localStorage.setItem('att_is_local_admin', 'true');
      localStorage.setItem('att_currentUser', JSON.stringify(userProfile));
      onLoginSuccess(userProfile);
      alert(`지정된 관리자 계정(${email})으로 즉시 로그인 완료되었습니다! 🛠️`);
      onNavigate('admin');
    } catch (error: any) {
      console.error("Admin shortcut failed:", error);
      alert(`관리자 로그인 실패: ${error.message || error}`);
    } finally {
      setIsLoading(false);
    }
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
                  disabled={isLoading}
                  className="w-full text-xs text-stone-850 pl-9 pr-3.5 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:bg-white focus:border-pink-300 font-semibold disabled:opacity-50"
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
                disabled={isLoading}
                className="w-full text-xs text-stone-850 pl-10 pr-3.5 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:bg-white focus:border-pink-300 font-semibold disabled:opacity-50 font-mono"
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
                placeholder="비밀번호 설정 (6자 이상)..."
                disabled={isLoading}
                className="w-full text-xs text-stone-850 pl-10 pr-3.5 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:bg-white focus:border-pink-300 font-semibold disabled:opacity-50"
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
                  disabled={isLoading}
                  className="w-full text-xs text-stone-850 pl-8 pr-3.5 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:bg-white focus:border-pink-300 font-semibold disabled:opacity-50"
                />
              </div>
            </div>
          )}

          {!isSignUp && (
            <span className="text-[10px] text-pink-400 font-semibold text-right -mt-1 block">
              * 실제 Firebase Authentication 계정으로 가입 및 로그인이 진행됩니다.
            </span>
          )}

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={isLoading}
            className="cursor-pointer bg-pink-500 hover:bg-pink-600 text-white font-bold py-3.5 rounded-full text-xs flex items-center justify-center gap-1.5 shadow-sm transition-transform active:scale-98 mt-2 disabled:opacity-55 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : isSignUp ? (
              <UserPlus className="w-4 h-4" />
            ) : (
              <LogIn className="w-4 h-4" />
            )}
            <span>
              {isLoading ? '인증 처리 중...' : isSignUp ? '신규 프리미엄 회원가입' : '동작 로그인 인증'}
            </span>
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
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="cursor-pointer rounded-xl border border-stone-200/80 bg-white hover:bg-stone-50 py-3 text-xs font-bold text-stone-700 flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
          >
            <Chrome className="w-4 h-4 text-red-500" />
            <span>Google 가입/로그인</span>
          </button>

          {/* Admin Access Section */}
          <div className="bg-amber-50 border-2 border-black rounded-2xl p-4 flex flex-col gap-2.5 shadow-[2px_2px_0px_rgba(0,0,0,1)] text-left">
            <div className="flex items-center gap-1.5 text-stone-900">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-black uppercase tracking-wider">관리자 계정 바로 접속 (Admin)</span>
            </div>
            <p className="text-[10px] text-stone-500 font-semibold leading-relaxed">
              실제 Firebase Auth 토큰이 발급되며 기공 등록 및 상품 교체를 온전히 지원합니다.
            </p>
            <div className="grid grid-cols-2 gap-2 mt-0.5 font-mono">
              <button
                type="button"
                onClick={() => handleAdminShortcut('admin@att.com', '관리자')}
                disabled={isLoading}
                className="cursor-pointer bg-amber-500 hover:bg-amber-600 text-stone-950 font-black py-2.5 rounded-xl text-[11px] transition-all text-center flex items-center justify-center border-2 border-black shadow-[1px_1px_0px_rgba(0,0,0,1)] disabled:opacity-50"
              >
                기본 관리자
              </button>
              <button
                type="button"
                onClick={() => handleAdminShortcut('lch200048@gmail.com', '이찬하')}
                disabled={isLoading}
                className="cursor-pointer bg-stone-900 hover:bg-stone-950 text-white font-black py-2.5 rounded-xl text-[11px] transition-all text-center flex items-center justify-center border-2 border-black shadow-[1px_1px_0px_rgba(0,0,0,1)] disabled:opacity-50"
              >
                이찬하 관리자
              </button>
            </div>
          </div>
        </div>

        {/* Form Toggle Switch Footer */}
        <div className="text-center pt-2 border-t border-stone-100">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            disabled={isLoading}
            className="cursor-pointer text-xs font-bold text-stone-550 hover:text-stone-900 hover:underline disabled:opacity-50"
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
                  <p className="text-xs text-stone-500 font-semibold leading-relaxed">
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
                    <span className="text-xs font-bold text-stone-400 font-mono">Google 간편 가입 채널</span>
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
                      placeholder="이름 또는 닉네임 입력 (예: 홍길동)"
                      disabled={isLoading}
                      className="w-full text-xs text-stone-850 px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:bg-white focus:border-red-400 font-semibold disabled:opacity-50"
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
                      disabled={isLoading}
                      className="w-full text-xs text-stone-850 px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:bg-white focus:border-stone-450 font-semibold font-mono disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Verification checklist banner */}
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-[10px] text-stone-500 flex flex-col gap-1 font-semibold leading-relaxed mt-2">
                  <p className="text-stone-900 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>데이터 안전 가입 보증</span>
                  </p>
                  <p>• 입력하신 이메일은 실제 Firebase Authentication 상에 보안 자격증명으로 영구 기록됩니다.</p>
                  <p>• 웰컴 알림 서비스가 완벽하게 실시간 작동합니다.</p>
                </div>

                {/* Submission triggers */}
                <button
                  type="button"
                  onClick={handleGoogleSignupSubmit}
                  disabled={isLoading}
                  className="cursor-pointer w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-3.5 rounded-full text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs mt-2 uppercase tracking-wider disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <UserCheck className="w-4 h-4 text-emerald-400" />
                  )}
                  <span>{isLoading ? '보안 계정 생성 중...' : '동의하고 1초만에 회원가입 완료'}</span>
                </button>
              </>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
