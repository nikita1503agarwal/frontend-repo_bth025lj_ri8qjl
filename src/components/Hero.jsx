import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-900">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.25),transparent_60%)]" />
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 grid lg:grid-cols-2 gap-8 items-center">
        <div className="text-white/90">
          <span className="inline-flex items-center text-xs px-2 py-1 rounded-full bg-white/10 ring-1 ring-white/20 backdrop-blur">
            Finance • AI Insights
          </span>
          <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight">
            Track spending, auto-categorize, and get smart budgets
          </h1>
          <p className="mt-4 text-white/70 max-w-xl">
            A minimalist, glassmorphic experience powered by automated rules and personalized insights. Stay on top of your money with clarity.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#add" className="px-5 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white font-medium transition">
              Add a transaction
            </a>
            <a href="#insights" className="px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition">
              View insights
            </a>
          </div>
        </div>
        <div className="w-full h-[420px] lg:h-[520px] rounded-2xl overflow-hidden ring-1 ring-white/10 bg-white/5 backdrop-blur">
          <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        </div>
      </div>
    </section>
  );
}
