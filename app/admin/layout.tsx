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
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 lg:flex ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}>
          <div className="absolute inset-0 bg-gray-600 bg-opacity-75" />
        </div>
      )}

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 z-50 flex w-64 flex-col bg-gray-900 text-white shadow-lg transition-transform duration-300 ease-in-out lg:static lg:inset-auto lg:translate-x-0 lg:flex-shrink-0 ${
          sidebarOpen ? 'translate-x-0' : isRTL ? 'translate-x-full' : '-translate-x-full'
        } ${isRTL ? 'right-0' : 'left-0'}`}
      >
        
        {/* Sidebar Header */}
        <div className="flex h-20 items-center justify-between px-6 border-b border-gray-700 flex-shrink-0">
          <Link href="/admin" className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">
              {language === 'ar' ? 'الإدارة' : 'Admin'}
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-gray-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex flex-1 flex-col overflow-y-auto">
          <nav className="flex-1 mt-6 px-3">
            <div className="space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
                const itemName = language === 'ar' ? item.nameAr : item.name;
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className={`h-5 w-5 flex-shrink-0 ${isRTL ? 'ml-3' : 'mr-3'} ${
                      isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'
                    }`} />
                    {itemName}
                  </Link>
                );
              })}
            </div>
            
            <div className="border-t border-gray-700 my-4"></div>

            <div className="space-y-2">
              <Link
                href="/"
                className="group flex items-center px-4 py-2.5 text-sm font-medium text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors"
              >
                <Home className={`h-5 w-5 text-gray-400 group-hover:text-gray-300 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                {language === 'ar' ? 'العودة للمتجر' : 'Back to Store'}
              </Link>

              <button
                onClick={logout}
                className="group flex items-center w-full px-4 py-2.5 text-sm font-medium text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-colors text-left"
              >
                <LogOut className={`h-5 w-5 text-gray-400 group-hover:text-gray-300 ${isRTL ? 'ml-3' : 'mr-3'}`} />
                {language === 'ar' ? 'تسجيل الخروج' : 'Logout'}
              </button>
            </div>
          </nav>
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        {/* Mobile menu button */}
        <div className={`sticky top-0 z-10 flex items-center justify-start ${isRTL ? 'pr-1' : 'pl-1'} pt-1 sm:hidden bg-gray-50 dark:bg-gray-900`}>
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:text-gray-400 dark:hover:text-white"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Main content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}