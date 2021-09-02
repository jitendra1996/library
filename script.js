/* 1.store all the data to the localStorage
2.give another column to delete the Option
3.add scroll bar to the view */

//constructure
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

//display constructor
function Display() {

}

//Add method to display prototype
Display.prototype.add = function (book) {
    let tableBody = document.getElementById('tableBody');
    let uiString = `
                    <tr>
                        
                        <td scope="col">${book.name}</td>
                        <td scope="col">${book.author}</td>
                        <td scope="col">${book.type}</td>
                    </tr>`;
    tableBody.innerHTML+=uiString;                
}

Display.prototype.clear = function () {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
}

Display.prototype.validate=function(book){
    if(book.name.length<2 || book.author.length<2){
       return false; 
    }else{
        return true;
    }
}

Display.prototype.show=function(type,displayMessage){
    let message=document.getElementById('message');
    message.innerHTML=`<div class="alert alert-${type} alert-dismissible fade show" role="alert">
    <strong>Message </strong>  ${displayMessage}.
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`

  setTimeout(function(){
      message.innerHTML='';
  },2000);
}

//add submit event listener to libraryForm
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log('you have submitted library form');
    let name =document.getElementById('bookName').value;
    let newBookName=localStorage.setItem("book",name);
    let author = document.getElementById('author').value;
    // fiction , programming,cooking

    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');
    let type;

    if (fiction.checked) {
        type = fiction.value;
    } else if (programming.checked) {
        type = programming.value;
    } else if (cooking.checked) {
        type = cooking.value;
    }

    let book = new Book(name, author, type);
    e.preventDefault();
    let display = new Display();
    if(display.validate(book)){
        display.add(book);
        display.clear();
        display.show('success','Your book has been successfully added');
    }else{
        //show validation error
        display.show('danger','Sorry you cannot add this book');
        
    }
    console.log(book);
}