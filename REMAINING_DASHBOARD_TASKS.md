# المهام المتبقية في الداشبورد - APIs و Frontend

## ملخص
تحليل شامل للمهام المتبقية في الداشبورد التي تحتاج للربط مع الـ backend والتعديلات المطلوبة في الـ frontend.

---

## 1. APIs المتبقية للربط في الداشبورد

### Front Desk (الاستقبال)
- **GET /api/dashboard/front-desk/stays/checkin-today** - الحجوزات القادمة اليوم
- **PUT /api/dashboard/front-desk/special-offers/{id}** - تحديث عرض خاص
- **PUT /api/dashboard/front-desk/rooms/{id}** - تحديث غرفة كاملة

### Room Service (خدمة الغرف)
- **GET /api/dashboard/room-service/menu** - قائمة خدمة الغرف
- **PUT /api/dashboard/room-service/menu/{id}** - تحديث عنصر في القائمة
- **GET /api/dashboard/room-service/stats** - إحصائيات خدمة الغرف
- **GET /api/dashboard/room-service/pending-orders** - الطلبات المعلقة
- **PATCH /api/dashboard/room-service/orders/{orderId}/status** - تحديث حالة طلب

### Restaurant (المطعم)
- **GET /api/dashboard/restaurant/menu** - قائمة المطعم
- **PUT /api/dashboard/restaurant/menu/{id}** - تحديث عنصر في القائمة
- **GET /api/dashboard/restaurant/stats** - إحصائيات المطعم
- **GET /api/dashboard/restaurant/pending-orders** - الطلبات المعلقة
- **PATCH /api/dashboard/restaurant/orders/{orderId}/status** - تحديث حالة طلب

### Cafe (المقهى)
- **GET /api/dashboard/cafe/menu** - قائمة المقهى
- **PUT /api/dashboard/cafe/menu/{id}** - تحديث عنصر في القائمة
- **GET /api/dashboard/cafe/stats** - إحصائيات المقهى
- **GET /api/dashboard/cafe/pending-orders** - الطلبات المعلقة
- **PATCH /api/dashboard/cafe/orders/{orderId}/status** - تحديث حالة طلب

### Manager (الإدارة)
- **GET /api/dashboard/manager/users** - إدارة المستخدمين
- **PUT /api/dashboard/manager/users/{id}** - تحديث مستخدم
- **GET /api/dashboard/manager/employees** - إدارة الموظفين
- **PUT /api/dashboard/manager/employees/{id}/status** - تحديث حالة موظف
- **GET /api/dashboard/manager/vips** - النزلاء VIP
- **GET /api/dashboard/manager/stays/rated** - الحجوزات المقيّمة
- **GET /api/dashboard/manager/special-orders** - الطلبات الخاصة

---

## 2. الصفحات التي تحتاج للإضافة في Frontend

### صفحات جديدة (غير موجودة حالياً)

#### 1. إدارة المستخدمين (Users Management)
- **الصفحة**: صفحة جديدة لإدارة المستخدمين
- **الوظائف**:
  - عرض قائمة المستخدمين
  - إضافة مستخدم جديد
  - تعديل بيانات مستخدم
  - حذف مستخدم
  - تحديث حالة المستخدم
- **APIs المطلوبة**:
  - GET /api/dashboard/manager/users
  - PUT /api/dashboard/manager/users/{id}

#### 2. إدارة الموظفين (Employees Management)
- **الصفحة**: صفحة جديدة لإدارة الموظفين
- **الوظائف**:
  - عرض قائمة الموظفين
  - إضافة موظف جديد
  - تعديل بيانات موظف
  - تحديث حالة موظف (نشط/غير نشط)
- **APIs المطلوبة**:
  - GET /api/dashboard/manager/employees
  - PUT /api/dashboard/manager/employees/{id}/status

#### 3. النزلاء VIP (VIP Guests)
- **الصفحة**: صفحة جديدة للنزلاء VIP
- **الوظائف**:
  - عرض قائمة النزلاء VIP
  - عرض تفاصيل كل نزيل VIP
  - تتبع خدمات النزلاء VIP
- **APIs المطلوبة**:
  - GET /api/dashboard/manager/vips

#### 4. التقييمات (Ratings)
- **الصفحة**: صفحة جديدة للتقييمات
- **الوظائف**:
  - عرض تقييمات الحجوزات
  - عرض متوسط التقييمات
  - تحليل التقييمات
- **APIs المطلوبة**:
  - GET /api/dashboard/manager/stays/rated

