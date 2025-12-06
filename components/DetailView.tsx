import React from 'react';
import { AppSection } from '../types';
import { ArrowLeft, Map, Bus, Tent, Backpack, Utensils, CloudSun, Shuffle } from 'lucide-react';

interface DetailViewProps {
  section: AppSection;
  onBack: () => void;
}

// Helper to get title/icon based on section
const getSectionInfo = (section: AppSection) => {
  switch (section) {
    case AppSection.ITINERARY:
      return { title: '行程规划', icon: Map, color: 'text-blue-600' };
    case AppSection.TRANSPORT:
      return { title: '交通方式', icon: Bus, color: 'text-green-600' };
    case AppSection.CAMPING:
      return { title: '露营指南', icon: Tent, color: 'text-orange-600' };
    case AppSection.GEAR:
      return { title: '装备 & 物资', icon: Backpack, color: 'text-purple-600' };
    case AppSection.FOOD:
      return { title: '吃饭补给点', icon: Utensils, color: 'text-red-600' };
    case AppSection.SAFETY:
      return { title: '天气 & 安全', icon: CloudSun, color: 'text-yellow-600' };
    case AppSection.EMERGENCY:
      return { title: '应急方案', icon: Shuffle, color: 'text-slate-600' };
    default:
      return { title: '详情', icon: Map, color: 'text-slate-600' };
  }
};

export const DetailView: React.FC<DetailViewProps> = ({ section, onBack }) => {
  const info = getSectionInfo(section);
  const Icon = info.icon;

  return (
    <div className="min-h-screen bg-white animate-in slide-in-from-right duration-300">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center gap-3">
        <button 
          onClick={onBack}
          className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-700 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center gap-2">
          <Icon size={20} className={info.color} />
          <h2 className="font-bold text-lg text-slate-800">{info.title}</h2>
        </div>
      </div>

      {/* Content Placeholder */}
      <div className="p-5">
        <div className="p-6 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 text-center py-12">
          <div className="w-16 h-16 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center text-slate-400">
            <Icon size={32} />
          </div>
          <h3 className="text-slate-900 font-medium mb-2">内容准备中</h3>
          <p className="text-slate-500 text-sm max-w-xs mx-auto">
            这里将展示关于 {info.title} 的详细信息。请在后续步骤中补充具体内容。
          </p>
        </div>

        {/* Example Skeleton Loader to simulate content feeling */}
        <div className="mt-8 space-y-4">
            <div className="h-4 bg-slate-100 rounded w-3/4"></div>
            <div className="h-4 bg-slate-100 rounded w-full"></div>
            <div className="h-4 bg-slate-100 rounded w-5/6"></div>
            <div className="h-32 bg-slate-100 rounded-xl w-full mt-4"></div>
        </div>
      </div>
    </div>
  );
};
