import React from "react";
import { storiesOf } from "@storybook/react";
import { withTests } from "@storybook/addon-jest";
import results from "../../test-results.json";

storiesOf("Addons|Jest", module)
  .addDecorator(withTests({ results }))
  .add("withTests", () => <p>Hello</p>, { jest: "DayjsCalendar" });
