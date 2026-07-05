'use client';

import { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n-context';
import { getRankedVenues, getAllVenues, type Venue } from '@/lib/cms';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, ChevronDown, MapPin, Sparkles, BedDouble, Calculator, Globe, Compass } from 'lucide-react';
import { openContactDialog } from '@/components/contact-dialog';
import { WatermarkedImage } from '@/components/watermarked-image';

/* ── 玩家流程 ── */
interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  desc: string;
  note?: string;
}

const serviceContent: Record<string, ServiceItem[]> = {
  zh: [
    { id: 'match', icon: '💬', title: '帮你配对最适合的会所', desc: '不必在十多间会所里迷路——告诉我们你的飞行时间、预算范围、想体验什幺，由我们替你配对。团队熟悉每一间的特色与当下状况，避免你白跑或选错。' },
    { id: 'pickup', icon: '🚗', title: '澳门任意地点接机', desc: '不管是机场、码头或其他地点，只要在澳门境内，告诉我们具体位置和出发人数，商务车会到指定位置接你。', note: '七人座轻松容纳——同行伙伴享同样礼遇，零额外费用。' },
    { id: 'vip', icon: '⚡', title: 'VIP 入场 · 保留折扣', desc: '透过内部网络预约，直接进场、不必在大堂排队。每一间会所都为玩家保留专属折扣——告诉我们想去哪一间，我们替你锁定折扣。' },
    { id: 'perk', icon: '🎁', title: '任选 1 项 VIP 尊享', desc: '玩家透过我们预约的小回馈——我们会事先通知场地您的到访，到场时可直接挑选喜欢的尊享项目（头部按摩、足底按摩、修甲、采耳等）。' },
    { id: 'return', icon: '🚗', title: '回程专车送机', desc: '无论你结束时是清晨、午后、或服务刚结束，传一则讯息给我们，同一辆专车回来载你回酒店、机场、码头，或澳门任何点。同样零费用。' },
  ],
  'zh-TW': [
    { id: 'match', icon: '💬', title: '帮你配对最适合的会所', desc: '不必在十多间会所里迷路——告诉我们你的飞行时间、预算范围、想体验什么，由我们替你配对。团队熟悉每一间的特色与当下状况，避免你白跑或选错。' },
    { id: 'pickup', icon: '🚗', title: '澳门任意地点接机', desc: '不管是机场、码头或其他地点，只要在澳门境内，告诉我们具体位置和出发人数，商务车会到指定位置接你。', note: '七人座轻松容纳——同行伙伴享同样礼遇，零额外费用。' },
    { id: 'vip', icon: '⚡', title: 'VIP 入场 · 保留折扣', desc: '透过内部网络预约，直接进场、不必在大堂排队。每一间会所都为玩家保留专属折扣——告诉我们想去哪一间，我们替你锁定折扣。' },
    { id: 'perk', icon: '🎁', title: '任选 1 项 VIP 尊享', desc: '玩家透过我们预约的小回馈——我们会事先通知场地您的到访，到场时可直接挑选喜欢的尊享项目（头部按摩、足底按摩、修甲、采耳等）。' },
    { id: 'return', icon: '🚗', title: '回程专车送机', desc: '无论你结束时是清晨、午后、或服务刚结束，传一则讯息给我们，同一辆专车回来载你回酒店、机场、码头，或澳门任何点。同样零费用。' },
  ],
  en: [
    { id: 'match', icon: '💬', title: 'Match Your Perfect Venue', desc: "No need to get lost among a dozen venues — tell us your flight time, budget, and what you'd like to experience, and we'll match you. Our team knows every venue's character and current status, so you won't waste a trip or pick the wrong one." },
    { id: 'pickup', icon: '🚗', title: 'Any Location Pickup in Macau', desc: "Whether it's the airport, ferry terminal, or anywhere else in Macau — tell us your exact location and group size, and a business van will pick you up.", note: '7-seater fits easily — your companions enjoy the same courtesy at zero extra cost.' },
    { id: 'vip', icon: '⚡', title: 'VIP Entry · Reserved Discount', desc: "Book through our insider network — walk right in, skip the lobby queue. Every venue reserves exclusive discounts for our players — tell us which one and we'll lock it in." },
    { id: 'perk', icon: '🎁', title: 'Choose 1 VIP Perk', desc: "A little bonus for booking through us — we'll notify the venue of your visit in advance. When you arrive, pick your favorite perk (head massage, foot massage, manicure, ear cleaning, etc.)." },
    { id: 'return', icon: '🚗', title: 'Return Ride Service', desc: "Whether you finish at dawn, afternoon, or right after your session — send us a message and the same van comes back to take you to your hotel, airport, ferry terminal, or anywhere in Macau. Also zero cost." },
  ],
};

/* ── VIP 尊享 ── */
const vipPerksData = [
  { name: { zh: '擦背服务', 'zh-TW': '擦背服务', en: 'Back Scrub' }, desc: { zh: '专业擦背服务，舒缓肩颈与背部紧绷。', 'zh-TW': '专业擦背服务，舒缓肩颈与背部紧绷。', en: 'Professional back scrub to relieve neck & shoulder tension.' }, price: '298 MOP' },
  { name: { zh: '腿部按摩', 'zh-TW': '腿部按摩', en: 'Leg Massage' }, desc: { zh: '大腿前后深层放松，桑拿后最对症。', 'zh-TW': '大腿前后深层放松，桑拿后最对症。', en: 'Deep relaxation for front & back thighs — perfect after sauna.' }, price: '288 MOP' },
  { name: { zh: '头部按摩', 'zh-TW': '头部按摩', en: 'Head Massage' }, desc: { zh: '头皮揉压，缓解头痛与精神疲劳。', 'zh-TW': '头皮揉压，缓解头痛与精神疲劳。', en: 'Scalp pressure relief for headaches & mental fatigue.' }, price: '230 MOP' },
  { name: { zh: '足底按摩', 'zh-TW': '足底按摩', en: 'Foot Massage' }, desc: { zh: '穴位按压，唤醒疲惫双足。', 'zh-TW': '穴位按压，唤醒疲惫双足。', en: 'Acupressure to revive tired feet.' }, price: '230 MOP' },
  { name: { zh: '修手指甲', 'zh-TW': '修手指甲', en: 'Manicure' }, desc: { zh: '修剪、塑形、护理甲缘。', 'zh-TW': '修剪、塑形、护理甲缘。', en: 'Trimming, shaping & cuticle care.' }, price: '220 MOP' },
  { name: { zh: '修脚指甲', 'zh-TW': '修脚指甲', en: 'Pedicure' }, desc: { zh: '泡脚、修甲、甲缘护理、足部放松。', 'zh-TW': '泡脚、修甲、甲缘护理、足部放松。', en: 'Foot soak, nail trim, cuticle care & foot relaxation.' }, price: '220 MOP' },
  { name: { zh: '手部按摩', 'zh-TW': '手部按摩', en: 'Hand Massage' }, desc: { zh: '释放手腕与前臂的紧绷感。', 'zh-TW': '释放手腕与前臂的紧绷感。', en: 'Release tension from wrists & forearms.' }, price: '200 MOP' },
  { name: { zh: '采耳', 'zh-TW': '采耳', en: 'Ear Cleaning' }, desc: { zh: '传统采耳体验，意外地让人放松。', 'zh-TW': '传统采耳体验，意外地让人放松。', en: 'Traditional ear cleaning — surprisingly relaxing.' }, price: '200 MOP' },
];

