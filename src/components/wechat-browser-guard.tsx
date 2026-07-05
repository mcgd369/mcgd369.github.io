'use client';

import { useEffect, useState } from 'react';

/**
 * 微信内置浏览器检测
 * - 微信中打开：显示提示，引导用户复制链接到浏览器打开
 * - 浏览器中打开：正常浏览
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
    <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-6">
      <div className="text-center max-w-sm">
        <p className="text-white text-base leading-relaxed">
          部分功能不支持浏览器展示，为了更好的浏览体验，请复制网页链接至浏览器打开
        </p>
      </div>
    </div>
  );
}
