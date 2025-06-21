export type Language = 'ar' | 'en';

export interface Translations {
  // General
  shopNow: string;
  language: string;
  theme: string;
  light: string;
  dark: string;
  system: string;
  search: string;
  home: string;
  products: string;
  categories: string;
  cart: string;
  orders: string;
  login: string;
  logout: string;
  signup: string;
  myAccount: string;
  dashboard: string;
  settings: string;
  loading: string;
  error: string;
  retry: string;
  close: string;
  back: string;
  next: string;
  previous: string;
  page: string;
  of: string;
  showing: string;
  category: string;
  product: string;
  
  // Navigation
  welcome: string;
  welcomeBack: string;
  loginSuccess: string;
  logoutSuccess: string;
  seeYouSoon: string;
  profileUpdated: string;
  enjoyBrowsing: string;
  
  // Product Page
  addToCart: string;
  inStock: string;
  outOfStock: string;
  quantity: string;
  description: string;
  relatedProducts: string;
  productNotFound: string;
  available: string;
  colors: string;
  sizes: string;
  each: string;
  stock: string;
  loginRequired: string;
  itemAddedToCart: string;
  itemRemovedFromCart: string;
  cartCleared: string;
  
  // Cart Page
  shoppingCart: string;
  item: string;
  price: string;
  total: string;
  subtotal: string;
  shipping: string;
  freeShipping: string;
  freeShippingOver50: string;
  checkout: string;
  emptyCart: string;
  cartEmpty: string;
  addSomeProducts: string;
  continueShopping: string;
  proceedToCheckout: string;
  orderSummary: string;
  free: string;
  calculatedAtCheckout: string;
  
  // Checkout Page
  billingDetails: string;
  shippingInfo: string;
  shippingInformation: string;
  paymentMethod: string;
  placeOrder: string;
  fullAddress: string;
  enterCompleteAddress: string;
  addressRequired: string;
  addressMinLength: string;
  orderNotes: string;
  specialInstructions: string;
  cashOnDelivery: string;
  creditDebitCard: string;
  coupon: string;
  couponCode: string;
  enterCouponCode: string;
  couponCodeMaxLength: string;
  invalidCouponCode: string;
  proceedToPayment: string;
  orderCreatedSuccessfully: string;
  
  // Auth Pages
  emailAddress: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  fullName: string;
  createAccount: string;
  alreadyHaveAccount: string;
  signIn: string;
  signInToExisting: string;
  emailRequired: string;
  invalidEmail: string;
  passwordRequired: string;
  passwordMinLength: string;
  confirmPasswordRequired: string;
  passwordsDoNotMatch: string;
  firstNameRequired: string;
  lastNameRequired: string;
  nameRequired: string;
  nameMinLength: string;
  nameMaxLength: string;
  phoneNumber: string;
  phoneRequired: string;
  invalidPhoneNumber: string;
  rememberMe: string;
  forgotPassword: string;
  accountCreated: string;
  redirecting: string;
  
  // Profile
  profile: string;
  personalInformation: string;
  edit: string;
  save: string;
  cancel: string;
  saveChanges: string;
  changePassword: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  accountStatus: string;
  email: string;
  verified: string;
  notVerified: string;
  accountType: string;
  administrator: string;
  delivery: string;
  user: string;
  memberSince: string;
  quickActions: string;
  viewMyOrders: string;
  viewShoppingCart: string;
  adminPanel: string;
  
  // Admin
  adminDashboard: string;
  totalRevenue: string;
  totalOrders: string;
  totalProducts: string;
  recentOrders: string;
  productsManagement: string;
  categoriesManagement: string;
  ordersManagement: string;
  couponsManagement: string;
  usersManagement: string;
  addProduct: string;
  editProduct: string;
  addCategory: string;
  editCategory: string;
  addCoupon: string;
  editCoupon: string;
  productName: string;
  categoryName: string;
  couponName: string;
  discountPercentage: string;
  expiryDate: string;
  delete: string;
  areYouSure: string;
  productImage: string;
  productDescription: string;
  productPrice: string;
  productStock: string;
  
  // Search and Filters
  searchPlaceholder: string;
  searchProducts: string;
  enterProductName: string;
  noResults: string;
  noProducts: string;
  noProductsFound: string;
  noCategories: string;
  noCategoriesFound: string;
  filterByCategory: string;
  filterByPrice: string;
  filters: string;
  sortBy: string;
  newest: string;
  oldest: string;
  priceLowToHigh: string;
  priceHighToLow: string;
  clearFilters: string;
  applyFilters: string;
  allCategories: string;
  priceRange: string;
  minPrice: string;
  maxPrice: string;
  sortByPrice: string;
  latest: string;
  default: string;
  nameAZ: string;
  nameZA: string;
  priceLowHigh: string;
  priceHighLow: string;
  newestFirst: string;
  oldestFirst: string;
  activeFilters: string;
  
  // Categories
  exploreCategories: string;
  allProductsInCategory: string;
  viewProducts: string;
  
  // Orders
  myOrders: string;
  viewDetails: string;
  orderId: string;
  orderDate: string;
  orderStatus: string;
  customer: string;
  shippingAddress: string;
  pending: string;
  placed: string;
  shipped: string;
  delivered: string;
  cancelled: string;
  canceled: string;
  applyCoupon: string;
  couponApplied: string;
  invalidCoupon: string;
  updateProfile: string;
  orderItems: string;
  orderTotal: string;
  paymentStatus: string;
  paid: string;
  unpaid: string;
  orderDetails: string;
  placedOn: string;
  customerInformation: string;
  contactInformation: string;
  paymentDetails: string;
  cardEndingIn: string;
  
  // Toast Messages
  loginError: string;
  signupSuccess: string;
  signupError: string;
  addedToCart: string;
  orderPlaced: string;
  
