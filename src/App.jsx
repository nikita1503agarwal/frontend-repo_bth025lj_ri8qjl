import Hero from './components/Hero'
import TransactionForm from './components/TransactionForm'
import TransactionsList from './components/TransactionsList'
import Insights from './components/Insights'

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Hero />
      <main className="-mt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-6 space-y-6">
          <TransactionForm />
          <TransactionsList />
        </div>
        <Insights />
      </main>
      <footer className="text-center text-slate-500 text-sm py-6">Built with ❤️ for better money habits</footer>
    </div>
  )
}

export default App
