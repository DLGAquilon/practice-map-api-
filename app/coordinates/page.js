export default function CoordinatesPage() {
  return (
    <div className="bg-brand-paper min-h-screen py-20 px-6 font-roboto">
      <article className="max-w-3xl mx-auto">
        <span className="text-brand-earth font-bold tracking-widest uppercase text-xs underline decoration-brand-ochre/40">
          Technical Manuscript // 003
        </span>
        <h1 className="text-4xl md:text-6xl font-bold text-brand-dark mt-4 mb-8">
          Coordinate Systems <br/> & Spatial Mapping
        </h1>

        <section className="prose prose-stone">
          <p className="text-lg text-stone-700 leading-relaxed mb-12 font-serif italic">
            "In a digital grid, space is not a vacuum but a structured matrix. To navigate it, we must reconcile the mathematical Cartesian plane with the memory-efficient array structures of the machine."
          </p>

          {/* 1. Matrix vs Cartesian */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="font-bold text-brand-dark uppercase text-sm tracking-widest mb-4">Matrix Notation $(r, c)$</h3>
              <p className="text-sm text-stone-600 leading-relaxed mb-4">
                Used by the **Pathfinding Engine**. Origin $(0,0)$ is the <strong>Top-Left</strong> corner. 
                Increasing the row moves the cursor <em>down</em> the screen.
              </p>
              <div className="bg-stone-100 p-4 rounded border border-stone-200 font-mono text-[11px]">
                grid[row][col]
              </div>
            </div>
            <div>
              <h3 className="font-bold text-brand-dark uppercase text-sm tracking-widest mb-4">Cartesian Plane $(x, y)$</h3>
              <p className="text-sm text-stone-600 leading-relaxed mb-4">
                Used by **Visual Artists**. Origin $(0,0)$ is often the <strong>Center</strong> or <strong>Bottom-Left</strong>. 
                Increasing $y$ moves the cursor <em>up</em>.
              </p>
              <div className="bg-stone-100 p-4 rounded border border-stone-200 font-mono text-[11px]">
                x = col; y = -row;
              </div>
            </div>
          </div>

          {/* 2. DOM ID Reference Section */}
          <div className="my-16 p-8 border-2 border-brand-dark/5 bg-brand-dark/[0.02] rounded-xl">
            <h3 className="font-bold text-brand-dark uppercase mb-6 flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-earth">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
              </svg>
              DOM Element Indexing
            </h3>
            <p className="text-sm text-stone-600 mb-6">
              To achieve high-performance animations without re-rendering the entire React tree, we map logical nodes directly to DOM IDs using a string-templated coordinate key:
            </p>
            <div className="bg-brand-dark text-brand-ochre p-6 rounded-lg font-mono text-xs shadow-inner">
              <span className="text-stone-500">// Logical Mapping</span><br/>
              const id = `node-${"{"}row{"}"}-${"{"}col{"}"}`;<br/><br/>
              <span className="text-stone-500">// Visual Selector</span><br/>
              document.getElementById(id).style.backgroundColor = 'var(--ochre)';
            </div>
          </div>

          {/* 3. The Transformation Logic */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-brand-dark uppercase tracking-tighter mb-6">
              Transformation Logic
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed mb-8">
              When exporting data to other engines (like Unity or Unreal), use the following transformation to maintain spatial integrity:
            </p>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 border-b border-stone-200">
                <span className="text-xs font-bold uppercase text-stone-400">Horizontal (X)</span>
                <span className="font-mono text-brand-earth">X = Node.col * Node.width</span>
              </div>
              <div className="flex justify-between items-center p-4 border-b border-stone-200">
                <span className="text-xs font-bold uppercase text-stone-400">Vertical (Y)</span>
                <span className="font-mono text-brand-earth">Y = (Grid.rows - Node.row) * Node.height</span>
              </div>
            </div>
          </section>
        </section>
      </article>
    </div>
  );
}