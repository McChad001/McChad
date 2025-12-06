import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CloudLightning, 
  Wifi, 
  AlertTriangle,
  Sun,
  ShieldAlert,
  ChevronDown,
  Wind,
  Sunset,
  Mountain,
  Footprints,
  Phone,
  Moon,
  ShieldCheck,
  Heart,
  MapPin,
  CheckCircle2
} from 'lucide-react';

interface SafetyViewProps {
  onBack: () => void;
}

const AccordionCard = ({ title, subtitle, icon: Icon, color, bg, isOpen, onToggle, children }: any) => (
    <div className={`border rounded-2xl bg-white shadow-sm overflow-hidden transition-all duration-200 ${isOpen ? 'border-slate-300 shadow-md ring-1 ring-slate-100' : 'border-slate-100'}`}>
        <button onClick={onToggle} className="w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50/50 transition-colors">
            <div className="flex items-center gap-3 text-left">
                <div className={`${bg} ${color} p-2.5 rounded-xl shrink-0`}>
                    <Icon size={20} />
                </div>
                <div>
                    <h3 className="font-bold text-slate-800 text-sm leading-tight">{title}</h3>
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
                    <div className="mt-3 space-y-3">{children}</div>
                </div>
            </div>
        </div>
    </div>
);

export const SafetyView: React.FC<SafetyViewProps> = ({ onBack }) => {
  const [openSection, setOpenSection] = useState<string>('weather');
  const toggle = (id: string) => setOpenSection(prev => prev === id ? '' : id);

  return (
    <div className="min-h-screen bg-slate-50 animate-in slide-in-from-right duration-300">
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-700">
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center gap-2">
          <ShieldAlert size={20} className="text-yellow-600" />
          <h2 className="font-bold text-lg text-slate-800">天气 & 安全</h2>
        </div>
      </div>

      <div className="p-4 pb-24 space-y-3">
        
        {/* 1. WEATHER */}
        <AccordionCard
            title="12月天气特征"
            subtitle="稳定 · 凉爽 · 海风强"
            icon={Sun}
            color="text-orange-500"
            bg="bg-orange-100"
            isOpen={openSection === 'weather'}
            onToggle={() => toggle('weather')}
        >
            <div className="bg-orange-50/50 p-3 rounded-xl border border-orange-100 mb-2">
                <p className="text-xs text-slate-700 italic font-medium leading-relaxed">
                    “12 月是麦径最适合徒步的季节之一，但请记住——海边的风会比你想的更硬朗一些。”
                </p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs text-slate-600">
                <div className="bg-white p-3 rounded-lg border border-slate-100">
                    <div className="flex items-center gap-2 mb-2">
                        <Wind size={16} className="text-blue-500" />
                        <span className="font-bold text-slate-800">海风强劲</span>
                    </div>
                    <p>浪茄/咸田湾常有中-强风。露营需打好地钉，固定帐篷。</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-100">
                    <div className="flex items-center gap-2 mb-2">
                        <Sunset size={16} className="text-orange-500" />
                        <span className="font-bold text-slate-800">日照时间</span>
                    </div>
                    <p>天黑较早 (约17:30)。需提前规划，确保天黑前抵达营地。</p>
                </div>
            </div>
        </AccordionCard>

        {/* 2. ROUTE RISKS */}
        <AccordionCard
            title="线路风险提示"
            subtitle="地形 · 路况 · 止损点"
            icon={Mountain}
            color="text-slate-600"
            bg="bg-slate-200"
            isOpen={openSection === 'risks'}
            onToggle={() => toggle('risks')}
        >
             <div className="space-y-3 text-xs text-slate-600">
                <ul className="space-y-2">
                    <li className="flex gap-2">
                        <AlertTriangle size={14} className="text-yellow-500 shrink-0 mt-0.5" />
                        <span><strong className="text-slate-800">大浪坳上坡段：</strong>强度略高，需慢走，调整呼吸。</span>
                    </li>
                    <li className="flex gap-2">
                        <AlertTriangle size={14} className="text-yellow-500 shrink-0 mt-0.5" />
                        <span><strong className="text-slate-800">西湾/咸田下坡：</strong>台阶较多，注意保护膝盖。</span>
                    </li>
                    <li className="flex gap-2">
                        <AlertTriangle size={14} className="text-yellow-500 shrink-0 mt-0.5" />
                        <span><strong className="text-slate-800">雨后湿滑：</strong>沙石路面摩擦力变小，建议使用登山杖。</span>
                    </li>
                </ul>

                <div className="bg-red-50 p-3 rounded-lg border border-red-100 mt-2">
                    <h4 className="font-bold text-red-700 mb-2 flex items-center gap-1">
                        <ShieldAlert size={14} /> 必须停止/撤退的情况：
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-red-800/80">
                        <li>天黑仍未抵达营地 (安全第一)</li>
                        <li>体力下降明显，无法维持平衡</li>
                        <li>开始下雨但无防水装备</li>
                        <li>风大到影响站立</li>
                    </ul>
                </div>
             </div>
        </AccordionCard>

        {/* 3. WILDLIFE */}
        <AccordionCard
            title="野生动物指南"
            subtitle="猕猴 · 野牛 · 蛇类"
            icon={Footprints}
            color="text-green-600"
            bg="bg-green-100"
            isOpen={openSection === 'wildlife'}
            onToggle={() => toggle('wildlife')}
        >
             <div className="space-y-4 text-xs text-slate-600">
                 <p className="italic text-slate-500 bg-slate-50 p-2 rounded">
                    “它们是这片山海的住客。只要保持礼貌与距离，它们只是路边的旁观者。”
                 </p>
                 
                 {/* Monkeys */}
                 <div className="flex gap-3">
                    <div className="bg-slate-100 w-8 h-8 rounded-full flex items-center justify-center text-lg shrink-0">🐒</div>
                    <div>
                        <h4 className="font-bold text-slate-800 mb-1">猕猴 (主要在西贡外围)</h4>
                        <p>大多出现在巴士总站附近。山线极少。</p>
                        <p className="text-orange-600 mt-1 font-medium">切勿手提塑料袋/食物。不凝视、不挑衅。</p>
                    </div>
                 </div>

                 {/* Cows */}
                 <div className="flex gap-3">
                    <div className="bg-slate-100 w-8 h-8 rounded-full flex items-center justify-center text-lg shrink-0">🐃</div>
                    <div>
                        <h4 className="font-bold text-slate-800 mb-1">野牛 (咸田/赤径)</h4>
                        <p>海湾的“温柔居民”。重得像岩石，性格像空气。</p>
                        <p className="text-orange-600 mt-1 font-medium">保持3-5米距离。不摸、不喂。挡路时慢慢绕开。</p>
                    </div>
                 </div>

                 {/* Snakes */}
                 <div className="flex gap-3">
                    <div className="bg-slate-100 w-8 h-8 rounded-full flex items-center justify-center text-lg shrink-0">🐍</div>
                    <div>
                        <h4 className="font-bold text-slate-800 mb-1">蛇类 (冬季罕见)</h4>
                        <p>12月气温低，极少出没。</p>
                        <p className="text-orange-600 mt-1 font-medium">不翻石头，不钻草丛深处。如遇蛇，停下等它离开。</p>
                    </div>
                 </div>
                 
                 {/* Dogs */}
                 <div className="flex gap-3">
                    <div className="bg-slate-100 w-8 h-8 rounded-full flex items-center justify-center text-lg shrink-0">🐶</div>
                    <div>
                        <h4 className="font-bold text-slate-800 mb-1">流浪犬</h4>
                        <p>大多温和。保持镇定，不靠近幼犬，不做挑衅动作。</p>
                    </div>
                 </div>
             </div>
        </AccordionCard>

        {/* 4. EMERGENCY EXITS */}
        <AccordionCard
            title="紧急撤退点"
            subtitle="知道退路，走得更自在"
            icon={MapPin}
            color="text-red-600"
            bg="bg-red-100"
            isOpen={openSection === 'exit'}
            onToggle={() => toggle('exit')}
        >
            <div className="space-y-3 text-xs text-slate-600">
                <div className="bg-white border border-slate-100 p-3 rounded-xl">
                    <h4 className="font-bold text-slate-800 mb-1">🚩 西湾亭 Sai Wan Pavilion</h4>
                    <p className="mb-1">距离西湾不远，步行约45分钟水泥路。</p>
                    <div className="flex gap-2">
                        <span className="bg-slate-100 px-1.5 py-0.5 rounded">29R 村巴</span>
                        <span className="bg-slate-100 px-1.5 py-0.5 rounded">的士回西贡</span>
                    </div>
                    <p className="text-slate-400 mt-1 text-[10px]">适用：Day1 体力不支、天气突变。</p>
                </div>

                <div className="bg-white border border-slate-100 p-3 rounded-xl">
                    <h4 className="font-bold text-slate-800 mb-1">🚩 壩潭坳 Pak Tam Au</h4>
                    <p className="mb-1">Day 2 的正式终点。</p>
                    <div className="flex gap-2">
                        <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold">94 巴士</span>
                        <span className="bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded font-bold">96R (假日)</span>
                    </div>
                </div>

                <div className="bg-white border border-slate-100 p-3 rounded-xl opacity-75">
                    <h4 className="font-bold text-slate-800 mb-1">🚩 赤径码头 (备用)</h4>
                    <p>季节性有小船到西贡，班次不固定。仅作备选，不可依赖。</p>
                </div>
            </div>
        </AccordionCard>

        {/* 5. SIGNAL & SOS */}
        <AccordionCard
            title="信号与求救"
            subtitle="999 · 离线地图"
            icon={Phone}
            color="text-blue-600"
            bg="bg-blue-100"
            isOpen={openSection === 'signal'}
            onToggle={() => toggle('signal')}
        >
             <div className="space-y-3 text-xs text-slate-600">
                 <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                    <span className="font-bold text-slate-800">手机信号</span>
                    <span className="text-slate-500">山脊/海湾良好，部分山谷弱</span>
                 </div>
                 <div className="flex justify-between items-center border-b border-slate-50 pb-2">
                    <span className="font-bold text-slate-800">香港紧急电话</span>
                    <a href="tel:999" className="font-bold text-red-600 bg-red-50 px-2 py-1 rounded">999</a>
                 </div>
                 <div>
                    <span className="font-bold text-slate-800 block mb-1">离线地图 (强烈建议)</span>
                    <p className="mb-2">真正的安全是：不依赖信号也能找到路。</p>
                    <div className="flex gap-2">
                        <span className="bg-slate-100 px-2 py-1 rounded">AllTrails</span>
                        <span className="bg-slate-100 px-2 py-1 rounded">Maps.me</span>
                        <span className="bg-slate-100 px-2 py-1 rounded">两步路</span>
                    </div>
                 </div>
             </div>
        </AccordionCard>

        {/* 6. NIGHT HIKING */}
        <AccordionCard
            title="黑夜行走提示"
            subtitle="尽量避免夜徒"
            icon={Moon}
            color="text-purple-600"
            bg="bg-purple-100"
            isOpen={openSection === 'night'}
            onToggle={() => toggle('night')}
        >
             <div className="text-xs text-slate-600 space-y-3">
                 <p className="font-medium text-slate-800">“天黑后的山路不是冒险，是风险。”</p>
                 <ul className="list-disc list-inside space-y-1">
                    <li>台阶多，易绊倒</li>
                    <li>方向容易走错</li>
                    <li>体感疲劳加倍，风寒效应更强</li>
                 </ul>
                 <div className="bg-purple-50 p-3 rounded-lg border border-purple-100 mt-2">
                    <h4 className="font-bold text-purple-800 mb-1">⚠️ 如果不得已夜走：</h4>
                    <p>1. 必须使用 <span className="font-bold">头灯</span> (手机灯不够用)</p>
                    <p>2. 必须 <span className="font-bold">两人以上</span> 同行</p>
                    <p>3. 彻底放慢速度，优先确认导航</p>
                 </div>
             </div>
        </AccordionCard>

        {/* 7. SAFETY GEAR CHECKLIST */}
        <AccordionCard
            title="必备安全装备"
            subtitle="Checklist"
            icon={ShieldCheck}
            color="text-teal-600"
            bg="bg-teal-100"
            isOpen={openSection === 'gear'}
            onToggle={() => toggle('gear')}
        >
            <div className="space-y-2">
                {[
                    '头灯 + 备用电池',
                    '登山杖 (防滑/防兽)',
                    '急救包 (创可贴/绷带/消毒)',
                    '防风外套 (防失温)',
                    '手机离线地图',
                    '移动电源',
                    '垃圾袋 (环境安全)',
                    '哨子 (求救用)'
                ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-slate-50 border border-slate-100">
                        <CheckCircle2 size={16} className="text-teal-500 shrink-0" />
                        <span className="text-xs text-slate-700 font-medium">{item}</span>
                    </div>
                ))}
            </div>
        </AccordionCard>

        {/* 8. MINDSET - Footer Style */}
        <div className="mt-6 px-4 py-6 bg-yellow-50/50 rounded-3xl text-center space-y-4 border border-yellow-100">
             <div className="flex justify-center text-yellow-500 mb-1">
                <Heart size={24} fill="currentColor" className="opacity-80" />
             </div>
             <p className="text-xs text-slate-600 leading-relaxed font-medium">
                “安全不是规则，是让你可以更自由地享受旅程的保护罩。”
             </p>
             <div className="text-[10px] text-slate-500 space-y-1">
                <p>🌿 在山里，一切节奏都可以慢一点。</p>
                <p>🌬️ 风大时停下来整理一下，是照顾自己。</p>
                <p>🐾 动物不是来吓你的，打个无声的招呼就好。</p>
             </div>
        </div>

      </div>
    </div>
  );
};