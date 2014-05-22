function prepareCanvas(){
	var	ben = new Image(),
			canvasWidth = 925,
			canvasHeight =505,
			paint=false,
			lines = [],
			curColor ="#539ceb",
			clickSize = "normal";
	ben.src= ben_img_64;
	ben.onload = function()
	{
	  self.refresh();
	}
	var canvasDiv = document.getElementById('canvasDiv');
	bgCanvas = document.getElementById('bg');
	bgContext = bgCanvas.getContext('2d');
	fgCanvas=document.getElementById('fg');
	fgContext = fgCanvas.getContext('2d');

	var offset =$('#bg').offset();
	var self = {		
		init: function() {
			//touch
			fgContext.drawImage(ben, 0,0);
			fgContext.font = "1.2em sans-serif";
			fgContext.fillText("Draw a picture of a boy or a girl who stayed up late last night and is sleepy", 200, 43);
			canvasDiv.addEventListener('touchstart', self.touchDown, false);
			canvasDiv.addEventListener('touchmove', self.touchMove, false);
         //mouse 
			canvasDiv.addEventListener("mousedown", self.mouseDown, false);
			canvasDiv.addEventListener("mousemove", self.mouseMove, false);
			canvasDiv.addEventListener("mouseup", self.mouseUp, false);
			canvasDiv.addEventListener("mouseout", self.mouseOut, false);
			
			
			//color
			$(".blue").animate({
				top:22
			});
			$(".marker").mousedown(function(e){
				self.resetColors();
				if ($(e.target).hasClass("pink")){
					$(this).animate({
						top:22
					});
					var colorPink="#da4281";
					curColor = colorPink;
				}
				if ($(e.target).hasClass("purple")){
					$(this).animate({
						top:22
					});
					var colorPurple = "#6307ff";
					curColor = colorPurple;
				}
				if ($(e.target).hasClass("blue")){
					$(this).animate({
						top:22
					});
					var colorBlue = "#539ceb";
					curColor = colorBlue;
				}
				if ($(e.target).hasClass("green")){
					$(this).animate({
						top:22
					});
					var colorGreen = "#659b41";
					curColor = colorGreen;
				}
				if ($(e.target).hasClass("yellow")){
					$(this).animate({
						top:22
					});
					var colorYellow = "#ffcf33";
					curColor = colorYellow;
				}
				if ($(e.target).hasClass("orange")){
					$(this).animate({
						top:22
					});
					var colorOrange = "#ff6d05";
					curColor = colorOrange;
				}
				if ($(e.target).hasClass("red")){
					$(this).animate({
						top:22
					});
					var colorRed = "#e00f05";
					curColor = colorRed;
				}
				if ($(e.target).hasClass("brown")){
					$(this).animate({
						top:22
					});
					var colorBrown = "#8f5735";
					curColor = colorBrown;
				}
				if ($(e.target).hasClass("gray")){
					$(this).animate({
						top:22
					});
					var colorGray = "#626262";
					curColor = colorGray;
				}
				if ($(e.target).hasClass("black")){
					$(this).animate({
						top:22
					});
					var colorBlack = "#000000";
					curColor = colorBlack;
				}
				if ($(e.target).hasClass("white")){
					$(this).animate({
						top:22
					});
					var colorWhite = "#ffffff";
					curColor = colorWhite;
				}
			});
			$(".save").mousedown(function(){self.save()});
			//size
			$(".size-normal").addClass("size-normal-selected");
			$(".size-huge").mousedown(function(e){
				self.clearSize();
				clickSize = "huge";
				$(this).addClass("size-huge-selected");
			});
			$(".size-normal").mousedown(function(e){
				self.clearSize();
				clickSize = "normal";
				$(this).addClass("size-normal-selected");
			});
			$(".size-small").mousedown(function(e){
				self.clearSize();
				clickSize = "small";
				$(this).addClass("size-small-selected");
			});
			$('.eraser').mousedown(function(e){
				var colorWhite = "#ffffff";
				curColor = colorWhite;
				self.resetColors();
				$(this).addClass("eraser-selected");
			});
		},
   	touchDown: function(event) {
			var id = event.targetTouches[0].identifier;
			lines[id] = { x: event.targetTouches[0].pageX - offset.left, 
                       y: event.targetTouches[0].pageY - offset.top, 
                       color : curColor
			};
			event.preventDefault();
		},
		touchMove: function(event) {
      	var id = event.targetTouches[0].identifier,
				moveX = event.targetTouches[0].pageX - offset.left - lines[id].x,
				moveY = event.targetTouches[0].pageY - offset.top - lines[id].y;
			var ret = self.move(id, moveX, moveY);
         lines[id].x = ret.x;
			lines[id].y = ret.y;
			event.preventDefault();
		},
		mouseDown: function(event){
		 
			paint = true;
			var id = 1;
			lines[id] = { x: event.pageX - offset.left, 
                       y: event.pageY - offset.top, 
                       color : curColor
			};
		},
		mouseMove: function(event) {
			if (paint){
				var id = 1,
					moveX = event.pageX - offset.left - lines[id].x,
					moveY = event.pageY - offset.top - lines[id].y;
					
				var ret = self.move(id, moveX, moveY);
				lines[id].x = ret.x;
				lines[id].y = ret.y;
			}
		},
		mouseUp: function(event){
			paint = false;
		},
		mouseOut: function(event){
			paint=false;	
		},
		move: function(i, changeX, changeY) {
			if(clickSize == "huge"){
				radius = 10;
				clickSize = "huge";
			}else if(clickSize == "normal"){
				radius = 5;
				clickSize = "normal";
			}
			else if(clickSize == "small"){
				radius = 2;
				clickSize = "small";
			}
			bgContext.strokeStyle = lines[i].color;
			bgContext.lineWidth = radius;
   		bgContext.lineCap ="round";
			bgContext.beginPath();
			bgContext.moveTo(lines[i].x, lines[i].y);
			bgContext.moveTo(lines[i].x, lines[i].y);
			bgContext.lineTo(lines[i].x + changeX, lines[i].y + changeY);	
			bgContext.stroke();	
			bgContext.closePath();			
			return { x: lines[i].x + changeX, y: lines[i].y + changeY };
		},
		resetColors: function (){
			$(".pink").animate({
				top:0
			});
			$(".purple").animate({
				top:0
			});
			$(".blue").animate({
				top:0
			});
			$(".green").animate({
				top:0
			});
			$(".yellow").animate({
				top:0
			});
			$(".orange").animate({
				top:0
			});
			$(".red").animate({
				top:0
			});
			$(".brown").animate({
				top:0
			});
			$(".gray").animate({
				top:0
			});
			$(".black").animate({
				top:0
			});
			$(".white").animate({
				top:0
			});
			$(".eraser").removeClass("eraser-selected");
		},
		save: function(){
			bgContext.drawImage(fgCanvas,0,0);
			var dataURL = bgCanvas.toDataURL("image/png");
			window.open(dataURL, "Canvas Image");
		},
		clearSize: function(){
			$(".size-huge").removeClass("size-huge-selected");
			$(".size-normal").removeClass("size-normal-selected");
			$(".size-small").removeClass("size-small-selected");
		},
		clearCanvas: function(){
			ctxt.fillStyle = '#ffffff'; // Work around for Chrome
			ctxt.fillRect(0, 0, canvasWidth, canvasHeight); // Fill in the canvas with white
			canvas.width = canvas.width; // clears the canvas 
		},
		refresh: function() {
		 fgContext.drawImage(ben, 0,0); }
	};
	return self.init();
}