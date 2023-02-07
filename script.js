const inputContainer = document.getElementById('input-container'); 
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');
const completeEl = document.getElementById('complete');
const completeBtn = document.getElementById('complete-button');
const completeElInfo = document.getElementById('complete-info');
const second = 1000;
const minute = second*60;
const hour = minute*60;
const day = hour*24;

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive; 
let savedCountdown; 

// Set Date Input Min with Today's Date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);
    
// Populate Countdown / Complete UI
const updateDOM = () => {
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now;
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);
        const date = [days, hours, minutes, seconds];
        // Hide Input
        inputContainer.hidden = true;
        // If the countdown has ended, show complete 
        console.log(distance);
        if(distance < 0) {
            countdownEl.hidden = true;
             clearInterval(countdownActive);
             completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
             completeEl.hidden = false;
        } else {
            timeElements.forEach((data, index) => {
                data.textContent = date[index];
            })
    
    
            // Populate Countdown
            countdownElTitle.textContent = `${countdownTitle}`;
        
            // Hide input;
            inputContainer.hidden = true;
            // Show countdown
            countdownEl.hidden = false;
        }
    }, second);
}

// Takes Values from Form
const updateCountdown = (event) => {
    event.preventDefault();
    countdownTitle = event.srcElement[0].value;    
    countdownDate = event.srcElement[1].value;   
    savedCountdown = { 
        title: countdownTitle,
        date: countdownDate  
    }
    localStorage.setItem('countdown', JSON.stringify(savedCountdown));
    // Get number version of current Date, updateDOM
    if(countdownDate === '') {
        alert('Please select a date for the countdown');
    } else {
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

// Reset All Values
const reset = () => {
    // Hide Countdowns, show Input
    localStorage.removeItem('countdown');
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;
    // Stop the countdown
    clearInterval(countdownActive);
    countdownTitle = '';
    countdownDate = '';
}

// Restoroe
const restorePreviousCountdown = () => {
    if(localStorage.getItem('countdown')) {
        inputContainer.hidden = true;
        countdownEl.hidden = false;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

localStorage.setItem('countdown', JSON.stringify({
    title: 'Peace and be present', 
    date: '2073-02-07'  
}))

// Event Listener
completeBtn.addEventListener('click', reset);
countdownBtn.addEventListener('click', reset);
countdownForm.addEventListener('submit', updateCountdown);

// Onload => Previous
restorePreviousCountdown();
