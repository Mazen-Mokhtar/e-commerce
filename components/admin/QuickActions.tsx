'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Plus, 
  Package, 
  Tag, 
  Ticket, 
  Users,
  BarChart3,
  Settings,
  Download
} from 'lucide-react';
import Link from 'next/link';

export function QuickActions() {
  const { t, isRTL } = useLanguage();

  const actions = [
    {
      title: t('addProduct'),
      description: t('create') + ' ' + t('product'),
      icon: Package,
      href: '/admin/products',
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      title: t('addCategory'),
      description: t('create') + ' ' + t('category'),
      icon: Tag,
      href: '/admin/categories',
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      title: t('addCoupon'),
      description: t('createAndManage'),
      icon: Ticket,
      href: '/admin/coupons',
      color: 'bg-orange-500 hover:bg-orange-600',
    },
    {
      title: t('viewOrders'),
      description: t('manageCustomerOrders'),
      icon: Users,
      href: '/admin/orders',
      color: 'bg-purple-500 hover:bg-purple-600',
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">{t('quickActions')}</h3>
      
      <div className="space-y-3">
        {actions.map((action, index) => (
          <Link key={index} href={action.href}>
            <div className={`flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer group ${isRTL ? 'flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center ${isRTL ? 'ml-3' : 'mr-3'} group-hover:scale-110 transition-transform`}>
                <action.icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {action.title}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {action.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">{t('reports')}</h4>
        <div className="space-y-2">
          <Button variant="outline" className={`w-full justify-start ${isRTL ? 'flex-row-reverse' : ''}`} size="sm">
            <BarChart3 className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {t('salesReport')}
          </Button>
          <Button variant="outline" className={`w-full justify-start ${isRTL ? 'flex-row-reverse' : ''}`} size="sm">
            <Download className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {t('exportData')}
          </Button>
          <Button variant="outline" className={`w-full justify-start ${isRTL ? 'flex-row-reverse' : ''}`} size="sm">
            <Settings className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
            {t('settings')}
          </Button>
        </div>
      </div>
    </div>
  );
}