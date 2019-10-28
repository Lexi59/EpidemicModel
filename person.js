class person{
	constructor(id){
		this.stat = "S";
        this.isolated = false;
        this.averageContactsPerDay = 5;
        this.weight = getRandomPoisson(this.averageContactsPerDay);
        this.network = new Array();
        this.numIsolatedInNetwork = 0;
        this.idNum = id;
        this.xPos = Math.random();
        this.yPos = Math.random();
        this.personalityScore = Math.random();
	}
	changeStatus(c){
		this.stat = c
	}
	calcNumIsolated(){
		this.numIsolatedInNetwork = 0;
		for (var i = 0; i < this.network.length;i++)
		{
			if(this.network[i].isolated){this.numIsolatedInNetwork++;}
		}
	}
}

getRandomPoisson = function(mean){
	var L = Math.exp(-mean);
	var p = 1.0;
	var k = 0;

	do {
	    k++;
	    p *= Math.random();
	} while (p > L);

	return k - 1;
}