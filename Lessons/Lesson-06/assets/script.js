const CONTAINER= document.getElementById('container');
const MY_API_KEY= ''

const API_URL = "https://api.openweathermap.org/data/2.5/forecast?lat=45.8701&lon=8.978&units=metric&appid=" + MY_API_KEY

fetch(API_URL)
  .then(response => response.json()) 
  .then (data => displayData(data))
  .catch(error => displayError(error));

function displayData (data){
    console.log(data)

    const weatherData= data.list; 
    console.log(weatherData)

    for (let item of weatherData){
        const temperature= item.main.temp; 
        const tempFix= (temperature + 2) * 30; 
        const time= item.dt_txt.substring(0, 16);
        const listItem= document.createElement('li');
        listItem.textContent= `${time}: ${temperature}°`;

        let bgColor= tempToHSL(temperature);
        //if (temperature<=0) {
            //bgColor='blue'
        //}

        const tempBar= document.createElement('div');
        tempBar.classList.add('bar');
        tempBar.style.width= `${tempFix}px`;
        tempBar.style.backgroundColor= bgColor;
        
        listItem.appendChild(tempBar);
        CONTAINER.appendChild(listItem);
    }

}

function displayError (error){
    console.log(error);
}
  
function tempToHSL(temp, minTemp=-5, maxTemp= 30){
    temp= Math.max(minTemp, Math.min(maxTemp, temp))
    const hue= ((maxTemp-temp)/(maxTemp-minTemp))*240;
    return `hsl(${hue}, 80%, 50% )`
}

