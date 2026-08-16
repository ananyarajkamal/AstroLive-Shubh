/**
 * reportStore.ts
 * Persists the computed VahanReport to localStorage so the Patra page
 * can read the user's actual data instead of static mock data.
 */
import { VahanReport } from './types';

const KEY = 'av_last_report';

export function saveReport(report: VahanReport): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(report));
    /* also key by shareToken so /patra/[id] can look it up */
    localStorage.setItem(`av_report_${report.shareToken}`, JSON.stringify(report));
  } catch { /* storage quota or SSR — silently ignore */ }
}

export function loadReport(shareToken?: string): VahanReport | null {
  try {
    const key = shareToken ? `av_report_${shareToken}` : KEY;
    const raw = localStorage.getItem(key);
    if (!raw) {
      /* fall back to last report if token not found */
      const last = localStorage.getItem(KEY);
      if (last) return JSON.parse(last) as VahanReport;
      return null;
    }
    return JSON.parse(raw) as VahanReport;
  } catch { return null; }
}
