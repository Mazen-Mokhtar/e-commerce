import React from 'react';

interface OrderStatusBadgeProps {
  status: 'pending' | 'placed' | 'shipped' | 'delivered' | 'canceled' | 'on_way';
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const statusConfig = {
  pending: {
    label: 'Pending',
    color: 'bg-amber-50 text-amber-700 border-amber-200',
    icon: '⏳',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-700',
    iconColor: 'text-amber-600'
  },
  placed: {
    label: 'Placed',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    icon: '📦',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    iconColor: 'text-blue-600'
  },
  shipped: {
    label: 'Shipped',
    color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    icon: '🚚',
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-700',
    iconColor: 'text-indigo-600'
  },
  on_way: {
    label: 'On the Way',
    color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    icon: '🚚',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-700',
    iconColor: 'text-yellow-600'
  },
  delivered: {
    label: 'Delivered',
    color: 'bg-green-50 text-green-700 border-green-200',
    icon: '✅',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    iconColor: 'text-green-600'
  },
  canceled: {
    label: 'Canceled',
    color: 'bg-red-50 text-red-700 border-red-200',
    icon: '❌',
    bgColor: 'bg-red-50',
    textColor: 'text-red-700',
    iconColor: 'text-red-600'
  }
};

const sizeClasses = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
  lg: 'px-4 py-2 text-base'
};

export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({
  status,
  showIcon = true,
  size = 'md'
}) => {
  const config = statusConfig[status];
  const sizeClass = sizeClasses[size];

  return (
    <span className={`inline-flex items-center rounded-full font-medium border transition-all duration-200 ${config.color} ${sizeClass}`}>
      {showIcon && (
        <span className="mr-2 text-sm">{config.icon}</span>
      )}
      {config.label}
    </span>
  );
};

export default OrderStatusBadge; 