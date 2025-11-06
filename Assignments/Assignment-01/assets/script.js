let board = document.getElementById("board");
let addBtn = document.getElementById("add-btn");
let countrySelect = document.getElementById("country");
let sortBtn = document.getElementById("sort-btn");
let otherCountryInput = document.getElementById("other-country");

countrySelect.addEventListener("change", () => {
    if (countrySelect.value === "other") {
        otherCountryInput.style.display = "inline-block";
        otherCountryInput.focus();
    } else {
        otherCountryInput.style.display = "none";
        otherCountryInput.value = "";
    }
});

addBtn.addEventListener("click", () => {
    let desc = document.getElementById("photo-desc").value;
    let country = countrySelect.value;
    let photoInput = document.getElementById("upload-photo");

    if (country === "other") {
        country = otherCountryInput.value;
    }
    if (desc === "" && country === "" && photoInput.files.length === 0) {
        alert("Please insert a image, a description and choose a country");
        return;
    }

    let file = photoInput.files.item(0);
    if (!file) {
        alert("Please select a photo before adding.")
        return;
    }
    let reader = new FileReader();

    reader.addEventListener("load", () => {
        let card = document.createElement("div");
        card.className = "photo-card";
        let textsDiv = document.createElement("div");
        textsDiv.className = "texts";
        let img = document.createElement("img");
        img.src = reader.result;
        let pDesc = document.createElement("p");
        pDesc.textContent = desc;
        let pCountry = document.createElement("p");
        pCountry.className = "country";
        pCountry.innerHTML = "<strong>Country:</strong>" + country;
        let removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.className = "removeBtn";
        textsDiv.appendChild(pDesc);
        textsDiv.appendChild(pCountry);

        removeBtn.addEventListener("click", () => {
            card.remove();
        });

        card.appendChild(img);
        card.appendChild(textsDiv);
        card.appendChild(removeBtn);
        board.appendChild(card);

        document.getElementById("photo-desc").value = "";
        document.getElementById("upload-photo").value = "";
        countrySelect.value = "";
        otherCountryInput.value = "";
        otherCountryInput.style.display = "none";
    });
    reader.readAsDataURL(file);
});

let gridView = true;
sortBtn.addEventListener("click", () => {
    if (gridView) {
        board.classList.add("list-view");
        sortBtn.textContent = "Switch to grid view";
        gridView = false;
    } else {
        board.classList.remove("list-view");
        sortBtn.textContent = "Switch to list view";
        gridView = true;
    }
})

let sortSelect = document.getElementById("sort-select");

sortSelect.addEventListener("change", () => {
    if (board.children.length < 2) return;

    let changed = true;
    while (changed) {
        changed = false;
        let current = board.firstElementChild;

        while (current && current.nextElementSibling) {
            let countryA = current.querySelector(".country").textContent;
            let countryB = current.nextElementSibling.querySelector(".country").textContent;

            if ((sortSelect.value === "asc" && countryA > countryB) ||
                (sortSelect.value === "desc" && countryA < countryB)) {
                board.insertBefore(current.nextElementSibling, current);
                changed = true;
            } else {
                current = current.nextElementSibling;
            }
        }
    }
});