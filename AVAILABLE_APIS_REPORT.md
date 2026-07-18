# جميع الـ APIs المتاحة للربط في الداشبورد

## 📋 جدول المحتويات
1. [Authentication APIs](#authentication-apis)
2. [Front Desk APIs](#front-desk-apis)
3. [Room Service APIs](#room-service-apis)
4. [Restaurant APIs](#restaurant-apis)
5. [Cafe APIs](#cafe-apis)
6. [Manager APIs](#manager-apis)
7. [Guest APIs](#guest-apis)
8. [Event APIs](#event-apis)

---

## 🔐 Authentication APIs (المصادقة)

### 1. **POST /api/auth/login**
- **الاستخدام**: تسجيل الدخول
- **الحالة**: ✅ مربوطة
- **الصفحة**: Login.tsx
- **الصلاحيات**: جميع المستخدمين

### 2. **POST /api/auth/logout**
- **الاستخدام**: تسجيل الخروج
- **الحالة**: ✅ مربوطة
- **الصفحة**: Login.tsx
- **الصلاحيات**: جميع المستخدمين

### 3. **POST /api/auth/refresh**
- **الاستخدام**: تحديث الـ token
- **الحالة**: ❌ غير مربوطة
- **الصفحة**: يمكن إضافتها لتحديث الـ token تلقائياً
- **الصلاحيات**: جميع المستخدمين

---

## 🏨 Front Desk APIs (الاستقبال)

### 4. **GET /api/dashboard/front-desk/rooms**
- **الاستخدام**: جلب جميع الغرف
- **الحالة**: ❌ غير مربوطة
- **الصفحة**: RoomsSection.tsx
- **الصلاحيات**: FRONT_DESK, MANAGER
- **Parameters**: `status` (AVAILABLE, OCCUPIED, CLEANING, MAINTENANCE), `floor`, `pageable`

### 5. **POST /api/dashboard/front-desk/rooms**
- **الاستخدام**: إنشاء غرفة جديدة
- **الحالة**: ❌ غير مربوطة
- **الصفحة**: RoomsSection.tsx
- **الصلاحيات**: FRONT_DESK, MANAGER

### 6. **PUT /api/dashboard/front-desk/rooms/{id}**
- **الاستخدام**: تحديث بيانات الغرفة
- **الحالة**: ❌ غير مربوطة
- **الصفحة**: RoomsSection.tsx
- **الصلاحيات**: FRONT_DESK, MANAGER

### 7. **PATCH /api/dashboard/front-desk/rooms/{id}**
- **الاستخدام**: تحديث جزئي لبيانات الغرفة
- **الحالة**: ❌ غير مربوطة
- **الصفحة**: RoomsSection.tsx
- **الصلاحيات**: FRONT_DESK, MANAGER

### 8. **GET /api/dashboard/front-desk/stays**
- **الاستخدام**: جلب جميع الإقامات
- **الحالة**: ❌ غير مربوطة
- **الصفحة**: ReservationsSection.tsx
- **الصلاحيات**: FRONT_DESK, MANAGER
- **Parameters**: `status` (RESERVED, ACTIVE, CLOSED), `pageable`

### 9. **POST /api/dashboard/front-desk/stays**
- **الاستخدام**: إنشاء إقامة جديدة (Check-in)
- **الحالة**: ❌ غير مربوطة
- **الصفحة**: ReservationsSection.tsx
- **الصلاحيات**: FRONT_DESK, MANAGER

### 10. **PUT /api/dashboard/front-desk/stays/{stayId}/checkin**
- **الاستخدام**: تسجيل دخول النزيل
- **الحالة**: ❌ غير مربوطة
- **الصفحة**: ReservationsSection.tsx
- **الصلاحيات**: FRONT_DESK, MANAGER

### 11. **PUT /api/dashboard/front-desk/stays/{stayId}/checkout**
- **الاستخدام**: تسجيل خروج النزيل
- **الحالة**: ❌ غير مربوطة
- **الصفحة**: ReservationsSection.tsx
- **الصلاحيات**: FRONT_DESK, MANAGER

### 12. **GET /api/dashboard/front-desk/stays/{stayId}/orders**
- **الاستخدام**: جلب طلبات إقامة معينة
- **الحالة**: ❌ غير مربوطة
- **الصفحة**: ReservationsSection.tsx
- **الصلاحيات**: FRONT_DESK, MANAGER

### 13. **GET /api/dashboard/front-desk/stays/{stayId}/special-orders**
- **الاستخدام**: جلب الطلبات الخاصة لإقامة معينة
- **الحالة**: ❌ غير مربوطة
- **الصفحة**: ReservationsSection.tsx
- **الصلاحيات**: FRONT_DESK, MANAGER

### 14. **POST /api/dashboard/front-desk/stays/{stayId}/special-orders**
- **الاستخدام**: إنشاء طلب خاص لإقامة معينة
- **الحالة**: ❌ غير مربوطة
- **الصفحة**: ReservationsSection.tsx
- **الصلاحيات**: FRONT_DESK, MANAGER

### 15. **GET /api/dashboard/front-desk/stays/checkout-today**
- **الاستخدام**: جلب الإقامات التي ستخرج اليوم
- **الحالة**: ❌ غير مربوطة
- **الصفحة**: DashboardHome.tsx
- **الصلاحيات**: FRONT_DESK, MANAGER

### 16. **POST /api/dashboard/front-desk/special-offers**
- **الاستخدام**: إنشاء عرض خاص
- **الحالة**: ✅ مربوطة
- **الصفحة**: SpecialOffersModal.tsx
- **الصلاحيات**: FRONT_DESK, MANAGER

### 17. **PUT /api/dashboard/front-desk/special-offers/{id}**
- **الاستخدام**: تحديث عرض خاص
- **الحالة**: ✅ مربوطة
- **الصفحة**: SpecialOffersSection.tsx
- **الصلاحيات**: FRONT_DESK, MANAGER

### 18. **PATCH /api/dashboard/front-desk/special-offers/{id}**
- **الاستخدام**: تحديث جزئي لعرض خاص
- **الحالة**: ✅ مربوطة
- **الصفحة**: SpecialOffersSection.tsx
- **الصلاحيات**: FRONT_DESK, MANAGER

---

## 🛎️ Room Service APIs (خدمة الغرف)

### 19. **POST /api/dashboard/room-service/menu**
- **الاستخدام**: إنشاء عنصر قائمة لخدمة الغرف
- **الحالة**: ✅ مربوطة
- **الصفحة**: MenuItemModal.tsx
- **الصلاحيات**: FRONT_DESK, MANAGER

### 20. **PUT /api/dashboard/room-service/menu/{id}**
- **الاستخدام**: تحديث عنصر قائمة لخدمة الغرف
- **الحالة**: ❌ غير مربوطة
- **الصفحة**: MenuItemModal.tsx
- **الصلاحيات**: FRONT_DESK, MANAGER

### 21. **PATCH /api/dashboard/room-service/menu/{id}**
- **الاستخدام**: تحديث جزئي لعنصر قائمة لخدمة الغرف
- **الحالة**: ❌ غير مربوطة
- **الصفحة**: MenuItemModal.tsx
- **الصلاحيات**: FRONT_DESK, MANAGER

### 22. **PATCH /api/dashboard/room-service/orders/{orderId}/status**
- **الاستخدام**: تحديث حالة طلب خدمة الغرف
- **الحالة**: ❌ غير مربوطة
- **الصفحة**: HousekeepingSection.tsx
- **الصلاحيات**: FRONT_DESK, MANAGER

### 23. **GET /api/dashboard/room-service/stats**
- **الاستخدام**: جلب إحصائيات خدمة الغرف
- **الحالة**: ❌ غير مربوطة
- **الصفحة**: DashboardHome.tsx
- **الصلاحيات**: FRONT_DESK, MANAGER

### 24. **GET /api/dashboard/room-service/pending-orders**
- **الاستخدام**: جلب الطلبات المعلقة لخدمة الغرف
- **الحالة**: ❌ غير مربوطة
- **الصفحة**: HousekeepingSection.tsx
- **الصلاحيات**: FRONT_DESK, MANAGER

---

## 🍽️ Restaurant APIs (المطعم)

### 25. **POST /api/dashboard/restaurant/menu**
- **الاستخدام**: إنشاء عنصر قائمة للمطعم
- **الحالة**: ✅ مربوطة
- **الصفحة**: MenuItemModal.tsx
- **الصلاحيات**: FRONT_DESK, MANAGER

### 26. **PUT /api/dashboard/restaurant/menu/{id}**
- **الاستخدام**: تحديث عنصر قائمة للمطعم
- **الحالة**: ❌ غير مربوطة
- **الصفحة**: MenuItemModal.tsx
- **الصلاحيات**: FRONT_DESK, MANAGER

### 27. **PATCH /api/dashboard/restaurant/menu/{id}**
- **الاستخدام**: تحديث جزئي لعنصر قائمة للمطعم
- **الحالة**: ❌ غير مربوطة
- **الصفحة**: MenuItemModal.tsx
- **الصلاحيات**: FRONT_DESK, MANAGER

### 28. **PATCH /api/dashboard/restaurant/orders/{orderId}/status**
- **الاستخدام**: تحديث حالة طلب المطعم
- **الحالة**: ❌ غير مربوطة
- **الصفحة**: RestaurantSection.tsx
- **الصلاحيات**: FRONT_DESK, MANAGER

### 29. **GET /api/dashboard/restaurant/stats**
- **الاستخدام**: جلب إحصائيات المطعم
- **الحالة**: ❌ غير مربوطة
- **الصفحة**: DashboardHome.tsx
- **الصلاحيات**: FRONT_DESK, MANAGER

### 30. **GET /api/dashboard/restaurant/pending-orders**
- **الاستخدام**: جلب الطلبات المعلقة للمطعم
- **الحالة**: ❌ غير مربوطة
- **الصفحة**: RestaurantSection.tsx
- **الصلاحيات**: FRONT_DESK, MANAGER

---

## ☕ Cafe APIs (المقهى)

### 31. **POST /api/dashboard/cafe/menu**
- **الاستخدام**: إنشاء عنصر قائمة للمقهى
- **الحالة**: ✅ مربوطة
- **الصفحة**: MenuItemModal.tsx
- **الصلاحيات**: FRONT_DESK, MANAGER

### 32. **PUT /api/dashboard/cafe/menu/{id}**
- **الاستخدام**: تحديث عنصر قائمة للمقهى
- **الحالة**: ❌ غير مربوطة
- **الصفحة**: MenuItemModal.tsx
- **الصلاحيات**: FRONT_DESK, MANAGER

### 33. **PATCH /api/dashboard/cafe/menu/{id}**
- **الاستخدام**: تحديث جزئي لعنصر قائمة للمقهى
- **الحالة**: ❌ غير مربوطة
- **الصفحة**: MenuItemModal.tsx
- **الصلاحيات**: FRONT_DESK, MANAGER

### 34. **PATCH /api/dashboard/cafe/orders/{orderId}/status**
- **الاستخدام**: تحديث حالة طلب المقهى
- **الحالة**: ❌ غير مربوطة
- **الصفحة**: يمكن إضافة صفحة جديدة
- **الصلاحيات**: FRONT_DESK, MANAGER

---

## 👨‍💼 Manager APIs (الإدارة)

### 35. **GET /api/dashboard/manager/users**
- **الاستخدام**: جلب جميع المستخدمين
- **الحالة**: ❌ غير مربوطة
- **الصفحة**: StaffSection.tsx
- **الصلاحيات**: MANAGER
- **Parameters**: `pageable`

### 36. **POST /api/dashboard/manager/users**
- **الاستخدام**: إنشاء مستخدم جديد
- **الحالة**: ❌ غير مربوطة
- **الصفحة**: StaffSection.tsx
- **الصلاحيات**: MANAGER

### 37. **PUT /api/dashboard/manager/users/{id}**
- **الاستخدام**: تحديث بيانات المستخدم
- **الحالة**: ❌ غير مربوطة
- **الصفحة**: StaffSection.tsx
- **الصلاحيات**: MANAGER

### 38. **DELETE /api/dashboard/manager/users/{id}**
- **الاستخدام**: حذف مستخدم
- **الحالة**: ❌ غير مربوطة
- **الصفحة**: StaffSection.tsx
- **الصلاحيات**: MANAGER

### 39. **GET /api/dashboard/manager/employees**
- **الاستخدام**: جلب جميع الموظفين
- **الحالة**: ❌ غير مربوطة
- **الصفحة**: StaffSection.tsx
- **الصلاحيات**: MANAGER
- **Parameters**: `status` (ACTIVE, INACTIVE), `department`, `pageable`

### 40. **POST /api/dashboard/manager/employees**
- **الاستخدام**: إنشاء موظف جديد
- **الحالة**: ❌ غير مربوطة
- **الصفحة**: StaffSection.tsx
- **الصلاحيات**: MANAGER

### 41. **PUT /api/dashboard/manager/employees/{id}/status**
- **الاستخدام**: تحديث حالة الموظف
- **الحالة**: ❌ غير مربوطة
- **الصفحة**: StaffSection.tsx
- **الصلاحيات**: MANAGER

### 42. **GET /api/dashboard/manager/vips**
- **الاستخدام**: جلب النزلاء VIP
- **الحالة**: ❌ غير مربوطة
- **الصفحة**: GuestCRMSection.tsx
- **الصلاحيات**: MANAGER
- **Parameters**: `nationality`, `pageable`

### 43. **POST /api/dashboard/manager/vips**
- **الاستخدام**: إنشاء نزيل VIP
- **الحالة**: ❌ غير مربوطة
- **الصفحة**: GuestCRMSection.tsx
- **الصلاحيات**: MANAGER

### 44. **GET /api/dashboard/manager/stays**
- **الاستخدام**: جلب جميع الإقامات (منظور المدير)
- **الحالة**: ❌ غير مربوطة
- **الصفحة**: ReservationsSection.tsx
- **الصلاحيات**: MANAGER
- **Parameters**: `status` (RESERVED, ACTIVE, CLOSED), `pageable`

### 45. **GET /api/dashboard/manager/stays/rated**
- **الاستخدام**: جلب الإقامات التي تم تقييمها
- **الحالة**: ❌ غير مربوطة
- **الصفحة**: AnalyticsSection.tsx
- **الصلاحيات**: MANAGER
- **Parameters**: `pageable`

### 46. **GET /api/dashboard/manager/special-orders**
- **الاستخدام**: جلب جميع الطلبات الخاصة
- **الحالة**: ❌ غير مربوطة
- **الصفحة**: RequestsSection.tsx
- **الصلاحيات**: MANAGER
- **Parameters**: `pageable`

### 47. **GET /api/dashboard/manager/overview**
- **الاستخدام**: جلب نظرة عامة على الفندق
- **الحالة**: ❌ غير مربوطة
- **الصفحة**: DashboardHome.tsx
- **الصلاحيات**: MANAGER

### 48. **GET /api/dashboard/manager/occupancy**
- **الاستخدام**: جلب معدلات الإشغال
- **الحالة**: ❌ غير مربوطة
- **الصفحة**: AnalyticsSection.tsx
- **الصلاحيات**: MANAGER

---

## 👤 Guest APIs (النزلاء)

### 49. **GET /api/guest/menu**
- **الاستخدام**: جلب القائمة للنزلاء
- **الحالة**: ❌ غير مربوطة
- **الصفحة**: RestaurantSection.tsx
- **الصلاحيات**: جميع المستخدمين
- **Parameters**: `category`, `pageable`

### 50. **GET /api/guest/special-offers**
- **الاستخدام**: جلب العروض الخاصة للنزلاء
- **الحالة**: ✅ مربوطة
- **الصفحة**: SpecialOffersSection.tsx
- **الصلاحيات**: جميع المستخدمين
- **Parameters**: `pageable`

### 51. **GET /api/guest/stay-details**
- **الاستخدام**: جلب تفاصيل إقامة النزيل
- **الحالة**: ❌ غير مربوطة
- **الصفحة**: GuestsSection.tsx
- **الصلاحيات**: جميع المستخدمين
- **Parameters**: `roomNumber`

### 52. **GET /api/guest/stays/special-orders**
- **الاستخدام**: جلب الطلبات الخاصة للنزيل
- **الحالة**: ❌ غير مربوطة
- **الصفحة**: RequestsSection.tsx
- **الصلاحيات**: جميع المستخدمين
- **Parameters**: `roomNumber`

### 53. **GET /api/guest/orders**
- **الاستخدام**: جلب طلبات النزيل
- **الحالة**: ✅ مربوطة
- **الصفحة**: RestaurantSection.tsx
- **الصلاحيات**: جميع المستخدمين
- **Parameters**: `roomNumber`, `pageable`

### 54. **POST /api/guest/orders**
- **الاستخدام**: إنشاء طلب جديد للنزيل
- **الحالة**: ✅ مربوطة
- **الصفحة**: CreateOrderModal.tsx
- **الصلاحيات**: جميع المستخدمين
- **Parameters**: `roomNumber`

### 55. **GET /api/guest/orders/{orderId}**
- **الاستخدام**: جلب تفاصيل طلب معين
- **الحالة**: ✅ مربوطة
- **الصفحة**: RestaurantSection.tsx
- **الصلاحيات**: جميع المستخدمين
- **Parameters**: `orderId`, `roomNumber`

### 56. **POST /api/guest/orders/{orderId}/cancel**
- **الاستخدام**: إلغاء طلب
- **الحالة**: ✅ مربوطة
- **الصفحة**: RestaurantSection.tsx
- **الصلاحيات**: جميع المستخدمين
- **Parameters**: `orderId`, `roomNumber`

### 57. **PUT /api/guest/stay/rating**
- **الاستخدام**: تقييم الإقامة
- **الحالة**: ❌ غير مربوطة
- **الصفحة**: GuestsSection.tsx
- **الصلاحيات**: جميع المستخدمين
- **Parameters**: `roomNumber`

---

## 📡 Event APIs (الأحداث)

### 58. **GET /api/events/subscribe**
- **الاستخدام**: الاشتراك في الأحداث الحية (Server-Sent Events)
- **الحالة**: ❌ غير مربوطة
- **الصفحة**: يمكن استخدامها للتحديثات الحية
- **الصلاحيات**: جميع المستخدمين
- **Parameters**: `Last-Event-ID` (header)

---

## 📊 ملخص حالة الربط

| الفئة | عدد الـ APIs | مربوطة | غير مربوطة |
|-------|-------------|--------|-----------|
| Authentication | 3 | 2 | 1 |
| Front Desk | 15 | 3 | 12 |
| Room Service | 6 | 1 | 5 |
| Restaurant | 6 | 1 | 5 |
| Cafe | 4 | 1 | 3 |
| Manager | 14 | 0 | 14 |
| Guest | 9 | 4 | 5 |
| Event | 1 | 0 | 1 |
| **المجموع** | **58** | **12** | **46** |

---

## 🎯 الأولويات المقترحة للربط

### 🔥 عالية الأولوية (مهمة جداً)
1. **GET /api/dashboard/front-desk/rooms** - لعرض الغرف الحقيقية
2. **GET /api/dashboard/front-desk/stays** - لعرض الإقامات الحقيقية
3. **POST /api/dashboard/front-desk/stays** - لإنشاء إقامات جديدة
4. **GET /api/dashboard/manager/overview** - للإحصائيات الرئيسية
5. **GET /api/dashboard/manager/occupancy** - لمعدلات الإشغال

### ⚡ متوسطة الأولوية (مهمة)
6. **GET /api/dashboard/manager/users** - لإدارة المستخدمين
7. **GET /api/dashboard/manager/employees** - لإدارة الموظفين
8. **GET /api/dashboard/restaurant/stats** - لإحصائيات المطعم
9. **GET /api/dashboard/room-service/stats** - لإحصائيات خدمة الغرف
10. **GET /api/guest/menu** - لعرض القائمة للنزلاء

### 📌 منخفضة الأولوية (تحسينات)
11. **GET /api/events/subscribe** - للتحديثات الحية
12. **GET /api/dashboard/manager/vips** - لإدارة النزلاء VIP
13. **GET /api/dashboard/manager/stays/rated** - للتقييمات
14. **PUT /api/guest/stay/rating** - لتقييم الإقامات

---

## 💡 ملاحظات مهمة

### الصلاحيات المطلوبة
- **FRONT_DESK**: يمكنه الوصول لـ Front Desk, Room Service, Restaurant, Cafe APIs
- **MANAGER**: يمكنه الوصول لجميع الـ APIs
- **GUEST**: يمكنه الوصول فقط لـ Guest APIs

### المتطلبات
- بعض الـ APIs تتطلب وجود إقامة نشطة للغرفة
- بعض الـ APIs تتطلب صلاحيات محددة
- جميع الـ APIs تتطلب JWT token للمصادقة

### التحديات المحتملة
- **Active Stay Error**: بعض الـ APIs تتطلب إقامة نشطة للغرفة قبل العمل
- **Authentication Error**: الـ token قد ينتهي صلاحيته ويحتاج تحديث
- **Permission Error**: بعض الـ APIs تتطلب صلاحيات MANAGER

---

## 🚀 خطة العمل المقترحة

### المرحلة 1: الأساسيات (مهمة جداً)
1. ربط Front Desk APIs للغرف والإقامات
2. ربط Manager Overview للإحصائيات الرئيسية
3. ربط Guest Menu لعرض القائمة

### المرحلة 2: الإدارة (مهمة)
4. ربط Manager Users و Employees APIs
5. ربط Restaurant و Room Service Stats
6. ربط Update APIs للقوائم

### المرحلة 3: التحسينات (اختياري)
7. ربط Event API للتحديثات الحية
8. ربط VIP و Rating APIs
9. تحسين معالجة الأخطاء والتحديث التلقائي للـ token
