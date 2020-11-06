import dayjs from "dayjs";

export const getCalendarLocale = (displayLocale = "en") => {
  dayjs.locale(displayLocale);
  return [dayjs.monthsShort(), dayjs.weekdaysMin()];
};

export const getFormattedDateString = (date) => {
  return date.format("DD dd MM MMMM YYYY");
};

const fs = getFormattedDateString;

export const getDaysInMonths = (calendarRange, selectedMonth, selectedYear) => {
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

export const getFirstDayOffsetInMonths = (
  calendarRange,
  selectedMonth,
  selectedYear
) => {
  return new Array(12).fill(" ").map((_, idx) =>
    dayjs()
      .year(selectedYear)
      .month(selectedMonth + idx)
      .date(1)
      .format("d")
  );
};

export const getFirstDayofMonths = () => new Array(12).fill(1);

export const getCalendarList = (
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

export const getElemWidth = (ref, className) =>
  ref.current.querySelector(`.${className}`).getBoundingClientRect().width;

export const totalNoOfWeeks = 52;
export const maxNoOfWeeksInCalendar = 72;

export const getMonth = (date) => dayjs(date).format("MMMM");

export const getYear = (date) => dayjs(date).format("YYYY");
