'use client';

import { useState, useCallback } from 'react';
import { useI18n } from '@/lib/i18n-context';
import { Navigation } from '@/components/navigation';
import { WatermarkedImage } from '@/components/watermarked-image';
import { ContactFooter } from '@/components/contact-footer';
import { MobileContactBar } from '@/components/mobile-contact-bar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { openContactDialog } from '@/components/contact-dialog';
import { getRankedVenues, type Venue } from '@/lib/cms';
import Link from 'next/link';

type TabKey = 'recommended' | 'guide';
type GuideSubTab = 'flow' | 'vip';

interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  desc: string;
  note?: string;
}

const serviceContent: Record<string, ServiceItem[]> = {
  zh: [
    {
      id: 'match',
      icon: '💬',
      title: '帮你配对最适合的会所',
      desc: '不必在十多间会所里迷路——告诉我们你的飞行时间、预算范围、想体验什么,由我们替你配对。团队熟悉每一间的特色与当下状况,避免你白跑或选错。',
    },
    {
      id: 'pickup',
      icon: '🚗',
      title: '澳门机场 / 关闸 / 码头 接机',
      desc: '飞抵澳门国际机场、从香港搭港珠澳大桥、或外港 / 氹仔码头——告诉我们落地时间,七人座专车到指定点接你。完成后,澳门境内任何位置都能送达。',
      note: '七人座轻松容纳——同行伙伴享同样礼遇,零额外费用。',
    },
    {
      id: 'vip',
      icon: '⚡',
      title: 'VIP 入场 · 内部优惠价',
      desc: '透过内部网络预约,直接进场、不必在大堂排队。每一间会所都为玩家保留专属折扣——告诉我们想去哪一间,我们替你锁定折扣。',
    },
    {
      id: 'perk',
      icon: '🎁',
      title: '任选 1 项 VIP 尊享',
      desc: '玩家透过我们预约的小回馈——我们会事先通知场地您的到访,到场时可直接挑选喜欢的尊享项目(头部按摩、足底按摩、修甲、采耳等)。',
    },
    {
      id: 'return',
      icon: '🚗',
      title: '回程专车送机',
      desc: '无论你结束时是清晨、午后、或服务刚结束,传一则讯息给我们,同一辆专车回来载你回酒店、机场、码头,或澳门任何点。同样零费用。',
    },
  ],
  'zh-TW': [
    {
      id: 'match',
      icon: '💬',
      title: '帮你配对最适合的会所',
      desc: '不必在十多间会所里迷路——告诉我们你的飞行时间、预算范围、想体验什么,由我们替你配对。团队熟悉每一间的特色与当下状况,避免你白跑或选错。',
    },
    {
      id: 'pickup',
      icon: '🚗',
      title: '澳门机场 / 关闸 / 码头 接机',
      desc: '飞抵澳门国际机场、从香港搭港珠澳大桥、或外港 / 氹仔码头——告诉我们落地时间,七人座专车到指定点接你。完成后,澳门境内任何位置都能送达。',
      note: '七人座轻松容纳——同行伙伴享同样礼遇,零额外费用。',
    },
    {
      id: 'vip',
      icon: '⚡',
      title: 'VIP 入场 · 内部优惠价',
      desc: '透过内部网络预约,直接进场、不必在大堂排队。每一间会所都为玩家保留专属折扣——告诉我们想去哪一间,我们替你锁定折扣。',
    },
    {
      id: 'perk',
      icon: '🎁',
      title: '任选 1 项 VIP 尊享',
      desc: '玩家透过我们预约的小回馈——我们会事先通知场地您的到访,到场时可直接挑选喜欢的尊享项目(头部按摩、足底按摩、修甲、采耳等)。',
    },
    {
      id: 'return',
      icon: '🚗',
      title: '回程专车送机',
      desc: '无论你结束时是清晨、午后、或服务刚结束,传一则讯息给我们,同一辆专车回来载你回酒店、机场、码头,或澳门任何点。同样零费用。',
    },
  ],
  en: [
    {
      id: 'match',
      icon: '💬',
      title: 'Match Your Perfect Venue',
      desc: "No need to get lost among a dozen venues — tell us your flight time, budget, and what you'd like to experience, and we'll match you. Our team knows every venue's character and current status, so you won't waste a trip or pick the wrong one.",
    },
    {
      id: 'pickup',
      icon: '🚗',
      title: 'Airport / Border / Ferry Pickup',
      desc: "Landing at Macau International Airport, arriving via Hong Kong-Zhuhai-Macao Bridge, or at Outer Harbour / Taipa Ferry Terminal — tell us your arrival time and a 7-seater van will pick you up. After your visit, we'll drop you off anywhere in Macau.",
      note: '7-seater fits easily — your companions enjoy the same courtesy at zero extra cost.',
    },
    {
      id: 'vip',
      icon: '⚡',
      title: 'VIP Entry · Insider Pricing',
      desc: "Book through our insider network — walk right in, skip the lobby queue. Every venue reserves exclusive discounts for our players — tell us which one and we'll lock it in.",
    },
    {
      id: 'perk',
      icon: '🎁',
      title: 'Choose 1 VIP Perk',
      desc: "A little bonus for booking through us — we'll notify the venue of your visit in advance. When you arrive, pick your favorite perk (head massage, foot massage, manicure, ear cleaning, etc.).",
    },
    {
      id: 'return',
      icon: '🚗',
      title: 'Return Ride Service',
      desc: "Whether you finish at dawn, afternoon, or right after your session — send us a message and the same van comes back to take you to your hotel, airport, ferry terminal, or anywhere in Macau. Also zero cost.",
    },
  ],
};

