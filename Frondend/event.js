export function openModal(date){
  clicked = date;

  const eventForDay = events.find(e => e.date === clicked);

 
if (eventForDay) {
  document.getElementById("eventText").innerText = eventForDay.title;
  deleteEventModal.style.display = "block";
} else {
  newEventModal.style.display = "block";
}

backDrop.style.display = "block";
}