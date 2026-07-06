'use client';

import { useEffect, useState } from 'react';

/**
 * 微信内置浏览器检测
 * - 微信中打开：显示提示，引导用户复制链接到浏览器打开
 * - 浏览器中打开：正常浏览
 */
export function WeChatBrowserGuard() {
  const [isWeChat, setIsWeChat] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('micromessenger')) {
      setIsWeChat(true);
    }
  }, []);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isWeChat) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-6">
      <div className="text-center max-w-sm">
        <p className="text-white text-base leading-relaxed mb-6">
          部分功能不支持当前浏览器展示，为了更好的浏览体验，请点击左上角三个点，选择默认浏览器打开
        </p>
        <button
          onClick={handleCopyUrl}
          className={`px-6 py-3 rounded-full font-semibold text-sm transition-all ${
            copied
              ? 'bg-green-500 text-white'
              : 'bg-white/20 text-white hover:bg-white/30'
          }`}
        >
          {copied ? '✓ 已复制' : '一键复制网址'}
        </button>
      </div>
    </div>
  );
}
