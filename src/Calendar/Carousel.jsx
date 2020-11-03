import React, { useState } from "react";
import Header from "./header";
import "./index.css";
import dayjs from "dayjs";

const updateLocale = require("dayjs/plugin/updateLocale");
dayjs.extend(updateLocale);

const localeData = require("dayjs/plugin/localeData");
dayjs.extend(localeData);

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

const CarouselCalendar = () => {
  const [dateObject, setDateObject] = useState(dayjs());
  const [weekDaysLong, setWeekDaysLong] = useState(dayjs.weekdays());

  const month = () => dateObject.format("MMMM");

  const year = () => dateObject.format("YYYY");

  const getPrevMonthDates = () =>
    dayjs(dateObject).set("month", dayjs(dateObject).month() - 1);

  const getNextMonthDates = () =>
    dayjs(dateObject).set("month", dayjs(dateObject).month() + 1);

  const decMonth = () => {
    // if (canDecrement()) {
    // setAnimation("animated fadeOutRight");
    // setTimeout(() => {
    // setAnimation("animated fadeInLeft");
    setDateObject(getPrevMonthDates());
    // }, 300);
    // }
  };

  const incMonth = () => {
    // if (canIncrement()) {
    // setAnimation("animated fadeOutLeft");
    // setTimeout(() => {
    // setAnimation("animated fadeInRight");
    setDateObject(getNextMonthDates());
    // }, 300);
    // }
  };

  let weekDays = dayjs.weekdaysShort();

  return (
    <div id="myDatepicker" className="datepicker">
      <Header
        {...{
          month: month(),
          year: year(),
          incMonth,
          decMonth,
          canIncrement: null,
          canDecrement: null
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
              return (
                <th scope="col" abbr={weekDaysLong[i]}>
                  {cur}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className={`calendar-body`}></tbody>
      </table>
    </div>
  );
};

export default CarouselCalendar;
