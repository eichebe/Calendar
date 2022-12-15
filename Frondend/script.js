const date = new Date();

const init = () => {
    date.setDate(1);

const monthDays = document.querySelector(".days");

const indexFirstDay = date.getDay();

const indexLastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();



const months = [
    "January",
    "Febuary",
    "March",
    "April",
    "Mai",
    "June",
    "July",
    "August",
    "September",
    "Oktober",
    "November",
    "December",
];

const currentMonth = date.getMonth();

const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
const firstDay = date.getDay();

const nextDays = 7 - indexLastDay -1 ;


document.getElementById("currentMonthDate").innerText = months[date.getMonth()];
document.getElementById("dateToday").innerText = new Date().toDateString();

let days = "";

//Prev Month Days
for(let x = indexFirstDay; x > 0; x--){
    days+=`<div class"prev-date">${prevLastDay - x}</div>`
}

//CUrrent Month Days
for (let i = 1; i <= lastDay; i++){
    //Today
    if( i === new Date().getDate() && date.getMonth() === new Date().getMonth()){
        days += `<div class="today">${i}</div>`;
    }else{
        days+=`<div>${i}</div>`; 
        monthDays.innerHTML = days;
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
        init();
    });
    
    //Button next Month
    document.getElementById("nextMonth").addEventListener("click", () => {
        date.setMonth(date.getMonth() + 1);
        init();
    });


init();