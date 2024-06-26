let cycles = 1;
let timerInterval = null;
let started = false;
let dt = new Date(0, 0, 0, 0, 20, 0);  // Set initial time
let wT = ["20", "00"];
let rT = ["05", "00"];
let currentPhase = "work";  // Keep track of the current phase

function getWT(value) {
    if (document.getElementById("workTime").checkValidity() && document.getElementById("workTime").value !== "00:00") {
        let time = value.split(":");
        wT = time;
        document.getElementById("timerText").innerHTML = wT[0] + ":" + wT[1];
        initializeTimer();
    } else {
        alert("Please enter time in format MM:SS. Time must be greater than 0 seconds");
    }
}

function getRT(value) {
    if (document.getElementById("restTime").checkValidity() && document.getElementById("restTime").value !== "00:00") {
        let time = value.split(":");
        rT = time;
    } else {
        alert("Please enter time in format MM:SS. Time must be greater than 0 seconds");
    }
}

const indicator = document.getElementById("indicator");

function initializeTimer() {
    if (currentPhase === "work") {
        dt.setMinutes(parseInt(wT[0]));
        dt.setSeconds(parseInt(wT[1]));
        indicator.innerHTML = "WORK";
    } else {
        dt.setMinutes(parseInt(rT[0]));
        dt.setSeconds(parseInt(rT[1]));
        indicator.innerHTML = "REST";
    }
    updateTimerText();
}

function updateTimerText() {
    let minutes = String(dt.getMinutes()).padStart(2, '0');
    let seconds = String(dt.getSeconds()).padStart(2, '0');
    document.getElementById("timerText").innerHTML = minutes + ":" + seconds;
    document.title = minutes + ":" + seconds + " " + indicator.innerHTML.toLowerCase();
}

function update() {
    if (dt.getMinutes() === 0 && dt.getSeconds() === 0) {
        cycles += 1;
        if (cycles % 2 === 0) {
            currentPhase = "rest";
        } else {
            currentPhase = "work";
        }
        initializeTimer();
    } else {
        dt.setSeconds(dt.getSeconds() - 1);
    }
    updateTimerText();
}

function toggle() {
    if (!started) {
        if (timerInterval === null) {
            update();
            timerInterval = setInterval(update, 1000);
        }
        document.getElementById("start").innerHTML = "pause";
        started = true;
    } else {
        clearInterval(timerInterval);
        timerInterval = null;
        document.getElementById("start").innerHTML = "play_arrow";
        started = false;
    }
}

window.onkeyup = function (key) {
    if (key.keyCode === 32) {
        toggle();
    }
}

document.getElementById("start").addEventListener("click", toggle);

document.getElementById("restart").addEventListener("click", function () {
    clearInterval(timerInterval);
    timerInterval = null;
    cycles = 1;
    currentPhase = "work";
    initializeTimer();
    document.getElementById("start").innerHTML = "play_arrow";
    started = false;
});

var r = document.querySelector(':root');
let theme = "light";
let themeController = document.getElementById("theme");
themeController.addEventListener("click", changeTheme);

function reset_animation(elementID) {
    var el = document.getElementById(elementID);
    el.style.animation = 'none';
    el.offsetHeight; // Trigger reflow
    el.style.animation = null;
}

function changeTheme() {
    if (theme == "light") {
        r.style.setProperty('--background', '#0b0b0b');
        r.style.setProperty('--text', '#E6D5C8');
        reset_animation("theme");
        themeController.innerHTML = "dark_mode";
        theme = "dark";
    } else {
        r.style.setProperty('--background', '#E6D5C8');
        r.style.setProperty('--text', '#0b0b0b');
        reset_animation("theme");
        themeController.innerHTML = "light_mode";
        theme = "light";
    }
}

const menuButton = document.getElementById("menuButton");
const menu = document.getElementById("menu");
let menuState = "closed";

