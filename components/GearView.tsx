import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  CheckSquare, 
  Droplets, 
  Utensils, 
  Siren, 
  Backpack, 
  Trash2,
  ChevronDown,
  Shirt,
  Sparkles,
  ClipboardCheck,
  Flame,
  Coffee,
  Check
} from 'lucide-react';

interface GearViewProps {
  onBack: () => void;
}

interface GearItem {
  id: string;
  label: string;
  subLabel?: string;
  required?: boolean;
  mode?: 'A' | 'B'; // For cooking section: A = No Cook, B = Cook
}

interface GearCategory {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  description?: React.ReactNode;
  items: GearItem[];
  hasModeToggle?: boolean; // Special flag for Cooking section
}

// --- Data Definition ---

const GEAR_DATA: GearCategory[] = [
  {
    id: 'essentials',
    title: '核心装备',
    subtitle: '背包 & 睡眠系统',
    icon: Backpack,
    color: 'text-indigo-600',
    bg: 'bg-indigo-100',
    description: (
        <div className="text-xs text-slate-500 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
            <span className="font-bold text-slate-700 block mb-1">新手负重建议：6-10kg</span>
            有用的带上，能租的别背。核心装备决定了你走得累不累、睡得好不好。
        </div>
    ),
    items: [
      { id: 'core_bag', label: '登山背包 (30-45L)', subLabel: '带腰带非常重要，分担肩膀压力', required: true },
      { id: 'core_tent', label: '双层帐篷', subLabel: '防风能力要好，建议8-12根地钉' },
      { id: 'core_bag_sleep', label: '睡袋 (0-10°C)', subLabel: '海边体感冷，羽绒或化纤皆可', required: true },
      { id: 'core_mat', label: '防潮垫/充气垫', subLabel: 'R值≥2，越厚睡得越香', required: true },
    ]
  },
  {
    id: 'clothing',
    title: '衣物 (12月版)',
    subtitle: '防风 & 保暖',
    icon: Shirt,
    color: 'text-blue-600',
    bg: 'bg-blue-100',
    items: [
      { id: 'cloth_base', label: '速干内衣/徒步裤', subLabel: '切勿穿棉质，出汗会失温', required: true },
      { id: 'cloth_shell', label: '防风外套/冲锋衣', subLabel: '海风很大，挡风是关键', required: true },
      { id: 'cloth_warm', label: '抓绒/薄羽绒', subLabel: '夜间静止时穿，看星星必备', required: true },
      { id: 'cloth_socks', label: '登山袜 (1-2双)', subLabel: '厚底防磨泡' },
      { id: 'cloth_hat', label: '帽子 (针织/鸭舌)', subLabel: '白天防晒，晚上保暖' },
    ]
  },
  {
    id: 'water',
    title: '水与食物',
    subtitle: '分日计划',
    icon: Droplets,
    color: 'text-cyan-600',
    bg: 'bg-cyan-100',
    description: (
        <div className="flex flex-wrap gap-2 text-[10px] text-slate-500 mb-4">
             <span className="bg-slate-100 border border-slate-200 px-2 py-1 rounded-md font-medium text-slate-600">Day1: 2-3L</span>
             <span className="bg-slate-100 border border-slate-200 px-2 py-1 rounded-md font-medium text-slate-600">Day2: 1L</span>
             <span className="bg-cyan-50 border border-cyan-100 px-2 py-1 rounded-md font-bold text-cyan-700">Total: 3-4L</span>
        </div>
    ),
    items: [
      { id: 'w_water', label: '饮用水 (3-4L)', subLabel: '咸田可补给，但路上必须够喝', required: true },
      { id: 'w_lunch1', label: 'Day1 午餐 (路餐)', subLabel: '饭团、面包、能量棒 (不油腻)' },
      { id: 'w_bk2', label: 'Day2 早餐', subLabel: '麦片、面包、咖啡' },
      { id: 'w_snack', label: '行动粮', subLabel: '盐丸、巧克力、坚果' },
    ]
  },
  {
    id: 'cooking',
    title: '烹饪用品',
    subtitle: '自炊 vs 不自炊',
    icon: Utensils,
    color: 'text-orange-600',
    bg: 'bg-orange-100',
    hasModeToggle: true,
    items: [
        // Route A items
        { id: 'cook_a_cash', label: '足够现金 (HKD)', subLabel: '咸田村店吃饭只收现金', required: true, mode: 'A' },
        { id: 'cook_a_water', label: '额外买水的钱', subLabel: '减轻负重，到营地买水', mode: 'A' },
        // Route B items
        { id: 'cook_b_stove', label: '炉头 & 气罐', subLabel: '只能在无风处使用', required: true, mode: 'B' },
        { id: 'cook_b_pot', label: '轻量锅具 & 餐具', subLabel: '折叠筷子/叉勺', mode: 'B' },
        { id: 'cook_b_food', label: '脱水饭/面食/罐头', subLabel: '好做、好收拾', mode: 'B' },
        { id: 'cook_b_fire', label: '打火机', subLabel: '高原/防风打火机', required: true, mode: 'B' },
        { id: 'cook_b_trash', label: '垃圾袋', subLabel: '所有厨余必须带走', required: true, mode: 'B' },
    ]
  },
  {
    id: 'personal',
    title: '个人 & 卫生',
    subtitle: '防晒 · 充电',
    icon: Sparkles,
    color: 'text-pink-600',
    bg: 'bg-pink-100',
    items: [
      { id: 'p_sun', label: '防晒霜', subLabel: '紫外线强', required: true },
      { id: 'p_power', label: '移动电源 (10000mAh)', subLabel: '山上耗电快', required: true },
      { id: 'p_tissue', label: '纸巾 & 湿巾', subLabel: '旱厕无纸，擦手必备', required: true },
      { id: 'p_trash', label: '垃圾袋 (大号)', subLabel: 'LNT原则，带走所有垃圾', required: true },
      { id: 'p_clean', label: '牙刷/洗漱小样', subLabel: '保持基本清爽' },
    ]
  },
  {
    id: 'emergency',
    title: '紧急 & 安全',
    subtitle: '急救 · 导航',
    icon: Siren,
    color: 'text-red-600',
    bg: 'bg-red-100',
    items: [
      { id: 'em_headlamp', label: '头灯', subLabel: '比手机可靠，解放双手', required: true },
      { id: 'em_map', label: '离线地图 App', subLabel: '确保已下载区域地图', required: true },
      { id: 'em_aid', label: '个人急救包', subLabel: '创可贴、消炎药、止痛药', required: true },
      { id: 'em_pole', label: '登山杖', subLabel: '保护膝盖，防野狗' },
    ]
  },
];

