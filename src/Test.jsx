import { useState, useEffect } from 'react'
import { API_URL } from './lib/api'

function Test() {
  const [backendStatus, setBackendStatus] = useState('checking...')
  const [backendUrl, setBackendUrl] = useState('')
  const [databaseStatus, setDatabaseStatus] = useState(null)
  const [seeding, setSeeding] = useState(false)
  const [seedMsg, setSeedMsg] = useState('')

  useEffect(() => {
    checkBackendConnection()
  }, [])

  const checkBackendConnection = async () => {
    try {
      setBackendUrl(API_URL)
      const response = await fetch(`${API_URL}`, { method: 'GET' })
      if (response.ok) {
        const data = await response.json()
        setBackendStatus(`✅ Connected - ${data.message || 'OK'}`)
        await checkDatabaseConnection()
      } else {
        setBackendStatus(`❌ Failed - ${response.status} ${response.statusText}`)
        setDatabaseStatus({ error: 'Backend not accessible' })
      }
    } catch (error) {
      setBackendStatus(`❌ Error - ${error.message}`)
      setDatabaseStatus({ error: 'Backend not accessible' })
    }
  }

  const checkDatabaseConnection = async () => {
    try {
      const response = await fetch(`${API_URL}/test`)
      if (response.ok) {
        const dbData = await response.json()
        setDatabaseStatus(dbData)
      } else {
        setDatabaseStatus({ error: `Failed to check database - ${response.status}` })
      }
    } catch (error) {
      setDatabaseStatus({ error: `Database check failed - ${error.message}` })
    }
  }

  const seedSampleData = async () => {
    setSeeding(true)
    setSeedMsg('')
    try {
      // create a couple of rules
      const rules = [
        { keyword: 'starbucks', category: 'Dining' },
        { keyword: 'uber', category: 'Transport' },
        { keyword: 'amazon', category: 'Shopping' },
      ]
      for (const r of rules) {
        await fetch(`${API_URL}/api/rules`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(r)
        })
      }
      // create budgets for this month
      const month = new Date().toISOString().slice(0,7)
      const budgets = [
        { category: 'Dining', month, limit: 200 },
        { category: 'Transport', month, limit: 150 },
        { category: 'Shopping', month, limit: 300 },
      ]
      for (const b of budgets) {
        await fetch(`${API_URL}/api/budgets`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(b)
        })
      }
      setSeedMsg('✅ Seeded rules and budgets. Try adding a transaction like "Starbucks" or "Uber" and refresh insights.')
    } catch (e) {
      setSeedMsg(`❌ Seeding failed: ${e.message}`)
    } finally {
      setSeeding(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Backend & Database Test
        </h1>

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Backend URL:</h3>
            <p className="text-sm text-gray-600 break-all bg-gray-100 p-2 rounded">
              {backendUrl || 'Detecting...'}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Backend Status:</h3>
            <p className="text-sm font-mono bg-gray-100 p-2 rounded">
              {backendStatus}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Database Status:</h3>
            <div className="text-sm bg-gray-100 p-3 rounded">
              {databaseStatus ? (
                databaseStatus.error ? (
                  <p className="text-red-600 font-mono">{databaseStatus.error}</p>
                ) : (
                  <div className="space-y-2">
                    <p><span className="font-semibold">Backend:</span> {databaseStatus.backend}</p>
                    <p><span className="font-semibold">Database:</span> {databaseStatus.database}</p>
                    <p><span className="font-semibold">DB URL:</span> {databaseStatus.database_url}</p>
                    <p><span className="font-semibold">DB Name:</span> {databaseStatus.database_name}</p>
                    <p><span className="font-semibold">Connection:</span> {databaseStatus.connection_status}</p>
                    {databaseStatus.collections && databaseStatus.collections.length > 0 && (
                      <p><span className="font-semibold">Collections:</span> {databaseStatus.collections.join(', ')}</p>
                    )}
                  </div>
                )
              ) : (
                <p className="text-gray-500 font-mono">Checking database...</p>
              )}
            </div>
          </div>

          <button
            onClick={checkBackendConnection}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors"
          >
            Test Again
          </button>

          <button
            onClick={seedSampleData}
            disabled={seeding}
            className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white font-semibold py-2 px-4 rounded transition-colors"
          >
            {seeding ? 'Seeding…' : 'Seed sample rules & budgets'}
          </button>
          {seedMsg && <p className="text-sm mt-2">{seedMsg}</p>}

          <a
            href="/"
            className="block w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded text-center transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}

export default Test
