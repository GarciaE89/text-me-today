// Used to have current date display on timeline, could be updated for multiple days. 
var addDate = function() {
    n =  new Date();
    y = n.getFullYear();
    m = n.getMonth() + 1;
    d = n.getDate();
    document.getElementById("date").innerHTML = m + "/" + d + "/" + y;
}


var textEvents = [];

var displayEvents = function() {
    var textEvents = JSON.parse(localStorage.getItem("textList"));
    console.log(textEvents);
    textEvents.sort(function(a,b) {
        return a.time - b.time;
    })

    var mainBox = document.querySelector("#timeline-line")
    mainBox.innerHTML = "<dt id='date'></dt>";
    addDate();
    //itterate through all events and create elements and append them to the page
    for (var i = 0; i < textEvents.length; i++) {
        console.log(textEvents[i].title);
        console.log(textEvents[i].what);
        var newItem = document.createElement("dd");
        if (i % 2 === 0) {
            newItem.classList = "pos-right clearfix";
        }
        else {
            newItem.classList = "pos-left clearfix";
        }
        //create dot
        var dot = document.createElement("div");
        dot.classList = "circ";
        newItem.appendChild(dot);

        //add time
        var timeEl = document.createElement("div");
        timeEl.classList = "time";
        var time = textEvents[i].time;
        if(time > 1200) {
            time = time - 1200;
        }
        time = time.toString();
        if(time.length = 3) {
            var starttime = time.slice(0,1);
            var endtime = time.slice(1,3);
            var finaltime = starttime + ":" + endtime; 
        }
        else {
            var starttime = time.slice(0,1);
            var endtime = time.slice(1,3);
            var finaltime = starttime + ":" + endtime; 
        }
        timeEl.textContent = finaltime;
        newItem.appendChild(timeEl);

        //create event box
        var eventbox = document.createElement("div");
        eventbox.classList = "events";
        //create img div
        var imgBox = document.createElement("div");
        imgBox.classList = "pull-left";
        //create img
        var img = document.createElement("img");
        img.classList = "events-object img-rounded thumbnails";
        img.setAttribute("src", textEvents[i].img);
        //append img to img div
        imgBox.appendChild(img);
        //append img div to events box
        eventbox.appendChild(imgBox);

        //events body
        var eventBody = document.createElement("div");
        eventBody.classList = "events-body";
        var eventtitle = document.createElement("h4");
        eventtitle.classList = "events-heading";
        eventtitle.textContent = textEvents[i].title;
        //append title to event body
        eventBody.appendChild(eventtitle);
        var eventp = document.createElement("p");
        eventp.textContent = textEvents[i].what;
        //append p element to event body
        eventBody.appendChild(eventp);

        //append event body to the eventbox
        eventbox.appendChild(eventBody);

        //append event box to dd
        newItem.appendChild(eventbox);
        //append new item to the main body
        mainBox.appendChild(newItem);
    }
}

var saveEvents = function() {
    var newEvent = {};
    var getTime = document.querySelector("#timeHolder").value;
    var colonLoc = getTime.indexOf(":");
    var theTime = getTime.slice(0, colonLoc) + getTime.slice(colonLoc + 1);
    theTime = parseInt(theTime);
    var phoneNumber = document.querySelector("#phone-number").value;
    var theMessage = document.querySelector("#message-input").value;
    var weatherBox = document.querySelector("#weather").value;
    var cityWeather = document.querySelector("#city-field").value;
    console.log(weatherBox);
    newEvent.time = theTime;
    newEvent.title = "temporary title";
    newEvent.what = theMessage;
    newEvent.number = phoneNumber;
    newEvent.city = cityWeather;
    textEvents.push(newEvent);
    localStorage.setItem('textList', JSON.stringify(textEvents));
    displayEvents();
}


document.getElementById("send-btn").addEventListener("click", saveEvents);
displayEvents();