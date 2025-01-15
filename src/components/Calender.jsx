import React, { useState } from "react";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import StaggeredDropDown from "./StaggeredDropDown";
import { motion } from "framer-motion";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("month"); // 'month' or 'year'

  const renderDays = () => {
    const days = [];
    const startDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay();
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    const today = new Date();

    const prevMonthDays = startDay;
    const prevMonthLastDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    ).getDate();

    for (let i = prevMonthDays; i > 0; i--) {
      days.push(
        <div
          key={`prev-${i}`}
          className="w-12 h-12 flex justify-center items-center text-gray-400 cursor-not-allowed"
        >
          {prevMonthLastDate - i + 1}
        </div>
      );
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const isToday =
        today.getDate() === i &&
        today.getMonth() === currentDate.getMonth() &&
        today.getFullYear() === currentDate.getFullYear();

      const isSelected =
        selectedDate?.getDate() === i &&
        selectedDate?.getMonth() === currentDate.getMonth() &&
        selectedDate?.getFullYear() === currentDate.getFullYear();

      days.push(
        <div
          key={i}
          onClick={() =>
            setSelectedDate(
              new Date(currentDate.getFullYear(), currentDate.getMonth(), i)
            )
          }
          className={`w-12 h-12 flex justify-center items-center rounded-lg font-medium cursor-pointer transition-all ${
            isToday
              ? "bg-blue-500 text-white border border-blue-700 shadow-lg"
              : isSelected
              ? "bg-blue-100 text-blue-600 border border-blue-300"
              : "bg-white text-gray-700 hover:bg-blue-50"
          }`}
          title={`${new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            i
          ).toDateString()}`}
        >
          {i}
        </div>
      );
    }

    const remainingDays = (7 - ((startDay + daysInMonth) % 7)) % 7;

    for (let i = 1; i <= remainingDays; i++) {
      days.push(
        <div
          key={`next-${i}`}
          className="w-12 h-12 flex justify-center items-center text-gray-400 cursor-not-allowed"
        >
          {i}
        </div>
      );
    }

    return days;
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const months = Array.from({ length: 12 }, (v, k) =>
    new Date(0, k).toLocaleString("default", { month: "long" })
  );
  const years = Array.from(
    { length: 21 },
    (v, k) => k + currentDate.getFullYear() - 10
  );

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="max-w-md mx-auto bg-white p-4 rounded-lg shadow-lg">
      {/* Navigation */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              setModalType("month");
              setIsModalOpen(true);
            }}
            className="p-2 border rounded bg-blue-50 hover:bg-blue-100"
          >
            {months[currentDate.getMonth()]}
          </button>
          <button
            onClick={() => {
              setModalType("year");
              setIsModalOpen(true);
            }}
            className="p-2 border rounded bg-blue-50 hover:bg-blue-100"
          >
            {currentDate.getFullYear()}
          </button>
        </div>
        <div>
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-full hover:bg-slate-200"
          >
            <GrFormPrevious />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 rounded-full hover:bg-slate-200"
          >
            <MdNavigateNext />
          </button>
        </div>
      </div>
      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 text-center font-semibold text-gray-600 mb-2">
        {weekdays.map((day) => (
          <div key={day} className="w-12 h-12 flex items-center justify-center">
            {day}
          </div>
        ))}
      </div>
      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1">{renderDays()}</div>

      {/* Modal for Month/Year Selection */}
    </div>
  );
};

export default Calendar;
