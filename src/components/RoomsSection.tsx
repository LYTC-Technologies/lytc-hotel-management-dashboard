import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BedDouble, Sparkles, AlertTriangle, Hammer, CheckCircle2, User, Filter, Layers, 
  DollarSign, Grid3X3, List, Search, ArrowUpDown, ChevronLeft, Eye, Edit, 
  Calendar, MapPin, Users, Clock, MoreVertical, X, Save, Building2, Image as ImageIcon, Star, Loader2, Plus, Trash2
} from 'lucide-react';
import { Room } from '../types';
import { apiService, RoomResponse } from '../services/api';
import { useThemeColors } from '../hooks/useThemeColors';

interface RoomsSectionProps {
  rooms?: Room[];
  onUpdateRoomStatus?: (roomId: string, status: Room['status']) => void;
  onUpdateRoom?: (updatedRoom: Room) => void;
}

export default function RoomsSection({ rooms: initialRooms = [], onUpdateRoomStatus, onUpdateRoom }: RoomsSectionProps) {
  const { colors, isDark } = useThemeColors();
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | Room['status']>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFloor, setSelectedFloor] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'number' | 'price' | 'floor' | 'status'>('number');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [selectedRooms, setSelectedRooms] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  
  // Create Room Modal State
  const [createRoomModalOpen, setCreateRoomModalOpen] = useState(false);
  const [newRoom, setNewRoom] = useState({
    roomNumber: '',
    maxAdults: 2,
    maxKids: 0,
    description: '',
    floor: 2,
    price: 0,
    status: 'AVAILABLE' as 'AVAILABLE' | 'OCCUPIED' | 'CLEANING' | 'MAINTENANCE',
  });
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [createRoomError, setCreateRoomError] = useState<string | null>(null);

  const floors = [2, 3, 4, 5];

  useEffect(() => {
    loadRooms();
  }, [filter, selectedFloor]);

  const loadRooms = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const statusParam = filter === 'all' ? undefined : filter.toUpperCase() as 'AVAILABLE' | 'OCCUPIED' | 'CLEANING' | 'MAINTENANCE';
      const response = await apiService.getRooms(
        statusParam,
        selectedFloor === 'all' ? undefined : selectedFloor,
        0,
        50
      );
      
      // Transform backend response to Room format
      const transformedRooms = (response.content || []).map((room: RoomResponse) => ({
        id: room.id.toString(),
        number: room.roomNumber,
        status: room.status.toLowerCase() as Room['status'],
        floor: room.floor,
        pricePerNight: parseFloat(room.price),
        type: room.description || 'Standard',
        name: `Room ${room.roomNumber}`,
        maxAdults: room.maxAdults,
        maxKids: room.maxKids,
        image: '',
      }));
      
      setRooms(transformedRooms);
    } catch (error: any) {
      if (error.message && error.message.includes('NetworkError')) {
        setError('فشل الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت.');
      } else {
        setError('فشل تحميل الغرف. الرجاء المحاولة مرة أخرى.');
      }
      setRooms([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateRoom = async () => {
    if (!newRoom.roomNumber || newRoom.price <= 0) {
      setCreateRoomError('يرجى إدخال رقم الغرفة والسعر');
      return;
    }

    setIsCreatingRoom(true);
    setCreateRoomError(null);
    try {
      await apiService.createRoom({
        roomNumber: newRoom.roomNumber,
        maxAdults: newRoom.maxAdults,
        maxKids: newRoom.maxKids,
        description: newRoom.description,
        floor: newRoom.floor,
        price: newRoom.price,
      });
      
      // Reset form and close modal
      setNewRoom({
        roomNumber: '',
        maxAdults: 2,
        maxKids: 0,
        description: '',
        floor: 2,
        price: 0,
        status: 'AVAILABLE',
      });
      setCreateRoomModalOpen(false);
      
      // Reload rooms
      loadRooms();
    } catch (error: any) {
      console.error('Failed to create room:', error);
      setCreateRoomError('فشل إنشاء الغرفة. الرجاء المحاولة مرة أخرى.');
    } finally {
      setIsCreatingRoom(false);
    }
  };

  const filteredRooms = rooms.filter(room => {
    const matchesFilter = filter === 'all' || room.status === filter;
    const matchesFloor = selectedFloor === 'all' || room.floor === selectedFloor;
    const matchesSearch = searchQuery === '' || 
      room.number.includes(searchQuery) || 
      room.name.includes(searchQuery) ||
      room.type.includes(searchQuery);
    return matchesFilter && matchesFloor && matchesSearch;
  });

  const sortedRooms = [...filteredRooms].sort((a, b) => {
    switch (sortBy) {
      case 'number': return b.number.localeCompare(a.number);
      case 'price': return b.pricePerNight - a.pricePerNight;
      case 'floor': return b.floor - a.floor;
      case 'status': return a.status.localeCompare(b.status);
      default: return 0;
    }
  });

  const paginatedRooms = sortedRooms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedRooms.length / itemsPerPage);

  const getStatusLabel = (status: Room['status']) => {
    switch (status) {
      case 'available': return 'متاحة';
      case 'occupied': return 'مشغولة';
      case 'cleaning': return 'جاري التنظيف';
      case 'maintenance': return 'صيانة';
    }
  };

  const getStatusColor = (status: Room['status']) => {
    switch (status) {
      case 'available': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'occupied': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'cleaning': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'maintenance': return 'bg-amber-50 text-amber-700 border-amber-200';
    }
  };

  const getStatusDot = (status: Room['status']) => {
    switch (status) {
      case 'available': return 'bg-emerald-500';
      case 'occupied': return 'bg-amber-500';
      case 'cleaning': return 'bg-amber-500';
      case 'maintenance': return 'bg-amber-500';
    }
  };

  const getStatusIcon = (status: Room['status']) => {
    switch (status) {
      case 'available': return <CheckCircle2 className="w-3.5 h-3.5" />;
      case 'occupied': return <User className="w-3.5 h-3.5" />;
      case 'cleaning': return <Sparkles className="w-3.5 h-3.5" />;
      case 'maintenance': return <Hammer className="w-3.5 h-3.5" />;
    }
  };

  const handleUpdateRoomStatus = async (roomId: string, status: Room['status']) => {
    try {
      const backendStatus = status.toUpperCase() as 'AVAILABLE' | 'OCCUPIED' | 'CLEANING' | 'MAINTENANCE';
      
      await apiService.patchRoom(parseInt(roomId), { status: backendStatus });
      
      // Instant local update without page refresh
      setRooms(prev => prev.map(r => r.id === roomId ? { ...r, status } : r));
      if (selectedRoom && selectedRoom.id === roomId) {
        setSelectedRoom(prev => prev ? { ...prev, status } : null);
      }
    } catch (error) {
      console.error('Failed to update room status:', error);
    }
  };

  const handleDeleteRoom = async (roomId: string) => {
    try {
      await apiService.deleteRoom(parseInt(roomId));
      setRooms(prev => prev.filter(r => r.id !== roomId));
      if (selectedRoom && selectedRoom.id === roomId) {
        setSelectedRoom(null);
      }
    } catch (error) {
      console.error('Failed to delete room:', error);
    }
  };

  const handleBulkAction = (action: string) => {
    selectedRooms.forEach(roomId => {
      const room = rooms.find(r => r.id === roomId);
      if (room) {
        if (action === 'available') {
          handleUpdateRoomStatus(roomId, 'available');
        } else if (action === 'maintenance') {
          handleUpdateRoomStatus(roomId, 'maintenance');
        }
      }
    });
    setSelectedRooms(new Set());
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-2xl font-black text-[#AA7B30]">إدارة وتتبع وحدات الفندق</h1>
          <p className="text-gray-500 text-xs mt-1">تتبع حالة كافة الغرف والأجنحة الفاخرة، والتحكم في مهام الصيانة والتنظيف المباشر.</p>
        </div>
        
        {/* Add Room Button */}
        <button
          onClick={() => setCreateRoomModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#AA7B30] to-[#D4AF37] text-black font-extrabold text-xs rounded-xl hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300"
        >
          <Plus size={16} />
          <span>إضافة غرفة</span>
        </button>
      </div>

      {/* Floor Selector */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2">
        <span className="text-xs font-bold text-gray-400 whitespace-nowrap">اختر الطابق:</span>
        <button
          onClick={() => setSelectedFloor('all')}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 whitespace-nowrap border ${
            selectedFloor === 'all'
              ? 'bg-[#D4AF37] text-white border-[#D4AF37]'
              : 'bg-white text-gray-600 border-gray-200 hover:text-gray-900 hover:border-gray-300'
          }`}
        >
          جميع الطوابق
        </button>
        {floors.map(floor => (
          <button
            key={floor}
            onClick={() => setSelectedFloor(floor)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 whitespace-nowrap border ${
              selectedFloor === floor
                ? 'bg-[#D4AF37] text-white border-[#D4AF37]'
                : 'bg-white text-gray-600 border-gray-200 hover:text-gray-900 hover:border-gray-300'
            }`}
          >
            الطابق {floor}
          </button>
        ))}
      </div>

      {/* Filters & Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-gray-200 p-4 rounded-xl backdrop-blur-xl">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
            <input
              type="text"
              placeholder="بحث عن غرفة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-50 border border-gray-200 focus:border-[#D4AF37] rounded-xl pr-9 pl-3 py-2 text-xs text-gray-800 placeholder-gray-500 focus:outline-none w-48"
            />
          </div>

          {/* Status Filters */}
          <div className="flex items-center gap-2">
            <Filter className="text-[#D4AF37] w-4 h-4" />
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-sm font-bold transition duration-200 border ${
                filter === 'all' ? 'bg-[#D4AF37] text-white border-[#D4AF37]' : 'bg-white text-gray-600 border-gray-200 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              الكل
            </button>
            {(['available', 'occupied', 'cleaning', 'maintenance'] as Room['status'][]).map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-sm font-bold transition duration-200 flex items-center gap-1.5 border ${
                  filter === status ? 'bg-[#D4AF37] text-white border-[#D4AF37]' : 'bg-white text-gray-600 border-gray-200 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                {getStatusIcon(status)}
                <span>{getStatusLabel(status)}</span>
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className={`rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-[#D4AF37] ${isDark ? 'bg-gray-50 border-gray-200 text-gray-400' : 'bg-white border-gray-300 text-gray-700'}`}
          >
            <option value="number">ترتيب: الرقم</option>
            <option value="price">ترتيب: السعر</option>
            <option value="floor">ترتيب: الطابق</option>
            <option value="status">ترتيب: الحالة</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          {/* Bulk Actions */}
          {selectedRooms.size > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: colors.text.muted }}>{selectedRooms.size} محدد</span>
              <button
                onClick={() => handleBulkAction('available')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${isDark ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/20 hover:bg-emerald-950/60' : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'}`}
              >
                تعيين متاح
              </button>
              <button
                onClick={() => handleBulkAction('maintenance')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${isDark ? 'bg-red-950/40 text-red-400 border-red-500/20 hover:bg-red-950/60' : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'}`}
              >
                صيانة
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Room Cards - Grid View */}
      {viewMode === 'grid' && (
        <>
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 size={24} className="text-[#D4AF37] animate-spin" />
            </div>
          ) : error ? (
            <div className={`text-center py-16 border rounded-2xl ${isDark ? 'bg-white border-gray-200' : 'bg-white border-gray-200'}`}>
              <X size={48} className="text-red-500 mx-auto mb-4" />
              <h3 className="text-sm font-bold mb-2" style={{ color: colors.text.muted }}>فشل تحميل الغرف</h3>
              <p className="text-xs mb-4" style={{ color: colors.text.disabled }}>{error}</p>
              <button
                onClick={loadRooms}
                className="px-4 py-2 text-black font-extrabold text-xs rounded-xl"
                style={{ background: colors.primary.goldGradient }}
              >
                إعادة المحاولة
              </button>
            </div>
          ) : paginatedRooms.length === 0 ? (
            <div className={`text-center py-16 border rounded-2xl ${isDark ? 'bg-white border-gray-200' : 'bg-white border-gray-200'}`}>
              <BedDouble size={48} className="mx-auto mb-4" style={{ color: colors.text.muted }} />
              <h3 className="text-sm font-bold mb-2" style={{ color: colors.text.muted }}>لا توجد غرف</h3>
              <p className="text-xs mb-4" style={{ color: colors.text.disabled }}>لم يتم العثور على غرف تطابق البحث</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {paginatedRooms.map((room) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <div className="relative backdrop-blur-xl border rounded-2xl overflow-hidden hover:border-[#D4AF37]/30 hover:shadow-[0_20px_40px_rgba(212,175,55,0.15)] transition-all duration-500 hover:-translate-y-2 group bg-white border-gray-200">
                {/* Placeholder Photo */}
                <div className="relative h-44 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600" 
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/20 to-transparent" />
                  <div className="absolute top-3 right-3">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border backdrop-blur-md shadow-lg ${getStatusColor(room.status)}`}>
                      <span className={`w-2 h-2 rounded-full ${getStatusDot(room.status)}`}></span>
                      <span>{getStatusLabel(room.status)}</span>
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                    <span className="text-3xl font-black font-mono text-white drop-shadow-lg">{room.number}</span>
                    <span className="text-sm text-white/80 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-lg font-bold">{room.type}</span>
                  </div>
                </div>

                {/* Room Info */}
                <div className="p-5 space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">الطابق:</span>
                      <span className="font-bold text-gray-800">{room.floor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">السعر:</span>
                      <span className="font-bold text-[#AA7B30]">{room.pricePerNight ? `${room.pricePerNight.toLocaleString('ar-SA')} ر.س` : 'غير متاح'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">بالغين:</span>
                      <span className="font-bold text-gray-800">{room.maxAdults || 'غير متاح'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">أطفال:</span>
                      <span className="font-bold text-gray-800">{room.maxKids || 'غير متاح'}</span>
                    </div>
                  </div>

                  {room.description && (
                    <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{room.description}</p>
                  )}

                  {/* Actions */}
                  <div className="pt-3 border-t border-gray-100">
                    <button
                      onClick={() => setSelectedRoom(room)}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2.5 border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:text-gray-900 hover:border-[#D4AF37]/30 hover:bg-amber-50 transition-all duration-300"
                    >
                      <Eye size={16} />
                      <span>التفاصيل</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
            </div>
          )}
        </>
      )}

      {/* Room Cards - List View */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          {paginatedRooms.map((room) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={`relative backdrop-blur-xl border rounded-2xl overflow-hidden hover:border-[#D4AF37]/30 hover:shadow-[0_10px_30px_rgba(212,175,55,0.1)] transition-all duration-300 ${isDark ? 'bg-white/80 border-gray-200' : 'bg-white/80 border-gray-200'}`}
            >
              <div className="flex flex-col sm:flex-row">
                {/* Room Image */}
                <div className="relative h-48 sm:h-auto sm:w-64 overflow-hidden">
                  <img 
                    src={room.images && room.images[0] ? room.images[0] : 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800'} 
                    alt={room.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800';
                    }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-[#0b0b0b]' : 'from-gray-900/60'} via-transparent to-transparent sm:bg-gradient-to-l`} />
                  
                  <div className="absolute top-3 right-3 sm:top-3 sm:right-3">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold border backdrop-blur-md ${getStatusColor(room.status)}`}>
                      {getStatusIcon(room.status)}
                      <span>{getStatusLabel(room.status)}</span>
                    </span>
                  </div>
                </div>

                {/* Room Info */}
                <div className="flex-1 p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-black" style={{ color: colors.text.primary }}>{room.name}</h3>
                        <span className="px-2 py-1 rounded text-xs font-bold border" style={{ background: `${colors.primary.gold}10`, borderColor: `${colors.primary.gold}30`, color: colors.primary.gold }}>
                          {room.number}
                        </span>
                      </div>
                      <p className="text-xs mt-1" style={{ color: colors.text.muted }}>{room.type}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black font-mono" style={{ color: colors.primary.goldLight }}>
                        {room.pricePerNight.toLocaleString('ar-SA')}
                      </span>
                      <span className="text-xs block" style={{ color: colors.text.muted }}>ريال / ليلة</span>
                    </div>
                  </div>

                  <p className="text-xs line-clamp-2" style={{ color: colors.text.secondary }}>{room.description}</p>

                  <div className="flex flex-wrap gap-4 text-xs">
                    <div className="flex items-center gap-2" style={{ color: colors.text.secondary }}>
                      <MapPin size={14} style={{ color: colors.primary.gold }} />
                      <span>الطابق {room.floor}</span>
                    </div>
                    <div className="flex items-center gap-2" style={{ color: colors.text.secondary }}>
                      <Users size={14} style={{ color: colors.primary.gold }} />
                      <span>{room.capacity} نزلاء</span>
                    </div>
                    <div className="flex items-center gap-2" style={{ color: colors.text.secondary }}>
                      <Clock size={14} style={{ color: colors.primary.gold }} />
                      <span>{room.lastUpdated}</span>
                    </div>
                    <div className="flex items-center gap-2" style={{ color: colors.text.secondary }}>
                      <Layers size={14} style={{ color: colors.primary.gold }} />
                      <span>إشغال {room.occupancyRate}%</span>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2">
                    {room.amenities.filter(a => a).slice(0, 4).map((amenity, idx) => (
                      <span key={`${room.id}-amenity-${idx}`} className={`px-2 py-1 border rounded-md text-xs ${isDark ? 'bg-gray-50 border-gray-200 text-gray-400' : 'bg-gray-100 border-gray-300 text-gray-600'}`}>
                        {amenity}
                      </span>
                    ))}
                    {room.amenities.length > 4 && (
                      <span className={`px-2 py-1 border rounded-md text-xs ${isDark ? 'bg-gray-50 border-gray-200 text-gray-400' : 'bg-gray-100 border-gray-300 text-gray-600'}`}>
                        +{room.amenities.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className={`flex gap-2 pt-3 border-t ${isDark ? 'border-gray-200/60' : 'border-gray-200'}`}>
                    <button
                      onClick={() => setSelectedRoom(room)}
                      className={`flex items-center justify-center gap-2 px-4 py-2 border rounded-lg text-xs font-bold transition ${isDark ? 'bg-gray-50 border-gray-200 text-gray-400 hover:text-gray-800 hover:border-[#D4AF37]/30' : 'bg-gray-50 border-gray-300 text-gray-600 hover:text-gray-900 hover:border-[#D4AF37]/30'}`}
                    >
                      <Eye size={14} />
                      <span>التفاصيل</span>
                    </button>
                    <button
                      onClick={() => handleUpdateRoomStatus(room.id, 'available')}
                      className={`flex items-center justify-center gap-2 px-4 py-2 border rounded-lg text-xs font-bold transition ${isDark ? 'bg-emerald-950/40 border-emerald-500/20 text-emerald-400 hover:bg-emerald-950/60' : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'}`}
                    >
                      <Calendar size={14} />
                      <span>حجز</span>
                    </button>
                    <button
                      onClick={() => handleDeleteRoom(room.id)}
                      className={`flex items-center justify-center gap-2 px-4 py-2 border rounded-lg text-xs font-bold transition ${isDark ? 'bg-red-950/40 border-red-500/20 text-red-400 hover:bg-red-950/60' : 'bg-red-50 border-red-200 text-red-700 hover:bg-red-100'}`}
                    >
                      <Trash2 size={14} />
                      <span>حذف</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`p-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed ${isDark ? 'bg-gray-50 border-gray-200 text-gray-400 hover:text-gray-800' : 'bg-gray-50 border-gray-300 text-gray-600 hover:text-gray-900'}`}
          >
            <ChevronLeft size={16} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 rounded-lg text-xs font-bold transition ${
                currentPage === page 
                  ? 'bg-[#D4AF37] text-black' 
                  : (isDark ? 'bg-gray-50 text-gray-400 border border-gray-200 hover:text-gray-800' : 'bg-gray-50 text-gray-600 border-gray-300 hover:text-gray-900')
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`p-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed ${isDark ? 'bg-gray-50 border-gray-200 text-gray-400 hover:text-gray-800' : 'bg-gray-50 border-gray-300 text-gray-600 hover:text-gray-900'}`}
          >
            <ChevronLeft size={16} className="rotate-180" />
          </button>
        </div>
      )}

      {/* Room Details Modal */}
      <AnimatePresence>
        {selectedRoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            style={{ background: isDark ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.5)' }}
            onClick={() => setSelectedRoom(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`border rounded-2xl p-6 max-w-2xl w-full relative space-y-6 max-h-[90vh] overflow-y-auto ${isDark ? 'bg-white border-[#D4AF37]/30' : 'bg-white border-gray-200'}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
              
              <div className={`flex justify-between items-start border-b pb-4 ${isDark ? 'border-gray-200' : 'border-gray-200'}`}>
                <div>
                  <h3 className="text-2xl font-bold" style={{ color: colors.primary.goldLight }}>{selectedRoom.name || 'غرفة'}</h3>
                  <p className="text-sm mt-1" style={{ color: colors.text.muted }}>{selectedRoom.type || '-'} • جناح {selectedRoom.number || '-'}</p>
                </div>
                <button
                  onClick={() => setSelectedRoom(null)}
                  className={`p-2 border rounded-lg ${isDark ? 'bg-gray-100 border-gray-200 hover:bg-gray-200' : 'bg-gray-100 border-gray-300 hover:bg-gray-200'}`}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Description */}
              <div className={`p-4 border rounded-xl ${isDark ? 'bg-gray-50 border-gray-200' : 'bg-gray-50 border-gray-200'}`}>
                <h4 className="text-sm font-bold mb-2" style={{ color: colors.primary.goldLight }}>الوصف</h4>
                <p className="text-sm" style={{ color: colors.text.secondary }}>{selectedRoom.description || 'غير متاح'}</p>
              </div>

              {/* Room ID */}
              <div className={`p-4 border rounded-xl ${isDark ? 'bg-gray-50 border-gray-200' : 'bg-gray-50 border-gray-200'}`}>
                <h4 className="text-sm font-bold mb-2" style={{ color: colors.primary.goldLight }}>معرف الغرفة</h4>
                <p className="text-sm font-mono" style={{ color: colors.text.secondary }}>{selectedRoom.id || '-'}</p>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-bold">
                <div className={`p-3 border rounded-xl ${isDark ? 'bg-gray-50 border-gray-200/80' : 'bg-gray-50 border-gray-200'}`}>
                  <span className="block" style={{ color: colors.text.muted }}>رقم الغرفة</span>
                  <span className="text-sm font-bold block mt-1" style={{ color: colors.text.primary }}>{selectedRoom.number || 'غير متاح'}</span>
                </div>
                <div className={`p-3 border rounded-xl ${isDark ? 'bg-gray-50 border-gray-200/80' : 'bg-gray-50 border-gray-200'}`}>
                  <span className="block" style={{ color: colors.text.muted }}>الطابق</span>
                  <span className="text-sm font-bold block mt-1" style={{ color: colors.text.primary }}>{selectedRoom.floor || 'غير متاح'}</span>
                </div>
                <div className={`p-3 border rounded-xl ${isDark ? 'bg-gray-50 border-gray-200/80' : 'bg-gray-50 border-gray-200'}`}>
                  <span className="block" style={{ color: colors.text.muted }}>السعر لليلة</span>
                  <span className="text-sm font-bold block mt-1" style={{ color: colors.primary.goldLight }}>{selectedRoom.pricePerNight ? `${selectedRoom.pricePerNight.toLocaleString('ar-SA')} ريال` : 'غير متاح'}</span>
                </div>
                <div className={`p-3 border rounded-xl ${isDark ? 'bg-gray-50 border-gray-200/80' : 'bg-gray-50 border-gray-200'}`}>
                  <span className="block" style={{ color: colors.text.muted }}>أقصى عدد بالغين</span>
                  <span className="text-sm font-bold block mt-1" style={{ color: colors.text.primary }}>{selectedRoom.maxAdults || 'غير متاح'}</span>
                </div>
                <div className={`p-3 border rounded-xl ${isDark ? 'bg-gray-50 border-gray-200/80' : 'bg-gray-50 border-gray-200'}`}>
                  <span className="block" style={{ color: colors.text.muted }}>أقصى عدد أطفال</span>
                  <span className="text-sm font-bold block mt-1" style={{ color: colors.text.primary }}>{selectedRoom.maxKids || 'غير متاح'}</span>
                </div>
                <div className={`p-3 border rounded-xl bg-gray-50 border-gray-200`}>
                  <span className="block text-xs font-bold text-gray-400">الحالة</span>
                  <span className={`inline-flex items-center gap-2 text-sm font-bold block mt-1 px-3 py-1 rounded-full border ${getStatusColor(selectedRoom.status || 'available')}`}>
                    <span className={`w-2.5 h-2.5 rounded-full ${getStatusDot(selectedRoom.status || 'available')}`}></span>
                    {getStatusLabel(selectedRoom.status || 'available')}
                  </span>
                </div>
              </div>

              {/* Status Modification */}
              <div className={`space-y-3 pt-4 border-t ${isDark ? 'border-gray-200' : 'border-gray-200'}`}>
                <h4 className="text-sm font-bold" style={{ color: colors.text.muted }}>تغيير الحالة</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['available', 'occupied', 'cleaning', 'maintenance'] as Room['status'][]).map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        handleUpdateRoomStatus(selectedRoom.id, status);
                      }}
                      className={`px-2 py-3 rounded-lg text-xs font-bold text-center border transition-all duration-200 ${
                        selectedRoom.status === status
                          ? 'bg-[#D4AF37] border-transparent text-black shadow-lg scale-105'
                          : 'bg-gray-100 border-gray-200 text-gray-400 hover:text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {getStatusLabel(status)}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create Room Modal */}
        <AnimatePresence>
          {createRoomModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setCreateRoomModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white border border-gray-200 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 space-y-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-black text-[#AA7B30]">إضافة غرفة جديدة</h2>
                    <button
                      onClick={() => setCreateRoomModalOpen(false)}
                      className="text-gray-500 hover:text-gray-800 transition"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {createRoomError && (
                    <div className="text-red-500 text-xs font-bold bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                      {createRoomError}
                    </div>
                  )}

                  {/* Room Number */}
                  <div>
                    <label className="text-xs font-bold text-gray-400 block mb-2">رقم الغرفة *</label>
                    <input
                      type="text"
                      value={newRoom.roomNumber}
                      onChange={(e) => setNewRoom({ ...newRoom, roomNumber: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none"
                      placeholder="مثال: 101"
                      disabled={isCreatingRoom}
                    />
                  </div>

                  {/* Floor */}
                  <div>
                    <label className="text-xs font-bold text-gray-400 block mb-2">الطابق</label>
                    <select
                      value={newRoom.floor}
                      onChange={(e) => setNewRoom({ ...newRoom, floor: parseInt(e.target.value) })}
                      className="w-full bg-gray-50 border border-gray-200 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none"
                      disabled={isCreatingRoom}
                    >
                      {floors.map((floor) => (
                        <option key={floor} value={floor}>الطابق {floor}</option>
                      ))}
                    </select>
                  </div>

                  {/* Price */}
                  <div>
                    <label className="text-xs font-bold text-gray-400 block mb-2">السعر لليلة *</label>
                    <input
                      type="number"
                      value={newRoom.price}
                      onChange={(e) => setNewRoom({ ...newRoom, price: parseFloat(e.target.value) || 0 })}
                      className="w-full bg-gray-50 border border-gray-200 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none"
                      placeholder="مثال: 500"
                      disabled={isCreatingRoom}
                    />
                  </div>

                  {/* Max Adults */}
                  <div>
                    <label className="text-xs font-bold text-gray-400 block mb-2">أقصى عدد بالغين</label>
                    <input
                      type="number"
                      value={newRoom.maxAdults}
                      onChange={(e) => setNewRoom({ ...newRoom, maxAdults: parseInt(e.target.value) || 1 })}
                      className="w-full bg-gray-50 border border-gray-200 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none"
                      min="1"
                      disabled={isCreatingRoom}
                    />
                  </div>

                  {/* Max Kids */}
                  <div>
                    <label className="text-xs font-bold text-gray-400 block mb-2">أقصى عدد أطفال</label>
                    <input
                      type="number"
                      value={newRoom.maxKids}
                      onChange={(e) => setNewRoom({ ...newRoom, maxKids: parseInt(e.target.value) || 0 })}
                      className="w-full bg-gray-50 border border-gray-200 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none"
                      min="0"
                      disabled={isCreatingRoom}
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="text-xs font-bold text-gray-400 block mb-2">الوصف</label>
                    <textarea
                      value={newRoom.description}
                      onChange={(e) => setNewRoom({ ...newRoom, description: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none resize-none"
                      rows={3}
                      placeholder="وصف الغرفة..."
                      disabled={isCreatingRoom}
                    />
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={handleCreateRoom}
                      disabled={isCreatingRoom}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#AA7B30] via-[#D4AF37] to-[#E6C587] text-black font-bold rounded-xl hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isCreatingRoom ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
                      <span>{isCreatingRoom ? 'جاري الإنشاء...' : 'إضافة الغرفة'}</span>
                    </button>
                    <button
                      onClick={() => setCreateRoomModalOpen(false)}
                      disabled={isCreatingRoom}
                      className="flex-1 px-6 py-3 bg-gray-50 border border-gray-200 text-gray-400 font-bold rounded-xl hover:text-gray-800 hover:border-gray-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      إلغاء
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
    </div>
  );
}
