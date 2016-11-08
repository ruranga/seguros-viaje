var zones=["Europa","Africa","America del norte", "Asia"]
var min=[5,10,20,30,40,50]
var aditional=[2,3,4,6,8]
var adult=1
var names=["AA1","BB2","CC3","DD4"]
var badget=[2000,3000,4000,5000,6000]

function getRandom(data){
return data[Math.floor(Math.random()*data.length)]
}

function getCost(){
	return Math.floor(Math.random()*90)+10;
}

function getProduct(){
	return {
		name:"Product"+ getRandom(names),
		cost: getCost(),
		aditional:getRandom(aditional),
		badget:getRandom(badget),
		min:getRandom(min),
		zones:getRandom(zones),
		adult:adult
	}
}

for(var x=0;x<100;x++) db.Products.insert(getProduct())