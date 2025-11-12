export const toUTC = (date: Date | string) => {
  return new Date(date).toISOString();
};