// Reusable Accordion Component
const GearAccordion = ({ 
    category, 
    isOpen, 
    onToggle, 
    checkedItems, 
    onCheck, 
    cookingMode, 
    setCookingMode 
}: any) => {
    // Filter items based on mode if category has toggle
    const displayItems = category.hasModeToggle 
        ? category.items.filter((i: GearItem) => i.mode === cookingMode)
        : category.items;

    return (
        <div className={`
            border rounded-2xl bg-white shadow-sm overflow-hidden transition-all duration-300
            ${isOpen ? 'border-purple-200 shadow-md ring-1 ring-purple-50' : 'border-slate-100'}
        `}>
            <button 
                onClick={onToggle}
                className="w-full flex items-center justify-between p-4 bg-white hover:bg-slate-50 transition-colors"
            >
                <div className="flex items-center gap-4">
                    <div className={`${category.bg} ${category.color} p-3 rounded-xl shrink-0`}>
                        <category.icon size={22} />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-slate-800 text-base">{category.title}</h3>
                        {category.subtitle && <p className="text-xs text-slate-500 mt-1 font-medium">{category.subtitle}</p>}
                    </div>
                </div>
                <div className={`transition-transform duration-300 text-slate-400 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown size={20} />
                </div>
            </button>

            <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                    <div className="px-4 pb-5 pt-1">
                        
                        {/* Description / Toggle Area */}
                        <div>
                            {category.description}
                            
                            {/* Cooking Mode Toggle */}
                            {category.hasModeToggle && (
                                <div className="mb-5">
                                    <div className="bg-slate-100 p-1 rounded-xl flex gap-1 mb-3">
                                        <button 
                                            onClick={() => setCookingMode('A')}
                                            className={`
                                                flex-1 py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2
                                                ${cookingMode === 'A' 
                                                    ? 'bg-white text-orange-600 shadow-sm ring-1 ring-black/5' 
                                                    : 'text-slate-500 hover:text-slate-700'}
                                            `}
                                        >
                                            <Coffee size={14} /> 不自炊 (推荐)
                                        </button>
                                        <button 
                                            onClick={() => setCookingMode('B')}
                                            className={`
                                                flex-1 py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2
                                                ${cookingMode === 'B' 
                                                    ? 'bg-white text-orange-600 shadow-sm ring-1 ring-black/5' 
                                                    : 'text-slate-500 hover:text-slate-700'}
                                            `}
                                        >
                                            <Flame size={14} /> 自炊 (进阶)
                                        </button>
                                    </div>

                                    {/* Info Box for Cooking Modes */}
                                    <div className="bg-orange-50/50 rounded-lg p-3 border border-orange-100/50">
                                        {cookingMode === 'A' && (
                                            <p className="text-xs text-orange-800 leading-relaxed">
                                                ✅ <span className="font-bold">轻松模式</span>：只需带轻食零食和水，晚餐在咸田村店吃热食。最轻、最简单。
                                            </p>
                                        )}
                                        {cookingMode === 'B' && (
                                            <p className="text-xs text-orange-800 leading-relaxed">
                                                🔥 <span className="font-bold">仪式感模式</span>：适合喜欢在夜里煮点东西的你。请务必注意用火安全。
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Checklist Items */}
                        <div className="space-y-3">
                            {displayItems.map((item: GearItem) => {
                                const isChecked = checkedItems.has(item.id);
                                return (
                                    <div 
                                        key={item.id}
                                        onClick={() => onCheck(item.id)}
                                        className={`
                                            group flex items-start gap-3.5 p-3.5 rounded-xl border transition-all cursor-pointer select-none
                                            ${isChecked 
                                                ? 'bg-purple-50/40 border-purple-100' 
                                                : 'bg-white border-slate-100 hover:border-slate-200 shadow-sm'}
                                        `}
                                    >
                                        {/* Checkbox */}
                                        <div className={`
                                            mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all duration-200
                                            ${isChecked 
                                                ? 'bg-purple-600 border-purple-600 text-white scale-110' 
                                                : 'bg-white border-slate-300 text-transparent group-hover:border-purple-400'}
                                        `}>
                                            <Check size={14} strokeWidth={3} />
                                        </div>

                                        {/* Text */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2 mb-0.5">
                                                <div className={`font-medium text-sm transition-colors truncate ${isChecked ? 'text-purple-900 line-through opacity-60' : 'text-slate-900'}`}>
                                                    {item.label}
                                                </div>
                                                {item.required && !isChecked && (
                                                    <span className="shrink-0 text-[10px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded-md tracking-wide">
                                                        必带
                                                    </span>
                                                )}
                                            </div>
                                            {item.subLabel && (
                                                <div className={`text-xs leading-relaxed ${isChecked ? 'text-purple-700 opacity-50' : 'text-slate-500'}`}>
                                                    {item.subLabel}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const GearView: React.FC<GearViewProps> = ({ onBack }) => {
  // --- State ---
  const [openSection, setOpenSection] = useState<string>('essentials');
  const [cookingMode, setCookingMode] = useState<'A' | 'B'>('A');

  const [checkedItems, setCheckedItems] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('maclehose_gear_checked_v2');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('maclehose_gear_checked_v2', JSON.stringify(Array.from(checkedItems)));
  }, [checkedItems]);

  const toggleSection = (id: string) => setOpenSection(prev => prev === id ? '' : id);

  const toggleCheck = (id: string) => {
    const next = new Set(checkedItems);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setCheckedItems(next);
  };

  const clearAll = () => {
    if (confirm('确定要重置所有勾选状态吗？')) {
      setCheckedItems(new Set());
    }
  };

  // --- Calculate Progress ---
  let totalItemsCount = 0;
  GEAR_DATA.forEach(cat => {
    if (cat.hasModeToggle) {
        totalItemsCount += cat.items.filter(i => i.mode === cookingMode).length;
    } else {
        totalItemsCount += cat.items.length;
    }
  });

  let checkedCount = 0;
  GEAR_DATA.forEach(cat => {
    if (cat.hasModeToggle) {
         cat.items.filter(i => i.mode === cookingMode).forEach(i => {
             if (checkedItems.has(i.id)) checkedCount++;
         });
    } else {
         cat.items.forEach(i => {
             if (checkedItems.has(i.id)) checkedCount++;
         });
    }
  });
  
  const progress = totalItemsCount === 0 ? 0 : Math.round((checkedCount / totalItemsCount) * 100);

  return (
    <div className="min-h-screen bg-slate-50 animate-in slide-in-from-right duration-300">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-700 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center gap-2">
            <Backpack size={20} className="text-purple-600" />
            <h2 className="font-bold text-lg text-slate-800">装备清单</h2>
          </div>
        </div>
        <button 
          onClick={clearAll}
          className="text-xs text-slate-500 hover:text-red-600 flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors font-medium"
        >
          <Trash2 size={14} />
          <span>重置</span>
        </button>
      </div>

      {/* Progress Bar Area */}
      <div className="bg-white border-b border-slate-100 px-6 pt-4 pb-6">
        <div className="flex justify-between items-end mb-3">
            <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Progress</span>
                <span className="text-sm font-bold text-slate-700">准备进度</span>
            </div>
            <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-purple-600">{progress}</span>
                <span className="text-sm text-slate-400 font-medium">%</span>
            </div>
        </div>
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div 
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500 ease-out rounded-full" 
                style={{ width: `${progress}%` }}
            />
        </div>
      </div>

      <div className="p-4 pb-32 space-y-4">
        {/* Intro Quote */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex gap-3">
                <div className="bg-purple-100 p-2 rounded-full h-fit shrink-0">
                    <Sparkles size={16} className="text-purple-600" />
                </div>
                <div>
                    <h3 className="font-bold text-slate-800 text-sm mb-1">只带刚刚好的装备</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                        “装备不是越多越好，而是刚好让你安心。这份清单把必带与可选分开了，照着勾选就能轻松出发。”
                    </p>
                </div>
            </div>
        </div>

        {/* Categories Accordions */}
        <div className="space-y-4">
            {GEAR_DATA.map((category) => (
                <GearAccordion 
                    key={category.id} 
                    category={category}
                    isOpen={openSection === category.id}
                    onToggle={() => toggleSection(category.id)}
                    checkedItems={checkedItems}
                    onCheck={toggleCheck}
                    cookingMode={cookingMode}
                    setCookingMode={setCookingMode}
                />
            ))}
        </div>

        {/* Final Checklist */}
        <div className="mt-8 pt-8 border-t border-slate-200">
            <div className="flex items-center gap-2 mb-4 px-1">
                <ClipboardCheck size={20} className="text-slate-800" />
                <h3 className="font-bold text-slate-800">出发前一小时 Checklist</h3>
            </div>
            <div className="bg-slate-800 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
                {/* Decorative background circle */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-slate-700 rounded-full opacity-50" />
                
                <p className="text-xs text-slate-400 mb-5 italic relative z-10">
                    “最后确认一遍，你已经准备好去迎接那片海和山了。”
                </p>
                <div className="space-y-3 relative z-10">
                    {[
                        '水够了吗？(3-4L)',
                        '午餐准备好了吗？',
                        '防晒有没有带？',
                        '睡袋够暖吗？',
                        '头灯 & 电池？',
                        '垃圾袋？',
                        '手机离线地图？',
                        '心情准备好了没？❤️'
                    ].map((label, idx) => {
                        const [checked, setChecked] = useState(false);
                        return (
                            <div 
                                key={idx} 
                                onClick={() => setChecked(!checked)}
                                className="flex items-center gap-3 cursor-pointer group py-1"
                            >
                                <div className={`
                                    w-5 h-5 rounded border flex items-center justify-center transition-all duration-200
                                    ${checked 
                                        ? 'bg-green-500 border-green-500 text-white' 
                                        : 'border-slate-500 bg-transparent group-hover:border-slate-400'}
                                `}>
                                    {checked && <Check size={12} strokeWidth={3} />}
                                </div>
                                <span className={`text-sm transition-colors ${checked ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                                    {label}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};