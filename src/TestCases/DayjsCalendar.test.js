import { getMonth, getYear } from "../DayjsCalendar/utils";
import dayjs from "dayjs";

describe("Calendar Utils", () => {
  it("getMonth", () => {
    expect(getMonth(dayjs())).toBeDefined();
  });
  it("getYear", () => {
    expect(getYear(dayjs())).toBeDefined();
  });
});
