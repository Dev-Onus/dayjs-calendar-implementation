import React from "react";
import { shallow } from "enzyme";
import Calendar from "../DayjsCalendar";

describe("Calendar", () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<Calendar />);
    expect(component).toMatchSnapshot();
  });
});
