"use client"
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, ChevronDown, Settings2 } from 'lucide-react';
import { students } from '@/localDb/student';

interface Student {
  id: string;
  name: string;
  avatar: string;
  records: Record<string, AttendanceStatus>;
}

type AttendanceStatus = 'P' | 'A' | 'L' | 'WK' | 'HL' | 'CL' | 'PL';

const AttendanceDashboard = () => {
  const [currentMonth, setCurrentMonth] = useState('JAN 2021');
  const [selectedDepartment, setSelectedDepartment] = useState('Department');
  const [selectedLocation, setSelectedLocation] = useState('Location');
  
  // Generate days of the month
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  
  const statusColors: Record<AttendanceStatus, string> = {
    'P': 'bg-green-100 text-green-800',
    'A': 'bg-red-100 text-red-800',
    'L': 'bg-purple-100 text-purple-800',
    'WK': 'bg-blue-100 text-blue-800',
    'HL': 'bg-cyan-100 text-cyan-800',
    'CL': 'bg-orange-100 text-orange-800',
    'PL': 'bg-yellow-100 text-yellow-800'
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <h1 className="text-xl font-semibold">Student Attendance</h1>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Controls */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-gray-600">53 students</span>
            <div className="flex items-center gap-2">
              <button className="p-1 hover:bg-gray-100 rounded">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="font-medium">{currentMonth}</span>
              <button className="p-1 hover:bg-gray-100 rounded">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50">
              {selectedDepartment}
              <ChevronDown className="h-4 w-4" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50">
              {selectedLocation}
              <ChevronDown className="h-4 w-4" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50">
              All Student
              <ChevronDown className="h-4 w-4" />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50">
              View Details
              <Settings2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-t border-b bg-gray-50">
                <th className="px-4 py-2 text-left">Student Name</th>
                {daysInMonth.map(day => (
                  <th key={day} className="px-2 py-2 text-center min-w-[40px]">
                    <div className="text-sm font-medium">{day}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(2021, 0, day).toLocaleString('en-US', { weekday: 'short' })}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map(Student => (
                <tr key={Student.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={Student.avatar}
                        alt=""
                        className="w-8 h-8 rounded-full"
                      />
                      <span>{Student.name}</span>
                    </div>
                  </td>
                  {daysInMonth.map(day => (
                    <td key={day} className="px-2 py-2 text-center">
                      {Student.records[day] && (
                        <span className={`inline-block px-2 py-1 text-xs rounded-md ${statusColors[Student.records[day]]}`}>
                          {Student.records[day]}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceDashboard;