import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  User, Plus, Search, XCircle, AlertCircle, Edit, X, Save, Briefcase, Phone, Building, Loader2, Trash2
} from 'lucide-react';
import { apiService, EmployeeResponse, CreateEmployeeRequest, UpdateEmployeeStatusRequest } from '../services/api';

export default function EmployeesManagementSection() {
  const [employees, setEmployees] = useState<EmployeeResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsOverlayOpen, setIsDetailsOverlayOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeResponse | null>(null);
  const [isCreatingEmployee, setIsCreatingEmployee] = useState(false);
  const [createEmployeeError, setCreateEmployeeError] = useState<string | null>(null);

  // New Employee Form States
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [job, setJob] = useState('');
  const [department, setDepartment] = useState('');

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiService.getEmployees(0, 50);
      setEmployees(response.content || []);
    } catch (error: any) {
      console.error('Failed to load employees:', error);
      setEmployees([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateEmployee = async () => {
    if (!fullName || !phone || !job || !department) {
      alert('الرجاء تعبئة جميع الحقول المطلوبة');
      return;
    }

    setIsCreatingEmployee(true);
    setCreateEmployeeError(null);

    try {
      const newEmployee: CreateEmployeeRequest = {
        fullName,
        phone,
        job,
        department,
      };

      await apiService.createEmployee(newEmployee);

      // Reset form
      setFullName('');
      setPhone('');
      setJob('');
      setDepartment('');
      setIsModalOpen(false);

      // Reload employees
      loadEmployees();
    } catch (error: any) {
      console.error('Failed to create employee:', error);
      setCreateEmployeeError('فشل إنشاء الموظف. الرجاء المحاولة مرة أخرى.');
    } finally {
      setIsCreatingEmployee(false);
    }
  };

  const handleDeleteEmployee = async (employeeId: number) => {
    if (!confirm('هل أنت متأكد من حذف هذا الموظف؟')) return;

    try {
      await apiService.deleteEmployee(employeeId);
      loadEmployees();
      setIsDetailsOverlayOpen(false);
    } catch (error) {
      console.error('Failed to delete employee:', error);
      alert('فشل حذف الموظف. الرجاء المحاولة مرة أخرى.');
    }
  };

  const openDetailsOverlay = (employee: EmployeeResponse) => {
    setSelectedEmployee(employee);
    setIsDetailsOverlayOpen(true);
  };

  // Filter employees based on search
  const filteredEmployees = (employees || []).filter(employee => {
    const matchesSearch = employee.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          employee.job.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          employee.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-900 pb-5">
        <div>
          <h1 className="text-2xl font-black text-[#E6C587]">إدارة الموظفين</h1>
          <p className="text-gray-500 text-xs mt-1">عرض وإدارة بيانات الموظفين وحالاتهم</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#AA7B30] to-[#D4AF37] hover:from-[#C59740] hover:to-[#D4AF37] text-black font-extrabold text-xs rounded-xl shadow-lg transition duration-200"
        >
          <Plus size={15} />
          <span>إضافة موظف</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3 bg-[#0b0b0b] border border-gray-900 p-4 rounded-xl">
        <div className="relative">
          <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="بحث بالاسم أو الوظيفة أو القسم..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#121212] border border-gray-800 focus:border-[#D4AF37] rounded-lg px-4 py-2 pr-10 text-xs text-white focus:outline-none w-48"
          />
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 size={24} className="text-[#D4AF37] animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center py-16 bg-[#0b0b0b] border border-gray-900 rounded-2xl">
          <XCircle size={48} className="text-red-500 mx-auto mb-4" />
          <h3 className="text-sm font-bold text-gray-400 mb-2">فشل تحميل الموظفين</h3>
          <p className="text-xs text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadEmployees}
            className="px-4 py-2 bg-[#D4AF37] text-black font-extrabold text-xs rounded-xl"
          >
            إعادة المحاولة
          </button>
        </div>
      ) : filteredEmployees.length === 0 ? (
        <div className="text-center py-16 bg-[#0b0b0b] border border-gray-900 rounded-2xl">
          <AlertCircle size={48} className="text-gray-500 mx-auto mb-4" />
          <h3 className="text-sm font-bold text-gray-400 mb-2">لا يوجد موظفين</h3>
          <p className="text-xs text-gray-600 mb-4">ابدأ بإضافة موظف جديد</p>
        </div>
      ) : (
        <div className="overflow-x-auto pb-2">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-xs text-gray-500 font-bold text-right pb-3">المعرف</th>
                <th className="text-xs text-gray-500 font-bold text-right pb-3">الاسم الكامل</th>
                <th className="text-xs text-gray-500 font-bold text-right pb-3">الهاتف</th>
                <th className="text-xs text-gray-500 font-bold text-right pb-3">الوظيفة</th>
                <th className="text-xs text-gray-500 font-bold text-right pb-3">القسم</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr 
                  key={employee.id} 
                  className="border-b border-gray-800/50 hover:bg-[#121212]/50 transition-colors cursor-pointer"
                  onClick={() => openDetailsOverlay(employee)}
                >
                  <td className="py-3 text-sm text-white">{employee.id}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-[#D4AF37]/20 border border-[#D4AF37]/30 rounded-lg flex items-center justify-center">
                        <User size={14} className="text-[#E6C587]" />
                      </div>
                      <span className="text-sm text-white font-bold">{employee.fullName}</span>
                    </div>
                  </td>
                  <td className="py-3 text-sm text-gray-400 flex items-center gap-2">
                    <Phone size={14} />
                    {employee.phone}
                  </td>
                  <td className="py-3 text-sm text-white flex items-center gap-2">
                    <Briefcase size={14} />
                    {employee.job}
                  </td>
                  <td className="py-3 text-sm text-white flex items-center gap-2">
                    <Building size={14} />
                    {employee.department}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* New Employee Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0b0b0b] border border-[#D4AF37]/30 rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#E6C587]">إضافة موظف جديد</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 bg-gray-900 border border-gray-800 rounded-lg">
                <X size={18} />
              </button>
            </div>

            {createEmployeeError && (
              <div className="bg-red-950/40 border border-red-500/30 text-red-200 text-sm p-3 rounded-lg mb-4">
                {createEmployeeError}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 block mb-2">الاسم الكامل</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#121212] border border-gray-800 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 block mb-2">رقم الهاتف</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#121212] border border-gray-800 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 block mb-2">الوظيفة</label>
                <input
                  type="text"
                  value={job}
                  onChange={(e) => setJob(e.target.value)}
                  className="w-full bg-[#121212] border border-gray-800 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 block mb-2">القسم</label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-[#121212] border border-gray-800 focus:border-[#D4AF37] rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-[#121212] border border-gray-800 text-gray-400 rounded-xl text-xs font-bold hover:text-white transition"
                >
                  إلغاء
                </button>
                <button
                  type="button"
                  onClick={handleCreateEmployee}
                  disabled={isCreatingEmployee}
                  className="px-6 py-2 bg-gradient-to-r from-[#AA7B30] to-[#D4AF37] text-black font-extrabold text-xs rounded-xl shadow hover:shadow-lg transition duration-200 flex items-center gap-2 disabled:opacity-50"
                >
                  {isCreatingEmployee ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      جاري الحفظ...
                    </>
                  ) : (
                    <>
                      <Save size={14} />
                      حفظ الموظف
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Employee Details Overlay */}
      {isDetailsOverlayOpen && selectedEmployee && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0b0b0b] border border-[#D4AF37]/30 rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#E6C587]">تفاصيل الموظف</h3>
              <button onClick={() => setIsDetailsOverlayOpen(false)} className="p-2 bg-gray-900 border border-gray-800 rounded-lg">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Employee Info */}
              <div className="p-4 bg-[#121212] border border-gray-800 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#D4AF37]/20 border border-[#D4AF37]/30 rounded-full flex items-center justify-center">
                    <User size={24} className="text-[#E6C587]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">{selectedEmployee.fullName}</h4>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      selectedEmployee.status === 'ACTIVE' ? 'bg-emerald-950/20 text-emerald-400 border border-emerald-500/30' :
                      'bg-gray-800 text-gray-400 border border-gray-700'
                    }`}>
                      {selectedEmployee.status === 'ACTIVE' ? 'نشط' : selectedEmployee.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Phone size={16} className="text-[#D4AF37]" />
                    <span className="text-white">{selectedEmployee.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Briefcase size={16} className="text-[#D4AF37]" />
                    <span className="text-white">{selectedEmployee.job}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Building size={16} className="text-[#D4AF37]" />
                    <span className="text-white">{selectedEmployee.department}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-800">
                <button
                  onClick={() => {
                    setIsDetailsOverlayOpen(false);
                    // TODO: Open edit modal
                    alert('ميزة التعديل قيد التطوير');
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#AA7B30] to-[#D4AF37] hover:from-[#C59740] hover:to-[#D4AF37] text-black font-extrabold text-xs rounded-xl shadow-lg transition duration-200"
                >
                  <Edit size={16} />
                  <span>تعديل</span>
                </button>
                <button
                  onClick={() => handleDeleteEmployee(selectedEmployee.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-950/20 border border-red-500/30 hover:bg-red-900/30 text-red-400 font-extrabold text-xs rounded-xl transition duration-200"
                >
                  <Trash2 size={16} />
                  <span>حذف</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
