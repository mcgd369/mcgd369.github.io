'use client';

import { useEffect, useState } from 'react';

export function WeChatBrowserGuard() {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    const isWeChat = ua.includes('micromessenger');
    
    if (!isWeChat) return;

    setTimeout(() => {
      setShowPrompt(true);
    }, 300);
  }, []);

  if (!showPrompt) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-b from-blue-50 via-white to-purple-50 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-blue-100/50 to-transparent"></div>
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-80 h-40 bg-gradient-to-r from-blue-200/30 via-purple-200/30 to-pink-200/30 rounded-full blur-3xl"></div>

        <svg
          className="absolute top-12 right-4 w-40 h-40 text-blue-500"
          viewBox="0 0 160 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M140 20 Q120 10 100 25 Q80 40 90 60 Q100 80 70 90 Q40 100 30 130"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M140 20 L130 45 M140 20 L115 30"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="30" cy="130" r="12" stroke="currentColor" strokeWidth="3" fill="none" />
          <path d="M22 130 Q30 122 38 130 Q30 138 22 130" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>

        <div className="relative z-10 text-center mb-12">
          <p className="text-gray-800 text-2xl sm:text-3xl font-medium mb-4">
            点击右上角
            <span className="inline-flex items-center justify-center w-10 h-10 mx-2 rounded-full bg-white border border-gray-200 text-gray-500 font-bold text-lg shadow-sm align-middle">
              ···
            </span>
            图标
          </p>
          <p className="text-gray-800 text-2xl sm:text-3xl font-medium">
            选择在
            <span className="text-blue-500 font-bold">浏览器</span>
            中打开
          </p>
        </div>

        <div className="relative z-10 w-full max-w-sm">
          <div className="relative">
            <div className="bg-white rounded-[28px] shadow-xl overflow-hidden border border-gray-100">
              <div className="h-14 bg-gray-50 flex items-center justify-center relative">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                </div>
              </div>
              <div className="px-5 py-6">
                <div className="text-center text-sm text-gray-400 mb-5">此网页由 澳门指导 提供</div>
                <div className="grid grid-cols-5 gap-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={`top-${i}`} className="flex flex-col items-center gap-1.5">
                      <div className={`w-12 h-12 rounded-2xl ${i === 3 ? 'bg-blue-500' : 'bg-gray-100'} flex items-center justify-center`}>
                        {i === 3 && (
                          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-6 h-6">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                          </svg>
                        )}
                      </div>
                      <span className={`text-xs ${i === 3 ? 'text-blue-600 font-medium' : 'text-transparent'}`}>
                        在默认浏览器中打开
                      </span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-5 gap-3 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={`bottom-${i}`} className="flex flex-col items-center gap-1.5">
                      <div className="w-12 h-12 rounded-2xl bg-gray-100"></div>
                      <span className="text-xs text-transparent">占位</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-white rounded-t-2xl border-t border-l border-r border-gray-100"></div>
          </div>
        </div>
      </div>

      <div className="py-8 px-6 flex items-center justify-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-5 h-5">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </div>
        <span className="font-semibold text-gray-800 text-xl">澳门指导</span>
      </div>
    </div>
  );
}
