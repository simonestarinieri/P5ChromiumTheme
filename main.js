var time = null;
var quotes = getQuotes();
var isPlaying = false;
var currentVolume=0.01;
const songsArray = ["jaldabaoth.mp3","throwawayyourmask.mp3","thewhimsoffate.mp3","100riversinthedesert.mp3","takeover.mp3","lastsurprise.mp3","lifewillchange.mp3","wakeup.mp3","tokyodaylight.mp3","beneaththemaskrain.mp3","velvetroom.mp3"]
var currentSong = songsArray[0];
chrome.storage.local.get('firstStart', function(data) {
    if(!data.firstStart){
        chrome.storage.local.set({'name':"Timo"});
        chrome.storage.local.set({'search_engine':"https://search.brave.com/search"});
        chrome.storage.local.set({'birthday':"1998-12-04"});
        chrome.storage.local.set({"firstStart":"true"});
    }
});
chrome.storage.local.get('volume',function(data){
    if(typeof data.volume !== "undefined"){
        currentVolume = data.volume;
    }
});
chrome.storage.session.get('time', function(data) {
    time = data.time;
});
chrome.storage.session.get('playedSong', function(data) {
    if(data.playedSong){
        let tmp = data.playedSong;
        let start = tmp.lastIndexOf("/");
        currentSong = tmp.slice(start+1);
    }
});
const today = new Date(Date.now());
let birthday = "";
const duration = 2 * 1000,
    animationEnd = Date.now() + duration,
    defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
