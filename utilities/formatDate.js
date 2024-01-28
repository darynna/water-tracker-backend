const { format } = require("date-fns");

exports.formatDay = (date) => format(new Date(date), "d,L, y");

exports.formatDate = (date) => format(new Date(date), "d, LLLL");
