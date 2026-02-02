// import { Clock, Truck, CheckCircle, TrendingUp, Package, DollarSign } from 'lucide-react';
// import { UserRole } from '../../types';
// import { STATS_CONFIG } from '../../constants/dashboard';
// import { DashboardStats, formatAmount } from '../../utils/dashboard';

// interface StatsGridProps {
//   activeMode: UserRole;
//   stats: DashboardStats;
// }

// const ICON_COMPONENTS = {
//   Clock,
//   Truck,
//   CheckCircle,
//   TrendingUp,
//   Package,
//   DollarSign
// };

// export function StatsGrid({ activeMode, stats }: StatsGridProps) {
//   const roleConfig = STATS_CONFIG[activeMode.toUpperCase() as keyof typeof STATS_CONFIG];

//   if (!roleConfig) {
//     console.warn('No stats config found for role:', activeMode);
//     return null;
//   }

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
//       {roleConfig.map((stat, index) => {
//         const IconComponent = ICON_COMPONENTS[stat.icon as keyof typeof ICON_COMPONENTS];
//         const statValue = stats[stat.key as keyof DashboardStats] || 0;
//         const displayValue = stat.isAmount ? formatAmount(statValue) : statValue.toString();

//         return (
//           <div
//             key={stat.key || index}
//             className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-prawnbox-accent/20 rounded-xl transition-all duration-200 cursor-pointer active:scale-95 touch-manipulation"
//             style={{
//               pointerEvents: 'auto',
//               isolation: 'isolate',
//               position: 'relative'
//             }}
//           >
//             <div className="flex items-center space-x-3">
//               <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color.replace('text-', 'bg-').replace('500', '100').replace('600', '100')}`}>
//                 {IconComponent && <IconComponent size={20} className={stat.color} />}
//               </div>
//               <div>
//                 <p className="font-semibold text-gray-900 text-sm sm:text-base">{stat.label}</p>
//                 <p className="text-xs text-gray-500">{statValue} {stat.isAmount ? 'earned' : 'items'}</p>
//               </div>
//             </div>
//             <div className="text-right">
//               <p className={`font-bold text-lg ${stat.color}`}>{displayValue}</p>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }