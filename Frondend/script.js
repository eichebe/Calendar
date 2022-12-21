//import { openModal, saveInput } from '/.event.js';

const date = new Date();

const init = () => {
    date.setDate(1);

const monthDays = document.querySelector(".days");
monthDays.addEventListener("click", (event) => {
  if (event.target.classList.contains("prev-date") || event.target.classList.contains("next-date")) {
    return;
  }
  //openModal(event.target.innerText);
});

const indexFirstDay = date.getDay();

const indexLastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();



const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
    ];

const currentMonth = date.getMonth();

const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();

const emptyCells = 7 - (indexLastDay + lastDay) % 7;
const nextDays = emptyCells > 0 ? emptyCells : 7;

//document.getElementById("saveButton").addEventListener("click", saveInput);
document.getElementById("currentYear").innerText = date.getFullYear();
document.getElementById("currentMonthDate").innerText = months[date.getMonth()];
document.getElementById("dateToday").innerText = new Date().toDateString();

let days = "";

//Prev Month Days
for(let x = indexFirstDay; x > 0; x--){
    days+=`<div class="prev-date">${prevLastDay - x +1}</div>`
}

//Current Month Days
for (let i = 1; i <= lastDay; i++){
    //Today
    if( i === new Date().getDate() && date.getMonth() === new Date().getMonth()){
        days += `<div class="today">${i}</div>`;
    }else{
        days+=`<div id="${i}">${i}</div>`; 
        monthDays.innerHTML += days;
    }
    
}

    //Days of next Month
    for(let j = 1; j <= nextDays; j++) {
        days += `<div class="next-date">${j}</div>`;
        monthDays.innerHTML = days;
    }
    
   

};

    //Button prev Month
    document.getElementById("prevMonth").addEventListener("click", () => {
        date.setMonth(date.getMonth() - 1);
        if (date.getMonth() === 0) {
            date.setFullYear(date.getFullYear() - 1);
            date.setMonth(11);
          } else {
            date.setMonth(date.getMonth() - 1);
          }
        init();
    });
    
    //Button next Month
    document.getElementById("nextMonth").addEventListener("click", () => {
        date.setMonth(date.getMonth() + 1);
        if (date.getMonth() === 11) {
            date.setFullYear(date.getFullYear() + 1);
            date.setMonth(0);
          } else {
            date.setMonth(date.getMonth() + 1);
          }
        init();
    });


init();