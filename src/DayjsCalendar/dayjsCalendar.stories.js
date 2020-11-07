import React, { useState, useRef, useEffect } from "react";
import Calendar from "../DayjsCalendar/index.jsx";
import CalendarHeader from "../DayjsCalendar/header.jsx";
// import dayjs from "dayjs";
import { getFirstDayOffsetInMonths } from "../DayjsCalendar/utils";
import results from "../../test-results.json";
import { withTests } from "@storybook/addon-jest";

export default {
  title: "DayjsCalendar",
  component: Calendar,
  decorators: [withTests({ results })]
};

console.log(getFirstDayOffsetInMonths("", 10, 2020), "monthOffsets");
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

// const Wrapper = () => {
//   const [enableWeekdays, setWeekDays] = useState(false);
//   const handleToggle = () => {
//     setWeekDays(!enableWeekdays);
//   };
//   return (
//     <div>
//       <button onClick={handleToggle}>Toggle weekends</button>
//       <Year enableWeekDays={enableWeekdays} />
//     </div>
//   );
// };

export const defaultView = () => <div>Jest results in storybook</div>;
defaultView.parameters = {
  jest: ["LoginForm.test.js"]
};
