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
    var len = textEvents.length;
    if(len === 0) {
        var mainBox = document.querySelector("#timeline")
        var mainArea = document.createElement("img");
        mainArea.setAttribute("src", "./assets/img/textmetoday.jpg")
        mainBox.appendChild(mainArea);
    }
    else {
        var jumpImg = document.querySelector("#timeline");
        jumpImg.innerHTML = "<dl id='timeline-line'></dl>";
        var mainBox = document.querySelector("#timeline-line")
        mainBox.innerHTML = "<dt id='date'></dt>";
        addDate();
    }
    
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
            if(time.length === 3) {
                var starttime = time.slice(0,1);
                var endtime = time.slice(1,3);
                var finaltime = starttime + ":" + endtime; 
            }
            else if(time.length === 4) {
                var starttime = time.slice(0,2);
                var endtime = time.slice(2,4);
                var finaltime = starttime + ":" + endtime; 
            }
            timeEl.textContent = finaltime;
            newItem.appendChild(timeEl);
    
            //create event box
            var eventbox = document.createElement("div");
            eventbox.classList = "events";
            //create img div
            var imgBox = document.createElement("div");
            if (i % 2 === 0) {
                imgBox.classList = "pull-left";
            }
            else {
                imgBox.classList = "pull-right";
            }
            //imgBox.classList = "pull-left";
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

var saveEvents = function() {
    var newEvent = {};
    var getTime = document.querySelector("#timeHolder").value;
    if(!getTime) {
        var timeBox = document.querySelector("#timeInput");
        timeBox.classList = "col-xs-3 form-group has-error has-feedback";
    }
    else {
        //var colonLoc = getTime.indexOf(":");
        var theTime = getTime.replace(":", "");
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
        setTimeout(function() {
                clearModal();
            }, 4000)
    }    
}

var clearModal = function() {
    var modal = document.querySelector("#send-btn");
    modal.removeAttribute("data-dismiss", "modal");
}

var removeAll = function() {
    textEvents = [];
    localStorage.setItem('textList', JSON.stringify(textEvents));
    location.reload();
}

document.getElementById("send-btn").addEventListener("click", saveEvents);
document.getElementById("remove-all").addEventListener("click", removeAll);
displayEvents();

// fetch weather API
async function fetchWeather() {
    const resp = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + document.querySelector("#city-field").value + '&appid=075bfb0a221c22109566147d3393fe9b');

    return resp.json();
}

// fetch affirmation quote API
async function fetchAff() {
    const resp = await fetch("https://dulce-affirmations-api.herokuapp.com/affirmation");
    
    return resp.json();
}

// fetch joke API
async function fetchJoke() {
    const resp = await fetch('https://api.icndb.com/jokes/random?');

    return resp.json();
}

// textbelt API function
function sendText(theMessage, phoneNumber) {
    fetch('https://textbelt.com/text', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: phoneNumber,
        message: theMessage + extraMessages,
        key: 'c2d73da2fe22fe551cc99c64af7206fef2208645cX0nY7S9R2EJlnSyezQd3HnzK',
      }),
    }).then(response => {
    return response.json();
    }).then(data => {
      console.log(data);
    });
};

var extraMessages = '';

// time audit
  setInterval(function() {
    textEvents.forEach(async function(event, i) {
        let time = new Date();
        let currentTime = time.getHours().toString() + time.getMinutes().toString();

        if (currentTime == event.time) {
            if (document.getElementById('weather').checked)
                await fetchWeather().then(data => extraMessages += '\nLocal Weather: ' + data.weather[0].description);
            if (document.getElementById('affirmation').checked)
                await fetchAff().then(data => extraMessages += '\n' + data[0].phrase);
            if (document.getElementById('other').checked)
                await fetchJoke().then(data => extraMessages += '\n' + data.value.joke);

            sendText(event.what, event.number);
            extraMessages = '';
            textEvents.splice(i, 1);
        }
    });
  }, 2000);