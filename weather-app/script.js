const API_KEY = "ed26bfc5d42fd86e72deeb1a052b15d9";

document.getElementById("districtSelect").addEventListener("change",function () {
    const city = this.value;
    if(!city) return;
    let dateTime = new Date();
    document.querySelector(".datetime").innerHTML = `${city} . ${dateTime.getMonth()} ${dateTime.getDay()},${dateTime.getFullYear()}`;

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