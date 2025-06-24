'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2, Copy, Check, Eye } from 'lucide-react';

interface QuickShareProps {
  url: string;
  title: string;
  excerpt: string;
  views: number;
}

export function QuickShare({ url, title, excerpt, views }: QuickShareProps) {
  const [copied, setCopied] = useState(false);

  const shareText = `${title} - ${excerpt}`;
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedText = encodeURIComponent(shareText);
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}&hashtags=GrowAGarden,Roblox,Gaming`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodeURIComponent(title)}`,
    };
    
    if (shareUrls[platform as keyof typeof shareUrls]) {
      window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Card className="bg-gradient-to-br from-slate-800/80 to-slate-700/80 border-slate-600 backdrop-blur-sm sticky top-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-white text-lg flex items-center gap-2">
          <Share2 className="w-5 h-5 text-emerald-400" />
          快速分享
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <p className="text-slate-300 text-sm mb-4">
          觉得这篇文章有用吗？分享给其他 Roblox 玩家吧！
        </p>
        
        {/* 快速分享按钮组 */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleShare('twitter')}
            className="border-slate-600 text-slate-300 hover:border-blue-400 hover:text-blue-400 hover:bg-blue-400/10 transition-all duration-200 text-xs"
          >
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            Twitter
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleShare('facebook')}
            className="border-slate-600 text-slate-300 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-600/10 transition-all duration-200 text-xs"
          >
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Facebook
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleShare('reddit')}
            className="border-slate-600 text-slate-300 hover:border-orange-500 hover:text-orange-500 hover:bg-orange-500/10 transition-all duration-200 text-xs"
          >
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
            </svg>
            Reddit
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopyLink}
            className={`border-slate-600 text-slate-300 hover:border-emerald-500 hover:text-emerald-500 hover:bg-emerald-500/10 transition-all duration-200 text-xs ${
              copied ? 'border-emerald-500 text-emerald-500 bg-emerald-500/10' : ''
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 mr-1" />
                已复制
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 mr-1" />
                复制链接
              </>
            )}
          </Button>
        </div>
        
        {/* 阅读量提示 */}
        <div className="text-center text-xs text-slate-500">
          <Eye className="w-3 h-3 inline mr-1" />
          {views} 次阅读 • 帮助更多玩家
        </div>
      </CardContent>
    </Card>
  );
} 