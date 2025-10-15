export const formatDate = (value: string): string =>
  new Date(value).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

export const formatReadingTime = (minutes?: number): string => {
  if (!minutes) return "约 1 分钟";
  const rounded = Math.max(1, Math.round(minutes));
  return `约 ${rounded} 分钟`;
};
