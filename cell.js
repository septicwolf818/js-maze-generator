function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.walls = [true, true, true, true];
  this.visited = false;
  this.r = 30;
  this.g = 30;
  this.b = 30;
  this.colorStep = 60;
  this.showStepsBoolean = false
  this.showSteps = function(x){
    this.showStepsBoolean = x;
  }
  this.changeColor = function(){
    if(this.g<255) this.g+=this.colorStep;
    else if(this.r<255) this.r+=this.colorStep;
    else if(this.b<=255) this.b+=this.colorStep;

  }
  this.checkNeighbors = function() {
    var neighbors = [];
    var top    = grid[index(i, j -1)];
    var right  = grid[index(i+1, j)];
    var bottom = grid[index(i, j+1)];
    var left   = grid[index(i-1, j)];
    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }
    if (neighbors.length > 0) {
      var r = floor(random(0, neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }
  }
  this.highlight = function() {
    var x = this.i*w;
    var y = this.j*w;
    noStroke();
    fill(100, 0, 100, 255);
    rect(x, y, w, w);
  }
  this.show = function() {
    var x = this.i*w;
    var y = this.j*w;
    stroke(255,255,0);
    if (this.walls[0]) {
      line(x    , y    , x + w, y);
    }
    if (this.walls[1]) {
      line(x + w, y    , x + w, y + w);
    }
    if (this.walls[2]) {
      line(x + w, y + w, x    , y + w);
    }
    if (this.walls[3]) {
      line(x    , y + w, x    , y);
    }
    if (this.visited) {
      noStroke();
      if(this.showStepsBoolean)
      fill(this.r, this.g, this.b, 100);
      else
      fill(229, 6, 6, 127);
      rect(x, y, w, w);
    }
  }
}
