let clicked = null;
let nav = 0;
let events = [];
//let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
const deleteEventModal = document.getElementById("deleteEventModal");
const eventTitleInput = document.getElementById("event-title");
const newEventModal = document.getElementById("modal");
const calendar = document.getElementById("calendar");
const eventForDay = events.find(e => e.date === clicked);
const dt = new Date();
let dateShownNow;

async function fetchEvents() {
  const day = dateShownNow.getDate();
  const month = dateShownNow.getMonth() + 1;
  const year = dateShownNow.getFullYear();

  try {
    let response = await fetch(`http://127.0.0.1:3000/getEventsForThisMonth/${month}/${day}/${year}`);
    if (response.ok) {
      let events = await response.json();
      for (let i = 0; i < events.length; i++) {
        let event = events[i];
        let eventDay = event.date;
        let eventSplit = eventDay.split('/');
        let eventDate = new Date(event.date);
        if (eventDate.getMonth() === dateShownNow.getMonth() && eventDate.getFullYear() === dateShownNow.getFullYear()) {
          const eventDiv = document.createElement("div");
          eventDiv.classList.add("event");
          eventDiv.innerText = event.title;
          console.log(eventSplit[1]);
          let dayElement = document.getElementById(`${eventSplit[1]}`);
          dayElement.appendChild(eventDiv);
          
        }
      }
      return events;
    } else {
      console.log("Error: ", response.statusText);
    }
  } catch (err) {
    console.error(err);
  }
}

function openModal(date){
  clicked = date;
  const splitDate = date.split('/');
  dateShownNow = new Date(splitDate[2],splitDate[0] - 1,splitDate[1]);
  console.log(dateShownNow);
  //const eventForDay = events.find(e => e.date === clicked);
  
    if (eventForDay) {
      if(newEventModal.style.display = "block"){
        newEventModal.style.display = "none"
        }
        document.getElementById("eventText").innerText = eventForDay.title;
        deleteEventModal.style.display = "block";
      }else{
    
        if(deleteEventModal.style.display = "block"){
        deleteEventModal.style.display = "none"
        }
        newEventModal.style.display = "block";
    }
}

async function init () {
  const dt = new Date(); 
  
  if (nav !==0) {
    //selection for Buttons Month + nav
    dt.setMonth;
    dt.setDate(1);
    dt.setMonth(new Date().getMonth() + nav);
  }
const day = dt.getDate();
const month = dt.getMonth();
const year = dt.getFullYear();
dateShownNow = dt;
const firstDayOfMonth = new Date(year, month, 1);
const dateString = firstDayOfMonth.toLocaleDateString("de-DE", {
  weekday: 'long',
  year: 'numeric',
  month: 'numeric',
  day: "numeric",

});


const weekdays = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];

    
const prevLastDay = new Date(dt.getFullYear(), dt.getMonth(), 0).getDate();
const daysInMonth = new Date(year, month + 1, 0).getDate();


const padd = weekdays.indexOf(dateString.split(', ') [0]);
const paddingDays = padd;

document.getElementById("currentYear").innerText = dt.getFullYear();
document.getElementById("currentMonthDate").innerText = 
        `${dt.toLocaleDateString("en-us", { month: "long"})} `;
document.getElementById("dateToday").innerText = new Date().toDateString();


let nextMonthPadding = 7 - (paddingDays + daysInMonth) % 7;
let count = paddingDays; 
for(let i = 1; i <= paddingDays + daysInMonth; i++) {
  const daySquare = document.createElement("div");
  daySquare.classList.add("day");
  daySquare.addEventListener('click', function() {
    daySquare.classList.add('clicked');
    });
  const dayString = `${month + 1}/${i - paddingDays}/${year}`;
  if(i > paddingDays) {
      daySquare.id = `${i - paddingDays}`
      daySquare.innerText = i - paddingDays;
      //const eventForDay = events.find(e => e.date === dayString);
      //highlight current day nav = 0 current month
      if (i - paddingDays === day && nav === 0){
          daySquare.classList.add("today");
          daySquare.id = `${i - paddingDays}`;
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
let i =1;
if(i = paddingDays + daysInMonth){
  for (let i = 1; i <= nextMonthPadding; i++) {
    const day = document.createElement("div");
    day.classList.add("day");
    day.classList.add("nextDate");
    day.innerText = i;
    calendar.appendChild(day);
  }
}
events = await fetchEvents();
} 
    function closeModal() {
    
      newEventModal.style.display = "none";
      deleteEventModal.style.display = "none";
      eventTitleInput.value = "";
      clicked = null;
      calendar.innerHTML = '';
      init();
  }
  /*async function saveEvent() {
    console.log(clicked);
    // Get the event title and date
      if (eventTitleInput.value) {
        events.push({
          date: clicked,
          title: eventTitleInput.value,
        });
  
        localStorage.setItem("events", JSON.stringify(events));
      }
    
  
    closeModal();
  }*/
  
  async function saveEvent() {
    const dayid = clicked.split('/');
    const dayidstring = dayid[1];
    console.log(clicked);
    // Get the event title and date
    if (eventTitleInput.value) {
      let newEvent = {
        date: clicked,
        title: eventTitleInput.value,
      };
      try {
        // send the event to the server
        let response = await fetch("http://127.0.0.1:3000/setItem", {
          method: "POST",
          headers: {
            "Content-Type": "text/plain"
          },
          body: JSON.stringify(newEvent)
        });
        if (response.ok) {
          console.log("Event saved to the database");
        } else {
          console.log("Error: ", response.statusText);
        }
      } catch (err) {
        console.error(err);
      }
    }
    const eventDiv = document.createElement("div");
          eventDiv.classList.add("event");
          eventDiv.innerText = eventTitleInput.value;
          document.getElementById(dayidstring).appendChild(eventDiv);
    closeModal();
  }

  async function deleteEvent(id) {
    try {
      let response = await fetch(`http://127.0.0.1:3000/removeItem?id=${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        // deletion was successful
        console.log("Event deleted successfully!");
        // update the frontend to reflect the deleted event
      } else {
        console.log("Error deleting event: ", response.statusText);
      }
    } catch (err) {
      console.error(err);
    }
  }

  /*async function deleteEvent() {
      events = events.filter(e => e.date !== clicked);
      localStorage.setItem("events", JSON.stringify(events));
    closeModal();
  }*/

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