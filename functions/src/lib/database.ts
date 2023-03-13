export const addSeconds = (date: Date, seconds: number): Date => {
  var numberOfMlSeconds = date.getTime();
  var addMlSeconds = seconds * 1000;
  return new Date(numberOfMlSeconds + addMlSeconds);
};