#### 5. الطلبات الخاصة (Special Orders Management)
- **الصفحة**: صفحة جديدة للطلبات الخاصة
- **الوظائف**:
  - عرض جميع الطلبات الخاصة
  - قبول/رفض الطلبات الخاصة
  - تحديث حالة الطلبات الخاصة
- **APIs المطلوبة**:
  - GET /api/dashboard/manager/special-orders

#### 6. الحجوزات القادمة اليوم (Today's Arrivals)
- **الصفحة**: صفحة جديدة للحجوزات القادمة اليوم
- **الوظائف**:
  - عرض الحجوزات القادمة اليوم
  - تحضير الغرف
  - تسجيل الدخول السريع
- **APIs المطلوبة**:
  - GET /api/dashboard/front-desk/stays/checkin-today

#### 7. إحصائيات خدمة الغرف (Room Service Stats)
- **الصفحة**: صفحة جديدة لإحصائيات خدمة الغرف
- **الوظائف**:
  - عرض إحصائيات المبيعات
  - عرض أكثر العناصر مبيعاً
  - عرض الإيرادات اليومية
- **APIs المطلوبة**:
  - GET /api/dashboard/room-service/stats

#### 8. إحصائيات المطعم (Restaurant Stats)
- **الصفحة**: صفحة جديدة لإحصائيات المطعم
- **الوظائف**:
  - عرض إحصائيات المبيعات
  - عرض أكثر العناصر مبيعاً
  - عرض الإيرادات اليومية
- **APIs المطلوبة**:
  - GET /api/dashboard/restaurant/stats

#### 9. إحصائيات المقهى (Cafe Stats)
- **الصفحة**: صفحة جديدة لإحصائيات المقهى
- **الوظائف**:
  - عرض إحصائيات المبيعات
  - عرض أكثر العناصر مبيعاً
  - عرض الإيرادات اليومية
- **APIs المطلوبة**:
  - GET /api/dashboard/cafe/stats

#### 10. الطلبات المعلقة (Pending Orders)
- **الصفحة**: صفحة جديدة للطلبات المعلقة
- **الوظائف**:
  - عرض الطلبات المعلقة لكل قسم
  - تحديث حالة الطلبات
  - قبول/رفض الطلبات
- **APIs المطلوبة**:
  - GET /api/dashboard/room-service/pending-orders
  - GET /api/dashboard/restaurant/pending-orders
  - GET /api/dashboard/cafe/pending-orders
  - PATCH /api/dashboard/room-service/orders/{orderId}/status
  - PATCH /api/dashboard/restaurant/orders/{orderId}/status
  - PATCH /api/dashboard/cafe/orders/{orderId}/status

---

## 3. الصفحات الموجودة التي تحتاج للتعديل

### 1. SpecialOffersSection (العروض الخاصة)
- **التعديلات المطلوبة**:
  - إضافة زر تعديل العرض
  - ربط PUT /api/dashboard/front-desk/special-offers/{id}
  - تحديث المودال ليدعم التعديل
- **الوظائف الجديدة**:
  - تعديل العروض الموجودة
  - تحديث الأسعار والتفاصيل

### 2. RoomsSection (الغرف)
- **التعديلات المطلوبة**:
  - إضافة زر تعديل الغرفة
  - ربط PUT /api/dashboard/front-desk/rooms/{id}
  - تحديث المودال ليدعم التعديل
- **الوظائف الجديدة**:
  - تعديل بيانات الغرف
  - تحديث الحالة والسعر

### 3. RestaurantSection (المطعم)
- **التعديلات المطلوبة**:
  - إضافة عرض القائمة الكاملة
  - ربط GET /api/dashboard/restaurant/menu
  - إضافة زر تعديل العنصر
  - ربط PUT /api/dashboard/restaurant/menu/{id}
  - إضافة قسم الإحصائيات
  - ربط GET /api/dashboard/restaurant/stats
  - إضافة قسم الطلبات المعلقة
  - ربط GET /api/dashboard/restaurant/pending-orders
  - إضافة تحديث حالة الطلبات
  - ربط PATCH /api/dashboard/restaurant/orders/{orderId}/status
- **الوظائف الجديدة**:
  - عرض القائمة الكاملة
  - تعديل العناصر
  - عرض الإحصائيات
  - إدارة الطلبات المعلقة

### 4. RoomServiceSection (خدمة الغرف)
- **التعديلات المطلوبة**:
  - إضافة عرض القائمة الكاملة
  - ربط GET /api/dashboard/room-service/menu
  - إضافة زر تعديل العنصر
  - ربط PUT /api/dashboard/room-service/menu/{id}
  - إضافة قسم الإحصائيات
  - ربط GET /api/dashboard/room-service/stats
  - إضافة قسم الطلبات المعلقة
  - ربط GET /api/dashboard/room-service/pending-orders
  - إضافة تحديث حالة الطلبات
  - ربط PATCH /api/dashboard/room-service/orders/{orderId}/status