/* ── FAQ ── */
const faqData = {
  zh: [
    { q: '澳门桑拿是什幺？', a: '澳门桑拿是集水疗、餐饮与休闲于一体的现代化娱乐会所，所有正规场所均持有澳门旅游局（MGTO）核发的合法执照。提供沐浴设施、免费餐饮、专业按摩、技师媒合环节及 60 分钟一对一服务，大部分场所可逗留 12-15 小时，亦可过夜。' },
    { q: '澳门桑拿安全合法吗？', a: '合法。所有正规澳门桑拿均持有旅游局发出的「蒸汽浴及按摩场所准照」，定期接受卫生、消防及安全检查，监管制度与赌场同级。可于澳门旅游局官网查核任何场所的牌照状态。' },
    { q: '第一次去应该怎幺做？', a: '先联系我们！我们会根据你的喜好推荐最适合的场所，安排免费接送，并为你争取专属优惠价。自行前往可能需要等候1-2小时，且价格较高。' },
    { q: '大概要花多少钱？', a: '视乎场所及技师类别，一般范围为 MOP 1,800 - 7,000+。越南/泰国技师约 MOP 2,400-3,200，中国/模特约 MOP 3,200-4,200，日韩技师约 MOP 5,800-6,800。联系我们了解最新优惠。' },
    { q: '有隐藏收费吗？', a: '部分场所收取10-15%服务费，主题房间需额外付费（MOP 400-1,000），特殊服装要求另计（MOP 200-350）。通过我们预约，所有费用提前告知，绝无隐藏收费。' },
    { q: '可以刷卡吗？', a: '可以。大部分场所接受 Visa、Mastercard、银联、现金（澳门币/港币）、支付宝、微信支付、Apple Pay。小提示：使用澳门币现金可节省1-3%汇率手续费。' },
    { q: '营业时间？', a: '所有主流桑拿24小时营业，但技师上班时间为下午1点至凌晨5点。' },
    { q: '几点技师比较多？', a: '晚上7点后大部分技师上班，选择最丰富。想避开人潮，下午3-6点入场最为清静。' },
    { q: '服务时间多久？', a: '标准服务60分钟，纯按摩90分钟。' },
    { q: '可以过夜吗？', a: '可以。所有主流桑拿均可过夜（12-15小时），免费使用躺椅、餐饮、沐浴设施。尊贵水疗更提供免费独立睡房，是过夜首选。' },
    { q: '能寄存行李吗？', a: '可以。所有场所均提供免费行李寄存，更衣室设有安全储物柜。' },
    { q: '里面有吃的吗？', a: '有。全部免费、无限量供应。餐饮包含精选牛排、新鲜海鲜、粤式炖汤、川式精致小炒、炒饭、炒面、新鲜水果、啤酒、汽水、小食。口味偏港式／粤式，并融合川菜风味。部分场所还有鲍鱼、花胶鱼翅、燕窝、牛鞭汤等高级菜肴，无需额外收费。' },
    { q: '回程也免费吗？', a: '是的——接送与回程同样免费。完成后（餐饮后、服务后或任何时候）发讯息给我们，我们会派同一辆私人专车送您回酒店、机场、码头或澳门任何地点。' },
    { q: '为什幺要通过你们预约？', a: '我们提供：专属合作价（低于自行到场价格）、免费私人专车接送与回程（澳门任何地点）、1 项 VIP 尊享（由你选）、优先入场免排队、实时技师在线资讯、根据你的喜好作出真诚推荐。' },
    { q: '可以临时取消吗？', a: '可以，免费取消，无需预付订金。' },
    { q: 'VIP 尊享有哪些？', a: '通过我们预约可获 1 项 VIP 尊享——可任选擦背服务、头部按摩、足底按摩、修手指甲、修脚指甲、手部按摩、采耳。我们会事先通知场地您的到访，到场时可直接挑选。' },
  ],
  'zh-TW': [
    { q: '澳门桑拿是什么？', a: '澳门桑拿是集水疗、餐饮与休闲于一体的现代化娱乐会所，所有正规场所均持有澳门旅游局（MGTO）核发的合法执照。提供沐浴设施、免费餐饮、专业按摩、技师媒合环节及 60 分钟一对一服务，大部分场所可逗留 12-15 小时，亦可过夜。' },
    { q: '澳门桑拿安全合法吗？', a: '合法。所有正规澳门桑拿均持有旅游局发出的「蒸汽浴及按摩场所准照」，定期接受卫生、消防及安全检查，监管制度与赌场同级。可于澳门旅游局官网查核任何场所的牌照状态。' },
    { q: '第一次去应该怎么做？', a: '先联系我们！我们会根据你的喜好推荐最适合的场所，安排免费接送，并为你争取专属优惠价。自行前往可能需要等候1-2小时，且价格较高。' },
    { q: '大概要花多少钱？', a: '视乎场所及技师类别，一般范围为 MOP 1,800 - 7,000+。越南/泰国技师约 MOP 2,400-3,200，中国/模特约 MOP 3,200-4,200，日韩技师约 MOP 5,800-6,800。联系我们了解最新优惠。' },
    { q: '有隐藏收费吗？', a: '部分场所收取10-15%服务费，主题房间需额外付费（MOP 400-1,000），特殊服装要求另计（MOP 200-350）。透过我们预约，所有费用提前告知，绝无隐藏收费。' },
    { q: '可以刷卡吗？', a: '可以。大部分场所接受 Visa、Mastercard、银联、现金（澳门币/港币）、支付宝、微信支付、Apple Pay。小提示：使用澳门币现金可节省1-3%汇率手续费。' },
    { q: '营业时间？', a: '所有主流桑拿24小时营业，但技师上班时间为下午1点至凌晨5点。' },
    { q: '几点技师比较多？', a: '晚上7点后大部分技师上班，选择最丰富。想避开人潮，下午3-6点入场最为清静。' },
    { q: '服务时间多久？', a: '标准服务60分钟，纯按摩90分钟。' },
    { q: '可以过夜吗？', a: '可以。所有主流桑拿均可过夜（12-15小时），免费使用躺椅、餐饮、沐浴设施。尊贵水疗更提供免费独立睡房，是过夜首选。' },
    { q: '能寄存行李吗？', a: '可以。所有场所均提供免费行李寄存，更衣室设有安全储物柜。' },
    { q: '里面有吃的吗？', a: '有。全部免费、无限量供应。餐饮包含精选牛排、新鲜海鲜、粤式炖汤、川式精致小炒、炒饭、炒面、新鲜水果、啤酒、汽水、小食。口味偏港式／粤式，并融合川菜风味。部分场所还有鲍鱼、花胶鱼翅、燕窝、牛鞭汤等高级菜肴，无需额外收费。' },
    { q: '回程也免费吗？', a: '是的——接送与回程同样免费。完成后（餐饮后、服务后或任何时候）发讯息给我们，我们会派同一辆私人专车送您回酒店、机场、码头或澳门任何地点。' },
    { q: '为什么要透过你们预约？', a: '我们提供：专属合作价（低于自行到场价格）、免费私人专车接送与回程（澳门任何地点）、1 项 VIP 尊享（由你选）、优先入场免排队、即时技师在线资讯、根据你的喜好作出真诚推荐。' },
    { q: '可以临时取消吗？', a: '可以，免费取消，无需预付订金。' },
    { q: 'VIP 尊享有哪些？', a: '透过我们预约可获 1 项 VIP 尊享——可任选擦背服务、头部按摩、足底按摩、修手指甲、修脚指甲、手部按摩、采耳。我们会事先通知场地您的到访，到场时可直接挑选。' },
  ],
  en: [
    { q: 'What is a Macau sauna?', a: 'A Macau sauna is a modern entertainment venue combining spa, dining, and leisure — all licensed by the Macau Government Tourism Office (MGTO). Facilities include bathing, free dining, professional massage, technician matching, and 60-minute one-on-one service. Most venues allow you to stay 12-15 hours, including overnight.' },
    { q: 'Is it safe and legal?', a: 'Yes. All legitimate Macau saunas hold a "Steam Bath & Massage Establishment Licence" issued by MGTO, with regular health, fire, and safety inspections — the same regulatory standard as casinos. You can verify any venue\'s licence status on the MGTO website.' },
    { q: 'What should I do on my first visit?', a: 'Contact us first! We\'ll recommend the best venue for your preferences, arrange free transfers, and secure an exclusive discount. Walk-ins may wait 1-2 hours and pay higher prices.' },
    { q: 'How much does it cost?', a: 'Depending on venue and technician category, the general range is MOP 1,800 - 7,000+. Vietnamese/Thai technicians are around MOP 2,400-3,200, Chinese/models MOP 3,200-4,200, and Japanese/Korean MOP 5,800-6,800. Contact us for the latest offers.' },
    { q: 'Are there hidden fees?', a: 'Some venues charge a 10-15% service fee, themed rooms cost extra (MOP 400-1,000), and special outfits may be additional (MOP 200-350). When you book through us, all fees are disclosed upfront — no hidden charges.' },
    { q: 'Can I pay by card?', a: 'Yes. Most venues accept Visa, Mastercard, UnionPay, cash (MOP/HKD), Alipay, WeChat Pay, and Apple Pay. Tip: paying in MOP cash saves 1-3% on currency conversion fees.' },
    { q: 'What are the operating hours?', a: 'All major saunas operate 24 hours, but technicians are available from 1 PM to 5 AM.' },
    { q: 'When are the most technicians available?', a: 'After 7 PM, most technicians are on shift — that\'s when selection is widest. For a quieter experience, arrive between 3-6 PM.' },
    { q: 'How long is the service?', a: 'Standard service is 60 minutes; pure massage sessions are 90 minutes.' },
    { q: 'Can I stay overnight?', a: 'Yes. All major saunas allow overnight stays (12-15 hours) with free use of recliners, dining, and bathing facilities. Majesty Spa even offers free private sleeping rooms — the best choice for overnight stays.' },
    { q: 'Can I store my luggage?', a: 'Yes. All venues provide free luggage storage with secure lockers in the changing rooms.' },
    { q: 'Is food available?', a: 'Yes — all free and unlimited. Dining includes premium steak, fresh seafood, Cantonese soup, Sichuan-style dishes, fried rice, noodles, fresh fruit, beer, soft drinks, and snacks. Some venues even serve abalone, fish maw, bird\'s nest, and other premium dishes at no extra charge.' },
    { q: 'Is the return ride also free?', a: 'Yes — both pickup and return are completely free. When you\'re done (after dining, after your session, or anytime), just message us and the same private van will take you back to your hotel, airport, ferry terminal, or anywhere in Macau.' },
    { q: 'Why should I book through you?', a: 'We offer: exclusive partner pricing (lower than walk-in), free private van transfers both ways (anywhere in Macau), 1 free VIP perk of your choice, priority queue-free entry, real-time technician availability, and genuine recommendations based on your preferences.' },
    { q: 'Can I cancel last minute?', a: 'Yes, free cancellation with no deposit required.' },
    { q: 'What VIP perks are available?', a: 'Book through us and receive 1 free VIP perk — choose from back scrub, head massage, foot massage, manicure, pedicure, hand massage, or ear cleaning. We\'ll notify the venue of your visit in advance, so you can pick your perk upon arrival.' },
  ],
};

