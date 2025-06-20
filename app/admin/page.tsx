'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { adminAPI } from '@/lib/admin';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { DashboardStats } from '@/components/admin/DashboardStats';
import { RecentOrders } from '@/components/admin/RecentOrders';
import { QuickActions } from '@/components/admin/QuickActions';
import { 
  BarChart3, 
  Users, 
  Package, 
  ShoppingCart, 
  TrendingUp,
  Calendar,
  DollarSign
} from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function AdminDashboard() {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();

  // Redirect if not admin
  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    
    if (!isAdmin) {
      router.push('/products');
      return;
    }
  }, [isAuthenticated, isAdmin, router]);

  // Fetch dashboard stats
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: () => adminAPI.getDashboardStats(),
    enabled: isAuthenticated && isAdmin,
  });

  // Fetch recent orders
  const { data: recentOrders, isLoading: ordersLoading } = useQuery({
    queryKey: ['admin-recent-orders'],
    queryFn: () => adminAPI.getRecentOrders(),
    enabled: isAuthenticated && isAdmin,
  });

  // Fetch dashboard widgets
  const { data: revenueTrend, isLoading: revenueLoading } = useQuery({
    queryKey: ['admin-revenue-trend'],
    queryFn: () => adminAPI.getRevenueTrend('monthly'),
    enabled: isAuthenticated && isAdmin,
  });

  const { data: topProducts, isLoading: topProductsLoading } = useQuery({
    queryKey: ['admin-top-products'],
    queryFn: () => adminAPI.getTopProducts(5),
    enabled: isAuthenticated && isAdmin,
  });

  const { data: customerActivity, isLoading: customerActivityLoading } = useQuery({
    queryKey: ['admin-customer-activity'],
    queryFn: () => adminAPI.getCustomerActivity(),
    enabled: isAuthenticated && isAdmin,
  });
  console.log({customerActivity});
  console.log({revenueTrend});
  console.log({topProducts});
  
  // Show loading while checking authentication
  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (statsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Welcome back, {user?.name}! Here's what's happening with your store.
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
          </div>
        </div>

        {/* Dashboard Stats */}
        <DashboardStats stats={stats?.data} isLoading={statsLoading} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <RecentOrders orders={recentOrders?.data?.documents || []} isLoading={ordersLoading} />
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <QuickActions />
          </div>
        </div>

        {/* Additional Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {/* Revenue Chart Widget */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Revenue Trend</h3>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            {revenueLoading ? (
              <div className="text-center py-8"><LoadingSpinner size="md" /></div>
            ) : revenueTrend?.data?.length ? (
              <Line
                data={{
                  labels: revenueTrend.data.map((item: any) => item._id),
                  datasets: [
                    {
                      label: 'Revenue',
                      data: revenueTrend.data.map((item: any) => item.totalRevenue),
                      borderColor: '#22c55e',
                      backgroundColor: 'rgba(34,197,94,0.1)',
                      fill: true,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: { legend: { display: false } },
                  scales: { x: { title: { display: true, text: 'Month' } }, y: { title: { display: true, text: 'Revenue' } } },
                }}
                height={200}
              />
            ) : (
              <div className="text-center py-8">
                <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">No revenue data</p>
              </div>
            )}
          </div>

          {/* Top Products Widget */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Products</h3>
              <Package className="h-5 w-5 text-blue-500" />
            </div>
            {topProductsLoading ? (
              <div className="text-center py-8"><LoadingSpinner size="md" /></div>
            ) : topProducts?.data?.length ? (
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {topProducts.data.map((product: any) => (
                  <li key={product._id} className="py-2 flex items-center justify-between">
                    <span className="font-medium text-gray-900 dark:text-white">{product.name}</span>
                    <span className="text-sm text-gray-500">Sold: {product.totalSold}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">No top products data</p>
              </div>
            )}
          </div>

          {/* Customer Activity Widget */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Customer Activity</h3>
              <Users className="h-5 w-5 text-purple-500" />
            </div>
            {customerActivityLoading ? (
              <div className="text-center py-8"><LoadingSpinner size="md" /></div>
            ) : customerActivity?.data?.length ? (
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {customerActivity.data.slice(0, 5).map((user: any) => (
                  <li key={user.userId} className="py-2 flex flex-col">
                    <span className="font-medium text-gray-900 dark:text-white">{user.name} ({user.email})</span>
                    <span className="text-sm text-gray-500">Orders: {user.totalOrders} | Spent: ${user.totalSpent.toFixed(2)}</span>
                    <span className="text-xs text-gray-400">Last order: {user.lastOrder ? new Date(user.lastOrder).toLocaleDateString() : 'N/A'}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">No customer activity data</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}