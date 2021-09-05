// Used to have current date display on timeline, could be updated for multiple days. 
n =  new Date();
y = n.getFullYear();
m = n.getMonth() + 1;
d = n.getDate();
document.getElementById("date").innerHTML = m + "/" + d + "/" + y;

var textEvents = [
    {
        time: 1800,
        title: "Title one",
        what: "this would say one number 1 is",
        img: "./assets/img/cat.jpg"
    },
    {
        time: 1500,
        title: "Title two",
        what: "this would say one number 2 is",
        img: "./assets/img/dog.jpg"
    },
    {
        time: 1700,
        title: "Title three",
        what: "this would say one number 3 is",
        img: "./assets/img/cat2.jpg"
    },
];

var displayEvents = function() {
    //var list = JSON.parse(localStorage.getItem("textlist")) || [];
    textEvents.sort(function(a,b) {
        return a.time - b.time;
    })

    var mainBox = document.querySelector("#timeline-line")
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






        //newItem.classList = ""
    }
}

displayEvents();