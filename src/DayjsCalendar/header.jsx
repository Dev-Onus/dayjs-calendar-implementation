import React from "react";

const CalendarHeader = ({
  handleToggle,
  handleScrollUp,
  handleScrollDown,
  month,
  year
}) => {
  return (
    <div>
      <button onClick={handleToggle}>Toggle weekends</button>
      <button onClick={handleScrollUp}>Scroll up</button>
      <p>
        {month} {year}
      </p>
      <button onClick={handleScrollDown}>Scroll down</button>
    </div>
  );
};

export default CalendarHeader;
