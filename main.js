import { addBookToLibrary, displayBooks } from "./bookLogic.js";

// Variables
// Document Objects
const dialog = document.querySelector("dialog");
const newButton = document.querySelector(".new");
const closeButton = document.querySelector(".close");
const form = document.querySelector("form")

// Form Document Objects
const titleForm = document.querySelector("#title");
const authorForm = document.querySelector("#author");
const chaptersForm = document.querySelector("#chapters");
const maxForm = document.querySelector("#max");
const ratingForm = document.querySelector("#rating");
const imageForm = document.querySelector("#image");
const statusForm = document.querySelectorAll('input[type="radio"]');

// Event Listeners
// Open New Book Dialog
newButton.addEventListener("click", () => {
    dialog.showModal();
});

// Close New Book Dialog
closeButton.addEventListener("click", () => {
    form.reset();
    dialog.close();
});

// Submit Dialog
form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Form Inputs
    const title = titleForm.value;
    const author = authorForm.value;
    const chapters = chaptersForm.value;
    const max = maxForm.value;
    const rating = ratingForm.value;
    const image = imageForm.value;
    let status;
    for (let i = 0; i < statusForm.length; ++i) {
        if (statusForm[i].checked) {
            status = statusForm[i].value;
        }
    }

    // Add Book to Library and Display
    addBookToLibrary(title, author, chapters, max, rating, status, image);
    displayBooks();

    form.reset();
    dialog.close();
});

displayBooks();
