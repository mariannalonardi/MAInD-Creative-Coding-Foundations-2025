const BUTTON = document.getElementById("button")

const ELEMENT = document.querySelector(".myclass")
const ELEMENTS = document.querySelectorAll(".myclass")

// add a paragraph on button click
BUTTON.addEventListener("click", () => {

    let BLOCK = document.createElement("p")
    BLOCK.textContent = "This is a new element!"
    BLOCK.classList.add('test')

    BLOCKS.appendChild(BLOCK) // append the element at the end
    BLOCKS.prepend(BLOCK) // append the element at the beginning
    
})