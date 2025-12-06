import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Footprints, 
  Flag, 
  ChevronRight,
  ChevronDown,
  Calendar,
  Map,
  Clock,
  Navigation,
  ExternalLink,
  MapPin,
  AlertTriangle,
  Utensils,
  Sun
} from 'lucide-react';

interface ItineraryViewProps {
  onBack: () => void;
}

type DayId = 'day0' | 'day1' | 'day2';

// --- Data Structures ---

interface Segment {
  id: string;
  from: string;
  to: string;
  time: string;
  distance: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  tips: string[];
  imageColor: string; // Placeholder for image
}

interface Checkpoint {
  id: string;
  name: string;
  km: number;
  supply?: boolean;
  exit?: boolean;
  nextStop: string;
  timeToNext: string;
}

interface DayConfig {
  id: DayId;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  overview: {
    distance: string;
    time: string;
    difficulty: string;
    desc: string;
  };
  segments: Segment[];
  checkpoints: Checkpoint[];
}

// --- Mock Data ---

const DAYS: DayConfig[] = [
  {
    id: 'day0',
    title: '第 0 天｜抵达香港 · 准备日',
    subtitle: '休息调整，蓄势待发',
    icon: CheckCircle2,
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
    overview: {
        distance: '-',
        time: 'Relax',
        difficulty: '⭐️',
        desc: '明天要走世界级的海岸线啦，今天的你只需要好好休息，把心情调成“出发”就够了。'
    },
    segments: [
        {
            id: 'd0-1',
            from: '抵达香港',
            to: '市区住宿',
            time: 'Check-in',
            distance: '-',
            difficulty: 'Easy',
            description: '住在：尖沙咀 / 旺角 / 中环 / 湾仔 都很方便。明天一早前往西贡路程短，不会太赶。如果是傍晚到港，建议简单吃点、早点睡，让身体保持轻松。',
            tips: ['推荐住处：尖沙咀/旺角交通最便利'],
            imageColor: 'bg-indigo-200'
        },
        {
            id: 'd0-2',
            from: '酒店',
            to: '最后检查',
            time: '30min',
            distance: '-',
            difficulty: 'Easy',
            description: '给手机、相机、充电宝全部充满电。下载离线地图（建议 AllTrails / Maps.me）。把 Day1 的路线再粗略看一遍，心里有底即可。',
            tips: ['想想明天想拍的照片，带上喜欢的穿搭'],
            imageColor: 'bg-indigo-300'
        },
        {
            id: 'd0-3',
            from: '补给计划',
            to: '西贡 (明天)',
            time: 'Plan',
            distance: '-',
            difficulty: 'Easy',
            description: '明早会在西贡镇一次性补足水、零食、燃料。所以今晚不用跑超市，保持轻松即可。',
            tips: ['今晚好好休息最重要'],
            imageColor: 'bg-indigo-400'
        },
        {
            id: 'd0-4',
            from: '心态建设',
            to: '出发',
            time: 'Ready',
            distance: '-',
            difficulty: 'Easy',
            description: '明天的海景真的会让你心情变好。不用担心自己走不走得完，我们的路线是给“普通体能也能开心走完”的版本。出发前的一点点紧张，就是旅行的味道。',
            tips: ['Keep Calm and Hike On'],
            imageColor: 'bg-indigo-500'
        }
    ],
    checkpoints: []
  },
  {
    id: 'day1',
    title: '第 1 天｜最美海岸线',
    subtitle: '东坝 ➔ 咸田 (露营夜)',
    icon: Footprints,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    overview: {
        distance: '10km (徒步部分)',
        time: '5-6h',
        difficulty: '⭐️⭐️⭐️',
        desc: '“这是整条麦理浩最美的一天。你会在山脊看到四湾全景，也会在海边听到世界上最安静的海浪。”'
    },
    checkpoints: [
        { id: 'cp1', name: '西贡市中心 (补给)', km: 0, supply: true, exit: true, nextStop: '万宜东坝', timeToNext: '30min(车)' },
        { id: 'cp2', name: '万宜水库东坝', km: 0, supply: true, exit: true, nextStop: '浪茄湾', timeToNext: '1h' },
        { id: 'cp3', name: '浪茄湾', km: 2, supply: false, exit: false, nextStop: '西湾山顶', timeToNext: '1.5h' },
        { id: 'cp4', name: '西湾', km: 6, supply: true, exit: true, nextStop: '咸田湾', timeToNext: '40min' },
        { id: 'cp5', name: '咸田湾 (营地)', km: 8, supply: true, exit: false, nextStop: 'Day 2', timeToNext: 'Overnight' },
    ],
    segments: [
        {
            id: 'd1-1',
            from: '早晨｜市区',
            to: '西贡 & 东坝',
            time: '06:30出发',
            distance: '车程',
            difficulty: 'Easy',
            description: '建议06:30-07:30出发。在西贡镇一定要补齐：饮用水(3-4L)、午餐(饭团/面包)、气罐。西贡是最后一个"城市补给点"。之后打车直达东坝(约25-30分钟)，省去枯燥的水泥路，直接从精华段开始。',
            tips: ['西贡买齐所有物资', '直接打车去东坝最省力', '东坝可看六角岩柱'],
            imageColor: 'bg-blue-200'
        },
        {
            id: 'd1-2',
            from: '中午｜东坝',
            to: '浪茄湾 (Long Ke)',
            time: '1-1.5h',
            distance: '2km',
            difficulty: 'Easy',
            description: '轻松上行到山脊，俯瞰 Long Ke 湾的那一刻真的让人瞬间安静。建议慢慢走，不要太快。抵达浪茄海滩后，可以在大片空地上休息、吃路餐午饭、补水、拍照。',
            tips: ['浪茄湾水清沙幼', '适合拍照和午餐'],
            imageColor: 'bg-cyan-200'
        },
        {
            id: 'd1-3',
            from: '下午｜浪茄',
            to: '西湾 & 咸田',
            time: '3-4h',
            distance: '6km',
            difficulty: 'Hard',
            description: '今天最累的一段。先翻越陡峭的西湾山(大浪坳方向)，上坡请慢行。下坡一路海景，美不胜收。抵达西湾后补给丰富，最后前往咸田湾营地。预计 15:00-16:00 抵达，足够时间轻松搭营。',
            tips: ['上坡注意心率，不逞强', '下坡保护膝盖', '冬季虽不渴也要喝水'],
            imageColor: 'bg-emerald-200'
        },
        {
            id: 'd1-4',
            from: '傍晚｜咸田湾',
            to: '露营夜',
            time: 'Overnight',
            distance: '-',
            difficulty: 'Easy',
            description: '咸田营地平地多，风相对小。附近有士多店可买水、饮料、啤酒甚至热食晚餐。晚上海浪声很治愈。真正的户外不是速度，是稳稳当当地照顾自己，享受每一步。',
            tips: ['建议吃村店热食减轻负重', '注意夜间保暖'],
            imageColor: 'bg-indigo-300'
        }
    ]
  },
  {
    id: 'day2',
    title: '第 2 天｜收尾日',
    subtitle: '咸田 ➔ 壩潭坳 ➔ 西贡',
    icon: Flag,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    overview: {
        distance: '6-7km (徒步)',
        time: '3-4h',
        difficulty: '⭐️⭐️',
        desc: '“第二天的路线比昨天轻松，只需要维持稳定节奏，就能顺利回到公路口。”'
    },
    checkpoints: [
        { id: 'cp2-1', name: '咸田湾 (起点)', km: 0, supply: true, exit: false, nextStop: '大浪坳', timeToNext: '45min' },
        { id: 'cp2-2', name: '赤径', km: 4, supply: false, exit: true, nextStop: '北潭凹', timeToNext: '1h' },
        { id: 'cp2-3', name: '北潭凹 (终点)', km: 7, supply: true, exit: true, nextStop: '西贡市中心', timeToNext: '30min(Bus)' },
        { id: 'cp2-4', name: '西贡市中心', km: 0, supply: true, exit: true, nextStop: '市区', timeToNext: '-' },
    ],
    segments: [
        {
            id: 'd2-1',
            from: '早晨｜咸田湾',
            to: '营地整理',
            time: '07:00起床',
            distance: '-',
            difficulty: 'Easy',
            description: '07:00 起床较合适（冬天天亮较晚）。先吃点东西：村店早餐 / 自己煮麦片。拆帐篷、分类装包、检查营地保持干净 (LNT原则)。离开时回头看一眼咸田湾，你会发现自己比想象中更强大。',
            tips: ['垃圾请带走，保持无痕山林', '出发前补足饮用水'],
            imageColor: 'bg-orange-200'
        },
        {
            id: 'd2-2',
            from: '徒步｜咸田',
            to: '赤径 & 壩潭坳',
            time: '3-4h',
            distance: '6-7km',
            difficulty: 'Medium',
            description: '小段上坡 → 下坡到赤径村 → 再上台阶到壩潭坳。强度比第一天轻。赤径海边很适合短休息。建议节奏维持“慢稳不急”，每 40–60 分钟喝一口水。',
            tips: ['赤径风景优美但无正规补给', '看到公路(壩潭坳)即完成挑战'],
            imageColor: 'bg-orange-300'
        },
        {
            id: 'd2-3',
            from: '中午｜壩潭坳',
            to: '西贡镇 (午餐)',
            time: '30min车程',
            distance: 'Bus 94',
            difficulty: 'Easy',
            description: '12:00–13:00 抵达壩潭坳后，乘坐 94 号巴士返回西贡。在西贡吃一顿热腾腾的午餐（推荐云吞面 / 烧味饭 / 海鲜小馆）。这顿饭真的会特别好吃。',
            tips: ['94号巴士班次较频密', '西贡有很多特色美食'],
            imageColor: 'bg-red-200'
        },
        {
            id: 'd2-4',
            from: '下午｜返程',
            to: '市区 / 机场',
            time: 'End',
            distance: '-',
            difficulty: 'Easy',
            description: '西贡 → 市区酒店 / 机场，或继续在市区闲逛、购物、按摩放松。两天一夜的麦径不是去征服，而是去遇见。你已经把一段世界级的徒步路线放进了人生的记忆里。',
            tips: ['好好休息，回顾照片'],
            imageColor: 'bg-indigo-300'
        }
    ]
  }
];

