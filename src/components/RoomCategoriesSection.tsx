import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, Plus, Search, X, Loader2, Edit, Trash2, Save, Image as ImageIcon, DollarSign, Users, BedDouble, MapPin, Wifi, AlertCircle } from 'lucide-react';
import { apiService, RoomCategoryResponse } from '../services/api';

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

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      <div className="flex justify-between items-center border-b border-gray-200 pb-5">
        <h1 className="text-3xl font-black text-gray-900">فئات الغرف</h1>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#AA7B30] to-[#D4AF37] text-white font-bold text-sm rounded-xl">
          <Plus size={18} /><span>إضافة فئة</span>
        </button>
      </div>

      <div className="relative">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input type="text" placeholder="بحث..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-white border border-gray-200 rounded-xl pr-10 pl-4 py-2.5 text-sm w-full" />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20"><Loader2 size={32} className="text-[#D4AF37] animate-spin" /></div>
      ) : error ? (
        <div className="text-center py-20 bg-white border border-gray-200 rounded-2xl">
          <AlertCircle size={48} className="text-red-400 mx-auto mb-4" /><p className="text-gray-500">{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredCategories.map(cat => (
            <div key={cat.id} className="bg-white border border-gray-200 rounded-2xl p-5">
              <h3 className="text-lg font-bold">{cat.name}</h3>
              <p className="text-sm text-gray-500">{cat.maxAdults} بالغين</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
