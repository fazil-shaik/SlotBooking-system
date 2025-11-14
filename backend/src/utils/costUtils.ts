export const calculateTotalCost = (start: Date | string, end: Date | string, hourlyRate: number): number => {
  const s = new Date(start as any);
  const e = new Date(end as any);
  if (!isFinite(s.getTime()) || !isFinite(e.getTime())) throw new Error("Invalid start or end time");
  const diffMs = e.getTime() - s.getTime();
  if (diffMs <= 0) throw new Error("End time must be after start time");
  const hours = diffMs / (1000 * 60 * 60);
  const total = hours * Number(hourlyRate);
  if (!isFinite(total)) throw new Error("Invalid hourly rate or computation");
  return Number(total.toFixed(2));
};
