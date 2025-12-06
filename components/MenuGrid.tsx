import React from 'react';
import { 
  Map, 
  Bus, 
  Tent, 
  Backpack, 
  Utensils, 
  CloudSun, 
  Shuffle, 
  ChevronRight 
} from 'lucide-react';
import { AppSection, MenuItem } from '../types';

interface MenuGridProps {
  onNavigate: (section: AppSection) => void;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: AppSection.ITINERARY,
    title: '行程规划',
    subtitle: '2天精华路线',
    icon: Map,
    color: 'bg-blue-100 text-blue-600',
  },
  {
    id: AppSection.TRANSPORT,
    title: '交通方式',
    subtitle: '起点/终点接驳',
    icon: Bus,
    color: 'bg-green-100 text-green-600',
  },
  {
    id: AppSection.CAMPING,
    title: '露营指南',
    subtitle: '营地位置与设施',
    icon: Tent,
    color: 'bg-orange-100 text-orange-600',
  },
  {
    id: AppSection.GEAR,
    title: '装备物资',
    subtitle: '必备清单检查',
    icon: Backpack,
    color: 'bg-purple-100 text-purple-600',
  },
  {
    id: AppSection.FOOD,
    title: '吃饭补给',
    subtitle: '沿途士多/餐厅',
    icon: Utensils,
    color: 'bg-red-100 text-red-600',
  },
  {
    id: AppSection.SAFETY,
    title: '天气安全',
    subtitle: '预警与注意事项',
    icon: CloudSun,
    color: 'bg-yellow-100 text-yellow-700',
  },
  {
    id: AppSection.EMERGENCY,
    title: '应急与替代路线 (懒人模式)',
    subtitle: '撤退路线、紧急电话、难度降级方案',
    icon: Shuffle,
    color: 'bg-slate-200 text-slate-700',
    colSpan: 2
  },
];

export const MenuGrid: React.FC<MenuGridProps> = ({ onNavigate }) => {
  return (
    <div className="p-4 pb-24">
      <div className="mb-6 mt-2">
        <h1 className="text-2xl font-bold text-slate-800">Hello, 张欣悦 👋</h1>
        <p className="text-slate-500">准备好征服麦理浩径了吗？</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {MENU_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`
              relative flex flex-col items-start p-4 rounded-2xl 
              bg-white shadow-sm border border-slate-100
              hover:shadow-md hover:scale-[1.02] active:scale-95
              transition-all duration-200 text-left
              ${item.colSpan === 2 ? 'col-span-2 flex-row items-center gap-4' : ''}
            `}
          >
            {/* Icon Box */}
            <div className={`p-3 rounded-xl ${item.color} mb-3 ${item.colSpan === 2 ? 'mb-0 shrink-0' : ''}`}>
              <item.icon size={24} />
            </div>

            {/* Text Content */}
            <div className="flex-1">
              <h3 className="font-bold text-slate-800 leading-tight mb-1">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {item.subtitle}
              </p>
            </div>

            {/* Arrow for full width item */}
            {item.colSpan === 2 && (
              <div className="text-slate-300">
                <ChevronRight size={20} />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};