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
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <button
          onClick={() => setShowPrompt(false)}
          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <span className="font-semibold text-gray-800 text-sm">打开网页</span>
        <div className="w-8 h-8 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-gray-400">
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="19" cy="12" r="1"></circle>
            <circle cx="5" cy="12" r="1"></circle>
          </svg>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-50"></div>
        
        <svg
          className="absolute top-20 right-8 w-24 h-24 text-blue-400 opacity-60"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M75 25L55 45M75 25L75 35M75 25L65 25"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="55" cy="55" r="25" stroke="currentColor" strokeWidth="2" strokeDasharray="3 5" />
          <circle cx="75" cy="25" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>

        <div className="relative z-10 text-center">
          <p className="text-gray-700 text-lg mb-2">点击右上角</p>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-600 font-bold text-sm">···</span>
            <span className="text-gray-700 text-lg">图标</span>
          </div>
          <p className="text-gray-700 text-lg">
            选择
            <span className="text-blue-500 font-semibold">在浏览器中打开</span>
          </p>
        </div>

        <div className="relative z-10 mt-12 w-full max-w-xs">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="h-24 bg-gray-100 flex items-center justify-center">
              <div className="flex items-center justify-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6 text-gray-400">
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="19" cy="12" r="1"></circle>
                  <circle cx="5" cy="12" r="1"></circle>
                </svg>
                <span className="text-xs text-gray-400">打开网页</span>
              </div>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-5 gap-2">
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
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8 text-blue-500">
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M12 2v20M2 12h20"></path>
                        </svg>
                        <span className="text-[10px] text-blue-600 mt-1">在默认浏览器中打开</span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-4 px-6 border-t border-gray-100 flex items-center justify-center gap-2 bg-white">
        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className="w-4 h-4">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 2v20M2 12h20"></path>
          </svg>
        </div>
        <span className="font-semibold text-gray-700 text-sm">澳门指导</span>
      </div>
    </div>
  );
}
