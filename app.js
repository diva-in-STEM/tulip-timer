let timer = 1;
let timerInterval = null;

window.onload = function() {
    timer = 1;
}

function update() {
    const indicator = document.getElementById("indicator");
    const myTime = document.getElementById("timerText").innerHTML;
    let ss = myTime.split(":");
    let dt = new Date();
    dt.setHours(0);
    dt.setMinutes(ss[0]);
    dt.setSeconds(ss[1]);

    if (ss[1] == "00") {
        timer += 1;
        if (timer % 2 == 0) {
            dt.setMinutes(0);
            dt.setSeconds(5);
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

document.getElementById("start").addEventListener("click", function() {
    if (timerInterval === null) {
        update(); // Initial call to update immediately
        timerInterval = setInterval(update, 1000);
    }
});

document.getElementById("stop").addEventListener("click", function() {
    clearInterval(timerInterval);
    timerInterval = null;
});


var r = document.querySelector(':root');
let theme = "light";
let themeController = document.getElementById("theme");
themeController.addEventListener("click", changeTheme)

function reset_animation(elementID) {
    var el = document.getElementById(elementID);
    el.style.animation = 'none';
    el.offsetHeight; /* trigger reflow */
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