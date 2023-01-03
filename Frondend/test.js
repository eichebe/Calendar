//Prev Month Days
for(let x = indexFirstDay; x > 0; x--){
    days+=`<div class="prev-date">${prevLastDay - x +1}</div>`
}

//Current Month Days
for (let i = 1; i <= lastDay; i++) {
  const eventForDay = events.find(e => e.date === clicked);
  let eventDiv = null;
  if (eventForDay) {
    eventDiv = document.createElement("div");
    eventDiv.classList.add("event");
    eventDiv.innerText = eventForDay.title;
  }

  if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
    days += `<div class="thisMonthDays" id="today">${i}</div>`;
  } else {
    days += `<div class="thisMonthDays" id="${i}">${i}</div>`;
  }

  if (eventDiv) {
    monthDays.appendChild(eventDiv);
  }
}
//Days of next Month
for(let j = 1; j <= nextDays; j++) {
  days += `<div class="next-date">${j}</div>`;
  
}
    
    monthDays.innerHTML = days;
    const thisMonthDaysElements = document.getElementsByClassName("thisMonthDays");

    for (let i = 0; i < thisMonthDaysElements.length; i++) {
      thisMonthDaysElements[i].addEventListener("click", (event) => {
        // Your event listener code goes here
        
        const clickedElement = event.target;
        let date = clickedElement.innerText;
        date = date + "/" + (currentMonth +1) + "/" + currentYear;
        console.log(date);
        openModal(date);
        
        
      
      });
        if (eventForDay) {
          const eventDiv = document.createElement("div");
          eventDiv.classList.add("event");
          eventDiv.innerText = eventForDay.title;
          thisMonthDaysElements[i].appendChild(eventDiv);
        }
    }
  
   


    for(let i = 1; i <= paddingDays + daysInMonth; i++) {
      const daySquare = document.createElement("div");
      daySquare.classList.add("day");
    
      const dayString = `${month + 1}/${i - paddingDays}/${year}`;
      console.log(padd);
      if(i > paddingDays) {
          daySquare.innerText = i - paddingDays;
          const eventForDay = events.find(e => e.date === dayString);
          //highlight current day nav = 0 current month
          if (i - paddingDays === day){
               daySquare.id = "today";
          }
          
          if (eventForDay) {
              const eventDiv = document.createElement("div");
              eventDiv.classList.add("...
    }
    
    let nextMonthPadding = 7 - (paddingDays + daysInMonth) % 7;
    if (nextMonthPadding < 7) {
      for (let i = 1; i <= nextMonthPadding; i++) {
        const daySquare = document.createElement("div");
        daySquare.classList.add("day");
        daySquare.innerText = new Date(year, month, 0).getDate() - (nextMonthPadding - i);
        calendar.appendChild(daySquare);
      }
    }