'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
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
  const actions = [
    {
      title: 'Add Product',
      description: 'Create a new product',
      icon: Package,
      href: '/admin/products',
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      title: 'Add Category',
      description: 'Create a new category',
      icon: Tag,
      href: '/admin/categories',
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      title: 'Create Coupon',
      description: 'Add discount coupon',
      icon: Ticket,
      href: '/admin/coupons',
      color: 'bg-orange-500 hover:bg-orange-600',
    },
    {
      title: 'View Orders',
      description: 'Manage customer orders',
      icon: Users,
      href: '/admin/orders',
      color: 'bg-purple-500 hover:bg-purple-600',
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Quick Actions</h3>
      
      <div className="space-y-3">
        {actions.map((action, index) => (
          <Link key={index} href={action.href}>
            <div className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer group">
              <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform`}>
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
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Reports</h4>
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            Sales Report
          </Button>
          <Button variant="outline" className="w-full justify-start" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline" className="w-full justify-start" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>
    </div>
  );
}