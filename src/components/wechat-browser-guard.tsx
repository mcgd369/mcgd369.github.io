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
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative">
        <svg
          className="absolute top-8 right-4 w-32 h-32 text-blue-400 opacity-80"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="85" cy="35" r="6" stroke="currentColor" strokeWidth="2" fill="white" />
          <path
            d="M85 35L65 60M85 35L85 50M85 35L100 50"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M95 50 Q110 30 105 15 Q98 5 90 10 Q75 20 80 35"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        <div className="text-center mb-12">
          <p className="text-gray-800 text-xl mb-2">点击右上角</p>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-600 font-bold text-base shadow-sm">···</span>
            <span className="text-gray-800 text-xl">图标</span>
          </div>
          <p className="text-gray-800 text-xl">
            选择
            <span className="text-blue-500 font-semibold">在浏览器中打开</span>
          </p>
        </div>

        <div className="w-full max-w-xs">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="h-20 bg-gray-50 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              </div>
            </div>
            <div className="px-6 py-8">
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                <div className="flex-1 flex justify-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-blue-500">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M12 2v20M2 12h20"></path>
                    </svg>
                  </div>
                </div>
                <div className="w-3 h-3 rounded-full bg-gray-200"></div>
              </div>
              <div className="text-center">
                <span className="text-xs text-gray-500">在默认浏览器中打开</span>
              </div>
              <div className="flex items-center justify-center gap-3 mt-4">
                <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                <div className="w-3 h-3 rounded-full bg-gray-200"></div>
              </div>
              <div className="flex items-center justify-center gap-3 mt-3">
                <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                <div className="w-3 h-3 rounded-full bg-gray-200"></div>
                <div className="w-3 h-3 rounded-full bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-6 px-6 border-t border-gray-100 flex items-center justify-center gap-3 bg-white/80 backdrop-blur-sm">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-5 h-5">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 2v20M2 12h20"></path>
          </svg>
        </div>
        <span className="font-semibold text-gray-800">澳门指导</span>
      </div>
    </div>
  );
}
