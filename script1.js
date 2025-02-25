document.addEventListener("DOMContentLoaded", () => {
    const breedInput = document.getElementById("breedInput");
    const breedList = document.getElementById("breedList");
    const showImagesButton = document.getElementById("showImages");
    const message = document.getElementById("message");
    const imageContainer = document.getElementById("imageContainer");

    let breeds = [];

    
    fetch("https://dog.ceo/api/breeds/list/all")
        .then(response => response.json())
        .then(data => {
            breeds = Object.keys(data.message);
            populateBreedList();
        });

    function populateBreedList() {
        breeds.forEach(breed => {
            let option = document.createElement("option");
            option.value = breed;
            breedList.appendChild(option);
        });
    }

    let imageInterval;

    
    showImagesButton.addEventListener("click", () => {
        let breed = breedInput.value.toLowerCase();

       
        if (breeds.includes(breed)) {
            message.textContent = "";
            imageContainer.innerHTML = "";

            if (imageInterval) clearInterval(imageInterval);

            function fetchDogImage() {
                fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
                    .then(response => response.json())
                    .then(data => {
                        imageContainer.innerHTML = `<img src="${data.message}" alt="${breed}">`;
                    });
            }

            fetchDogImage();
            imageInterval = setInterval(fetchDogImage, 5000);
        } else {
            message.textContent = "No such breed";
            message.style.color = "red";
            imageContainer.innerHTML = "";
        }
    });

   
    breedInput.addEventListener("input", () => {
        if (!breeds.includes(breedInput.value.toLowerCase())) {
            message.textContent = "Invalid breed, please select from the list.";
            message.style.color = "orange";
        } else {
            message.textContent = "";
        }
    });
});
