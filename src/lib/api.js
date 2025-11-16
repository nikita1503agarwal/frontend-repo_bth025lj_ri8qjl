// Runtime-safe backend base URL discovery
// Priority: VITE_BACKEND_URL -> Modal host transform -> localhost fallback

export function getApiBase() {
  const envUrl = import.meta.env.VITE_BACKEND_URL;
  if (envUrl && typeof envUrl === 'string') return envUrl.replace(/\/$/, '');

  if (typeof window !== 'undefined') {
    try {
      const { protocol, hostname } = window.location;
      // Modal host pattern: ...-3000.* -> ...-8000.*
      if (hostname.includes('-3000.')) {
        const backendHost = hostname.replace('-3000.', '-8000.');
        return `${protocol}//${backendHost}`;
      }
      // Local dev
      if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return 'http://localhost:8000';
      }
      // Fallback to same origin (works if reverse proxy is configured)
      return `${protocol}//${hostname}`;
    } catch (e) {
      // ignore
    }
  }
  return 'http://localhost:8000';
}

export const API_URL = getApiBase();