- **الوظائف الجديدة**:
  - عرض القائمة الكاملة
  - تعديل العناصر
  - عرض الإحصائيات
  - إدارة الطلبات المعلقة

### 5. CafeSection (المقهى)
- **التعديلات المطلوبة**:
  - إضافة عرض القائمة الكاملة
  - ربط GET /api/dashboard/cafe/menu
  - إضافة زر تعديل العنصر
  - ربط PUT /api/dashboard/cafe/menu/{id}
  - إضافة قسم الإحصائيات
  - ربط GET /api/dashboard/cafe/stats
  - إضافة قسم الطلبات المعلقة
  - ربط GET /api/dashboard/cafe/pending-orders
  - إضافة تحديث حالة الطلبات
  - ربط PATCH /api/dashboard/cafe/orders/{orderId}/status
- **الوظائف الجديدة**:
  - عرض القائمة الكاملة
  - تعديل العناصر
  - عرض الإحصائيات
  - إدارة الطلبات المعلقة

### 6. ReservationsSection (الحجوزات)
- **التعديلات المطلوبة**:
  - إضافة قسم الحجوزات القادمة اليوم
  - ربط GET /api/dashboard/front-desk/stays/checkin-today
  - إضافة تبويب خاص للحجوزات القادمة
- **الوظائف الجديدة**:
  - عرض الحجوزات القادمة اليوم
  - تحضير الغرف للحجوزات القادمة

---

## 4. الأولويات المقترحة

### عالية الأولوية (مهمة جداً)
1. **إدارة الموظفين والمستخدمين** - ضرورية لإدارة النظام
2. **الطلبات المعلقة** - ضرورية لخدمة العملاء
3. **الحجوزات القادمة اليوم** - ضرورية لتحضير الغرف
4. **إحصائيات الأقسام** - ضرورية للمتابعة

### متوسطة الأولوية
1. **تعديل العروض الخاصة** - مهم لتحديث العروض
2. **تعديل الغرف** - مهم لتحديث بيانات الغرف
3. **تعديل القوائم** - مهم لتحديث العناصر
4. **النزلاء VIP** - مهم لخدمة العملاء المميزين

### منخفضة الأولوية
1. **التقييمات** - مفيد للتحليل
2. **الطلبات الخاصة** - مفيد للإدارة
3. **تقارير متقدمة** - مفيد للتحليل

---

## 5. ملخص التغييرات المطلوبة في Frontend

### صفحات جديدة (10 صفحات)
1. Users Management
2. Employees Management
3. VIP Guests
4. Ratings
5. Special Orders Management
6. Today's Arrivals
7. Room Service Stats
8. Restaurant Stats
9. Cafe Stats
10. Pending Orders

### صفحات معدلة (6 صفحات)
1. SpecialOffersSection - إضافة تعديل العروض
2. RoomsSection - إضافة تعديل الغرف
3. RestaurantSection - إضافة قائمة كاملة، إحصائيات، طلبات معلقة
4. RoomServiceSection - إضافة قائمة كاملة، إحصائيات، طلبات معلقة
5. CafeSection - إضافة قائمة كاملة، إحصائيات، طلبات معلقة
6. ReservationsSection - إضافة الحجوزات القادمة اليوم

### APIs المتبقية للربط (22 API)
- Front Desk: 3 APIs
- Room Service: 5 APIs
- Restaurant: 5 APIs
- Cafe: 5 APIs
- Manager: 4 APIs

---

## 6. التوصيات

### الخطوات التالية المقترحة
1. البدء بإدارة الموظفين والمستخدمين (الأهم)
2. إضافة صفحة الطلبات المعلقة (ضرورية للعمليات)
3. إضافة صفحة الحجوزات القادمة اليوم (ضرورية للاستقبال)
4. تحديث الصفحات الموجودة بإضافة وظائف التعديل
5. إضافة صفحات الإحصائيات للمتابعة
6. إضافة الصفحات المتبقية حسب الحاجة

### ملاحظات مهمة
- جميع الـ APIs المذكورة موجودة في api-docs.yaml
- الـ backend هو المرجع الأساسي لأي إضافة
- يجب التأكد من توافق الـ types مع الـ backend
- يجب اختبار كل API بعد الربط
- يجب معالجة الأخطاء بشكل صحيح
