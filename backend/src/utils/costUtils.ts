export const calculateTotalCost = (start: Date, end: Date, hourlyRate: number): number => {
  const hours = (new Date(end).getTime() - new Date(start).getTime()) / (1000 * 60 * 60);
  return Number((hours * hourlyRate).toFixed(2));
};
