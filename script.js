// Variables
const myLibrary = [];

// Document Objects
const container = document.querySelector(".book-container");
const dialog = document.querySelector("dialog");
const showButton = document.querySelector(".new");
const closeButton = document.querySelector(".close");
const form = document.querySelector("form")

// Form Document Objects
const titleForm = document.querySelector("#title");
const authorForm = document.querySelector("#author");
const pagesForm = document.querySelector("#chapters");
const readForm = document.querySelector("#read");

// Organization Functions
// Book Object
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();

    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${read ? `read` : `not read yet`}`;
    }
}

// Add Book to Library
function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
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
// Open New Book Dialog
showButton.addEventListener("click", () => {
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

    // Read Form Inputs
    const title = titleForm.value;
    const author = authorForm.value;
    const pages = pagesForm.value;
    const read = readForm.checked;

    // Add Book to Library and Display
    addBookToLibrary(title, author, pages, read);
    displayBooks();

    form.reset();
    dialog.close();
});

// Display Books
function displayBooks() {
    container.textContent = "";
    myLibrary.forEach((book) => createBookObject(book));
}

function createBookObject(book) {
    // Create Book
    const bookObject = document.createElement("div");
    bookObject.classList.add("book");

    // Create Title
    const title = document.createElement("h1");
    title.classList.add("title");
    title.textContent = book.title;
    bookObject.append(title);

    // Create Author
    const author = document.createElement("h2");
    author.classList.add("author");
    author.textContent = book.author;
    bookObject.append(author);

    // Create Pages
    const pages = document.createElement("h3");
    pages.classList.add("pages");
    pages.textContent = book.pages;
    bookObject.append(pages);

    // Create Read
    const read = document.createElement("input");
    read.type = "checkbox";
    read.classList.add("read");
    read.checked = book.read;
    bookObject.append(read);

    // Create Delete Button
    const del = document.createElement("button");
    del.innerHTML = "<img height=\"32px\" width=\"32px\" src=\"./assets/delete.svg\">";
    del.classList.add("delete");
    del.dataset.id = book.id;
    del.addEventListener("click", (event) => {
        removeBookFromLibrary(event.currentTarget.dataset.id);
        displayBooks();
    });
    bookObject.append(del);

    // Add to Container
    container.append(bookObject);
}

// Testing
addBookToLibrary("test1", "me", 10, true);
addBookToLibrary("test2", "me", 20, true);
addBookToLibrary("test3", "me", 30, true);
displayBooks();