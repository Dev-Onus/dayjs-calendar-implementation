import React from "react";
import Calendar from "../Calendar/index.jsx";
import dayjs from "dayjs";

const formMinDate = () => dayjs();

const formMaxDate = (d1 = "2020-10-01", daysToAdd) => {
  let maxDate = dayjs(d1).add(daysToAdd, "days");
  return maxDate;
};

export default {
  title: "Calendar",
  component: Calendar
};

export const Simple = () => <Calendar />;

export const SimpleWithMinAndMax = () => (
  <Calendar
    minDate={dayjs("2020-10-01")}
    maxDate={formMaxDate(undefined, 30)}
  />
);

export const SimpleWithMinAndMaxWith60days = () => (
  <Calendar
    minDate={dayjs("2020-10-01")}
    maxDate={formMaxDate(undefined, 60)}
  />
);

export const SimpleWithMinAndMaxWithcurrentDate = () => (
  <Calendar minDate={dayjs()} maxDate={formMaxDate(undefined, 60)} />
);

export const SimpleWithExcludeWeekends = () => (
  <Calendar excludeWeekends={true} />
);

export const Continue = () => <Calendar variant="continue" />;

export const ContinueWithExclusionListPrev = () => (
  <Calendar
    variant="continue"
    datesList={["2020-09-27", "2020-09-29"]}
    isDatesOperable={false}
  />
);

export const ContinueWithExclusionListPrevAndCur = () => (
  <Calendar
    variant="continue"
    datesList={[
      "2020-09-27",
      "2020-09-29",
      "2020-10-01",
      "2020-10-03",
      "2020-10-05"
    ]}
    isDatesOperable={false}
  />
);

export const ContinueWithExclusionListPrevCurAndNext = () => (
  <Calendar
    variant="continue"
    datesList={[
      "2020-09-27",
      "2020-09-29",
      "2020-10-01",
      "2020-10-03",
      "2020-10-05",
      "2020-11-28",
      "2020-11-30"
    ]}
    isDatesOperable={false}
  />
);
export const ContinueWithExclusionListPrevCurNextAndMinMax = () => (
  <Calendar
    variant="continue"
    minDate={dayjs("2020-09-27")}
    maxDate={formMaxDate(undefined, 38)}
    datesList={[
      "2020-09-27",
      "2020-09-29",
      "2020-10-01",
      "2020-10-03",
      "2020-10-05",
      "2020-11-28",
      "2020-11-30"
    ]}
    isDatesOperable={false}
  />
);
export const ContinueWithMinAndMax = () => (
  <Calendar
    variant="continue"
    minDate={dayjs("2020-10-01")}
    maxDate={formMaxDate(undefined, 30)}
  />
);
export const ContinueWithInclusionListPrev = () => (
  <Calendar
    variant="continue"
    datesList={["2020-09-27", "2020-09-29"]}
    isDatesOperable={true}
  />
);

export const ContinueWithInclusionListPrevAndCur = () => (
  <Calendar
    variant="continue"
    datesList={[
      "2020-09-27",
      "2020-09-29",
      "2020-10-01",
      "2020-10-03",
      "2020-10-05"
    ]}
    isDatesOperable={true}
  />
);

export const ContinueWithInclusionListPrevCurAndNext = () => (
  <Calendar
    variant="continue"
    datesList={[
      "2020-09-27",
      "2020-09-29",
      "2020-10-01",
      "2020-10-03",
      "2020-10-05",
      "2020-11-28",
      "2020-11-30"
    ]}
    isDatesOperable={true}
  />
);
export const ContinueWithInclusionListPrevCurNextAndMinMax = () => (
  <Calendar
    variant="continue"
    minDate={dayjs("2020-09-27")}
    maxDate={formMaxDate(undefined, 38)}
    datesList={[
      "2020-09-27",
      "2020-09-29",
      "2020-10-01",
      "2020-10-03",
      "2020-10-05",
      "2020-11-28",
      "2020-11-30"
    ]}
    isDatesOperable={true}
  />
);

export const ContinueWithMinAndMaxWith60days = () => (
  <Calendar
    variant="continue"
    minDate={dayjs("2020-10-01")}
    maxDate={formMaxDate(undefined, 60)}
  />
);

export const ContinueWithMinAndMaxWithcurrentDate = () => (
  <Calendar
    variant="continue"
    minDate={formMinDate()}
    maxDate={formMaxDate(undefined, 60)}
  />
);

export const ContinueWithMinDateInNextMonth = () => (
  <Calendar
    variant="continue"
    minDate={dayjs("2020-11-01")}
    maxDate={formMaxDate(formMinDate(), 60)}
  />
);

export const ContinueWithExcludeWeekends = () => (
  <Calendar variant="continue" excludeWeekends={true} />
);
