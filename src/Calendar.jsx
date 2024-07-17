import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import styles for react-calendar

const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (date) => {
    setDate(date);
  };

  return (
    <div className="calendar-container rounded-md text-sm">
      <h2>Calendar</h2>
      <Calendar
        onChange={onChange}
        value={date}
        className="custom-calendar-class" // Optional: You can customize with your own CSS class
      />
    </div>
  );
};

export default CalendarComponent;
