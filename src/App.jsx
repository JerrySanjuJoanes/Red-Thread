import { useState } from "react";
import "./App.css";
import Calendar from "./components/Calender"; // Fixed typo: "Calender" -> "Calendar"

function App() {
  return (
    <div className="h-screen bg-gray-100">
      <div className="w-full h-1/2 flex gap-5 p-5">
        {/* Left Section */}
        <div className="w-1/2 bg-slate-300 rounded-lg shadow-md"></div>

        {/* Right Section */}
        <div className="w-1/2 h-fit flex justify-center items-center  ">
          <Calendar />
        </div>
      </div>
    </div>
  );
}

export default App;