  // Home Page
  welcomeToShopHub: string;
  amazingProductsUnbeatablePrices: string;
  browseCategories: string;
  shopByCategory: string;
  exploreWideRange: string;
  viewAllCategories: string;
  featuredProducts: string;
  latestPopularItems: string;
  viewAllProducts: string;
  qualityGuarantee: string;
  moneyBackGuarantee: string;
  support24: string;
  roundClockSupport: string;
  
  // Footer
  quickLinks: string;
  aboutUs: string;
  contact: string;
  customerService: string;
  helpCenter: string;
  returns: string;
  privacyPolicy: string;
  newsletter: string;
  subscribeUpdates: string;
  enterEmail: string;
  subscribe: string;
  allRightsReserved: string;
  
  // Theme
  switchToLight: string;
  switchToDark: string;
  
  // Validation messages
  emailMustBeValid: string;
  passwordMustBe8Chars: string;
  nameMustBeString: string;
  lastNameMustBeString: string;
  firstNameMustBeString: string;
  passwordsDoNotMatch2: string;
  lastNameIsRequired: string;
  firstNameIsRequired: string;
  emailAlreadyRegistered: string;
  
  // Email confirmation
  confirmYourEmail: string;
  checkEmailVerification: string;
  verificationCodeRequired: string;
  codeDigits: string;
  
  // Terms
  agreeToTerms: string;
  termsAndConditions: string;
  
  // Address
  address: string;
  city: string;
  zipCode: string;
  country: string;
  addressRequired2: string;
  cityRequired: string;
  zipRequired: string;
  countryRequired: string;
  fullNameRequired: string;
  codeRequired: string;
  passwordMismatch: string;
  
  // Discover
  discoverProducts: string;
  
  // Admin specific
  refresh: string;
  export: string;
  
  // Users management
  role: string;
  status: string;
  joined: string;
  actions: string;
  selectRole: string;
  
  // More admin
  management: string;
  createAndManage: string;
  manageCustomerOrders: string;
  trackDeliveries: string;
  manageUserAccounts: string;
  permissions: string;
  
  // Additional
  pleaseLogin: string;
  backToOrders: string;
  updateStatus: string;
  currentStatus: string;
  rejectionReason: string;
  cancellationReason: string;
  items: string;
  payment: string;
  cash: string;
  card: string;
  
  // More order statuses
  orderConfirmed: string;
  orderShipped: string;
  orderDelivered: string;
  orderCanceled: string;
  
  // More general
  name: string;
  slug: string;
  createdDate: string;
  type: string;
  value: string;
  usage: string;
  active: string;
  inactive: string;
  percentage: string;
  fixedAmount: string;
  
  // More product fields
  originalPrice: string;
  finalPrice: string;
  discount: string;
  gallery: string;
  
  // More validation
  required: string;
  invalid: string;
  tooShort: string;
  tooLong: string;
  
  // More actions
  create: string;
  update: string;
  view: string;
  manage: string;
  
  // More status messages
  success: string;
  failed: string;
  completed: string;
  processing: string;
  
  // More navigation
  backToProducts: string;
  backToCategories: string;
  backToUsers: string;
  backToCoupons: string;
  viewAll: string;
  backToStore: string;
  menu: string;
  
  // More admin dashboard
  salesReport: string;
  exportData: string;
  revenueChart: string;
  topProducts: string;
  customerActivity: string;
  reports: string;
  viewOrders: string;
  
  // More order management
  orderTimeline: string;
  estimatedDelivery: string;
  trackingNumber: string;
  shippingMethod: string;
  
  // More user management
  lastLogin: string;
  totalSpent: string;
  ordersCount: string;
  sold: string;
  lastOrder: string;
  
  // More product management
  inStockProducts: string;
  outOfStockProducts: string;
  lowStockProducts: string;
  totalCategories: string;
  
  // More general UI
  showMore: string;
  showLess: string;
  expand: string;
  collapse: string;
  selectAll: string;
  deselectAll: string;
  bulkActions: string;
  
  // More validation messages
  fieldRequired: string;
  invalidFormat: string;
  valueTooSmall: string;
  valueTooLarge: string;
  
  // More status indicators
  online: string;
  offline: string;
  busy: string;
  away: string;
  
  // More time-related
  today: string;
  yesterday: string;
  thisWeek: string;
  thisMonth: string;
  thisYear: string;
  
  // More actions
  duplicate: string;
  archive: string;
  restore: string;
  permanently: string;
  
  // More notifications
  notification: string;
  notifications: string;
  markAsRead: string;
  markAllAsRead: string;
  noNotifications: string;
}

