// Variables
const myLibrary = [];

// Document Objects
const container = document.querySelector(".book-container");
const dialog = document.querySelector("dialog");
const closeButton = document.querySelector(".close");
const form = document.querySelector("form")

// Form Document Objects
const titleForm = document.querySelector("#title");
const authorForm = document.querySelector("#author");
const chaptersForm = document.querySelector("#chapters");
const imageForm = document.querySelector("#image");
const statusForm = document.querySelectorAll('input[type="radio"]');

// Organization Functions
// Book Object
function Book(title, author, chapters, status, image) {
    this.title = title;
    this.author = author;
    this.chapters = chapters;
    this.status = status;
    this.image = image;
    this.id = crypto.randomUUID();
}

// Add Book to Library
function addBookToLibrary(title, author, chapters, status, image) {
    const newBook = new Book(title, author, chapters, status, image);
    myLibrary.push(newBook);
}

// Remove Book from Library
function removeBookFromLibrary(id) {
    myLibrary.forEach((book, index) => {
        if (book.id === id) {
            myLibrary.splice(index, 1);
        }
    });
}

// Event Listeners
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
    const image = imageForm.value;
    let status;
    for (let i = 0; i < statusForm.length; ++i) {
        if (statusForm[i].checked) {
            status = statusForm[i].value;
        }
    }

    // Add Book to Library and Display
    addBookToLibrary(title, author, chapters, status, image);
    displayBooks();

    form.reset();
    dialog.close();
});

// Display Books
function displayBooks() {
    container.textContent = "";
    // Add New Button
    const newButton = document.createElement("button");
    newButton.textContent = "+";
    newButton.classList.add("new");
    newButton.addEventListener("click", () => {
        dialog.showModal();
    });
    container.append(newButton);

    // Add Books
    myLibrary.forEach((book) => createBookObject(book));    
}

function createBookObject(book) {
    // Create Book
    const bookObject = document.createElement("div");
    bookObject.classList.add("book");

    // Create Image
    bookObject.append(createImage(book));

    // Create Title
    const title = document.createElement("h1");
    title.classList.add("title");
    title.textContent = book.title;
    bookObject.append(title);

    // Create Author
    const author = document.createElement("p");
    author.classList.add("author");
    author.textContent = book.author;
    bookObject.append(author);

    // Create Chapters
    const chapters = document.createElement("p");
    chapters.classList.add("chapters");
    chapters.textContent = `Chapters: ${book.chapters}`;
    bookObject.append(chapters);

    // Create Status
    bookObject.append(createStatus(book));

    // Create Delete Button
    bookObject.append(createDelete(book));

    // Add to Container
    container.append(bookObject);
}

function createImage(book) {
    let image = document.createElement("img");
    if (book.image) {
        image.src = book.image;
    }
    else {
        image.src = "./assets/not-found.png";
    }
    image.alt = "Book Cover";
    image.classList.add("image");
    return image;
}

function createStatus(book) {
    const status = document.createElement("p");
    status.classList.add("status");
    const statusText = document.createElement("span");
    statusText.textContent = book.status.charAt(0).toUpperCase() + book.status.slice(1);

    if (statusText.textContent === "Unread") {
        statusText.style.color = "red";
    }
    if (statusText.textContent === "Dropped") {
        statusText.style.color = "goldenrod";
    }
    if (statusText.textContent === "Finished") {
        statusText.style.color = "green";
    }

    status.textContent = "Status: ";
    status.append(statusText);
    return status;
}

function createDelete(book) {
    const del = document.createElement("button");
    del.innerHTML = "<img height=\"32px\" width=\"32px\" src=\"./assets/delete.svg\">";
    del.classList.add("delete");
    del.dataset.id = book.id;
    del.addEventListener("click", (event) => {
        removeBookFromLibrary(event.currentTarget.dataset.id);
        displayBooks();
    });
    return del;
}

// Testing
addBookToLibrary("Land of the Lustrous", "Haruko Ichikawa", 10, "Finished", "https://m.media-amazon.com/images/I/91EKWaQmLKL._AC_UF1000,1000_QL80_.jpg");
addBookToLibrary("test2", "me", 20, "Unread", "");
addBookToLibrary("test3", "me", 30, "Unread", "");
displayBooks();