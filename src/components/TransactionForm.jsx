import { useState } from 'react'

const API_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function TransactionForm({ onCreated }) {
  const [form, setForm] = useState({
    amount: '',
    merchant: '',
    description: '',
    category: '',
    date: new Date().toISOString().slice(0, 16), // for datetime-local input
    account: 'Checking',
    currency: 'USD'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_URL}/api/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          amount: parseFloat(form.amount),
          date: new Date(form.date).toISOString()
        })
      })
      if (!res.ok) throw new Error('Failed to create transaction')
      const data = await res.json()
      onCreated?.(data)
      setForm((f) => ({ ...f, amount: '', merchant: '', description: '', category: '' }))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} id="add" className="bg-white/60 backdrop-blur border border-white/40 rounded-xl p-4 shadow-sm">
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        <input name="merchant" value={form.merchant} onChange={handleChange} placeholder="Merchant" className="col-span-2 md:col-span-2 px-3 py-2 rounded-lg bg-white ring-1 ring-slate-200" required />
        <input type="number" step="0.01" name="amount" value={form.amount} onChange={handleChange} placeholder="Amount" className="col-span-1 px-3 py-2 rounded-lg bg-white ring-1 ring-slate-200" required />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category (optional)" className="col-span-1 px-3 py-2 rounded-lg bg-white ring-1 ring-slate-200" />
        <input type="datetime-local" name="date" value={form.date} onChange={handleChange} className="col-span-2 px-3 py-2 rounded-lg bg-white ring-1 ring-slate-200" />
        <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="col-span-2 md:col-span-3 px-3 py-2 rounded-lg bg-white ring-1 ring-slate-200" />
        <button disabled={loading} className="col-span-2 md:col-span-1 rounded-lg bg-indigo-600 text-white font-medium px-4 py-2 hover:bg-indigo-500 transition">
          {loading ? 'Saving...' : 'Add'}
        </button>
      </div>
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
    </form>
  )
}
