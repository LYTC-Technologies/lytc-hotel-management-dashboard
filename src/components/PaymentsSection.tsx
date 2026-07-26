import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CreditCard, DollarSign, AlertCircle, RefreshCw, X, Loader2, Building, User,
  Calendar, CheckCircle2, Clock, Package, ShoppingBag, ChevronDown, ChevronUp
} from 'lucide-react';
import { apiService } from '../services/api';

const CATEGORY_LABELS: Record<string, string> = {
  'FOOD': 'طعام', 'DRINK': 'مشروبات', 'SERVICE': 'خدمة الغرف', 'ROOM_SERVICE': 'خدمة الغرف',
};

export default function PaymentsSection({ refreshKey }: { refreshKey?: number }) {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [detailOrders, setDetailOrders] = useState<any[]>([]);
  const [detailSpecialOrders, setDetailSpecialOrders] = useState<any[]>([]);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  useEffect(() => { loadCheckOutStays(); }, [refreshKey]);

  const loadCheckOutStays = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiService.getStaysCheckOutToday(0, 50);
      const transformedInvoices = (response.content || []).map((stay: any) => ({
        id: stay.stayId?.toString() || '-',
        stayId: stay.stayId,
        guestName: stay.guestName || '-',
        roomNumber: stay.roomNumber || '-',
        amount: stay.totalCharge || 0,
        status: 'unpaid',
        checkInDate: stay.checkInTime ? new Date(stay.checkInTime).toLocaleDateString('ar-SA', { calendar: 'gregory' }) : 'غير متاح',
        checkOutDate: stay.checkOutTime ? new Date(stay.checkOutTime).toLocaleDateString('ar-SA', { calendar: 'gregory' }) : (stay.expectedCheckOutDate ? new Date(stay.expectedCheckOutDate).toLocaleDateString('ar-SA', { calendar: 'gregory' }) : 'غير متاح'),
        nights: stay.checkInTime && stay.expectedCheckOutDate ? Math.ceil((new Date(stay.expectedCheckOutDate).getTime() - new Date(stay.checkInTime).getTime()) / 86400000) : 0,
        guestPhone: stay.guestPhone || 'غير متاح',
        roomCharge: stay.roomCharge || 0,
        totalCharge: stay.totalCharge || 0,
      }));
      setInvoices(transformedInvoices);
    } catch (error: any) {
      setError('فشل تحميل بيانات المغادرين اليوم');
      setInvoices([]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadInvoiceDetails = async (inv: any) => {
    setSelectedInvoice(inv);
    setLoadingDetail(true);
    setDetailOrders([]);
    setDetailSpecialOrders([]);
    try {
      const [orders, specialOrders] = await Promise.allSettled([
        apiService.getStayOrders(inv.stayId),
        apiService.getStaySpecialOrders(inv.stayId),
      ]);
      if (orders.status === 'fulfilled') setDetailOrders(orders.value || []);
      if (specialOrders.status === 'fulfilled') setDetailSpecialOrders(specialOrders.value || []);
    } catch (error) {
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleTogglePaymentStatus = async (inv: any) => {
    const newStatus = inv.status === 'paid' ? 'unpaid' : 'paid';
    setUpdatingStatus(inv.id);
    try {
      // Update local state immediately
      setInvoices(prev => prev.map(i => i.id === inv.id ? { ...i, status: newStatus } : i));
      if (selectedInvoice?.id === inv.id) {
        setSelectedInvoice((prev: any) => prev ? { ...prev, status: newStatus } : null);
      }
    } catch (error) {
      // Revert on error
      setInvoices(prev => prev.map(i => i.id === inv.id ? { ...i, status: inv.status } : i));
    } finally {
      setUpdatingStatus(null);
    }
  };

  const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidAmount = invoices.filter(i => i.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0);
  const unpaidAmount = invoices.filter(i => i.status === 'unpaid').reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-3xl font-black text-gray-900">المدفوعات والفواتير</h1>
          <p className="text-sm mt-1 text-gray-500">عرض فواتير المغادرين والمبالغ المستحقة.</p>
        </div>
        <button onClick={loadCheckOutStays} className="flex items-center gap-2 px-4 py-2 border border-[#D4AF37] rounded-xl text-sm font-bold text-[#AA7B30] hover:bg-amber-50 transition">
          <RefreshCw size={14} /><span>تحديث</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 border border-gray-200 rounded-xl bg-white">
          <div className="space-y-1">
            <span className="text-sm text-gray-500 font-bold">إجمالي المبلغ</span>
            <div className="text-2xl font-black font-mono text-gray-900">{totalAmount.toLocaleString('ar-SA', { maximumFractionDigits: 0 })} ريال</div>
          </div>
          <div className="p-2.5 rounded-lg mt-3 bg-emerald-50 text-emerald-600 w-fit"><DollarSign size={20} /></div>
        </div>
        <div className="p-5 border border-gray-200 rounded-xl bg-white">
          <div className="space-y-1">
            <span className="text-sm text-gray-500 font-bold">المدفوعة</span>
            <div className="text-2xl font-black font-mono text-emerald-600">{paidAmount.toLocaleString('ar-SA', { maximumFractionDigits: 0 })} ريال</div>
          </div>
          <div className="p-2.5 rounded-lg mt-3 bg-emerald-50 text-emerald-600 w-fit"><CheckCircle2 size={20} /></div>
        </div>
        <div className="p-5 border border-gray-200 rounded-xl bg-white">
          <div className="space-y-1">
            <span className="text-sm text-gray-500 font-bold">المعلقة</span>
            <div className="text-2xl font-black font-mono text-amber-600">{unpaidAmount.toLocaleString('ar-SA', { maximumFractionDigits: 0 })} ريال</div>
          </div>
          <div className="p-2.5 rounded-lg mt-3 bg-amber-50 text-amber-600 w-fit"><Clock size={20} /></div>
        </div>
      </div>

      {/* Invoice Cards */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12"><Loader2 size={32} className="text-[#D4AF37] animate-spin" /></div>
      ) : error ? (
        <div className="text-center py-16 bg-white border border-gray-200 rounded-2xl">
          <AlertCircle size={48} className="text-red-400 mx-auto mb-4" />
          <p className="text-gray-500 text-sm font-bold mb-4">{error}</p>
          <button onClick={loadCheckOutStays} className="px-5 py-2 bg-[#D4AF37] text-white font-bold text-sm rounded-xl">إعادة المحاولة</button>
        </div>
      ) : invoices.length === 0 ? (
        <div className="text-center py-16 bg-white border border-gray-200 rounded-2xl">
          <CreditCard size={48} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-sm font-bold">لا توجد فواتير حالياً</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {invoices.map((inv) => (
            <motion.div
              key={inv.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => loadInvoiceDetails(inv)}
              className="border border-gray-200 rounded-xl p-5 cursor-pointer transition duration-300 hover:border-[#D4AF37]/35 hover:shadow-md bg-white"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-amber-50 border border-amber-200">
                    <Building size={20} className="text-[#AA7B30]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">غرفة {inv.roomNumber}</h3>
                    <span className="text-sm text-gray-400 font-mono">#{inv.id}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-bold border ${
                  inv.status === 'paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}>
                  {inv.status === 'paid' ? 'مسددة' : 'غير مسددة'}
                </span>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2"><User size={14} className="text-gray-400" /><span className="text-sm text-gray-600 font-bold">{inv.guestName}</span></div>
                <div className="flex items-center gap-2"><Calendar size={14} className="text-gray-400" /><span className="text-sm text-gray-500">المغادرة: {inv.checkOutDate}</span></div>
              </div>
              <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                <span className="text-sm font-bold text-gray-400">الإجمالي</span>
                <span className="text-xl font-black font-mono text-[#AA7B30]">{inv.amount.toLocaleString('ar-SA', { maximumFractionDigits: 0 })} ريال</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Invoice Details Modal */}
      <AnimatePresence>
        {selectedInvoice && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedInvoice(null)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={e => e.stopPropagation()} className="bg-white border border-gray-200 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <div>
                  <h2 className="text-xl font-black text-gray-900">تفاصيل الفاتورة</h2>
                  <p className="text-sm text-gray-400 mt-0.5">غرفة {selectedInvoice.roomNumber} — #{selectedInvoice.id}</p>
                </div>
                <button onClick={() => setSelectedInvoice(null)} className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition"><X size={18} className="text-gray-500" /></button>
              </div>

              <div className="p-6 space-y-6">
                {/* Reservation Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4"><span className="text-xs font-bold text-gray-400 block mb-1">اسم الضيف</span><span className="text-sm font-bold text-gray-900">{selectedInvoice.guestName}</span></div>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4"><span className="text-xs font-bold text-gray-400 block mb-1">رقم الغرفة</span><span className="text-sm font-bold text-gray-900">{selectedInvoice.roomNumber}</span></div>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4"><span className="text-xs font-bold text-gray-400 block mb-1">تاريخ الدخول</span><span className="text-sm font-bold text-gray-900">{selectedInvoice.checkInDate}</span></div>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4"><span className="text-xs font-bold text-gray-400 block mb-1">تاريخ المغادرة</span><span className="text-sm font-bold text-gray-900">{selectedInvoice.checkOutDate}</span></div>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4"><span className="text-xs font-bold text-gray-400 block mb-1">عدد الليالى</span><span className="text-sm font-bold text-gray-900">{selectedInvoice.nights} ليلة</span></div>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4"><span className="text-xs font-bold text-gray-400 block mb-1">رقم الهاتف</span><span className="text-sm font-bold text-gray-900">{selectedInvoice.guestPhone}</span></div>
                </div>

                {/* Loading */}
                {loadingDetail && <div className="flex items-center justify-center py-6"><Loader2 size={24} className="text-[#D4AF37] animate-spin" /></div>}

                {/* Regular Orders */}
                {!loadingDetail && detailOrders.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2 mb-3"><Package size={16} className="text-[#D4AF37]" />الطلبات ({detailOrders.length})</h3>
                    <div className="space-y-2">
                      {detailOrders.map((order: any, idx: number) => (
                        <div key={idx} className="p-3 bg-gray-50 border border-gray-200 rounded-xl">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-sm font-bold text-gray-800">طلب #{order.orderId || idx + 1}</span>
                            <span className="text-xs font-bold text-[#AA7B30]">{order.totalAmount || 0} ريال</span>
                          </div>
                          {order.items && Array.isArray(order.items) && order.items.map((item: any, i: number) => (
                            <div key={i} className="flex justify-between items-center py-1.5 border-t border-gray-100 first:border-0">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-800">{item.itemName || item.name || 'عنصر'}</span>
                                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">{CATEGORY_LABELS[item.category] || order.category || ''}</span>
                              </div>
                              <div className="text-left">
                                <span className="text-xs text-gray-500">x{item.quantity}</span>
                                <span className="text-sm font-bold text-gray-700 mr-2">{item.unitPrice || 0} ريال</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Special Orders */}
                {!loadingDetail && detailSpecialOrders.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2 mb-3"><ShoppingBag size={16} className="text-purple-500" />الطلبات الخاصة ({detailSpecialOrders.length})</h3>
                    <div className="space-y-2">
                      {detailSpecialOrders.map((so: any, idx: number) => (
                        <div key={idx} className="p-3 bg-purple-50 border border-purple-200 rounded-xl">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="text-sm font-bold text-gray-800">{so.specialOffer?.title || 'طلب خاص'}</span>
                              {so.specialOffer?.description && <p className="text-xs text-gray-500 mt-1">{so.specialOffer.description}</p>}
                            </div>
                            <span className="text-sm font-bold text-[#AA7B30]">{so.agreedPrice || 0} ريال</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {!loadingDetail && detailOrders.length === 0 && detailSpecialOrders.length === 0 && (
                  <p className="text-center text-gray-400 text-sm py-4">لا توجد طلبات مسجلة لهذا الحجز</p>
                )}

                {/* Payment Status Toggle */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-bold text-gray-700 block">حالة الدفع</span>
                      <span className={`text-xs font-bold ${selectedInvoice.status === 'paid' ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {selectedInvoice.status === 'paid' ? 'مسددة' : 'غير مسددة'}
                      </span>
                    </div>
                    <button
                      onClick={() => handleTogglePaymentStatus(selectedInvoice)}
                      disabled={updatingStatus === selectedInvoice.id}
                      className={`px-5 py-2.5 rounded-xl text-sm font-bold border transition-all ${
                        selectedInvoice.status === 'paid'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                          : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                      } disabled:opacity-50`}
                    >
                      {updatingStatus === selectedInvoice.id ? <Loader2 size={14} className="animate-spin inline" /> : selectedInvoice.status === 'paid' ? 'تحديد كغير مسددة' : 'تحديد كمسددة'}
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-700">المبلغ الإجمالي</span>
                  <span className="text-2xl font-black font-mono text-[#AA7B30]">{selectedInvoice.amount.toLocaleString('ar-SA', { maximumFractionDigits: 0 })} ريال</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
