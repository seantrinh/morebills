var goal;
var balance1;
function psize(newBalance){
	var progressbar = document.getElementById("progressvalue");
	var height = ((newBalance-balance1) / (goal - balance1)*650) + 250
	progressbar.style.height = height + "px";
	
	var color = height - 250;

	var colorpercent = color / 650;
	var colorvalue = Math.round(colorpercent*255);
	if (colorpercent > 0)
	progressbar.style.backgroundColor = "rgb(0," + colorvalue.toString() + ",0)";
	else 
	progressbar.style.backgroundColor = "rgb(" + (255-Math.abs(colorvalue)).toString() + ",0,0)";	
}


function drag(ev) {
				ev.dataTransfer.setData("number", ev.target.id)
			}

function drop(ev) {
	ev.preventDefault();
	var data; 
	if (customdropvalue != null){
		data = customdropvalue;
	}
	else{
		data = ev.dataTransfer.getData("number");
	}
	var balance = document.getElementById("bal").value;
	var newBalance = data*1 + balance*1 
	document.getElementById("balance").innerHTML = "Balance: $" + newBalance;
	document.getElementById("bal").value = newBalance;
	customdropvalue = null;


	balance1 = balance;

	addpoints(newBalance);
}

function allowDrop(ev) {
	ev.preventDefault();
}

function displayBalance(e) {
	var balance = document.getElementById("bal").value;
	document.getElementById("balance").innerHTML = "Balance: $" + balance
	document.getElementById("bankaccount").style.display="none";
	document.getElementById("addorsub").style.display="block";
	balance1 = balance;

	graphpoints(balance);
}

function showAddForm(e) {
	document.getElementById("add").style.display="block";
	document.getElementById("subtract").style.display="none";
	document.getElementById("customsubs").style.display="none";
}
var customdropvalue;
function addToBalance(e) {
	var balance = document.getElementById("bal").value;
	var add = document.getElementById("customadd").value;
	var newBalance = balance*1 + add*1;
	document.getElementById("balance").innerHTML = "Balance: $" + newBalance;
	document.getElementById("bal").value = newBalance
	balance1 = balance;
	

	document.getElementById("customadds").style.display="block";
				var reason = document.getElementById("addreason").value;
				var newP = document.createElement("P");
				newP.innerHTML = "Value: " + add + ",  Reason: " + reason;
				newP.draggable="True";
				newP.value = add;
				newP.addEventListener("dragstart", function() {
					customdropvalue = +this.value;
				})
				document.getElementById("customadds").appendChild(newP);

}

function showSubForm(e) {
	document.getElementById("subtract").style.display="block";
	document.getElementById("add").style.display="none";
	document.getElementById("customadds").style.display="none";
}

function subtractBalance(e) {
	var balance = document.getElementById("bal").value;
	var sub = document.getElementById("customsub").value;
	if (sub<0) {
		sub = sub*-1
	}
	var newBalance = balance*1 - sub*1;
	document.getElementById("balance").innerHTML = "Balance: $" + newBalance;
	document.getElementById("bal").value = newBalance
	balance1 = balance;

	document.getElementById("customsubs").style.display="block";
				var reason = document.getElementById("addreason2").value;
				var newP = document.createElement("P");
				newP.innerHTML = "Value: " + sub + ",  Reason: " + reason;
				newP.draggable="True";
				newP.value = sub;
				newP.addEventListener("dragstart", function() {
					customdropvalue = +this.value;
				})
				document.getElementById("customsubs").appendChild(newP);

}

var myChart;
function graphpoints(x){
	var ctx = document.getElementById("myChart");
	myChart = new Chart(ctx, {
	    type: 'line',
	    data: {
	        labels: ["1","2","3","4","5","6","7","8","9","10"],
	        
	        datasets: [{
	            label: 'Money Saved',
	            data: [x], 
	            
	            backgroundColor: [
	                'rgba(0, 0, 0, 0.2)',
	                'rgba(0,0,0,0.2)'
	            ],
	            borderColor: [
	                'rgba(255,99,132,1)',
	                'rgba(54, 162, 235, 1)',
	                'rgba(255, 206, 86, 1)',
	                'rgba(75, 192, 192, 1)',
	                'rgba(153, 102, 255, 1)',
	                'rgba(255, 159, 64, 1)'
	            ],
	            borderWidth: 2
	        }]
	    },
	    options: {
	        scales: {
	            yAxes: [{
	                ticks: {
	                    beginAtZero:false
	                }
	            }]
	        }
	    }
	});
}
function addpoints(x){

	myChart.data.datasets[0].data.push(x);
	myChart.update();

	psize(x);
}

function getUserData(e) {
var user = {
  goal: document.getElementById('goal').value,
  money: document.getElementById('money').value,
}
goal = user.money;
console.log(user);

render(user);
}
function render(user) {
var p = document.createElement("p");
document.getElementById('goalvalue').innerHTML = ("Goal: "+user.goal+" which will cost $" +user.money);
document.getElementById('userForm').style.display = "none";
}
