import React from "react";
import Calendar from "../DayjsCalendar/index.jsx";
// import dayjs from "dayjs";

export default {
  title: "DayjsCalendar",
  component: Calendar
};

export const Year = () => <Calendar displayLocale="en" calendarRange="year" />;
export const CalendarYear = () => (
  <Calendar displayLocale="en" calendarRange="calendarYear" />
);
export const FullYear = () => (
  <Calendar displayLocale="en" calendarRange="full" />
);
export const All = () => (
  <>
    <Year />
    <br />
    <hr />
    <CalendarYear />
    <br />
    <hr />
    <FullYear />
    <br />
  </>
);
