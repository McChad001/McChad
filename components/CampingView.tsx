import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Tent, 
  Droplets, 
  Utensils, 
  AlertTriangle, 
  MapPin, 
  ChevronDown,
  Star,
  Wind,
  Info,
  Flame,
  Moon,
  ClipboardCheck,
  CheckCircle2
} from 'lucide-react';

interface CampingViewProps {
  onBack: () => void;
}

// Reusable Accordion Card
const AccordionCard = ({ 
    title, 
    subtitle, 
    icon: Icon, 
    color, 
    bg, 
    isOpen, 
    onToggle, 
    children 
}: any) => (
    <div className={`border rounded-2xl bg-white shadow-sm overflow-hidden transition-all duration-200 ${isOpen ? 'border-slate-300 shadow-md ring-1 ring-slate-100' : 'border-slate-100'}`}>
        <button 
            onClick={onToggle}
            className="w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50/50 transition-colors"
        >
            <div className="flex items-center gap-3 text-left">
                <div className={`${bg} ${color} p-2.5 rounded-xl shrink-0`}>
                    <Icon size={20} />
                </div>
                <div>
                    <h3 className="font-bold text-slate-800 text-sm md:text-base leading-tight">{title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
                </div>
            </div>
            <div className={`transition-transform duration-300 text-slate-400 ${isOpen ? 'rotate-180' : ''}`}>
                <ChevronDown size={20} />
            </div>
        </button>

        <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
            <div className="overflow-hidden">
                <div className="p-4 pt-0 border-t border-slate-50 bg-slate-50/30">
                    <div className="mt-3 space-y-3">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export const CampingView: React.FC<CampingViewProps> = ({ onBack }) => {
  const [openSection, setOpenSection] = useState<string>('intro');

  const toggle = (id: string) => setOpenSection(prev => prev === id ? '' : id);

  return (
    <div className="min-h-screen bg-slate-50 animate-in slide-in-from-right duration-300">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-700">
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center gap-2">
          <Tent size={20} className="text-orange-600" />
          <h2 className="font-bold text-lg text-slate-800">露营指南</h2>
        </div>
      </div>

      <div className="p-4 pb-24 space-y-3">
        
        {/* SECTION 1: OVERVIEW */}
        <AccordionCard
            title="必读：露营总说明"
            subtitle="新手友好 · 合法营地 · 设施概览"
            icon={Info}
            color="text-blue-600"
            bg="bg-blue-100"
            isOpen={openSection === 'intro'}
            onToggle={() => toggle('intro')}
        >
            <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100 mb-2">
                <p className="text-sm text-slate-700 italic font-medium">
                    “麦理浩径 1–2 段的海湾是全香港最适合新手的露营地。放心，你会睡在世界级的海边，而不是荒野里。”
                </p>
            </div>
            <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex gap-2 items-start">
                    <CheckCircle2 size={14} className="text-green-500 mt-0.5 shrink-0" />
                    <span><strong className="text-slate-800">官方合法：</strong>全程均为政府指定营地，免费、先到先用。</span>
                </li>
                <li className="flex gap-2 items-start">
                    <CheckCircle2 size={14} className="text-green-500 mt-0.5 shrink-0" />
                    <span><strong className="text-slate-800">设施齐全：</strong>地面平整，有旱厕，有防风林，咸田湾更有村店补给。</span>
                </li>
                <li className="flex gap-2 items-start">
                    <CheckCircle2 size={14} className="text-green-500 mt-0.5 shrink-0" />
                    <span><strong className="text-slate-800">零门槛：</strong>无需申请，适合第一次露营或想轻装体验的用户。</span>
                </li>
            </ul>
        </AccordionCard>

        {/* SECTION 2: CAMPSITE CHOICE & COMPARISON */}
        <AccordionCard
            title="营地选择 & PK"
            subtitle="咸田湾 (推荐) vs 浪茄湾 (唯美)"
            icon={MapPin}
            color="text-orange-600"
            bg="bg-orange-100"
            isOpen={openSection === 'choice'}
            onToggle={() => toggle('choice')}
        >
            {/* Long Ke */}
            <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-slate-800 text-sm">A. 浪茄湾 (Long Ke)</h4>
                    <span className="text-[10px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded font-bold">风景最仙</span>
                </div>
                <p className="text-xs text-slate-600 mb-2">适合：喜欢安静、有摄影需求、想感受“孤湾露营感”的你。</p>
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div className="bg-green-50 text-green-700 p-1.5 rounded">✅ 天然白沙滩，晨拍绝佳</div>
                    <div className="bg-red-50 text-red-700 p-1.5 rounded">⚠️ 无补给，风大，较冷</div>
                </div>
            </div>

            {/* Ham Tin */}
            <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold text-slate-800 text-sm">B. 咸田湾 (Ham Tin)</h4>
                    <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold">最推荐</span>
                </div>
                <p className="text-xs text-slate-600 mb-2">适合：第一次露营、想轻松一点、希望有热食的人。</p>
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div className="bg-green-50 text-green-700 p-1.5 rounded">✅ 有村店(热食/水)，可租装备</div>
                    <div className="bg-green-50 text-green-700 p-1.5 rounded">✅ 营位平整，风相对小</div>
                </div>
            </div>

            {/* Comparison Table */}
            <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
                <div className="grid grid-cols-4 bg-slate-50 border-b border-slate-200 font-bold text-slate-700 p-2">
                    <div>项目</div>
                    <div className="col-span-1 text-center">浪茄</div>
                    <div className="col-span-2 text-center text-orange-600">咸田 (赢)</div>
                </div>
                {[
                    { label: '景色', a: '⭐⭐⭐⭐⭐', b: '⭐⭐⭐⭐' },
                    { label: '风力', a: '大 (12月)', b: '中等' },
                    { label: '补给', a: '❌ 无', b: '✔ 村店/热食' },
                    { label: '厕所', a: '✔ 有', b: '✔ 有' },
                    { label: '新手', a: '中等', b: '⭐⭐⭐⭐⭐' },
                ].map((row, idx) => (
                    <div key={idx} className="grid grid-cols-4 border-b border-slate-100 last:border-0 p-2 items-center">
                        <div className="text-slate-500">{row.label}</div>
                        <div className="col-span-1 text-center font-medium text-slate-700">{row.a}</div>
                        <div className="col-span-2 text-center font-bold text-slate-800 bg-orange-50/50 rounded">{row.b}</div>
                    </div>
                ))}
            </div>
        </AccordionCard>

        {/* SECTION 3: SETUP & WIND */}
        <AccordionCard
            title="搭营技巧 (12月特别版)"
            subtitle="选位 · 防风 · 保暖"
            icon={Wind}
            color="text-teal-600"
            bg="bg-teal-100"
            isOpen={openSection === 'setup'}
            onToggle={() => toggle('setup')}
        >
            <div className="space-y-4">
                <div>
                    <h4 className="font-bold text-slate-800 text-xs mb-1.5 flex items-center gap-1">
                        <MapPin size={12} /> ① 选营位原则
                    </h4>
                    <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                        <li>尽量靠 <span className="font-bold text-slate-800">树荫/山体下方</span> (挡风)。</li>
                        <li><span className="text-red-500">不要</span> 靠近潮线 (涨潮危险)。</li>
                        <li><span className="text-red-500">不要</span> 选在风口正对方向或低洼排水沟。</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-slate-800 text-xs mb-1.5 flex items-center gap-1">
                        <Wind size={12} /> ② 防风技巧 (关键)
                    </h4>
                    <div className="bg-slate-50 p-2 rounded text-xs text-slate-600 space-y-1">
                        <p>• 使用 <span className="font-bold">铝合金地钉</span> (抓地力强)。</p>
                        <p>• 地钉 <span className="font-bold">45°斜插</span>，外帐必须拉紧。</p>
                        <p>• 风绳尽量全拉，并找石头压住风绳点。</p>
                    </div>
                </div>

                <div>
                    <h4 className="font-bold text-slate-800 text-xs mb-1.5 flex items-center gap-1">
                        <Tent size={12} /> ③ 夜间保暖
                    </h4>
                    <p className="text-xs text-slate-600">
                        睡袋舒适温标建议 <span className="font-bold">0~5°C</span>。睡垫 R 值 &gt; 2。睡前吃点热食，带一件轻羽绒。
                    </p>
                </div>
            </div>
        </AccordionCard>

        {/* SECTION 4: FACILITIES & RULES */}
        <AccordionCard
            title="设施、水源与用火"
            subtitle="厕所 · 垃圾 · 安全规范"
            icon={Droplets}
            color="text-indigo-500"
            bg="bg-indigo-100"
            isOpen={openSection === 'facilities'}
            onToggle={() => toggle('facilities')}
        >
            <div className="grid grid-cols-1 gap-3">
                <div className="bg-white border border-slate-100 p-3 rounded-xl">
                    <div className="flex items-center gap-2 mb-1">
                        <AlertTriangle size={14} className="text-orange-500" />
                        <h4 className="font-bold text-slate-800 text-xs">厕所 (旱厕)</h4>
                    </div>
                    <p className="text-[10px] text-slate-500">自然公园式厕所(无冲水)，需自带纸巾/湿巾。夜间建议结伴带头灯前往。</p>
                </div>

                <div className="bg-white border border-slate-100 p-3 rounded-xl">
                    <div className="flex items-center gap-2 mb-1">
                        <Droplets size={14} className="text-blue-500" />
                        <h4 className="font-bold text-slate-800 text-xs">水源</h4>
                    </div>
                    <p className="text-[10px] text-slate-500">无自来水。Ham Tin 村店有售瓶装水。务必携带足够的饮用水。</p>
                </div>

                <div className="bg-white border border-slate-100 p-3 rounded-xl">
                    <div className="flex items-center gap-2 mb-1">
                        <Flame size={14} className="text-red-500" />
                        <h4 className="font-bold text-slate-800 text-xs">生火与烹饪</h4>
                    </div>
                    <p className="text-[10px] text-slate-500 mb-1">严禁在非指定区域生明火。气炉(封闭式)一般可用，请在低风处操作，远离帐篷。</p>
                    <p className="text-[10px] text-green-600 font-bold">新手建议：直接在村店吃热食，更安全轻松。</p>
                </div>
            </div>
        </AccordionCard>

        {/* SECTION 5: NIGHT & DEPARTURE */}
        <AccordionCard
            title="夜间生活 & 离营 Checklist"
            subtitle="观星 · 离营检查"
            icon={Moon}
            color="text-purple-600"
            bg="bg-purple-100"
            isOpen={openSection === 'night'}
            onToggle={() => toggle('night')}
        >
            <div className="mb-4">
                <h4 className="font-bold text-slate-800 text-xs mb-2">🌌 夜生活指南</h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                    <div className="bg-purple-50 p-2 rounded">🌟 12月光害低，适合看银河</div>
                    <div className="bg-purple-50 p-2 rounded">🍺 村店可买啤酒，适量就好</div>
                    <div className="bg-purple-50 p-2 rounded">🔦 出门务必带头灯</div>
                    <div className="bg-purple-50 p-2 rounded">🧣 海边温差大，注意保暖</div>
                </div>
            </div>

            <div className="border-t border-slate-100 pt-3">
                <h4 className="font-bold text-slate-800 text-xs mb-2 flex items-center gap-1">
                    <ClipboardCheck size={14} /> 离营 Checklist
                </h4>
                <div className="space-y-1.5">
                    {[
                        '确认没有遗落物品 (LNT)',
                        '帐篷 & 地钉全部收好',
                        '垃圾全部带走 (必须)',
                        '水够不够撑到壩潭坳',
                        '防晒补涂',
                        '手机电量 (≥40%)',
                        '路线确认 (咸田 → 赤径)'
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                            <div className="w-3 h-3 rounded border border-slate-300"></div>
                            <span>{item}</span>
                        </div>
                    ))}
                </div>
                <p className="text-[10px] text-slate-400 italic mt-3 text-center">
                    “离开时回头看看你睡过的地方，那是你和大自然一起度过的一个秘密夜晚。”
                </p>
            </div>
        </AccordionCard>

      </div>
    </div>
  );
};