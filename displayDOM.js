import { removeBookFromLibrary, toggleBookStatus, displayBooks } from "./bookLogic.js";

export default function createBookObject(book) {
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

    return bookObject;
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

function createIcon(src, width, height) {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Icon";
    img.width = width;
    img.height = height;
    return img;
}