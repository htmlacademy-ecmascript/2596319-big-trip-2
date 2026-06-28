import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
import { FilterType } from './const.js';

const sortPointsByDay = (pointA, pointB) => new Date(pointA.dateFrom) - new Date(pointB.dateFrom);
const sortPointsByTime = (pointA, pointB) => {
  const durationA = Date.parse(pointA.dateTo) - Date.parse(pointA.dateFrom);
  const durationB = Date.parse(pointB.dateTo) - Date.parse(pointB.dateFrom);
  return durationB - durationA;
};
const sortPointsByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;


dayjs.extend(duration);
dayjs.extend(isBetween);

const getPointDuration = (dateFrom, dateTo) => {
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

const isPointFuture = (point) => dayjs().isBefore(point.dateFrom, 'minute');
const isPointPresent = (point) => dayjs().isBetween(point.dateFrom, point.dateTo, 'minute', '[]');
const isPointPast = (point) => dayjs().isAfter(point.dateTo, 'minute');

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter(isPointFuture),
  [FilterType.PRESENT]: (points) => points.filter(isPointPresent),
  [FilterType.PAST]: (points) => points.filter(isPointPast),
};

export { sortPointsByDay, sortPointsByTime, sortPointsByPrice, getPointDuration, filter };