// --- Sub-Components ---

const LocationAssistant = ({ checkpoints }: { checkpoints: Checkpoint[] }) => {
    const [selectedLoc, setSelectedLoc] = useState<string>('');

    const currentCp = checkpoints.find(c => c.id === selectedLoc);

    if (checkpoints.length === 0) return null;

    return (
        <div className="bg-slate-800 text-white rounded-xl p-4 shadow-lg mb-6">
            <div className="flex items-center gap-2 mb-3">
                <Navigation size={18} className="text-blue-400" />
                <h3 className="font-bold text-sm">当前位置助手 (Location Helper)</h3>
            </div>
            
            <div className="flex flex-col gap-3">
                <select 
                    className="bg-slate-700 text-white text-sm rounded-lg p-2.5 w-full border border-slate-600 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    value={selectedLoc}
                    onChange={(e) => setSelectedLoc(e.target.value)}
                >
                    <option value="">👇 我现在在哪里？ (点此选择)</option>
                    {checkpoints.map(cp => (
                        <option key={cp.id} value={cp.id}>{cp.name}</option>
                    ))}
                </select>

                {currentCp && (
                    <div className="bg-slate-700/50 rounded-lg p-3 animate-in fade-in slide-in-from-top-2 duration-300 border border-slate-600">
                        <div className="grid grid-cols-2 gap-3 mb-2">
                             <div className="flex flex-col">
                                <span className="text-[10px] text-slate-400 uppercase">Next Stop</span>
                                <span className="font-bold text-blue-200">{currentCp.nextStop}</span>
                             </div>
                             <div className="flex flex-col">
                                <span className="text-[10px] text-slate-400 uppercase">Est. Time</span>
                                <span className="font-bold text-white">{currentCp.timeToNext}</span>
                             </div>
                        </div>
                        <div className="flex gap-2 text-[10px] pt-2 border-t border-slate-600">
                             {currentCp.supply ? (
                                <span className="flex items-center gap-1 text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded">
                                    <Utensils size={10} /> 有补给
                                </span>
                             ) : (
                                <span className="flex items-center gap-1 text-red-400 bg-red-400/10 px-1.5 py-0.5 rounded">
                                    <AlertTriangle size={10} /> 无补给
                                </span>
                             )}
                             {currentCp.exit && (
                                <span className="flex items-center gap-1 text-orange-400 bg-orange-400/10 px-1.5 py-0.5 rounded">
                                    <ExternalLink size={10} /> 可撤退
                                </span>
                             )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const SegmentAccordion: React.FC<{ segment: Segment }> = ({ segment }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-slate-100 rounded-2xl bg-white shadow-sm overflow-hidden transition-all duration-200">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50 transition-colors"
            >
                <div className="flex items-center gap-3 text-left">
                    <div className={`w-2 h-12 rounded-full ${segment.imageColor}`} />
                    <div>
                        <div className="flex items-center gap-2">
                            <h4 className="font-bold text-slate-800">{segment.from}</h4>
                            <ArrowLeft size={14} className="rotate-180 text-slate-400" />
                            <h4 className="font-bold text-slate-800">{segment.to}</h4>
                        </div>
                        <div className="text-xs text-slate-500 mt-1 flex gap-2">
                            <span className="flex items-center gap-0.5"><Clock size={10} /> {segment.time}</span>
                            <span className="flex items-center gap-0.5"><MapPin size={10} /> {segment.distance}</span>
                        </div>
                    </div>
                </div>
                <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown size={20} className="text-slate-400" />
                </div>
            </button>

            {/* Expandable Content */}
            <div 
                className={`
                    grid transition-[grid-template-rows] duration-300 ease-in-out
                    ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}
                `}
            >
                <div className="overflow-hidden">
                    <div className="p-4 pt-0 border-t border-slate-50 bg-slate-50/50">
                        <p className="text-sm text-slate-700 leading-relaxed py-3">
                            {segment.description}
                        </p>
                        
                        {/* Difficulty Badge */}
                        <div className="flex items-center gap-2 mb-3">
                            <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                                segment.difficulty === 'Hard' ? 'bg-red-50 text-red-600 border-red-100' : 
                                segment.difficulty === 'Medium' ? 'bg-yellow-50 text-yellow-600 border-yellow-100' : 
                                'bg-green-50 text-green-600 border-green-100'
                            }`}>
                                难度: {segment.difficulty}
                            </span>
                        </div>

                        {/* Tips */}
                        <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-3">
                            <h5 className="flex items-center gap-1.5 text-xs font-bold text-yellow-700 mb-2">
                                <Sun size={12} /> 小贴士 (Tips)
                            </h5>
                            <ul className="space-y-1">
                                {segment.tips.map((tip, idx) => (
                                    <li key={idx} className="text-xs text-slate-600 flex items-start gap-1.5">
                                        <span className="mt-1 w-1 h-1 rounded-full bg-yellow-400 shrink-0" />
                                        {tip}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Main Component ---

export const ItineraryView: React.FC<ItineraryViewProps> = ({ onBack }) => {
  const [selectedDay, setSelectedDay] = useState<DayId | null>(null);

  const activeDayConfig = DAYS.find(d => d.id === selectedDay);

  // VIEW: Specific Day Detail
  if (selectedDay && activeDayConfig) {
    return (
      <div className="min-h-screen bg-white animate-in slide-in-from-right duration-300">
        {/* Detail Header */}
        <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <button 
                    onClick={() => setSelectedDay(null)}
                    className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-700 transition-colors"
                >
                    <ArrowLeft size={24} />
                </button>
                <h2 className="font-bold text-lg text-slate-800">{activeDayConfig.title}</h2>
            </div>
            {/* Quick toggle for map (future feature) */}
            <button className="p-2 text-slate-400 hover:text-slate-600">
                <Map size={20} />
            </button>
        </div>

        <div className="p-4 pb-24">
            {/* Location Helper Widget */}
            <LocationAssistant checkpoints={activeDayConfig.checkpoints} />

            {/* Segments List (Accordion) */}
            <div className="space-y-4">
                <h3 className="font-bold text-lg text-slate-800 px-1 flex items-center gap-2">
                    <Footprints size={18} className="text-blue-500" />
                    详细行程
                </h3>
                {activeDayConfig.segments.map(seg => (
                    <SegmentAccordion key={seg.id} segment={seg} />
                ))}
            </div>

            {/* End of Day Note */}
            <div className="mt-8 mb-4 flex justify-center opacity-50">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mx-1" />
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mx-1" />
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mx-1" />
            </div>
        </div>
      </div>
    );
  }

  // VIEW: Itinerary Menu (Day List)
  return (
    <div className="min-h-screen bg-white animate-in slide-in-from-right duration-300">
        <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center gap-3">
            <button 
                onClick={onBack}
                className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-700 transition-colors"
            >
                <ArrowLeft size={24} />
            </button>
            <div className="flex items-center gap-2">
                <Map size={20} className="text-blue-600" />
                <h2 className="font-bold text-lg text-slate-800">行程规划</h2>
            </div>
        </div>

        <div className="p-5 space-y-4">
            <div className="mb-2 px-1">
                <h3 className="font-bold text-xl text-slate-800">选择阶段</h3>
                <p className="text-slate-500 text-sm">查看每一天的详细安排</p>
            </div>

            {DAYS.map((day) => (
                <button
                    key={day.id}
                    onClick={() => setSelectedDay(day.id)}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all active:scale-[0.98] bg-white text-left group relative overflow-hidden"
                >
                    <div className={`p-3 rounded-xl ${day.bg} ${day.color} relative z-10`}>
                        <day.icon size={24} />
                    </div>
                    <div className="flex-1 relative z-10">
                        <h4 className="font-bold text-slate-800 text-lg">{day.title}</h4>
                        <p className="text-xs text-slate-500 mt-1">{day.subtitle}</p>
                    </div>
                    <ChevronRight size={20} className="text-slate-300 group-hover:text-slate-500 transition-colors relative z-10" />
                    
                    {/* Subtle decorative background gradient on hover */}
                    <div className="absolute inset-0 bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
            ))}

            <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-start gap-3">
                    <Calendar size={20} className="text-slate-400 mt-0.5" />
                    <div>
                         <h5 className="font-bold text-slate-700 text-sm">徒步建议</h5>
                         <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                            麦理浩径全程 100km，普通人建议分 4-6 段或 2-3 天完成。本攻略以 "2天精华体验" 为主，覆盖最美的第1-3段。
                         </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};