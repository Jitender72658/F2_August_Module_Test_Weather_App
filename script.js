
const secondPageButton = document.getElementById("goToSecondPageBtn");
function loadData(){
    window.location.href = "./secondPage.html";
    displayData();
}

const longi= document.getElementById("longitudeData");
const lati = document.getElementById("latitudeData");
const apiKey = '98fc1d63fdc4dcf6b9c074cce4e64803';
let apiUrl;
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
       let latitude = position.coords.latitude;
       let longitude = position.coords.longitude;
       longi.innerText= `Longitude: ${longitude}`;
       lati.innerText = `Latitude: ${latitude}`;
        const mapLocation = document.getElementById("locationMap");
        mapLocation.src = `https://maps.google.com/maps?q=${latitude}, ${longitude}&z=15&output=embed`;
        apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
        displayData();
    }, function(error) {
        console.error("Error getting geolocation: " + error.message);
    });
} else {
    // Geolocation is not available
    console.error("Geolocation is not available in this browser.");
}

async function displayData() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch data (${response.status} ${response.statusText})`);
        }
        
        const data = await response.json();
        modifyDetails(data);
        
        console.log("Data displayed successfully");
    } catch (error) {
        console.error("An error occurred:", error);
    }
}
function modifyDetails(data){
    const locationElement = document.getElementById("location");
    locationElement.innerText = `Location: ${data.name}`;

    const windSpeed = document.getElementById("windSpeed");
    windSpeed.innerText = `Wind Speed: ${data.wind.speed}`;

    const humidity = document.getElementById("humidity");
    humidity.innerText = `Humidity: ${data.main.humidity}`;

    const timeZone = document.getElementById("timeZone");
    timeZone.innerText = `Time Zone: ${data.timezone}`;

    const pressure = document.getElementById("pressure");
    pressure.innerText = `Pressure: ${data.main.pressure}`;
 
    const  windDirection = document.getElementById("windDirection");
    windDirection.innerText = `Wind Direction: ${data.wind.deg}`; 

    // const uvIndex = document.getElementById("uvIndex");
    // uvIndex.innerText = `UV Index: ${data.current.temp}`;

    const  feelsLike= document.getElementById("feelsLike");
    feelsLike.innerText = `Feels like: ${data.main.feels_like}`;

}
