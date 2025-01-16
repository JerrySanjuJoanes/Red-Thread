// import React, { useState } from "react";
// import { MdNavigateNext } from "react-icons/md";
// import { GrFormPrevious } from "react-icons/gr";
// import { motion } from "framer-motion";

// const Calendar = () => {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalType, setModalType] = useState("month"); // 'month' or 'year'

//   // Renders days of the month along with placeholders for previous and next months
//   const renderDays = () => {
//     const days = [];
//     const startDay = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth(),
//       1
//     ).getDay();
//     const daysInMonth = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth() + 1,
//       0
//     ).getDate();
//     const today = new Date();

//     const prevMonthLastDate = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth(),
//       0
//     ).getDate();

//     // Add previous month's trailing days
//     for (let i = startDay; i > 0; i--) {
//       days.push(
//         <div
//           key={`prev-${i}`}
//           className="w-12 h-12 flex justify-center items-center text-gray-400 cursor-not-allowed"
//         >
//           {prevMonthLastDate - i + 1}
//         </div>
//       );
//     }

//     // Add current month's days
//     for (let i = 1; i <= daysInMonth; i++) {
//       const isToday =
//         today.getDate() === i &&
//         today.getMonth() === currentDate.getMonth() &&
//         today.getFullYear() === currentDate.getFullYear();

//       const isSelected =
//         selectedDate?.getDate() === i &&
//         selectedDate?.getMonth() === currentDate.getMonth() &&
//         selectedDate?.getFullYear() === currentDate.getFullYear();

//       days.push(
//         <div
//           key={i}
//           onClick={() =>
//             setSelectedDate(
//               new Date(currentDate.getFullYear(), currentDate.getMonth(), i)
//             )
//           }
//           className={`w-12 h-12 flex justify-center items-center rounded-lg font-medium cursor-pointer transition-all ${
//             isToday
//               ? "bg-blue-500 text-white border border-blue-700 shadow-lg"
//               : isSelected
//               ? "bg-blue-100 text-blue-600 border border-blue-300"
//               : "bg-white text-gray-700 hover:bg-blue-50"
//           }`}
//           title={`${new Date(
//             currentDate.getFullYear(),
//             currentDate.getMonth(),
//             i
//           ).toDateString()}`}
//         >
//           {i}
//         </div>
//       );
//     }

//     // Add next month's leading days
//     const remainingDays = (7 - ((startDay + daysInMonth) % 7)) % 7;
//     for (let i = 1; i <= remainingDays; i++) {
//       days.push(
//         <div
//           key={`next-${i}`}
//           className="w-12 h-12 flex justify-center items-center text-gray-400 cursor-not-allowed"
//         >
//           {i}
//         </div>
//       );
//     }

//     return days;
//   };

//   const handlePrevMonth = () => {
//     setCurrentDate(
//       new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
//     );
//   };

//   const handleNextMonth = () => {
//     setCurrentDate(
//       new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
//     );
//   };

//   const months = Array.from({ length: 12 }, (v, k) =>
//     new Date(0, k).toLocaleString("default", { month: "long" })
//   );

//   const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//   return (
//     <div className="max-w-md mx-auto bg-white p-4 rounded-lg shadow-lg">
//       {/* Navigation */}
//       <div className="flex justify-between items-center mb-4">
//         <div className="flex items-center space-x-2">
//           <button
//             onClick={() => {
//               setModalType("month");
//               setIsModalOpen(true);
//             }}
//             className="p-2 border rounded bg-blue-50 hover:bg-blue-100"
//           >
//             {months[currentDate.getMonth()]}
//           </button>
//           <button
//             onClick={() => {
//               setModalType("year");
//               setIsModalOpen(true);
//             }}
//             className="p-2 border rounded bg-blue-50 hover:bg-blue-100"
//           >
//             {currentDate.getFullYear()}
//           </button>
//         </div>
//         <div>
//           <button
//             onClick={handlePrevMonth}
//             className="p-2 rounded-full hover:bg-slate-200"
//           >
//             <GrFormPrevious />
//           </button>
//           <button
//             onClick={handleNextMonth}
//             className="p-2 rounded-full hover:bg-slate-200"
//           >
//             <MdNavigateNext />
//           </button>
//         </div>
//       </div>

//       {/* Weekday Headers */}
//       <div className="grid grid-cols-7 gap-1 text-center font-semibold text-gray-600 mb-2">
//         {weekdays.map((day) => (
//           <div key={day} className="w-12 h-12 flex items-center justify-center">
//             {day}
//           </div>
//         ))}
//       </div>

//       {/* Calendar Days */}
//       <div className="grid grid-cols-7 gap-1">{renderDays()}</div>

