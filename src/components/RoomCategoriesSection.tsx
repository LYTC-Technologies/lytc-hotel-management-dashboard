import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Building2, Plus, Search, Loader2, Edit, Trash2, Save, Image as ImageIcon, DollarSign, Users, BedDouble, MapPin, Wifi, AlertCircle, Layers, Star } from 'lucide-react';
import { apiService, RoomCategoryResponse } from '../services/api';

const getBedTypeArabic = (bedType?: string): string => {
  const translations: Record<string, string> = { 'TWIN': 'سريرين منفصلين', 'DOUBLE': 'سرير مزدوج', 'QUEEN': 'سرير كوين', 'KING': 'سرير كينج' };
  return translations[bedType || ''] || bedType || 'غير متاح';
};

const getViewTypeArabic = (viewType?: string): string => {
  const translations: Record<string, string> = { 'CITY': 'مدينة', 'PANORAMIC': 'بانوراما', 'SEA': 'بحر', 'GARDEN': 'حديقة', 'MOUNTAIN': 'جبل', 'POOL': 'مسبح', 'RIVER': 'نهر', 'LANDMARK': 'معلم سياحي' };
  return translations[viewType || ''] || viewType || 'غير متاح';
};

export default function RoomCategoriesSection() {
  const [categories, setCategories] = useState<RoomCategoryResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => { loadCategories(); }, []);

  const loadCategories = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiService.getRoomCategories(0, 100);
      setCategories(response.content || []);
    } catch (e) {
      setError('فشل تحميل فئات الغرف');
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCategories = categories.filter(cat => cat.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-3xl font-black text-[#AA7B30]">فئات الغرف</h1>
          <p className="text-gray-500 text-xs mt-1">إدارة فئات الغرف وتحديد الأسعار والمواصفات.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#AA7B30] to-[#D4AF37] text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition">
          <Plus size={18} /><span>إضافة فئة</span>
        </button>
      </div>

      <div className="relative">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input type="text" placeholder="بحث عن فئة..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-white border border-gray-200 focus:border-[#D4AF37] rounded-xl pr-10 pl-4 py-2.5 text-sm w-full" />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20"><Loader2 size={32} className="text-[#D4AF37] animate-spin" /></div>
      ) : error ? (
        <div className="text-center py-20 bg-white border border-gray-200 rounded-2xl">
          <AlertCircle size={48} className="text-red-400 mx-auto mb-4" /><p className="text-gray-500 text-sm font-bold mb-4">{error}</p>
          <button onClick={loadCategories} className="px-5 py-2 bg-[#D4AF37] text-white font-bold text-sm rounded-xl">إعادة المحاولة</button>
        </div>
      ) : filteredCategories.length === 0 ? (
        <div className="text-center py-20 bg-white border border-gray-200 rounded-2xl">
          <Layers size={48} className="text-gray-300 mx-auto mb-4" /><p className="text-gray-400 text-sm font-bold">لا توجد فئات</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map(category => (
            <motion.div key={category.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative">
              <div className="relative bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-[#D4AF37]/30 hover:shadow-[0_20px_40px_rgba(212,175,55,0.15)] transition-all duration-500 hover:-translate-y-2 group">
                <div className="relative h-48 overflow-hidden">
                  {category.imageUrl ? (
                    <img src={category.imageUrl} alt={category.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#AA7B30]/20 to-[#D4AF37]/20 flex items-center justify-center">
                      <Building2 size={64} className="text-[#D4AF37]/40" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/20 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border backdrop-blur-md shadow-lg bg-[#D4AF37]/20 text-[#AA7B30] border-[#D4AF37]/30">
                      <Star size={12} className="fill-[#D4AF37]" /> فئة
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-2xl font-black font-mono text-white drop-shadow-lg">{category.name}</h3>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl">
                      <Users size={16} className="text-gray-400" />
                      <span className="font-bold text-gray-800">{category.maxAdults} بالغين</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl">
                      <BedDouble size={16} className="text-gray-400" />
                      <span className="font-bold text-gray-800">{getBedTypeArabic(category.bedType)}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl">
                      <MapPin size={16} className="text-gray-400" />
                      <span className="font-bold text-gray-800">{getViewTypeArabic(category.viewType)}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl">
                      <Wifi size={16} className={category.hasWifi ? "text-green-500" : "text-gray-400"} />
                      <span className="font-bold text-gray-800">{category.hasWifi ? 'واي فاي' : 'بدون'}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-amber-50 border border-amber-200 text-amber-700 rounded-lg text-sm font-bold hover:bg-amber-100 transition">
                      <DollarSign size={14} /> الأسعار
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg text-sm font-bold hover:bg-blue-100 transition">
                      <Edit size={14} /> تعديل
                    </button>
                    <button className="px-3 py-2.5 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-bold hover:bg-red-100 transition">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
