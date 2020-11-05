import React, { useState, useRef, useEffect } from "react";
import Calendar from "../DayjsCalendar/index.jsx";
// import dayjs from "dayjs";

export default {
  title: "DayjsCalendar",
  component: Calendar
};

export const Year = () => {
  const [enableWeekdays, setWeekDays] = useState(false);
  const [layoutWidth, setLayoutWidth] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const calendarRef = useRef();

  const getMonthHeight = () => {
    const layoutElm = calendarRef?.current?.querySelector(".layout");
    setLayoutWidth(layoutElm.getBoundingClientRect().width);
  };

  useEffect(() => {
    getMonthHeight();
  }, []);

  useEffect(() => {
    const layoutElm = calendarRef?.current?.querySelector(".layout");
    // layoutElm.scrollTo(0, scrollTop);
    console.log("Inn scrolTop####");
    layoutElm.style.transform = "translate(0%, -" + scrollTop + "px)";
  }, [scrollTop]);

  const handleToggle = () => {
    setWeekDays(!enableWeekdays);
  };

  const handleScrollUp = () => {
    const railElm = calendarRef?.current?.querySelector(".layout-rail");
    let monthHeight = (!enableWeekdays ? 0.86 : 1.2) * layoutWidth;
    setScrollTop(scrollTop + monthHeight + 0);
    // setScrollTop(scrollTop + 8.3);
    // debugger;
    // console.log(monthHeight, "monthHeight");
  };

  const handleScrollDown = () => {
    const railElm = calendarRef?.current?.querySelector(".layout-rail");
    let monthHeight = (!enableWeekdays ? 0.86 : 1.2) * layoutWidth;
    setScrollTop(scrollTop - monthHeight + 0);
    // setScrollTop(scrollTop - 8.3);
    // debugger;
  };

  return (
    <div>
      <button onClick={handleToggle}>Toggle weekends</button>
      <button onClick={handleScrollUp}>Scroll up</button>
      <button onClick={handleScrollDown}>Scroll down</button>
      <Calendar
        forwardedRef={calendarRef}
        displayLocale="en"
        calendarRange="year"
        calendarView={enableWeekdays ? "weekdays" : "normal"}
      />
    </div>
  );
};

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
