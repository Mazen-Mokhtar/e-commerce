'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { userAPI, UpdateProfileData, ChangePasswordData } from '@/lib/user';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { 
  User, 
  Mail, 
  Phone, 
  Shield, 
  Edit, 
  Save, 
  X, 
  Lock,
  Calendar,
  CheckCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { user, isAuthenticated, updateUser } = useAuth();
  const { t, language, isRTL } = useLanguage();
  const router = useRouter();
  const queryClient = useQueryClient();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Fetch user profile
  const { data: profileResponse, isLoading, error } = useQuery({
    queryKey: ['user-profile'],
    queryFn: userAPI.getProfile,
    enabled: isAuthenticated,
    onSuccess: (data) => {
      if (data) {
        setProfileData({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
        });
      }
    },
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: userAPI.updateProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
      updateUser(data.data);
      setIsEditing(false);
      toast.success(language === 'ar' ? 'تم تحديث الملف الشخصي بنجاح' : 'Profile updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || (language === 'ar' ? 'فشل في تحديث الملف الشخصي' : 'Failed to update profile'));
    },
  });

  // Change password mutation
  const changePasswordMutation = useMutation({
    mutationFn: userAPI.changePassword,
    onSuccess: () => {
      setIsChangingPassword(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      toast.success(language === 'ar' ? 'تم تغيير كلمة المرور بنجاح' : 'Password changed successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || (language === 'ar' ? 'فشل في تغيير كلمة المرور' : 'Failed to change password'));
    },
  });

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  React.useEffect(() => {
    if (profileResponse) {
      setProfileData({
        name: profileResponse.name || '',
        email: profileResponse.email || '',
        phone: profileResponse.phone || '',
      });
    }
  }, [profileResponse]);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate(profileData);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error(language === 'ar' ? 'كلمات المرور غير متطابقة' : 'Passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error(language === 'ar' ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' : 'Password must be at least 6 characters');
      return;
    }

    changePasswordMutation.mutate({
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
    });
  };

  const handleInputChange = (field: keyof typeof profileData, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordInputChange = (field: keyof typeof passwordData, value: string) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
  };

  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">
            {language === 'ar' ? 'جاري تحميل الملف الشخصي...' : 'Loading profile...'}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="h-10 w-10 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {language === 'ar' ? 'خطأ في تحميل الملف الشخصي' : 'Error Loading Profile'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {language === 'ar' ? 'حدث خطأ أثناء تحميل بياناتك' : 'An error occurred while loading your profile'}
          </p>
          <Button onClick={() => window.location.reload()}>
            {language === 'ar' ? 'إعادة المحاولة' : 'Try Again'}
          </Button>
        </div>
      </div>
    );
  }

  const userProfile = profileResponse || user;

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-3 mb-6`}>
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {language === 'ar' ? 'الملف الشخصي' : 'Profile'}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {language === 'ar' ? 'إدارة معلوماتك الشخصية وإعدادات الحساب' : 'Manage your personal information and account settings'}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info Card */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {language === 'ar' ? 'المعلومات الشخصية' : 'Personal Information'}
                </h2>
                {!isEditing && (
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(true)}
                    className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-2`}
                  >
                    <Edit className="h-4 w-4" />
                    <span>{language === 'ar' ? 'تعديل' : 'Edit'}</span>
                  </Button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <Input
                    label={language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                    value={profileData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />

                  <Input
                    label={language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />

                  <Input
                    label={language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                    value={profileData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                  />

                  <div className={`flex ${isRTL ? 'space-x-reverse' : ''} space-x-3`}>
                    <Button
                      type="submit"
                      isLoading={updateProfileMutation.isPending}
                      className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-2`}
                    >
                      <Save className="h-4 w-4" />
                      <span>{language === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}</span>
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        setProfileData({
                          name: userProfile?.name || '',
                          email: userProfile?.email || '',
                          phone: userProfile?.phone || '',
                        });
                      }}
                    >
                      {language === 'ar' ? 'إلغاء' : 'Cancel'}
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-4`}>
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                      <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {userProfile?.name || (language === 'ar' ? 'غير محدد' : 'Not specified')}
                      </p>
                    </div>
                  </div>

                  <div className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-4`}>
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                      <Mail className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {userProfile?.email || (language === 'ar' ? 'غير محدد' : 'Not specified')}
                      </p>
                    </div>
                  </div>

                  <div className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-4`}>
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                      <Phone className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {userProfile?.phone || (language === 'ar' ? 'غير محدد' : 'Not specified')}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Change Password Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mt-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {language === 'ar' ? 'تغيير كلمة المرور' : 'Change Password'}
                </h2>
                {!isChangingPassword && (
                  <Button
                    variant="outline"
                    onClick={() => setIsChangingPassword(true)}
                    className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-2`}
                  >
                    <Lock className="h-4 w-4" />
                    <span>{language === 'ar' ? 'تغيير كلمة المرور' : 'Change Password'}</span>
                  </Button>
                )}
              </div>

              {isChangingPassword ? (
                <form onSubmit={handlePasswordChange} className="space-y-6">
                  <Input
                    label={language === 'ar' ? 'كلمة المرور الحالية' : 'Current Password'}
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => handlePasswordInputChange('currentPassword', e.target.value)}
                    required
                  />

                  <Input
                    label={language === 'ar' ? 'كلمة المرور الجديدة' : 'New Password'}
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => handlePasswordInputChange('newPassword', e.target.value)}
                    required
                  />

                  <Input
                    label={language === 'ar' ? 'تأكيد كلمة المرور الجديدة' : 'Confirm New Password'}
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => handlePasswordInputChange('confirmPassword', e.target.value)}
                    required
                  />

                  <div className={`flex ${isRTL ? 'space-x-reverse' : ''} space-x-3`}>
                    <Button
                      type="submit"
                      isLoading={changePasswordMutation.isPending}
                      className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-2`}
                    >
                      <Save className="h-4 w-4" />
                      <span>{language === 'ar' ? 'تغيير كلمة المرور' : 'Change Password'}</span>
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsChangingPassword(false);
                        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                      }}
                    >
                      {language === 'ar' ? 'إلغاء' : 'Cancel'}
                    </Button>
                  </div>
                </form>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">
                  {language === 'ar' 
                    ? 'لحماية حسابك، يُنصح بتغيير كلمة المرور بانتظام'
                    : 'For your account security, we recommend changing your password regularly'
                  }
                </p>
              )}
            </div>
          </div>

          {/* Account Info Sidebar */}
          <div className="space-y-6">
            {/* Account Status */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {language === 'ar' ? 'حالة الحساب' : 'Account Status'}
              </h3>
              
              <div className="space-y-4">
                <div className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-3`}>
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-400">
                      {userProfile?.isConfirm 
                        ? (language === 'ar' ? 'مؤكد' : 'Verified')
                        : (language === 'ar' ? 'غير مؤكد' : 'Not Verified')
                      }
                    </p>
                  </div>
                </div>

                <div className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-3`}>
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                    <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {language === 'ar' ? 'نوع الحساب' : 'Account Type'}
                    </p>
                    <p className="text-sm text-blue-600 dark:text-blue-400 capitalize">
                      {userProfile?.role === 'admin' 
                        ? (language === 'ar' ? 'مدير' : 'Administrator')
                        : userProfile?.role === 'delivery'
                          ? (language === 'ar' ? 'موصل' : 'Delivery')
                          : (language === 'ar' ? 'مستخدم' : 'User')
                      }
                    </p>
                  </div>
                </div>

                {userProfile?.createdAt && (
                  <div className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-3`}>
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {language === 'ar' ? 'عضو منذ' : 'Member Since'}
                      </p>
                      <p className="text-sm text-purple-600 dark:text-purple-400">
                        {new Date(userProfile.createdAt).toLocaleDateString(
                          language === 'ar' ? 'ar-EG' : 'en-US',
                          { year: 'numeric', month: 'long', day: 'numeric' }
                        )}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {language === 'ar' ? 'إجراءات سريعة' : 'Quick Actions'}
              </h3>
              
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => router.push('/orders')}
                >
                  {language === 'ar' ? 'عرض طلباتي' : 'View My Orders'}
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => router.push('/cart')}
                >
                  {language === 'ar' ? 'عرض سلة التسوق' : 'View Shopping Cart'}
                </Button>

                {userProfile?.role === 'admin' && (
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => router.push('/admin')}
                  >
                    {language === 'ar' ? 'لوحة الإدارة' : 'Admin Dashboard'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}