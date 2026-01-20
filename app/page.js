import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-brand-beige">
      {/* Background Decorative Element: Subtle Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(var(--brand-dark) 1px, transparent 0)`, backgroundSize: '40px 40px' }}>
      </div>

      <section className="relative max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col items-center">
        {/* Badge */}
        <div className="mb-8 flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-paper border border-brand-ochre/30 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-earth opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-earth"></span>
          </span>
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-dark/70">
            v4.0 Graph Engine Active
          </span>
        </div>

        {/* Hero Content */}
        <div className="text-center max-w-3xl">
          <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-brand-dark leading-[0.9] mb-8">
            The Art of the <br />
            <span className="text-brand-earth italic font-serif">Shortest Path</span>
          </h1>
          
          <p className="text-lg md:text-xl text-stone-600 font-sans leading-relaxed mb-12">
            Navigate the complexity of weighted graphs with a visualizer built for 
            precision. Drag your way through obstacles and watch Dijkstra’s 
            Algorithm solve the maze in real-time.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href="/visualizer" 
              className="group relative px-10 py-5 bg-brand-dark text-brand-paper rounded-sm font-roboto font-bold tracking-widest uppercase transition-all hover:bg-brand-earth hover:-translate-y-1 shadow-2xl"
            >
              Start Mapping
              <span className="block absolute -bottom-1 -right-1 w-full h-full border border-brand-ochre -z-10 group-hover:bottom-0 group-hover:right-0 transition-all"></span>
            </Link>
            
            <Link 
              href="#how-it-works"
              className="text-sm font-bold tracking-widest uppercase border-b-2 border-brand-ochre pb-1 hover:text-brand-earth transition-colors"
            >
              Explore Logic
            </Link>
          </div>
        </div>

        {/* Abstract "Map" Preview Card */}
        <div className="mt-24 w-full max-w-5xl relative group">
          <div className="absolute inset-0 bg-brand-ochre/10 blur-3xl rounded-full transform -rotate-6 group-hover:rotate-6 transition-transform duration-1000"></div>
          <div className="relative bg-brand-paper border border-stone-200 aspect-[16/8] rounded-lg shadow-[20px_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden flex items-center justify-center">
            {/* Visual representation of a grid */}
            <div className="grid grid-cols-12 gap-2 opacity-20">
              {[...Array(48)].map((_, i) => (
                <div key={i} className={`w-8 h-8 border border-brand-earth/20 rounded-sm ${i === 15 ? 'bg-brand-earth opacity-100' : ''}`}></div>
              ))}
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-paper/40 backdrop-blur-[2px]">
              <span className="font-roboto italic text-brand-dark/40 tracking-widest uppercase">Grid Engine Preview</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlight Section */}
      <section id="how-it-works" className="bg-stone-100/50 py-24 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          <Feature 
            num="01" 
            title="Define Bounds" 
            desc="Set custom grid dimensions and place your 'Origin' and 'Destination' markers anywhere on the vintage parchment."
          />
          <Feature 
            num="02" 
            title="Create Barriers" 
            desc="Draw walls or 'impassable terrain' by dragging across the grid. The algorithm treats these as infinite-cost nodes."
          />
          <Feature 
            num="03" 
            title="Animate Search" 
            desc="Control the playback speed as the algorithm scans neighbors, updates costs, and finally traces the optimal route."
          />
        </div>
      </section>
    </div>
  );
}

function Feature({ num, title, desc }) {
  return (
    <div className="flex flex-col">
      <span className="text-4xl font-bold text-brand-ochre/30 mb-4">{num}</span>
      <h3 className="text-xl font-bold text-brand-dark mb-3 uppercase tracking-tight">{title}</h3>
      <p className="text-stone-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
