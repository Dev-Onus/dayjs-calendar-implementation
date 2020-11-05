import React, { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import "dayjs/locale/es";
import * as ObjectSupport from "dayjs/plugin/objectSupport";
import * as localeData from "dayjs/plugin/localeData";
import * as weekOfYear from "dayjs/plugin/weekOfYear";
import * as weekday from "dayjs/plugin/weekday";
import * as weekYear from "dayjs/plugin/weekYear";
import "./index.css";

dayjs.extend(localeData);
dayjs.extend(ObjectSupport);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(weekday);

window.d1 = dayjs();
window.dc = dayjs;

const totalNoOfWeeks = 52;
const maxNoOfWeeksInCalendar = 72;

const getCalendarLocale = (displayLocale = "en") => {
  dayjs.locale(displayLocale);
  return [dayjs.monthsShort(), dayjs.weekdaysMin()];
};

const getFormattedDateString = (date) => {
  return date.format("DD dd MM MMMM YYYY");
};

const fs = getFormattedDateString;

const getDaysInMonths = (calendarRange, selectedMonth, selectedYear) => {
  const lastOfMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const [jan, , ...rest] = lastOfMonths;
  let yearofFeb = selectedYear;

  switch (calendarRange) {
    case "calendarYear": //starts in Mar, so feb will be next year
      yearofFeb = selectedYear + 1;
      break;
    case "full": // need to decide based on the current month is.
    case "year": // need to decide based on the current month is.
    default:
      yearofFeb = selectedMonth <= 1 ? selectedYear : selectedYear + 1;
      break;
  }

  return [jan, dayjs().year(yearofFeb).month(1).daysInMonth(), ...rest];
};

const getFirstDayofMonths = () => new Array(12).fill(1);

const getCalendarList = (
  calendarRange = "year",
  selectedDatetime = dayjs()
) => {
  // const selectedDate = selectedDatetime.date();
  const selectedMonth = selectedDatetime.month();
  const selectedYear = selectedDatetime.year();
  const firstOfMonths = getFirstDayofMonths();
  const lastOfMonths = getDaysInMonths(
    calendarRange,
    selectedMonth,
    selectedYear
  );
  let calendarStart = null;
  let calendarEnd = null;
  let fluidLayout = false;

  switch (calendarRange) {
    case "calendarYear":
      calendarStart = dayjs().month(3).date(1);
      calendarEnd = dayjs()
        .year(selectedYear + 1)
        .month(2)
        .date(lastOfMonths[2]);
      break;
    case "full":
      calendarStart = dayjs().year(selectedYear).month(selectedMonth).date(1);
      calendarEnd = calendarStart.clone().add({ M: 11 });
      fluidLayout = true;
      break;
    case "year":
    default:
      calendarStart = dayjs().year(selectedYear).month(selectedMonth).date(1);
      calendarEnd = calendarStart.clone().add({ M: 11 });
      break;
  }

  return [
    fs(calendarStart),
    fs(calendarEnd),
    fluidLayout,
    firstOfMonths,
    lastOfMonths
  ];
};

const getScreenWidth = (ref, className) =>
  ref.current.querySelector(`.${className}`).offsetWidth;

const Calendar = ({
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
  const [isResized, setResized] = useState(false);
  const [maxHeight, setMaxHeight] = useState(null);

  const cellsRef = useRef();

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
    // con
    if (calenderLayout.length > 0 && isResized) {
      setMaxHeight(
        getScreenWidth(containerRef.current.querySelector(".cells")) *
          daysInView
      );
    }
  }, [isResized, calenderLayout]);

  const handleResize = () => {
    setResized(!isResized);
  };

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
            <div
              className={`layout `}
              // onResize={handleResize}
            >
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

Calendar.defaultProps = {
  calenderRange: "year", // year, calendarYear, full, custom
  displayLocale: "en"
};
export default Calendar;
