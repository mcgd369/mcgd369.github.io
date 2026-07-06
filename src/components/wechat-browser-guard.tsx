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
    }, 500);
  }, []);

  if (!showPrompt) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
        
        <svg
          className="absolute top-8 right-8 w-36 h-36 text-blue-400 opacity-70"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="80" cy="30" r="8" stroke="currentColor" strokeWidth="2" fill="white" />
          <path d="M80 30L55 60M80 30L80 55M80 30L105 55" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M95 55 Q115 30 105 10 Q95 0 85 5 Q65 15 70 35" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </svg>

        <div className="relative z-10 text-center mb-10">
          <p className="text-gray-800 text-2xl font-medium mb-3">点击右上角</p>
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-600 font-bold text-lg shadow-sm">···</span>
            <span className="text-gray-800 text-2xl font-medium">图标</span>
          </div>
          <p className="text-gray-800 text-2xl font-medium">
            选择
            <span className="text-blue-500 font-bold">在浏览器中打开</span>
          </p>
        </div>

        <div className="relative z-10 w-full max-w-xs">
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
            <div className="h-16 bg-gray-50 flex items-center justify-center relative">
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
              </div>
            </div>
            <div className="px-6 py-6">
              <div className="text-center text-xs text-gray-400 mb-4">此网页由 澳门指导 提供</div>
              <div className="grid grid-cols-5 gap-3 mb-2">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded-xl flex flex-col items-center justify-center ${
                      i === 3
                        ? 'bg-blue-50'
                        : 'bg-gray-50'
                    }`}
                  >
                    {i === 3 && (
                      <>
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mb-1">
                          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M12 2v20M2 12h20"></path>
                          </svg>
                        </div>
                        <span className="text-[10px] text-blue-600">在浏览器中打开</span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-5 px-6 flex items-center justify-center gap-2 bg-white">
        <span className="font-semibold text-gray-800 text-lg">澳门指导</span>
      </div>
    </div>
  );
}
