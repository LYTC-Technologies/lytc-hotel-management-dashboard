# تحليل شامل لـ APIs المتاحة - Dashboard vs Guest Portal

## ملخص
تحليل شامل لجميع الـ APIs المتاحة في الـ backend لتحديد:
- APIs المناسبة للـ Guest Portal (للنزلاء)
- APIs المناسبة للـ Dashboard (للموظفين والإدارة)
- APIs المفقودة في الـ Dashboard الحالي
- الصفحات الإضافية المطلوبة في الـ Dashboard

---

## 1. APIs للـ Guest Portal (للنزلاء)

### Authentication & Profile
- **POST /api/auth/login** - تسجيل الدخول (مشترك)
- **POST /api/auth/refresh** - تجديد التوكن (مشترك)
- **POST /api/auth/logout** - تسجيل الخروج (مشترك)

### Stay Management
- **GET /api/guest/stay-details** - الحصول على تفاصيل الإقامة الحالية
- **PUT /api/guest/stay/rating** - تقييم الإقامة

### Orders Management
- **GET /api/guest/orders** - الحصول على طلبات النزيل
- **GET /api/guest/orders/{orderId}** - الحصول على تفاصيل طلب محدد
- **POST /api/guest/orders/{orderId}/cancel** - إلغاء طلب

### Special Offers
- **GET /api/guest/special-offers** - الحصول على العروض الخاصة المتاحة للنزلاء
- **GET /api/guest/stays/special-orders** - الحصول على الطلبات الخاصة للنزيل

### Menu
- **GET /api/guest/menu** - الحصول على القائمة (مشترك)

### Real-time Updates
- **GET /api/events/subscribe** - الاشتراك في الأحداث الحية (SSE)

---

## 2. APIs للـ Dashboard (للموظفين والإدارة)

### Authentication & Profile
- **POST /api/auth/login** - تسجيل الدخول (مشترك)
- **POST /api/auth/refresh** - تجديد التوكن (مشترك)
- **POST /api/auth/logout** - تسجيل الخروج (مشترك)

### Front Desk (الاستقبال)
- **GET /api/dashboard/front-desk/stays** - الحصول على جميع الحجوزات ✅ (تم الربط)
- **POST /api/dashboard/front-desk/stays** - إنشاء حجز جديد ✅ (تم الربط)
- **PUT /api/dashboard/front-desk/stays/{stayId}/checkin** - تسجيل دخول ✅ (تم الربط)
- **PUT /api/dashboard/front-desk/stays/{stayId}/checkout** - تسجيل خروج ✅ (تم الربط)
- **GET /api/dashboard/front-desk/stays/{stayId}/orders** - الحصول على طلبات حجز محدد ✅ (تم الربط)
- **GET /api/dashboard/front-desk/stays/{stayId}/special-orders** - الحصول على الطلبات الخاصة لحجز محدد ✅ (تم الربط)
- **POST /api/dashboard/front-desk/stays/{stayId}/special-orders** - إنشاء طلب خاص لحجز محدد ✅ (تم الربط)
- **GET /api/dashboard/front-desk/stays/checkout-today** - الحصول على الحجوزات المغادرة اليوم ✅ (تم الربط)
- **GET /api/dashboard/front-desk/stays/checkin-today** - الحصول على الحجوزات القادمة اليوم ❌ (لم يتم الربط)
- **POST /api/dashboard/front-desk/special-offers** - إنشاء عرض خاص ✅ (تم الربط)
- **PUT /api/dashboard/front-desk/special-offers/{id}** - تحديث عرض خاص ❌ (لم يتم الربط)
- **GET /api/dashboard/front-desk/special-offers** - الحصول على العروض الخاصة ✅ (تم الربط)
- **GET /api/dashboard/front-desk/rooms** - الحصول على الغرف ✅ (تم الربط)
- **POST /api/dashboard/front-desk/rooms** - إنشاء غرفة ✅ (تم الربط)
- **PUT /api/dashboard/front-desk/rooms/{id}** - تحديث غرفة ❌ (لم يتم الربط)
- **PATCH /api/dashboard/front-desk/rooms/{id}** - تحديث جزئي لغرفة ✅ (تم الربط)

