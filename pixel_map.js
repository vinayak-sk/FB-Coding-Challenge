/**
 * 
 */





	
	var eventList = [ {start: 30, end: 150}, {start: 540, end: 600}, {start: 560, end: 620}, {start: 610, end: 670} ];
	layOutDay(eventList);
	




function layOutDay(events) {
	var N = events.length;
	var eventXParams = getEventXParameters(events);
	
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	context.fillStyle = "#ECECEC";
	context.fillRect(0,0,620,720);
	
	context.font = "normal normal 14px Arial";
	context.textBaseline = "middle";
    context.textAlign = "left";
    
	for(var i=0;i<N;i++){		
		console.log(eventXParams[i].start +","+ events[i].start +","+ eventXParams[i].end  +","+ events[i].end);
		drawEntry(eventXParams[i].start, events[i].start, eventXParams[i].end, events[i].end);
				
	}
	


	

	

	
}

function getEventXParameters(events){
	
	var N = events.length;
	
	var eventWidth = []; //Divide 600 (width of the canvas) by this factor to get the width of each event
	var eventXParam = []; //Array to store the X co-ordinate start and end values for the event
	
	for(var i = 0; i<N; i++){
		eventWidth[i]=0; //Initialize event width to zero
		eventXParam[i] = {start:0, end:0};
	}
	
	for(var i = 0; i<720; i++){
		var columnsCount=0; //This is the number of columns i.e events for which the current row pixel is set
		for(var j = 0; j<N; j++){			
			if(i>=events[j].start && i<=events[j].end){				
				columnsCount++; //Increment the column count if the current row pixel is set for current event in the events array
			}
		}
		for(var k = 0; k<N; k++){
			if(i>=events[k].start && i<=events[k].end && columnsCount>eventWidth[k]){
				eventWidth[k] = columnsCount; //Reduce the width of the event (increase the division factor) if the factor is less than the number of events colliding in a row
			}
		}
	}
	
	for(var i = 0; i<720; i++){
		var xCurrentStart=0;
		var xCurrentEnd=0;
		for(var j =0; j<N; j++){
			if(i>=events[j].start && i<=events[j].end && xCurrentStart >= eventXParam[j].start ){
				eventXParam[j].start = xCurrentStart;
				xCurrentEnd = xCurrentStart +(600/eventWidth[j]);;
				eventXParam[j].end = xCurrentEnd;
				xCurrentStart = xCurrentEnd;
			}
		}
	}
	
	return eventXParam;
}


function drawEntry(topX, topY, bottomX, bottomY){
	
	topX=topX+10;
	bottomX=bottomX+10;
	
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	
	
	
	context.beginPath();
	context.lineWidth="1";
	context.fillStyle="#4B6EA9";
	context.fillRect(topX,topY,4,bottomY-topY);
	
	
	topX = topX+4;
	
	
	context.strokeStyle="#D6D6D6";
	context.strokeRect(topX,topY,bottomX-topX,bottomY-topY); //Rectangle grey borders
	
	context.fillStyle = "#FFFFFF";
	context.fillRect(topX+1,topY,bottomX-topX-2,bottomY-topY); //Rectangle inner fill
	
	context.fillStyle = "#4B6EA9";
	context.font="13px Arial";
	context.fillText("Sample Item", topX+10, topY+15);
	
	context.fillStyle = "#000000";
	context.font="8px Arial";
	context.fillText("Sample Location", topX+10, topY+28);
	
	
}