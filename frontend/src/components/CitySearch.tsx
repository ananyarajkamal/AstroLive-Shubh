/**
 * CitySearch.tsx
 * Worldwide city autocomplete using OpenStreetMap Nominatim (free, no API key).
 */
'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';

export interface CityResult {
  displayName: string;  // e.g. "Bengaluru, Karnataka, India"
  shortName: string;    // e.g. "Bengaluru"
  lat: number;
  lon: number;
}

interface Props {
  value: string;
  onChange: (city: CityResult) => void;
  placeholder?: string;
  inputStyle?: React.CSSProperties;
  error?: string;
}

const BORDER = '#E4E0D6';
const NAVY = '#07152F';
const IVORY = '#F7F4ED';
const GOLD = '#C69A3A';
const MUTED = '#6B7280';

export default function CitySearch({ value, onChange, placeholder = 'Search any city worldwide...', inputStyle, error }: Props) {
  const [query, setQuery] = useState(value || '');
  const [results, setResults] = useState<CityResult[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* sync external value changes */
  useEffect(() => { if (value && value !== query) setQuery(value); }, [value]);

  /* close on outside click */
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  const search = useCallback(async (q: string) => {
    if (q.trim().length < 2) { setResults([]); setOpen(false); return; }
    setLoading(true);
    try {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=8&featuretype=city&addressdetails=1`;
      const res = await fetch(url, { headers: { 'Accept-Language': 'en' } });
      const data: Array<{
        display_name: string;
        lat: string;
        lon: string;
        address: { city?: string; town?: string; village?: string; county?: string; state?: string; country?: string };
      }> = await res.json();

      const mapped: CityResult[] = data.map(d => {
        const a = d.address;
        const short = a.city || a.town || a.village || a.county || q;
        const parts = [short, a.state, a.country].filter(Boolean);
        return {
          displayName: parts.join(', '),
          shortName: short,
          lat: parseFloat(d.lat),
          lon: parseFloat(d.lon),
        };
      });
      /* deduplicate by displayName */
      const seen = new Set<string>();
      const unique = mapped.filter(r => { if (seen.has(r.displayName)) return false; seen.add(r.displayName); return true; });
      setResults(unique);
      setOpen(unique.length > 0);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const q = e.target.value;
    setQuery(q);
    setHighlighted(-1);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => search(q), 320);
  }

  function select(r: CityResult) {
    setQuery(r.displayName);
    setOpen(false);
    setHighlighted(-1);
    onChange(r);
  }

  function handleKey(e: React.KeyboardEvent) {
    if (!open || !results.length) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setHighlighted(h => Math.min(h + 1, results.length - 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setHighlighted(h => Math.max(h - 1, 0)); }
    if (e.key === 'Enter' && highlighted >= 0) { e.preventDefault(); select(results[highlighted]); }
    if (e.key === 'Escape') setOpen(false);
  }

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <div style={{ position: 'relative' }}>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInput}
          onFocus={() => results.length > 0 && setOpen(true)}
          onKeyDown={handleKey}
          placeholder={placeholder}
          autoComplete="off"
          style={{
            ...inputStyle,
            paddingRight: 36,
            borderColor: error ? '#DC2626' : open ? GOLD : BORDER,
          }}
        />
        {/* spinner / chevron */}
        <div style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
          {loading ? (
            <svg style={{ animation: 'spin 1s linear infinite' }} width={14} height={14} viewBox="0 0 24 24" fill="none">
              <circle cx={12} cy={12} r={10} stroke={BORDER} strokeWidth={3}/>
              <circle cx={12} cy={12} r={10} stroke={GOLD} strokeWidth={3} strokeDasharray="16 48" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth={2}>
              <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10a9 9 0 1118 0z"/><circle cx={12} cy={10} r={3}/>
            </svg>
          )}
        </div>
      </div>

      {/* Dropdown */}
      {open && results.length > 0 && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 200,
          backgroundColor: '#FFFFFF', border: `1px solid ${BORDER}`,
          borderRadius: 8, boxShadow: '0 8px 24px -4px rgba(7,21,47,0.12)',
          overflow: 'hidden',
        }}>
          {results.map((r, i) => (
            <button
              key={r.displayName}
              type="button"
              onMouseEnter={() => setHighlighted(i)}
              onClick={() => select(r)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                width: '100%', textAlign: 'left',
                padding: '11px 14px', border: 'none', cursor: 'pointer',
                backgroundColor: i === highlighted ? IVORY : '#FFFFFF',
                borderBottom: i < results.length - 1 ? `1px solid ${BORDER}` : 'none',
                transition: 'background-color 0.1s',
              }}
            >
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth={2} style={{ flexShrink: 0 }}>
                <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10a9 9 0 1118 0z"/><circle cx={12} cy={10} r={3}/>
              </svg>
              <div>
                <p style={{ fontSize: 13, color: NAVY, fontWeight: 500, lineHeight: 1.3 }}>{r.shortName}</p>
                <p style={{ fontSize: 11, color: MUTED, lineHeight: 1.3 }}>{r.displayName}</p>
              </div>
            </button>
          ))}
          <div style={{ padding: '6px 14px', backgroundColor: '#FAFAF9', borderTop: `1px solid ${BORDER}` }}>
            <p style={{ fontSize: 10, color: '#9CA3AF' }}>Powered by OpenStreetMap · {results.length} cities found</p>
          </div>
        </div>
      )}

      {query.length >= 2 && !loading && results.length === 0 && open && (
        <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 200, backgroundColor: '#FFFFFF', border: `1px solid ${BORDER}`, borderRadius: 8, padding: '16px 14px' }}>
          <p style={{ fontSize: 13, color: MUTED }}>No cities found for &quot;{query}&quot;. Try a different spelling.</p>
        </div>
      )}
    </div>
  );
}
