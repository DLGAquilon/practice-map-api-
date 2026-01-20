export function recursiveBactracker(grid){
    const mazeNodesInOrder = [];
    const rows = grid.length;
    const cols = grid[0].length;

    for (const row of grid) {
        for (const node of row) {
            if (!node.isStart && !node.isFinish){
                node.isWall = true;
            }
        }
    }

    const stack = [];
    const startNode = grid[1][1];
    startNode.isWall = false;
    stack.push(startNode);

    while(stack.length > 0){
        const current = stack[stack.length - 1];
        const neighbors = getUnvisitedNeighbors(current, grid);

        if (neighbors.length > 0){
            const next = neighbors[Math.floor(Math.random() * neighbors.length)];

            const wallRow = (current.row + next.row) / 2;
            const wallCol = (current.col + next.col) / 2;

            grid[wallRow][wallCol].isWall = false;
            next.isWall = false;

            mazeNodesInOrder.push(grid[wallRow][wallCol]);
            mazeNodesInOrder.push(next);
            stack.push(next);
        } else {
            stack.pop();
        }
    }
    return grid;
}

function getUnvisitedNeighbors(node, grid){
    const neighbors = [];
    const { row, col } = node;

    if (row > 1) neighbors.push(grid[row - 2][col]);
    if (row < grid.length - 2) neighbors.push(grid[row + 2][col]);
    if (col > 1) neighbors.push(grid[row][col - 2]);
    if (col < grid[0].length - 2) neighbors.push(grid[row][col + 2]);

    return neighbors.filter(n => n.isWall);
}