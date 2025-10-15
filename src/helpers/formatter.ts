import "moment/dist/locale/ru";

import moment from "moment";
import { Moment } from "moment/moment";

export function humanDate(value: Moment): string {
  return value
    .locale("ru")
    .format(value.year() === moment().year() ? "D MMMM" : "D MMMM Y")
    .toLowerCase();
}

export function humanDateLong(value: Moment): string {
  return value
    .locale("ru")
    .format(value.year() === moment().year() ? "D MMMM HH:mm" : "D MMMM Y HH:mm")
    .toLowerCase();
}
