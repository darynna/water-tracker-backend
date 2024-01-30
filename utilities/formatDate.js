const { format } = require("date-fns");

exports.formatDate = (date) => format(new Date(date), "d, LLLL");
