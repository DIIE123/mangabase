function storeArray(arr) {
    localStorage.setItem("bookArray", JSON.stringify(arr));
}

function loadArray() {
    const arr = localStorage.getItem("bookArray");
    if (arr) {
        return JSON.parse(arr);
    }
    else {
        return [];
    }
}

export { storeArray, loadArray };