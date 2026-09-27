import { useEffect } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://ieee-backend-wine.vercel.app';

function getOrCreateVisitorId() {
  let visitorId = localStorage.getItem('analytics_visitor_id');
  if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem('analytics_visitor_id', visitorId);
  }
  return visitorId;
}

export function useAnalytics(pathname) {
  useEffect(() => {
    if (!pathname) return;
    const visitorId = getOrCreateVisitorId();
    fetch(`${API_BASE}/api/analytics/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        visitorId,
        page: pathname,
        device: navigator.userAgent,
      }),
    }).catch(() => {});
  }, [pathname]);
}

export async function fetchAnalyticsStats() {
  const res = await fetch(`${API_BASE}/api/analytics/stats`);
  if (!res.ok) throw new Error('Failed to fetch analytics');
  return res.json();
}

export async function clearAnalyticsData() {
  const res = await fetch(`${API_BASE}/api/analytics/clear`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to clear analytics');
  return res.json();
}
