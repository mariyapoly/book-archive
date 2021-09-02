// spinner
document.getElementById('spinner').style.display = 'none';
// display error
document.getElementById('error-message').style.display = 'none';
// function for data load
const loadData = () => {
    const inputField = document.getElementById('input-field').value;
    // clear displaying data
    document.getElementById('input-field').value = '';
    document.getElementById('book-container').textContent = '';
    document.getElementById('type-error').innerHTML = '';
    document.getElementById('book-search').innerHTML = '';
    document.getElementById('error-message').style.display = 'none';
    // show spinner
    document.getElementById('spinner').style.display = 'block';
    // call function
    loadBook(inputField);
    loadBookData(inputField);
}

// function for load book data fetch
const loadBook = inputField => {
    const url = `https://openlibrary.org/search.json?q=${inputField}`;
    fetch(url)
        .then(res => res.json())
        .then(data => totalBook(data.numFound))
        .catch(error => displayError(error));
}

// function for searching total book result
const totalBook = totalbook => {
    const searchBook = document.getElementById('book-search');
    searchBook.innerHTML = `
        <p class="text-center">Total Search Results ${totalbook}</p>
    `
    // type error handle
    const error = document.getElementById('type-error');
    if (totalbook === 0) {
        error.innerHTML = `
            <p class="text-center text-danger">Dear Sir/Mem your search result is not found</p>
        `
        document.getElementById('book-search').style.display = 'none';
    }
    // hide spinner
    document.getElementById('spinner').style.display = 'none';
}

// function for load book data fetching
const loadBookData = inputField => {
    const url = `https://openlibrary.org/search.json?q=${inputField}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayBook(data.docs))
        .catch(error => displayError(error));
}
// function for display error 
const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
}
// function for displaying book 
const displayBook = bookData => {
    const books = bookData.slice(0, 21);
    const bookContainer = document.getElementById('book-container');
    books.forEach(book => {
        const { title, first_publish_year, cover_i } = book;
        // set img url
        let url = `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;
        const imgNotFound = `https://covers.openlibrary.org/b/id/undefined-M.jpg`;
        const coverImg = () => {
            if (url !== imgNotFound) {
                const imgUral = url;
                return imgUral;
            } else {
                url = 'images/not-found.png';
                return url;
            }
        }
        // function for set author name 
        const authorName = () => {
            if (book.author_name !== undefined) {
                const bookAuthorName = book.author_name[0];
                return bookAuthorName;
            } else {
                book.author_name = 'Not Found';
                return book.author_name;
            }
        }
        // create a new div and add class col-lg-4
        const col = document.createElement('div');
        col.classList.add('col-lg-4');
        col.innerHTML = `
            <div class="card">
                <img src="${coverImg()}" class="card-img-top card-img" alt="...">
                <div class="card-body p-0 pt-4">
                    <h4 class="mb-2 title">Book Name: ${title}</h4>
                    <h5 class="author-name">Author Name: ${authorName()}</h5>
                    <p class="mb-2"><b>First Publish Year:</b> ${first_publish_year ? first_publish_year : 'Not Found'}</p>
                    <p class="mb-2"><b>Publisher:</b> ${book.publisher[0]}</p>
                </div>
            </div>
        `
        bookContainer.appendChild(col);
        document.getElementById('book-search').style.display = 'block';
    })
    document.getElementById('error-message').style.display = 'none';
}


