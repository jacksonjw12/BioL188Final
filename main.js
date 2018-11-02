
let canvas = document.getElementById("canvas")


let c = {"canvas":canvas,"ctx":canvas.getContext("2d")}
let eraser = document.getElementById('eraser')
let reset = document.getElementById('reset')
let specialSelect = "none"
eraser.onload = draw;
reset.onload = draw;
let userColor = "white"
console.log("rows:" + rows)
console.log("cols:" + cols)
let m = []

for(var r = 0; r<rows; r++ ){
	var row = []
	for(var cc = 0; cc< cols; cc++){
		row.push("white")
	}
	m.push(row)
}
if (typeof(Storage) !== "undefined") {
	var storage = localStorage.getItem("grid")
	if (storage !== null){
		m = JSON.parse(storage)
	}
	else{
		localStorage.setItem("grid",JSON.stringify(m))
	}
}



const sidebarScreenRatio = .2

let w,h,squareSize
let drawSidebar = function(){
	c.ctx.strokeStyle = "black"
	if(orientation == "x"){
		c.ctx.beginPath()
		c.ctx.moveTo(c.width*sidebarScreenRatio,0)
		c.ctx.lineTo(c.width*sidebarScreenRatio,c.height)
		c.ctx.stroke()
	}
	else{
		c.ctx.beginPath()
		c.ctx.moveTo(0,c.height*(1-sidebarScreenRatio))
		c.ctx.lineTo(c.width,c.height*(1-sidebarScreenRatio))
		c.ctx.stroke()
	}
	


	
	if(orientation == "x"){
		let sidebarRows= Math.ceil(colors.length/2 )+1
		let buttonSize = c.height/sidebarRows
		let outline = -1;
		for(var r = 0; r<sidebarRows; r++ ){
			
			
			if(r*2 < colors.length){
				console.log(r)
				c.ctx.fillStyle = colors[r*2]
				c.ctx.fillRect(0,r*buttonSize,c.width*sidebarScreenRatio/2,buttonSize)

				c.ctx.fillStyle = "rgba(255,255,255,.2)"
				if(userColor == colors[r*2]){
					c.ctx.fillRect(0,r*buttonSize,c.width*sidebarScreenRatio/2,buttonSize)
					outline = r*2
				}
				if(r*2+1 < colors.length){
					c.ctx.fillStyle = colors[r*2+1]
					
					c.ctx.fillRect(c.width*sidebarScreenRatio/2,0 + r*buttonSize,c.width*sidebarScreenRatio/2,buttonSize)
					c.ctx.fillStyle = "rgba(255,255,255,.2)"
					if(userColor == colors[r*2+1]){
						c.ctx.fillRect(c.width*sidebarScreenRatio/2,0 + r*buttonSize,c.width*sidebarScreenRatio/2,buttonSize)
						outline=r*2+1
					}
				}
				else{
					c.ctx.fillStyle = pageColor
					c.ctx.fillRect(c.width*sidebarScreenRatio/2,0 + r*buttonSize,c.width*sidebarScreenRatio/2+5,buttonSize)
				}
				
			}
			c.ctx.beginPath()
			c.ctx.moveTo(0,0 + r*buttonSize)
			c.ctx.lineTo(c.width*sidebarScreenRatio,0 + r*buttonSize)
			c.ctx.stroke()
			
		}
		c.ctx.drawImage(reset,0,0,reset.naturalWidth,reset.naturalHeight,0,(sidebarRows-1)*buttonSize,c.width*sidebarScreenRatio/2,buttonSize)


		c.ctx.drawImage(eraser,0,0,eraser.naturalWidth,eraser.naturalHeight,c.width*sidebarScreenRatio/2,(sidebarRows-1)*buttonSize,c.width*sidebarScreenRatio/2,buttonSize)
		if(specialSelect == "eraser"){
			c.ctx.fillStyle = "rgba(0,0,0,.1)"
			c.ctx.fillRect(c.width*sidebarScreenRatio/2,c.height-buttonSize,c.width*sidebarScreenRatio/2,buttonSize)

		}
		
		c.ctx.beginPath()
		c.ctx.moveTo(c.width*sidebarScreenRatio/2,0)
		c.ctx.lineTo(c.width*sidebarScreenRatio/2,c.height)
		c.ctx.stroke()
		if(outline >= 0){
			console.log("outline")
			c.ctx.strokeStyle = "#ffffff"
			c.ctx.lineWidth = 3
			c.ctx.beginPath()
			c.ctx.moveTo((outline %2) * c.width*sidebarScreenRatio/2,Math.floor(outline/2)*buttonSize)
			c.ctx.lineTo((outline %2) * c.width*sidebarScreenRatio/2,Math.floor(outline/2)*buttonSize+buttonSize)
			c.ctx.lineTo((outline %2) * c.width*sidebarScreenRatio/2+sidebarScreenRatio*c.width/2,Math.floor(outline/2)*buttonSize+buttonSize)
			c.ctx.lineTo((outline %2) * c.width*sidebarScreenRatio/2+sidebarScreenRatio*c.width/2,Math.floor(outline/2)*buttonSize)
			c.ctx.lineTo((outline %2) * c.width*sidebarScreenRatio/2,Math.floor(outline/2)*buttonSize)

			c.ctx.stroke()
			c.ctx.lineWidth = 1
		}
	}
	else{
		let tempRatio = 1-sidebarScreenRatio
		let tempRatio2 = 1-sidebarScreenRatio/2
		let sidebarRows= Math.ceil(colors.length/2 )+1
		let buttonSize = c.width/sidebarRows
		let outline = -1;
		for(var r = 0; r<sidebarRows; r++ ){
			
			
			if(r*2 < colors.length){
				c.ctx.fillStyle = colors[r*2]
				c.ctx.fillRect(r*buttonSize,c.height*tempRatio,buttonSize,c.height)

				c.ctx.fillStyle = "rgba(255,255,255,.2)"
				if(userColor == colors[r*2]){
					c.ctx.fillRect(r*buttonSize,c.height*tempRatio,buttonSize,c.height)
					outline = r*2
				}
				if(r*2+1 < colors.length){
					c.ctx.fillStyle = colors[r*2+1]
					
					c.ctx.fillRect(r*buttonSize,c.height*tempRatio2,buttonSize,c.height)
					c.ctx.fillStyle = "rgba(255,255,255,.2)"
					if(userColor == colors[r*2+1]){
						c.ctx.fillRect(r*buttonSize,c.height*tempRatio2,buttonSize,c.height)
						outline=r*2+1
					}
				}
				else{
					// c.ctx.fillStyle = pageColor
					// c.ctx.fillRect(r*buttonSize,c.height*tempRatio2,buttonSize,c.height)

					// c.ctx.fillRect(c.width*sidebarScreenRatio/2,0 + r*buttonSize,c.width*sidebarScreenRatio/2+5,buttonSize)
				}
				
			}
			c.ctx.beginPath()
			c.ctx.moveTo(r*buttonSize,c.height*tempRatio)
			c.ctx.lineTo(0 + r*buttonSize,c.height)
			c.ctx.stroke()
			
		}
		c.ctx.drawImage(reset,0,0,reset.naturalWidth,reset.naturalHeight,(sidebarRows-1)*buttonSize,c.height*tempRatio2,buttonSize,c.height*sidebarScreenRatio/2)


		c.ctx.drawImage(eraser,0,0,eraser.naturalWidth,eraser.naturalHeight,(sidebarRows-1)*buttonSize,c.height*tempRatio,buttonSize,c.height*sidebarScreenRatio/2)

		if(specialSelect == "eraser"){

			c.ctx.fillStyle = "rgba(0,0,0,.1)"
			//c.ctx.drawImage(eraser,0,0,eraser.naturalWidth,eraser.naturalHeight,(sidebarRows-1)*buttonSize,c.height*tempRatio,buttonSize,c.height*sidebarScreenRatio/2)
			c.ctx.fillRect((sidebarRows-1)*buttonSize,c.height*tempRatio,buttonSize,c.height*sidebarScreenRatio/2)
		}
		
		c.ctx.beginPath()
		c.ctx.moveTo(0,c.height*tempRatio2)
		c.ctx.lineTo(c.width,c.height*tempRatio2)
		c.ctx.stroke()
		if(outline >= 0){
			console.log("outline")
			c.ctx.strokeStyle = "#ffffff"
			c.ctx.lineWidth = 3
			c.ctx.beginPath()
			c.ctx.moveTo(Math.floor(outline/2)*buttonSize,c.height*tempRatio+(outline %2) * c.height*sidebarScreenRatio/2)
			c.ctx.lineTo(Math.floor(outline/2)*buttonSize+buttonSize,c.height*tempRatio+(outline %2) * c.height*sidebarScreenRatio/2)
			c.ctx.lineTo(Math.floor(outline/2)*buttonSize+buttonSize,c.height*tempRatio+(outline %2) * c.height*sidebarScreenRatio/2+sidebarScreenRatio/2*c.height)
			c.ctx.lineTo(Math.floor(outline/2)*buttonSize,c.height*tempRatio+(outline %2) * c.height*sidebarScreenRatio/2+sidebarScreenRatio/2*c.height)
			c.ctx.lineTo(Math.floor(outline/2)*buttonSize,c.height*tempRatio+(outline %2) * c.height*sidebarScreenRatio/2)

			c.ctx.stroke()
			c.ctx.lineWidth = 1
		}
	}
	

		//c.ctx.drawImage(eraser,0,0)
		//c.ctx.drawImage(eraser,0,0,eraser.naturalWidth,eraser.naturalHeight,0,0,100,buttonSize)

		//c.ctx.drawImage(eraser,0,0,eraser.naturalWidth,eraser.naturalHeight,0,(sidebarRows-1)*buttonSize,c.width*sidebarScreenRatio/2,buttonSize)

}
function drawMain(){
	//console.log(c)
	c.ctx.strokeStyle = "black"

	c.ctx.beginPath()
	c.ctx.moveTo(w.min,h.min)
	c.ctx.lineTo(w.min,h.max)
	c.ctx.lineTo(w.max,h.max)
	c.ctx.lineTo(w.max,h.min)
	c.ctx.lineTo(w.min,h.min)
	c.ctx.stroke()

	if(orientation == "x"){
		for(var r = 1; r<rows; r++ ){
			
			c.ctx.beginPath()
			c.ctx.moveTo(w.min,h.min + r*squareSize)
			c.ctx.lineTo(w.max,h.min + r*squareSize)
			c.ctx.stroke()
		}
		for(var cc = 1; cc< cols; cc++){
			c.ctx.beginPath()
			c.ctx.moveTo(w.min+cc*squareSize,h.min)
			c.ctx.lineTo(w.min+cc*squareSize,h.max)
			c.ctx.stroke()
		}
		for(var r = 0; r<rows; r++ ){
			for(var cc = 0; cc< cols; cc++){
				c.ctx.fillStyle = m[r][cc]
				c.ctx.beginPath();
				c.ctx.arc(w.min+cc*squareSize+squareSize/2,h.min+r*squareSize+squareSize/2,squareSize/2,0,2*Math.PI);
				c.ctx.stroke()
				c.ctx.fill();
			}

		}
	}
	else{
		for(var r = 1; r<rows; r++ ){
			
			c.ctx.beginPath()
			c.ctx.moveTo(w.min + r*squareSize,h.min)
			c.ctx.lineTo(w.min + r*squareSize,h.max)
			c.ctx.stroke()
		}
		for(var cc = 1; cc< cols; cc++){
			c.ctx.beginPath()
			c.ctx.moveTo(w.min,h.min+cc*squareSize)
			c.ctx.lineTo(w.max,h.min+cc*squareSize)
			c.ctx.stroke()
		}
		for(var r = 0; r<rows; r++ ){
			for(var cc = 0; cc< cols; cc++){
				c.ctx.fillStyle = m[r][cc]
				c.ctx.beginPath();
				c.ctx.arc(w.min+r*squareSize+squareSize/2,h.min+cc*squareSize+squareSize/2,squareSize/2,0,2*Math.PI);
				c.ctx.stroke()
				c.ctx.fill();
			}

		}	
	}
	

}

