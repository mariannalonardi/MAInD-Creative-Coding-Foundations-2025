const CONTAINER= document.getElementById('container')

fetch('/assets/data/MOCK_DATA.json') // get the data from an external source
  .then(response => response.json()) // parse/convert the data in JavaScript format
  .then(data => displayData(data)) // dispay the data in the console
  .catch(error => displayError('Error:', error)); // display an error if the data cannot be loaded

function displayData(data){
    console.log(data)

    const FILTERED= data.filter ((obj) => obj.age >= 20 && obj.age<=39)
    const SORT= FILTERED.sort((a,b) => a.age-b.age)

    for (let person of SORT){
        const PERSON_BOX= document.createElement('li'); 
        const PERSON_INFO= document.createElement('div');
        PERSON_INFO.textContent= `${person.first_name} ${person.last_name}, ${person.gender}, ${person.age}`;
        const PERSON_BAR= document.createElement('div');
        const BAR_WIDTH= person.age*5; 
        PERSON_BAR.style.width= `${BAR_WIDTH}px`;
        PERSON_BAR.className= 'bar'; 
        if (person.gender=="Female") {
            BAR_COLOR= 'pink';
        } else if (person.gender=="Male") {
            BAR_COLOR= 'blue';
        } else {
            BAR_COLOR= 'orange';
        }
        PERSON_BAR.style.backgroundColor= BAR_COLOR;
        PERSON_BOX.appendChild(PERSON_INFO);
        PERSON_BOX.appendChild(PERSON_BAR);
        CONTAINER.appendChild(PERSON_BOX);
    }
}

function displayError(error){
    console.log(error)
}