//       {/* Modal for Month/Year Selection */}
//       {isModalOpen && (
//         <StaggeredDropDown
//           type={modalType}
//           currentDate={currentDate}
//           setCurrentDate={setCurrentDate}
//           setIsModalOpen={setIsModalOpen}
//         />
//       )}
//     </div>
//   );
// };

// export default Calendar;

// // DropDown Component for Month/Year Selection
// const StaggeredDropDown = ({
//   type,
//   currentDate,
//   setCurrentDate,
//   setIsModalOpen,
// }) => {
//   const months = Array.from({ length: 12 }, (_, i) =>
//     new Date(0, i).toLocaleString("default", { month: "long" })
//   );
//   const years = Array.from(
//     { length: 21 },
//     (_, i) => currentDate.getFullYear() - 10 + i
//   );

//   const handleSelect = (value) => {
//     const newDate =
//       type === "month"
//         ? new Date(currentDate.getFullYear(), value, 1)
//         : new Date(value, currentDate.getMonth(), 1);
//     setCurrentDate(newDate);
//     setIsModalOpen(false);
//   };

//   const options = type === "month" ? months : years;

//   return (
//     <motion.div
//       initial={{ opacity: 0, scaleY: 0 }}
//       animate={{ opacity: 1, scaleY: 1 }}
//       exit={{ opacity: 0, scaleY: 0 }}
//       className="absolute top-0 left-0 w-full bg-white shadow-lg rounded-lg p-4"
//     >
//       <ul className="grid grid-cols-3 gap-2">
//         {options.map((option, index) => (
//           <li
//             key={index}
//             onClick={() => handleSelect(type === "month" ? index : option)}
//             className="p-2 rounded hover:bg-blue-100 cursor-pointer text-center"
//           >
//             {option}
//           </li>
//         ))}
//       </ul>
//     </motion.div>
//   );
// };
import React, { useState } from "react";
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

function Calender() {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [currentDate, setCurrentDate] = useState(new Date());
  const [direction, setDirection] = useState(0);
  const today = new Date();
  // Get month and year
  const month = currentDate.getMonth(); // 0-indexed (0 = January)
  const year = currentDate.getFullYear();

  // Get days in the current month
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // Last day of the month
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // Day of the week for the 1st day

  // Generate an array for the calendar grid
  const calendarDays = Array(firstDayOfMonth)
    .fill(null)
    .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

  // Navigate to previous or next month
  const changeMonth = (dir) => {
    setDirection(dir); // Set the direction for animation
    const newDate = new Date(year, month + dir, 1);
    setCurrentDate(newDate);
  };

  const containerVariants = {
    initial: { opacity: 0, y: direction === 1 ? 50 : -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: direction === 1 ? -50 : 50 },
  };

  return (
    <div className="w-full h-full bg-[#333231] p-4 rounded-lg flex flex-col gap-4 text-white  select-none">
      {/* Header */}
      <div className="h-1/5 flex justify-between items-center gap-3">
        <div
          className="w-full rounded-xl py-2 px-5 flex justify-between items-center  overflow-hidden"
          style={{
            boxShadow:
              "-10px -10px 10px rgba(255, 255, 255, 0.1), 10px 10px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <IoIosArrowRoundBack
            onClick={() => changeMonth(-1)}
            className="cursor-pointer hover:bg-slate-700 h-8 w-8  rounded-full hover:scale-110 transition-all duration-300 "
          />
          <AnimatePresence mode="wait">
            <motion.h1
              className="capitalize"
              key={`${month}-${year}`}
              variants={containerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              {new Date(year, month).toLocaleString("default", {
                month: "long",
              })}
            </motion.h1>
          </AnimatePresence>
          <IoIosArrowRoundForward
            onClick={() => changeMonth(1)}
            className="cursor-pointer hover:bg-slate-700 h-8 w-8  rounded-full hover:scale-110 transition-all duration-300 "
          />
        </div>
        <div
          className="w-1/5 rounded-xl p-2 text-center"
          style={{
            boxShadow:
              "-10px -10px 10px rgba(255, 255, 255, 0.1), 10px 10px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          {year}
        </div>
      </div>

      {/* Calendar */}
      <div
        className="h-full rounded-xl "
        style={{
          boxShadow:
            "-10px -10px 10px rgba(255, 255, 255, 0.1), 10px 10px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        {/* Weekdays */}
        <div className="grid grid-cols-7 text-center font-thin text-white bg-red-500 p-2 gap-1 rounded-t-xl">
          {weekdays.map((day) => (
            <div key={day} className="flex items-center justify-center">
              {day}
            </div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => {
            const isToday =
              day === today.getDate() &&
              month === today.getMonth() &&
              year === today.getFullYear();

            return (
              <div
                key={index}
                className={`w-12 h-12 flex justify-center items-center rounded-lg font-medium cursor-pointer transition-all text-white ${
                  isToday ? "bg-red-500 rounded-full " : " text-white"
                }`}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Calender;
