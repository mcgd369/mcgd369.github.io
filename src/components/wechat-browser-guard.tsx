'use client';

import { useEffect, useState } from 'react';

/**
 * 检测微信内置浏览器并显示引导遮罩
 * 微信会拦截所有自动跳转外部浏览器的行为，唯一可靠的方式是引导用户手动点击右上角"在浏览器打开"
 */
export function WeChatBrowserGuard() {
  const [isWeChat, setIsWeChat] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('micromessenger')) {
      setIsWeChat(true);
    }
  }, []);

  if (!isWeChat) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-6">
      <div className="text-center max-w-sm">
        {/* 右上角箭头指示 */}
        <div className="flex justify-end mb-4">
          <svg
            className="w-16 h-16 text-white"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M50 14L34 30M50 14L50 24M50 14L40 14"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M44 34C44 40.6274 38.6274 46 32 46C25.3726 46 20 40.6274 20 34C20 27.3726 25.3726 22 32 22"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="2 4"
            />
          </svg>
        </div>

        <h2 className="text-white text-xl font-bold mb-3">
          请在浏览器中打开
        </h2>
        <p className="text-white/80 text-sm leading-relaxed mb-6">
          本页面在微信内可能无法正常显示，请点击右上角
          <span className="inline-flex items-center justify-center w-7 h-7 mx-1 rounded-full bg-white/20 text-white font-bold align-middle">
            ···
          </span>
          按钮，选择
          <span className="text-yellow-300 font-semibold">「在浏览器打开」</span>
          以获得最佳体验。
        </p>

        <div className="bg-white/10 rounded-xl p-4 text-left">
          <ol className="text-white/90 text-sm space-y-2 list-decimal list-inside">
            <li>点击右上角 <span className="font-bold text-yellow-300">···</span> 菜单</li>
            <li>选择 <span className="font-bold text-yellow-300">在浏览器打开</span></li>
            <li>即可正常浏览全部内容</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
