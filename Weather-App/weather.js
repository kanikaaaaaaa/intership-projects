
const getDataForm = document.getElementById('getData');
const temp = document.getElementById('temp');
const isDayOrNight = document.getElementById('isDayorNight');
const informationDiv = document.getElementById('information');
const longitudeInput = document.getElementById('long');
const latitudeInput = document.getElementById('lat');

// create elements
const latitude = document.createElement('p');
const longitude = document.createElement('p');
const apparentTemp = document.createElement('p');
const wind = document.createElement('p');
const rain = document.createElement('p');

// append elements
informationDiv.appendChild(latitude);
informationDiv.appendChild(longitude);
informationDiv.appendChild(apparentTemp);
informationDiv.appendChild(wind);
informationDiv.appendChild(rain);

getDataForm.addEventListener("submit", async(e)=>{
    e.preventDefault();
    console.log('submit');
    
    let lat = latitudeInput.ariaValueMax;
    let long = longitudeInput.ariaValueMax;

    const weatherData = await getWeatherData(long,lat)

    // update innerText

    let dayOrNight = (weatherData.current.is_day === 1)? "Day":"Night";
    temp.innerText = `Temp: ${weatherData.current.temperature_2m} C`;
    apparentTemp.innerText = `Apparent Temperature: ${weatherData.current.apparent_temperature} C`;
    isDayOrNight.innerText = `Is Day or Night: ${dayOrNight}`;
    rain.innerText = `Rain: ${weatherData.current.rain} mm`;
    wind.innerText = `Wind: ${weatherData.current.wind_speed_10m} km/h`;

    console.log(weatherData);
    
});

async function getWeatherData(long,lat){
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,apparent_temperature,is_day,rain,wind_speed_10m`
    const options = {
        method:"GET",
        // headers:{
        //     "api-key":"isivhishvbsi"
        // }
    }


    
    try{
    const response = await fetch(url,options)
    const data = await response.json()
    return data
    }
    catch(error){
        console.log(error)
    }
    
}

// async function getWeatherData(long,lat){
//     const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`);
//     const data = await response.json();
//     return data;
// };
