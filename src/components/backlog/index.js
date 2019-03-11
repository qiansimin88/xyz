const nowTime = new Date().getTime();
// 传入数字来获取当前年月等 数字 y:年 M：月 d: 日
export const dateGetNumbers = (num = nowTime, Str = 'y') => {
  let time = null;
  switch (Str) {
    case 'y':
      time = new Date(num).getFullYear();
      break;
    case 'm':
      time = new Date(num).getMonth() + 1;
      break;
    case 'd':
      time = new Date(num).getDate();
      break;
    default:
      time = new Date(num).getFullYear();
  }
  return time;
};
// 返回 ”2018/19/2‘的格式
export const standardDateForString = (date = nowTime) => `${dateGetNumbers(date, 'y')}/${dateGetNumbers(date, 'm')}/${dateGetNumbers(date, 'd')}`;
// 传入时间戳 返回时间戳所在月的总天数
export const theMonthDays = (date = nowTime) => {
  const d = new Date(dateGetNumbers(date, 'y'), dateGetNumbers(date, 'm'), 0).getDate();
  return d;
};

// 返回某个月的一号 是星期几
export const oneDayIsHow = (date = nowTime) => {
  let d = new Date(new Date(date).setDate(1)).getDay();
  if (d === 0) d = 7;
  return d;
};

// 上下个月
export const changeMonth = (date = nowTime, way = 'prew') => {
  const itemDate = new Date(date);
  let r = null;
  if (way === 'prew') {
    r = itemDate.setMonth(itemDate.getMonth() - 1);
  } else if (way === 'next') {
    r = itemDate.setMonth(itemDate.getMonth() + 1);
  }
  return r;
};

// 返回当前月上个月的末尾几天的显示
export const leftDate = (date = nowTime) => {
  const arr = [];
  const disL = oneDayIsHow(date) - 1; // 1号左边几个距离
  // 上个月的同一天
  const preDate = new Date(date).setMonth(new Date(date).getMonth() - 1);
  // 上个月的总天数
  const preMonthAllDays = theMonthDays(preDate);
  for (let index = (preMonthAllDays - disL) + 1; index <= preMonthAllDays; index += 1) {
    const nTime = new Date(preDate).setDate(index); // 上月末尾几天的时间戳
    arr.push({
      date: standardDateForString(nTime),
      count: 0,
      showDay: index,
      duringMonth: false, // 是否在当前月
      isToday: false,
    });
  }
  return arr;
};

// 返回当前月的所有天数
export const nowMonthDate = (date = nowTime) => {
  const days = theMonthDays(date);
  const arr = [];
  for (let index = 1; index <= days; index += 1) {
    const element = new Date(date).setDate(index);
    arr.push({
      date: standardDateForString(element),
      count: 0,
      showDay: index,
      duringMonth: true, // 是否在当前月
      isToday: standardDateForString(element) === standardDateForString(new Date().getTime()),
    });
  }
  return arr;
};

// 返回当前月上个月的开头几天的显示
export const nextMonthDate = (date = nowTime) => {
  const arr = [];
  const days = 42 - [...leftDate(date), ...nowMonthDate(date)].length; // 标准的每页的天数是42个
  const nextDate = new Date(date).setMonth(new Date(date).getMonth() + 1);
  for (let index = 1; index <= days; index += 1) {
    const nTime = new Date(nextDate).setDate(index);
    arr.push({
      date: standardDateForString(nTime),
      count: 0,
      showDay: index,
      duringMonth: false, // 是否在当前月
      isToday: false,
    });
  }
  return arr;
};

export const pageDays = (date = nowTime) => [
  ...leftDate(date),
  ...nowMonthDate(date),
  ...nextMonthDate(date),
];

// console.log(nextMonthDate(new Date().setMonth(1)));

