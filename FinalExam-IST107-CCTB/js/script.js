/*
# This project is based on a public project but has been modified 
# according to the requirements of the IST 107 Course.
# Instructor: Washington Valencia
# Institution: CCTB College
*/

document.addEventListener("DOMContentLoaded", () => {
    // Array of colors for background change
    const colors = ['#F0E68C', '#FFDAB9', '#FFE4B5', '#D8BFD8', '#B0E0E6', '#AFEEEE', '#E0FFFF', '#98FB98', '#FFDEAD', '#F5DEB3'];

    let index = 0;

    // Function to change background color with a gradient effect
    const changeBackgroundColor = () => {
        document.body.style.backgroundColor = colors[index];
        index = (index + 1) % colors.length; // Loop back to the start
    };

    // Change color every 2 seconds with a smooth transition
    setInterval(changeBackgroundColor, 2000);
});

let addButton = document.getElementById("addTask");
let askButton = document.getElementById("askUser");
let input = document.getElementById("userInput");
let ul = document.querySelector("ul");
let items = document.getElementsByTagName("li");

function inputLength() {
    return input.value.length;
}

function listLength() {
    return items.length;
}

function createListElement(task) {
    let li = document.createElement("li"); // creates an element "li"
    li.appendChild(document.createTextNode(task)); //makes text from input field the li text
    ul.appendChild(li); //adds li to ul
    input.value = ""; //Reset text input field

    //START STRIKETHROUGH
    // because it's in the function, it only adds it for new items
    function crossOut() {
        li.classList.toggle("done");
    }

    li.addEventListener("click", crossOut);
    //END STRIKETHROUGH

    // START ADD DELETE BUTTON
    let dBtn = document.createElement("button");
    dBtn.appendChild(document.createTextNode("X"));
    dBtn.addEventListener("click", function() {
        ul.removeChild(li);
    });
    li.appendChild(dBtn);
}

function taskExists(task) {
    for (let i = 0; i < items.length; i++) {
        if (items[i].firstChild.textContent === task) {
            return true;
        }
    }
    return false;
}

function addListAfterClick() {
    let task = input.value.trim();
    if (inputLength() > 0 && !taskExists(task)) { // makes sure that an empty input field doesn't create a li and checks for duplicates
        createListElement(task);
    } else if (taskExists(task)) {
        alert('This task already exists. Please enter a new task.');
    }
}

function addListAfterKeypress(event) {
    let task = input.value.trim();
    if (inputLength() > 0 && event.which === 13 && !taskExists(task)) { // this now looks to see if you hit "enter"/"return" and checks for duplicates
        // the 13 is the enter key's keycode, this could also be display by event.keyCode === 13
        createListElement(task);
    } else if (taskExists(task)) {
        alert('This task already exists. Please enter a new task.');
    }
}

function askUser() {
    while (true) {
        let task = prompt('Enter a new task (or type "exit" to stop):');
        if (task === null || task.trim().toLowerCase() === 'exit') {
            break; // El usuario canceló la entrada o escribió "exit"
        } else if (task.trim() === '') {
            alert('Task cannot be empty. Please enter a valid task.');
        } else if (taskExists(task)) {
            alert('This task already exists. Please enter a new task.');
        } else {
            createListElement(task);
        }
    }
}

addButton.addEventListener("click", addListAfterClick);
input.addEventListener("keypress", addListAfterKeypress);

// Add event listener for "Ask User" button
askButton.addEventListener("click", askUser);
