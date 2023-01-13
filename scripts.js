let myLibrary = [
  ["author1","title1","123","Yes"],
  ["author2","title2","321","No"]
];

function Book(author, title, pages, is_read) {
  // the constructor...
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.is_read = is_read;
  this.info = [author, title, pages, is_read];
}

function showForm() {
  document.getElementById('form-add-book').style.display="grid";
}

function closeForm() {
  document.getElementById('form-add-book').style.display="none";
}

function updateReadStatus(button) {
  const is_read = button.parentElement
  const book_item = is_read.parentElement;
  const display_books = book_item.parentElement;
  const index = [...display_books.children].indexOf(book_item);
  const indexInLibrary = myLibrary.length - 1 - index;
  const currentStatus = myLibrary[indexInLibrary][3];
  if(currentStatus == "Yes") {
    myLibrary[indexInLibrary][3] = "No";
  }
  else if(currentStatus == "No"){
    myLibrary[indexInLibrary][3] = "Yes";
  }
  displayBooks();
  
}

function addBookToLibrary(element) {
  // do stuff here
  const form = element.target;
  const author = form.elements['author'].value;
  const title = form.elements['title'].value;
  const pages = form.elements['pages'].value;
  const is_read = form.elements['is-read'].value;
  const book = new Book(author,title,pages,is_read);
  myLibrary.push(book.info);
  closeForm();
  displayBooks();
}

function removeBook(button) {
  const book_item = button.parentElement;
  const display_books = book_item.parentElement;
  const index = [...display_books.children].indexOf(book_item);
  myLibrary.splice(myLibrary.length-1-index,1)
  button.parentElement.remove();
}

function displayBooks() {
  document.getElementById("display-books").innerHTML = '';

  for (let i = myLibrary.length-1; i >= 0; i--) {
    const exampleItem = document.getElementById("example-item");
    const newItem = exampleItem.cloneNode(true);

    newItem.className = "book-item";
    newItem.id = "";

    for(let j = 0; j < 4; j++) {
      const child1 = newItem.children[j];
      const child2 = child1.children[1];
      child2.innerHTML = myLibrary[i][j];
    }
    const currentDiv = document.getElementById("div");
    const parent = document.getElementById("display-books").insertBefore(newItem,currentDiv);
  }
}

const addListeners = () => {
  document.getElementById("form-add-book").addEventListener("submit", (e) => {
    e.preventDefault();
    addBookToLibrary(e);
  });
};

displayBooks();
addListeners();