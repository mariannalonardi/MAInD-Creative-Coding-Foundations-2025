const MY_API_KEY= ''

const API_URL = "https://api.openweathermap.org/data/2.5/forecast?lat=45.8701&lon=8.978&units=metric&appid=" + MY_API_KEY

fetch(API_URL)
  .then(response => response.json()) 
  .then (data => displayData(data))
  .catch(error => displayError(error));

function displayData (data){
    console.log(data)

    const FORECAST= data.list; 
    console.log(FORECAST)

    for (let item of FORECAST){
        const DATE_TIME= item.dt_txt; 
        const DATE= DATE_TIME.substring(0,10); 
        const TIME= DATE_TIME.substring(11,13);
        const TEMP= item.main.temp; 
        console.log(DATE, TIME, TEMP)
    }

}

function displayError (error){
    console.log(error)
}
  
