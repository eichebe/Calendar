const events = [
    {
      title: 'Event 1',
      description: 'This is event 1',
      start: new Date(2022, 2, 5),
      end: new Date(2022, 2, 10)
    },
    {
      title: 'Event 2',
      description: 'This is event 2',
      start: new Date(2022, 2, 15),
      end: new Date(2022, 2, 20)
    },
    // Add more events here
  ];
  
  // Inside the init function
  for (let i = 1; i <= lastDay; i++) {
    // Check if there are any events on this day
    const eventOnThisDay = events.find(event => {
      return i >= event.start.getDate() && i <= event.end.getDate();
    });
    
    // Add the event class if there is an event on this day
    if (eventOnThisDay) {
      days += `<div class="event">${i}</div>`;
    } else {
      //Today
      if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
        days += `<div class="today">${i}</div>`;
      } else {
        days += `<div>${i}</div>`; 
        monthDays.innerHTML = days;
      }
    }
  }
  