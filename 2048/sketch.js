let grid;

function setup() { 
  createCanvas(400, 400);
  grid = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0], 
  ];
  //console.table(grid);
  addNumber();
  addNumber();
  //console.table(grid);
} 

function addNumber(){
  let options = [];
  for(let i = 0; i < 4; i++){
    for(let j = 0; j < 4; j++){
      if(grid[i][j] === 0){
        options.push({
          x:i,
          y:j
        });
      }
    }
  }
  if(options.length > 0);
  let spot = random(options);
  let r = random(1);
  grid[spot.x][spot.y] = r > 0.5? 2: 4
}

function draw() { 
    background(255);
    drawGrid();
}
function compare(a, b){
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            if( a[i][j] !== b[i][j]){
                return true;
            }
        }
    }
    return false;
}

function copyGrid(grid){
    let extra = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0], 
    ];
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            extra[i][j] = grid[i][j];
        }
    }
    return extra;
}

funtion flip(grid){
    grid[i].reverse();
}

function keyPressed(){
    console.log(keyCode);
    let flipped = false;
    if(key === DOWN_ARROW){
        //DO NOTHING
    }else if(keyCode === UP_ARROW){
        flip(grid);
        flipped = true;
    }
    
    let past = copyGrid(grid);
    for(let i = 0 ; i < 4; i++){
        grid[i] = operate(grid[i]);
    }
    let changed = compare(past,grid);

    if(flipped){
        flip(grid);
    }
    if(changed){
        addNumber();
    }
    
}

function operate(row){
    row = slide(row);
    row = combine(row);
    row = slide(row);
    return row;
}

function slide(row){
    let arr = row.filter(val => val);
    let missing = 4 - arr.length;
    let zeros = Array(missing).fill(0);
    arr = zeros.concat(arr);
    return arr;
}

function combine(row){
    for(let i = 3; i >= 1; i--){
        let a = row[i];
        let b = row[i -1];
        if(a == b){
            row[i] = a + b;
            row[i -1 ] = 0;
            //break;
        }
    }
    return row;
}

function drawGrid(){
    let w = 100;
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            noFill();
            strokeWeight(2);
            stroke(0);
            rect(i*w, j*w, w, w );
            let val = grid[i][j];
            if(grid[i][j] !== 0){
                textAlign(CENTER,CENTER);
                textSize(64);
                fill(0);
                noStroke();
                text(val, i*w + w/2, j*w + w/2);
            }
        }
    }
}