### Room Service (خدمة الغرف)
- **GET /api/dashboard/room-service/menu** - الحصول على قائمة خدمة الغرف ❌ (لم يتم الربط)
- **POST /api/dashboard/room-service/menu** - إضافة عنصر لقائمة خدمة الغرف ✅ (تم الربط)
- **PUT /api/dashboard/room-service/menu/{id}** - تحديث عنصر في قائمة خدمة الغرف ❌ (لم يتم الربط)
- **PATCH /api/dashboard/room-service/menu/{id}** - تحديث جزئي لعنصر في قائمة خدمة الغرف ✅ (تم الربط)
- **GET /api/dashboard/room-service/stats** - الحصول على إحصائيات خدمة الغرف ❌ (لم يتم الربط)
- **GET /api/dashboard/room-service/pending-orders** - الحصول على الطلبات المعلقة ❌ (لم يتم الربط)
- **PATCH /api/dashboard/room-service/orders/{orderId}/status** - تحديث حالة طلب خدمة الغرف ❌ (لم يتم الربط)

### Restaurant (المطعم)
- **GET /api/dashboard/restaurant/menu** - الحصول على قائمة المطعم ❌ (لم يتم الربط)
- **POST /api/dashboard/restaurant/menu** - إضافة عنصر لقائمة المطعم ✅ (تم الربط)
- **PUT /api/dashboard/restaurant/menu/{id}** - تحديث عنصر في قائمة المطعم ❌ (لم يتم الربط)
- **PATCH /api/dashboard/restaurant/menu/{id}** - تحديث جزئي لعنصر في قائمة المطعم ✅ (تم الربط)
- **GET /api/dashboard/restaurant/stats** - الحصول على إحصائيات المطعم ❌ (لم يتم الربط)
- **GET /api/dashboard/restaurant/pending-orders** - الحصول على الطلبات المعلقة ❌ (لم يتم الربط)
- **PATCH /api/dashboard/restaurant/orders/{orderId}/status** - تحديث حالة طلب المطعم ❌ (لم يتم الربط)

### Cafe (المقهى)
- **GET /api/dashboard/cafe/menu** - الحصول على قائمة المقهى ❌ (لم يتم الربط)
- **POST /api/dashboard/cafe/menu** - إضافة عنصر لقائمة المقهى ✅ (تم الربط)
- **PUT /api/dashboard/cafe/menu/{id}** - تحديث عنصر في قائمة المقهى ❌ (لم يتم الربط)
- **PATCH /api/dashboard/cafe/menu/{id}** - تحديث جزئي لعنصر في قائمة المقهى ✅ (تم الربط)
- **GET /api/dashboard/cafe/stats** - الحصول على إحصائيات المقهى ❌ (لم يتم الربط)
- **GET /api/dashboard/cafe/pending-orders** - الحصول على الطلبات المعلقة ❌ (لم يتم الربط)
- **PATCH /api/dashboard/cafe/orders/{orderId}/status** - تحديث حالة طلب المقهى ❌ (لم يتم الربط)

### Manager (الإدارة)
- **GET /api/dashboard/manager/users** - الحصول على المستخدمين ❌ (لم يتم الربط)
- **PUT /api/dashboard/manager/users/{id}** - تحديث مستخدم ❌ (لم يتم الربط)
- **GET /api/dashboard/manager/employees** - الحصول على الموظفين ❌ (لم يتم الربط)
- **PUT /api/dashboard/manager/employees/{id}/status** - تحديث حالة موظف ❌ (لم يتم الربط)
- **GET /api/dashboard/manager/vips** - الحصول على النزلاء VIP ❌ (لم يتم الربط)
- **GET /api/dashboard/manager/stays/rated** - الحصول على الحجوزات المقيّمة ❌ (لم يتم الربط)
- **GET /api/dashboard/manager/special-orders** - الحصول على الطلبات الخاصة ❌ (لم يتم الربط)

---

## 3. APIs المشتركة (يمكن استخدامها في كلا النظامين)

- **POST /api/auth/login** - تسجيل الدخول
- **POST /api/auth/refresh** - تجديد التوكن
- **POST /api/auth/logout** - تسجيل الخروج
- **GET /api/guest/menu** - الحصول على القائمة

---

## 4. APIs المفقودة في الـ Dashboard الحالي

### Front Desk
- **GET /api/dashboard/front-desk/stays/checkin-today** - الحجوزات القادمة اليوم
- **PUT /api/dashboard/front-desk/special-offers/{id}** - تحديث عرض خاص

