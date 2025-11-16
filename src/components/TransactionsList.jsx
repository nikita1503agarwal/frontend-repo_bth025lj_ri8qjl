import { useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function TransactionsList() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/transactions`)
      const data = await res.json()
      setItems(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  return (
    <div className="bg-white/60 backdrop-blur border border-white/40 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-slate-800">Recent Transactions</h3>
        <button onClick={load} className="text-sm text-indigo-600 hover:underline">Refresh</button>
      </div>
      {loading ? (
        <p className="text-slate-500">Loading...</p>
      ) : (
        <div className="divide-y divide-slate-200">
          {items.map((t) => (
            <div key={t.id} className="py-2 flex items-center justify-between">
              <div>
                <div className="text-slate-800 font-medium">{t.merchant} <span className="text-slate-400 text-sm">• {new Date(t.date).toLocaleDateString()}</span></div>
                <div className="text-slate-500 text-sm">{t.description || '—'}</div>
              </div>
              <div className="text-right">
                <div className="text-slate-800 font-semibold">${t.amount.toFixed(2)}</div>
                <div className="text-slate-500 text-xs">{t.category || 'Uncategorized'}</div>
              </div>
            </div>
          ))}
          {items.length === 0 && (
            <p className="text-slate-500 text-sm">No transactions yet. Add one above.</p>
          )}
        </div>
      )}
    </div>
  )
}
