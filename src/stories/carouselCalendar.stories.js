import React from "react";
import CarouselCalendar from "../Calendar/Carousel";
import dayjs from "dayjs";

const formMinDate = () => dayjs();

const formMaxDate = (d1 = "2020-10-01", daysToAdd) => {
  let maxDate = dayjs(d1).add(daysToAdd, "days");
  return maxDate;
};

export default {
  title: "CarouselCalendar",
  component: CarouselCalendar
};

export const Simple = () => <CarouselCalendar />;
