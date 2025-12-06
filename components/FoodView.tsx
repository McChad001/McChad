import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Utensils, 
  ShoppingBag, 
  AlertCircle,
  MapPin,
  ChevronDown,
  Droplets,
  Sandwich,
  Info,
  Store,
  XCircle,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface FoodViewProps {
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

export const FoodView: React.FC<FoodViewProps> = ({ onBack }) => {
  const [openSection, setOpenSection] = useState<string>('overview');

  const toggle = (id: string) => setOpenSection(prev => prev === id ? '' : id);

  return (
    <div className="min-h-screen bg-slate-50 animate-in slide-in-from-right duration-300">
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center gap-3">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-700">
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center gap-2">
          <Utensils size={20} className="text-red-500" />
          <h2 className="font-bold text-lg text-slate-800">吃饭与补给</h2>
        </div>
      </div>

      <div className="p-4 pb-24 space-y-3">
        
        {/* 1. OVERVIEW */}
        <AccordionCard
            title="补给概况 (必读)"
            subtitle="吃饭看咸田，补给看西贡"
            icon={Info}
            color="text-blue-600"
            bg="bg-blue-100"
            isOpen={openSection === 'overview'}
            onToggle={() => toggle('overview')}
        >
             <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100 mb-2">
                <p className="text-xs text-slate-700 italic font-medium leading-relaxed">
                    “麦径 1–2 段是一条美到离谱的海线，但补给并不多。只要把第一天的水准备够，其他都很轻松。”
                </p>
            </div>
            <ul className="text-xs text-slate-600 space-y-2">
                <li className="flex gap-2">
                    <span className="font-bold text-slate-800 shrink-0 w-16">西贡镇</span>
                    <span>唯一可靠的完整补给点</span>
                </li>
                <li className="flex gap-2">
                    <span className="font-bold text-slate-800 shrink-0 w-16">东坝/浪茄</span>
                    <span className="text-red-500">完全无补给</span>
                </li>
                <li className="flex gap-2">
                    <span className="font-bold text-slate-800 shrink-0 w-16">西湾</span>
                    <span>有小型餐厅 (营业不稳定)</span>
                </li>
                <li className="flex gap-2">
                    <span className="font-bold text-slate-800 shrink-0 w-16">咸田</span>
                    <span className="text-green-600 font-bold">稳定村店 + 热食</span>
                </li>
            </ul>
        </AccordionCard>

        {/* 2. SAI KUNG PREP */}
        <AccordionCard
            title="出发前：西贡镇补给"
            subtitle="最重要的一个环节"
            icon={ShoppingBag}
            color="text-red-600"
            bg="bg-red-100"
            isOpen={openSection === 'saikung'}
            onToggle={() => toggle('saikung')}
        >
            <div className="text-xs text-slate-600 space-y-3">
                <p>这是你整个徒步中最容易、也最关键的一次补给。在这里补足，就能让整趟路都走得安心。</p>
                
                <div className="bg-white p-3 rounded-lg border border-slate-100">
                    <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-1">
                        <MapPin size={12} /> 推荐购买点 (步行5分钟圈)
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                        <span className="bg-slate-50 px-2 py-1 rounded">百佳超市</span>
                        <span className="bg-slate-50 px-2 py-1 rounded">惠康超市</span>
                        <span className="bg-slate-50 px-2 py-1 rounded">7-Eleven</span>
                        <span className="bg-slate-50 px-2 py-1 rounded">Circle K</span>
                    </div>
                </div>

                <div className="space-y-1">
                    <h4 className="font-bold text-slate-800 mb-1">✔ 必买清单</h4>
                    <ul className="list-disc list-inside space-y-0.5 pl-1">
                        <li>饮用水 <span className="font-bold">3–4L</span></li>
                        <li>运动饮料 / 电解质</li>
                        <li>午餐 (饭团、面包、能量棒)</li>
                        <li>零食 (坚果、巧克力)</li>
                    </ul>
                </div>
                 <p className="text-slate-400 text-[10px] pt-2 border-t border-slate-50">
                    温馨提示：走出西贡后，水会越来越珍贵。早点买好！
                </p>
            </div>
        </AccordionCard>

        {/* 3. ROUTE SUPPLY MAP */}
        <AccordionCard
            title="沿途补给一览"
            subtitle="东坝 · 浪茄 · 西湾 · 咸田"
            icon={MapPin}
            color="text-orange-600"
            bg="bg-orange-100"
            isOpen={openSection === 'route'}
            onToggle={() => toggle('route')}
        >
            <div className="space-y-3">
                {/* East Dam */}
                <div className="flex items-start gap-3 p-2 rounded-lg bg-slate-50">
                    <XCircle size={18} className="text-red-500 mt-0.5 shrink-0" />
                    <div>
                        <h4 className="font-bold text-slate-800 text-xs">① 东坝 East Dam</h4>
                        <p className="text-[10px] text-slate-500 mt-0.5">无商店、无售水、只有厕所。一定要在到达前准备好水。</p>
                    </div>
                </div>
                 {/* Long Ke */}
                <div className="flex items-start gap-3 p-2 rounded-lg bg-slate-50">
                    <XCircle size={18} className="text-red-500 mt-0.5 shrink-0" />
                    <div>
                        <h4 className="font-bold text-slate-800 text-xs">② 浪茄湾 Long Ke</h4>
                        <p className="text-[10px] text-slate-500 mt-0.5">基本无补给。若在此午餐，务必自带干粮。</p>
                    </div>
                </div>
                 {/* Sai Wan */}
                <div className="flex items-start gap-3 p-2 rounded-lg bg-yellow-50/50">
                    <AlertTriangle size={18} className="text-yellow-600 mt-0.5 shrink-0" />
                    <div>
                        <h4 className="font-bold text-slate-800 text-xs">③ 西湾 Sai Wan</h4>
                        <p className="text-[10px] text-slate-500 mt-0.5">有简易 café / 士多，但不稳定 (平日可能不开)。适合喝饮料、吃简单热食。</p>
                    </div>
                </div>
                 {/* Ham Tin */}
                <div className="flex items-start gap-3 p-2 rounded-lg bg-green-50/50 border border-green-100">
                    <CheckCircle2 size={18} className="text-green-600 mt-0.5 shrink-0" />
                    <div>
                        <h4 className="font-bold text-slate-800 text-xs">④ 咸田湾 Ham Tin (推荐)</h4>
                        <p className="text-[10px] text-slate-500 mt-0.5">最稳定！有村店、热食、冷饮、啤酒。晚餐强烈推荐在这里解决。</p>
                    </div>
                </div>
            </div>
        </AccordionCard>

        {/* 4. STORE DETAILS */}
        <AccordionCard
            title="具体餐饮与店铺"
            subtitle="安记 · 海风 · 西湾茶座"
            icon={Store}
            color="text-indigo-600"
            bg="bg-indigo-100"
            isOpen={openSection === 'stores'}
            onToggle={() => toggle('stores')}
        >
            <div className="space-y-4">
                 <div className="bg-white border border-slate-100 p-3 rounded-xl shadow-sm">
                    <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-slate-800 text-xs">Ham Tin Store (安记/海风)</h4>
                        <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold">晚餐首选</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mb-2">咸田沙滩旁 / 村屋位置</p>
                    <div className="text-xs text-slate-600 space-y-1">
                        <p>🥘 <span className="font-bold">必吃：</span>炒饭、炒面、餐蛋面、冰可乐</p>
                        <p>💰 <span className="font-bold">支付：</span>只收现金 (HKD 60-100)</p>
                        <p className="text-indigo-600 mt-1">“如果你在这里吃到一碗热腾腾的炒面，你会觉得所有的上坡都值得。”</p>
                    </div>
                 </div>

                 <div className="bg-white border border-slate-100 p-3 rounded-xl shadow-sm opacity-80">
                    <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-slate-800 text-xs">Sai Wan Café (西湾)</h4>
                        <span className="text-[10px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded font-bold">不稳定</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mb-2">西湾大草地附近</p>
                    <div className="text-xs text-slate-600 space-y-1">
                         <p>🥪 <span className="font-bold">推荐：</span>山水豆腐花、三明治</p>
                         <p>适合小憩片刻，不建议作为必需补给点。</p>
                    </div>
                 </div>
            </div>
        </AccordionCard>

        {/* 5. WATER & FOOD SUGGESTIONS */}
        <AccordionCard
            title="水量与食物建议"
            subtitle="计算你的负载"
            icon={Droplets}
            color="text-cyan-600"
            bg="bg-cyan-100"
            isOpen={openSection === 'calc'}
            onToggle={() => toggle('calc')}
        >
            <div className="space-y-4">
                <div>
                    <h4 className="font-bold text-slate-800 text-xs mb-2 flex items-center gap-1">
                        <Droplets size={12} className="text-cyan-500" /> 水量建议 (生命值)
                    </h4>
                    <ul className="text-xs text-slate-600 space-y-1">
                        <li className="flex justify-between border-b border-slate-50 pb-1">
                            <span>Day 1 必备</span>
                            <span className="font-bold">2-3L</span>
                        </li>
                        <li className="flex justify-between border-b border-slate-50 pb-1 pt-1">
                            <span>晚餐+过夜</span>
                            <span className="font-bold">预留 0.5-1L</span>
                        </li>
                        <li className="flex justify-between pt-1">
                            <span>Day 2</span>
                            <span className="font-bold">1L (咸田可补)</span>
                        </li>
                    </ul>
                </div>
                
                <div>
                    <h4 className="font-bold text-slate-800 text-xs mb-2 flex items-center gap-1">
                        <Sandwich size={12} className="text-orange-500" /> 自带食物 (轻量化)
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                        <div className="bg-orange-50 p-2 rounded text-center">能量棒 / 巧克力</div>
                        <div className="bg-orange-50 p-2 rounded text-center">坚果 / 香蕉</div>
                        <div className="bg-orange-50 p-2 rounded text-center">面包 / 饭团</div>
                        <div className="bg-orange-50 p-2 rounded text-center">速食米饭 (营地用)</div>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-2 text-center">别带太重的食物，最后你会感谢自己的。</p>
                </div>
            </div>
        </AccordionCard>

        {/* Footer Quotes */}
        <div className="mt-6 px-4 py-6 bg-slate-100 rounded-3xl text-center space-y-3">
             <p className="text-xs text-slate-500 italic">“在海边吃到热腾腾的东西，是对走了一整天的自己最好的安慰。”</p>
             <p className="text-xs text-slate-500 italic">“记得边吃边看看那片海，它比你想象的更能治愈。”</p>
        </div>

      </div>
    </div>
  );
};