### Room Service
- **GET /api/dashboard/room-service/menu** - قائمة خدمة الغرف
- **PUT /api/dashboard/room-service/menu/{id}** - تحديث عنصر
- **GET /api/dashboard/room-service/stats** - إحصائيات
- **GET /api/dashboard/room-service/pending-orders** - الطلبات المعلقة
- **PATCH /api/dashboard/room-service/orders/{orderId}/status** - تحديث حالة الطلب

### Restaurant
- **GET /api/dashboard/restaurant/menu** - قائمة المطعم
- **PUT /api/dashboard/restaurant/menu/{id}** - تحديث عنصر
- **GET /api/dashboard/restaurant/stats** - إحصائيات
- **GET /api/dashboard/restaurant/pending-orders** - الطلبات المعلقة
- **PATCH /api/dashboard/restaurant/orders/{orderId}/status** - تحديث حالة الطلب

### Cafe
- **GET /api/dashboard/cafe/menu** - قائمة المقهى
- **PUT /api/dashboard/cafe/menu/{id}** - تحديث عنصر
- **GET /api/dashboard/cafe/stats** - إحصائيات
- **GET /api/dashboard/cafe/pending-orders** - الطلبات المعلقة
- **PATCH /api/dashboard/cafe/orders/{orderId}/status** - تحديث حالة الطلب

### Manager
- **GET /api/dashboard/manager/users** - إدارة المستخدمين
- **PUT /api/dashboard/manager/users/{id}** - تحديث مستخدم
- **GET /api/dashboard/manager/employees** - إدارة الموظفين
- **PUT /api/dashboard/manager/employees/{id}/status** - تحديث حالة موظف
- **GET /api/dashboard/manager/vips** - النزلاء VIP
- **GET /api/dashboard/manager/stays/rated** - الحجوزات المقيّمة
- **GET /api/dashboard/manager/special-orders** - الطلبات الخاصة

---

## 5. الصفحات الإضافية المطلوبة في الـ Dashboard

### صفحات إدارة الموظفين (Manager)
- **إدارة المستخدمين** - إضافة، تعديل، حذف المستخدمين
- **إدارة الموظفين** - إضافة، تعديل، حذف الموظفين، تحديث الحالة
- **النزلاء VIP** - عرض وإدارة النزلاء VIP
- **التقييمات** - عرض تقييمات الحجوزات
- **الطلبات الخاصة** - عرض وإدارة الطلبات الخاصة

### صفحات إحصائيات إضافية
- **إحصائيات خدمة الغرف** - عرض إحصائيات مفصلة
- **إحصائيات المطعم** - عرض إحصائيات مفصلة
- **إحصائيات المقهى** - عرض إحصائيات مفصلة

### صفحات إدارة الطلبات
- **الطلبات المعلقة** - عرض وإدارة الطلبات المعلقة لكل قسم
- **تحديث حالة الطلبات** - واجهة لتحديث حالة الطلبات

### صفحات إدارة القوائم
- **عرض القوائم** - عرض قوائم كاملة لكل قسم (خدمة الغرف، المطعم، المقهى)
- **تحديث العناصر** - واجهة لتحديث العناصر في القوائم

---

## 6. التوصيات

### للـ Guest Portal
- استخدام جميع الـ APIs الموجودة تحت `/api/guest/`
- إضافة صفحة تقييم الإقامة (Rating)
- إضافة صفحة الطلبات الخاصة للنزيل
- تحسين واجهة عرض تفاصيل الإقامة

### للـ Dashboard
- إضافة صفحات إدارة الموظفين والمستخدمين
- إضافة صفحات الإحصائيات المفصلة لكل قسم
- إضافة صفحة الطلبات المعلقة
- إضافة صفحة الحجوزات القادمة اليوم
- إضافة صفحة تحديث العروض الخاصة
- إضافة صفحة النزلاء VIP
- إضافة صفحة التقييمات

---

## 7. الأولويات المقترحة

### عالية الأولوية
1. إضافة صفحات إدارة الموظفين والمستخدمين
2. إضافة صفحات الإحصائيات المفصلة
3. إضافة صفحة الطلبات المعلقة
4. إضافة صفحة الحجوزات القادمة اليوم

### متوسطة الأولوية
1. إضافة صفحة النزلاء VIP
2. إضافة صفحة التقييمات
3. إضافة صفحة تحديث العروض الخاصة
4. إضافة صفحة عرض القوائم الكاملة

### منخفضة الأولوية
1. تحسين واجهة تحديث العناصر في القوائم
2. إضافة تقارير متقدمة
3. إضافة تحليلات البيانات