const vipPerksData = [
  { name: { zh: '擦背服务', 'zh-TW': '擦背服务', en: 'Back Scrub' }, desc: { zh: '专业擦背服务,舒缓肩颈与背部紧绷。', 'zh-TW': '专业擦背服务,舒缓肩颈与背部紧绷。', en: 'Professional back scrub to relieve neck & shoulder tension.' }, price: '298 MOP' },
  { name: { zh: '腿部按摩', 'zh-TW': '腿部按摩', en: 'Leg Massage' }, desc: { zh: '大腿前后深层放松,桑拿后最对症。', 'zh-TW': '大腿前后深层放松,桑拿后最对症。', en: 'Deep relaxation for front & back thighs — perfect after sauna.' }, price: '288 MOP' },
  { name: { zh: '头部按摩', 'zh-TW': '头部按摩', en: 'Head Massage' }, desc: { zh: '头皮揉压,缓解头痛与精神疲劳。', 'zh-TW': '头皮揉压,缓解头痛与精神疲劳。', en: 'Scalp pressure relief for headaches & mental fatigue.' }, price: '230 MOP' },
  { name: { zh: '足底按摩', 'zh-TW': '足底按摩', en: 'Foot Massage' }, desc: { zh: '穴位按压,唤醒疲惫双足。', 'zh-TW': '穴位按压,唤醒疲惫双足。', en: 'Acupressure to revive tired feet.' }, price: '230 MOP' },
  { name: { zh: '修手指甲', 'zh-TW': '修手指甲', en: 'Manicure' }, desc: { zh: '修剪、塑形、护理甲缘。', 'zh-TW': '修剪、塑形、护理甲缘。', en: 'Trimming, shaping & cuticle care.' }, price: '220 MOP' },
  { name: { zh: '修脚指甲', 'zh-TW': '修脚指甲', en: 'Pedicure' }, desc: { zh: '泡脚、修甲、甲缘护理、足部放松。', 'zh-TW': '泡脚、修甲、甲缘护理、足部放松。', en: 'Foot soak, nail trim, cuticle care & foot relaxation.' }, price: '220 MOP' },
  { name: { zh: '手部按摩', 'zh-TW': '手部按摩', en: 'Hand Massage' }, desc: { zh: '释放手腕与前臂的紧绷感。', 'zh-TW': '释放手腕与前臂的紧绷感。', en: 'Release tension from wrists & forearms.' }, price: '200 MOP' },
  { name: { zh: '采耳', 'zh-TW': '采耳', en: 'Ear Cleaning' }, desc: { zh: '传统采耳体验,意外地让人放松。', 'zh-TW': '传统采耳体验,意外地让人放松。', en: 'Traditional ear cleaning — surprisingly relaxing.' }, price: '200 MOP' },
];

