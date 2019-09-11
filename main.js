// Depth-first search
// Recursive backtracker
// https://en.wikipedia.org/wiki/Maze_generation_algorithm
//configuration
  //showSteps [true/false] - show indicators on generation patch
  //defaultCellSize [int] - set default maze cell size in pixels
  //maxAnimationFrameRate [int] - set max animation frames per second
  //loopMode [true/false] - generate new maze after previous is finished
  //toSolve [true/false] - generate maze with start and exit points
  var showSteps = true;
  var defaultCellSize = 30;
  var maxAnimationFrameRate = 60;
  var loopMode = false;
  var toSolve = false;
//END: configuration
var cols, rows;0
var w=defaultCellSize;
var grid = [];
var current;
var first = false;
var highlightStart = true;
var stack = [];
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  cols = floor(width/w)-1;
  rows = floor(height/w)-1;
  frameRate(maxAnimationFrameRate);
  for (var   j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      cell.showSteps(showSteps);
      grid.push(cell);
    }
  }
  if(toSolve){
    grid[0].walls[3] = false;
    grid[grid.length-1].walls[1] = false;
  }
  if(!first) first = Math.floor(random(0, grid.length));
  current = grid[first];
}
function draw() {
  background(51);
  for (var i = 0; i < grid.length; i++) {
    grid[i].show();
  }
  current.visited = true;
  if(current != grid[first] || highlightStart)
  {
    if(highlightStart) {current.highlight(); highlightStart = false;}
    current.highlight();
    current.changeColor();
  }
  // STEP 1
  var next = current.checkNeighbors();
  if (next) {
    next.visited = true;
    // STEP 2
    stack.push(current);
    // STEP 3
    removeWalls(current, next);
    // STEP 4
    current = next;
  } else if (stack.length > 0) {
    current = stack.pop();
  }
  else if(loopMode) generateEmptyMaze();
}
function index(i, j) {
  if (i < 0 || j < 0 || i > cols-1 || j > rows-1) {
    return -1;
  }
  return i + j * cols;
}
function removeWalls(a, b) {
  var x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  var y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}
function generateEmptyMaze(){
  createCanvas(window.innerWidth, window.innerHeight);
  cols = floor(width/w)-1;
  rows = floor(height/w)-1;
  frameRate(maxAnimationFrameRate);
  grid = [];
  for (var   j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      cell.showSteps(showSteps);
      grid.push(cell);
    }
  }
  if(toSolve){
    grid[0].walls[3] = false;
    grid[grid.length-1].walls[1] = false;
  }
  first = false;
  if(!first) first = Math.floor(random(0, grid.length));
  current = grid[first];
}
