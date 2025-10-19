import { Clock, Truck, CheckCircle, TrendingUp, Package, DollarSign } from 'lucide-react';
import { UserRole } from '../../types';
import { STATS_CONFIG } from '../../constants/dashboard';
import { DashboardStats, formatAmount } from '../../utils/dashboard';

interface StatsGridProps {
  activeRole: UserRole;
  stats: DashboardStats;
}

const ICON_COMPONENTS = {
  Clock,
  Truck,
  CheckCircle,
  TrendingUp,
  Package,
  DollarSign
};

export function StatsGrid({ activeRole, stats }: StatsGridProps) {
  const roleConfig = STATS_CONFIG[activeRole.toUpperCase() as keyof typeof STATS_CONFIG];
    
  if (!roleConfig) {
    console.warn('No stats config found for role:', activeRole);
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {roleConfig.map((stat, index) => (
        <div
          key={index}
          className="flex items-center space-x-2 p-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-prawnbox-accent/20 rounded-xl transition-all duration-200 cursor-pointer active:scale-95 touch-manipulation"
          style={{
            pointerEvents: 'auto',
            isolation: 'isolate',
            position: 'relative'
          }}
        >
          <div className="flex items-center space-x-2">
            {/* <ICON_COMPONENTS[stat.icon] className="w-6 h-6 text-prawnbox-accent" /> */}
            <div className="flex flex-col">
              <span className="font-bold text-lg">{stat.label}</span>
              <span className="text-sm text-gray-500">{stat.key}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={stat.color}>{formatAmount(stats[stat.key])}</span>
            {/* {stat.isAmount && (
              <span className="text-sm text-gray-500">{stats[stat.key] > 0 ? 'Earned' : 'Spent'}</span>
            )} */}
          </div>
        </div>
      ))}
    </div>
  );
}