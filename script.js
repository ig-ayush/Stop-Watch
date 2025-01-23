let timeDisplay = document.querySelector('h1');
let startStopButton = document.querySelector('.start');
let resetButton = document.querySelector('.reset');
let lapButton = document.querySelector('.lap');
let lapsContainer = document.querySelector('.laps');
let clearLapsButton = document.querySelector('.clear');

let startTime = 0; 
let eltime = 0; 
let timerInterval = null;
let lapCount = 0;

// Start/Stop 
const toggleTimer = () => {
    if (!timerInterval) {
        startTime = Date.now() - eltime; 
        timerInterval = setInterval(updateTime, 10); 
        startStopButton.textContent = "Stop";
        startStopButton.classList.add('clickBtn');
    } else {
        clearInterval(timerInterval);
        timerInterval = null;
        startStopButton.textContent = "Start";
        startStopButton.classList.remove('clickBtn');
    }
};

// Update Time
const updateTime = () => {
    eltime = Date.now() - startTime;

    const ms = Math.floor((eltime % 1000) / 10);
    const s = Math.floor((eltime / 1000) % 60);
    const m = Math.floor((eltime / (1000 * 60)) % 60);
    const h = Math.floor(eltime / (1000 * 60 * 60));

    document.querySelector('#hour').textContent = h < 10 ? `0${h}:` : `${h}:`;
    document.querySelector('#minutes').textContent = m < 10 ? `0${m}:` : `${m}:`;
    document.querySelector('#seconds').textContent = s < 10 ? `0${s}` : `${s}`;
    document.querySelector('#milseconds').textContent = `.${ms < 10 ? `0${ms}` : ms}`;
};

// Reset Timer
const resetTimer = () => {
    clearInterval(timerInterval);
    timerInterval = null;
    eltime = 0;

    document.querySelector('#hour').textContent = "00:";
    document.querySelector('#minutes').textContent = "00:";
    document.querySelector('#seconds').textContent = "00";
    document.querySelector('#milseconds').textContent = ".00";

    startStopButton.textContent = "Start";
    startStopButton.classList.remove('clickBtn');
};

// Add Lap
const addLap = () => {
    lapCount++;
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCount}: ${timeDisplay.innerText}`;
    const separator = document.createElement('hr');
    lapsContainer.append(lapItem, separator);

    clearLapsButton.classList.remove('display');
};

// Clear Laps
const clearLaps = () => {
    lapsContainer.innerHTML = ""; 
    lapCount = 0;
    clearLapsButton.classList.add('display');
};

// Event Listeners
startStopButton.addEventListener('click', toggleTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', addLap);
clearLapsButton.addEventListener('click', clearLaps);