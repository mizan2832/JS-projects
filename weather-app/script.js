const API_KEY = "ed26bfc5d42fd86e72deeb1a052b15d9";

document.getElementById("districtSelect").addEventListener("change",function () {
    const city = this.value;
    if(!city) return;

    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city},BD&units=metric&appid=${API_KEY}`;
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            
        })

})