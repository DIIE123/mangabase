import { loadArray, storeArray } from "./storage.js";
import createBookObject from "./displayDOM.js";

const myLibrary = loadArray();

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
}

// Add Book to Library
function addBookToLibrary(title, author, chapters, max, rating, status, image) {
    const newBook = new Book(title, author, chapters, max, rating, status, image);
    myLibrary.push(newBook);
    storeArray(myLibrary);
}

// Remove Book from Library
function removeBookFromLibrary(id) {
    myLibrary.forEach((book, index) => {
        if (book.id === id) {
            myLibrary.splice(index, 1);
        }
    });
    storeArray(myLibrary);
}

// Toggle Book Status
function toggleBookStatus(id) {
    myLibrary.forEach((book) => {
        if (book.id === id) {
            ++book.statusIndex;
            if (book.statusIndex > 2) book.statusIndex = 0;
            book.status = Book.statusArray[book.statusIndex];
        }
    });
    storeArray(myLibrary);
}

// Display Books
function displayBooks() {
    const container = document.querySelector(".book-container");
    container.textContent = "";

    // Add Books
    myLibrary.forEach((book) => container.append(createBookObject(book)));
}

export { addBookToLibrary, removeBookFromLibrary, toggleBookStatus, displayBooks };

// Default Books
if (myLibrary.length === 0) {
    addBookToLibrary("Land of the Lustrous", "Haruko Ichikawa", 108, 108, 10, "Read", "https://m.media-amazon.com/images/I/91EKWaQmLKL._AC_UF1000,1000_QL80_.jpg");
    addBookToLibrary("The Apothecary Diaries", "Natsu Hyuuga, Nekokurage", 50, "", 8, "In Progress", "https://fyre.cdn.sewest.net/manga-books/610a98295098f700127db932/cover_img_247x350_theapothecarydiaries_01_coverfinal-ojQWEpum9.jpg?quality=85&width=768");
    addBookToLibrary("Frieren: Beyond Journey's End", "Kanehito Yamada, Tsukasa Abe", "", "", "", "Unread", "https://temp.compsci88.com/cover/normal/01J76XYDGDQERFSK333582BNBZ.webp");
}