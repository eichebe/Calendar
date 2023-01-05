let clicked = null;
let nav = 0;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
//const date = new Date();
const deleteEventModal = document.getElementById("deleteEventModal");
const eventTitleInput = document.getElementById("event-title");
const newEventModal = document.getElementById("modal");
const calendar = document.getElementById("calendar");
//const eventForDay = events.find(e => e.date === clicked);
const dt = new Date();
document.getElementById("save-button").addEventListener("click", function () {
  const title = document.getElementById("event-title").value;
  // Add the new event to the events array
  //events.push({ title: title, date: clicked });
  // Store the updated events array in local storage
  //localStorage.setItem("events", JSON.stringify(events));
  // Make a POST request to the server's /events endpoint to create a new event in the database
fetch('/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title: title, date: clicked })
})
  .then(response => response.json())
  .then(event => {
    // If the request was successful, update the events array and local storage
    events.push(event);
    localStorage.setItem('events', JSON.stringify(events));
})
  .catch(error => {
    console.error(error);
});
  // Close the modal
  newEventModal.style.display = "none";
  // Rerender the calendar
  init();
});

function openModal(date){
  clicked = date;
  //const eventForDay = events.find(e => e.date === clicked);
  // Make a GET request to the server's /events endpoint to retrieve a list of events from the database
  fetch('/events', {
method: 'GET'
})
.then(response => response.json())
.then(events => {
// Find the event for the clicked date in the list of events retrieved from the database
const eventForDay = events.find(e => e.date === clicked);
console.log(eventForDay);
if (eventForDay) {
if(newEventModal.style.display = "block"){
newEventModal.style.display = "none"
}
document.getElementById("eventText").innerText = eventForDay.title;
deleteEventModal.style.display = "block";
} else {
if(deleteEventModal.style.display = "block"){
deleteEventModal.style.display = "none"
}
newEventModal.style.display = "block";
}
})
.catch(error => {
console.error(error);
});
}
function init () {
  const dt = new Date();  
  fetch('/events', {
    method: 'GET'
  })
  .then(response => response.json())
  .then(events => {
    // Update the calendar with the retrieved events
    updateCalendar(events);
  })
  .catch(error => {
    console.error(error);
  });

function updateCalendar(events) {
  const dt = new Date();  
  //date.setDate(1);
  if (nav !==0) {
    //selection for Buttons Month + nav
    dt.setMonth;
    dt.setDate(1);
    dt.setMonth(new Date().getMonth() + nav);
  }
  
  

const day = dt.getDate();
const month = dt.getMonth();
const year = dt.getFullYear();
const firstDayOfMonth = new Date(year, month, 1);
const eventForDay = events.find(e => e.date === clicked);
//const indexFirstDay = date.getDay();
const dateString = firstDayOfMonth.toLocaleDateString("de-DE", {
  weekday: 'long',
  year: 'numeric',
  month: 'numeric',
  day: "numeric",

});

const indexLastDay = new Date(dt.getFullYear(), dt.getMonth() + 1, 0).getDay();

//const monthDays = document.querySelector(".days");

const weekdays = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];

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
    
//const currentMonth = date.getMonth();
//const currentYear = date.getFullYear();
const lastDay = new Date(dt.getFullYear(), dt.getMonth() + 1, 0).getDate();
const prevLastDay = new Date(dt.getFullYear(), dt.getMonth(), 0).getDate();
//const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
const daysInMonth = new Date(year, month + 1, 0).getDate();


const padd = weekdays.indexOf(dateString.split(', ') [0]);
const paddingDays = padd;

const emptyCells = 7 - (indexLastDay + lastDay) % 7;
const nextDays = emptyCells > 0 ? emptyCells : 7;

document.getElementById("currentYear").innerText = dt.getFullYear();
document.getElementById("currentMonthDate").innerText = 
        `${dt.toLocaleDateString("en-us", { month: "long"})} `;
document.getElementById("dateToday").innerText = new Date().toDateString();


let days = "";
//let eventDiv = null;
let nextMonthPadding = 7 - (paddingDays + daysInMonth) % 7;
let count = paddingDays; 
for(let i = 1; i <= paddingDays + daysInMonth; i++) {
  const daySquare = document.createElement("div");
  daySquare.classList.add("day");
  const dayString = `${month + 1}/${i - paddingDays}/${year}`;
  console.log(padd);
  if(i > paddingDays) {
      daySquare.innerText = i - paddingDays;
      const eventForDay = events.find(e => e.date === dayString);
      //highlight current day nav = 0 current month
      if (i - paddingDays === day && nav === 0){
           daySquare.id = "today";
      }
      
      
      count += daysInMonth;
      if (eventForDay) {  
        const eventDiv = document.createElement("div");
          eventDiv.classList.add("event");
          eventDiv.innerText = eventForDay.title;
          daySquare.appendChild(eventDiv);
      }
      daySquare.addEventListener("click", () => openModal(dayString));
  }else{
    daySquare.innerText = prevLastDay - count + 1;  
    daySquare.classList.add("prevDate");
    count --;
  }
  // Generate padding days for next month

    //dom append child in calender
    calendar.appendChild(daySquare);

}
if(i = paddingDays + daysInMonth){
  for (let i = 1; i <= nextMonthPadding; i++) {
    const day = document.createElement("div");
    day.classList.add("day");
    day.classList.add("nextDate");
    day.innerText = i;
    calendar.appendChild(day);
  }
}
}
}


    
    function closeModal() {
    
      newEventModal.style.display = "none";
      deleteEventModal.style.display = "none";
      eventTitleInput.value = "";
      clicked = null;
      calendar.innerHTML = '';
      init();
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
      document.getElementById("nextMonth").addEventListener("click", () => {
        nav++;
        calendar.innerHTML = '';
        init();
    });
    
    document.getElementById("prevMonth").addEventListener("click", () => {
        nav--;
        calendar.innerHTML = '';
        init();
    });
      document.getElementById("save-button").addEventListener("click", saveEvent);
      document.getElementById("cancel-button").addEventListener("click", closeModal);
  
      document.getElementById("deleteButton").addEventListener("click", deleteEvent);
      document.getElementById("closeButton").addEventListener("click", closeModal);
  }
initButtons();
init();
fetch('/events', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(event)
})
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      localStorage.setItem('events', JSON.stringify([...events, event]));
      return event;
    }
  })
  .then(event => {
    // do something with the inserted event here
  })
  .catch(error => {
    console.error(error);
    localStorage.setItem('events', JSON.stringify([...events, event]));
    // do something with the inserted event here
  });