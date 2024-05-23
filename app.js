let cycles = 1;
let timerInterval = null;
let started = false;
let dt = new Date();

const indicator = document.getElementById("indicator");

function update() {
    const myTime = document.getElementById("timerText").innerHTML;
    let ss = myTime.split(":");
    dt.setHours(0);
    dt.setMinutes(ss[0]);
    dt.setSeconds(ss[1]);

    if (ss[0] == "00" && ss[1] == "00") {
        cycles += 1;
        if (cycles % 2 == 0) {
            dt.setMinutes(20);
            dt.setSeconds(0);
            indicator.innerHTML = "WORK";
        } else {
            dt.setMinutes(5);
            dt.setSeconds(0);
            indicator.innerHTML = "REST";
        }
        dt.setSeconds(dt.getSeconds() - 1);
    } else {
        dt.setSeconds(dt.getSeconds() - 1);
    }

    var temp = dt.toTimeString().split(" ");
    var ts = temp[0].split(":");

    document.getElementById("timerText").innerHTML = ts[1] + ":" + ts[2];
}

function toggle() {
    if(!started) {
        if (timerInterval === null) {
            update(); // Initial call to update immediately
            timerInterval = setInterval(update, 1000);
        }
        document.getElementById("start").innerHTML = "pause"
        started = true;
    } else {
        clearInterval(timerInterval);
        timerInterval = null;
        document.getElementById("start").innerHTML = "play_arrow"
        started = false
    }
}

window.onkeydown = function(key) {
    if(key.keyCode === 32) {
        toggle();
    }
}

document.getElementById("start").addEventListener("click", toggle);

document.getElementById("restart").addEventListener("click", function() {
    clearInterval(timerInterval);
    timerInterval = null;
    dt.setMinutes(20);
    dt.setSeconds(0);
    document.getElementById("timerText").innerHTML = "20:00";
    indicator.innerHTML = "WORK";
    document.getElementById("start").innerHTML = "play_arrow";
    started = false;
    cycles = 1;
});


var r = document.querySelector(':root');
let theme = "light";
let themeController = document.getElementById("theme");
themeController.addEventListener("click", changeTheme)

function reset_animation(elementID) {
    var el = document.getElementById(elementID);
    el.style.animation = 'none';
    el.offsetHeight;
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