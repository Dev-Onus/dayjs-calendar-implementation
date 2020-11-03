import React, { useState, useEffect } from "react";
import "./index.css";
import dayjs from "dayjs";
import "dayjs/locale/es";
import * as ObjectSupport from "dayjs/plugin/objectSupport";
import * as localeData from "dayjs/plugin/localeData";

dayjs.extend(localeData);
dayjs.extend(ObjectSupport);

const getCalendarLocale = (displayLocale = "en") => {
  dayjs.locale(displayLocale);
  return [dayjs.monthsShort(), dayjs.weekdaysMin()];
};

const getCalendarList = (calendarRange = "year") => {
  let calendarStart = null;
  let calendarEnd = null;

  switch (calendarRange) {
    case "calendarYear":
      calendarStart = dayjs().set({ M: 4, d: 1 });
      calendarEnd = dayjs().set({ M: 3, d: 31 }).add({ y: 1 });
      break;
    case "fulll":
      calendarStart = dayjs().set({ M: 4, d: 1 });
      calendarEnd = dayjs().set({ M: 3, d: 31 }).add({ y: 1 });
      break;
    case "year":
    default:
      calendarStart = dayjs();
      calendarEnd = dayjs().add({ M: 12 });
      break;
  }

  return [calendarStart, calendarEnd];
};

const Calendar = ({ calendarRange = "calendarYear", displayLocale = "en" }) => {
  const [monthLocale, setMonthLocale] = useState(null);
  const [weekLocale, setWeekLocale] = useState(null);
  const [calendar, setCalendar] = useState([]);

  //do something on mount
  useEffect(() => {
    const [months, weeks] = getCalendarLocale(displayLocale);
    setMonthLocale(months);
    setWeekLocale(weeks);
  }, [displayLocale]);

  //do something on mount
  useEffect(() => {
    setCalendar(getCalendarList());
  }, [calendarRange, monthLocale, weekLocale]);

  return (
    <div>
      Hello
      {JSON.stringify(monthLocale, null, 4)}
      {JSON.stringify(weekLocale, null, 4)}
      {/* {JSON.stringify(weekLocale, null, 4)} */}
      {JSON.stringify(calendar, null, 4)}
    </div>
  );
};

Calendar.defaultProps = {
  calenderRange: "year", // year, calendarYear, full, custom
  displayLocale: "en"
};
export default Calendar;
