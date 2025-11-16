import { useEffect, useState } from 'react'
import { API_URL } from '../lib/api'

export default function Insights() {
  const [data, setData] = useState(null)
  const [month, setMonth] = useState(() => new Date().toISOString().slice(0,7))
  const [error, setError] = useState('')

  const load = async () => {
    setError('')
    try {
      const res = await fetch(`${API_URL}/api/insights?month=${month}`)
      if (!res.ok) throw new Error(`Failed to load insights (${res.status})`)
      const json = await res.json()
      setData(json)
    } catch (e) {
      setError(e.message)
    }
  }

  useEffect(() => { load() }, [])

  return (
    <section id="insights" className="bg-gradient-to-b from-white to-slate-50 py-10">
      <div className="max-w-7xl mx-auto px-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-800">Insights</h2>
          <div className="flex items-center gap-2">
            <input type="month" value={month} onChange={(e)=>setMonth(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-1" />
            <button onClick={load} className="px-3 py-1 rounded-lg bg-slate-900 text-white">Update</button>
          </div>
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        {!data ? (
          <p className="text-slate-500">Loading...</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {data.categories.map((c) => (
              <div key={c.category} className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="text-slate-900 font-semibold">{c.category}</div>
                <div className="text-slate-600 text-sm">Spent: ${c.spent.toFixed(2)}</div>
                <div className="text-slate-600 text-sm">Budget: {c.budget ? `$${c.budget.toFixed(2)}` : '—'}</div>
                <p className="text-slate-500 text-sm mt-1">{c.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
