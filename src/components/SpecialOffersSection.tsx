import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Tag, Plus, X, Edit, Trash2, Save, Loader2, Sparkles, 
  Search, ChevronDown, ChevronUp
} from 'lucide-react';
import { apiService, SpecialOfferResponse } from '../services/api';
import SpecialOffersModal from './SpecialOffersModal';

export default function SpecialOffersSection() {
  const [offers, setOffers] = useState<SpecialOfferResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<SpecialOfferResponse | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState<Record<number, boolean>>({});

  useEffect(() => {
    loadOffers();
  }, []);

  const loadOffers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiService.getSpecialOffers(0, 50);
      setOffers(response.content || []);
    } catch (error: any) {
      if (error.message && error.message.includes('Authentication')) {
        setError('فشل المصادقة. يرجى تسجيل الدخول مرة أخرى.');
      } else {
        setError('فشل الاتصال بالخادم. الرجاء المحاولة مرة أخرى.');
      }
      setOffers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateSuccess = () => {
    loadOffers();
  };

  const handleEdit = (offer: SpecialOfferResponse) => {
    setEditingOffer(offer);
  };

  const handleUpdate = async (id: number, offerData: { title?: string; description?: string }) => {
    try {
      await apiService.updateSpecialOffer(id, offerData);
      loadOffers();
      setEditingOffer(null);
    } catch (error) {
      alert('فشل تحديث العرض. الرجاء المحاولة مرة أخرى.');
    }
  };

  const toggleExpand = (id: number) => {
    setIsExpanded(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredOffers = (offers || []).filter(offer =>
    offer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    offer.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-2xl font-black text-[#AA7B30] flex items-center gap-2">
            <Sparkles size={24} className="text-[#D4AF37]" />
            العروض والمزايا
          </h1>
          <p className="text-gray-500 text-xs mt-1">إدارة العروض الخاصة والمزايا للنزلاء</p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#AA7B30] to-[#D4AF37] hover:from-[#C59740] hover:to-[#D4AF37] text-black font-extrabold text-xs rounded-xl shadow-lg transition duration-200"
        >
          <Plus size={15} />
          <span>عرض جديد</span>
        </button>
      </div>

      {/* Search */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="بحث في العروض..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 focus:border-[#D4AF37] rounded-xl pr-10 pl-4 py-2.5 text-xs text-gray-800 focus:outline-none transition"
          />
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 size={24} className="text-[#D4AF37] animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center py-16 bg-white border border-gray-200 rounded-2xl">
          <X size={48} className="text-red-500 mx-auto mb-4" />
          <h3 className="text-sm font-bold text-gray-400 mb-2">فشل تحميل العروض</h3>
          <p className="text-xs text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadOffers}
            className="px-4 py-2 bg-gradient-to-r from-[#AA7B30] to-[#D4AF37] text-black font-extrabold text-xs rounded-xl"
          >
            إعادة المحاولة
          </button>
        </div>
      ) : (
        <>
          {/* Empty State */}
          {filteredOffers.length === 0 ? (
            <div className="text-center py-16 bg-white border border-gray-200 rounded-2xl">
              <Tag size={48} className="text-gray-700 mx-auto mb-4" />
              <h3 className="text-sm font-bold text-gray-400 mb-2">لا توجد عروض حالياً</h3>
              <p className="text-xs text-gray-600 mb-4">ابدأ بإضافة عرض جديد للنزلاء</p>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="px-4 py-2 bg-gradient-to-r from-[#AA7B30] to-[#D4AF37] text-black font-extrabold text-xs rounded-xl"
              >
                إضافة عرض
              </button>
            </div>
          ) : (
            /* Offers Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredOffers.map((offer) => (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-[#D4AF37]/35 transition duration-300"
                >
                  {/* Header */}
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-sm font-bold text-gray-800 mb-1">{offer.title}</h3>
                        <span className="text-xs text-gray-500 font-mono">#{offer.id}</span>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleEdit(offer)}
                          className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-800 rounded-lg transition"
                        >
                          <Edit size={12} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {isExpanded[offer.id] 
                        ? offer.description 
                        : offer.description.length > 100 
                          ? `${offer.description.substring(0, 100)}...` 
                          : offer.description
                      }
                    </p>
                    
                    {offer.description.length > 100 && (
                      <button
                        onClick={() => toggleExpand(offer.id)}
                        className="mt-2 text-xs text-[#D4AF37] hover:underline flex items-center gap-1"
                      >
                        {isExpanded[offer.id] ? (
                          <>
                            <ChevronUp size={10} />
                            عرض أقل
                          </>
                        ) : (
                          <>
                            <ChevronDown size={10} />
                            عرض المزيد
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="px-4 py-3 bg-gray-50/50 border-t border-gray-200 flex justify-between items-center">
                    <span className="text-xs text-gray-500">نشط</span>
                    <button className="text-xs text-[#D4AF37] hover:underline">
                      تعديل
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Create Offer Modal */}
      <SpecialOffersModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleCreateSuccess}
      />

      {/* Edit Offer Modal */}
      {editingOffer && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#D4AF37]/30 rounded-2xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#AA7B30]">تعديل العرض</h3>
              <button onClick={() => setEditingOffer(null)} className="p-2 bg-gray-100 border border-gray-200 rounded-lg">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 block mb-2">العنوان</label>
                <input
                  type="text"
                  defaultValue={editingOffer.title}
                  id="editTitle"
                  className="w-full bg-gray-50 border border-gray-200 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 block mb-2">الوصف</label>
                <textarea
                  defaultValue={editingOffer.description}
                  id="editDescription"
                  rows={4}
                  className="w-full bg-gray-50 border border-gray-200 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setEditingOffer(null)}
                  className="px-4 py-2 bg-gray-50 border border-gray-200 text-gray-400 rounded-xl text-xs font-bold hover:text-gray-800 transition"
                >
                  إلغاء
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const title = (document.getElementById('editTitle') as HTMLInputElement).value;
                    const description = (document.getElementById('editDescription') as HTMLTextAreaElement).value;
                    handleUpdate(editingOffer.id, { title, description });
                  }}
                  className="px-6 py-2 bg-gradient-to-r from-[#AA7B30] to-[#D4AF37] text-black font-extrabold text-xs rounded-xl shadow hover:shadow-lg transition duration-200 flex items-center gap-2"
                >
                  <Save size={14} />
                  حفظ التغييرات
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
