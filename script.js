// Variables
const myLibrary = [];

// Document Objects
const container = document.querySelector(".book-container");
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

// Organization Functions
// Book Class
class Book {
    static statusArray = [ "Unread", "In Progress", "Read" ]; 

    constructor(title, author, chapters, max, rating, status, image) {
        this.title = title;
        this.author = author;
        this.chapters = chapters;
        this.max = max;
        this.rating = rating;
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
function addBookToLibrary(title, author, chapters, max, rating, status, image) {
    const newBook = new Book(title, author, chapters, max, rating, status, image);
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

// Display Books
function displayBooks() {
    container.textContent = "";

    // Add Books
    myLibrary.forEach((book) => createBookObject(book));
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
    bookObject.append(createCover(book));

    const textContainer = document.createElement("div");
    textContainer.classList.add("text-container");

    textContainer.append(createTitle(book));
    textContainer.append(createAuthor(book));
    textContainer.append(createChapters(book));
    textContainer.append(createRating(book));
    textContainer.append(createStatus(book));
    bookObject.append(textContainer);

    // Add Book Object to Container
    container.append(bookObject);
}

function createCover(book) {
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

    let chaptersText = 0;
    let maxText = "?";
    if (book.chapters) chaptersText = book.chapters;
    if (book.max) maxText = book.max;

    chapters.textContent = `Chapters: ${chaptersText} / ${maxText}`;
    return chapters;
}

function createRating(book) {
    const rating = document.createElement("p");
    rating.classList.add("rating");

    let ratingText = "-";
    if (book.rating) ratingText = book.rating;

    rating.textContent = `Rating: ${ratingText}`;
    rating.append(createIcon("./assets/star.svg", 12, 12));
    return rating;
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
    del.append(createIcon("./assets/delete.svg", 32, 32));
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
    toggle.append(createIcon("./assets/toggle.svg", 32, 32));
    toggle.classList.add("toggle");
    toggle.dataset.id = book.id;
    toggle.title = "Toggle Status";

    toggle.addEventListener("click", (event) => {
        toggleBookStatus(event.currentTarget.dataset.id);
        displayBooks();
    });

    return toggle;
}

function createRatingHeader(book) {

}

function createIcon(src, width, height) {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Icon";
    img.width = width;
    img.height = height;
    return img;
}

// Testing
addBookToLibrary("Land of the Lustrous", "Haruko Ichikawa", 108, 108, 10, "Read", "https://m.media-amazon.com/images/I/91EKWaQmLKL._AC_UF1000,1000_QL80_.jpg");
addBookToLibrary("The Apothecary Diaries", "Natsu Hyuuga, Nekokurage", 50, "", 8, "In Progress", "https://fyre.cdn.sewest.net/manga-books/610a98295098f700127db932/cover_img_247x350_theapothecarydiaries_01_coverfinal-ojQWEpum9.jpg?quality=85&width=768");
addBookToLibrary("Frieren: Beyond Journey's End", "Kanehito Yamada, Tsukasa Abe", "", "", "", "Unread", "https://temp.compsci88.com/cover/normal/01J76XYDGDQERFSK333582BNBZ.webp");
displayBooks();