import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/es";
import * as ObjectSupport from "dayjs/plugin/objectSupport";
import * as localeData from "dayjs/plugin/localeData";
import * as weekOfYear from "dayjs/plugin/weekOfYear";
import * as weekday from "dayjs/plugin/weekday";
import * as weekYear from "dayjs/plugin/weekYear";
import {
  getCalendarLocale,
  getFormattedDateString,
  getDaysInMonths,
  getFirstDayofMonths,
  getCalendarList,
  getElemWidth,
  totalNoOfWeeks,
  maxNoOfWeeksInCalendar
} from "./utils.js";
import "./index.css";

dayjs.extend(localeData);
dayjs.extend(ObjectSupport);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(weekday);

window.d1 = dayjs();
window.dc = dayjs;

const CalendarView = ({
  calendarView = "normal", // normal or weekdays
  calendarRange = "calendarYear", // year, calendarYear, full, custom
  displayLocale = "en", // en or es
  forwardedRef = null
}) => {
  const uniq = Math.floor(Math.random() * 1000);
  const [monthLocale, setMonthLocale] = useState(null);
  const [weekLocale, setWeekLocale] = useState(null);
  const [calendar, setCalendar] = useState([]);
  const [daysInView, setDaysInView] = useState(
    calendarView === "normal" ? 7 : 5
  );
  const [calenderLayout, setCalenderLayout] = useState([]);
  const [monthClassNames, setMonthClassNames] = useState("month-normal");
  const [containerClassNames, setContainerClassNames] = useState(
    "container-normal"
  );

  useEffect(() => {
    let days = 7;
    let monthClassName = "month-normal";
    let containerClassName = "container-normal";
    switch (calendarView) {
      case "weekdays":
        days = 5;
        monthClassName = "month-weekdays";
        containerClassName = "container-weekdays";
        break;
      case "normal":
      default:
        days = 7;
        monthClassName = "month-normal";
        containerClassName = "container-normal";
        break;
    }
    setDaysInView(days);
    setMonthClassNames(monthClassName);
    setContainerClassNames(containerClassName);
  }, [calendarView]);

  // construct the array based on the days & weeks count.
  useEffect(() => {
    setCalenderLayout(
      new Array(12)
        .fill(" ")
        .map((_, idx) => new Array(daysInView * 6).fill(" "))
    );
  }, [daysInView]);

  //do something on mount
  useEffect(() => {
    const [months, weeks] = getCalendarLocale(displayLocale);
    setMonthLocale(months);
    setWeekLocale(weeks);
  }, [displayLocale]);

  //do something on mount
  useEffect(() => {
    setCalendar(getCalendarList(calendarRange));
  }, [calendarRange, monthLocale, weekLocale]);

  useEffect(() => {
    // console.log(
    //   containerRef.current,
    //   containerRef.current.querySelector(".layout"),
    //   cellsRef,
    //   "cell conatinerRef"
    // );
    // const exactContainer = containerRef.current.querySelector(".layout");
    // console.log(
    //   exactContainer.querySelector("div.cell"),
    //   containerRef.current.querySelector("div.cell"),
    //   "cell"
    // );
    // console.log(
    //   cellsRef.current,
    //   cellsRef?.current?.clientWidth,
    //   "overall width"
    // );
    // console.log(
    //   forwardedRef,
    //   forwardedRef?.current,
    //   forwardedRef?.current?.querySelector(".cell"),
    //   "Inn calenderLayout updates"
    // );
    // if (calenderLayout.length > 0 || isResized) {
    //   setMaxHeight(getElemWidth(forwardedRef, "cell") * 6);
    //   console.log({
    //     screenWidth: getElemWidth(forwardedRef, "cell"),
    //     correctHeight: getElemWidth(forwardedRef, "cell") * 6
    //   });
    // }
  }, [calenderLayout]);

  console.log(calenderLayout, "calenderLayout");

  return (
    <div>
      Hello, {calendarRange} - {displayLocale}
      <br />
      {JSON.stringify(monthLocale, null, 4)}
      {JSON.stringify(weekLocale, null, 4)}
      {/* {JSON.stringify(weekLocale, null, 4)} */}
      {JSON.stringify(calendar, null, 4)}
      <div style={{ width: "600px" }}>
        <div className={`container ${containerClassNames}`} ref={forwardedRef}>
          <div className="layout-rail">
            <div className={`layout `}>
              {calenderLayout.map((monthLayout, index) => {
                return (
                  <div className={`month ${monthClassNames}`}>
                    {monthLayout.map((value, index) => {
                      return (
                        <>
                          <div className="cell" data-place-id={index}>
                            <div className="aspect-ratio"></div>
                            <div className="content-area">
                              <div className="center-content">{index}</div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CalendarView.defaultProps = {
  calenderRange: "year", // year, calendarYear, full, custom
  displayLocale: "en"
};

export default CalendarView;
