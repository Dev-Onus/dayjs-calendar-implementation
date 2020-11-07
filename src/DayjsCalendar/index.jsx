import React, { useState, useEffect, useRef } from "react";
import CalendarHeader from "./header";
import CalendarView from "./view";
import { getMonth, getYear } from "./utils";
import dayjs from "dayjs";

const Calendar = ({
  calendarView = "normal", // normal or weekdays
  calendarRange = "calendarYear", // year, calendarYear, full, custom
  displayLocale = "en", // en or es
  forwardedRef = null
}) => {
  const [enableWeekdays, setWeekDays] = useState(false);
  const [layoutWidth, setLayoutWidth] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [monthPosition, setMonthPosition] = useState(0);

  const calendarRef = useRef();

  const getMonthHeight = () => {
    const layoutElm = calendarRef?.current?.querySelector(".layout");
    setLayoutWidth(layoutElm.getBoundingClientRect().width);
  };

  useEffect(() => {
    getMonthHeight();
  }, []);

  const getElemWidth = (ref, className) =>
    ref.current.querySelector(`.${className}`).getBoundingClientRect().width;

  const computeMaxHeight = (ref, className, numToMultiply) =>
    getElemWidth(ref, className) * numToMultiply;

  useEffect(() => {
    const layoutElm = calendarRef?.current?.querySelector(".layout");
    layoutElm.style.transform = "translate(0%, -" + scrollTop + "px)";
  }, [scrollTop]);

  const handleToggle = () => {
    setWeekDays(!enableWeekdays);
  };

  const handleScrollUp = () => {
    // const railElm = calendarRef?.current?.querySelector(".layout-rail");
    // let monthHeight = (!enableWeekdays ? 0.86 : 1.2) * layoutWidth;
    if (monthPosition < 10) {
      setMonthPosition(monthPosition + 1);
      setScrollTop(scrollTop + computeMaxHeight(calendarRef, "cell", 6));
    }
  };

  const handleScrollDown = () => {
    // const railElm = calendarRef?.current?.querySelector(".layout-rail");
    // let monthHeight = (!enableWeekdays ? 0.86 : 1.2) * layoutWidth;
    if (monthPosition > 0) {
      setMonthPosition(monthPosition - 1);
      setScrollTop(scrollTop - computeMaxHeight(calendarRef, "cell", 6));
    }
  };

  return (
    <div>
      <CalendarHeader
        {...{
          handleToggle,
          handleScrollUp,
          handleScrollDown,
          monthPosition,
          calendarRange: "calendarYear",
          month: getMonth(dayjs()),
          year: getYear(dayjs())
        }}
      />
      <CalendarView
        forwardedRef={calendarRef}
        displayLocale="en"
        calendarRange="year"
        calendarView={enableWeekdays ? "weekdays" : "normal"}
      />
    </div>
  );
};

Calendar.defaultProps = {
  calendarView: "normal", // normal or weekdays
  calendarRange: "calendarYear", // year, calendarYear, full, custom
  displayLocale: "en", // en or es
  forwardedRef: null
};

export default Calendar;
