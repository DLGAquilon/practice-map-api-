export default function Node({ node, onMouseEnter, onMouseDown }) {
  const { isStart, isFinish, isWall, isVisited, isPath } = node;

  // Determine styling based on node state
  const extraClassName = isFinish
    ? 'bg-red-900 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]'
    : isStart
    ? 'bg-brand-dark shadow-[0_0_15px_rgba(40,54,24,0.4)]'
    : isWall
    ? 'bg-node-wall border-none scale-95'
    : isPath
    ? 'bg-node-path'
    : isVisited
    ? 'bg-node-visited'
    : 'bg-transparent';

  return (
    <div
      id={`node-${node.row}-${node.col}`}
      className={`w-[25px] h-[25px] border-[0.5px] border-brand-ochre/10 transition-all duration-300 ${extraClassName}`}
      onMouseEnter={onMouseEnter}
      onMouseDown={onMouseDown}
    >
      {/* Starting point indicator */}
      {isStart && <div className="w-full h-full flex items-center justify-center text-[10px] text-white font-bold italic">S</div>}
      {/* Finish point indicator */}
      {isFinish && <div className="w-full h-full flex items-center justify-center text-[10px] text-white font-bold italic">F</div>}
    </div>
  );
}