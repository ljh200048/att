import { Instagram, Youtube, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string, productId?: string, category?: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="brand-footer" className="w-full bg-[#111111] text-stone-400 text-xs mt-20 border-t border-stone-800 py-16 px-6 md:px-12 select-none font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Table-like Grid Structure (Wonderplace Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 text-left border-b border-stone-800 pb-12">
          
          {/* Column 1: Social Media Links */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">CONNECT WITH US</h4>
            <div className="flex flex-col space-y-2.5 font-bold text-stone-300">
              <a href="https://www.instagram.com/att_attached/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                <span>Instagram</span>
              </a>
            </div>
          </div>

          {/* Column 2: Copyright */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">COPYRIGHT</h4>
            <div className="space-y-1 text-stone-300">
              <p className="font-bold">© att.</p>
              <p className="text-[11px] text-stone-500">ALL RIGHTS RESERVED.</p>
              <p className="text-[10px] text-stone-600 mt-2">HOSTING BY IMWEB</p>
            </div>
          </div>

          {/* Column 3: Contact details */}
          <div className="flex flex-col space-y-4 md:col-span-1">
            <h4 className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">CUSTOMER SERVICE</h4>
            <div className="space-y-3 text-stone-300">
              <div>
                <span className="text-[9px] text-stone-500 block font-bold">E-MAIL</span>
                <span className="hover:text-white cursor-pointer break-all font-semibold text-stone-200">dlthf4841@naver.com</span>
              </div>
              <div>
                <span className="text-[9px] text-stone-500 block font-bold">ADDRESS</span>
                <p className="leading-relaxed text-[11px] font-medium text-stone-400">
                  충청북도 청주시 흥덕구 봉명동
                </p>
              </div>
            </div>
          </div>

          {/* Column 4: Representative and Corporate Info */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">ABOUT US</h4>
            <div className="space-y-3 text-stone-300">
              <div>
                <span className="text-[9px] text-stone-500 block font-bold">LEGAL AGREEMENTS</span>
                <button onClick={() => onNavigate('inquiry')} className="hover:text-white transition-colors cursor-pointer text-left font-bold text-stone-200 block">
                  개인정보처리방침
                </button>
              </div>
              <div>
                <span className="text-[9px] text-stone-500 block font-bold">REPRESENTATIVE</span>
                <span className="font-semibold text-stone-400">대표이사 : 이솔</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright statement */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-600">
          <p>att.(어태치)는 크리에이티브한 패션 감성과 트렌디한 시즌 에센셜을 제안하는 라이프스타일 편집 플랫폼입니다.</p>
          <button 
            onClick={scrollToTop}
            className="group bg-stone-900 hover:bg-white text-white hover:text-black border border-stone-800 px-4 py-2 transition-all flex items-center gap-1.5 cursor-pointer font-bold uppercase tracking-wider"
          >
            <span>TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-stone-400 group-hover:text-black" />
          </button>
        </div>

      </div>
    </footer>
  );
}