/* ── 场馆分类筛选标签 ── */
const categoryFilters = {
  zh: [
    { key: '全部', label: '全部' },
    { key: '泡泡浴', label: '泡泡浴' },
    { key: '主题房', label: '主题房' },
    { key: '高性价', label: '高性价' },
    { key: '阵容', label: '阵容' },
    { key: '新场', label: '新场' },
    { key: 'KTV', label: 'KTV' },
  ],
  'zh-TW': [
    { key: '全部', label: '全部' },
    { key: '泡泡浴', label: '泡泡浴' },
    { key: '主题房', label: '主题房' },
    { key: '高性价', label: '高性价' },
    { key: '阵容', label: '阵容' },
    { key: '新场', label: '新场' },
    { key: 'KTV', label: 'KTV' },
  ],
  en: [
    { key: '全部', label: 'All' },
    { key: '泡泡浴', label: 'Bubble Bath' },
    { key: '主题房', label: 'Theme Rooms' },
    { key: '高性价', label: 'Best Value' },
    { key: '阵容', label: 'Top Lineup' },
    { key: '新场', label: 'New' },
    { key: 'KTV', label: 'KTV' },
  ],
};

/* ── 智能配对问答 ── */
interface QuizOption {
  label: string;
  value: string;
  match?: string;
}

