export default function Node({ node, onMouseEnter, onMouseDown }) {
  const { row, col, isStart, isFinish, isWall } = node;

  const stateClass = isFinish
    ? "bg-red-900"
    : isStart
    ? "bg-brand-dark"
    : isWall
    ? "bg-node-wall"
    : "bg-transparent";

  return (
    <div
      // CRITICAL: This ID must match the one in animateDijkstra
      id={`node-${row}-${col}`} 
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      className={`w-[25px] h-[25px] border-[0.5px] border-brand-ochre/10 transition-all duration-300 ${stateClass}`}
    >
      {isStart && <div className="text-[10px] text-white text-center">S</div>}
      {isFinish && <div className="text-[10px] text-white text-center">F</div>}
    </div>
  );
}