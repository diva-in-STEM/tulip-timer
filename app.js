let cycles = 1;
let timerInterval = null;
let started = false;
let dt = new Date();
let wT = ["20", "00"];
let rT = ["05", "00"];
let currentPhase = "work"; // Keep track of the current phase

function getWT(value) {
    let time = value.split(":");
    wT = time;
}

function getRT(value) {
    let time = value.split(":");
    rT = time;
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
}

function update() {
    if (dt.getMinutes() === 0 && dt.getSeconds() === 0) {
        cycles += 1;
        if (cycles % 2 == 0) {
            currentPhase = "rest";
        } else {
            currentPhase = "work";
        }
        initializeTimer();
    } else {
        dt.setSeconds(dt.getSeconds() - 1);
    }

    var temp = dt.toTimeString().split(" ");
    var ts = temp[0].split(":");

    document.getElementById("timerText").innerHTML = ts[1] + ":" + ts[2];
}

function toggle() {
    if (!started) {
        if (timerInterval === null) {
            initializeTimer();
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

window.onkeydown = function(key) {
    if (key.keyCode === 32) {
        toggle();
    }
}

document.getElementById("start").addEventListener("click", toggle);

document.getElementById("restart").addEventListener("click", function() {
    clearInterval(timerInterval);
    timerInterval = null;
    cycles = 1;
    currentPhase = "work";
    initializeTimer();
    document.getElementById("timerText").innerHTML = wT[0] + ":" + wT[1];
    indicator.innerHTML = "WORK";
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
        menuState = "open";
    } else {
        menuButton.innerHTML = "menu";
        menu.style.display = "none";
        menuState = "closed";
    }
});


