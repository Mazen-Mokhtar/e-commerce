export type Language = 'ar' | 'en';

export interface Translations {
  // Header
  home: string;
  products: string;
  categories: string;
  login: string;
  signup: string;
  logout: string;
  profile: string;
  myOrders: string;
  adminPanel: string;
  search: string;
  cart: string;
  
  // Products Page
  discoverProducts: string;
  highQualityProducts: string;
  showing: string;
  product: string;
  products: string;
  page: string;
  of: string;
  loading: string;
  filters: string;
  viewMode: string;
  grid: string;
  list: string;
  
  // Product Card
  addToCart: string;
  outOfStock: string;
  available: string;
  limited: string;
  discount: string;
  rating: string;
  colors: string;
  sizes: string;
  
  // Filters
  searchProducts: string;
  enterProductName: string;
  category: string;
  allCategories: string;
  priceRange: string;
  minPrice: string;
  maxPrice: string;
  sortBy: string;
  default: string;
  nameAZ: string;
  nameZA: string;
  priceLowHigh: string;
  priceHighLow: string;
  newestFirst: string;
  oldestFirst: string;
  applyFilters: string;
  clearFilters: string;
  activeFilters: string;
  
  // Auth
  welcome: string;
  enjoyBrowsing: string;
  welcomeBack: string;
  loginSuccess: string;
  logoutSuccess: string;
  seeYouSoon: string;
  pleaseLogin: string;
  profileUpdated: string;
  createAccount: string;
  signInToExisting: string;
  emailAddress: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  phoneNumber: string;
  rememberMe: string;
  forgotPassword: string;
  agreeToTerms: string;
  termsAndConditions: string;
  privacyPolicy: string;
  
  // Cart
  shoppingCart: string;
  cartEmpty: string;
  addSomeProducts: string;
  continueShopping: string;
  itemsInCart: string;
  each: string;
  stock: string;
  subtotal: string;
  shipping: string;
  free: string;
  tax: string;
  calculatedAtCheckout: string;
  total: string;
  proceedToCheckout: string;
  
  // Checkout
  checkout: string;
  shippingInformation: string;
  fullAddress: string;
  enterCompleteAddress: string;
  orderNotes: string;
  specialInstructions: string;
  paymentMethod: string;
  cashOnDelivery: string;
  creditDebitCard: string;
  discountPercentage: string;
  enterDiscountPercentage: string;
  proceedToPayment: string;
  placeOrder: string;
  orderSummary: string;
  quantity: string;
  
  // Orders
  orders: string;
  orderDetails: string;
  orderNotFound: string;
  couldNotFindOrder: string;
  backToOrders: string;
  orderStatus: string;
  orderDate: string;
  shippingAddress: string;
  address: string;
  phone: string;
  paymentInformation: string;
  totalAmount: string;
  orderNotes: string;
  actions: string;
  orderTimeline: string;
  estimatedDelivery: string;
  orderCanceled: string;
  canceledOn: string;
  
  // Order Status
  pending: string;
  placed: string;
  shipped: string;
  delivered: string;
  canceled: string;
  
  // Categories
  exploreCategories: string;
  categoryProducts: string;
  categoryNotFound: string;
  backToCategories: string;
  viewProducts: string;
  allProductsInCategory: string;
  creationDate: string;
  code: string;
  availableNow: string;
  
  // Common
  error: string;
  retry: string;
  noProducts: string;
  noProductsFound: string;
  noCategories: string;
  noCategoriesFound: string;
  previous: string;
  next: string;
  close: string;
  back: string;
  view: string;
  edit: string;
  delete: string;
  save: string;
  cancel: string;
  confirm: string;
  yes: string;
  no: string;
  
  // Theme
  lightMode: string;
  darkMode: string;
  switchToLight: string;
  switchToDark: string;
  
  // Homepage
  welcomeToShopHub: string;
  amazingProductsUnbeatablePrices: string;
  shopNow: string;
  browseCategories: string;
  shopByCategory: string;
  exploreWideRange: string;
  viewAllCategories: string;
  featuredProducts: string;
  latestPopularItems: string;
  viewAllProducts: string;
  freeShipping: string;
  freeShippingOver50: string;
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
  shippingInfo: string;
  returns: string;
  newsletter: string;
  subscribeUpdates: string;
  enterEmail: string;
  subscribe: string;
  allRightsReserved: string;
  
