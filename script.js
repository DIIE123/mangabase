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
// Book Class
class Book {
    static statusArray = [ "Unread", "In Progress", "Read" ]; 

    constructor(title, author, chapters, status, image) {
        this.title = title;
        this.author = author;
        this.chapters = chapters;
        this.image = image;
        this.id = crypto.randomUUID();

        this.statusIndex = Book.statusArray.indexOf(status);
        this.status = status;
    }

    toggleStatus = () => {
        ++this.statusIndex;
        if (this.statusIndex > 2) this.statusIndex = 0;
        this.status = Book.statusArray[this.statusIndex];
    }
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

function toggleBookStatus(id) {
    myLibrary.forEach((book) => {
        if (book.id === id) {
            book.toggleStatus();
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

    // Add Books
    myLibrary.forEach((book) => createBookObject(book));

    // Add New Button
    const newButton = document.createElement("button");
    newButton.textContent = "+";
    newButton.classList.add("new");
    newButton.addEventListener("click", () => {
        dialog.showModal();
    });
    container.append(newButton);
}

function createBookObject(book) {
    // Create Book Object
    const bookObject = document.createElement("div");
    bookObject.classList.add("book");

    // Create Buttons (Toggle, Delete)
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    buttonContainer.append(createToggleStatus(book));
    buttonContainer.append(createDelete(book));
    bookObject.append(buttonContainer);
    
    // Create Image and Text
    bookObject.append(createImage(book));
    bookObject.append(createTitle(book));
    bookObject.append(createAuthor(book));
    bookObject.append(createChapters(book));
    bookObject.append(createStatus(book));

    // Add Book Object to Container
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
    image.width = "8.5rem";
    image.height = "12rem";
    image.classList.add("image");
    return image;
}

function createTitle(book) {
    const title = document.createElement("h1");
    title.classList.add("title");
    title.textContent = book.title;
    return title;
}

function createAuthor(book) {
    const author = document.createElement("p");
    author.classList.add("author");
    author.textContent = book.author;
    return author;
}

function createChapters(book) {
    const chapters = document.createElement("p");
    chapters.classList.add("chapters");
    chapters.textContent = `Chapters: ${book.chapters}`;
    return chapters;
}

function createStatus(book) {
    const status = document.createElement("p");
    status.classList.add("status");
    const statusText = document.createElement("span");
    statusText.textContent = book.status;

    if (statusText.textContent === "Unread") {
        statusText.style.color = "red";
    }
    if (statusText.textContent === "In Progress") {
        statusText.style.color = "goldenrod";
    }
    if (statusText.textContent === "Read") {
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
    del.title = "Delete Book";
    del.addEventListener("click", (event) => {
        removeBookFromLibrary(event.currentTarget.dataset.id);
        displayBooks();
    });
    return del;
}

function createToggleStatus(book) {
    const toggle = document.createElement("button");
    toggle.innerHTML = "<img height=\"32px\" width=\"32px\" src=\"./assets/toggle.svg\">";
    toggle.classList.add("toggle");
    toggle.dataset.id = book.id;
    toggle.title = "Toggle Status";

    toggle.addEventListener("click", (event) => {
        toggleBookStatus(event.currentTarget.dataset.id);
        displayBooks();
    });

    return toggle;
}

// Testing
addBookToLibrary("Land of the Lustrous", "Haruko Ichikawa", 108, "Read", "https://m.media-amazon.com/images/I/91EKWaQmLKL._AC_UF1000,1000_QL80_.jpg");
addBookToLibrary("The Apothecary Diaries", "Natsu Hyuuga, Nekokurage", 79, "In Progress", "https://fyre.cdn.sewest.net/manga-books/610a98295098f700127db932/cover_img_247x350_theapothecarydiaries_01_coverfinal-ojQWEpum9.jpg?quality=85&width=768");
addBookToLibrary("Frieren: Beyond Journey's End", "Kanehito Yamada, Tsukasa Abe", 140, "Unread", "https://temp.compsci88.com/cover/normal/01J76XYDGDQERFSK333582BNBZ.webp");
displayBooks();