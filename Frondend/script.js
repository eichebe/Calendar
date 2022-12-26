//import { openModal} from '/.event.js';
let clicked = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
const date = new Date();
const deleteEventModal = document.getElementById("deleteEventModal");
const eventTitleInput = document.getElementById("eventTitleInput");
const newEventModal = document.getElementById("modal");
const eventForDay = events.find(e => e.date === clicked);


function openModal(date){
    clicked = date;
   
  if (eventForDay) {
    document.getElementById("eventText").innerText = eventForDay.title;
    deleteEventModal.style.display = "block";
  } else {
    newEventModal.style.display = "block";
  }
  }

function init () {
    date.setDate(1);

const indexFirstDay = date.getDay();

const indexLastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();

const monthDays = document.querySelector(".days");



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
console.log(currentMonth);

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
        days += `<div class="thisMonthDays" id="today">${i}</div>`;
        if(eventForDay) {
            const eventDiv = document.createElement("div");
            eventDiv.classList.add("event");
            eventDiv.innerText = eventForDay.title;
            monthDays.appendChild(eventDiv);   
        }
       
    }else{
   
    days+=`<div class="thisMonthDays" id="${i}">${i}</div>`; 

    monthDays.innerHTML= days;
    }
    monthDays.addEventListener("click", () => openModal(days));
}

    //Days of next Month
    for(let j = 1; j <= nextDays; j++) {
        days += `<div class="next-date">${j}</div>`;
        monthDays.innerHTML = days;
    }
    const thisMonthDaysElements = document.getElementsByClassName("thisMonthDays");

    for (let i = 0; i < thisMonthDaysElements.length; i++) {
      thisMonthDaysElements[i].addEventListener("click", (event) => {
        // Your event listener code goes here
        const clickedElement = event.target;
        const date = clickedElement.innerText;
        openModal(date);
      });
    }    
   

};

    //Button prev Month
    document.getElementById("prevMonth").addEventListener("click", () => {
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
        if (date.getMonth() === 12) {
            date.setFullYear(date.getFullYear() + 1);
            date.setMonth(0);
          } else {
            date.setMonth(date.getMonth() + 1);
          }
        init();
    });
    function closeModal() {
    
      newEventModal.style.display = "none";
      deleteEventModal.style.display = "none";
      eventTitleInput.value = "";
      clicked = null;
      load();
  }
  
  function saveEvent() {
      if (eventTitleInput.value) {
          events.push({
              date: clicked,
              title: eventTitleInput.value,
          });
  
      localStorage.setItem("events", JSON.stringify(events));
      
      closeModal();
      
  }
  }
  
  function deleteEvent() {
      
      events = events.filter(e => e.date !== clicked);
      
      localStorage.setItem("events", JSON.stringify(events));
      closeModal();
  }
    function initButtons () {
    
      document.getElementById("save-button").addEventListener("click", saveEvent);
      document.getElementById("cancel-button").addEventListener("click", closeModal);
  
      document.getElementById("deleteButton").addEventListener("click", deleteEvent);
      document.getElementById("closeButton").addEventListener("click", closeModal);
  }
initButtons();
init();