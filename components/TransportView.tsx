import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Bus, 
  Car, 
  Train, 
  MapPin, 
  Clock, 
  AlertTriangle,
  Ship,
  Plane,
  Info,
  LogOut,
  Wallet,
  ChevronDown
} from 'lucide-react';

interface TransportViewProps {
  onBack: () => void;
}

// Reusable Accordion Component for Transport Sections
interface TransportSectionProps {
  id: string;
  number: string;
  title: string;
  color: string; // text color class
  bg: string;    // bg color class
  quote?: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const TransportSection: React.FC<TransportSectionProps> = ({
  id,
  number,
  title,
  color,
  bg,
  quote,
  isOpen,
  onToggle,
  children
}) => {
  return (
    <div className={`border rounded-2xl bg-white shadow-sm overflow-hidden transition-all duration-200 ${isOpen ? 'border-slate-300 shadow-md ring-1 ring-slate-100' : 'border-slate-100'}`}>
      <button 
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className={`${bg} ${color} w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 shadow-sm`}>
            {number}
          </span>
          <div className="text-left">
            <h3 className="font-bold text-slate-800 text-sm md:text-base">{title}</h3>
          </div>
        </div>
        <div className={`transition-transform duration-300 text-slate-400 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown size={20} />
        </div>
      </button>

      {/* Accordion Content */}
      <div 
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <div className="p-4 pt-0 border-t border-slate-50 bg-slate-50/30">
            {quote && (
                <p className="text-xs text-slate-500 my-3 italic pl-3 border-l-2 border-slate-200">
                    {quote}
                </p>
            )}
            <div className="mt-2 space-y-3">
                {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TransportView: React.FC<TransportViewProps> = ({ onBack }) => {
  // State to track which accordion is open. Defaulting to '1' (City -> Sai Kung)
  const [openSectionId, setOpenSectionId] = useState<string>('1');

  const toggleSection = (id: string) => {
    setOpenSectionId(prev => prev === id ? '' : id);
  };

  return (
    <div className="min-h-screen bg-slate-50 animate-in slide-in-from-right duration-300">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center gap-2">
            <Bus size={20} className="text-green-600" />
            <h2 className="font-bold text-lg text-slate-800">交通方式</h2>
          </div>
        </div>
      </div>

      <div className="p-4 pb-24 space-y-3">
        
        {/* Module 1: Getting to Sai Kung */}
        <TransportSection
            id="1"
            number="1"
            title="出发：市区 ➔ 西贡"
            bg="bg-green-100"
            color="text-green-700"
            quote="“所有冒险都从西贡开始。你只要到这里，海风和山已经在等你了。”"
            isOpen={openSectionId === '1'}
            onToggle={() => toggleSection('1')}
        >
            <div className="bg-white rounded-xl border border-slate-100 overflow-hidden divide-y divide-slate-50">
                {/* Option 1: Diamond Hill */}
                <div className="p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                            <Train size={18} className="text-red-600" />
                            <h4 className="font-bold text-slate-800 text-sm">旺角/尖沙咀出发 (推荐)</h4>
                        </div>
                        <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-medium">首选</span>
                    </div>
                    <div className="pl-6 space-y-1.5 text-xs text-slate-600">
                        <p>1. 地铁至 <span className="font-bold">钻石山站 (Diamond Hill)</span> C2出口</p>
                        <p>2. 转乘 <span className="font-bold bg-slate-100 px-1 rounded">92 号巴士</span> ➔ 西贡总站</p>
                        <div className="flex gap-3 text-slate-400 mt-1 pt-1 border-t border-slate-50 border-dashed">
                            <span className="flex items-center gap-1"><Clock size={10} /> 40-55min</span>
                            <span className="flex items-center gap-1"><Wallet size={10} /> ~$15-20</span>
                        </div>
                        <p className="text-[10px] text-green-600 pt-1">💡 早上人少有座，看窗外风景，开启旅行模式。</p>
                    </div>
                </div>

                {/* Option 2: Hang Hau */}
                <div className="p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                            <Train size={18} className="text-purple-600" />
                            <h4 className="font-bold text-slate-800 text-sm">中环/湾仔出发 (最快)</h4>
                        </div>
                    </div>
                    <div className="pl-6 space-y-1.5 text-xs text-slate-600">
                        <p>1. 地铁至 <span className="font-bold">坑口站 (Hang Hau)</span> B1出口</p>
                        <p>2. 转乘 <span className="font-bold bg-slate-100 px-1 rounded">101M 小巴</span> ➔ 西贡总站</p>
                        <div className="flex gap-3 text-slate-400 mt-1 pt-1 border-t border-slate-50 border-dashed">
                            <span className="flex items-center gap-1"><Clock size={10} /> 35-50min</span>
                            <span className="flex items-center gap-1"><Wallet size={10} /> ~$17</span>
                        </div>
                        <p className="text-[10px] text-slate-400 pt-1">适合“懒人高效”派，换乘简单。</p>
                    </div>
                </div>

                {/* Option 3: Taxi */}
                <div className="p-4 hover:bg-slate-50 transition-colors bg-blue-50/30">
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                            <Car size={18} className="text-blue-600" />
                            <h4 className="font-bold text-slate-800 text-sm">直接打车 (最省心)</h4>
                        </div>
                    </div>
                    <div className="pl-6 space-y-1.5 text-xs text-slate-600">
                        <p>适合行李多、想节省体力或清晨出发的队伍。</p>
                        <div className="flex gap-3 text-slate-400 mt-1 pt-1 border-t border-blue-100/50 border-dashed">
                            <span className="flex items-center gap-1"><Clock size={10} /> 视路况</span>
                            <span className="flex items-center gap-1"><Wallet size={10} /> $180-260</span>
                        </div>
                        <p className="text-[10px] text-blue-600 pt-1">💡 想给徒步开个轻松的头，这是值得的投资。</p>
                    </div>
                </div>
            </div>
        </TransportSection>

        {/* Module 2: Sai Kung to East Dam */}
        <TransportSection
            id="2"
            number="2"
            title="起点：西贡 ➔ 万宜东坝"
            bg="bg-blue-100"
            color="text-blue-700"
            quote="“东坝就是奇迹开始的地方。六角岩柱和风声都在等你。”"
            isOpen={openSectionId === '2'}
            onToggle={() => toggleSection('2')}
        >
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
              <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center gap-2">
                    <span className="bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">必看</span>
                    <h4 className="font-bold text-slate-800 text-sm">新界的士 (绿的)</h4>
                 </div>
                 <Car size={20} className="text-green-600" />
              </div>
              
              <div className="space-y-3 text-sm text-slate-600">
                <p className="text-xs">东坝平日无公共交通，打车是最稳定方案。</p>
                <ul className="bg-slate-50 rounded-lg p-3 space-y-2 text-xs">
                   <li className="flex justify-between items-center border-b border-slate-200 pb-2">
                      <span>💰 预估车费</span>
                      <span className="font-bold text-slate-800">HK$ 120 - 180</span>
                   </li>
                   <li className="flex justify-between items-center border-b border-slate-200 pb-2 pt-1">
                      <span>⏱️ 车程时间</span>
                      <span className="font-bold text-slate-800">25 - 30 分钟</span>
                   </li>
                   <li className="flex justify-between items-center pt-1">
                      <span>📍 上车地点</span>
                      <span className="font-bold text-slate-800">西贡的士站</span>
                   </li>
                </ul>
                <div className="text-xs text-orange-500 flex gap-1 mt-2 bg-orange-50 p-2 rounded">
                  <Info size={12} className="mt-0.5 shrink-0" />
                  <span>节日巴士提示：假日虽有专线，但班次不稳定。建议首选打车，避免等待。</span>
                </div>
              </div>
            </div>
        </TransportSection>

        {/* Module 3: Return Trip */}
        <TransportSection
            id="3"
            number="3"
            title="返程：壩潭坳 ➔ 市区"
            bg="bg-orange-100"
            color="text-orange-700"
            isOpen={openSectionId === '3'}
            onToggle={() => toggleSection('3')}
        >
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-orange-100 p-2 rounded-lg">
                        <Bus className="text-orange-600" size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 text-sm">94 号巴士 (每日)</h4>
                        <p className="text-xs text-slate-500">往 西贡市中心</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-600 mb-4 bg-slate-50 p-2 rounded border border-slate-100">
                    <MapPin size={14} className="text-slate-400" />
                    <span>上车点：<span className="font-bold">北潭凹站 (Pak Tam Au)</span></span>
                </div>

                <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs text-slate-600 border-b border-slate-50 pb-2">
                        <span>平日班次</span>
                        <span className="font-bold">每 20-30 分钟</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-slate-600">
                        <span className="bg-orange-100 text-orange-700 px-1 rounded text-[10px] font-bold mt-0.5 shrink-0">周末</span>
                        <p>周六日或假日可遇 <span className="font-bold text-slate-800">96R</span>，直接回钻石山地铁站！</p>
                    </div>
                </div>
          </div>
        </TransportSection>

        {/* Module 4: Airport Return */}
        <TransportSection
            id="4"
            number="4"
            title="直奔机场 (当天离港)"
            bg="bg-indigo-100"
            color="text-indigo-700"
            isOpen={openSectionId === '4'}
            onToggle={() => toggleSection('4')}
        >
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
             <div className="bg-indigo-50 p-2.5 rounded-full text-indigo-600">
                <Plane size={20} />
             </div>
             <div className="flex-1">
                <h4 className="font-bold text-slate-800 text-sm mb-1">西贡 ➔ 机场快线</h4>
                <p className="text-xs text-slate-500 mb-2">经 钻石山/坑口 转乘</p>
                <div className="flex gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><Clock size={10} /> 60-90min</span>
                </div>
             </div>
          </div>
          <div className="mt-2 flex gap-2 text-xs text-indigo-600 bg-indigo-50 p-2 rounded-lg">
             <AlertTriangle size={14} className="shrink-0" />
             建议：若要赶飞机，最好在 16:00 前抵达市区，这样你会完全不紧张。
          </div>
        </TransportSection>

        {/* Module 5: Emergency Transport */}
        <TransportSection
            id="5"
            number="5"
            title="应急交通 (撤退方案)"
            bg="bg-red-100"
            color="text-red-700"
            quote="“户外不需要逞强。累了就撤，这是成熟的走法。”"
            isOpen={openSectionId === '5'}
            onToggle={() => toggleSection('5')}
        >
          <div className="grid grid-cols-1 gap-3">
             {/* Exit 1 */}
             <div className="bg-white p-3 rounded-xl border border-red-100 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-slate-800">
                        <LogOut size={16} className="text-red-500" />
                        <span className="font-bold text-sm">西湾亭撤退</span>
                    </div>
                    <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">Day 1</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-2">
                    如果在西湾不想走了，可步行至西湾亭(约45分钟)，乘坐 <span className="font-bold">29R村巴</span> 或打车回西贡。
                </p>
                <div className="text-[10px] text-slate-400">适合：下雨、脚痛、时间过晚。</div>
             </div>
             
             {/* Exit 2 */}
             <div className="bg-white p-3 rounded-xl border border-blue-100 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-slate-800">
                        <Ship size={16} className="text-blue-500" />
                        <span className="font-bold text-sm">赤径渡轮</span>
                    </div>
                    <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">Day 2</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-2">
                    部分假日有往返黄石码头/西贡的小船。
                </p>
                <div className="text-[10px] text-orange-500 flex items-center gap-1">
                    <AlertTriangle size={10} /> 班次不固定，可遇不可求。
                </div>
             </div>
          </div>
        </TransportSection>

      </div>
    </div>
  );
};