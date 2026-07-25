import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  CreditCard, DollarSign, ArrowUpRight, ArrowDownRight, AlertCircle, RefreshCw,
  Percent, Calendar, Loader2, Building, User
} from 'lucide-react';
import { Invoice } from '../types';
import { apiService } from '../services/api';
import { useThemeColors } from '../hooks/useThemeColors';

export default function PaymentsSection() {
  const { colors, isDark } = useThemeColors();
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stayOrders, setStayOrders] = useState<{ [stayId: string]: any[] }>({});

  useEffect(() => {
    loadCheckOutStays();
  }, []);

  const loadCheckOutStays = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiService.getStaysCheckOutToday(0, 50);
      
      const transformedInvoices = (response.content || []).map((stay: any) => ({
        id: stay.stayId?.toString() || '-',
        guestName: stay.guestName || '-',
        roomNumber: stay.roomNumber || '-',
        amount: stay.totalCharge || 0,
        status: 'unpaid' as Invoice['status'],
        date: stay.expectedCheckOutDate ? new Date(stay.expectedCheckOutDate).toLocaleDateString('ar-SA', { calendar: 'gregory' }) : '-',
        method: 'بطاقة ائتمان',
        tax: 0,
        vat: 0,
      }));
      
      setInvoices(transformedInvoices);

      for (const stay of response.content || []) {
        try {
          const orders = await apiService.getStayOrders(stay.stayId);
          setStayOrders(prev => ({
            ...prev,
            [stay.stayId.toString()]: orders || []
          }));
        } catch (error) {}
      }
    } catch (error: any) {
      setError('فشل تحميل بيانات المغادرين اليوم');
      setInvoices([]);
    } finally {
      setIsLoading(false);
    }
  };

  const totalPayments = (invoices || []).reduce((sum, inv) => sum + inv.amount, 0);
  const vatRate = 0.15;
  const totalVAT = totalPayments * vatRate;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-5 ${isDark ? 'border-gray-900' : 'border-gray-200'}`}>
        <div>
          <h1 className="text-3xl font-black text-gray-900">المدفوعات والفواتير</h1>
          <p className="text-sm mt-1 text-gray-500">عرض فواتير المغادرين اليوم والمبالغ المستحقة.</p>
        </div>
        <button
          onClick={loadCheckOutStays}
          className="flex items-center gap-2 px-4 py-2 border border-[#D4AF37] rounded-xl text-sm font-bold text-[#AA7B30] hover:bg-amber-50 transition"
        >
          <RefreshCw size={14} />
          <span>تحديث</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 border border-gray-200 rounded-xl bg-white">
          <div className="space-y-1">
            <span className="text-sm text-gray-500 font-bold">إجمالي المبلغ</span>
            <div className="text-2xl font-black font-mono text-gray-900">{totalPayments.toLocaleString('ar-SA', { maximumFractionDigits: 0 })} ريال</div>
          </div>
          <div className="p-2.5 rounded-lg mt-3 bg-emerald-50 text-emerald-600 w-fit">
            <DollarSign size={20} />
          </div>
        </div>

        <div className="p-5 border border-gray-200 rounded-xl bg-white">
          <div className="space-y-1">
            <span className="text-sm text-gray-500 font-bold">ضريبة القيمة المضافة (15%)</span>
            <div className="text-2xl font-black font-mono text-gray-900">{totalVAT.toLocaleString('ar-SA', { maximumFractionDigits: 0 })} ريال</div>
          </div>
          <div className="p-2.5 rounded-lg mt-3 bg-amber-50 text-amber-600 w-fit">
            <Percent size={20} />
          </div>
        </div>

        <div className="p-5 border border-gray-200 rounded-xl bg-white">
          <div className="space-y-1">
            <span className="text-sm text-gray-500 font-bold">عدد الفواتير</span>
            <div className="text-2xl font-black font-mono text-gray-900">{invoices.length}</div>
          </div>
          <div className="p-2.5 rounded-lg mt-3 bg-blue-50 text-blue-600 w-fit">
            <CreditCard size={20} />
          </div>
        </div>
      </div>

      {/* Invoices */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 size={28} className="text-[#D4AF37] animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center py-16 bg-white border border-gray-200 rounded-2xl">
          <AlertCircle size={48} className="text-red-400 mx-auto mb-4" />
          <p className="text-gray-500 text-sm font-bold mb-4">{error}</p>
          <button onClick={loadCheckOutStays} className="px-5 py-2 bg-[#D4AF37] text-white font-bold text-sm rounded-xl">
            إعادة المحاولة
          </button>
        </div>
      ) : invoices.length === 0 ? (
        <div className="text-center py-16 bg-white border border-gray-200 rounded-2xl">
          <CreditCard size={48} className="text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-sm font-bold">لا توجد فواتير للمغادرين اليوم</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {invoices.map((inv) => (
            <motion.div
              key={inv.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setSelectedInvoice(inv)}
              className={`border rounded-xl p-5 cursor-pointer transition duration-300 hover:border-[#D4AF37]/35 ${
                selectedInvoice?.id === inv.id ? 'border-[#D4AF37]/50 bg-amber-50/50' : 'bg-white border-gray-200'
              }`}
            >
              {/* Card Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-amber-50 border border-amber-200">
                    <Building size={20} className="text-[#AA7B30]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">{inv.roomNumber}</h3>
                    <span className="text-sm text-gray-400 font-mono">#{inv.id}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-bold border ${
                  inv.status === 'paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                  inv.status === 'unpaid' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                  'bg-red-50 text-red-700 border-red-200'
                }`}>
                  {inv.status === 'paid' ? 'مسددة' : inv.status === 'unpaid' ? 'غير مسددة' : 'مرتجعة'}
                </span>
              </div>

              {/* Guest Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <User size={14} className="text-gray-400" />
                  <span className="text-sm text-gray-600 font-bold">{inv.guestName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-gray-400" />
                  <span className="text-sm text-gray-500">تاريخ المغادرة: {inv.date}</span>
                </div>
              </div>

              {/* Orders List */}
              {stayOrders[inv.id] && stayOrders[inv.id].length > 0 && (
                <div className="space-y-2 mb-4">
                  <div className="text-sm font-bold text-gray-500">الطلبات:</div>
                  {stayOrders[inv.id].slice(0, 3).map((order: any, idx: number) => (
                    <div key={idx} className="text-sm p-2.5 rounded-lg bg-gray-50 border border-gray-100">
                      <div className="font-bold text-gray-800">{order.items || order.name || 'طلب'}</div>
                      <div className="text-sm text-gray-500">{order.totalAmount || order.price || 0} ريال</div>
                    </div>
                  ))}
                  {stayOrders[inv.id].length > 3 && (
                    <div className="text-sm text-gray-400 text-center">+{stayOrders[inv.id].length - 3} طلبات أخرى</div>
                  )}
                </div>
              )}

              {/* Amount */}
              <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                <span className="text-sm font-bold text-gray-400">الإجمالي</span>
                <span className="text-xl font-black font-mono text-[#AA7B30]">
                  {inv.amount.toLocaleString('ar-SA', { maximumFractionDigits: 0 })} ريال
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
