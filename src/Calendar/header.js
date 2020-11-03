import React from "react";

const Header = ({
  month,
  year,
  incMonth,
  decMonth,
  canIncrement,
  canDecrement
}) => {
  console.log({ canIncrement, canDecrement }, "can Inc and Dec");
  return (
    <div className="header">
      <button
        className={`prevMonth ${
          !canDecrement ||
          (typeof canDecrement === "function" && canDecrement())
            ? ""
            : "hide"
        }`}
        aria-label="previous month"
        onClick={decMonth}
      >
        Previous month
        <span className="fas fa-angle-left fa-lg"></span>
      </button>
      <h2 id="id-dialog-label" className="monthYear" aria-live="polite">
        {month} {year}
      </h2>
      <button
        className={`nextMonth ${
          !canIncrement ||
          (typeof canIncrement === "function" && canIncrement())
            ? ""
            : "hide"
        }`}
        aria-label="next month"
        onClick={incMonth}
      >
        Next month
        <span className="fas fa-angle-right fa-lg"></span>
      </button>
    </div>
  );
};

Header.defaultProps = {
  month: null,
  year: null,
  decMonth: null,
  incMonth: null,
  canDecrement: null,
  canIncrement: null
};

export default Header;
