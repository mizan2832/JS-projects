const API_KEY = "ed26bfc5d42fd86e72deeb1a052b15d9";

document.getElementById("districtSelect").addEventListener("change",function () {
    const city = this.value;
    if(!city) return;

    
    const dateTime = new Date();

    // Array of month names
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Format hours in 12-hour format with AM/PM
    let hours = dateTime.getHours();
    const minutes = dateTime.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // convert 0 to 12

    // Build formatted string
    const formatted = `${city} • ${months[dateTime.getMonth()]} ${dateTime.getDate()}, ${dateTime.getFullYear()} • ${hours}:${minutes} ${ampm}`;

    document.querySelector(".datetime").innerHTML = formatted;

    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city},BD&units=metric&appid=${API_KEY}`;
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {

            document.querySelector(".temperature").innerHTML =
                `${Math.round(data.main.temp)}<span>°C</span>`;

            document.querySelector(".condition").innerText =
                data.weather[0].description;
                
            
        })

})