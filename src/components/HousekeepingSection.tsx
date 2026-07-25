import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, Trash2, Clock, CheckCircle2, User, Play, Check, Calendar, Filter, 
  Star, ClipboardCheck, AlertCircle, TrendingUp, BarChart3, Award, Timer,
  Download, Printer, Plus, X, Save, Search, MapPin, Layers
} from 'lucide-react';
import { HousekeepingTask } from '../types';

interface HousekeepingSectionProps {
  tasks: HousekeepingTask[];
  onUpdateTaskStatus: (taskId: string, status: HousekeepingTask['status']) => void;
}

export default function HousekeepingSection({ tasks, onUpdateTaskStatus }: HousekeepingSectionProps) {
  const [filter, setFilter] = useState<'all' | HousekeepingTask['status']>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | HousekeepingTask['priority']>('all');
  const [selectedTask, setSelectedTask] = useState<HousekeepingTask | null>(null);

  const filteredTasks = (tasks || []).filter(task => {
    const statusMatch = filter === 'all' || task.status === filter;
    const priorityMatch = priorityFilter === 'all' || task.priority === priorityFilter;
    return statusMatch && priorityMatch;
  });

  const getPriorityColor = (priority: HousekeepingTask['priority']) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50/20 border-red-500/30';
      case 'medium': return 'text-amber-600 bg-amber-50/20 border-amber-500/30';
      case 'low': return 'text-emerald-600 bg-emerald-50/20 border-emerald-500/30';
    }
  };

  const getPriorityLabel = (priority: HousekeepingTask['priority']) => {
    switch (priority) {
      case 'high': return 'عالية';
      case 'medium': return 'متوسطة';
      case 'low': return 'منخفضة';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-2xl font-black text-[#AA7B30]">جدول النظافة والخدمات الفندقية</h1>
          <p className="text-gray-500 text-xs mt-1">تتبع مهام التنظيف الدوري، والتعقيم للأجنحة الشاغرة وتوزيعها على الطاقم التشغيلي.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-gray-200 p-4 rounded-xl">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 font-bold">الحالة:</span>
          <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-lg p-1">
            {['all', 'pending', 'cleaning', 'completed'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  filter === status ? 'bg-[#D4AF37] text-black' : 'text-gray-400 hover:text-gray-800'
                }`}
              >
                {status === 'all' ? 'الكل' : status === 'pending' ? 'بانتظار' : status === 'cleaning' ? 'جاري التنظيف' : 'مكتمل'}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 font-bold">الأولوية:</span>
          <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-lg p-1">
            {['all', 'high', 'medium', 'low'].map((priority) => (
              <button
                key={priority}
                onClick={() => setPriorityFilter(priority as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  priorityFilter === priority ? 'bg-[#D4AF37] text-black' : 'text-gray-400 hover:text-gray-800'
                }`}
              >
                {priority === 'all' ? 'الكل' : priority === 'high' ? 'عالية' : priority === 'medium' ? 'متوسطة' : 'منخفضة'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quality Inspection Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-gray-200 rounded-xl hover:border-emerald-500/35 transition duration-200">
          <div className="space-y-1">
            <span className="text-xs text-gray-500">معدل جودة التنظيف</span>
            <div className="text-lg font-bold text-gray-800 font-mono">4.7/5</div>
          </div>
          <div className="p-2 bg-emerald-50/20 text-emerald-600 rounded-lg mt-2">
            <Star size={16} />
          </div>
        </div>

        <div className="p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-500/35 transition duration-200">
          <div className="space-y-1">
            <span className="text-xs text-gray-500">متوسط وقت التنظيف</span>
            <div className="text-lg font-bold text-gray-800 font-mono">35 دقيقة</div>
          </div>
          <div className="p-2 bg-blue-50/20 text-blue-600 rounded-lg mt-2">
            <Timer size={16} />
          </div>
        </div>

        <div className="p-4 bg-white border border-gray-200 rounded-xl hover:border-purple-500/35 transition duration-200">
          <div className="space-y-1">
            <span className="text-xs text-gray-500">الغرف المعقمة اليوم</span>
            <div className="text-lg font-bold text-gray-800 font-mono">18</div>
          </div>
          <div className="p-2 bg-purple-50/20 text-purple-600 rounded-lg mt-2">
            <ClipboardCheck size={16} />
          </div>
        </div>

        <div className="p-4 bg-white border border-gray-200 rounded-xl hover:border-amber-500/35 transition duration-200">
          <div className="space-y-1">
            <span className="text-xs text-gray-500">معدل الإنجاز</span>
            <div className="text-lg font-bold text-gray-800 font-mono">92%</div>
          </div>
          <div className="p-2 bg-amber-50/20 text-amber-600 rounded-lg mt-2">
            <Award size={16} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Statistics Widgets */}
        <div className="p-5 bg-white border border-gray-200 rounded-xl space-y-1">
          <span className="text-xs text-gray-500 font-bold block">الغرف بانتظار التنظيف الفوري:</span>
          <span className="text-2xl font-black text-amber-600 font-mono">
            {filteredTasks.filter(t => t.status === 'pending').length} غرف
          </span>
        </div>
        <div className="p-5 bg-white border border-gray-200 rounded-xl space-y-1">
          <span className="text-xs text-gray-500 font-bold block">غرف قيد العمل حالياً:</span>
          <span className="text-2xl font-black text-blue-600 font-mono">
            {filteredTasks.filter(t => t.status === 'cleaning').length} غرف
          </span>
        </div>
        <div className="p-5 bg-white border border-gray-200 rounded-xl space-y-1">
          <span className="text-xs text-gray-500 font-bold block">الغرف المعقمة بالكامل لليوم:</span>
          <span className="text-2xl font-black text-emerald-600 font-mono">
            {filteredTasks.filter(t => t.status === 'completed').length} غرف
          </span>
        </div>
      </div>

      {/* Main tasks lists */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xl space-y-4">
        <h2 className="text-base font-bold text-[#AA7B30] flex items-center gap-2">
          <Sparkles className="text-[#D4AF37]" size={18} />
          <span>جدول توزيع المهام والتعقيم</span>
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 pb-2">
                <th className="py-3 font-bold">الوحدة / الغرفة</th>
                <th className="py-3 font-bold">الموظف المعين</th>
                <th className="py-3 font-bold">مستوى الأولوية</th>
                <th className="py-3 font-bold">آخر موعد تنظيف</th>
                <th className="py-3 font-bold text-left">الحالة والإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/40">
              {filteredTasks.map((task) => (
                <tr key={task.id} className="hover:bg-white/[0.01] transition duration-150">
                  <td className="py-4 font-black text-gray-800">غرفة {task.roomNumber}</td>
                  <td className="py-4 font-bold text-gray-600">👤 {task.assignee}</td>
                  <td className="py-4">
                    <span className={`px-2.5 py-0.5 rounded text-xs font-bold border ${getPriorityColor(task.priority)}`}>
                      {getPriorityLabel(task.priority)}
                    </span>
                  </td>
                  <td className="py-4 text-xs text-gray-500">{task.lastCleaned || 'منذ يومين'}</td>
                  <td className="py-4 text-left">
                    <div className="inline-flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${
                        task.status === 'completed' ? 'bg-emerald-50/40 text-emerald-600 border-emerald-500/20' :
                        task.status === 'cleaning' ? 'bg-blue-50/40 text-blue-600 border-blue-500/20' :
                        'bg-amber-50/40 text-amber-600 border-amber-500/20'
                      }`}>
                        {task.status === 'completed' ? 'معقمة ومكتملة' :
                         task.status === 'cleaning' ? 'جاري التنظيف الآن' :
                         'بانتظار العمل'}
                      </span>

                      {task.status === 'pending' && (
                        <button
                          onClick={() => onUpdateTaskStatus(task.id, 'cleaning')}
                          className="px-2.5 py-1 bg-blue-50/30 text-blue-600 hover:bg-blue-100 rounded-lg text-xs font-bold flex items-center gap-1 border border-blue-500/20"
                        >
                          <Play size={12} />
                          بدء
                        </button>
                      )}

                      {task.status === 'cleaning' && (
                        <button
                          onClick={() => onUpdateTaskStatus(task.id, 'completed')}
                          className="px-2.5 py-1 bg-emerald-50/30 text-emerald-600 hover:bg-emerald-100 rounded-lg text-xs font-bold flex items-center gap-1 border border-emerald-500/20"
                        >
                          <Check size={12} />
                          إكمال
                        </button>
                      )}

                      <button
                        onClick={() => setSelectedTask(task)}
                        className="p-1.5 bg-gray-50 border border-gray-200 rounded-lg hover:border-[#D4AF37]/30 transition"
                        title="تفاصيل الجودة"
                      >
                        <ClipboardCheck size={14} className="text-gray-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quality Inspection Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#D4AF37]/30 rounded-2xl p-6 max-w-lg w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#AA7B30]">فحص جودة التنظيف - غرفة {selectedTask.roomNumber}</h3>
              <button onClick={() => setSelectedTask(null)} className="p-2 bg-gray-100 border border-gray-200 rounded-lg">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-gray-800">قائمة فحص الجودة</h4>
                {['الأرضية نظيفة تماماً', 'الأسطح معقمة', 'المرافق الصحية نظيفة', 'الأغطية مرتبة', 'النوافذ نظيفة', 'المصابيح تعمل'].map((item, idx) => (
                  <label key={idx} className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer hover:border-[#D4AF37]/30 transition">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-700 bg-gray-50 text-[#D4AF37] focus:ring-[#D4AF37]" />
                    <span className="text-sm text-gray-600">{item}</span>
                  </label>
                ))}
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold text-gray-800">تقييم الجودة العام</h4>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} className="p-2 bg-gray-50 border border-gray-200 rounded-lg hover:border-[#D4AF37]/30 transition">
                      <Star size={20} className="text-gray-500 hover:text-amber-600" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold text-gray-800">ملاحظات الموظف</h4>
                <textarea
                  className="w-full bg-gray-50 border border-gray-200 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none resize-none"
                  rows={3}
                  placeholder="أضف ملاحظات حول حالة الغرفة..."
                />
              </div>

              <button
                onClick={() => setSelectedTask(null)}
                className="w-full py-3 bg-gradient-to-r from-[#AA7B30] via-[#D4AF37] to-[#E6C587] text-black font-bold rounded-xl hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300"
              >
                حفظ وإغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
