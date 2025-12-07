// RESTful API for managing a list of books. 
// Each book has a title, author, and ISBN. 
// Implement basic CRUD (Create, Read, Update, Delete) operations using Express.js.


const express = require('express');
const app = express();
app.use(express.json());


let books = [];


//Add New Book
app.post('/books', (req, res) => {

    const {title, author, isbn} = req.body;

    const newBook = {
        title,
        author,
        isbn
    };

    books.push(newBook);

    res.status(201).json({
        message: "Book Added successfully",
        book: newBook
    })

});


//View All Books
app.get('/books', (req, res) => {
    res.status(200).json(books)
})

app.get('/books/:isbn', (req, res) => {
    const book = books.find(b => b.isbn === req.params.isbn);

    if(!book) {
       return res.status(404).json({
           message: "Book not found" 
        })
    }

    res.json(book);
});


//Update Title/Author or Book
app.put('/books/:isbn', (req, res) => {
    const book = books.find(b => b.isbn === req.params.isbn);

    if(!book) {
       return res.status(404).json({
           message: "Book not found" 
        })
    }

    const {title, author} = req.body;

    book.title = title || book.title;
    book.author = author || book.author;

    res.json({message: "Book Updated", book});
});


//Delete Book
app.delete('/books/:isbn', (req, res) => {
    const index = books.findIndex(b => b.isbn === req.params.isbn);

    if(index === -1) {
        return res.status(404).json({
            message: "Book not found"
        })
    }

    books.splice(index, 1);

    res.json({
        message: "Book Deleted"
    })

});




//Global Error Handler
app.use((err, req, res, next) => {

    console.log(err.stack);

    res.status(500).json({
        message: "Internal Sever Error",
        error : err.message
    })

});


app.listen(3000, () => console.log("Server is running on port 3000"));

