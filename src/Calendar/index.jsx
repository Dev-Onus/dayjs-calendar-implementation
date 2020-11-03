import React, { useState, useEffect } from "react";
import Header from "./header";
import "./index.css";
import dayjs from "dayjs";
const updateLocale = require("dayjs/plugin/updateLocale");
dayjs.extend(updateLocale);

const localeData = require("dayjs/plugin/localeData");
dayjs.extend(localeData);

const isBetween = require("dayjs/plugin/isBetween");
dayjs.extend(isBetween);

const isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
dayjs.extend(isSameOrBefore);

dayjs().localeData();

dayjs.updateLocale("en", {
  weekdays: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ],
  weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  // months: [
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December"
  // ]
});

const Calendar = ({
  variant,
  excludeWeekends,
  minDate,
  maxDate,
  datesList,
  isDatesOperable
}) => {
  const [dateObject, setDateObject] = useState(dayjs());
  const [weekDaysLong, setWeekDaysLong] = useState(dayjs.weekdays());
  const [months, setMonths] = useState(dayjs.months());
  const [isMinNextmonth, setMinNextMonth] = useState(false);
  const [animation, setAnimation] = useState("animated fadeInRight");

  useEffect(() => {
    setMinNextMonth(dayjs(dateObject).isSameOrBefore(minDate, "month"));
  }, [minDate]);

  useEffect(() => {
    // console.log(isMinNextmonth, "isMinNextmonth");
    if (minDate && maxDate && isMinNextmonth) {
      setDateObject(dayjs(dateObject).set("month", dayjs(minDate).month()));
    }
  }, [isMinNextmonth]);

  const firstDayOfMonth = () => {
    // console.log(dateObject, "Dobj first day");
    return dayjs(dateObject).startOf("month").format("d");
  };

  const daysInMonth = () => dayjs(dateObject).daysInMonth();

  const month = () => dateObject.format("MMMM");

  const year = () => dateObject.format("YYYY");

  const formatYYYYMMDD = (d) => dayjs(d).format("YYYY-MM-DD");

  const areDatesEqual = (d1, d2) => formatYYYYMMDD(d1) === formatYYYYMMDD(d2);

  const getPrevMonthDates = () =>
    dayjs(dateObject).set("month", dayjs(dateObject).month() - 1);

  const getNextMonthDates = () =>
    dayjs(dateObject).set("month", dayjs(dateObject).month() + 1);

  const daysInLastMonth = () => getPrevMonthDates().daysInMonth();

  const daysInNextMonth = () => getNextMonthDates().daysInMonth();

  const setDate = (year, month, date) => {
    return dayjs(dateObject)
      .set("year", year)
      .set("month", month)
      .set("date", date);
  };
  const instanceDate = (instance, label) => {
    const thisDate = setDate(year(), dayjs(dateObject).month(), instance);
    const nextDate = setDate(year(), dayjs(dateObject).month() + 1, instance);
    const prevDate = setDate(year(), dayjs(dateObject).month() - 1, instance);

    if (label === "next") {
      return nextDate;
    } else if (label === "prev") {
      return prevDate;
    }
    return thisDate;
  };

  const currentDate = () => dayjs();

  const decMonth = () => {
    if (canDecrement()) {
      setAnimation("animated fadeOutRight");
      setTimeout(() => {
        setAnimation("animated fadeInLeft");
        setDateObject(getPrevMonthDates());
      }, 300);
    }
  };

  const incMonth = () => {
    if (canIncrement()) {
      setAnimation("animated fadeOutLeft");
      setTimeout(() => {
        setAnimation("animated fadeInRight");
        setDateObject(getNextMonthDates());
      }, 300);
    }
  };

  const dateToStartPrevMonth = () => daysInLastMonth() - firstDayOfMonth() + 1;

  const isBetweenDates = (d1, d2, d3) => {
    // console.log({ d1, d2, d3 }, "d1,d2,d3 dates");
    // console.log(
    //   dayjs(d1).isBetween(d2, d3, null, "[]"),
    //   { d1, d2, d3 },
    //   "Return statement"
    // );
    return dayjs(d1).isBetween(d2, d3, null, "[]");
  };

  const isWeekend = (d) => {
    return dayjs(d).day() % 6 === 0;
  };

  const rowCondition = (i) => {
    if (!excludeWeekends) {
      return i % 7 !== 0;
    } else {
      return i % 5 !== 0;
    }
  };

  const generalBtwCondition = ({ minDate, maxDate, instDate }) => {
    if (minDate && maxDate) {
      // console.log(
      //   {
      //     instDate,
      //     betweenDates: isBetweenDates(
      //       formatYYYYMMDD(instDate),
      //       formatYYYYMMDD(minDate),
      //       formatYYYYMMDD(maxDate)
      //     )
      //   },
      //   "generalBtwCondition"
      // );
      return (
        minDate &&
        maxDate &&
        isBetweenDates(
          formatYYYYMMDD(instDate),
          formatYYYYMMDD(minDate),
          formatYYYYMMDD(maxDate)
        )
      );
    }
    return false;
  };

  const isBetweenCondition = ({ variant, minDate, maxDate, instDate }) => {
    if (variant === "continue") {
      return (
        variant === "continue" &&
        instDate &&
        generalBtwCondition({ minDate, maxDate, instDate })
      );
    }
    return generalBtwCondition({ minDate, maxDate, instDate });
  };

  const isBetweenClass = ({ variant, minDate, maxDate, instDate }) => {
    // console.log(
    //   {
    //     instDate,
    //     betweenDate: isBetweenCondition({ variant, minDate, maxDate, instDate })
    //   },
    //   "general btwn class###"
    // );
    if (
      !canDisable(instDate) &&
      isBetweenCondition({ variant, minDate, maxDate, instDate })
    ) {
      return "isbetween";
    }
    return "";
  };

  const enableOnlyBtw = ({ variant, minDate, maxDate, instDate }) => {
    if (
      minDate &&
      maxDate &&
      !isBetweenCondition({ variant, minDate, maxDate, instDate })
    ) {
      return true;
    }
    return false;
  };

  const isSameDate = (d1, d2) => {
    return dayjs(formatYYYYMMDD(d1)).isSame(dayjs(formatYYYYMMDD(d2)));
  };

  const isDateLesser = (d1, d2) => {
    // console.log(
    //   { d1, d2 },
    //   dayjs(formatYYYYMMDD(d1)).isBefore(dayjs(formatYYYYMMDD(d2))),
    //   "isDateLesser"
    // );
    return dayjs(formatYYYYMMDD(d1)).isBefore(dayjs(formatYYYYMMDD(d2)));
  };

  const canIncrement = () => {
    if (maxDate) {
      // console.log(
      //   {
      //     instDate: instanceDate(daysInMonth()),
      //     dateLesser: isDateLesser(maxDate, instanceDate(daysInMonth()))
      //   },
      //   "canInc,dayInMonth"
      // );
      return !(
        isSameDate(maxDate, instanceDate(daysInMonth())) ||
        isDateLesser(maxDate, instanceDate(daysInMonth()))
      );
    }
    return true;
  };

  const canDecrement = () => {
    if (minDate) {
      // console.log(dateObject, "canDec,dayInMonth");
      return !(
        isSameDate(instanceDate(1), minDate) ||
        isDateLesser(instanceDate(1), minDate)
      );
    }
    return true;
  };

  const inclusion = () => datesList.length > 0 && isDatesOperable;

  const exclusion = () => datesList.length > 0 && !isDatesOperable;

  const isExcluded = (datesList, instDate, isOperable) => {
    return datesList.reduce((acc, cur) => {
      // console.log(
      //   {
      //     acc,
      //     cur: formatYYYYMMDD(dayjs(cur)),
      //     instDate: formatYYYYMMDD(dayjs(instDate))
      //   },
      //   "reduce cur exclusion"
      // );
      return (
        acc ||
        areDatesEqual(
          formatYYYYMMDD(dayjs(cur)),
          formatYYYYMMDD(dayjs(instDate))
        )
      );
    }, isOperable);
  };

  const canDisable = (instDate) => {
    if (inclusion()) {
      // console.log(
      //   { instDate },
      //   isExcluded(datesList, instDate, isDatesOperable),
      //   "instDate isInclusion"
      // );
      return !isExcluded(datesList, instDate, !isDatesOperable);
    }
    if (exclusion()) {
      // console.log(
      //   { instDate },
      //   isExcluded(datesList, instDate, isDatesOperable),
      //   "instDate isExclusion"
      // );
      return isExcluded(datesList, instDate, isDatesOperable);
    }
    return false;
  };

  const addAriaSelectedAttr = (d1, d2) => {
    if (areDatesEqual(d1, d2)) {
      return {
        "aria-selected": "true"
      };
    }
    return null;
  };

  let blanks = [];
  let position = 1;
  // const firstMonthDay = excludeWeekends
  //   ? firstDayOfMonth() > 0 && firstDayOfMonth() < 6 && firstDayOfMonth() - 1
  //   : firstDayOfMonth();
  const getFirstMonthDay = () => {
    if (firstDayOfMonth() > 1 && firstDayOfMonth() < 5) {
      return firstDayOfMonth() - 1;
    } else if (firstDayOfMonth() === 5 || firstDayOfMonth() === 6) {
      return firstDayOfMonth() + 1;
    }
    return firstDayOfMonth();
  };
  const firstMonthDay = excludeWeekends
    ? getFirstMonthDay()
    : firstDayOfMonth();
  // console.log({ firstDay: firstDayOfMonth() }, "firstDayOfMonth");
  for (let i = 0; i < firstDayOfMonth(); i++) {
    // console.log(daysInLastMonth() - firstDayOfMonth(), "daysInLastMonth");
    // const dateToStartPrevMonth = daysInLastMonth() - firstDayOfMonth();
    // const currentDate = dayjs();
    // let monthNo = months.indexOf(month());
    // let thisDate = dateObject.set("date", i);
    // thisDate.set("month", monthNo);
    // thisDate.set("year", year());
    // console.log(isWeekend(instanceDate(i)), "isWeekend(instanceDate(i)");
    const firstDate = dateToStartPrevMonth();
    // console.log({ firstDate }, "firstDate to start continue");
    // console.log(
    //   dateToStartPrevMonth(),
    //   month(),
    //   firstDayOfMonth(),
    //   "dateToStartPrevMonth"
    // );
    if (excludeWeekends && isWeekend(instanceDate(firstDate + i, "prev"))) {
      //   // return;
      // console.log(
      //   { i, instDate: instanceDate(firstDate + i, "prev") },
      //   "isexcluded"
      // );
      position++;
    } else {
      // console.log(
      //   {
      //     i,
      //     position,
      //     instanceDate: instanceDate(firstDate + i, "prev"),
      //     variant
      //   },
      //   "INNN Else blanks not excluded"
      // );
      console.log(
        canDisable(instanceDate(firstDate + i, "prev")),
        "blankDates"
      );
      blanks.push(
        <td
          className={`calendar-day ${
            variant === "continue" ? "dateCell" : "empty"
          }  ${isBetweenClass({
            variant,
            minDate,
            maxDate,
            instDate: instanceDate(firstDate + i, "prev")
          })}`}
          data-date={instanceDate(firstDate + i, "prev")}
        >
          {variant === "continue" ? (
            <button
              className={`dateButton ${
                enableOnlyBtw({
                  variant,
                  minDate,
                  maxDate,
                  instDate: instanceDate(firstDate + i, "prev")
                }) || canDisable(instanceDate(firstDate + i, "prev"))
                  ? "disabled"
                  : ""
              }`}
              // disabled={

              // }
              // tabindex={d === Number(currentDay()) ? "0" : "-1"}
              tabindex={
                areDatesEqual(dateObject, instanceDate(firstDate + i, "prev"))
                  ? "0"
                  : "-1"
              }
              {...addAriaSelectedAttr(
                dateObject,
                instanceDate(firstDate + i, "prev")
              )}
            >
              {/* {firstDate + i + position} */}
              {/* {firstDate + i + position} */}
              {firstDate + i}
              {/* {excludeWeekends
                ? firstDate + 1 + i + position
                : firstDate + 1 + i} */}
            </button>
          ) : (
            ""
          )}

          {/* <button className="dateButton" tabindex={"-1"} disabled="">
            {""}
          // </button> */}
        </td>
      );
    }
  }
  let weekDays = dayjs.weekdaysShort();
  let monthDays = [];
  for (let d = 1; d <= daysInMonth(); d++) {
    // console.log(dateObject, "getDate()");
    // const currentDate = dayjs();
    // let monthNo = months.indexOf(month());
    // let thisDate = dateObject.set("date", d);
    // thisDate.set("month", monthNo);
    // thisDate.set("year", year());

    // console.log(thisDate, "thisDate##@");
    // const thisDate = dateObject.date(d);
    // thisDate.set('month',)

    // console.log(month(), thisDate, d, "DateEqual");
    //console.log(areDatesEqual(currentDate, thisDate), "DaysrrR");
    // if (excludeWeekEnds) {
    //   if (thisDate.day() === 0 || thisDate.day() === 6) {
    //     break;
    //   }
    // }
    if (excludeWeekends && isWeekend(instanceDate(d))) {
      // return;
      // console.log(instanceDate(d), "I am a excluded date");
    } else {
      monthDays.push(
        <td
          key={d}
          className={`calendar-day dateCell
            ${isBetweenClass({
              variant,
              minDate,
              maxDate,
              instDate: instanceDate(d)
            })}
          `}
          data-date={instanceDate(d)}
        >
          <button
            // disabled={
            //   enableOnlyBtw({
            //     variant,
            //     minDate,
            //     maxDate,
            //     instDate: instanceDate(d)
            //   }) || canDisable(instanceDate(d))
            // }
            className={`dateButton ${
              enableOnlyBtw({
                variant,
                minDate,
                maxDate,
                instDate: instanceDate(d)
              }) || canDisable(instanceDate(d))
                ? "disabled"
                : ""
            }`}
            tabindex={
              areDatesEqual(currentDate(), instanceDate(d)) ? "0" : "-1"
            }
            {...addAriaSelectedAttr(currentDate(), instanceDate(d, "prev"))}
          >
            {d}
          </button>
        </td>
      );
    }
  }

  let nextMonthDays = [];
  if (variant === "continue") {
    const lastDay = instanceDate(daysInMonth()).day();
    for (let d = 1; d <= 6 - lastDay; d++) {
      if (excludeWeekends && isWeekend(instanceDate(d, "next"))) {
      } else {
        // console.log(
        //   minDate &&
        //     maxDate &&
        //     isBetweenDates(
        //       formatYYYYMMDD(instanceDate(d, "next")),
        //       formatYYYYMMDD(minDate),
        //       formatYYYYMMDD(maxDate)
        //     ),
        //   "Calling with contiue tastest"
        // );
        nextMonthDays.push(
          <td
            key={d}
            data-date={instanceDate(d, "next")}
            className={`calendar-day dateCell ${isBetweenClass({
              variant,
              minDate,
              maxDate,
              instDate: instanceDate(d, "next")
            })}`}
          >
            <button
              className={`dateButton ${
                enableOnlyBtw({
                  variant,
                  minDate,
                  maxDate,
                  instDate: instanceDate(d, "next")
                }) || canDisable(instanceDate(d, "next"))
                  ? "disabled"
                  : ""
              }`}
              // disabled={
              //   enableOnlyBtw({
              //     variant,
              //     minDate,
              //     maxDate,
              //     instDate: instanceDate(d, "next")
              //   }) || canDisable(instanceDate(d, "next"))
              // }
              tabindex={
                areDatesEqual(currentDate(), instanceDate(d, "next"))
                  ? "0"
                  : "-1"
              }
              {...addAriaSelectedAttr(currentDate(), instanceDate(d, "next"))}
            >
              {d}
            </button>
          </td>
        );
      }
    }
  }
  var totalSlots = [...blanks, ...monthDays, ...nextMonthDays];

  // console.log(totalSlots, "totalSlots $$$$$");
  let rows = [];
  let cells = [];
  totalSlots.forEach((row, i) => {
    if (rowCondition(i)) {
      // console.log(cells, "cells");
      cells.push(row); // if index not equal 7 that means not go to next week
    } else {
      rows.push(cells); // when reach next week we contain all td in last week to rows
      cells = []; // empty container
      cells.push(row); // in current loop we still push current row to new container
    }
    if (i === totalSlots.length - 1) {
      // when end loop we add remain date
      rows.push(cells);
    }
  });
  // console.log(rows, "rows");

  return (
    <div id="myDatepicker" className="datepicker">
      <Header
        {...{
          month: month(),
          year: year(),
          incMonth,
          decMonth,
          canIncrement,
          canDecrement
        }}
      />
      <table
        id="myDatepickerGrid"
        className="dates"
        role="grid"
        aria-labelledby="id-dialog-label"
      >
        <thead>
          <tr>
            {weekDays.map((cur, i) => {
              if (excludeWeekends && (i === 0 || i === 6)) {
                return null;
              }
              return (
                <th scope="col" abbr={weekDaysLong[i]}>
                  {cur}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className={`calendar-body ${animation}`}>
          {rows.map((d, i) => {
            return <tr>{d}</tr>;
          })}
        </tbody>
      </table>
    </div>
  );
};

Calendar.defaultProps = {
  excludeWeekends: false,
  minDate: false,
  maxDate: false,
  variant: "simple",
  datesList: [],
  isDatesOperable: false
};
export default Calendar;
