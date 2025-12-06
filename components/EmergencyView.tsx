import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Shuffle, 
  Phone, 
  LogOut, 
  ChevronDown,
  Activity,
  BatteryWarning,
  CloudLightning,
  Moon,
  Coffee,
  Home,
  MapPin,
  Siren,
  Footprints,
  Compass,
  Heart
} from 'lucide-react';

interface EmergencyViewProps {
  onBack: () => void;
}

// Reusable Accordion Card with ID for scrolling
const AccordionCard = ({ title, subtitle, icon: Icon, color, bg, isOpen, onToggle, children, id }: any) => {
    return (
        <div id={id} className={`border rounded-2xl bg-white shadow-sm overflow-hidden transition-all duration-200 ${isOpen ? 'border-slate-300 shadow-md ring-1 ring-slate-100' : 'border-slate-100'}`}>
            <button 
                onClick={onToggle}
                className="w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50/50 transition-colors"
            >
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
                        <div className="mt-3 space-y-3">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const EmergencyView: React.FC<EmergencyViewProps> = ({ onBack }) => {
  const [openSection, setOpenSection] = useState<string>('');

  const toggle = (id: string) => setOpenSection(prev => prev === id ? '' : id);

  const handleQuickStatus = (targetId: string) => {
    setOpenSection(targetId);
    // Simple timeout to allow state update before scrolling
    setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 100);
  };

  const STATUS_OPTIONS = [
    { id: 's_tired', label: '我走不动了', icon: BatteryWarning, color: 'text-red-500', bg: 'bg-red-50', target: 'emergency' },
    { id: 's_dark', label: '天色变暗', icon: Moon, color: 'text-purple-500', bg: 'bg-purple-50', target: 'emergency' },
    { id: 's_rain', label: '下雨/危险', icon: CloudLightning, color: 'text-blue-500', bg: 'bg-blue-50', target: 'emergency' },
    { id: 's_lost', label: '走错路了', icon: Compass, color: 'text-orange-500', bg: 'bg-orange-50', target: 'emergency' },
    { id: 's_lazy', label: '想轻松点', icon: Coffee, color: 'text-green-500', bg: 'bg-green-50', target: 'lazy' },
    { id: 's_home', label: '我想早点回去', icon: Home, color: 'text-slate-500', bg: 'bg-slate-100', target: 'exits' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-700">
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center gap-2">
          <Shuffle size={20} className="text-slate-600" />
          <h2 className="font-bold text-lg text-slate-800">应急 & 懒人模式</h2>
        </div>
      </div>

      <div className="p-4 pb-24 space-y-4">

        {/* 1. Quick Status Selector */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 text-sm mb-3 flex items-center gap-2">
                <Activity size={16} className="text-slate-400" />
                快速判断：你现在的情况？
            </h3>
            <div className="grid grid-cols-3 gap-2">
                {STATUS_OPTIONS.map((opt) => (
                    <button 
                        key={opt.id}
                        onClick={() => handleQuickStatus(opt.target)}
                        className={`flex flex-col items-center justify-center p-2 rounded-xl border border-slate-50 hover:bg-slate-50 transition-colors ${opt.bg}`}
                    >
                        <opt.icon size={20} className={`mb-1 ${opt.color}`} />
                        <span className="text-[10px] font-medium text-slate-700 text-center leading-tight">{opt.label}</span>
                    </button>
                ))}
            </div>
        </div>
        
        {/* 2. LAZY MODE */}
        <AccordionCard
            id="lazy"
            title="懒人模式：轻松版麦径"
            subtitle="不赶路 · 挑最美的走"
            icon={Coffee}
            color="text-green-600"
            bg="bg-green-100"
            isOpen={openSection === 'lazy'}
            onToggle={() => toggle('lazy')}
        >
             <p className="text-xs text-slate-600 italic mb-3 bg-green-50 p-2 rounded">
                 “不赶路、不拼速度，只挑最好看的那一段。”
             </p>
             <div className="space-y-3">
                 {/* Mode A */}
                 <div className="bg-white border border-slate-100 p-3 rounded-xl">
                     <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-slate-800 text-sm">⭐ 模式 A：最美景点体验</h4>
                        <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">不露营</span>
                     </div>
                     <p className="text-[10px] text-slate-500 mb-2">东坝 → 浪茄 → 西湾 → 西湾亭撤退 → 回市区</p>
                     <ul className="text-xs text-slate-600 space-y-0.5">
                         <li>✅ 风景全看，不背帐篷</li>
                         <li>✅ 西贡美食当奖励</li>
                     </ul>
                 </div>

                 {/* Mode B */}
                 <div className="bg-white border border-slate-100 p-3 rounded-xl">
                     <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-slate-800 text-sm">⭐ 模式 B：轻松露营版</h4>
                        <span className="text-[10px] bg-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded">只露营</span>
                     </div>
                     <p className="text-[10px] text-slate-500 mb-2">东坝 → 浪茄 → 咸田(宿) → Day2 往西湾亭撤</p>
                     <ul className="text-xs text-slate-600 space-y-0.5">
                         <li>✅ 体验海花沙滩露营</li>
                         <li>✅ 第二天不用走长坡 (大浪坳反向走较累，但比全段短)</li>
                     </ul>
                 </div>

                 {/* Mode C */}
                 <div className="bg-white border border-slate-100 p-3 rounded-xl">
                     <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-slate-800 text-sm">⭐ 模式 C：海湾轻走版</h4>
                        <span className="text-[10px] bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded">拍照最强</span>
                     </div>
                     <p className="text-[10px] text-slate-500 mb-2">东坝 ⇄ 浪茄 (原路折返)</p>
                     <ul className="text-xs text-slate-600 space-y-0.5">
                         <li>✅ 只看最美仙境海湾</li>
                         <li>✅ 适合情侣/家庭，完全不累</li>
                     </ul>
                 </div>
             </div>
        </AccordionCard>

        {/* 3. EMERGENCY SITUATIONS */}
        <AccordionCard
            id="emergency"
            title="常见应急情况处理"
            subtitle="遇到问题看这里"
            icon={Siren}
            color="text-red-600"
            bg="bg-red-100"
            isOpen={openSection === 'emergency'}
            onToggle={() => toggle('emergency')}
        >
             <div className="space-y-4 text-xs text-slate-600">
                 
                 {/* 1. Tired */}
                 <div>
                     <h4 className="font-bold text-slate-800 mb-1 flex items-center gap-1">
                         <BatteryWarning size={14} className="text-red-500" /> 1. 走不动/头晕/膝盖痛
                     </h4>
                     <ul className="list-disc list-inside bg-red-50 p-2 rounded text-slate-700">
                         <li>停下 → 补水 → 吃含盐食物</li>
                         <li>休息 5-10 分钟评估</li>
                         <li>判断是否去最近撤退点 (浪茄回东坝 / 西湾去西湾亭)</li>
                     </ul>
                 </div>

                 {/* 2. Weather */}
                 <div>
                     <h4 className="font-bold text-slate-800 mb-1 flex items-center gap-1">
                         <CloudLightning size={14} className="text-blue-500" /> 2. 突发下雨/大风
                     </h4>
                     <p>若风大站不稳或路滑：<span className="font-bold text-red-600">立即前往最近撤退点</span>。不要坚持。</p>
                 </div>

                 {/* 3. Dark */}
                 <div>
                     <h4 className="font-bold text-slate-800 mb-1 flex items-center gap-1">
                         <Moon size={14} className="text-purple-500" /> 3. 天黑未到营地
                     </h4>
                     <ul className="list-disc list-inside bg-purple-50 p-2 rounded text-slate-700">
                         <li>直接停止前进，打开头灯</li>
                         <li>设定目标：最近撤退点</li>
                         <li>不要加速赶路 (易受伤)</li>
                     </ul>
                 </div>

                 {/* 4. Lost */}
                 <div>
                     <h4 className="font-bold text-slate-800 mb-1 flex items-center gap-1">
                         <Compass size={14} className="text-orange-500" /> 4. 走错路/迷路
                     </h4>
                     <p>不要深入。原路返回到上一个路牌。麦径标识为<span className="font-bold bg-yellow-200 px-1 rounded mx-1">黄底黑字</span>。</p>
                 </div>

                 {/* 5. Animals */}
                 <div>
                     <h4 className="font-bold text-slate-800 mb-1 flex items-center gap-1">
                         <Footprints size={14} className="text-green-500" /> 5. 遇到野生动物
                     </h4>
                     <p>保持距离，不靠近、不驱赶。动物不是危险，是山海的一部分。</p>
                 </div>
             </div>
        </AccordionCard>

        {/* 4. EXIT POINTS */}
        <AccordionCard
            id="exits"
            title="三大撤退点 (地图)"
            subtitle="最快回到城市的路"
            icon={LogOut}
            color="text-slate-700"
            bg="bg-slate-200"
            isOpen={openSection === 'exits'}
            onToggle={() => toggle('exits')}
        >
             <div className="space-y-3">
                 {/* Sai Wan Pavilion */}
                 <div className="bg-white border border-slate-100 p-3 rounded-xl shadow-sm">
                     <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-slate-800 text-sm">🟥 1. 西湾亭 (常用中途撤退)</h4>
                     </div>
                     <p className="text-[10px] text-slate-500 mb-2">位置：西湾附近 (步行 15-25 分钟)</p>
                     <div className="flex gap-2 text-xs">
                         <span className="bg-slate-100 px-1.5 py-0.5 rounded">29R 村巴</span>
                         <span className="bg-slate-100 px-1.5 py-0.5 rounded">的士</span>
                     </div>
                     <p className="text-[10px] text-slate-400 mt-2">适用：体能下降 / 天黑前要下山</p>
                 </div>

                 {/* Pak Tam Au */}
                 <div className="bg-white border border-slate-100 p-3 rounded-xl shadow-sm">
                     <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-slate-800 text-sm">🟥 2. 壩潭坳 (Day2 终点)</h4>
                     </div>
                     <p className="text-[10px] text-slate-500 mb-2">位置：麦径第2段终点</p>
                     <div className="flex gap-2 text-xs">
                         <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold">94 巴士</span>
                         <span className="bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded font-bold">96R (假日)</span>
                     </div>
                     <p className="text-[10px] text-slate-400 mt-2">最推荐的安全撤退点</p>
                 </div>

                 {/* Chek Keng */}
                 <div className="bg-white border border-slate-100 p-3 rounded-xl opacity-70">
                     <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-slate-800 text-sm">🟥 3. 赤径码头 (备用)</h4>
                     </div>
                     <p className="text-[10px] text-slate-500 mb-1">偶尔有船回西贡，不可依赖。</p>
                 </div>
             </div>
        </AccordionCard>

        {/* 5. CONTACTS & LOCATION */}
        <AccordionCard
            id="contacts"
            title="紧急联系 & 定位"
            subtitle="999 · 坐标"
            icon={Phone}
            color="text-blue-600"
            bg="bg-blue-100"
            isOpen={openSection === 'contacts'}
            onToggle={() => toggle('contacts')}
        >
             <div className="space-y-4">
                 <div className="flex items-center justify-between bg-red-50 p-4 rounded-xl border border-red-100">
                     <div>
                         <h4 className="font-bold text-slate-800 text-lg">999</h4>
                         <p className="text-xs text-slate-500">香港紧急求救电话</p>
                     </div>
                     <a href="tel:999" className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm">
                         拨打
                     </a>
                 </div>

                 <div className="bg-white border border-slate-100 p-3 rounded-xl">
                     <h4 className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-1">
                         <MapPin size={14} /> 如何报告位置？
                     </h4>
                     <ol className="list-decimal list-inside text-xs text-slate-600 space-y-1">
                         <li>打开手机地图获取坐标</li>
                         <li>读出路径：<span className="font-bold">MacLehose Trail Section 2</span></li>
                         <li>读出最近标距柱：<span className="font-bold">M0XX</span> (每500米一个)</li>
                     </ol>
                 </div>
             </div>
        </AccordionCard>

        {/* 6. MINDSET FOOTER */}
        <div className="mt-6 px-4 py-8 bg-yellow-50/50 rounded-3xl text-center space-y-4 border border-yellow-100">
             <div className="flex justify-center text-yellow-400 mb-1">
                <Heart size={28} fill="currentColor" className="opacity-80" />
             </div>
             <p className="text-sm font-bold text-slate-700">“徒步不是比赛”</p>
             <div className="text-xs text-slate-500 space-y-2 leading-relaxed">
                <p>🌤️ 在天气面前人人平等：该撤退就撤退，这是聪明。</p>
                <p>🚶‍♂️ 每一个选择轻松路线的人，都更懂得照顾自己。</p>
                <p>🌙 走不动了就休息一下，你已经比昨天更勇敢。</p>
             </div>
             <p className="text-[10px] text-slate-400 pt-2">
                无论你走到哪，山和海都在陪着你，而我也在这里陪着你。💛
             </p>
        </div>

      </div>
    </div>
  );
};
