const startButton = document.getElementsByClassName("start")[0];
const lapButton = document.getElementsByClassName("lap")[0];
const resetButton = document.getElementsByClassName("reset")[0];

const minute = document.getElementsByClassName("minute")[0];
const second = document.getElementsByClassName("sec")[0];
const msecond = document.getElementsByClassName("msec")[0];

const laps = document.getElementsByClassName("laps")[0];
const clear = document.getElementsByClassName("lap-clear-button")[0];


let canStart = true;
let minCounter = 0;
let secCounter = 0;
let msecCounter = 0;
let lapno=0;
let sec, msec;

const toogleButton = () => {
    lapButton.classList.remove("hidden");
    resetButton.classList.remove("hidden");
};

const formatTime = (time) => {
    return String(time).padStart(2, '0');
};

const start = () => {
    if (canStart) {
        startButton.innerHTML = "Pause";

        // Immediately update the display with double digits
        minute.innerHTML = `${formatTime(minCounter)} :&nbsp;`;
        second.innerHTML = `${formatTime(secCounter)} :&nbsp;`;
        msecond.innerHTML = `${formatTime(msecCounter)}`;

        min = setInterval(() => {
            minute.innerHTML = `${formatTime(++minCounter)} :&nbsp;`;
        }, 60 * 1000);

        sec = setInterval(() => {
            if (secCounter === 59) {
                secCounter = 0;
            } else {
                secCounter++;
            }
            second.innerHTML = `${formatTime(secCounter)} :&nbsp;`;
        }, 1000);

        msec = setInterval(() => {
            if (msecCounter === 99) {
                msecCounter = 0;
            } else {
                msecCounter++;
            }
            msecond.innerHTML = `${formatTime(msecCounter)}`;
        }, 10);

        canStart = false;
    } else {
        startButton.innerHTML = "Resume";
        clearInterval(min);
        clearInterval(sec);
        clearInterval(msec);

        canStart = true;
    }
    toogleButton();
    console.log("started");
};

const reset = () => {
    lapButton.classList.add("hidden");
    resetButton.classList.add("hidden");
    startButton.innerHTML = "Start";
    canStart = true;
    minute.innerHTML = '00 :&nbsp;';
    second.innerHTML = '00 :&nbsp;';
    msecond.innerHTML = '00';
    minCounter = 0;
    secCounter = 0;
    msecCounter = 0;
    clearInterval(min);
    clearInterval(sec);
    clearInterval(msec);
};
const lap=()=>{
    lapno++;
    const li=document.createElement("li")
    const number=document.createElement("span")
    const timestamp=document.createElement("span")
    li.setAttribute("class","lap-item")
    number.setAttribute("class","number")
    timestamp.setAttribute("class","timestamp")
    timestamp.innerHTML=`&nbsp;${formatTime(minCounter)} : ${formatTime(secCounter)} : ${formatTime(msecCounter)}`
    number.innerHTML=`# ${lapno}&nbsp;`
    li.append(number,timestamp)
    laps.append(li)
    clear.classList.remove("hidden");

}
const clearall=()=>{
    laps.innerHTML=""
    laps.append(clear)
    lapno=0;
    clear.classList.add("hidden");

}
startButton.addEventListener('click', start);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
clear.addEventListener('click', clearall);
