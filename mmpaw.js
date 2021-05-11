var p;
var index;
var circles = [];
let testYear;
let mode = 0;
var backgroundColor = 55;
var title = "Mass Mobilization Across the World";
var scaleParameter = 3000;
var maxProtest = 110;
var countryName = "the World"
let countryIndex = 0;


function preload() {
 protestVolume = loadTable("data/protest.country.year.month.csv", "csv" ,"header");
  
  displayData =  protestVolume;
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  smooth(8);

  countrySelect = createSelect();
  countrySelect.position(windowWidth*0.026, windowHeight*0.93);
  countryOptions = protestVolume.getColumn('country');
  uniqueItems = Array.from(new Set(countryOptions));
  uniqueItems = uniqueItems.sort();
  for(var i=0; i < uniqueItems.length; i++){
  countrySelect.option(uniqueItems[i], uniqueItems[i]);
   }
  countrySelect.changed(countryChange);
}

function draw() {
  background(backgroundColor);

  //Title of the visualization
  fill(200);
  noStroke()
  textFont('Calibri');
  textSize(50*windowWidth/2000);
  textAlign(CENTER,CENTER);
  text(title, windowWidth*0.5, windowHeight*0.04); 
  //Input box title
  textFont('Calibri');
  noStroke();
  fill(100);
  textSize(windowWidth/150);
  textAlign(LEFT,CENTER);
  text('Filter by Country', windowWidth*0.02, windowHeight*0.91);
  //fill();
  textSize(windowWidth/100);
  dataSource = text("Data Source", windowWidth*0.82, windowHeight*0.91);
 
 temporalPatterns();
}

class Circle {
  constructor(xcoord, ycoord, diameter, number) {

   this.xcoord = xcoord;
   this.ycoord = ycoord;
   this.diameter = diameter;
   //the magnitude of the data point that underlies the diameter of the circle
   this.number = number;
  }

  show(r,g,b,o,w) {

   stroke(r,g,b,o);
   strokeWeight(w);
   noFill();
   //fill(r,g,b,o);
   ellipse(this.xcoord, this.ycoord, this.diameter, this.diameter);
   noStroke();
   fill(242,97,1);
   textSize(this.diameter*0.6);
   text(this.number, this.xcoord, this.ycoord);
  }

  move(p) {
  this.xcoord = mouseX + 300*p;
  this.ycoord = mouseY;
  }
}


///The Visualization ////

function temporalPatterns(){
  for(var x = 0; x <= 11; x++ ){
  for(var y = 0; y <= 27; y++ ) {
  
  let increment = windowWidth*0.032;  
  horizontalPosition = (75*windowWidth/3000) + (y+1)*increment;  
  verticalPosition = (175*windowHeight/2000) + (x+1)*0.06*windowHeight;   
  
  //year labels
  let year = 1990 + y;
  textFont('Calibri');
  noStroke();
  fill(100);
  textAlign(CENTER);
  textSize(windowWidth/100);
  text(year, horizontalPosition, windowHeight*0.1);
    
  //big circles
  ellipseMode(CENTER);
  let totalProtest = displayData.getNum(countryIndex + 12*y+x,"protest.volume");
  //var diameter = totalProtest*windowWidth/scaleParameter;
    if(totalProtest == 0){
    continue
    } else {
  diameter = map(totalProtest, 0, maxProtest, 12, increment-2);
  var radius = diameter/2;
    }  
  circles[index] = new Circle(horizontalPosition, verticalPosition, diameter, totalProtest);
  circles[index].show(242,97,1,250,2);
 
}
  //month labels
  let month = 1 + x;
  textFont('Calibri');
  noStroke();
  fill(100);
  textSize(windowWidth/100);
  text(month, windowWidth*0.02, verticalPosition);

  }

  if(mouseY > windowHeight*0.905 && mouseY < windowHeight*0.92 && mouseX > windowWidth*0.82 && mouseX < windowWidth*0.87){
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
}


//// Country Change ////

function countryChange(){
  let countryName = countrySelect.value();
  title = "Mass Mobilization in" + " " + countryName;  
  countryIndex = countryOptions.indexOf(countryName);  
  if(countryIndex > 0){
    scaleParameter = 250;
  } else {
    scaleParameter = 3000
  }
  
  if(countryName === "the World"){
    maxProtest = 110
  } else {
  maxProtest = 30
  }
}

function goToLink(){
  window.open("https://massmobilization.github.io/")
}
  
  
  function mousePressed(){
    if(mouseY > windowHeight*0.905 && mouseY < windowHeight*0.92 && mouseX > windowWidth*0.82 && mouseX < windowWidth*0.87){
      window.open("https://massmobilization.github.io/");
    }
  }