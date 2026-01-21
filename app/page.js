import Image from "next/image";
import Link from "next/link";
import EnginePreviewVideo from "./frontend/EnginePreviewVideo";

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-brand-beige">
      {/* Background Decorative Element */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(var(--brand-dark) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      ></div>

      <section className="relative max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col items-center">
        <div className="absolute inset-0 -z-10 w-full h-full overflow-hidden">
          <Image
            src="/images/map.jpg" 
            alt="Navigation Network Background"
            fill
            priority
            className="object-cover opacity-100"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-beige/50 to-brand-beige"
            style={{ pointerEvents: "none" }}
          ></div>
        </div>

        {/* Badge */}
        <div className="mb-8 flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-paper border border-brand-ochre/30 shadow-sm relative z-10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-earth opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-earth"></span>
          </span>
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-dark/70">
            Multi-Algorithm Engine v5.0 Active
          </span>
        </div>

        {/* Hero Content */}
        <div className="text-center max-w-4xl relative z-10">
          <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-brand-dark leading-[0.9] mb-8">
            The Geometry of <br />
            <span className="text-brand-earth italic font-serif">
              Optimal Navigation
            </span>
          </h1>

          <p className="text-lg md:text-xl text-stone-600 font-sans leading-relaxed mb-12 max-w-2xl mx-auto">
            From abstract grids to real-world street networks. Visualize how
            computational logic transforms raw data into the paths we travel
            every day.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/visualizer"
              className="group relative px-10 py-5 bg-brand-dark text-brand-paper rounded-sm font-roboto font-bold tracking-widest uppercase transition-all hover:bg-brand-earth hover:-translate-y-1 shadow-2xl"
            >
              Open Graph Engine
              <span className="block absolute -bottom-1 -right-1 w-full h-full border border-brand-ochre -z-10 group-hover:bottom-0 group-hover:right-0 transition-all"></span>
            </Link>

            <Link
              href="/algorithms"
              className="text-sm font-bold tracking-widest uppercase border-b-2 border-brand-ochre pb-1 hover:text-brand-earth transition-colors"
            >
              Compare Algorithms
            </Link>
          </div>
        </div>

        {/* Video Preview Section */}
        <div className="mt-24 w-full max-w-5xl relative z-10">
          <div className="absolute inset-0 bg-brand-ochre/10 blur-3xl rounded-full transform -rotate-6"></div>
          <EnginePreviewVideo />
        </div>
      </section>

      {/* NEW SECTION: The Dual Engine Approach */}
      <section className="bg-brand-dark py-24 text-brand-paper">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 italic font-serif text-brand-ochre">
                Logic Foundations
              </h2>
              <p className="text-stone-400 leading-relaxed mb-8">
                Our engine supports multiple approaches to pathfinding. Whether
                you are solving a perfect mathematical maze or navigating the
                busy streets of Davao, choose the logic that fits the terrain.
              </p>
              <div className="space-y-6">
                <AlgoDetail
                  name="Dijkstra's Algorithm"
                  desc="The gold standard for guaranteed accuracy. It explores all possible directions equally, ensuring the absolute shortest path is found."
                />
                <AlgoDetail
                  name="A* (A-Star) Search"
                  desc="A heuristic-driven powerhouse. By estimating the distance to the goal, it cuts through the noise to find paths up to 10x faster."
                />
              </div>
            </div>
            <div className="bg-brand-paper/5 rounded-2xl p-8 border border-white/10">
              {/* This represents your logic flow */}
              <div className="aspect-video relative rounded-lg overflow-hidden bg-stone-900 border border-brand-ochre/20 flex items-center justify-center text-[10px] uppercase tracking-[0.3em] text-brand-ochre">
                [Visualizing Graph Nodes...]
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION: Grid vs Map */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-dark mb-4 uppercase tracking-tighter">
              Two Ways to Visualize
            </h2>
            <div className="w-20 h-1 bg-brand-earth mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Abstract Grid */}
            <div className="p-10 bg-stone-50 rounded-3xl border border-stone-200 group hover:border-brand-ochre transition-all">
              <div className="w-12 h-12 bg-brand-dark text-white rounded-xl flex items-center justify-center font-bold mb-6">
                A
              </div>
              <h3 className="text-2xl font-bold mb-4">The Abstract Grid</h3>
              <p className="text-stone-500 text-sm leading-relaxed mb-6">
                Perfect for understanding raw computer science. Control every
                obstacle, simulate weights, and watch the "flood-fill" nature of
                graph algorithms in a controlled environment.
              </p>
              <ul className="text-[10px] font-bold uppercase tracking-widest text-brand-earth space-y-2">
                <li>• Binary Obstacles</li>
                <li>• Manhatten Distance</li>
                <li>• Step-by-Step Debugging</li>
              </ul>
            </div>

            {/* The Real-World Map */}
            <div className="p-10 bg-brand-beige/30 rounded-3xl border border-stone-200 group hover:border-brand-earth transition-all">
              <div className="w-12 h-12 bg-brand-earth text-white rounded-xl flex items-center justify-center font-bold mb-6">
                B
              </div>
              <h3 className="text-2xl font-bold mb-4">Live Geospatial Map</h3>
              <p className="text-stone-500 text-sm leading-relaxed mb-6">
                Connected to OpenStreetMap. Fetch live road networks from Davao
                City, snap to actual street nodes, and calculate routes using
                Haversine geodesic formulas.
              </p>
              <ul className="text-[10px] font-bold uppercase tracking-widest text-brand-dark space-y-2">
                <li>• Real Road Topology</li>
                <li>• Latitude/Longitude Logic</li>
                <li>• Dynamic API Integration</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlight Section */}
      <section
        id="how-it-works"
        className="bg-stone-100/50 py-24 border-t border-stone-200"
      >
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          <Feature
            num="01"
            title="Snap to Roads"
            desc="Our Road Snapping logic takes your coordinates and finds the nearest valid intersection in the OpenStreetMap database."
          />
          <Feature
            num="02"
            title="Heuristic Tuning"
            desc="Adjust the Epsilon values to balance between absolute mathematical perfection and real-world calculation speed."
          />
          <Feature
            num="03"
            title="Davao Data"
            desc="Optimized specifically for the Davao City road network, supporting long-distance routes from Toril to the City Center."
          />
        </div>
      </section>
    </div>
  );
}

function AlgoDetail({ name, desc }) {
  return (
    <div>
      <h4 className="text-brand-ochre font-bold text-xs uppercase tracking-widest mb-2">
        {name}
      </h4>
      <p className="text-stone-400 text-sm">{desc}</p>
    </div>
  );
}

function Feature({ num, title, desc }) {
  return (
    <div className="flex flex-col">
      <span className="text-4xl font-bold text-brand-ochre/30 mb-4">{num}</span>
      <h3 className="text-xl font-bold text-brand-dark mb-3 uppercase tracking-tight">
        {title}
      </h3>
      <p className="text-stone-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