menuButton.addEventListener("click", function() {
    if (menuState == "closed") {
        menuButton.innerHTML = "close";
        menu.style.display = "block";
        menu.style.opacity = "1"
        // Trigger reflow to ensure the transition happens
        menu.offsetHeight;
        menu.classList.add("active");
        menu.classList.remove("inactive");
        menuState = "open";
    } else {
        menuButton.innerHTML = "menu";
        menu.classList.remove("active");
        menu.classList.add("inactive");
        // Delay setting display:none to allow for transition
        setTimeout(() => {
            menu.style.display = "none";
        }, 500); // Match the duration of your CSS transition
        menuState = "closed";
    }
});

// Initialize menu as inactive to prevent interaction
menu.classList.add("inactive");

menu.addEventListener("transitionend", function(event) {
    if (menuState == "open" && event.propertyName === "opacity") {
        menu.classList.add("active");
        menu.classList.remove("inactive");
    }
});


function makeItRain() {
    document.querySelectorAll('.rain').forEach(element => element.innerHTML = '');

    var increment = 0;
    var drops = "";
    var backDrops = "";

    while (increment < 50) {
        // Couple random numbers to use for various randomizations
        // Random number between 98 and 1
        var randoHundo = Math.floor(Math.random() * (98 - 1 + 1) + 1);
        // Random number between 5 and 2
        var randoFiver = Math.floor(Math.random() * (5 - 2 + 1) + 2);
        // Increment
        increment += randoFiver;
        // Add in a new raindrop with various randomizations to certain CSS properties
        drops += '<div class="drop" style="left: ' + increment + '%; bottom: ' + (randoFiver * 2 - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.6s;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.6s;"></div><div class="splat" style="animation-delay: 0.6' + randoHundo + 's; animation-duration: 0.3s; bottom: -10px;"></div></div>';
        backDrops += '<div class="drop" style="right: ' + increment + '%; bottom: ' + (randoFiver * 2 - 1 + 100) + '%; animation-delay: 0.' + randoHundo + 's; animation-duration: 0.6s;"><div class="stem" style="animation-delay: 0.' + randoHundo + 's; animation-duration: 0.6s;"></div><div class="splat" style="animation-delay: 0.6' + randoHundo + 's; animation-duration: 0.3s; bottom: -10px;"></div></div>';
    }

    document.querySelector('.rain.front-row').innerHTML = drops;
    document.querySelector('.rain.back-row').innerHTML = backDrops;
}

let raining = false;
let rainSound = new Howl({
    src: ['./assets/audio/Rain Sound.ogg'],
    autoplay: false,
    loop: true
})

document.getElementById("rainButton").addEventListener("click", function () {
    if (!raining) {
        raining = true;
        makeItRain();
        rainSound.fade(0, 1, 1000);
        rainSound.play();
        r.style.setProperty('--background', '#446879');
        r.style.setProperty('--text', '#0b0b0b');
        themeController.style.display = "none";
    } else {
        raining = false;
        rainSound.pause();
        document.querySelectorAll('.drop').forEach(drop => {
            drop.style.animationPlayState = 'paused';
            drop.style.webkitAnimationPlayState = 'paused'; // for Safari
        });
        document.querySelectorAll('.drop').forEach(drop => drop.remove());
        themeController.style.display = "block";
        if (theme == 'dark') {
            r.style.setProperty('--background', '#0b0b0b');
            r.style.setProperty('--text', '#E6D5C8');
        } else {
            r.style.setProperty('--background', '#E6D5C8');
            r.style.setProperty('--text', '#0b0b0b');
        }
    }
})

let burning = false;
let fireSound = new Howl({
    src: ['./assets/audio/Campfire Sound.ogg'],
    autoplay: false,
    loop: true
})
const fire = document.getElementById("campfire");

document.getElementById("fireButton").addEventListener("click", function () {
    if (!burning) {
        burning = true;
        fire.style.display = "block";
        fireSound.fade(0, 1, 1000);
        fireSound.play();
    } else {
        burning = false;
        fire.style.display = "none";
        fireSound.pause();
    }
});