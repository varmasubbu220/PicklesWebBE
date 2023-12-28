const moment = require('moment');

const getCurrentDate = () => {
  return moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
};

module.exports = { getCurrentDate };
