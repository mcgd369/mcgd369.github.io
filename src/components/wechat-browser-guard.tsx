'use client';

import { useEffect, useState } from 'react';
import { X, ExternalLink } from 'lucide-react';

/**
 * 微信内置浏览器检测与友好提示
 * - 仅在移动端微信中显示顶部提示条
 * - PC端微信不显示提示，正常浏览
 * - 用户可关闭提示，不强制跳转
 */
export function WeChatBrowserGuard() {
  const [showTip, setShowTip] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    const isWeChat = ua.includes('micromessenger');
    const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua);
    
    if (isWeChat && isMobile && !isDismissed) {
      setShowTip(true);
    }
  }, [isDismissed]);

  if (!showTip) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] bg-gradient-to-r from-primary to-primary/80 text-white px-4 py-2.5 shadow-lg">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <ExternalLink className="w-4 h-4 shrink-0" />
          <p className="text-xs sm:text-sm truncate">
            微信内点击右上角「···」选择<span className="font-bold">「在浏览器打开」</span>体验更佳
          </p>
        </div>
        <button
          onClick={() => {
            setShowTip(false);
            setIsDismissed(true);
          }}
          className="shrink-0 p-1 hover:bg-white/20 rounded-md transition-colors"
          aria-label="关闭提示"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <style>{`
        body {
          padding-top: 44px;
        }
      `}</style>
    </div>
  );
}