window.onload =function(){
    let volume = document.querySelector("#volume");
    volume.value=currentVolume*100;
    volume.addEventListener("change", function(e) {
        let myAudio = document.getElementById("music");
        myAudio.volume = e.currentTarget.value / 100;
        currentVolume = e.currentTarget.value / 100;
        chrome.storage.local.set({'volume':currentVolume});
    })
    let resume = this.document.getElementById("resume");
    let next = this.document.getElementById("next");
    let previous = this.document.getElementById("previous");
    resume.onclick = function(){
        let myAudio = document.getElementById("music");
        if(isPlaying){
            myAudio.pause()
        }else{ 
            myAudio.play();
        }
    }
    next.onclick = function(){
                    let next = songsArray.indexOf(currentSong) + 1;
                    if(next in songsArray){
                        document.getElementById("song").src="music/"+songsArray[next];
                        chrome.storage.session.set({"playedSong":songsArray[next]});
                        currentSong=songsArray[next];
                    }else{
                        document.getElementById("song").src="music/"+songsArray[0];
                        chrome.storage.session.set({"playedSong":songsArray[0]});
                        currentSong=songsArray[0];
                    }
                    document.getElementById("music").load();
                    document.getElementById("music").play();
    }
    previous.onclick = function(){
                    let next = songsArray.indexOf(currentSong) - 1;
                    if(next in songsArray){
                        document.getElementById("song").src="music/"+songsArray[next];
                        chrome.storage.session.set({"playedSong":songsArray[next]});
                        currentSong=songsArray[next];
                    }else{
                        document.getElementById("song").src="music/"+songsArray[songsArray.length-1];
                        chrome.storage.session.set({"playedSong":songsArray[songsArray.length-1]});
                        currentSong=songsArray[songsArray.length-1]
                    }
                    document.getElementById("music").load();
                    document.getElementById("music").play();
    }
    today.setHours(0, 0, 0, 0);
    loadJsonFile("data/greeting.json").then(data => {
        let greet="";
        console.log(today);
        let greetings = JSON.parse(data);
        console.log(greetings);
        greet = greetings[Math.floor(Math.random()*greetings.length)];
        chrome.storage.local.get('birthday', function (data) {
            birthday = data.birthday;
            if(checkDate({"day":birthday})) {
                greet = "Happy Birthday ";
                const interval = setInterval(function () {
                    const timeLeft = animationEnd - Date.now();
                    if (timeLeft <= 0) {
                        return clearInterval(interval);
                    }
                    function randomInRange(min, max) {
                        return Math.random() * (max - min) + min;
                    }
                    const particleCount = 50 * (timeLeft / duration);
                    // since particles fall down, start a bit higher than random
                    confetti(
                        Object.assign({}, defaults, {
                            particleCount,
                            origin: {x: randomInRange(0.1, 0.3), y: Math.random() - 0.2},
                        })
                    );
                    confetti(
                        Object.assign({}, defaults, {
                            particleCount,
                            origin: {x: randomInRange(0.7, 0.9), y: Math.random() - 0.2},
                        })
                    );
                }, 250)
            }
            if(today.getMonth()===1 && today.getDate()===14){
                const defaults = {
                    spread: 360,
                    ticks: 100,
                    gravity: 0,
                    decay: 0.94,
                    startVelocity: 30,
                    shapes: ["heart"],
                    colors: ["#FFC0CB", "#FF69B4", "#FF1493", "#C71585"],
                };

                confetti({
                    ...defaults,
                    particleCount: 50,
                    scalar: 2,
                });

                confetti({
                    ...defaults,
                    particleCount: 25,
                    scalar: 3,
                });

                confetti({
                    ...defaults,
                    particleCount: 10,
                    scalar: 4,
                });
            }else if((today.getMonth()===11 && today.getDate()===31)||today.getMonth()===0 && today.getDate()===1){
                const end = Date.now() + 15 * 1000;

                (function frame() {
                confetti({
                    particleCount: 2,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                });

                confetti({
                    particleCount: 2,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
                })();
            }else if (today.getMonth()===11){
                const duration = 15 * 10000,
                animationEnd = Date.now() + duration;

                let skew = 1;

                function randomInRange(min, max) {
                return Math.random() * (max - min) + min;
                }

                (function frame() {
                const timeLeft = animationEnd - Date.now(),
                    ticks = Math.max(200, 500 * (timeLeft / duration));

                skew = Math.max(0.8, skew - 0.001);

                confetti({
                    particleCount: 1,
                    startVelocity: 0,
                    ticks: ticks,
                    origin: {
                    x: Math.random(),
                    // since particles fall down, skew start toward the top
                    y: Math.random() * skew - 0.2,
                    },
                    colors: ["#ffffff"],
                    shapes: ["circle"],
                    gravity: randomInRange(0.4, 0.6),
                    scalar: randomInRange(0.4, 1),
                    drift: randomInRange(-0.4, 0.4),
                });

                if (timeLeft > 0) {
                    requestAnimationFrame(frame);
                }
                })();
            }
            document.getElementById("greetingText").innerText = greet+" ";
        });
    })
    chrome.storage.local.get('name', function (data) {
        document.getElementById("user").innerText = data.name+"!";
    });
    chrome.storage.local.get('search_engine', function (data) {
        document.getElementById("search").action = data.search_engine;
    });
    loadJsonFile("data/people.json").then(people =>{
        let quotesData= quotes;
        let peopleData = JSON.parse(people);
        let id;
        if(today.getMonth()==11&&(today.getDate()==24||today.getDate()==25||today.getDate()==26)){
            quotesData = quotesData.filter((quote) => quote['day']=="12/25");
        }else if(quotesData.find(checkDate)){
            quotesData = quotesData.filter(checkDate);
        }else{
            quotesData =quotesData.filter((quote) => !quote['day']);
        }
        id = Math.floor(Math.random() * quotesData.length);
        var audio = document.getElementById("music");
        audio.volume=currentVolume;
        audio.onplaying = function(){
            isPlaying = true;
            document.getElementById("resumeIcon").src="img/def/pause.png";
        }
        audio.onpause = function() {
            isPlaying = false;
            document.getElementById("resumeIcon").src="img/def/play.png";
        };
        audio.onended = function(){
                            chrome.storage.session.set({"time":"0"});
                            let next = songsArray.indexOf(currentSong) + 1;
                            if(next in songsArray){
                                document.getElementById("song").src="music/"+songsArray[next];
                                chrome.storage.session.set({"playedSong":songsArray[next]});
                                currentSong=songsArray[next];
                            }else{
                                document.getElementById("song").src="music/"+songsArray[0];
                                chrome.storage.session.set({"playedSong":songsArray[0]});
                                currentSong=songsArray[0];
                            }
                            document.getElementById("music").load();
                            document.getElementById("music").play();
                        }
        var song = this.document.getElementById("song");
        let songtoplay = peopleData[quotesData[id]['said_by']].song;
        if(songtoplay == currentSong || songtoplay == null){
            if(currentSong){
                song.src="music/"+currentSong;
            }
            if(songtoplay==null){
                audio.load();
                if(time){
                    audio.currentTime = time;
                }
            }else{
                audio.load();
            }

        }else{
            song.src="music/"+songtoplay;
            audio.load();
        }
        audio.play();
        audio.ontimeupdate = function(){
            chrome.storage.session.set({"playedSong":song.src,"time":audio.currentTime});
        }
        document.getElementById("main").setAttribute("style","background-image: url(img/def/background.jpg), linear-gradient("+peopleData[quotesData[id]['said_by']].color+",black);");
        document.getElementById("name").innerText = quotesData[id]["said_by"];
        document.getElementById("char").setAttribute("style","background-image: url(img/people/"+quotesData[id]["game"]+"/"+quotesData[id]["said_by"]+".png");
        document.getElementById("text").innerText = quotesData[id]["quote"];
    });
}

function loadJsonFile(fileName) {
    return fetch(chrome.runtime.getURL(fileName))
        .then(response => response.text());
}

function checkDate(quote) {
    if(quote['day']){
        let day = new Date(quote["day"]);
        day.setHours(0,0,0);
        day.setFullYear(today.getFullYear());
        return day.getTime()===today.getTime();
    }
    return false;
}

function getQuotes(){
    let quotesArray = new Array();
    loadJsonFile("data/people.json").then(people=>{
        let peopleData = JSON.parse(people);
        for(person in peopleData){
            loadJsonFile("data/quotes/"+person+".json").then(quotes=>{
                list = JSON.parse(quotes);
                for(element in list){
                    quotesArray.push(list[element]);
                }
            });
        }
    });
    return quotesArray;
}