interface QuizStep {
  id: string;
  question: string;
  options: QuizOption[];
}

const quizSteps: Record<string, QuizStep[]> = {
  zh: [
    {
      id: 'direction',
      question: '想根据哪个方向选店？',
      options: [
        { label: '玩法', value: 'experience' },
        { label: '国籍', value: 'nationality' },
      ],
    },
    {
      id: 'experience',
      question: '想要什幺体验？',
      options: [
        { label: '日式泡泡浴', value: '泡泡浴', match: '泡泡浴' },
        { label: '主题情景', value: '主题房', match: '主题房' },
        { label: '经典莞式', value: '莞式', match: '莞式' },
        { label: 'KTV 包厢', value: 'KTV', match: 'KTV' },
      ],
    },
    {
      id: 'nationality',
      question: '偏好哪国技师？',
      options: [
        { label: '东南亚', value: '东南亚', match: '东南亚' },
        { label: '国内', value: '国内', match: '国内' },
        { label: '欧美', value: '欧美', match: '欧美' },
        { label: '日韩', value: '日韩', match: '日韩' },
      ],
    },
  ],
  'zh-TW': [
    {
      id: 'direction',
      question: '想根据哪个方向选店？',
      options: [
        { label: '玩法', value: 'experience' },
        { label: '国籍', value: 'nationality' },
      ],
    },
    {
      id: 'experience',
      question: '想要什么体验？',
      options: [
        { label: '日式泡泡浴', value: '泡泡浴', match: '泡泡浴' },
        { label: '主题情境', value: '主题房', match: '主题房' },
        { label: '经典莞式', value: '莞式', match: '莞式' },
        { label: 'KTV 包厢', value: 'KTV', match: 'KTV' },
      ],
    },
    {
      id: 'nationality',
      question: '偏好哪国技师？',
      options: [
        { label: '东南亚', value: '东南亚', match: '东南亚' },
        { label: '国内', value: '国内', match: '国内' },
        { label: '欧美', value: '欧美', match: '欧美' },
        { label: '日韩', value: '日韩', match: '日韩' },
      ],
    },
  ],
  en: [
    {
      id: 'direction',
      question: 'How would you like to choose?',
      options: [
        { label: 'By Experience', value: 'experience' },
        { label: 'By Nationality', value: 'nationality' },
      ],
    },
    {
      id: 'experience',
      question: 'What experience do you want?',
      options: [
        { label: 'Japanese Bubble Bath', value: '泡泡浴', match: '泡泡浴' },
        { label: 'Theme Scenarios', value: '主题房', match: '主题房' },
        { label: 'Classic Dongguan', value: '莞式', match: '莞式' },
        { label: 'KTV Party', value: 'KTV', match: 'KTV' },
      ],
    },
    {
      id: 'nationality',
      question: 'Preferred technician nationality?',
      options: [
        { label: 'Southeast Asian', value: '东南亚', match: '东南亚' },
        { label: 'Chinese', value: '国内', match: '国内' },
        { label: 'European', value: '欧美', match: '欧美' },
        { label: 'Japanese / Korean', value: '日韩', match: '日韩' },
      ],
    },
  ],
};

type GuideTab = 'venues' | 'guide' | 'faq' | 'match';

