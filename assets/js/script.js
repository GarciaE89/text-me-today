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
    var textEvents = JSON.parse(localStorage.getItem("textList")) || [];
    if(textEvents) {
        textEvents.sort(function(a,b) {
            return a.time - b.time;
        })
    }
    localStorage.setItem('textList', JSON.stringify(textEvents));

    
    var mainBox = document.querySelector("#timeline-line")
    mainBox.innerHTML = "<dt id='date'></dt>";
    addDate();
    //itterate through all events and create elements and append them to the page
    if(textEvents) {
        for (var i = 0; i < textEvents.length; i++) {
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
            img.setAttribute("src", textEvents[i].icon);
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
            //refreshSave();
        }
    }  
}

var refreshSave = function() {
    localStorage.setItem('textList', JSON.stringify(textEvents));
}

var saveEvents = function() {
    var newEvent = {};
    var getTime = document.querySelector("#timeHolder").value;
    if(!getTime) {
        var timeBox = document.querySelector("#timeInput");
        timeBox.classList = "col-xs-3 form-group has-error has-feedback";
    }
    else {
        var colonLoc = getTime.indexOf(":");
        var theTime = getTime.slice(0, colonLoc) + getTime.slice(colonLoc + 1);
        theTime = parseInt(theTime);
        var amPm = document.querySelector("#selecter_basic").value;
        if(amPm === "pm") {
            theTime = theTime + 1200;
        }
    }
    
    var phoneNumber = document.querySelector("#phone-number").value;
    if(!phoneNumber) {
        var theNumber = document.querySelector("#phoneInput");
        theNumber.classList = "col-xs-5 form-group has-error has-feedback";
    }
    else{
        while(phoneNumber.includes("-")) {
            phoneNumber = phoneNumber.replace("-", "");
            console.log(phoneNumber)
        }
    }
    var theMessage = document.querySelector("#message-input").value;
    if(!theMessage) {
        var messageBox = document.querySelector("#messageInput");
        messageBox.classList = "col-xs-12 form-group has-error has-feedback";
    }
    var weatherBox = document.querySelector("#weather").checked;
    var affirmationBox = document.querySelector("#affirmation").checked;
    var sillyBox = document.querySelector("#other").checked;
    if(!weatherBox && !affirmationBox && !sillyBox) {
        var theweather = document.querySelector("#optionsWords");
        theweather.classList ="alert alert-danger"
    }
    var cityWeather = document.querySelector("#city-field").value;
    if(!cityWeather) {
        var cityBox = document.querySelector("#city-box");
        cityBox.classList = "col-xs-12 form-group has-error has-feedback";
    }
    if(theTime && phoneNumber && theMessage  && cityWeather) {
        newEvent.time = theTime;
        if(weatherBox === true) {
            newEvent.title = "Weather Notification";
            newEvent.icon = "./assets/img/weather.gif"
        }
        else if (affirmationBox === true) {
            newEvent.title = "Daily Affirmation";
            newEvent.icon = "./assets/img/affirmation.gif"
        }
        else if (sillyBox === true) {
            newEvent.title = "Daily Joke"
            newEvent.icon = "./assets/img/random.gif"
        }
        else {
            newEvent.title = "Scheduled text"
            newEvent.icon = "./assets/img/textme.gif"
        }
        newEvent.what = theMessage;
        newEvent.number = phoneNumber;
        newEvent.city = cityWeather;
        textEvents.push(newEvent);
        localStorage.setItem('textList', JSON.stringify(textEvents));
        displayEvents();
        var theModal = document.querySelector("#send-btn");
        theModal.setAttribute("data-dismiss", "modal");
        //location.reload();
        var modalBox = document.querySelector("#task-form-modal").getAttribute("aria-hidden");
        console.log(modalBox);
        function waitATick() {
            setTimeout(function() {
                clearModal();
            }, 4000)
        }
        //clearModal();
    }    
}

var clearModal = function() {
    var timeField = document.querySelector("#timeHolder");
    timeField.textContent = "";
    var modal = document.querySelector("#send-btn");
    var modalBox = document.querySelector("#task-form-modal").getAttribute("aria-hidden");
    console.log(modalBox);
    //modal.removeAttribute("data-dismiss", "modal");
}

var removeAll = function() {
    textEvents = [];
    localStorage.setItem('textList', JSON.stringify(textEvents));
    displayEvents();
}

document.getElementById("send-btn").addEventListener("click", saveEvents);
document.getElementById("remove-all").addEventListener("click", removeAll);
displayEvents();