const url = "https://csunix.mohawkcollege.ca/~adams/10259/a6_responder.php";
let first = document.querySelector("#first");
const contentDiv = document.querySelector("#content");
const content2Div = document.querySelector("#content2");
const button1 = document.querySelector("#b1");
const button2 = document.querySelector("#b2");
const button3 = document.querySelector("#b3");

button1.addEventListener("click", function() { Button1(); });

function Button1() {
    fetch(url, { credentials: 'include' })
        .then(response => response.text())
        .then(Button1Success);
}

function Button1Success(text) {
    first.innerHTML = "<h1>" + text + " 000898120 </h1>";
}

button2.addEventListener("click", Button2);

function Button2() {
    const choiceSelector = document.querySelector("input[name='choice']:checked").value;
    console.log("SelectedChoice is ", choiceSelector);
    const fetchUrl = url + "?choice=" + choiceSelector;
    fetch(fetchUrl)
        .then(response => response.json())
        .then(Button2Success);
}

function Button2Success(data) {
    contentDiv.innerHTML = "";
    for (let e = 0; e < data.length; e++) {
        const info = data[e];
        const div = document.createElement("div");

        const title = document.createElement("h2");
        title.innerHTML = info.name;
        console.log(title);
        div.appendChild(title);

        const photo = document.createElement("img");
        photo.src = info.url;
        photo.style.width = "300px";
        div.appendChild(photo);

        const description = document.createElement("p");
        description.innerHTML = info.series;
        div.appendChild(description);

        contentDiv.appendChild(div);
    }
}

button3.addEventListener("click", Button3);

function Button3() {
    const choiceSelector = document.querySelector("input[name='choice']:checked").value;
    console.log("SelectedChoice is ", choiceSelector);
    const fetchUrl = url + "?choice=" + choiceSelector;
    fetch(fetchUrl)
        .then(response => response.json())
        .then(Button3Success);
}

function Button3Success(data) {
    content2Div.innerHTML = "";

    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    Object.keys(data[0]).forEach(key => {
        const th = document.createElement('th');
        th.textContent = key;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    data.forEach(item => {
        const row = document.createElement('tr');
        Object.values(item).forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            row.appendChild(td);
        });
        table.appendChild(row);
    });

    content2Div.appendChild(table);

    const choiceSelector = document.querySelector("input[name='choice']:checked").value;
    let images = [];
    if (choiceSelector === 'mario') {
        images = [
            'images/mario1.jpg',
            'images/mario2.jpg',
            'images/mario3.jpg'
        ];
    } else if (choiceSelector === 'starwars') {
        images = [
            'images/starwars1.jpg',
            'images/starwars2.jpg',
            'images/starwars3.jpg'
        ];
    }

    const imageGallery = document.getElementById('image-gallery');
    imageGallery.innerHTML = '';
    images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = choiceSelector;
        img.className = 'character-image';
        imageGallery.appendChild(img);
    });

    const copyright = document.createElement('p');
    if (choiceSelector === 'mario') {
        copyright.textContent = 'Game trademarks and copyrights are properties of their respective owners. Nintendo properties are trademarks of Nintendo. © 2019 Nintendo.';
    } else if (choiceSelector === 'starwars') {
        copyright.textContent = 'Star Wars is a registered trademark of Lucasfilm Ltd. © 2024 Lucasfilm Ltd. All rights reserved.';
    }
    content2Div.appendChild(copyright);
}
