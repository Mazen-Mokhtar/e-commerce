'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userAPI, GetUsersQueryParams } from '@/lib/user';
import { useLanguage } from '@/contexts/LanguageContext';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { 
  Users, 
  Search, 
  Filter,
  Edit,
  Trash2,
  Shield,
  User,
  Mail,
  Phone,
  Calendar,
  MoreHorizontal
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminUsersPage() {
  const { isAuthenticated, isAdmin } = useAuth();
  const { language, isRTL } = useLanguage();
  const router = useRouter();
  const queryClient = useQueryClient();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [newRole, setNewRole] = useState('');

  // Redirect if not admin
  React.useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      router.push('/');
    }
  }, [isAuthenticated, isAdmin, router]);

  // Fetch users
  const { data: usersData, isLoading, refetch } = useQuery({
    queryKey: ['admin-users', currentPage, searchTerm, roleFilter],
    queryFn: () => userAPI.getAllUsers({ 
      page: currentPage.toString(),
      limit: '10',
      search: searchTerm || undefined,
      role: roleFilter as any || undefined
    }),
    enabled: isAuthenticated && isAdmin,
  });

  // Update user role mutation
  const updateRoleMutation = useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: 'user' | 'admin' | 'delivery' }) =>
      userAPI.updateUserRole(userId, { role }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      setEditingUser(null);
      setNewRole('');
      toast.success(language === 'ar' ? 'تم تحديث دور المستخدم بنجاح' : 'User role updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || (language === 'ar' ? 'فشل في تحديث دور المستخدم' : 'Failed to update user role'));
    },
  });

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: userAPI.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast.success(language === 'ar' ? 'تم حذف المستخدم بنجاح' : 'User deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || (language === 'ar' ? 'فشل في حذف المستخدم' : 'Failed to delete user'));
    },
  });

  const handleRoleUpdate = (userId: string) => {
    if (newRole) {
      updateRoleMutation.mutate({ userId, role: newRole as any });
    }
  };

  const handleDeleteUser = (userId: string, userName: string) => {
    if (window.confirm(
      language === 'ar' 
        ? `هل أنت متأكد من حذف المستخدم "${userName}"؟`
        : `Are you sure you want to delete user "${userName}"?`
    )) {
      deleteUserMutation.mutate(userId);
    }
  };

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  const users = usersData?.data || [];
  const pagination = usersData?.pagination || { page: 1, pages: 1, total: 0 };

  const roleOptions = [
    { value: '', label: language === 'ar' ? 'جميع الأدوار' : 'All Roles' },
    { value: 'user', label: language === 'ar' ? 'مستخدم' : 'User' },
    { value: 'admin', label: language === 'ar' ? 'مدير' : 'Admin' },
    { value: 'delivery', label: language === 'ar' ? 'موصل' : 'Delivery' },
  ];

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return language === 'ar' ? 'مدير' : 'Admin';
      case 'delivery': return language === 'ar' ? 'موصل' : 'Delivery';
      default: return language === 'ar' ? 'مستخدم' : 'User';
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'delivery': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default: return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-3`}>
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {language === 'ar' ? 'إدارة المستخدمين' : 'Users Management'}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {language === 'ar' ? 'إدارة حسابات المستخدمين وصلاحياتهم' : 'Manage user accounts and permissions'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-4`}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={language === 'ar' ? 'البحث في المستخدمين...' : 'Search users...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                {roleOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {language === 'ar' 
                ? `عرض ${users.length} من ${pagination.total} مستخدم`
                : `Showing ${users.length} of ${pagination.total} users`
              }
            </div>
          </div>
        </div>

        {/* Users Table */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className={`px-6 py-3 ${isRTL ? 'text-right' : 'text-left'} text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>
                      {language === 'ar' ? 'المستخدم' : 'User'}
                    </th>
                    <th className={`px-6 py-3 ${isRTL ? 'text-right' : 'text-left'} text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>
                      {language === 'ar' ? 'الدور' : 'Role'}
                    </th>
                    <th className={`px-6 py-3 ${isRTL ? 'text-right' : 'text-left'} text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>
                      {language === 'ar' ? 'الحالة' : 'Status'}
                    </th>
                    <th className={`px-6 py-3 ${isRTL ? 'text-right' : 'text-left'} text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>
                      {language === 'ar' ? 'تاريخ الانضمام' : 'Joined'}
                    </th>
                    <th className={`px-6 py-3 ${isRTL ? 'text-left' : 'text-right'} text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider`}>
                      {language === 'ar' ? 'الإجراءات' : 'Actions'}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {users.map((user: any) => (
                    <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-4`}>
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-medium">
                              {user.name?.charAt(0).toUpperCase() || 'U'}
                            </span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {user.email}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {user.phone}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingUser === user._id ? (
                          <div className="space-y-2">
                            <select
                              value={newRole}
                              onChange={(e) => setNewRole(e.target.value)}
                              className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                              <option value="">{language === 'ar' ? 'اختر الدور' : 'Select Role'}</option>
                              <option value="user">{language === 'ar' ? 'مستخدم' : 'User'}</option>
                              <option value="admin">{language === 'ar' ? 'مدير' : 'Admin'}</option>
                              <option value="delivery">{language === 'ar' ? 'موصل' : 'Delivery'}</option>
                            </select>
                            <div className={`flex ${isRTL ? 'space-x-reverse' : ''} space-x-1`}>
                              <Button
                                size="sm"
                                onClick={() => handleRoleUpdate(user._id)}
                                disabled={!newRole || updateRoleMutation.isPending}
                              >
                                {language === 'ar' ? 'حفظ' : 'Save'}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setEditingUser(null);
                                  setNewRole('');
                                }}
                              >
                                {language === 'ar' ? 'إلغاء' : 'Cancel'}
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                            {getRoleLabel(user.role)}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.isConfirm
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        }`}>
                          {user.isConfirm 
                            ? (language === 'ar' ? 'مؤكد' : 'Verified')
                            : (language === 'ar' ? 'غير مؤكد' : 'Unverified')
                          }
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString(
                          language === 'ar' ? 'ar-EG' : 'en-US'
                        ) : 'N/A'}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap ${isRTL ? 'text-left' : 'text-right'} text-sm font-medium`}>
                        <div className={`flex items-center justify-end ${isRTL ? 'space-x-reverse' : ''} space-x-2`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setEditingUser(user._id);
                              setNewRole(user.role);
                            }}
                            disabled={editingUser === user._id}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteUser(user._id, user.name)}
                            disabled={deleteUserMutation.isPending}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className={`flex justify-center items-center ${isRTL ? 'space-x-reverse' : ''} space-x-2 mt-8`}>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage <= 1}
            >
              {language === 'ar' ? 'السابق' : 'Previous'}
            </Button>
            
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {language === 'ar' 
                ? `صفحة ${pagination.page} من ${pagination.pages}`
                : `Page ${pagination.page} of ${pagination.pages}`
              }
            </span>
            
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.pages))}
              disabled={currentPage >= pagination.pages}
            >
              {language === 'ar' ? 'التالي' : 'Next'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}