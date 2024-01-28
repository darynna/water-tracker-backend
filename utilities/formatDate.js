const { format } = require("date-fns");

exports.formatMonth = (date) => format(new Date(date), "L");
exports.formatDay = (date) => format(new Date(date), "d");

exports.formatDate = (date) => format(new Date(date), "d, LLLL");
