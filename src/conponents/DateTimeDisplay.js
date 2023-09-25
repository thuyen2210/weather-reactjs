import React, { useState, useEffect } from 'react';
import moment from 'moment';

function mapDayOfWeek(dayOfWeek) {
  const daysOfWeekMap = {
    Monday: 'Thứ Hai',
    Tuesday: 'Thứ Ba',
    Wednesday: 'Thứ Tư',
    Thursday: 'Thứ Năm',
    Friday: 'Thứ Sáu',
    Saturday: 'Thứ Bảy',
    Sunday: 'Chủ Nhật',
  };

  return daysOfWeekMap[dayOfWeek] || dayOfWeek;
}

function DateTimeDisplay() {
  const [currentDateTime, setCurrentDateTime] = useState({
    time: moment().format('HH:mm:ss'),
    date: moment().format('DD-MM-YYYY'),
    dayOfWeek: moment().format('dddd'), // Lấy tên ngày trong tuần (thứ hai, thứ ba, ...)
  });

  useEffect(() => {
    // Cập nhật thời gian hiện tại mỗi giây
    const intervalId = setInterval(() => {
      setCurrentDateTime({
        time: moment().format('HH:mm:ss'),
        date: moment().format('DD-MM-YYYY'),
        dayOfWeek: moment().format('dddd'),
      });
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="date-time-display" style={{display: 'flex',fontSize: '18px',fontWeight: 'lighter'}}>
      <p> {currentDateTime.time}, {currentDateTime.date}, {mapDayOfWeek(currentDateTime.dayOfWeek)} </p>
    </div>
  );
}

export default DateTimeDisplay;