export const translations: Record<Language, Translations> = {
  ar: {
    // General
    shopNow: 'تسوق الآن',
    language: 'اللغة',
    theme: 'المظهر',
    light: 'فاتح',
    dark: 'داكن',
    system: 'النظام',
    search: 'بحث',
    home: 'الرئيسية',
    products: 'المنتجات',
    categories: 'الفئات',
    cart: 'عربة التسوق',
    orders: 'الطلبات',
    login: 'تسجيل الدخول',
    logout: 'تسجيل الخروج',
    signup: 'إنشاء حساب',
    myAccount: 'حسابي',
    dashboard: 'لوحة التحكم',
    settings: 'الإعدادات',
    loading: 'جاري التحميل',
    error: 'خطأ',
    retry: 'إعادة المحاولة',
    close: 'إغلاق',
    back: 'رجوع',
    next: 'التالي',
    previous: 'السابق',
    page: 'صفحة',
    of: 'من',
    showing: 'عرض',
    category: 'فئة',
    product: 'منتج',
    
    // Navigation
    welcome: 'مرحباً',
    welcomeBack: 'مرحباً بعودتك',
    loginSuccess: 'تم تسجيل الدخول بنجاح',
    logoutSuccess: 'تم تسجيل الخروج بنجاح',
    seeYouSoon: 'نراك قريباً',
    profileUpdated: 'تم تحديث الملف الشخصي',
    enjoyBrowsing: 'استمتع بالتصفح',
    
    // Product Page
    addToCart: 'أضف إلى العربة',
    inStock: 'متوفر',
    outOfStock: 'غير متوفر',
    quantity: 'الكمية',
    description: 'الوصف',
    relatedProducts: 'منتجات ذات صلة',
    productNotFound: 'المنتج غير موجود',
    available: 'متاح',
    colors: 'الألوان',
    sizes: 'الأحجام',
    each: 'للقطعة',
    stock: 'المخزون',
    loginRequired: 'يجب تسجيل الدخول أولاً',
    itemAddedToCart: 'تمت إضافة المنتج إلى العربة',
    itemRemovedFromCart: 'تم حذف المنتج من العربة',
    cartCleared: 'تم تفريغ العربة',
    
    // Cart Page
    shoppingCart: 'عربة التسوق',
    item: 'المنتج',
    price: 'السعر',
    total: 'الإجمالي',
    subtotal: 'المجموع الفرعي',
    shipping: 'الشحن',
    freeShipping: 'شحن مجاني',
    freeShippingOver50: 'شحن مجاني عند شراء مبلغ 50 جنيه أو أكثر',
    checkout: 'الدفع',
    emptyCart: 'عربة التسوق فارغة',
    cartEmpty: 'عربة التسوق فارغة',
    addSomeProducts: 'أضف بعض المنتجات',
    continueShopping: 'متابعة التسوق',
    proceedToCheckout: 'الانتقال للدفع',
    orderSummary: 'ملخص الطلب',
    free: 'مجاني',
    calculatedAtCheckout: 'يحسب عند الدفع',
    
    // Checkout Page
    billingDetails: 'تفاصيل الفاتورة',
    shippingInfo: 'معلومات الشحن',
    shippingInformation: 'معلومات الشحن',
    paymentMethod: 'طريقة الدفع',
    placeOrder: 'إتمام الطلب',
    fullAddress: 'العنوان الكامل',
    enterCompleteAddress: 'أدخل العنوان الكامل',
    addressRequired: 'العنوان مطلوب',
    addressMinLength: 'العنوان يجب أن يكون 10 أحرف على الأقل',
    orderNotes: 'ملاحظات الطلب',
    specialInstructions: 'تعليمات خاصة',
    cashOnDelivery: 'الدفع عند الاستلام',
    creditDebitCard: 'بطاقة ائتمان/خصم',
    coupon: 'كوبون',
    couponCode: 'كود الكوبون',
    enterCouponCode: 'أدخل كود الكوبون',
    couponCodeMaxLength: 'كود الكوبون طويل جداً',
    invalidCouponCode: 'كود كوبون غير صالح',
    proceedToPayment: 'الانتقال للدفع',
    orderCreatedSuccessfully: 'تم إنشاء الطلب بنجاح',
    
    // Auth Pages
    emailAddress: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    confirmPassword: 'تأكيد كلمة المرور',
    firstName: 'الاسم الأول',
    lastName: 'الاسم الأخير',
    fullName: 'الاسم الكامل',
    createAccount: 'إنشاء حساب جديد',
    alreadyHaveAccount: 'لديك حساب بالفعل؟',
    signIn: 'تسجيل الدخول',
    signInToExisting: 'تسجيل الدخول إلى حساب موجود',
    emailRequired: 'البريد الإلكتروني مطلوب',
    invalidEmail: 'بريد إلكتروني غير صالح',
    passwordRequired: 'كلمة المرور مطلوبة',
    passwordMinLength: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل',
    confirmPasswordRequired: 'تأكيد كلمة المرور مطلوب',
    passwordsDoNotMatch: 'كلمات المرور غير متطابقة',
    firstNameRequired: 'الاسم الأول مطلوب',
    lastNameRequired: 'الاسم الأخير مطلوب',
    nameRequired: 'الاسم مطلوب',
    nameMinLength: 'الاسم يجب أن يكون حرفين على الأقل',
    nameMaxLength: 'الاسم يجب أن يكون 30 حرف كحد أقصى',
    phoneNumber: 'رقم الهاتف',
    phoneRequired: 'رقم الهاتف مطلوب',
    invalidPhoneNumber: 'رقم هاتف غير صالح',
    rememberMe: 'تذكرني',
    forgotPassword: 'هل نسيت كلمة المرور؟',
    accountCreated: 'تم إنشاء الحساب بنجاح',
    redirecting: 'جاري إعادة التوجيه...',
    
    // Profile
    profile: 'الملف الشخصي',
    personalInformation: 'المعلومات الشخصية',
    edit: 'تعديل',
    save: 'حفظ',
    cancel: 'إلغاء',
    saveChanges: 'حفظ التغييرات',
    changePassword: 'تغيير كلمة المرور',
    currentPassword: 'كلمة المرور الحالية',
    newPassword: 'كلمة المرور الجديدة',
    confirmNewPassword: 'تأكيد كلمة المرور الجديدة',
    accountStatus: 'حالة الحساب',
    email: 'البريد الإلكتروني',
    verified: 'مؤكد',
    notVerified: 'غير مؤكد',
    accountType: 'نوع الحساب',
    administrator: 'مدير',
    delivery: 'موصل',
    user: 'مستخدم',
    memberSince: 'عضو منذ',
    quickActions: 'إجراءات سريعة',
    viewMyOrders: 'عرض طلباتي',
    viewShoppingCart: 'عرض سلة التسوق',
    adminPanel: 'لوحة الإدارة',
    
    // Admin
    adminDashboard: 'لوحة تحكم المسؤول',
    totalRevenue: 'إجمالي الإيرادات',
    totalOrders: 'إجمالي الطلبات',
    totalProducts: 'إجمالي المنتجات',
    recentOrders: 'الطلبات الأخيرة',
    productsManagement: 'إدارة المنتجات',
    categoriesManagement: 'إدارة الفئات',
    ordersManagement: 'إدارة الطلبات',
    couponsManagement: 'إدارة الكوبونات',
    usersManagement: 'إدارة المستخدمين',
    addProduct: 'إضافة منتج',
    editProduct: 'تعديل منتج',
    addCategory: 'إضافة فئة',
    editCategory: 'تعديل فئة',
    addCoupon: 'إضافة كوبون',
    editCoupon: 'تعديل كوبون',
    productName: 'اسم المنتج',
    categoryName: 'اسم الفئة',
    couponName: 'اسم الكوبون',
    discountPercentage: 'نسبة الخصم',
    expiryDate: 'تاريخ الانتهاء',
    delete: 'حذف',
    areYouSure: 'هل أنت متأكد؟',
    productImage: 'صورة المنتج',
    productDescription: 'وصف المنتج',
    productPrice: 'سعر المنتج',
    productStock: 'مخزون المنتج',
    
    // Search and Filters
    searchPlaceholder: 'ابحث عن منتجات...',
    searchProducts: 'البحث في المنتجات',
    enterProductName: 'أدخل اسم المنتج...',
    noResults: 'لا توجد نتائج',
    noProducts: 'لا توجد منتجات',
    noProductsFound: 'لم يتم العثور على منتجات',
    noCategories: 'لا توجد فئات',
    noCategoriesFound: 'لم يتم العثور على فئات',
    filterByCategory: 'تصفية حسب الفئة',
    filterByPrice: 'تصفية حسب السعر',
    filters: 'الفلاتر',
    sortBy: 'ترتيب حسب',
    newest: 'الأحدث',
    oldest: 'الأقدم',
    priceLowToHigh: 'السعر: من الأقل إلى الأعلى',
    priceHighToLow: 'السعر: من الأعلى إلى الأقل',
    clearFilters: 'مسح الفلاتر',
    applyFilters: 'تطبيق الفلاتر',
    allCategories: 'كل الفئات',
    priceRange: 'نطاق السعر',
    minPrice: 'الحد الأدنى',
    maxPrice: 'الحد الأعلى',
    sortByPrice: 'ترتيب حسب السعر',
    latest: 'الأحدث',
    default: 'افتراضي',
    nameAZ: 'الاسم: أ-ي',
    nameZA: 'الاسم: ي-أ',
    priceLowHigh: 'السعر: منخفض إلى عالي',
    priceHighLow: 'السعر: عالي إلى منخفض',
    newestFirst: 'الأحدث أولاً',
    oldestFirst: 'الأقدم أولاً',
    activeFilters: 'الفلاتر النشطة',
    
    // Categories
    exploreCategories: 'استكشف الفئات',
    allProductsInCategory: 'جميع المنتجات في فئة',
    viewProducts: 'عرض المنتجات',
    
    // Orders
    myOrders: 'طلباتي',
    viewDetails: 'عرض التفاصيل',
    orderId: 'رقم الطلب',
    orderDate: 'تاريخ الطلب',
    orderStatus: 'حالة الطلب',
    customer: 'العميل',
    shippingAddress: 'عنوان الشحن',
    pending: 'قيد الانتظار',
    placed: 'تم التأكيد',
    shipped: 'تم الشحن',
    delivered: 'تم التوصيل',
    cancelled: 'ملغي',
    canceled: 'ملغي',
    applyCoupon: 'تطبيق الكوبون',
    couponApplied: 'تم تطبيق الكوبون',
    invalidCoupon: 'كوبون غير صالح',
    updateProfile: 'تحديث الملف الشخصي',
    orderItems: 'عناصر الطلب',
    orderTotal: 'إجمالي الطلب',
    paymentStatus: 'حالة الدفع',
    paid: 'مدفوع',
    unpaid: 'غير مدفوع',
    orderDetails: 'تفاصيل الطلب',
    placedOn: 'تم الطلب في',
    customerInformation: 'معلومات العميل',
    contactInformation: 'معلومات الاتصال',
    paymentDetails: 'تفاصيل الدفع',
    cardEndingIn: 'بطاقة تنتهي بـ',
    
    // Toast Messages
    loginError: 'فشل تسجيل الدخول. تحقق من بياناتك.',
    signupSuccess: 'تم إنشاء الحساب بنجاح!',
    signupError: 'فشل إنشاء الحساب. حاول مرة أخرى.',
    addedToCart: 'تمت الإضافة إلى العربة!',
    orderPlaced: 'تم إرسال الطلب بنجاح!',
    
    // Home Page
    welcomeToShopHub: 'مرحباً بك في شوب هاب',
    amazingProductsUnbeatablePrices: 'منتجات رائعة بأسعار لا تُقاوم',
    browseCategories: 'تصفح الفئات',
    shopByCategory: 'تسوق حسب الفئة',
    exploreWideRange: 'استكشف مجموعة واسعة من المنتجات',
    viewAllCategories: 'عرض جميع الفئات',
    featuredProducts: 'المنتجات المميزة',
    latestPopularItems: 'أحدث العناصر الشائعة',
    viewAllProducts: 'عرض جميع المنتجات',
    qualityGuarantee: 'ضمان الجودة',
    moneyBackGuarantee: 'ضمان استرداد الأموال',
    support24: 'دعم 24/7',
    roundClockSupport: 'دعم على مدار الساعة',
    
    // Footer
    quickLinks: 'روابط سريعة',
    aboutUs: 'من نحن',
    contact: 'اتصل بنا',
    customerService: 'خدمة العملاء',
    helpCenter: 'مركز المساعدة',
    returns: 'المرتجعات',
    privacyPolicy: 'سياسة الخصوصية',
    newsletter: 'النشرة الإخبارية',
    subscribeUpdates: 'اشترك للحصول على التحديثات',
    enterEmail: 'أدخل بريدك الإلكتروني',
    subscribe: 'اشتراك',
    allRightsReserved: 'جميع الحقوق محفوظة',
    
    // Theme
    switchToLight: 'التبديل إلى الوضع الفاتح',
    switchToDark: 'التبديل إلى الوضع المظلم',
    
    // Validation messages
    emailMustBeValid: 'يجب أن يكون البريد الإلكتروني صالحاً',
    passwordMustBe8Chars: 'يجب أن لا تقل كلمة المرور عن 8 أحرف',
    nameMustBeString: 'يجب أن يكون الاسم نصاً',
    lastNameMustBeString: 'يجب أن يكون الاسم الأخير نصاً',
    firstNameMustBeString: 'يجب أن يكون الاسم الأول نصاً',
    passwordsDoNotMatch2: 'كلمات المرور غير متطابقة',
    lastNameIsRequired: 'الاسم الأخير مطلوب',
    firstNameIsRequired: 'الاسم الأول مطلوب',
    emailAlreadyRegistered: 'هذا البريد الإلكتروني مسجل بالفعل',
    
    // Email confirmation
    confirmYourEmail: 'تأكيد بريدك الإلكتروني',
    checkEmailVerification: 'تحقق من بريدك الإلكتروني للتحقق',
    verificationCodeRequired: 'رمز التحقق مطلوب',
    codeDigits: 'الرمز يجب أن يكون 6 أرقام',
    
    // Terms
    agreeToTerms: 'أوافق على',
    termsAndConditions: 'الشروط والأحكام',
    
    // Address
    address: 'العنوان',
    city: 'المدينة',
    zipCode: 'الرمز البريدي',
    country: 'الدولة',
    addressRequired2: 'العنوان مطلوب',
    cityRequired: 'المدينة مطلوبة',
    zipRequired: 'الرمز البريدي مطلوب',
    countryRequired: 'الدولة مطلوبة',
    fullNameRequired: 'الاسم الكامل مطلوب',
    codeRequired: 'الرمز مطلوب',
    passwordMismatch: 'كلمات المرور غير متطابقة',
    
    // Discover
    discoverProducts: 'اكتشف منتجاتنا المميزة',
    
    // Admin specific
    refresh: 'تحديث',
    export: 'تصدير',
    
    // Users management
    role: 'الدور',
    status: 'الحالة',
    joined: 'انضم في',
    actions: 'الإجراءات',
    selectRole: 'اختر الدور',
    
    // More admin
    management: 'الإدارة',
    createAndManage: 'إنشاء وإدارة كوبونات الخصم',
    manageCustomerOrders: 'إدارة طلبات العملاء',
    trackDeliveries: 'وتتبع التسليم',
    manageUserAccounts: 'إدارة حسابات المستخدمين',
    permissions: 'والصلاحيات',
    
    // Additional
    pleaseLogin: 'يرجى تسجيل الدخول',
    backToOrders: 'العودة للطلبات',
    updateStatus: 'تحديث الحالة',
    currentStatus: 'الحالة الحالية',
    rejectionReason: 'سبب الرفض',
    cancellationReason: 'سبب الإلغاء',
    items: 'عناصر',
    payment: 'الدفع',
    cash: 'نقدي',
    card: 'بطاقة',
    
    // More order statuses
    orderConfirmed: 'تم تأكيد الطلب',
    orderShipped: 'تم شحن الطلب',
    orderDelivered: 'تم تسليم الطلب',
    orderCanceled: 'تم إلغاء الطلب',
    
    // More general
    name: 'الاسم',
    slug: 'الرمز',
    createdDate: 'تاريخ الإنشاء',
    type: 'النوع',
    value: 'القيمة',
    usage: 'الاستخدام',
    active: 'نشط',
    inactive: 'غير نشط',
    percentage: 'نسبة مئوية',
    fixedAmount: 'مبلغ ثابت',
    
    // More product fields
    originalPrice: 'السعر الأصلي',
    finalPrice: 'السعر النهائي',
    discount: 'الخصم',
    gallery: 'المعرض',
    
    // More validation
    required: 'مطلوب',
    invalid: 'غير صالح',
    tooShort: 'قصير جداً',
    tooLong: 'طويل جداً',
    
    // More actions
    create: 'إنشاء',
    update: 'تحديث',
    view: 'عرض',
    manage: 'إدارة',
    
    // More status messages
    success: 'نجح',
    failed: 'فشل',
    completed: 'مكتمل',
    processing: 'قيد المعالجة',
    
    // More navigation
    backToProducts: 'العودة للمنتجات',
    backToCategories: 'العودة للفئات',
    backToUsers: 'العودة للمستخدمين',
    backToCoupons: 'العودة للكوبونات',
    viewAll: 'عرض الكل',
    backToStore: 'العودة للمتجر',
    menu: 'القائمة',
    
    // More admin dashboard
    salesReport: 'تقرير المبيعات',
    exportData: 'تصدير البيانات',
    revenueChart: 'مخطط الإيرادات',
    topProducts: 'أفضل المنتجات',
    customerActivity: 'نشاط العملاء',
    reports: 'التقارير',
    viewOrders: 'عرض الطلبات',
    
    // More order management
    orderTimeline: 'الجدول الزمني للطلب',
    estimatedDelivery: 'التسليم المقدر',
    trackingNumber: 'رقم التتبع',
    shippingMethod: 'طريقة الشحن',
    
    // More user management
    lastLogin: 'آخر تسجيل دخول',
    totalSpent: 'إجمالي الإنفاق',
    ordersCount: 'عدد الطلبات',
    sold: 'مبيع',
    lastOrder: 'آخر طلب',
    
    // More product management
    inStockProducts: 'المنتجات المتوفرة',
    outOfStockProducts: 'المنتجات غير المتوفرة',
    lowStockProducts: 'المنتجات قليلة المخزون',
    totalCategories: 'إجمالي الفئات',
    
    // More general UI
    showMore: 'عرض المزيد',
    showLess: 'عرض أقل',
    expand: 'توسيع',
    collapse: 'طي',
    selectAll: 'تحديد الكل',
    deselectAll: 'إلغاء تحديد الكل',
    bulkActions: 'إجراءات مجمعة',
    
    // More validation messages
    fieldRequired: 'هذا الحقل مطلوب',
    invalidFormat: 'تنسيق غير صالح',
    valueTooSmall: 'القيمة صغيرة جداً',
    valueTooLarge: 'القيمة كبيرة جداً',
    
    // More status indicators
    online: 'متصل',
    offline: 'غير متصل',
    busy: 'مشغول',
    away: 'غائب',
    
    // More time-related
    today: 'اليوم',
    yesterday: 'أمس',
    thisWeek: 'هذا الأسبوع',
    thisMonth: 'هذا الشهر',
    thisYear: 'هذا العام',
    
    // More actions
    duplicate: 'نسخ',
    archive: 'أرشفة',
    restore: 'استعادة',
    permanently: 'نهائياً',
    
    // More notifications
    notification: 'إشعار',
    notifications: 'الإشعارات',
    markAsRead: 'تحديد كمقروء',
    markAllAsRead: 'تحديد الكل كمقروء',
    noNotifications: 'لا توجد إشعارات',
  },
  en: {
    // General
    shopNow: 'Shop Now',
    language: 'Language',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    search: 'Search',
    home: 'Home',
    products: 'Products',
    categories: 'Categories',
    cart: 'Cart',
    orders: 'Orders',
    login: 'Login',
    logout: 'Logout',
    signup: 'Sign Up',
    myAccount: 'My Account',
    dashboard: 'Dashboard',
    settings: 'Settings',
    loading: 'Loading',
    error: 'Error',
    retry: 'Retry',
    close: 'Close',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    page: 'Page',
    of: 'of',
    showing: 'Showing',
    category: 'category',
    product: 'product',
    
    // Navigation
    welcome: 'Welcome',
    welcomeBack: 'Welcome back',
    loginSuccess: 'Login successful',
    logoutSuccess: 'Logout successful',
    seeYouSoon: 'See you soon',
    profileUpdated: 'Profile updated',
    enjoyBrowsing: 'Enjoy browsing',
    
    // Product Page
    addToCart: 'Add to Cart',
    inStock: 'In Stock',
    outOfStock: 'Out of Stock',
    quantity: 'Quantity',
    description: 'Description',
    relatedProducts: 'Related Products',
    productNotFound: 'Product not found',
    available: 'Available',
    colors: 'Colors',
    sizes: 'Sizes',
    each: 'each',
    stock: 'Stock',
    loginRequired: 'Login required',
    itemAddedToCart: 'Item added to cart',
    itemRemovedFromCart: 'Item removed from cart',
    cartCleared: 'Cart cleared',
    
    // Cart Page
    shoppingCart: 'Shopping Cart',
    item: 'Item',
    price: 'Price',
    total: 'Total',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    freeShipping: 'Free Shipping',
    freeShippingOver50: 'Free Shipping Over $50',
    checkout: 'Checkout',
    emptyCart: 'Your cart is empty',
    cartEmpty: 'Cart is empty',
    addSomeProducts: 'Add some products',
    continueShopping: 'Continue Shopping',
    proceedToCheckout: 'Proceed to Checkout',
    orderSummary: 'Order Summary',
    free: 'Free',
    calculatedAtCheckout: 'Calculated at checkout',
    
    // Checkout Page
    billingDetails: 'Billing Details',
    shippingInfo: 'Shipping Information',
    shippingInformation: 'Shipping Information',
    paymentMethod: 'Payment Method',
    placeOrder: 'Place Order',
    fullAddress: 'Full Address',
    enterCompleteAddress: 'Enter complete address',
    addressRequired: 'Address is required',
    addressMinLength: 'Address must be at least 10 characters',
    orderNotes: 'Order Notes',
    specialInstructions: 'Special instructions',
    cashOnDelivery: 'Cash on Delivery',
    creditDebitCard: 'Credit/Debit Card',
    coupon: 'Coupon',
    couponCode: 'Coupon Code',
    enterCouponCode: 'Enter coupon code',
    couponCodeMaxLength: 'Coupon code too long',
    invalidCouponCode: 'Invalid coupon code',
    proceedToPayment: 'Proceed to Payment',
    orderCreatedSuccessfully: 'Order created successfully',
    
    // Auth Pages
    emailAddress: 'Email Address',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    firstName: 'First Name',
    lastName: 'Last Name',
    fullName: 'Full Name',
    createAccount: 'Create an account',
    alreadyHaveAccount: 'Already have an account?',
    signIn: 'Sign In',
    signInToExisting: 'Sign in to your existing account',
    emailRequired: 'Email is required',
    invalidEmail: 'Invalid email address',
    passwordRequired: 'Password is required',
    passwordMinLength: 'Password must be at least 8 characters',
    confirmPasswordRequired: 'Confirm password is required',
    passwordsDoNotMatch: 'Passwords do not match',
    firstNameRequired: 'First name is required',
    lastNameRequired: 'Last name is required',
    nameRequired: 'Name is required',
    nameMinLength: 'Name must be at least 2 characters',
    nameMaxLength: 'Name must be at most 30 characters',
    phoneNumber: 'Phone Number',
    phoneRequired: 'Phone number is required',
    invalidPhoneNumber: 'Invalid phone number',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot your password?',
    accountCreated: 'Account created successfully',
    redirecting: 'Redirecting...',
    
    // Profile
    profile: 'Profile',
    personalInformation: 'Personal Information',
    edit: 'Edit',
    save: 'Save',
    cancel: 'Cancel',
    saveChanges: 'Save Changes',
    changePassword: 'Change Password',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmNewPassword: 'Confirm New Password',
    accountStatus: 'Account Status',
    email: 'Email',
    verified: 'Verified',
    notVerified: 'Not Verified',
    accountType: 'Account Type',
    administrator: 'Administrator',
    delivery: 'Delivery',
    user: 'User',
    memberSince: 'Member Since',
    quickActions: 'Quick Actions',
    viewMyOrders: 'View My Orders',
    viewShoppingCart: 'View Shopping Cart',
    adminPanel: 'Admin Panel',
    
    // Admin
    adminDashboard: 'Admin Dashboard',
    totalRevenue: 'Total Revenue',
    totalOrders: 'Total Orders',
    totalProducts: 'Total Products',
    recentOrders: 'Recent Orders',
    productsManagement: 'Products Management',
    categoriesManagement: 'Categories Management',
    ordersManagement: 'Orders Management',
    couponsManagement: 'Coupons Management',
    usersManagement: 'Users Management',
    addProduct: 'Add Product',
    editProduct: 'Edit Product',
    addCategory: 'Add Category',
    editCategory: 'Edit Category',
    addCoupon: 'Add Coupon',
    editCoupon: 'Edit Coupon',
    productName: 'Product Name',
    categoryName: 'Category Name',
    couponName: 'Coupon Name',
    discountPercentage: 'Discount Percentage',
    expiryDate: 'Expiry Date',
    delete: 'Delete',
    areYouSure: 'Are you sure?',
    productImage: 'Product Image',
    productDescription: 'Product Description',
    productPrice: 'Product Price',
    productStock: 'Product Stock',
    
    // Search and Filters
    searchPlaceholder: 'Search for products...',
    searchProducts: 'Search Products',
    enterProductName: 'Enter product name...',
    noResults: 'No results found',
    noProducts: 'No products',
    noProductsFound: 'No products found',
    noCategories: 'No categories',
    noCategoriesFound: 'No categories found',
    filterByCategory: 'Filter by Category',
    filterByPrice: 'Filter by Price',
    filters: 'Filters',
    sortBy: 'Sort by',
    newest: 'Newest',
    oldest: 'Oldest',
    priceLowToHigh: 'Price: Low to High',
    priceHighToLow: 'Price: High to Low',
    clearFilters: 'Clear Filters',
    applyFilters: 'Apply Filters',
    allCategories: 'All Categories',
    priceRange: 'Price Range',
    minPrice: 'Min Price',
    maxPrice: 'Max Price',
    sortByPrice: 'Sort by Price',
    latest: 'Latest',
    default: 'Default',
    nameAZ: 'Name: A-Z',
    nameZA: 'Name: Z-A',
    priceLowHigh: 'Price: Low to High',
    priceHighLow: 'Price: High to Low',
    newestFirst: 'Newest First',
    oldestFirst: 'Oldest First',
    activeFilters: 'Active Filters',
    
    // Categories
    exploreCategories: 'Explore Categories',
    allProductsInCategory: 'All products in category',
    viewProducts: 'View Products',
    
    // Orders
    myOrders: 'My Orders',
    viewDetails: 'View Details',
    orderId: 'Order ID',
    orderDate: 'Order Date',
    orderStatus: 'Order Status',
    customer: 'Customer',
    shippingAddress: 'Shipping Address',
    pending: 'Pending',
    placed: 'Placed',
    shipped: 'Shipped',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
    canceled: 'Canceled',
    applyCoupon: 'Apply Coupon',
    couponApplied: 'Coupon applied',
    invalidCoupon: 'Invalid coupon',
    updateProfile: 'Update Profile',
    orderItems: 'Order Items',
    orderTotal: 'Order Total',
    paymentStatus: 'Payment Status',
    paid: 'Paid',
    unpaid: 'Unpaid',
    orderDetails: 'Order Details',
    placedOn: 'Placed on',
    customerInformation: 'Customer information',
    contactInformation: 'Contact information',
    paymentDetails: 'Payment details',
    cardEndingIn: 'Card ending in',
    
    // Toast Messages
    loginError: 'Login failed. Check your credentials.',
    signupSuccess: 'Account created successfully!',
    signupError: 'Signup failed. Please try again.',
    addedToCart: 'Added to cart!',
    orderPlaced: 'Order placed successfully!',
    
    // Home Page
    welcomeToShopHub: 'Welcome to ShopHub',
    amazingProductsUnbeatablePrices: 'Amazing products at unbeatable prices',
    browseCategories: 'Browse Categories',
    shopByCategory: 'Shop by Category',
    exploreWideRange: 'Explore our wide range of products',
    viewAllCategories: 'View All Categories',
    featuredProducts: 'Featured Products',
    latestPopularItems: 'Latest and popular items',
    viewAllProducts: 'View All Products',
    qualityGuarantee: 'Quality Guarantee',
    moneyBackGuarantee: '30-day money back guarantee',
    support24: '24/7 Support',
    roundClockSupport: 'Round the clock support',
    
    // Footer
    quickLinks: 'Quick Links',
    aboutUs: 'About Us',
    contact: 'Contact',
    customerService: 'Customer Service',
    helpCenter: 'Help Center',
    returns: 'Returns',
    privacyPolicy: 'Privacy Policy',
    newsletter: 'Newsletter',
    subscribeUpdates: 'Subscribe for updates',
    enterEmail: 'Enter your email',
    subscribe: 'Subscribe',
    allRightsReserved: 'All rights reserved',
    
    // Theme
    switchToLight: 'Switch to light mode',
    switchToDark: 'Switch to dark mode',
    
    // Validation messages
    emailMustBeValid: 'email must be a valid email',
    passwordMustBe8Chars: 'password must be at least 8 characters long',
    nameMustBeString: 'name must be a string',
    lastNameMustBeString: 'lastName must be a string',
    firstNameMustBeString: 'firstName must be a string',
    passwordsDoNotMatch2: 'passwords do not match',
    lastNameIsRequired: 'lastName is required',
    firstNameIsRequired: 'firstName is required',
    emailAlreadyRegistered: 'this email is already registered',
    
    // Email confirmation
    confirmYourEmail: 'Confirm Your Email',
    checkEmailVerification: 'Check your email for verification',
    verificationCodeRequired: 'Verification code is required',
    codeDigits: 'Code must be 6 digits',
    
    // Terms
    agreeToTerms: 'I agree to the',
    termsAndConditions: 'Terms and Conditions',
    
    // Address
    address: 'Address',
    city: 'City',
    zipCode: 'ZIP Code',
    country: 'Country',
    addressRequired2: 'Address is required',
    cityRequired: 'City is required',
    zipRequired: 'ZIP code is required',
    countryRequired: 'Country is required',
    fullNameRequired: 'Full name is required',
    codeRequired: 'Code is required',
    passwordMismatch: 'Passwords do not match',
    
    // Discover
    discoverProducts: 'Discover our amazing products',
    
    // Admin specific
    refresh: 'Refresh',
    export: 'Export',
    
    // Users management
    role: 'Role',
    status: 'Status',
    joined: 'Joined',
    actions: 'Actions',
    selectRole: 'Select Role',
    
    // More admin
    management: 'Management',
    createAndManage: 'Create and manage discount coupons',
    manageCustomerOrders: 'Manage customer orders',
    trackDeliveries: 'and track deliveries',
    manageUserAccounts: 'Manage user accounts',
    permissions: 'and permissions',
    
    // Additional
    pleaseLogin: 'Please Login',
    backToOrders: 'Back to Orders',
    updateStatus: 'Update Status',
    currentStatus: 'Current',
    rejectionReason: 'Rejection Reason',
    cancellationReason: 'Cancellation Reason',
    items: 'items',
    payment: 'Payment',
    cash: 'Cash',
    card: 'Card',
    
    // More order statuses
    orderConfirmed: 'Order Confirmed',
    orderShipped: 'Order Shipped',
    orderDelivered: 'Order Delivered',
    orderCanceled: 'Order Canceled',
    
    // More general
    name: 'Name',
    slug: 'Slug',
    createdDate: 'Created Date',
    type: 'Type',
    value: 'Value',
    usage: 'Usage',
    active: 'Active',
    inactive: 'Inactive',
    percentage: 'Percentage',
    fixedAmount: 'Fixed Amount',
    
    // More product fields
    originalPrice: 'Original Price',
    finalPrice: 'Final Price',
    discount: 'Discount',
    gallery: 'Gallery',
    
    // More validation
    required: 'Required',
    invalid: 'Invalid',
    tooShort: 'Too short',
    tooLong: 'Too long',
    
    // More actions
    create: 'Create',
    update: 'Update',
    view: 'View',
    manage: 'Manage',
    
    // More status messages
    success: 'Success',
    failed: 'Failed',
    completed: 'Completed',
    processing: 'Processing',
    
    // More navigation
    backToProducts: 'Back to Products',
    backToCategories: 'Back to Categories',
    backToUsers: 'Back to Users',
    backToCoupons: 'Back to Coupons',
    viewAll: 'View All',
    backToStore: 'Back to Store',
    menu: 'Menu',
    
    // More admin dashboard
    salesReport: 'Sales Report',
    exportData: 'Export Data',
    revenueChart: 'Revenue Chart',
    topProducts: 'Top Products',
    customerActivity: 'Customer Activity',
    reports: 'Reports',
    viewOrders: 'View Orders',
    
    // More order management
    orderTimeline: 'Order Timeline',
    estimatedDelivery: 'Estimated Delivery',
    trackingNumber: 'Tracking Number',
    shippingMethod: 'Shipping Method',
    
    // More user management
    lastLogin: 'Last Login',
    totalSpent: 'Total Spent',
    ordersCount: 'Orders Count',
    sold: 'Sold',
    lastOrder: 'Last Order',
    
    // More product management
    inStockProducts: 'In Stock Products',
    outOfStockProducts: 'Out of Stock Products',
    lowStockProducts: 'Low Stock Products',
    totalCategories: 'Total Categories',
    
    // More general UI
    showMore: 'Show More',
    showLess: 'Show Less',
    expand: 'Expand',
    collapse: 'Collapse',
    selectAll: 'Select All',
    deselectAll: 'Deselect All',
    bulkActions: 'Bulk Actions',
    
    // More validation messages
    fieldRequired: 'This field is required',
    invalidFormat: 'Invalid format',
    valueTooSmall: 'Value too small',
    valueTooLarge: 'Value too large',
    
    // More status indicators
    online: 'Online',
    offline: 'Offline',
    busy: 'Busy',
    away: 'Away',
    
    // More time-related
    today: 'Today',
    yesterday: 'Yesterday',
    thisWeek: 'This Week',
    thisMonth: 'This Month',
    thisYear: 'This Year',
    
    // More actions
    duplicate: 'Duplicate',
    archive: 'Archive',
    restore: 'Restore',
    permanently: 'Permanently',
    
    // More notifications
    notification: 'Notification',
    notifications: 'Notifications',
    markAsRead: 'Mark as Read',
    markAllAsRead: 'Mark All as Read',
    noNotifications: 'No Notifications',
  }
};

export function getTranslation(lang: Language, key: keyof Translations): string {
  return translations[lang][key] || key;
}