class population{
	constructor(){
		this.peopleNum = 1000;
		this.p = 1;
		this.initialInfected = 400;
		this.recoveryChance = 0.1;
		this.chanceOfBecomingInfected = 0.1;
        this.deathChance = 0.1;
        this.isolationChance = 0;
		this.statuses = {};
		this.people = new Array();
		this.weightedPeople = new Array();
		this.totalContacts = this.getTotalContacts();
		for(var i = 0; i < this.peopleNum; i++)
		{
			this.people.push(new person(i));
		}
		for(var i = 0; i < this.initialInfected; i++)
        {
        	this.people[i].changeStatus("I");
        }
	}
	getTotalContacts(){
		var x = 0;
		for(var i = 0; i < this.people.length; i++){
			if(!this.people[i].isolated){
				x += this.people[i].weight;
				for(var j = 0; j < this.people[i].weight; j++){
					this.weightedPeople.push(this.people[i]);
				}
			}
		}
		return x;
	}
	day(){
		this.totalContacts = this.getTotalContacts();
		for (var contact = 0; contact < Math.floor(this.totalContacts/2); contact++){
			do {
				var personA = this.weightedPeople[Math.floor(random(0,this.totalContacts))];
			} while( personA.isolated );
			console.log("Person A: "+ personA.idNum);
			personA.calcNumIsolated;
			if(Math.random() < personA.personalityScore && personA.network.length > 0 && personA.numIsolatedInNetwork < personA.network.length -2){
				do {
					var personB = personA.network[Math.floor(random(0,personA.network.length))];
				} while( personB.isolated || personA == personB);
				console.log("Person B from A's Network: "+ personB.idNum);
			}
			else{
				do {
					var personB = this.weightedPeople[Math.floor(random(0,this.totalContacts))];
				} while( personB.isolated || personA == personB);
				console.log("Person B: "+ personB.idNum);
			}
			
			if(Math.random() < 1 - Math.pow(Math.pow(personA.xPos - personB.xPos,2) + Math.pow(personA.yPos - personB.yPos,2), this.p)){
				personA.network.push(personB);
				personB.network.push(personA);
				console.log("Person A and Person B are friends")
			}
			console.log(personA.stat + " is interacting with " + personB.stat);
			if(personA.stat == "I" && personB.stat == "S" && Math.random() < this.chanceOfBecomingInfected){
				console.log("Person B became infected");
				personB.changeStatus("I");
			} else if (personB.stat == "I" && personB.stat == "I" && Math.random() < this.chanceOfBecomingInfected){
				console.log("Person A became infected");
				personA.changeStatus("I");
			}
			this.checkStatus();
			this.totalStatus();
			console.log(this.statuses);
		}
	}
	
	checkStatus(){
		for(var i = 0; i < this.people.length; i++)
		{
			if(this.people[i].stat == "I"){
				var x = Math.random();
				//console.log("Is " + x + " less than " +  this.recoveryChance + "?");
				if(x < this.recoveryChance){
					console.log(this.people[i].idNum + " recovered");
					this.people[i].changeStatus("R")
					this.people[i].isolated = true;
				}
				var x = Math.random();
				//console.log("Is " + x + " less than " +  this.deathChance + "?");
				if(x < this.deathChance){
					console.log(this.people[i].idNum + " died");
					this.people[i].changeStatus("D");
					this.people[i].isolated = true;
				}
				var x = Math.random();
				//console.log("Is " + x + " less than " + this.isolationChance + "?");
				if(x < this.isolationChance){
					console.log(this.people[i].idNum + " became isolated");	
					this.people[i].isolated = true;
				}
			}
		}
	}
	
	totalStatus(){
		this.statuses["S"] = 0;
		this.statuses["I"] = 0;
		this.statuses["R"] = 0;
		this.statuses["D"] = 0;
		this.statuses["Is"] = 0;
		for(var i = 0; i < this.people.length; i++){
			if(this.people[i].stat == "S"){
				this.statuses["S"]++;
			} else if(this.people[i].stat == "I"){
				this.statuses["I"]++;
			} else if(this.people[i].stat == "D"){
				this.statuses["D"]++;
			} else {
				this.statuses["R"]++;
			}
			if(this.people[i].isolated){
				this.statuses["Is"]++;
			}
		}
	}
}