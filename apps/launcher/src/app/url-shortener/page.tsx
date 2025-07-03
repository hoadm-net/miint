'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatISO } from 'date-fns';

interface HistoryItem {
  slug: string;
  short: string;
  original: string;
  protected: boolean;
}

const TTL_OPTIONS = [
  { label: '1 hour', value: 3600 },
  { label: '24 hours', value: 86400 },
  { label: '7 days', value: 604800 },
  { label: '30 days', value: 2592000 },
];

export default function UrlShortener() {
  const [url, setUrl] = useState('');
  const [custom, setCustom] = useState('');
  const [expiresAt, setExpiresAt] = useState(formatISO(new Date(Date.now() + 86400000), { representation: 'complete' }).slice(0,16)); // yyyy-MM-ddTHH:mm
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<HistoryItem | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    if (typeof window === 'undefined') return [];
    return JSON.parse(localStorage.getItem('short_history') || '[]');
  });

  const API_BASE = typeof window !== 'undefined' && window.location.hostname === 'localhost'
    ? 'http://localhost:3040'
    : process.env.NEXT_PUBLIC_SHORTENER_BASE ?? 'https://go.miint.dev';

  const handleSubmit = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/shorten`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, custom: custom || undefined, expiresAt: expiresAt ? new Date(expiresAt).toISOString() : undefined, password: password || undefined }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      const item: HistoryItem = {
        slug: data.slug,
        short: data.short,
        original: url,
        protected: !!password,
      };
      setResult(item);
      const h = [item, ...history].slice(0, 20);
      setHistory(h);
      localStorage.setItem('short_history', JSON.stringify(h));
      setUrl('');
      setCustom('');
      setPassword('');
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert('Unexpected error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center justify-center p-6 gap-12">
      <Link href="/" className="absolute top-4 left-4 text-gray-600 hover:text-gray-900 text-3xl">←</Link>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 w-full max-w-xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">URL Shortener</h1>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="text"
            placeholder="Custom slug (optional)"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-blue-600"
          />

          <label className="text-sm text-gray-700">Expire at:</label>
          <input
            type="datetime-local"
            value={expiresAt}
            onChange={(e) => setExpiresAt(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-blue-600"
          />

          <div className="flex gap-3 flex-wrap text-xs">
            {TTL_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  setExpiresAt(formatISO(new Date(Date.now() + opt.value * 1000), { representation: 'complete' }).slice(0,16));
                }}
                className="px-3 py-1 rounded-full border bg-gray-100 text-gray-800 hover:bg-blue-600 hover:text-white transition"
              >
                {opt.label}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Password (optional)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-blue-600"
          />

          <button
            onClick={handleSubmit}
            disabled={loading || !url}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? 'Shortening…' : 'Shorten'}
          </button>

          {result && (
            <div className="mt-4 bg-gray-50 rounded-lg border border-gray-200 p-4 text-center break-all">
              <a href={result.short} target="_blank" className="text-blue-600 font-medium hover:underline">
                {result.short}
              </a>
              {result.protected && <span className="ml-2 text-xs text-gray-500">🔒</span>}
            </div>
          )}
        </div>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="w-full max-w-xl">
          <h2 className="text-lg font-semibold mb-3">History</h2>
          <div className="flex justify-end mb-2">
            <button onClick={() => {
              setHistory([]);
              localStorage.removeItem('short_history');
            }} className="text-sm text-red-500 hover:underline">Clear all</button>
          </div>
          <ul className="space-y-2 text-sm">
            {history.map((h) => (
              <li key={h.slug} className="bg-white border border-gray-100 rounded-lg p-3 flex justify-between items-center">
                <a href={h.short} className="text-blue-600 truncate" target="_blank" rel="noreferrer">
                  {h.short}
                </a>
                <button onClick={() => {
                  const updated = history.filter(item => item.slug !== h.slug);
                  setHistory(updated);
                  localStorage.setItem('short_history', JSON.stringify(updated));
                }} className="text-gray-400 hover:text-red-500">🗑</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 