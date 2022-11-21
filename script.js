//Library Array
let myLibrary = [];


//Book Constructor
function Book(name, author, pages, readstatus) {

  this.name = name;
  this.author = author;
  this.pages = pages;
  this.readstatus = readstatus;
  
}

//define html bookshelf as a variable
let bookshelf = document.querySelector('.bookshelf');

//Radio Selector Function
let radioSelector = function() {

  for (let i = 0; i < bookRadios.length; i++ ) {
    if (bookRadios[i].checked) {
      return (bookRadios[i].value);
      //bookRadios[i].checked = false;
  
      //only one radio can be logically checked, don't check the rest
     
    }
  }
}

//Get form into a variable
const bookForm = document.getElementById('form-library'); 

//Get Individual form elements via .elements[] method via id, name, or index numnber
let bookName = bookForm.elements['name']; //document.getElementById('name').value        
let bookAuthor = bookForm.elements['author'];   // document.getElementById('author').value       
let bookPages = bookForm.elements['pages']; //document.getElementById('pages').value  
let bookRadios = document.getElementsByName('finishbook');

//Submit Buttton Query Select
let submitButton = document.querySelector('#submit');

let newDiv;
let bookId;
let lastIndex; 
let booksection; //Use for adding book content via divs 
let deleteButton;

//Function that counts the elements in myLibrary Array and generates a new div in div.bookshelf
let generateLibrary = function() {

  lastIndex = myLibrary.length - 1;

  newDiv = document.createElement("div");
  bookId = myLibrary[lastIndex].name;
  newDiv.setAttribute('class', 'book');
  newDiv.setAttribute(`id`, `${bookId}`);
  //newDiv.textContent = `${myLibrary[lastIndex].name}\n${myLibrary[lastIndex].author}\n${myLibrary[lastIndex].pages}\n${myLibrary[lastIndex].readstatus}`;

  let key;

  for (key in myLibrary[lastIndex]) {

    if (key === `readstatus`) {

      booksection = document.createElement("div");
      booksection.setAttribute("data-number", `${lastIndex}`);
      booksection.textContent = `${myLibrary[lastIndex][key]}`;
      booksection.addEventListener(`click`, function(e) {
        let d;
        let ds;
        let changingArrayIndex;
        //console.log(e.target.textContent);

      
        if (e.target.textContent === `Yes`) {
          e.target.textContent = `No`;
          d = e.target;
          ds = d.getAttribute(`data-number`);
          changingArrayIndex = parseInt(ds);
          myLibrary[changingArrayIndex].readstatus = `No`;

        } else if (e.target.textContent === `No`) {

          e.target.textContent = "Yes";
          d = e.target;
          ds = d.getAttribute(`data-number`);
          changingArrayIndex = parseInt(ds);
          myLibrary[changingArrayIndex].readstatus = `Yes`;

        }
        
        

      })

      newDiv.appendChild(booksection);

    } else if (key !== `readstatus`) {

      booksection = document.createElement("div");
      booksection.setAttribute(`class`, `content-${key}`); //Use for CSS decoration
      booksection.textContent = `${myLibrary[lastIndex][key]}`;

      newDiv.appendChild(booksection);



    } 

  }

  deleteButton = document.createElement("button");

  let divToRemove;
  let idToRemove;
  
  deleteButton.addEventListener(`click`, function(e) {
    
    
    for (let x = 0; x < myLibrary.length; x++) {

      if (myLibrary[x].name === e.target.getAttribute(`data-name`)) {
        
        //remove book object from myLibrary based on myLibrary[x].name
        idToRemove = e.target.getAttribute(`data-name`);
        console.log(e.target);
        myLibrary.splice(x, 1);

        //remove the book div from bookshelf based on bookId via .removeChild method
        //divToRemove = document.querySelector(`#${idToRemove}`);
        bookshelf.removeChild(bookshelf.childNodes[x + 1]);
        //bookshelf.removeChild(document.querySelector(`#${idToRemove}`));

        break;
      }

      

    }


  })




  newDiv.appendChild(deleteButton);
  deleteButton.setAttribute(`data-name`, `${bookId}`);
  
  
 
  bookshelf.appendChild(newDiv);


}



function addBookToLibrary() {

  //if object has a prototype attribute of 'Book', append to the end of myLibrary
  myLibrary.push(new Book(bookName.value, bookAuthor.value, bookPages.value, radioSelector() ));
  
  //Call generateLibrary();
  generateLibrary();

}


submitButton.addEventListener("click", addBookToLibrary);















////////////////////////////////////////////////////////////////////
//This is where BookInfoDisplayer will go, since I know it works
let bookInfoDisplayer = function() {

  /*
  bookName.setAttribute("value", );
  bookAuthor.setAttribute("value", )
  bookPages.setAttribute("value", )
 */


  console.log(bookName.value);
  console.log(bookAuthor.value);
  console.log(bookPages.value);
  for (let i = 0; i < bookRadios.length; i++ ) {
    if (bookRadios[i].checked) {
      console.log(bookRadios[i].value);
      bookRadios[i].checked = false;

      //only one radio can be logically checked, don't check the rest
      break;
    }
  }

  bookName.value = "";
  bookAuthor.value = "";
  bookPages.value = "";

}
