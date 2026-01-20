export default function LogicPage() {
  return (
    <div className="bg-brand-paper min-h-screen py-20 px-6">
      <article className="max-w-3xl mx-auto">
        <span className="text-brand-earth font-bold tracking-widest uppercase text-xs">Technical Manuscript // 001</span>
        <h1 className="text-4xl md:text-6xl font-bold text-brand-dark mt-4 mb-8">
          Understanding <br/> Dijkstra’s Algorithm
        </h1>

        <section className="prose prose-stone">
          <p className="text-lg text-stone-700 leading-relaxed mb-6 font-serif italic">
            "At its heart, Dijkstra's algorithm is a greedy search. It functions by maintaining a set of 'tentative' distances and slowly confirming the absolute shortest path as it explores the frontier."
          </p>

          <div className="my-12 p-8 border-2 border-dashed border-brand-ochre/30 bg-stone-50/50 rounded-xl">
            <h3 className="font-roboto font-bold text-brand-dark uppercase mb-4">The Logic Flow</h3>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <span className="font-bold text-brand-earth">01.</span>
                <p className="text-sm text-stone-600">Assign every node a distance value: zero for our initial node and infinity for all other nodes.</p>
              </li>
              <li className="flex gap-4">
                <span className="font-bold text-brand-earth">02.</span>
                <p className="text-sm text-stone-600">Set the initial node as current. Mark all other nodes unvisited.</p>
              </li>
              <li className="flex gap-4">
                <span className="font-bold text-brand-earth">03.</span>
                <p className="text-sm text-stone-600">For the current node, consider all of its unvisited neighbors and calculate their tentative distances through the current node.</p>
              </li>
            </ul>
          </div>
        </section>

        <section id="legend" className="mt-24 pt-16 border-t border-brand-ochre/20">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold text-brand-dark uppercase tracking-tighter">
              Map Legend & Symbols
            </h2>
            <div className="h-[2px] flex-grow bg-brand-ochre/20"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <LegendItem 
              color="bg-brand-paper border-2 border-brand-ochre" 
              label="Unvisited Node" 
              desc="A coordinate yet to be explored by the algorithm." 
            />
            <LegendItem 
              color="bg-brand-dark" 
              label="Wall / Obstacle" 
              desc="Impassable terrain with infinite traversal cost." 
            />
            <LegendItem 
              color="bg-brand-ochre" 
              label="Visited Node" 
              desc="Nodes that have been evaluated for the shortest path." 
            />
            <LegendItem 
              color="bg-brand-earth animate-pulse" 
              label="Shortest Path" 
              desc="The confirmed most efficient route discovered." 
            />
          </div>
        </section>
      </article>
    </div>
  );
}

function LegendItem({ color, label, desc }) {
  return (
    <div className="flex gap-4 items-start p-4 bg-stone-50/50 rounded-lg border border-stone-200">
      <div className={`w-10 h-10 shrink-0 rounded shadow-inner ${color}`}></div>
      <div>
        <h4 className="font-bold text-brand-dark text-sm uppercase">{label}</h4>
        <p className="text-xs text-stone-500 leading-tight mt-1">{desc}</p>
      </div>
    </div>
  );
}