  // Messages
  itemAddedToCart: string;
  itemRemovedFromCart: string;
  cartCleared: string;
  loginRequired: string;
  orderCreatedSuccessfully: string;
  orderCanceledSuccessfully: string;
  emailConfirmedSuccessfully: string;
  accountCreated: string;
  checkEmailVerification: string;
  
  // Validation
  emailRequired: string;
  invalidEmail: string;
  passwordRequired: string;
  passwordMinLength: string;
  nameRequired: string;
  nameMinLength: string;
  nameMaxLength: string;
  phoneRequired: string;
  invalidPhoneNumber: string;
  addressRequired: string;
  addressMinLength: string;
  verificationCodeRequired: string;
  codeDigits: string;
  passwordMismatch: string;
}

export const translations: Record<Language, Translations> = {
  ar: {
    // Header
    home: 'الرئيسية',
    products: 'المنتجات',
    categories: 'الفئات',
    login: 'تسجيل الدخول',
    signup: 'إنشاء حساب',
    logout: 'تسجيل الخروج',
    profile: 'الملف الشخصي',
    myOrders: 'طلباتي',
    adminPanel: 'لوحة الإدارة',
    search: 'البحث',
    cart: 'سلة التسوق',
    
    // Products Page
    discoverProducts: 'اكتشف مجموعتنا المتنوعة من المنتجات عالية الجودة',
    highQualityProducts: 'المنتجات عالية الجودة',
    showing: 'عرض',
    product: 'منتج',
    products: 'منتجات',
    page: 'الصفحة',
    of: 'من',
    loading: 'جاري التحميل...',
    filters: 'الفلاتر',
    viewMode: 'عرض',
    grid: 'شبكة',
    list: 'قائمة',
    
    // Product Card
    addToCart: 'أضف للسلة',
    outOfStock: 'نفذ المخزون',
    available: 'متوفر',
    limited: 'محدود',
    discount: 'خصم',
    rating: 'تقييم',
    colors: 'الألوان',
    sizes: 'المقاسات',
    
    // Filters
    searchProducts: 'البحث في المنتجات',
    enterProductName: 'أدخل اسم المنتج...',
    category: 'الفئة',
    allCategories: 'جميع الفئات',
    priceRange: 'نطاق السعر',
    minPrice: 'الحد الأدنى',
    maxPrice: 'الحد الأقصى',
    sortBy: 'الترتيب حسب',
    default: 'الافتراضي',
    nameAZ: 'الاسم (أ-ي)',
    nameZA: 'الاسم (ي-أ)',
    priceLowHigh: 'السعر (من الأقل للأعلى)',
    priceHighLow: 'السعر (من الأعلى للأقل)',
    newestFirst: 'الأحدث أولاً',
    oldestFirst: 'الأقدم أولاً',
    applyFilters: 'تطبيق الفلاتر',
    clearFilters: 'مسح الفلاتر',
    activeFilters: 'الفلاتر النشطة',
    
    // Auth
    welcome: 'مرحباً',
    enjoyBrowsing: 'استمتع بتصفح منتجاتنا',
    welcomeBack: 'مرحباً بعودتك',
    loginSuccess: 'تم تسجيل دخولك بنجاح',
    logoutSuccess: 'تم تسجيل الخروج بنجاح',
    seeYouSoon: 'نراك قريباً',
    pleaseLogin: 'يرجى تسجيل الدخول',
    profileUpdated: 'تم تحديث بياناتك بنجاح',
    createAccount: 'إنشاء حساب جديد',
    signInToExisting: 'تسجيل الدخول إلى حسابك الحالي',
    emailAddress: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    confirmPassword: 'تأكيد كلمة المرور',
    fullName: 'الاسم الكامل',
    phoneNumber: 'رقم الهاتف',
    rememberMe: 'تذكرني',
    forgotPassword: 'نسيت كلمة المرور؟',
    agreeToTerms: 'أوافق على',
    termsAndConditions: 'الشروط والأحكام',
    privacyPolicy: 'سياسة الخصوصية',
    
    // Cart
    shoppingCart: 'سلة التسوق',
    cartEmpty: 'سلة التسوق فارغة',
    addSomeProducts: 'أضف بعض المنتجات للبدء!',
    continueShopping: 'متابعة التسوق',
    itemsInCart: 'عناصر في هذا الطلب',
    each: 'للقطعة',
    stock: 'المخزون',
    subtotal: 'المجموع الفرعي',
    shipping: 'الشحن',
    free: 'مجاني',
    tax: 'الضريبة',
    calculatedAtCheckout: 'تحسب عند الدفع',
    total: 'الإجمالي',
    proceedToCheckout: 'متابعة للدفع',
    
    // Checkout
    checkout: 'الدفع',
    shippingInformation: 'معلومات الشحن',
    fullAddress: 'العنوان الكامل',
    enterCompleteAddress: 'أدخل عنوانك الكامل',
    orderNotes: 'ملاحظات الطلب (اختياري)',
    specialInstructions: 'أي تعليمات خاصة لطلبك...',
    paymentMethod: 'طريقة الدفع',
    cashOnDelivery: 'الدفع عند الاستلام',
    creditDebitCard: 'بطاقة ائتمان/خصم (Stripe)',
    discountPercentage: 'نسبة الخصم (اختياري)',
    enterDiscountPercentage: 'أدخل نسبة الخصم',
    proceedToPayment: 'متابعة للدفع',
    placeOrder: 'تأكيد الطلب',
    orderSummary: 'ملخص الطلب',
    quantity: 'الكمية',
    
    // Orders
    orders: 'الطلبات',
    orderDetails: 'تفاصيل الطلب',
    orderNotFound: 'الطلب غير موجود',
    couldNotFindOrder: 'لم نتمكن من العثور على الطلب المطلوب',
    backToOrders: 'العودة للطلبات',
    orderStatus: 'حالة الطلب',
    orderDate: 'تاريخ الطلب',
    shippingAddress: 'عنوان الشحن',
    address: 'العنوان',
    phone: 'الهاتف',
    paymentInformation: 'معلومات الدفع',
    totalAmount: 'المبلغ الإجمالي',
    orderNotes: 'ملاحظات الطلب',
    actions: 'الإجراءات',
    orderTimeline: 'مراحل الطلب',
    estimatedDelivery: 'موعد التسليم المتوقع',
    orderCanceled: 'تم إلغاء الطلب',
    canceledOn: 'تم الإلغاء في',
    
    // Order Status
    pending: 'قيد الانتظار',
    placed: 'تم التأكيد',
    shipped: 'تم الشحن',
    delivered: 'تم التسليم',
    canceled: 'ملغي',
    
    // Categories
    exploreCategories: 'استكشف فئاتنا المتنوعة',
    categoryProducts: 'منتجات الفئة',
    categoryNotFound: 'الفئة غير موجودة',
    backToCategories: 'العودة للفئات',
    viewProducts: 'عرض المنتجات',
    allProductsInCategory: 'جميع المنتجات المتاحة في هذه الفئة',
    creationDate: 'تاريخ الإنشاء',
    code: 'الرمز',
    availableNow: 'متاح الآن',
    
    // Common
    error: 'خطأ',
    retry: 'إعادة المحاولة',
    noProducts: 'لا توجد منتجات',
    noProductsFound: 'لم نتمكن من العثور على منتجات تطابق معايير البحث',
    noCategories: 'لا توجد فئات',
    noCategoriesFound: 'لم نتمكن من العثور على أي فئات متاحة حالياً',
    previous: 'السابق',
    next: 'التالي',
    close: 'إغلاق',
    back: 'رجوع',
    view: 'عرض',
    edit: 'تعديل',
    delete: 'حذف',
    save: 'حفظ',
    cancel: 'إلغاء',
    confirm: 'تأكيد',
    yes: 'نعم',
    no: 'لا',
    
    // Theme
    lightMode: 'الوضع الفاتح',
    darkMode: 'الوضع الداكن',
    switchToLight: 'التبديل إلى الوضع الفاتح',
    switchToDark: 'التبديل إلى الوضع الداكن',
    
    // Homepage
    welcomeToShopHub: 'مرحباً بك في ShopHub',
    amazingProductsUnbeatablePrices: 'اكتشف منتجات مذهلة بأسعار لا تُقاوم',
    shopNow: 'تسوق الآن',
    browseCategories: 'تصفح الفئات',
    shopByCategory: 'تسوق حسب الفئة',
    exploreWideRange: 'استكشف مجموعتنا الواسعة من فئات المنتجات',
    viewAllCategories: 'عرض جميع الفئات',
    featuredProducts: 'المنتجات المميزة',
    latestPopularItems: 'تحقق من أحدث وأشهر العناصر لدينا',
    viewAllProducts: 'عرض جميع المنتجات',
    freeShipping: 'شحن مجاني',
    freeShippingOver50: 'شحن مجاني للطلبات أكثر من $50',
    qualityGuarantee: 'ضمان الجودة',
    moneyBackGuarantee: 'ضمان استرداد الأموال لمدة 30 يوماً',
    support24: 'دعم 24/7',
    roundClockSupport: 'دعم العملاء على مدار الساعة',
    
    // Footer
    quickLinks: 'روابط سريعة',
    aboutUs: 'من نحن',
    contact: 'اتصل بنا',
    customerService: 'خدمة العملاء',
    helpCenter: 'مركز المساعدة',
    shippingInfo: 'معلومات الشحن',
    returns: 'المرتجعات',
    newsletter: 'النشرة الإخبارية',
    subscribeUpdates: 'اشترك للحصول على التحديثات حول المنتجات الجديدة والعروض',
    enterEmail: 'أدخل بريدك الإلكتروني',
    subscribe: 'اشتراك',
    allRightsReserved: 'جميع الحقوق محفوظة',
    
    // Messages
    itemAddedToCart: 'تم إضافة العنصر إلى السلة',
    itemRemovedFromCart: 'تم إزالة العنصر من السلة',
    cartCleared: 'تم مسح السلة',
    loginRequired: 'يرجى تسجيل الدخول',
    orderCreatedSuccessfully: 'تم إنشاء الطلب بنجاح!',
    orderCanceledSuccessfully: 'تم إلغاء الطلب بنجاح',
    emailConfirmedSuccessfully: 'تم تأكيد البريد الإلكتروني بنجاح! يمكنك الآن تسجيل الدخول',
    accountCreated: 'تم إنشاء الحساب! يرجى التحقق من بريدك الإلكتروني للحصول على رمز التحقق',
    checkEmailVerification: 'لقد أرسلنا رمز التحقق إلى عنوان بريدك الإلكتروني',
    
    // Validation
    emailRequired: 'البريد الإلكتروني مطلوب',
    invalidEmail: 'البريد الإلكتروني غير صحيح',
    passwordRequired: 'كلمة المرور مطلوبة',
    passwordMinLength: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل',
    nameRequired: 'الاسم مطلوب',
    nameMinLength: 'الاسم يجب أن يكون حرفين على الأقل',
    nameMaxLength: 'الاسم يجب أن يكون أقل من 30 حرف',
    phoneRequired: 'رقم الهاتف مطلوب',
    invalidPhoneNumber: 'يرجى إدخال رقم هاتف مصري صحيح',
    addressRequired: 'العنوان مطلوب',
    addressMinLength: 'العنوان يجب أن يكون 10 أحرف على الأقل',
    verificationCodeRequired: 'رمز التحقق مطلوب',
    codeDigits: 'الرمز يجب أن يكون 6 أرقام',
    passwordMismatch: 'كلمات المرور غير متطابقة',
  },
  en: {
    // Header
    home: 'Home',
    products: 'Products',
    categories: 'Categories',
    login: 'Login',
    signup: 'Sign Up',
    logout: 'Logout',
    profile: 'Profile',
    myOrders: 'My Orders',
    adminPanel: 'Admin Panel',
    search: 'Search',
    cart: 'Cart',
    
    // Products Page
    discoverProducts: 'Discover our diverse collection of high-quality products',
    highQualityProducts: 'high-quality products',
    showing: 'Showing',
    product: 'product',
    products: 'products',
    page: 'Page',
    of: 'of',
    loading: 'Loading...',
    filters: 'Filters',
    viewMode: 'View',
    grid: 'Grid',
    list: 'List',
    
    // Product Card
    addToCart: 'Add to Cart',
    outOfStock: 'Out of Stock',
    available: 'Available',
    limited: 'Limited',
    discount: 'Discount',
    rating: 'Rating',
    colors: 'Colors',
    sizes: 'Sizes',
    
    // Filters
    searchProducts: 'Search Products',
    enterProductName: 'Enter product name...',
    category: 'Category',
    allCategories: 'All Categories',
    priceRange: 'Price Range',
    minPrice: 'Min Price',
    maxPrice: 'Max Price',
    sortBy: 'Sort By',
    default: 'Default',
    nameAZ: 'Name (A-Z)',
    nameZA: 'Name (Z-A)',
    priceLowHigh: 'Price (Low to High)',
    priceHighLow: 'Price (High to Low)',
    newestFirst: 'Newest First',
    oldestFirst: 'Oldest First',
    applyFilters: 'Apply Filters',
    clearFilters: 'Clear Filters',
    activeFilters: 'Active Filters',
    
    // Auth
    welcome: 'Welcome',
    enjoyBrowsing: 'Enjoy browsing our products',
    welcomeBack: 'Welcome back',
    loginSuccess: 'Login successful',
    logoutSuccess: 'Logout successful',
    seeYouSoon: 'See you soon',
    pleaseLogin: 'Please login',
    profileUpdated: 'Profile updated successfully',
    createAccount: 'Create your account',
    signInToExisting: 'sign in to your existing account',
    emailAddress: 'Email address',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    fullName: 'Full Name',
    phoneNumber: 'Phone Number',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot your password?',
    agreeToTerms: 'I agree to the',
    termsAndConditions: 'Terms and Conditions',
    privacyPolicy: 'Privacy Policy',
    
    // Cart
    shoppingCart: 'Shopping Cart',
    cartEmpty: 'Your Cart is Empty',
    addSomeProducts: 'Add some products to get started!',
    continueShopping: 'Continue Shopping',
    itemsInCart: 'Items in this Order',
    each: 'each',
    stock: 'Stock',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    free: 'Free',
    tax: 'Tax',
    calculatedAtCheckout: 'Calculated at checkout',
    total: 'Total',
    proceedToCheckout: 'Proceed to Checkout',
    
    // Checkout
    checkout: 'Checkout',
    shippingInformation: 'Shipping Information',
    fullAddress: 'Full Address',
    enterCompleteAddress: 'Enter your complete address',
    orderNotes: 'Order Notes (Optional)',
    specialInstructions: 'Any special instructions for your order...',
    paymentMethod: 'Payment Method',
    cashOnDelivery: 'Cash on Delivery',
    creditDebitCard: 'Credit/Debit Card (Stripe)',
    discountPercentage: 'Discount Percentage (Optional)',
    enterDiscountPercentage: 'Enter discount percentage',
    proceedToPayment: 'Proceed to Payment',
    placeOrder: 'Place Order',
    orderSummary: 'Order Summary',
    quantity: 'Qty',
    
    // Orders
    orders: 'Orders',
    orderDetails: 'Order Details',
    orderNotFound: 'Order Not Found',
    couldNotFindOrder: 'We couldn\'t find the order you\'re looking for',
    backToOrders: 'Back to My Orders',
    orderStatus: 'Order Status',
    orderDate: 'Order Date',
    shippingAddress: 'Shipping Address',
    address: 'Address',
    phone: 'Phone',
    paymentInformation: 'Payment Information',
    totalAmount: 'Total Amount',
    orderNotes: 'Order Notes',
    actions: 'Actions',
    orderTimeline: 'Order Timeline',
    estimatedDelivery: 'Estimated Delivery',
    orderCanceled: 'Order Canceled',
    canceledOn: 'Canceled on',
    
    // Order Status
    pending: 'Pending',
    placed: 'Placed',
    shipped: 'Shipped',
    delivered: 'Delivered',
    canceled: 'Canceled',
    
    // Categories
    exploreCategories: 'Explore our wide range of product categories',
    categoryProducts: 'Category Products',
    categoryNotFound: 'Category Not Found',
    backToCategories: 'Back to Categories',
    viewProducts: 'View Products',
    allProductsInCategory: 'All products available in this category',
    creationDate: 'Creation Date',
    code: 'Code',
    availableNow: 'Available Now',
    
    // Common
    error: 'Error',
    retry: 'Retry',
    noProducts: 'No Products',
    noProductsFound: 'We couldn\'t find products matching your search criteria',
    noCategories: 'No Categories',
    noCategoriesFound: 'We couldn\'t find any categories available currently',
    previous: 'Previous',
    next: 'Next',
    close: 'Close',
    back: 'Back',
    view: 'View',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save',
    cancel: 'Cancel',
    confirm: 'Confirm',
    yes: 'Yes',
    no: 'No',
    
    // Theme
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
    switchToLight: 'Switch to Light Mode',
    switchToDark: 'Switch to Dark Mode',
    
    // Homepage
    welcomeToShopHub: 'Welcome to ShopHub',
    amazingProductsUnbeatablePrices: 'Discover amazing products at unbeatable prices',
    shopNow: 'Shop Now',
    browseCategories: 'Browse Categories',
    shopByCategory: 'Shop by Category',
    exploreWideRange: 'Explore our wide range of product categories',
    viewAllCategories: 'View All Categories',
    featuredProducts: 'Featured Products',
    latestPopularItems: 'Check out our latest and most popular items',
    viewAllProducts: 'View All Products',
    freeShipping: 'Free Shipping',
    freeShippingOver50: 'Free shipping on orders over $50',
    qualityGuarantee: 'Quality Guarantee',
    moneyBackGuarantee: '30-day money-back guarantee',
    support24: '24/7 Support',
    roundClockSupport: 'Round-the-clock customer support',
    
    // Footer
    quickLinks: 'Quick Links',
    aboutUs: 'About Us',
    contact: 'Contact',
    customerService: 'Customer Service',
    helpCenter: 'Help Center',
    shippingInfo: 'Shipping Info',
    returns: 'Returns',
    newsletter: 'Newsletter',
    subscribeUpdates: 'Subscribe to get updates on new products and offers',
    enterEmail: 'Enter your email',
    subscribe: 'Subscribe',
    allRightsReserved: 'All rights reserved',
    
    // Messages
    itemAddedToCart: 'Item added to cart',
    itemRemovedFromCart: 'Item removed from cart',
    cartCleared: 'Cart cleared',
    loginRequired: 'Please login',
    orderCreatedSuccessfully: 'Order created successfully!',
    orderCanceledSuccessfully: 'Order canceled successfully',
    emailConfirmedSuccessfully: 'Email confirmed successfully! You can now login',
    accountCreated: 'Account created! Please check your email for verification code',
    checkEmailVerification: 'We\'ve sent a verification code to your email address',
    
    // Validation
    emailRequired: 'Email is required',
    invalidEmail: 'Invalid email address',
    passwordRequired: 'Password is required',
    passwordMinLength: 'Password must be at least 8 characters',
    nameRequired: 'Name is required',
    nameMinLength: 'Name must be at least 2 characters',
    nameMaxLength: 'Name must be less than 30 characters',
    phoneRequired: 'Phone number is required',
    invalidPhoneNumber: 'Please enter a valid Egyptian mobile number',
    addressRequired: 'Address is required',
    addressMinLength: 'Address must be at least 10 characters',
    verificationCodeRequired: 'Verification code is required',
    codeDigits: 'Code must be 6 digits',
    passwordMismatch: 'Passwords do not match',
  }
};

export function getTranslation(lang: Language, key: keyof Translations): string {
  return translations[lang][key] || key;
}