/* ── 可折叠板块 ── */
function CollapsibleSection({
  label,
  icon,
  title,
  subtitle,
  children,
  defaultOpen = false,
}: {
  label: string;
  icon?: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    const willOpen = !open;
    setOpen(willOpen);
    if (willOpen && sectionRef.current) {
      const el = sectionRef.current;
      requestAnimationFrame(() => {
        const y = el.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo({ top: y, behavior: 'smooth' });
      });
    }
  };

  return (
    <div ref={sectionRef} className="border border-border/50 rounded-lg overflow-hidden">
      {/* Header — always visible, clickable */}
      <button
        onClick={handleToggle}
        className="w-full flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-3.5 text-left bg-card hover:bg-muted/30 transition-colors"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {icon}
            <span className="text-xs font-bold tracking-wider uppercase text-primary/70">{label}</span>
          </div>
          <h3 className="font-serif text-base sm:text-lg font-bold text-foreground">{title}</h3>
          <p className="text-muted-foreground text-xs mt-0">{subtitle}</p>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Content — collapsible */}
      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 sm:px-8 pb-6 sm:pb-8 pt-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function GuideFlowSection() {
  const { t, locale } = useI18n();
  const allVenues = getAllVenues();

  return (
    <section id="guide" className="scroll-mt-16 bg-card relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
            {locale === 'en' ? 'Macau Sauna Guide' : locale === 'zh-TW' ? '澳门桑拿攻略' : '澳门桑拿攻略'}
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-lg mx-auto">
            {locale === 'en'
              ? 'Explore what interests you'
              : locale === 'zh-TW'
                ? '选择你想了解的内容'
                : '选择你想了解的内容'}
          </p>
        </div>

        {/* Collapsible sections */}
        <div className="flex flex-col gap-2">
          <CollapsibleSection
            label={locale === 'en' ? 'RECOMMENDED' : locale === 'zh-TW' ? '推荐门店' : '推荐门店'}
            title={locale === 'en' ? '12 Licensed Venues' : locale === 'zh-TW' ? '12 间持牌会所' : '12 间持牌会所'}
            subtitle={
              locale === 'en'
                ? 'Each with exclusive technician matching'
                : locale === 'zh-TW'
                  ? '每间都有独家技师媒合・玩家实测推荐'
                  : '每间都有独家技师媒合・玩家实测推荐'
            }
          >
            <VenuesList locale={locale} />
          </CollapsibleSection>

          <CollapsibleSection
            label={locale === 'en' ? 'SERVICE FLOW' : locale === 'zh-TW' ? '服务流程' : '服务流程'}
            title={locale === 'en' ? 'Airport Pickup & Full Service' : locale === 'zh-TW' ? '全澳免费接送・落地即享' : '全澳免费接送・落地即享'}
            subtitle={
              locale === 'en'
                ? 'Booking included · Free transfers · VIP perks'
                : locale === 'zh-TW'
                  ? '预约即享・免加价'
                  : '预约即享・免加价'
            }
          >
            <GuideFlow locale={locale} />
          </CollapsibleSection>

          <CollapsibleSection
            label={locale === 'en' ? 'FAQ' : locale === 'zh-TW' ? '问题解答' : '问题解答'}
            title={locale === 'en' ? 'Common Questions' : locale === 'zh-TW' ? '常见问题' : '常见问题'}
            subtitle={
              locale === 'en'
                ? 'Everything you need to know before your visit'
                : locale === 'zh-TW'
                  ? '出发前你会想知道的事'
                  : '出发前你会想知道的事'
            }
          >
            <FAQList locale={locale} />
          </CollapsibleSection>

          <CollapsibleSection
            label={locale === 'en' ? 'SMART MATCH' : locale === 'zh-TW' ? '智能配对' : '智能配对'}
            icon={<Sparkles className="h-3.5 w-3.5 text-primary/70" />}
            title={locale === 'en' ? 'Find Your Best Match' : locale === 'zh-TW' ? '配出最适合你的澳门桑拿' : '配出最适合你的澳门桑拿'}
            subtitle={
              locale === 'en'
                ? 'Answer a few questions, we match you instantly'
                : locale === 'zh-TW'
                  ? '回答几条问题，我们即时为你配对'
                  : '回答几个问题，我们即时为你配对'
            }
          >
            <SmartMatch locale={locale} />
          </CollapsibleSection>

          <CollapsibleSection
            label={locale === 'en' ? 'Calculator' : locale === 'zh-TW' ? '费用计算' : '费用计算'}
            title={locale === 'en' ? 'Estimate Your Cost' : locale === 'zh-TW' ? '算算你要花多少' : '算算你要花多少'}
            subtitle={
              locale === 'en'
                ? '4 steps to your final CNY price'
                : locale === 'zh-TW'
                  ? '4步得出人民币实付价格'
                  : '4步得出人民币实付价格'
            }
          >
            <FeeCalculator venues={allVenues} locale={locale} />
          </CollapsibleSection>
        </div>
      </div>
    </section>
  );
}

/* ─── 推荐门店子组件（含分类筛选）─── */
function VenuesList({ locale }: { locale: string }) {
  const ranked = getRankedVenues();
  const filters = categoryFilters[locale as keyof typeof categoryFilters] || categoryFilters.zh;
  const [activeFilter, setActiveFilter] = useState('全部');

  const filtered = useMemo(() => {
    if (activeFilter === '全部') return ranked;
    return ranked.filter((v) => v.categories?.includes(activeFilter));
  }, [ranked, activeFilter]);

  return (
    <div className="space-y-4">
      <p className="text-center text-sm text-muted-foreground mb-2">
        {locale === 'en'
          ? '12 licensed venues · Each with exclusive technician matching · Player-tested recommendations'
          : locale === 'zh-TW'
            ? '12 间持牌会所・每间都有独家技师媒合・台湾玩家实测推荐'
            : '12 间持牌会所・每间都有独家技师媒合・玩家实测推荐'}
      </p>
      {/* Category filter pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all ${
              activeFilter === f.key
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      {filtered.map((venue) => (
        <VenueRow key={venue.slug} venue={venue} locale={locale} />
      ))}
      {filtered.length === 0 && (
        <p className="text-center text-sm text-muted-foreground py-8">
          {locale === 'en' ? 'No venues match this filter' : '暂无匹配场馆'}
        </p>
      )}
    </div>
  );
}

function VenueRow({ venue, locale }: { venue: Venue; locale: string }) {
  const name = locale === 'en' ? venue.nameEn : venue.name;
  const area = locale === 'en' ? venue.areaEn : venue.area;
  const features = locale === 'en' ? venue.featuresEn : venue.features;
  const badge = venue.coverBadgeEn && locale === 'en' ? venue.coverBadgeEn : venue.coverBadge;
  const desc = locale === 'en' ? venue.longDescriptionEn : venue.longDescription;

  const handleClick = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('venueBackTo', '/');
    }
  };

  return (
    <Link href={`/venues/${venue.slug}`} className="group block" onClick={handleClick}>
      <div className={`rounded-xl bg-background border border-border hover:border-primary/30 hover:shadow-lg transition-all overflow-hidden ${venue.suspended ? 'opacity-70' : ''}`}>
        {/* Cover image */}
        <div className="relative aspect-[16/7] sm:aspect-[16/6] overflow-hidden bg-muted">
          {venue.coverImage ? (
            <WatermarkedImage
              src={venue.coverImage}
              alt={name}
              className={`w-full h-full group-hover:scale-[1.03] transition-transform duration-500 ${venue.suspended ? 'saturate-[0.3]' : ''}`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-serif text-3xl text-primary/30">{name.charAt(0)}</span>
            </div>
          )}
          {/* Featured badge */}
          {badge && !venue.suspended && (
            <span className="absolute top-3 left-3 px-2.5 py-1 text-[11px] sm:text-xs font-bold rounded-md bg-primary text-primary-foreground shadow-sm">
              {badge}
            </span>
          )}
          {/* Suspended overlay */}
          {venue.suspended && (
            <span className="absolute inset-0 flex items-center justify-center bg-background/50">
              <span className="text-sm font-bold text-foreground px-3 py-1.5 rounded-lg bg-foreground/20 backdrop-blur-sm">
                {locale === 'en' ? 'Temporarily Closed' : locale === 'zh-TW' ? '暂停预约' : '暂停营业'}
              </span>
            </span>
          )}
        </div>
        {/* Content */}
        <div className="p-4 sm:p-5">
          <h3 className="font-serif text-lg sm:text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
            {name}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3 mt-2 leading-relaxed">
            {desc}
          </p>
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              {area}
            </span>
            {features.slice(0, 3).map((f) => (
              <span key={f} className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
                {f}
              </span>
            ))}
          </div>
          <span className="inline-flex items-center gap-1 text-sm text-primary font-medium mt-3 group-hover:gap-2 transition-all">
            {locale === 'en' ? 'Learn more' : locale === 'zh-TW' ? '了解更多 →' : '了解更多 →'}
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ─── 服务流程子组件（双Tab：服务流程 + VIP 尊享）─── */
function GuideFlow({ locale }: { locale: string }) {
  const items = serviceContent[locale as keyof typeof serviceContent] || serviceContent.zh;
  const [activeTab, setActiveTab] = useState<'flow' | 'vip'>('flow');

  const tabs = [
    { key: 'flow' as const, label: locale === 'en' ? 'Service Flow' : locale === 'zh-TW' ? '服务流程' : '服务流程' },
    { key: 'vip' as const, label: locale === 'en' ? 'VIP Perks' : locale === 'zh-TW' ? 'VIP 尊享' : 'VIP 尊享' },
  ];

  return (
    <div>
      {/* Tab switcher */}
      <div className="flex rounded-lg bg-muted/50 p-1 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-md transition-all ${
              activeTab === tab.key
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 服务流程 Tab */}
      {activeTab === 'flow' && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground text-center mb-4">
            {locale === 'en'
              ? 'We handle everything — recommendation, transfers, VIP entry, VIP perks, and your return ride.'
              : locale === 'zh-TW'
                ? '我们替您打点一切——推荐、接送、VIP 入场、VIP 尊享，以及您的回程接送。'
                : '我们替您打点一切——推荐、接送、VIP 入场、VIP 尊享，以及您的回程接送。'}
          </p>
          {items.map((item, index) => (
            <div
              key={item.id}
              className="group flex items-start gap-5 p-5 sm:p-6 rounded-xl bg-background border border-border hover:border-primary/25 hover:shadow-md transition-all"
            >
              <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-base group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground text-base mb-1.5 flex items-center gap-2">
                  {item.title}
                  <span className="text-base">{item.icon}</span>
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                {item.note && (
                  <p className="mt-2.5 text-xs text-primary font-medium bg-primary/5 px-3 py-1.5 rounded-md inline-block">
                    💡 {item.note}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIP 尊享 Tab */}
      {activeTab === 'vip' && (
        <div>
          <p className="text-sm text-muted-foreground text-center mb-4">
            {locale === 'en'
              ? 'Choose 1 — prepared by our service team, free of charge.'
              : locale === 'zh-TW'
                ? '任选1项，由服务团队为你准备，全部免费。'
                : '任选1项，由服务团队为你准备，全部免费。'}
          </p>
          <Card className="border-primary/20 overflow-hidden shadow-sm">
            <CardContent className="p-0">
              <div className="bg-primary/8 px-6 py-4 border-b border-primary/10 text-center">
                <h3 className="font-serif text-lg font-bold text-foreground">
                  {locale === 'en' ? 'Choose 1 — Prepared by Our Service Team' : locale === 'zh-TW' ? '任选1项，由服务团队为你准备' : '任选1项，由服务团队为你准备'}
                </h3>
                <p className="text-xs text-primary font-semibold mt-1">
                  {locale === 'en' ? 'Book through us · No extra charge' : locale === 'zh-TW' ? '预约即享・免加价' : '预约即享・免加价'}
                </p>
              </div>
              <div className="divide-y divide-border">
                <div className="grid grid-cols-[1fr_80px_80px] sm:grid-cols-[1fr_100px_100px] px-4 sm:px-6 py-2.5 bg-muted/50">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {locale === 'en' ? 'Service' : locale === 'zh-TW' ? '服务项目' : '服务项目'}
                  </span>
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider text-center">
                    {locale === 'en' ? 'Value' : locale === 'zh-TW' ? '原价' : '原价'}
                  </span>
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider text-center">
                    VIP
                  </span>
                </div>
                {vipPerksData.map((perk, i) => (
                  <div key={i} className="grid grid-cols-[1fr_80px_80px] sm:grid-cols-[1fr_100px_100px] px-4 sm:px-6 py-3.5 items-center hover:bg-muted/30 transition-colors">
                    <div className="pr-3">
                      <p className="text-sm font-medium text-foreground">{perk.name[locale as keyof typeof perk.name] || perk.name.zh}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{perk.desc[locale as keyof typeof perk.desc] || perk.desc.zh}</p>
                    </div>
                    <span className="text-sm text-muted-foreground text-center line-through">{perk.price}</span>
                    <span className="text-sm font-bold text-primary text-center">{locale === 'en' ? 'Free' : locale === 'zh-TW' ? '免费' : '免费'}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

/* ─── 费用计算子组件 ─── */
function FeeCalculator({ venues, locale }: { venues: Venue[]; locale: string }) {
  const [selectedVenue, setSelectedVenue] = useState<string>('');
  const [inputPrice, setInputPrice] = useState<string>('');
  const [discountType, setDiscountType] = useState<'direct' | 'cashback'>('direct');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'alipay' | 'wechat'>('cash');
  const [showResult, setShowResult] = useState(false);

  const venue = venues.find(v => v.slug === selectedVenue);
  const taxRate = 0.10; // 10% service fee
  const discount = 100; // MOP discount

  // 汇率和手续费配置
  const paymentConfig = {
    cash: { rate: 0.89, fee: 0, label: { zh: '现金（葡币）', 'zh-TW': '现金（葡币）', en: 'Cash (MOP)' } },
    card: { rate: 0.91, fee: 0.015, label: { zh: '刷卡', 'zh-TW': '刷卡', en: 'Card' } },
    alipay: { rate: 0.90, fee: 0, label: { zh: '支付宝', 'zh-TW': '支付寶', en: 'Alipay' } },
    wechat: { rate: 0.90, fee: 0, label: { zh: '微信支付', 'zh-TW': '微信支付', en: 'WeChat Pay' } },
  };

  // 优惠形式配置
  const discountOptions = {
    direct: { label: { zh: '账面直减', 'zh-TW': '帳面直減', en: 'Direct Discount' } },
    cashback: { label: { zh: '次日返现', 'zh-TW': '次日返現', en: 'Next-Day Cashback' } },
  };

  function computeResult() {
    const price = parseFloat(inputPrice);
    if (!price || price <= 0) return null;

    const config = paymentConfig[paymentMethod];
    let afterDiscount: number;
    let cashback = 0;

    if (discountType === 'direct') {
      // 账面直减：直接从价格中扣除
      afterDiscount = price - discount;
    } else {
      // 次日返现：不扣减，但记录返现金额
      afterDiscount = price;
      cashback = discount;
    }

    const afterTax = afterDiscount * (1 + taxRate);
    const withFee = afterTax * (1 + config.fee);
    const finalCny = withFee * config.rate;

    return { price, afterDiscount, afterTax, withFee, finalCny, cashback };
  }

  const calcResult = computeResult();

  const handleCalculate = () => {
    if (selectedVenue && inputPrice) setShowResult(true);
  };

  const reset = () => {
    setSelectedVenue('');
    setInputPrice('');
    setDiscountType('direct');
    setPaymentMethod('cash');
    setShowResult(false);
  };

  return (
    <div className="space-y-6">
      {/* Step 1: Choose venue */}
      <div>
        <label className="text-sm font-semibold text-foreground mb-2 block">
          {locale === 'en' ? '1. Choose Venue' : locale === 'zh-TW' ? '1. 选择场馆' : '1. 选择场馆'}
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {venues.map(v => (
            <button
              key={v.slug}
              onClick={() => { setSelectedVenue(v.slug); setShowResult(false); }}
              className={`border rounded-lg px-3 py-2 text-xs transition-all ${
                selectedVenue === v.slug
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border hover:border-primary/50'
              } ${v.suspended ? 'opacity-50' : ''}`}
            >
              {locale === 'en' ? v.nameEn : v.name}
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Enter price */}
      <div>
        <label className="text-sm font-semibold text-foreground mb-2 block">
          {locale === 'en' ? '2. Menu Price (MOP)' : locale === 'zh-TW' ? '2. 价格表价格（葡币）' : '2. 价格表价格（葡币）'}
        </label>
        <input
          type="number"
          value={inputPrice}
          onChange={(e) => { setInputPrice(e.target.value); setShowResult(false); }}
          placeholder={locale === 'en' ? 'Enter menu price' : locale === 'zh-TW' ? '输入价格表价格' : '输入价格表价格'}
          className="w-full border border-border rounded-lg px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
        />
      </div>

      {/* Step 3: Discount type */}
      <div>
        <label className="text-sm font-semibold text-foreground mb-2 block">
          {locale === 'en' ? '3. Discount Type' : locale === 'zh-TW' ? '3. 优惠形式' : '3. 优惠形式'}
        </label>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(discountOptions).map(([key, opt]) => (
            <button
              key={key}
              onClick={() => { setDiscountType(key as 'direct' | 'cashback'); setShowResult(false); }}
              className={`border rounded-lg px-4 py-3 text-sm transition-all ${
                discountType === key
                  ? 'border-primary bg-primary/10 text-primary font-semibold'
                  : 'border-border hover:border-primary/50 text-muted-foreground'
              }`}
            >
              {opt.label[locale as keyof typeof opt.label] || opt.label.zh}
            </button>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {discountType === 'direct'
            ? (locale === 'en' ? 'Discount applied directly to your bill' : locale === 'zh-TW' ? '折扣直接从账单中扣除' : '折扣直接从账单中扣除')
            : (locale === 'en' ? 'Discount returned as cashback the next day' : locale === 'zh-TW' ? '折扣将在次日以现金返还' : '折扣将在次日以现金返还')}
        </p>
      </div>

      {/* Step 4: Payment method */}
      <div>
        <label className="text-sm font-semibold text-foreground mb-2 block">
          {locale === 'en' ? '4. Payment Method' : locale === 'zh-TW' ? '4. 付款方式' : '4. 付款方式'}
        </label>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(paymentConfig).map(([key, config]) => (
            <button
              key={key}
              onClick={() => { setPaymentMethod(key as 'cash' | 'card' | 'alipay' | 'wechat'); setShowResult(false); }}
              className={`border rounded-lg px-4 py-3 text-sm transition-all ${
                paymentMethod === key
                  ? 'border-primary bg-primary/10 text-primary font-semibold'
                  : 'border-border hover:border-primary/50 text-muted-foreground'
              }`}
            >
              {config.label[locale as keyof typeof config.label] || config.label.zh}
            </button>
          ))}
        </div>
        {paymentMethod === 'card' && (
          <p className="text-xs text-muted-foreground mt-2">
            {locale === 'en' ? '1.5% card processing fee applies' : locale === 'zh-TW' ? '刷卡需支付 1.5% 手续费' : '刷卡需支付 1.5% 手续费'}
          </p>
        )}
      </div>

      {/* Calculate button */}
      <div className="flex gap-3">
        <Button
          onClick={handleCalculate}
          disabled={!selectedVenue || !inputPrice}
          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 py-5 text-base font-semibold"
        >
          <Calculator className="w-4 h-4 mr-2" />
          {locale === 'en' ? 'Calculate' : locale === 'zh-TW' ? '计算费用' : '计算费用'}
        </Button>
        <Button variant="outline" onClick={reset} className="px-6">
          {locale === 'en' ? 'Reset' : locale === 'zh-TW' ? '重设' : '重置'}
        </Button>
      </div>

      {/* Result */}
      {showResult && calcResult && (
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 space-y-4">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">{locale === 'en' ? 'Menu price' : '价格表价格'}</span>
              <span>{calcResult.price.toLocaleString()} MOP</span>
            </div>
            <div className="flex justify-between text-primary">
              <span>{locale === 'en' ? 'Discount' : '折扣优惠'}</span>
              <span>{discountType === 'direct' ? `-${discount}` : '+0'} MOP</span>
            </div>
            {discountType === 'cashback' && (
              <div className="flex justify-between text-orange-600">
                <span>{locale === 'en' ? 'Next-day cashback' : '次日返现'}</span>
                <span>+{calcResult.cashback} MOP</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">{locale === 'en' ? 'After discount' : '折扣后'}</span>
              <span>{calcResult.afterDiscount.toLocaleString()} MOP</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">{locale === 'en' ? 'Service fee (10%)' : '服务费(10%)'}</span>
              <span>{calcResult.afterTax.toLocaleString()} MOP</span>
            </div>
            {paymentMethod === 'card' && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">{locale === 'en' ? 'Card fee (1.5%)' : '刷卡手续费(1.5%)'}</span>
                <span>{calcResult.withFee.toLocaleString()} MOP</span>
              </div>
            )}
          </div>
          <div className="bg-primary/10 rounded-lg p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">{locale === 'en' ? 'Final payment (CNY)' : '最终付款(人民币)'}</p>
            <p className="text-3xl font-bold text-primary">
              ¥ {Math.round(calcResult.finalCny).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── 问题解答子组件 ─── */
function FAQList({ locale }: { locale: string }) {
  const faqs = faqData[locale as keyof typeof faqData] || faqData.zh;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="rounded-xl bg-background border border-border overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left hover:bg-muted/30 transition-colors"
          >
            <span className="font-medium text-foreground text-sm sm:text-base">{faq.q}</span>
            <ChevronDown className={`h-4 w-4 text-muted-foreground flex-shrink-0 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
          </button>
          {openIndex === i && (
            <div className="px-5 pb-4 -mt-1">
              <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ─── 智能配对子组件 ─── */
function SmartMatch({ locale }: { locale: string }) {
  const allSteps = quizSteps[locale as keyof typeof quizSteps] || quizSteps.zh;
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const ranked = getRankedVenues();

  const activeVenues = ranked.filter((v) => !v.suspended);

  // Build active steps based on direction chosen
  const direction = answers['direction'];
  const steps = direction
    ? [allSteps[0], allSteps[direction === 'experience' ? 1 : 2]]
    : [allSteps[0]];

  const handleAnswer = (stepId: string, value: string, matchCategory?: string) => {
    const newAnswers = { ...answers, [stepId]: matchCategory || value };
    setAnswers(newAnswers);

    const nextDirection = stepId === 'direction' ? (matchCategory || value) : direction;
    const nextStepsCount = nextDirection ? 2 : 1;
    const nextStep = currentStep + 1;

    if (nextStep < nextStepsCount) {
      setCurrentStep(nextStep);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      const newAnswers = { ...answers };
      if (currentStep === 1) {
        delete newAnswers['direction'];
        delete newAnswers['experience'];
        delete newAnswers['nationality'];
      } else {
        delete newAnswers[steps[currentStep].id];
      }
      setAnswers(newAnswers);
      setShowResult(false);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResult(false);
  };

  // Match venues based on user's selection
  const matchedVenues = useMemo(() => {
    if (!showResult) return [];
    const matchKey = answers['experience'] || answers['nationality'] || '';
    // Simple matching logic - return first 3 active venues as recommendations
    return activeVenues.slice(0, 3);
  }, [showResult, answers, activeVenues]);

  const stepIcons = [Compass, direction === 'nationality' ? Globe : Sparkles, BedDouble];
  const StepIcon = stepIcons[currentStep] || Sparkles;

  return (
    <div className="max-w-lg mx-auto">
      {!showResult ? (
        <div>
          {/* Progress bar */}
          <div className="flex items-center gap-1 mb-8">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  i <= currentStep ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>

          {/* Current step */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
              <StepIcon className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-1">
              {steps[currentStep].question}
            </h3>
            {currentStep > 0 && (
              <button
                onClick={handleBack}
                className="text-sm text-muted-foreground hover:text-primary transition-colors mt-1"
              >
                ← {locale === 'en' ? 'Back' : locale === 'zh-TW' ? '返回' : '返回'}
              </button>
            )}
          </div>

          {/* Options */}
          <div className="grid gap-3 grid-cols-2">
            {steps[currentStep].options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleAnswer(steps[currentStep].id, opt.value, opt.match)}
                className={`px-4 py-3 sm:py-4 rounded-xl border text-sm sm:text-base font-medium transition-all hover:border-primary/40 hover:bg-primary/5 hover:text-foreground ${
                  answers[steps[currentStep].id] === (opt.match || opt.value)
                    ? 'border-primary bg-primary/10 text-foreground'
                    : 'border-border text-muted-foreground'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Results */
        <div>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
              {locale === 'en' ? 'Your Top Matches' : locale === 'zh-TW' ? '为你推荐' : '为你推荐'}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {locale === 'en'
                ? `From ${activeVenues.length} venues, curated for you`
                : locale === 'zh-TW'
                  ? `从 ${activeVenues.length} 间中精选`
                  : `从 ${activeVenues.length} 间中精选`}
            </p>
          </div>

          <div className="space-y-4">
            {matchedVenues.map((v, idx) => {
              const name = locale === 'en' ? v.nameEn : v.name;
              const tagline = locale === 'en' ? v.taglineEn : v.tagline;
              const area = locale === 'en' ? v.areaEn : v.area;

              return (
                <Link key={v.slug} href={`/venues/${v.slug}`} className="group block">
                  <div className={`flex items-start gap-4 p-4 sm:p-5 rounded-xl bg-background border border-border hover:border-primary/25 hover:shadow-md transition-all ${idx === 0 ? 'ring-1 ring-primary/20' : ''}`}>
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm ${idx === 0 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                      {idx === 0 ? '★' : `#${idx + 1}`}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-serif text-base font-semibold text-foreground group-hover:text-primary transition-colors truncate">{name}</h4>
                        {idx === 0 && (
                          <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-primary/10 text-primary">
                            {locale === 'en' ? 'best match' : locale === 'zh-TW' ? '最佳推荐' : '最佳推荐'}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1 mb-1.5">{tagline}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />{area}
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-2" />
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={handleReset}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {locale === 'en' ? 'Start Over' : locale === 'zh-TW' ? '重新配对' : '重新配对'}
            </button>
            <span className="text-muted-foreground">·</span>
            <button
              onClick={() => openContactDialog()}
              className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              {locale === 'en' ? 'Consult Now' : locale === 'zh-TW' ? '立即咨询' : '立即咨询'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}