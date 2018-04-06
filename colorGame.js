var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");


init();

function init() {
	//难度mode选择
	setUpModeButtons();
	setUpSquares();
	reset();  //如果不reset  squares会是默认颜色；
}

//选择哪种模式
function setUpModeButtons(){
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function(){	
			//先将两个button的selected都去掉
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			modeButtons[2].classList.remove("selected");
			this.classList.add("selected"); //click当前button， 当前button添加selected class
			
			if(this.textContent === "Easy"){
				numSquares = 3;
			} else if(this.textContent === "Medium") {
				numSquares = 6;
			} else if(this.textContent === "Hard") {
				numSquares = 9;
			}

			// this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
			//如果easy numSquares = 3, else numSquares = 6;

			reset();
		});
	}
}

function setUpSquares(){
	for(var i = 0; i < squares.length; i++ ){
	//add click listeners to squares
		squares[i].addEventListener("click", function(){
			//grab color of clicked square
			var clickedColor = this.style.backgroundColor;
			//compare color to pickedColor
			//选对颜色
			if(clickedColor === pickedColor){
				messageDisplay.textContent = "Correct";
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
				resetButton.textContent = "Play Again?"; //如果赢了，button改变字样
			}else{ //选错
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again";
			} 
		});
	}
}


function reset() {
	// get new random colors
	colors = generateRandomColors(numSquares);
	//get new win pick color
	pickedColor = pickColor();
	//colorDisplay要设置为 win color
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors";
	//messageDisplay要重置
	messageDisplay.textContent = "";
	//改变squares的颜色
		// console.log("colors.length: " + colors.length);
		// console.log("squares.length: " + squares.length);
		// console.log("numSqaures: " + numSquares);
	for(var i = 0; i < squares.length; i++){
		//如果有color 就显示， 有3个显示3个  有6个显示6个
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}

	//reset h1 backgournd
	h1.style.backgroundColor = "steelblue";
}


// //简单模式 
// easyBtn.addEventListener("click", function(){
// 	easyBtn.classList.add("selected");
// 	hardBtn.classList.remove("selected");
// 	numSquares = 3;
// 	colors = generateRandomColors(numSquares);
// 	pickedColor = pickColor();
// 	colorDisplay.textContent = pickedColor;	
// 	for(var i = 0; i < squares.length; i++){
// 		if(colors[i]){
// 			squares[i].style.backgroundColor = colors[i];
// 		} else {
// 			squares[i].style.display="none";
// 		}
// 	}
// });

// //困难模式
// hardBtn.addEventListener("click", function(){
// 	hardBtn.classList.add("selected");
// 	easyBtn.classList.remove("selected");
// 	numSquares = 6;
// 	colors = generateRandomColors(numSquares);
// 	pickedColor = pickColor();
// 	colorDisplay.textContent = pickedColor;	
// 	for(var i = 0; i < squares.length; i++){	
// 		squares[i].style.backgroundColor = colors[i];
// 		squares[i].style.display= "block";
// 	}
// });

//Reset
resetButton.addEventListener("click", function(){
	reset();
});



//每一个方块都变成color这个颜色
function changeColors(color) {
	for(var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
}

//随机选一个target color
function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

//随机获取num个颜色的color 
function generateRandomColors(num){
	//make an array
	var arr = [];
	//repeat num times
	for(var i = 0; i < num; i++){
		//add num random colors to array
		arr.push(randomColor());
	}
	//return that array
	return arr;
}


function randomColor(){
	//red from 0 - 255
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);

	return "rgb(" + r + ", " + g + ", " + b + ")";
}