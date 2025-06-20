'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  BarChart3, 
  Package, 
  Tag, 
  ShoppingCart, 
  Ticket,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Home
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

const navigation = [
  { name: 'Dashboard', nameAr: 'لوحة التحكم', href: '/admin', icon: BarChart3 },
  { name: 'Products', nameAr: 'المنتجات', href: '/admin/products', icon: Package },
  { name: 'Categories', nameAr: 'الفئات', href: '/admin/categories', icon: Tag },
  { name: 'Orders', nameAr: 'الطلبات', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Coupons', nameAr: 'الكوبونات', href: '/admin/coupons', icon: Ticket },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { language, isRTL, t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  // Redirect if not admin
  React.useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      router.push('/');
    }
  }, [isAuthenticated, isAdmin, router]);

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : isRTL ? 'translate-x-full' : '-translate-x-full'
      } ${isRTL ? 'right-0' : 'left-0'}`}>
        
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
          <Link href="/admin" className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              {language === 'ar' ? 'لوحة الإدارة' : 'Admin'}
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const itemName = language === 'ar' ? item.nameAr : item.name;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className={`h-5 w-5 ${isRTL ? 'ml-3' : 'mr-3'} ${
                    isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 group-hover:text-gray-500'
                  }`} />
                  {itemName}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Back to Store button - دائم في السايدبار */}
        <div className="px-3 mt-6">
          <Link
            href="/"
            className={`group flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors ${isRTL ? 'space-x-reverse' : ''} space-x-3`}
          >
            <Home className={`h-4 w-4 text-gray-400 group-hover:text-gray-500 ${isRTL ? 'ml-3' : 'mr-3'}`} />
            {language === 'ar' ? 'العودة للمتجر' : 'Back to Store'}
          </Link>
        </div>

        <div className="mb-10"></div>
      </div>

      {/* Main content */}
      <div className="ml-64 p-4">
        {children}
      </div>
    </div>
  );
}