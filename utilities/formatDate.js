const { format } = require("date-fns");

exports.formatDate = (date) => format(new Date(date), "d, LLLL");

exports.formatDateForEndpoins = (date) => {
  const timeComponents = date.split(":");
  const hours = Number(timeComponents[0]);
  const minutes = Number(timeComponents[1]);

  const currentDate = new Date();

  currentDate.setHours(hours);
  currentDate.setMinutes(minutes);
  return currentDate;
};