export default function GuidePage() {
  const { t, locale } = useI18n();
  const [activeTab, setActiveTab] = useState<TabKey>('recommended');
  const [guideSubTab, setGuideSubTab] = useState<GuideSubTab>('flow');
  const ranked = getRankedVenues();

  const scrollToSection = useCallback((key: TabKey) => {
    setActiveTab(key);
    // small delay to let DOM update if section was hidden
    requestAnimationFrame(() => {
      const el = document.getElementById(`section-${key}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }, []);

  return (
    <>
      <Navigation />
      <main className="pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Back Button */}
          <div className="mb-6">
            <Button
              asChild
              variant="ghost"
              className="text-muted-foreground hover:text-foreground gap-2 px-0"
            >
              <Link href="/">
                <ArrowLeft className="h-4 w-4" />
                {locale === 'en' ? 'Back to Home' : '返回首页'}
              </Link>
            </Button>
          </div>

          {/* Page Header */}
          <div className="mb-10">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-2">
              {locale === 'en' ? 'Complete Guide: From Preparation to Departure' : '完整攻略：从准备到离场'}
            </h1>
            <p className="text-muted-foreground">
              {locale === 'en'
                ? 'Everything you need to know for a perfect spa experience in Macau'
                : '从预约到体验,一站式服务指南'}
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            {([
              { key: 'recommended' as TabKey, label: locale === 'en' ? 'Recommended Venues' : '推荐门店' },
              { key: 'guide' as TabKey, label: locale === 'en' ? 'Player Guide' : '玩家流程' },
            ]).map((tab) => (
              <Button
                key={tab.key}
                size="lg"
                onClick={() => scrollToSection(tab.key)}
                className={`px-8 py-6 text-base font-semibold rounded-lg transition-all ${
                  activeTab === tab.key
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'bg-primary/10 text-primary hover:bg-primary/20'
                }`}
              >
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Section: 推荐门店 */}
          <section id="section-recommended" className="scroll-mt-24 mb-16">
            <div className="space-y-6">
              <p className="text-center text-sm text-muted-foreground">
                {locale === 'en'
                  ? '12 licensed venues · Each with exclusive technician matching · Includes 1-on-1 professional massage, dining & overnight · Player-tested recommendations'
                  : '12 间持牌会所・每间都有独家技师媒合环节・含一对一专业按摩、餐饮与过夜・玩家实测推荐'}
              </p>
              {ranked.map((venue) => (
                <VenueShowcaseCard key={venue.slug} venue={venue} />
              ))}
            </div>
          </section>

          {/* Section: 玩家流程 */}
          <section id="section-guide" className="scroll-mt-24">
            {/* 副标题 */}
            <p className="text-center text-sm text-muted-foreground mb-6">
              {locale === 'en'
                ? 'From your first message — matching, pickup, VIP entry, VIP perks, return ride — all handled.'
                : '从你发消息那一刻起——配对推荐、机场接送、VIP 入场、VIP 尊享、回程接送,全部由我们打点。'}
            </p>

            {/* 子Tab */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {([
                { key: 'flow' as GuideSubTab, label: locale === 'en' ? 'Player Flow' : '玩家流程' },
                { key: 'vip' as GuideSubTab, label: locale === 'en' ? 'VIP Perks' : 'VIP 尊享' },
              ]).map((sub) => (
                <button
                  key={sub.key}
                  onClick={() => setGuideSubTab(sub.key)}
                  className={`px-5 py-2 text-sm font-semibold rounded-full transition-all ${
                    guideSubTab === sub.key
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>

            {/* 玩家流程 */}
            {guideSubTab === 'flow' && (
              <div className="space-y-0">
                {serviceContent[locale as keyof typeof serviceContent]?.map((item, index) => (
                  <div key={item.id} className="flex items-start gap-4 py-5 border-b border-border last:border-b-0">
                    {/* 序号 */}
                    <span className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      {index + 1}
                    </span>
                    {/* 内容 */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground mb-1">
                        {item.title} <span className="ml-1">{item.icon}</span>
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                      {item.note && (
                        <p className="mt-2 text-xs text-primary font-medium">
                          💡 {item.note}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* VIP 尊享 */}
            {guideSubTab === 'vip' && (
              <Card className="border-primary/20 overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-primary/10 px-6 py-3 border-b border-primary/15 text-center">
                    <h2 className="font-serif text-lg font-bold text-foreground">
                      {locale === 'en' ? 'Choose 1 — Prepared by Our Service Team' : '任选1项,由服务团队为你准备'}
                    </h2>
                  </div>
                  <div className="divide-y divide-border">
                    <div className="grid grid-cols-[1fr_80px_80px] sm:grid-cols-[1fr_100px_100px] px-4 sm:px-6 py-2 bg-muted/50">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {locale === 'en' ? 'Service' : '服务项目'}
                      </span>
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider text-center">
                        {locale === 'en' ? 'Original' : '原价'}
                      </span>
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider text-center">
                        {locale === 'en' ? 'Player' : '玩家专属'}
                      </span>
                    </div>
                    {vipPerksData.map((perk, i) => (
                      <div key={i} className="grid grid-cols-[1fr_80px_80px] sm:grid-cols-[1fr_100px_100px] px-4 sm:px-6 py-3 items-center hover:bg-muted/30 transition-colors">
                        <div className="pr-3">
                          <p className="text-sm font-medium text-foreground">{perk.name[locale as keyof typeof perk.name] || perk.name.zh}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{perk.desc[locale as keyof typeof perk.desc] || perk.desc.zh}</p>
                        </div>
                        <span className="text-sm text-muted-foreground text-center line-through">{perk.price}</span>
                        <span className="text-sm font-bold text-primary text-center">{locale === 'en' ? 'Free' : '免费'}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </section>

          {/* Tips Section */}
          <section className="mt-12">
            <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
              {locale === 'en' ? 'Tips & Important Notes' : '关键注意事项'}
            </h2>
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    {locale === 'en'
                      ? 'Book 1-2 days in advance to ensure availability'
                      : '提前1-2天预约,确保有位置'}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    {locale === 'en'
                      ? 'Prepare your ID document (Macau permit or passport)'
                      : '准备好身份证件(澳门通行证或护照)'}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    {locale === 'en'
                      ? 'Confirm pricing and service details before booking'
                      : '预约前确认价格和服务内容'}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    {locale === 'en'
                      ? 'Contact us immediately if any issues arise'
                      : '遇到问题立即联系客服'}
                  </li>
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* CTA */}
          <div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 text-center">
            <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
              {locale === 'en' ? 'Still Have Questions? Contact Us Directly' : '还有疑问？直接咨询'}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {locale === 'en'
                ? 'Our professional team is ready to assist you 24/7'
                : '专业团队全天候为您服务'}
            </p>
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
              onClick={() => openContactDialog()}
            >
              {t.cta.button}
            </Button>
          </div>
        </div>
      </main>
      <ContactFooter />
      <MobileContactBar />
    </>
  );
}

function VenueShowcaseCard({ venue }: { venue: Venue }) {
  const { locale } = useI18n();
  const [expanded, setExpanded] = useState(false);
  const name = locale === 'en' ? venue.nameEn : venue.name;
  const longDesc = (locale === 'en' ? venue.longDescriptionEn : venue.longDescription) || '';
  const coverBadge = (locale === 'en' ? venue.coverBadgeEn : venue.coverBadge) || '';
  const coverImage = venue.coverImage || venue.image;
  const isLong = longDesc.length > 120;
  const displayDesc = expanded || !isLong ? longDesc : longDesc.slice(0, 120) + '…';

  return (
    <Link href={`/venues/${venue.slug}`} className="group block rounded-xl border border-border overflow-hidden bg-card hover:shadow-lg transition-shadow">
      {/* Cover Image with Badge */}
      <div className="relative aspect-[16/7] sm:aspect-[16/6] overflow-hidden bg-muted">
        <WatermarkedImage
          src={coverImage}
          alt={name}
          className={`w-full h-full ${venue.suspended ? 'saturate-[0.3]' : 'group-hover:scale-105 transition-transform duration-500'}`}
        />
        {coverBadge && !venue.suspended && (
          <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold rounded-full bg-primary text-primary-foreground shadow-md">
            {coverBadge}
          </span>
        )}
        {venue.suspended && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <span className="px-4 py-2 bg-foreground/90 text-background text-sm font-bold rounded-lg">
              {locale === 'en' ? 'Temporarily Closed' : '暂停营业'}
            </span>
          </div>
        )}
      </div>
      {/* Content */}
      <div className="p-4 sm:p-5">
        <span className="font-serif text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
          {name}
        </span>
        {longDesc && (
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {displayDesc}
            {isLong && (
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setExpanded(!expanded); }}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); e.stopPropagation(); setExpanded(!expanded); } }}
                className="ml-1 text-primary font-medium hover:underline cursor-pointer"
              >
                {expanded
                  ? locale === 'en' ? 'Less' : '收起'
                  : locale === 'en' ? 'More' : '展开'}
              </span>
            )}
          </p>
        )}
        <span className="inline-flex items-center gap-1 mt-3 text-sm font-semibold text-primary group-hover:underline">
          {locale === 'en' ? 'Learn more' : '了解更多'}
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}