import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  MessageSquare, Clock, Filter, CheckCircle2, User, UserCheck, AlertOctagon, Coffee, Shirt, Sparkles, 
  Navigation, ConciergeBell, Check, Plane, Search, Package, TrendingUp, BarChart3, Star, 
  Award, Timer, ArrowUpRight, ArrowDownRight, Download, Printer, Plus, X, Save
} from 'lucide-react';
import { ServiceRequest } from '../types';

interface RequestsSectionProps {
  requests: ServiceRequest[];
  onUpdateRequestStatus: (reqId: string, status: ServiceRequest['status']) => void;
  onAssignRequest: (reqId: string, assignee: string) => void;
}

export default function RequestsSection({
  requests,
  onUpdateRequestStatus,
  onAssignRequest
}: RequestsSectionProps) {
  const [filter, setFilter] = useState<'all' | ServiceRequest['status']>('all');
  const [assigneeInputs, setAssigneeInputs] = useState<{ [key: string]: string }>({});

  const filteredRequests = filter === 'all' ? requests : requests.filter(r => r.status === filter);

  const getServiceTypeLabel = (type: ServiceRequest['type']) => {
    switch (type) {
      case 'room_service': return 'خدمة الغرف والمطبخ';
      case 'laundry': return 'المغسلة والمكواة';
      case 'housekeeping': return 'خدمات النظافة والترتيب';
      case 'maintenance': return 'أعطال الصيانة والكهرباء';
      case 'taxi': return 'طلب سيارة وسائق ليموزين';
      case 'reception': return 'طلب خدمة الاستقبال والدعم';
      case 'airport_pickup': return 'استقبال من المطار';
      case 'lost_found': return 'مفقودات ومستندات';
    }
  };

  const getServiceIcon = (type: ServiceRequest['type']) => {
    switch (type) {
      case 'room_service': return <Coffee className="w-4 h-4 text-amber-600" />;
      case 'laundry': return <Shirt className="w-4 h-4 text-blue-600" />;
      case 'housekeeping': return <Sparkles className="w-4 h-4 text-[#D4AF37]" />;
      case 'maintenance': return <AlertOctagon className="w-4 h-4 text-red-600" />;
      case 'taxi': return <Navigation className="w-4 h-4 text-emerald-600" />;
      case 'reception': return <ConciergeBell className="w-4 h-4 text-purple-600" />;
      case 'airport_pickup': return <Plane className="w-4 h-4 text-cyan-400" />;
      case 'lost_found': return <Search className="w-4 h-4 text-orange-400" />;
    }
  };

  const handleAssignSubmit = (reqId: string) => {
    const name = assigneeInputs[reqId];
    if (!name) return;
    onAssignRequest(reqId, name);
    // Clear input
    setAssigneeInputs(prev => ({ ...prev, [reqId]: '' }));
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-2xl font-black text-[#AA7B30]">مركز خدمات وطلبات النزلاء</h1>
          <p className="text-gray-500 text-xs mt-1">تنسيق وإدارة طلبات النزلاء، وتوزيع المسؤوليات وتعديل الأولويات وحالات التسليم فورياً.</p>
        </div>
      </div>

      {/* Filters and Counters */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-gray-200 p-4 rounded-xl">
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
          <span className="text-gray-400 ml-2">فلترة حسب حالة الطلب:</span>
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition duration-200 ${
              filter === 'all' ? 'bg-[#D4AF37] text-black' : 'bg-gray-50 text-gray-400 border border-gray-200'
            }`}
          >
            كافة طلبات النزلاء ({requests.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-1.5 rounded-lg transition duration-200 ${
              filter === 'pending' ? 'bg-[#D4AF37] text-black' : 'bg-gray-50 text-gray-400 border border-gray-200'
            }`}
          >
            بانتظار التعيين ({requests.filter(r => r.status === 'pending').length})
          </button>
          <button
            onClick={() => setFilter('assigned')}
            className={`px-3 py-1.5 rounded-lg transition duration-200 ${
              filter === 'assigned' ? 'bg-[#D4AF37] text-black' : 'bg-gray-50 text-gray-400 border border-gray-200'
            }`}
          >
            جاري العمل عليها ({requests.filter(r => r.status === 'assigned').length})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1.5 rounded-lg transition duration-200 ${
              filter === 'completed' ? 'bg-[#D4AF37] text-black' : 'bg-gray-50 text-gray-400 border border-gray-200'
            }`}
          >
            المكتملة بنجاح ({requests.filter(r => r.status === 'completed').length})
          </button>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-gray-200 rounded-xl hover:border-emerald-500/35 transition duration-200">
          <div className="space-y-1">
            <span className="text-xs text-gray-500">معدل الإنجاز</span>
            <div className="text-lg font-bold text-gray-800 font-mono">87%</div>
          </div>
          <div className="p-2 bg-emerald-50/20 text-emerald-600 rounded-lg mt-2">
            <CheckCircle2 size={16} />
          </div>
        </div>

        <div className="p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-500/35 transition duration-200">
          <div className="space-y-1">
            <span className="text-xs text-gray-500">متوسط وقت الاستجابة</span>
            <div className="text-lg font-bold text-gray-800 font-mono">12 دقيقة</div>
          </div>
          <div className="p-2 bg-blue-50/20 text-blue-600 rounded-lg mt-2">
            <Timer size={16} />
          </div>
        </div>

        <div className="p-4 bg-white border border-gray-200 rounded-xl hover:border-purple-500/35 transition duration-200">
          <div className="space-y-1">
            <span className="text-xs text-gray-500">الطلبات المنجزة اليوم</span>
            <div className="text-lg font-bold text-gray-800 font-mono">24</div>
          </div>
          <div className="p-2 bg-purple-50/20 text-purple-600 rounded-lg mt-2">
            <Award size={16} />
          </div>
        </div>

        <div className="p-4 bg-white border border-gray-200 rounded-xl hover:border-amber-500/35 transition duration-200">
          <div className="space-y-1">
            <span className="text-xs text-gray-500">تقييم الخدمة</span>
            <div className="text-lg font-bold text-gray-800 font-mono">4.8/5</div>
          </div>
          <div className="p-2 bg-amber-50/20 text-amber-600 rounded-lg mt-2">
            <Star size={16} />
          </div>
        </div>
      </div>

      {/* Requests Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRequests.map((req) => (
          <div key={req.id} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-[#D4AF37]/30 transition duration-300 flex flex-col justify-between space-y-4">
            
            {/* Upper row: ID, type, priority */}
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <span className="w-9 h-9 rounded-full bg-gradient-to-br from-[#121212] to-[#1a1a1a] border border-gray-200 flex items-center justify-center">
                  {getServiceIcon(req.type)}
                </span>
                <div>
                  <h3 className="text-xs font-bold text-gray-400">{getServiceTypeLabel(req.type)}</h3>
                  <div className="text-xs text-[#AA7B30] font-bold mt-0.5">غرفة {req.roomNumber} • سجل في {req.timestamp}</div>
                </div>
              </div>

              <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                req.priority === 'high' ? 'bg-red-50/40 text-red-600 border border-red-500/20' :
                req.priority === 'medium' ? 'bg-yellow-50/40 text-yellow-600 border border-yellow-500/20' :
                'bg-gray-100 text-gray-400 border border-gray-200'
              }`}>
                {req.priority === 'high' ? 'أولوية عاجلة جداً' :
                 req.priority === 'medium' ? 'أولوية متوسطة' :
                 'أولوية عادية'}
              </span>
            </div>

            {/* Details box */}
            <p className="text-xs text-gray-600 leading-relaxed font-bold bg-gray-50 border border-gray-200/50 p-4 rounded-xl">
              {req.details}
            </p>

            {/* Status & Assignment Box */}
            <div className="border-t border-gray-200/60 pt-4 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center text-xs">
              <div className="space-y-1 font-bold">
                <span className="text-gray-500 text-xs block">الموظف المسؤول:</span>
                {req.assignee ? (
                  <span className="text-gray-700 flex items-center gap-1">
                    <UserCheck size={12} className="text-[#D4AF37]" />
                    {req.assignee}
                  </span>
                ) : (
                  <span className="text-red-600">لم يتم تعيين أي موظف</span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {req.status === 'pending' && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-200 focus:border-[#D4AF37] rounded-lg px-2 py-1 text-xs text-gray-800 focus:outline-none w-32"
                      placeholder="اسم الموظف..."
                      value={assigneeInputs[req.id] || ''}
                      onChange={(e) => setAssigneeInputs({ ...assigneeInputs, [req.id]: e.target.value })}
                    />
                    <button
                      onClick={() => handleAssignSubmit(req.id)}
                      className="px-2 py-1 bg-blue-900 text-blue-100 rounded-lg text-xs font-bold"
                    >
                      تعيين
                    </button>
                  </div>
                )}

                {req.status === 'assigned' && (
                  <button
                    onClick={() => onUpdateRequestStatus(req.id, 'completed')}
                    className="px-3.5 py-1.5 bg-emerald-50/40 text-emerald-600 border border-emerald-500/30 hover:bg-emerald-900/40 rounded-lg font-bold flex items-center gap-1 transition"
                  >
                    <Check size={12} />
                    <span>تأكيد الإنجاز والتسليم</span>
                  </button>
                )}

                {req.status === 'completed' && (
                  <span className="text-emerald-600 font-bold flex items-center gap-1 text-sm">
                    <CheckCircle2 size={13} />
                    <span>تم التسليم بنجاح</span>
                  </span>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
