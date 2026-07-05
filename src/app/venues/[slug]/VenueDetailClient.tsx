'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navigation } from '@/components/navigation';
import { ContactFooter } from '@/components/contact-footer';
import { MobileContactBar } from '@/components/mobile-contact-bar';
import { VenueCard } from '@/components/venue-card';
import { getVenueBySlug, getAllVenues } from '@/lib/cms';
import { useI18n } from '@/lib/i18n-context';
import { WatermarkedImage } from '@/components/watermarked-image';
import {
  ArrowLeft,
  Camera,
  ChevronDown,
  MapPin,
  Gift,
  Car,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  BookOpen,
  MessageSquareQuote,
  Copy,
  Check,
  Star,
  Users,
  Clock,
  CreditCard,
} from 'lucide-react';

const WECHAT_IDS = ['MAGU3336', 'MAGU3337', 'MAGU3338'];

/* ── Expandable Text: 3 lines + "展开查看全部" ── */
function ExpandableText({
  text,
  className = '',
  lines = 3,
  expandLabel,
  collapseLabel,
}: {
  text: string;
  className?: string;
  lines?: number;
  expandLabel: string;
  collapseLabel: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [needsExpand, setNeedsExpand] = useState(false);
  const measureRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    const lh = parseFloat(getComputedStyle(el).lineHeight) || 20;
    const maxHeight = lh * lines;
    setNeedsExpand(el.scrollHeight > maxHeight + 4);
  }, [text, lines]);

  return (
    <div>
      <p
        ref={measureRef}
        className={`text-foreground/85 leading-relaxed text-[15px] whitespace-pre-line transition-[max-height] duration-300 ease-out ${className}`}
        style={
          expanded
            ? undefined
            : {
                display: '-webkit-box',
                WebkitLineClamp: lines,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }
        }
      >
        {text}
      </p>
      {needsExpand && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 inline-flex items-center gap-1 text-sm text-primary/80 hover:text-primary transition-colors"
        >
          {expanded ? collapseLabel : expandLabel}
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform duration-200 ${
              expanded ? 'rotate-180' : ''
            }`}
          />
        </button>
      )}
    </div>
  );
}

/* ── Section Heading ── */
function SectionHeading({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
        {icon}
      </div>
      <h2 className="font-serif text-lg font-semibold text-foreground">
        {title}
      </h2>
    </div>
  );
}

export default function VenueDetailClient({ slug }: { slug: string }) {
  const router = useRouter();
  const { locale } = useI18n();
  const [from, setFrom] = useState<string | null>(null);

  const venue = getVenueBySlug(slug);
  const allVenues = getAllVenues();

  const [galleryExpanded, setGalleryExpanded] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const galleryPreviewCount = 2;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromParam = params.get('from');
    if (fromParam) {
      setFrom(fromParam);
    }
  }, []);

  const handleCopy = useCallback(async (id: string) => {
    try {
      await navigator.clipboard.writeText(id);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = id;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  // 获取相似场馆推荐（排除当前场馆，最多显示3个）
  const similarVenues = allVenues
    .filter(v => v.slug !== slug && !v.suspended)
    .slice(0, 3);

  if (!venue) {
    return (
      <>
        <Navigation />
        <main className="pt-16 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="font-serif text-2xl font-bold text-foreground mb-2">
              {locale === 'en' ? 'Venue Not Found' : '场馆未找到'}
            </h1>
            <p className="text-muted-foreground mb-4">
              {locale === 'en'
                ? 'The venue you are looking for does not exist.'
                : '您查找的场馆不存在。'}
            </p>
            <Link href="/venues">
              <Button variant="outline">
                {locale === 'en' ? 'Back to List' : '返回列表'}
              </Button>
            </Link>
          </div>
        </main>
      </>
    );
  }

  const galleryItems = venue.gallery || [];
  const galleryCaptions = venue.galleryCaptions || [];
  const visibleGallery = galleryExpanded
    ? galleryItems
    : galleryItems.slice(0, galleryPreviewCount);
  const hasMoreGallery = galleryItems.length > galleryPreviewCount;

  const name = locale === 'en' ? venue.nameEn : venue.name;
  const area = locale === 'en' ? venue.areaEn : venue.area;
  const longDescription =
    locale === 'en' ? venue.longDescriptionEn : venue.longDescription;
  const serviceContent =
    locale === 'en' ? venue.serviceContentEn : venue.serviceContent;
  const recommendReasons =
    locale === 'en' ? venue.recommendReasonsEn : venue.recommendReasons;
  const noticeItems =
    locale === 'en' ? venue.noticeItemsEn : venue.noticeItems;
  const conclusion =
    locale === 'en' ? venue.conclusionEn : venue.conclusion;
  const highlights = venue.highlights || [];
  const reviewSections = venue.reviewSections || [];
  const pricing = venue.pricing || [];
  const pros = locale === 'en' ? venue.prosEn : venue.pros;
  const cons = locale === 'en' ? venue.consEn : venue.cons;

  const txt = {
    alsoKnown:
      locale === 'en' ? 'Also known as' : locale === 'zh-TW' ? '亦称' : '亦称',
    gallery:
      locale === 'en' ? 'Gallery' : locale === 'zh-TW' ? '会所相册' : '会所相册',
    showAll:
      galleryItems.length > 0
        ? locale === 'en'
          ? `Show all ${galleryItems.length} photos`
          : locale === 'zh-TW'
            ? `查看全部 ${galleryItems.length} 张照片`
            : `查看全部 ${galleryItems.length} 张照片`
        : '',
    collapseGallery:
      locale === 'en' ? 'Collapse' : locale === 'zh-TW' ? '收起相册' : '收起相册',
    expand:
      locale === 'en' ? 'Expand' : locale === 'zh-TW' ? '展开查看全部' : '展开查看全部',
    collapse:
      locale === 'en' ? 'Collapse' : locale === 'zh-TW' ? '收起' : '收起',
    vipReminder:
      locale === 'en'
        ? 'Your VIP Perks'
        : locale === 'zh-TW'
          ? '您的 VIP 尊享'
          : '别忘了 — 您的 VIP 尊享',
    vipDesc:
      locale === 'en'
        ? 'Book through us and choose 1 free VIP perk — back scrub, leg massage, head massage, foot massage, nail care, ear cleaning and more.'
        : locale === 'zh-TW'
          ? '通过我们预约,可任选1项VIP尊享——擦背服务、腿部按摩、头部按摩、足底按摩、修甲、采耳等,由专业技师为您服务。'
          : '通过我们预约,可任选1项VIP尊享——擦背服务、腿部按摩、头部按摩、足底按摩、修甲、采耳等,由专业技师为您服务。',
    shuttleReminder:
      locale === 'en'
        ? 'Free Return Shuttle Ready'
        : locale === 'zh-TW'
          ? '免费回程接送已备妥'
          : '您的免费回程接送也已备妥',
    shuttleDesc:
      locale === 'en'
        ? 'When you finish — after dining, after service, anytime — just message us. The same luxury car will pick you up, to your hotel, airport, ferry, or anywhere in Macau. Zero cost.'
        : locale === 'zh-TW'
          ? '当您结束时——餐饮后、服务刚结束、任何时间——只需发信息给我们。同一辆豪华专车会回来接您,送往酒店、机场、码头,或澳门境内任何地点。零费用。'
          : '当您结束时——餐饮后、服务刚结束、任何时间——只需发信息给我们。同一辆豪华专车会回来接您,送往您的酒店、机场、码头,或澳门境内任何地点。零费用。',
    suspended:
      locale === 'en' ? 'Temporarily Closed' : locale === 'zh-TW' ? '暂停营业' : '暂停营业',
    intro:
      locale === 'en' ? 'Introduction' : locale === 'zh-TW' ? '简介' : '简介',
    serviceContent:
      locale === 'en' ? 'Services' : locale === 'zh-TW' ? '服务内容' : '服务内容',
    recommendReasons:
      locale === 'en' ? 'Why Visit' : locale === 'zh-TW' ? '推荐理由' : '推荐理由',
    noticeItems:
      locale === 'en' ? 'Things to Note' : locale === 'zh-TW' ? '注意事项' : '注意事项',
    conclusion:
      locale === 'en' ? 'Summary' : locale === 'zh-TW' ? '结语' : '结语',
    highlights:
      locale === 'en' ? 'Highlights' : locale === 'zh-TW' ? '核心亮点' : '核心亮点',
    reviews:
      locale === 'en' ? 'Reviews' : locale === 'zh-TW' ? '详细评价' : '详细评价',
    pricing:
      locale === 'en' ? 'Pricing' : locale === 'zh-TW' ? '价格方案' : '价格方案',
    prosCons:
      locale === 'en' ? 'Pros & Cons' : locale === 'zh-TW' ? '优缺点' : '优缺点',
    similar:
      locale === 'en' ? 'Similar Venues' : locale === 'zh-TW' ? '相似推荐' : '相似推荐',
    bookCta:
      locale === 'en' ? 'Book Now' : locale === 'zh-TW' ? '立即预约' : '立即预约',
    back: locale === 'en' ? 'Back' : locale === 'zh-TW' ? '返回' : '返回',
    rating: locale === 'en' ? 'Rating' : locale === 'zh-TW' ? '评分' : '评分',
    price: locale === 'en' ? 'Price' : locale === 'zh-TW' ? '价格' : '价格',
    location: locale === 'en' ? 'Location' : locale === 'zh-TW' ? '位置' : '位置',
    technicians: locale === 'en' ? 'Technicians' : locale === 'zh-TW' ? '技师' : '技师',
    hours: locale === 'en' ? 'Hours' : locale === 'zh-TW' ? '营业时间' : '营业时间',
    payment: locale === 'en' ? 'Payment' : locale === 'zh-TW' ? '支付方式' : '支付方式',
    overnight: locale === 'en' ? 'Overnight' : locale === 'zh-TW' ? '过夜' : '过夜',
    pros: locale === 'en' ? 'Pros' : locale === 'zh-TW' ? '优点' : '优点',
    cons: locale === 'en' ? 'Cons' : locale === 'zh-TW' ? '缺点' : '缺点',
  };

  const tagVariantMap: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    hot: 'destructive',
    new: 'default',
    value: 'secondary',
    premium: 'outline',
    KTV: 'default',
  };

  const tagLabels: Record<string, Record<string, string>> = {
    hot: { zh: '热门', 'zh-TW': '熱門', en: 'Hot' },
    new: { zh: '新开业', 'zh-TW': '新開業', en: 'New' },
    value: { zh: '性价比', 'zh-TW': '性價比', en: 'Value' },
    premium: { zh: '高端', 'zh-TW': '高端', en: 'Premium' },
    KTV: { zh: 'KTV', 'zh-TW': 'KTV', en: 'KTV' },
  };

  const tagLabel = tagLabels[venue.tag]?.[locale] || tagLabels[venue.tag]?.zh || venue.tag;

  return (
    <>
      {/* Fixed Back Button */}
      <div className="fixed top-16 left-3 z-[60]">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            if (from === 'home') {
              router.push('/');
            } else if (typeof window !== 'undefined' && window.history.length > 1) {
              router.back();
            } else {
              router.push('/venues');
            }
          }}
          className="bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 hover:text-white shadow-lg"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          {txt.back}
        </Button>
      </div>

      <Navigation />
      <main className="pt-16 pb-20 md:pb-0">
        {/* Cover Image */}
        <div className="relative bg-muted overflow-hidden">
          <div className="relative h-56 sm:h-72 md:h-96 overflow-hidden">
            <WatermarkedImage
              src={venue.coverImage || venue.image}
              alt={name}
              className={`w-full h-full ${venue.suspended ? 'saturate-[0.3]' : ''}`}
            />
            {venue.suspended && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <span className="px-5 py-2.5 bg-foreground/90 text-background text-base font-bold rounded-lg">
                  {txt.suspended}
                </span>
              </div>
            )}
            {galleryItems.length > 0 && (
              <button
                onClick={() => {
                  const el = document.getElementById('venue-gallery');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white/90 text-sm flex items-center gap-1.5 hover:bg-black/70 transition-colors"
              >
                <Camera className="h-4 w-4" />
                {galleryItems.length}
              </button>
            )}
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          {/* Title Card */}
          <Card className="border-border">
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-2">
                    {name}
                  </h1>
                  {venue.aliases && (
                    <p className="text-sm text-muted-foreground mb-2">
                      {txt.alsoKnown}: {venue.aliases}
                    </p>
                  )}
                </div>
                <Badge variant={tagVariantMap[venue.tag]} className="ml-2">
                  {tagLabel}
                </Badge>
              </div>

              {/* Basic Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Star className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">{txt.rating}:</span>
                  <span className="font-semibold text-foreground">{venue.rating}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">{txt.location}:</span>
                  <span className="font-semibold text-foreground">{area}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">{txt.price}:</span>
                  <span className="font-bold text-primary">{venue.price} {venue.currency}</span>
                </div>
                {venue.technicianCount && (
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">{txt.technicians}:</span>
                    <span className="font-semibold text-foreground">{locale === 'en' ? venue.technicianCountEn || venue.technicianCount : venue.technicianCount}</span>
                  </div>
                )}
                {venue.hours && (
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">{txt.hours}:</span>
                    <span className="font-semibold text-foreground">{locale === 'en' ? venue.hoursEn || venue.hours : venue.hours}</span>
                  </div>
                )}
                {venue.paymentMethods && (
                  <div className="flex items-center gap-2 text-sm">
                    <CreditCard className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-foreground">{locale === 'en' ? venue.paymentMethods : venue.paymentMethods}</span>
                  </div>
                )}
              </div>

              {venue.overnight && (
                <div className="flex items-center gap-2 text-sm bg-primary/5 px-3 py-2 rounded-lg">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="font-semibold text-foreground">
                    {txt.overnight}: {locale === 'en' ? venue.overnightEn || venue.overnight : venue.overnight}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Content Sections */}
          <div className="mt-6 space-y-8">
            {/* 1. 简介 */}
            {longDescription && (
              <section>
                <SectionHeading
                  icon={<BookOpen className="h-4 w-4 text-primary" />}
                  title={txt.intro}
                />
                <ExpandableText
                  text={longDescription}
                  lines={3}
                  expandLabel={txt.expand}
                  collapseLabel={txt.collapse}
                />
              </section>
            )}

            {/* 2. 服务内容 */}
            {serviceContent && (
              <section>
                <SectionHeading
                  icon={<Sparkles className="h-4 w-4 text-primary" />}
                  title={txt.serviceContent}
                />
                <ExpandableText
                  text={serviceContent}
                  lines={3}
                  expandLabel={txt.expand}
                  collapseLabel={txt.collapse}
                />
              </section>
            )}

            {/* 3. 核心亮点 */}
            {highlights.length > 0 && (
              <section>
                <SectionHeading
                  icon={<Gift className="h-4 w-4 text-primary" />}
                  title={txt.highlights}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Sparkles className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {locale === 'en' ? highlight.titleEn : highlight.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {locale === 'en' ? highlight.descEn : highlight.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 4. 详细评价 */}
            {reviewSections.length > 0 && (
              <section>
                <SectionHeading
                  icon={<MessageSquareQuote className="h-4 w-4 text-primary" />}
                  title={txt.reviews}
                />
                <div className="space-y-4">
                  {reviewSections.map((section, idx) => (
                    <Card key={idx} className="border-border">
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-foreground mb-2">
                          {locale === 'en' ? section.titleEn : section.title}
                        </h3>
                        <ExpandableText
                          text={locale === 'en' ? section.contentEn : section.content}
                          lines={3}
                          expandLabel={txt.expand}
                          collapseLabel={txt.collapse}
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {/* 5. 价格方案 */}
            {pricing.length > 0 && (
              <section>
                <SectionHeading
                  icon={<CreditCard className="h-4 w-4 text-primary" />}
                  title={txt.pricing}
                />
                <div className="space-y-3">
                  {pricing.map((plan, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 rounded-xl bg-card border border-border"
                    >
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {locale === 'en' ? plan.nameEn : plan.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {locale === 'en' ? plan.descEn : plan.desc}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-primary text-lg">
                          {typeof plan.price === 'number' ? plan.price.toLocaleString() : plan.price}
                        </span>
                        <span className="text-muted-foreground text-sm ml-1">
                          {venue.currency}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 6. 推荐理由 */}
            {recommendReasons && recommendReasons.length > 0 && (
              <section>
                <SectionHeading
                  icon={<CheckCircle2 className="h-4 w-4 text-primary" />}
                  title={txt.recommendReasons}
                />
                <div className="space-y-2.5">
                  {recommendReasons.map((reason, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 py-3 px-4 rounded-xl bg-card border border-border"
                    >
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="h-3 w-3 text-primary" />
                      </div>
                      <p className="text-foreground/85 text-sm leading-relaxed">
                        {reason}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 7. 优缺点 */}
            {((pros && pros.length > 0) || (cons && cons.length > 0)) && (
              <section>
                <SectionHeading
                  icon={<AlertCircle className="h-4 w-4 text-primary" />}
                  title={txt.prosCons}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pros && pros.length > 0 && (
                    <div className="p-4 rounded-xl bg-green-50 border border-green-200 dark:bg-green-950/20 dark:border-green-800">
                      <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        {txt.pros}
                      </h3>
                      <ul className="space-y-2">
                        {pros.map((pro, idx) => (
                          <li key={idx} className="text-sm text-foreground/85 flex items-start gap-2">
                            <span className="text-green-600 mt-1">•</span>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {cons && cons.length > 0 && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 dark:bg-red-950/20 dark:border-red-800">
                      <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        {txt.cons}
                      </h3>
                      <ul className="space-y-2">
                        {cons.map((con, idx) => (
                          <li key={idx} className="text-sm text-foreground/85 flex items-start gap-2">
                            <span className="text-red-600 mt-1">•</span>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* 8. 注意事项 */}
            {noticeItems && noticeItems.length > 0 && (
              <section>
                <SectionHeading
                  icon={<AlertCircle className="h-4 w-4 text-primary" />}
                  title={txt.noticeItems}
                />
                <div className="space-y-2.5">
                  {noticeItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 py-3 px-4 rounded-xl bg-card border border-border"
                    >
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <AlertCircle className="h-3 w-3 text-primary" />
                      </div>
                      <p className="text-foreground/85 text-sm leading-relaxed">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 9. 结语 */}
            {conclusion && (
              <section>
                <SectionHeading
                  icon={<MessageSquareQuote className="h-4 w-4 text-primary" />}
                  title={txt.conclusion}
                />
                <ExpandableText
                  text={conclusion}
                  lines={3}
                  expandLabel={txt.expand}
                  collapseLabel={txt.collapse}
                />
              </section>
            )}

            {/* 10. 会所相册 */}
            {galleryItems.length > 0 && (
              <section id="venue-gallery" className="scroll-mt-24">
                <SectionHeading
                  icon={<Camera className="h-4 w-4 text-primary" />}
                  title={txt.gallery}
                />
                <div className="space-y-5">
                  {visibleGallery.map((src, idx) => (
                    <div key={idx}>
                      <div className="rounded-xl overflow-hidden bg-muted">
                        <WatermarkedImage
                          src={src}
                          alt={`${name} ${idx + 1}`}
                          className={`w-full aspect-[16/10] ${venue.suspended ? 'saturate-[0.3]' : ''}`}
                          loading={idx < 2 ? undefined : 'lazy'}
                        />
                      </div>
                      {galleryCaptions[idx] && (
                        <p className="mt-2 px-1 text-sm text-muted-foreground leading-relaxed">
                          {galleryCaptions[idx]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                {hasMoreGallery && (
                  <button
                    onClick={() => setGalleryExpanded(!galleryExpanded)}
                    className="mt-5 w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-border bg-muted/30 text-sm text-muted-foreground hover:bg-muted/60 hover:text-foreground transition-colors"
                  >
                    {galleryExpanded ? (
                      <>
                        {txt.collapseGallery}
                        <ChevronDown className="h-4 w-4 rotate-180 transition-transform" />
                      </>
                    ) : (
                      <>
                        {txt.showAll}
                        <ChevronDown className="h-4 w-4 transition-transform" />
                      </>
                    )}
                  </button>
                )}
              </section>
            )}

            {/* 11. 相似推荐 */}
            {similarVenues.length > 0 && (
              <section>
                <SectionHeading
                  icon={<Users className="h-4 w-4 text-primary" />}
                  title={txt.similar}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {similarVenues.map((v) => (
                    <VenueCard key={v.slug} venue={v} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* VIP Reminder */}
          <div className="mt-10 p-5 rounded-xl bg-primary/5 border border-primary/15">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                <Gift className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm mb-1">
                  {txt.vipReminder}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {txt.vipDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Shuttle Reminder */}
          <div className="mt-4 p-5 rounded-xl bg-primary/5 border border-primary/15">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                <Car className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm mb-1">
                  {txt.shuttleReminder}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {txt.shuttleDesc}
                </p>
              </div>
            </div>
          </div>

          {/* CTA - WeChat Contact */}
          <div
            id="venue-contact"
            className="mt-8 p-6 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 scroll-mt-24"
          >
            <h3 className="font-serif text-lg font-semibold text-foreground mb-1 text-center">
              {locale === 'en'
                ? 'Ready to Book?'
                : locale === 'zh-TW'
                  ? '准备好预约了吗？'
                  : '准备好预约了吗？'}
            </h3>
            <p className="text-sm text-muted-foreground mb-5 text-center">
              {locale === 'en'
                ? 'Add any of the following WeChat IDs'
                : locale === 'zh-TW'
                  ? '添加以下任意微信号即可咨询预约'
                  : '添加以下任意微信号即可咨询预约'}
            </p>
            <div className="space-y-3">
              {WECHAT_IDS.map((id) => (
                <div
                  key={id}
                  className="flex items-center justify-between bg-card rounded-xl px-4 py-3 border border-border"
                >
                  <span className="font-mono text-base font-semibold text-foreground tracking-wider">
                    {id}
                  </span>
                  <button
                    onClick={() => handleCopy(id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    {copiedId === id ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        {locale === 'en' ? 'Copied' : '已复制'}
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        {locale === 'en' ? 'Copy' : '复制'}
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground text-center">
              {locale === 'en'
                ? 'WeChat supported · Quick response within 5 mins'
                : '支持微信添加 · 5分钟内快速响应'}
            </p>
          </div>

          <div className="h-10" />
        </div>
      </main>
      <ContactFooter />
      <MobileContactBar />
    </>
  );
}