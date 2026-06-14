export const sortPointsByDay = (pointA, pointB) => new Date(pointA.dateFrom) - new Date(pointB.dateFrom);
export const sortPointsByTime = (pointA, pointB) => {
  const durationA = Date.parse(pointA.dateTo) - Date.parse(pointA.dateFrom);
  const durationB = Date.parse(pointB.dateTo) - Date.parse(pointB.dateFrom);
  return durationB - durationA;
};
export const sortPointsByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;
