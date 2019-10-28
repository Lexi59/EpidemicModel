var pop;
function setup(){
	pop = new population();
	createCanvas(400,400);
	background(0);
}
function draw(){
	pop.day();
	for(var i = 0; i < pop.people[0].network.length; i++)
	{
		var nX = map(pop.people[0].network[i].xPos,0,1,0,width);
		var nY = map(pop.people[0].network[i].yPos,0,1,0,height);
		var x = map(pop.people[0].xPos, 0, 1, 0, width);
		var y = map(pop.people[0].yPos, 0, 1, 0, height);
		line(x,y,nX,nY);
	}
	for(var i = 0; i < pop.people.length; i++){
		var x = map(pop.people[i].xPos, 0, 1, 0, width);
		var y = map(pop.people[i].yPos, 0, 1, 0, height);
		if(pop.people[i].stat == "S"){
			stroke(0,0,255);
		}
		else if(pop.people[i].stat == "I"){
			stroke(255);
		} else if (pop.people[i].stat == "D"){
			stroke(255,0,0);
		} else if (pop.people[i].stat == "R") {
			stroke(0,255,0);
		}
		strokeWeight(pop.people[i].weight);
		point(x,y);
	}
	if(pop.statuses["I"] == 0){
		noLoop();
	}
}