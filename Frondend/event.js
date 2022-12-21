// Define the modal function
let clicked = 0;
function openModal(date) {
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
  
  // Export the modal function
  export {openModal};

  function saveInput() {
    // Get the input data
    const inputData = {
      title: document.getElementById("inputTitle").value,
      description: document.getElementById("inputDescription").value,
    };
  
    // Convert the input data to a JSON string
    const inputDataString = JSON.stringify(inputData);
  
    // Save the JSON string to local storage
    localStorage.setItem("inputData", inputDataString);
  }

  export {saveInput};

  const inputDataString = localStorage.getItem("inputData");

  const inputData = JSON.parse(inputDataString);