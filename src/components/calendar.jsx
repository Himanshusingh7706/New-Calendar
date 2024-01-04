import React from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function Calendar() {
    return (
        <div>
            <Fullcalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={"dayGridMonth"}
                headerToolbar={{
                    start: "today prev,next",
                    end: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                height={"90vh"}
            />
        </div>
    );
}

export default Calendar;
// import React, { useState, useEffect } from 'react';

// const Calendar = () => {
//     const [selectedDate, setSelectedDate] = useState(new Date());
//     const [timezone, setTimezone] = useState('UTC+0');
//     const [workingDays, setWorkingDays] = useState([]);
//     const [workingHours, setWorkingHours] = useState({ start: 8, end: 23 });

//     const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//     const currentMonth = selectedDate.getMonth();
//     const currentYear = selectedDate.getFullYear();

//     const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
//     const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
//     const daysInMonth = lastDayOfMonth.getDate();

//     const startDay = firstDayOfMonth.getDay();

//     useEffect(() => {
//         // Set default working days (Mon to Fri)
//         setWorkingDays([1, 2, 3, 4, 5]);
//     }, []);

//     const renderDays = () => {
//         const days = [];

//         // Fill in the days before the first day of the month
//         for (let i = 0; i < startDay; i++) {
//             days.push(<div key={`empty-${i}`} className="empty-day"></div>);
//         }

//         // Fill in the days of the month
//         for (let i = 1; i <= daysInMonth; i++) {
//             days.push(
//                 <div
//                     key={i}
//                     className={`calendar-day ${i === selectedDate.getDate() ? 'selected' : ''
//                         }`}
//                     onClick={() => handleDateClick(i)}
//                 >
//                     {i}
//                 </div>
//             );
//         }

//         return days;
//     };

//     const handleDateClick = (day) => {
//         const newDate = new Date(currentYear, currentMonth, day);
//         setSelectedDate(newDate);
//     };

//     const handleWeekChange = (direction) => {
//         const newDate = new Date(selectedDate);
//         direction === 'prev'
//             ? newDate.setDate(selectedDate.getDate() - 7)
//             : newDate.setDate(selectedDate.getDate() + 7);

//         setSelectedDate(newDate);
//     };

//     const handleTimezoneChange = (event) => {
//         setTimezone(event.target.value);
//     };

//     const handleWorkingDaysChange = (day) => {
//         const updatedWorkingDays = workingDays.includes(day)
//             ? workingDays.filter((d) => d !== day)
//             : [...workingDays, day];

//         setWorkingDays(updatedWorkingDays);
//     };

//     const handleWorkingHoursChange = (field, value) => {
//         setWorkingHours({
//             ...workingHours,
//             [field]: value,
//         });
//     };

//     const displayTimes = () => {
//         const times = [];
//         for (let i = workingHours.start; i <= workingHours.end; i++) {
//             times.push(
//                 <div key={i} className="time">
//                     {convertToLocalTime(i)}:00
//                 </div>
//             );
//         }
//         return times;
//     };

//     // const convertToLocalTime = (hour) => {
//     //     const localTime = new Date(selectedDate);
//     //     localTime.setUTCHours(hour);
//     //     return localTime.toLocaleTimeString('en-US', { hour: 'numeric', hour12: false, timeZone: timezone });
//     // };
//     // const convertToLocalTime = (hour) => {
//     //     const localTime = new Date(selectedDate);
//     //     localTime.setUTCHours(hour);

//     //     const formattedTime = localTime.toLocaleTimeString('en-US', {
//     //         hour: 'numeric',
//     //         minute: 'numeric',
//     //         hour12: false,
//     //         timeZone: timezone,
//     //     });

//     //     return formattedTime;
//     // };
//     const convertToLocalTime = (hour) => {
//         const localTime = new Date(selectedDate);
//         localTime.setUTCHours(hour);

//         const formattedTime = localTime.toLocaleTimeString('en-US', {
//             hour: 'numeric',
//             minute: 'numeric',
//             hour12: false,
//             timeZone: 'Etc/GMT',
//         });

//         return formattedTime;
//     };

//     return (
//         <div className="calendar">
//             <div className="header">
//                 <button onClick={() => handleWeekChange('prev')}>Prev Week</button>
//                 <h2>{`${currentYear}/${currentMonth + 1}`}</h2>
//                 <button onClick={() => handleWeekChange('next')}>Next Week</button>
//             </div>
//             <div className="timezone-select">
//                 <label>Select Timezone: </label>
//                 <select onChange={handleTimezoneChange} value={timezone}>
//                     <option value="UTC+0">UTC+0</option>
//                     <option value="UTC+2">UTC+2</option>
//                 </select>
//             </div>
//             <div className="working-days">
//                 {daysOfWeek.map((day, index) => (
//                     <div key={day} className="day">
//                         <label>
//                             <input
//                                 type="checkbox"
//                                 checked={workingDays.includes(index) ? true : false}
//                                 onChange={() => handleWorkingDaysChange(index)}
//                             />
//                             {day}
//                         </label>
//                     </div>
//                 ))}
//             </div>
//             <div className="working-hours">
//                 <div>
//                     <label>Start Time: </label>
//                     <input
//                         type="number"
//                         min="0"
//                         max="23"
//                         value={workingHours.start}
//                         onChange={(e) => handleWorkingHoursChange('start', parseInt(e.target.value))}
//                     />
//                 </div>
//                 <div>
//                     <label>End Time: </label>
//                     <input
//                         type="number"
//                         min="0"
//                         max="23"
//                         value={workingHours.end}
//                         onChange={(e) => handleWorkingHoursChange('end', parseInt(e.target.value))}
//                     />
//                 </div>
//             </div>
//             <div className="days-of-week">
//                 {daysOfWeek.map((day) => (
//                     <div key={day} className="day">
//                         {day}
//                     </div>
//                 ))}
//             </div>
//             <div className="days">{renderDays()}</div>
//             <div className="times">{displayTimes()}</div>
//         </div>
//     );
// };

// export default Calendar;
