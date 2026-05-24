export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function estimateReadingTime(text: string): number {
  const wordsPerMinute = 300;
  const hanRegex = /[\p{Script=Han}]/gu;
  const chineseChars = (text.match(hanRegex) || []).length;
  const withoutHan = text.replace(hanRegex, ' ');
  const nonChineseWords = withoutHan.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil((chineseChars + nonChineseWords) / wordsPerMinute));
}