function draw(){
	c.ctx.fillStyle = pageColor
	c.ctx.fillRect(0,0,c.width,c.height)


	drawSidebar()
	drawMain()
}
function onResize(event){
	c.width = window.innerWidth
	c.height = window.innerHeight
	if(c.width >= c.height){
		orientation = "x"
	}
	else{
		orientation = "y"
	}
	canvas.width = c.width
	canvas.height = c.height
	if(orientation == "x"){
		w = {"min":.3 * c.width,"max": .9* c.width}
		h = {"min":.1 * c.height,"max": .9* c.height}
	}
	else{
		w = {"min":.1 * c.width,"max": .9* c.width}
		h = {"min":.05 * c.height,"max": .7* c.height}
	}
	

	
	w.size = (w.max - w.min)
	h.size = (h.max - h.min)
	if(orientation == "x"){
		squareSize = w.size/cols
		if(h.min + squareSize*rows > h.max){//limiter is height
			squareSize = h.size/rows
			w.max = w.min + squareSize*cols
			w.size = (w.max - w.min)
		}
		else{//limiter is width
			h.max = h.min + squareSize*rows
			h.size = (h.max - h.min)

		}
		w.start = c.width * w.min
		h.start = c.height * w.min
	}
	else{
		squareSize = h.size/cols
		if(w.min + squareSize*rows > w.max){//limiter is height
			squareSize = w.size/rows
			h.max = h.min + squareSize*cols
			h.size = (h.max - h.min)
		}
		else{//limiter is width
			w.max = w.min + squareSize*rows
			w.size = (w.max - w.min)

		}
		h.start = c.height * h.min
		w.start = c.width * h.min
	}

	
	draw()

}
function onMainClick(click){
	for(var r = 0; r<rows; r++ ){
		for(var cc = 0; cc< cols; cc++){
			if(orientation == "x"){
				if(Math.sqrt(Math.pow(w.min+cc*squareSize+squareSize/2-click.x,2)+Math.pow(h.min+r*squareSize+squareSize/2-click.y,2)) < squareSize/2){
					m[r][cc] = userColor
					if (typeof(Storage) !== "undefined") {
						localStorage.grid = JSON.stringify(m)
					}
				}
			}
			else{
				if(Math.sqrt(Math.pow(h.min+cc*squareSize+squareSize/2-click.y,2)+Math.pow(w.min+r*squareSize+squareSize/2-click.x,2)) < squareSize/2){
					m[r][cc] = userColor
					if (typeof(Storage) !== "undefined") {
						localStorage.grid = JSON.stringify(m)
					}
				}
			}

			// c.ctx.fillStyle = m[r][cc]
			// c.ctx.beginPath();
			// c.ctx.arc(w.min+cc*squareSize+squareSize/2,h.min+r*squareSize+squareSize/2,squareSize/2,0,2*Math.PI);
			// c.ctx.stroke()
			// c.ctx.fill();
		}

	}
	draw()
}
function onSidebarClick(click){
	specialSelect = "none"
	let sidebarRows= Math.ceil(colors.length/2 )+1
	//console.log(c.height)
	if(orientation == "x"){
		let buttonSize = c.height/sidebarRows
		if(click.y > c.height - buttonSize){
			if(click.x > c.width * sidebarScreenRatio/2){
				//eraser
				console.log("eraser")
				specialSelect = "eraser";
				userColor = "white"
				
			}
			else{
				c.ctx.fillStyle = "rgba(0,0,0,1)"
				c.ctx.fillRect(0,c.height-buttonSize,c.width*sidebarScreenRatio/2,buttonSize)

				if(confirm("Really reset everything?")){

					for(var r = 0; r<rows; r++ ){
						
						for(var cc = 0; cc< cols; cc++){
							m[r][cc] = "white"
							if (typeof(Storage) !== "undefined") {
								localStorage.grid = JSON.stringify(m)
							}
						}

					}
				}

				
			}

		}
		else{
			let color = 0
			if(click.x > c.width * sidebarScreenRatio/2){
				color++;
			}
			
			color += (  Math.floor(click.y / buttonSize))*2
			if(color+1 > colors.length){
				userColor = "white"

			}
			else{
				userColor = colors[color]

			}

		}
	}
	else{
		let tempRatio = 1-sidebarScreenRatio
		let tempRatio2 = 1-sidebarScreenRatio/2
		let buttonSize = c.width/sidebarRows
		console.log(click)
		if(click.x > buttonSize*(sidebarRows-1)){
			if(click.y < c.height * tempRatio2){
				//eraser
				console.log("eraser")
				specialSelect = "eraser";
				userColor = "white"
				
			}
			else{
				c.ctx.fillStyle = "rgba(0,0,0,1)"
				c.ctx.fillRect(0,c.height-buttonSize,c.width*sidebarScreenRatio/2,buttonSize)

				if(confirm("Really reset everything?")){

					for(var r = 0; r<rows; r++ ){
						
						for(var cc = 0; cc< cols; cc++){
							m[r][cc] = "white"
							if (typeof(Storage) !== "undefined") {
								localStorage.grid = JSON.stringify(m)
							}
						}

					}
				}

				
			}

		}
		else{
			let color = 0
			if(click.y > c.height * tempRatio2){
				color++;
			}
			
			color += (  Math.floor(click.x / buttonSize))*2
			if(color+1 > colors.length){
				userColor = "white"

			}
			else{
				userColor = colors[color]

			}
			console.log(userColor)
			
		}
	}
	
	draw()
}

function onClick(event){
	let click = {"x":event.clientX,"y":event.clientY}
	if(orientation == "x"){
		if(click.x < sidebarScreenRatio*c.width){
			onSidebarClick(click)
		}
		else{
			onMainClick(click)
		}
	}
	else{
		if(click.y > (1-sidebarScreenRatio)*c.height){
			onSidebarClick(click)
		}
		else{
			onMainClick(click)
		}
	}
	
}
function onTouch(event){
	event.preventDefault()
	onClick(event.changedTouches[0])
}
window.addEventListener('resize',onResize);
window.addEventListener('click',onClick)
window.addEventListener('touchend',onTouch)
// window.addEventListener('ontouch',onClick)

onResize();

