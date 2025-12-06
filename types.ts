import { LucideIcon } from 'lucide-react';

export enum AppSection {
  HOME = 'HOME',
  ITINERARY = 'ITINERARY',
  TRANSPORT = 'TRANSPORT',
  CAMPING = 'CAMPING',
  GEAR = 'GEAR',
  FOOD = 'FOOD',
  SAFETY = 'SAFETY',
  EMERGENCY = 'EMERGENCY'
}

export interface MenuItem {
  id: AppSection;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  color: string; // Tailwind color class for icon background
  colSpan?: number; // For grid layout control
}
