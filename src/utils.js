import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

export const sortPointsByDay = (pointA, pointB) => new Date(pointA.dateFrom) - new Date(pointB.dateFrom);
export const sortPointsByTime = (pointA, pointB) => {
  const durationA = Date.parse(pointA.dateTo) - Date.parse(pointA.dateFrom);
  const durationB = Date.parse(pointB.dateTo) - Date.parse(pointB.dateFrom);
  return durationB - durationA;
};
export const sortPointsByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;


dayjs.extend(duration);

export const humanizePointDate = (date) => dayjs(date).format('MMM DD');

export const humanizePointTime = (date) => dayjs(date).format('HH:mm');

export const getPointDuration = (dateFrom, dateTo) => {
  const timeDiff = dayjs(dateTo).diff(dayjs(dateFrom));
  const pointDuration = dayjs.duration(timeDiff);

  if (pointDuration.days() > 0) {
    return pointDuration.format('DD[D] HH[H] mm[M]');
  }
  if (pointDuration.hours() > 0) {
    return pointDuration.format('HH[H] mm[M]');
  }
  return pointDuration.format('mm[M]');
};
