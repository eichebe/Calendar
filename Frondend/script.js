let clicked = null;
let nav = 0;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
//const date = new Date();
const deleteEventModal = document.getElementById("deleteEventModal");
const eventTitleInput = document.getElementById("event-title");
const newEventModal = document.getElementById("modal");
const calendar = document.getElementById("calendar");
const eventForDay = events.find(e => e.date === clicked);
const dt = new Date();

function openModal(date){
  clicked = date;
const eventForDay = events.find(e => e.date === clicked);
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
}}

async function init () {
  const events = await db.collection('events').find().toArray();
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
    
const lastDay = new Date(dt.getFullYear(), dt.getMonth() + 1, 0).getDate();
const prevLastDay = new Date(dt.getFullYear(), dt.getMonth(), 0).getDate();
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
    function closeModal() {
    
      newEventModal.style.display = "none";
      deleteEventModal.style.display = "none";
      eventTitleInput.value = "";
      clicked = null;
      calendar.innerHTML = '';
      init();
  }
  async function saveEvent() {
    
    // Get the event title and date
    const title = eventTitleInput.value;
    const date = clicked;
  
    try {
      // Insert the event into the database
      await db.collection('events').insertOne({ title, date });
    } catch (error) {
      console.error(error);
      // If there is an error inserting the event into the database,
      // save the event to local storage instead
      if (eventTitleInput.value) {
        events.push({
          date: clicked,
          title: eventTitleInput.value,
        });
  
        localStorage.setItem("events", JSON.stringify(events));
      }
    }
  
    closeModal();
  }

  async function deleteEvent() {
    try {
      // Remove the event from the database
      await db.collection('events').deleteOne({ date: clicked });
    } catch (error) {
      // If there was an error accessing the database, use local storage as a fallback
      events = events.filter(e => e.date !== clicked);
      localStorage.setItem("events", JSON.stringify(events));
    }
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