/**
 * Utility formatters for AstroLive Vahan UI
 */

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

export function formatTime(timeString: string): string {
  if (!timeString) return '';
  // Formats HH:MM to 12-hour AM/PM if needed
  const [hours, minutes] = timeString.split(':');
  if (!hours || !minutes) return timeString;
  const h = parseInt(hours, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const formattedH = h % 12 || 12;
  return `${formattedH}:${minutes} ${ampm}`;
}

export function getScoreBadgeColor(score: number): { bg: string; text: string; border: string } {
  if (score >= 90) {
    return {
      bg: 'bg-emerald-950/80',
      text: 'text-emerald-300',
      border: 'border-emerald-500/30'
    };
  } else if (score >= 80) {
    return {
      bg: 'bg-amber-950/80',
      text: 'text-amber-300',
      border: 'border-amber-500/30'
    };
  } else {
    return {
      bg: 'bg-slate-900/80',
      text: 'text-slate-300',
      border: 'border-slate-700/50'
    };
  }
}
