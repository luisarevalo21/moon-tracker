import moment from "moment";

export function todaysDate(year = "") {
  return moment().format("L");
}

export function isoDate() {
  return moment().format("YYYY-MM-DD");
}
