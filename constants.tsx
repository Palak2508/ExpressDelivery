
import React from 'react';
import { Package, Truck, Calendar, Globe, Zap } from 'lucide-react';

export const SERVICES = [
  {
    id: 'on-demand',
    title: 'On-Demand Express',
    icon: <Zap className="w-8 h-8 text-blue-500" />,
    description: 'Instant pickup and delivery.'
  },
  {
    id: 'scheduled',
    title: 'Scheduled Deliveries',
    icon: <Calendar className="w-8 h-8 text-blue-500" />,
    description: 'Book ahead for later.'
  },
  {
    id: 'bulk',
    title: 'Bulk Shipping',
    icon: <Truck className="w-8 h-8 text-blue-500" />,
    description: 'For business large orders.'
  },
  {
    id: 'intl',
    title: 'International Freight',
    icon: <Globe className="w-8 h-8 text-blue-500" />,
    description: 'Global reach.'
  }
];

export const PACKAGE_TYPES = [
  { name: 'Small', maxWeight: 2, icon: <Package className="w-4 h-4" /> },
  { name: 'Medium', maxWeight: 10, icon: <Package className="w-5 h-5" /> },
  { name: 'Large', maxWeight: 25, icon: <Package className="w-6 h-6" /> }
] as const;
