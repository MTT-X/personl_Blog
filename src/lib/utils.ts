export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function estimateReadingTime(text: string): number {
  const wordsPerMinute = 300;
  const chineseChars = (text.match(/[一-鿿]/g) || []).length;
  const words = text.split(/\s+/).length + chineseChars;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}
