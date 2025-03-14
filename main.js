document.addEventListener('DOMContentLoaded', () => {
    const bookForm = document.getElementById('bookForm');
    const searchBookForm = document.getElementById('searchBook');
    const incompleteBookList = document.getElementById('incompleteBookList');
    const completeBookList = document.getElementById('completeBookList');
  
    let books = JSON.parse(localStorage.getItem('books')) || [];
  
    // Fungsi untuk menyimpan buku ke localStorage
    const saveBooks = () => {
      localStorage.setItem('books', JSON.stringify(books));
    };
  
    // Fungsi untuk menampilkan buku
    const renderBooks = () => {
      incompleteBookList.innerHTML = '';
      completeBookList.innerHTML = '';
  
      books.forEach((book, index) => {
        const bookItem = document.createElement('div');
        bookItem.setAttribute('data-bookid', index);
        bookItem.setAttribute('data-testid', 'bookItem');
        bookItem.innerHTML = `
          <h3 data-testid="bookItemTitle">${book.title}</h3>
          <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
          <p data-testid="bookItemYear">Tahun: ${book.year}</p>
          <div>
            <button data-testid="bookItemIsCompleteButton">${
              book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca'
            }</button>
            <button data-testid="bookItemDeleteButton">Hapus Buku</button>
            <button data-testid="bookItemEditButton">Edit Buku</button>
          </div>
        `;
  
        if (book.isComplete) {
          completeBookList.appendChild(bookItem);
        } else {
          incompleteBookList.appendChild(bookItem);
        }
  
        // Event listener untuk tombol "Selesai dibaca" / "Belum selesai dibaca"
        const isCompleteButton = bookItem.querySelector(
          '[data-testid="bookItemIsCompleteButton"]'
        );
        isCompleteButton.addEventListener('click', () => {
          book.isComplete = !book.isComplete;
          saveBooks();
          renderBooks();
        });
  
        // Event listener untuk tombol "Hapus Buku"
        const deleteButton = bookItem.querySelector(
          '[data-testid="bookItemDeleteButton"]'
        );
        deleteButton.addEventListener('click', () => {
          books.splice(index, 1);
          saveBooks();
          renderBooks();
        });
  
        // Event listener untuk tombol "Edit Buku"
        const editButton = bookItem.querySelector(
          '[data-testid="bookItemEditButton"]'
        );
        editButton.addEventListener('click', () => {
          const newTitle = prompt('Masukkan judul baru:', book.title);
          const newAuthor = prompt('Masukkan penulis baru:', book.author);
          const newYear = prompt('Masukkan tahun baru:', book.year);
  
          if (newTitle && newAuthor && newYear) {
            book.title = newTitle;
            book.author = newAuthor;
            book.year = newYear;
            saveBooks();
            renderBooks();
          }
        });
      });
    };
  
    // Event listener untuk form tambah buku
    bookForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const title = document.getElementById('bookFormTitle').value;
      const author = document.getElementById('bookFormAuthor').value;
      const year = parseInt(document.getElementById('bookFormYear').value);
      const isComplete = document.getElementById('bookFormIsComplete').checked;
  
      const newBook = {
        id: +new Date(),
        title,
        author,
        year,
        isComplete,
      };
  
      books.push(newBook);
      saveBooks();
      renderBooks();
  
      bookForm.reset();
    });
  
    // Event listener untuk form pencarian buku
    searchBookForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const searchTerm = document
        .getElementById('searchBookTitle')
        .value.toLowerCase();
  
      const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm)
      );
  
      // Tampilkan judul pencarian
      const searchResultTitle = document.createElement('h3');
      searchResultTitle.textContent = `Hasil Pencarian: "${searchTerm}"`;
      searchResultTitle.style.marginBottom = '20px';
      searchResultTitle.style.color = '#333';
  
      // Bersihkan tampilan sebelumnya
      incompleteBookList.innerHTML = '';
      completeBookList.innerHTML = '';
  
      // Tambahkan judul pencarian ke dalam rak buku
      incompleteBookList.appendChild(searchResultTitle);
  
      // Tampilkan hasil pencarian
      filteredBooks.forEach((book) => {
        const bookItem = document.createElement('div');
        bookItem.setAttribute('data-bookid', book.id);
        bookItem.setAttribute('data-testid', 'bookItem');
        bookItem.innerHTML = `
          <h3 data-testid="bookItemTitle">${book.title}</h3>
          <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
          <p data-testid="bookItemYear">Tahun: ${book.year}</p>
          <div>
            <button data-testid="bookItemIsCompleteButton">${
              book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca'
            }</button>
            <button data-testid="bookItemDeleteButton">Hapus Buku</button>
            <button data-testid="bookItemEditButton">Edit Buku</button>
          </div>
        `;
  
        if (book.isComplete) {
          completeBookList.appendChild(bookItem);
        } else {
          incompleteBookList.appendChild(bookItem);
        }
      });
    });
  
    // Render buku saat pertama kali halaman dimuat
    renderBooks();
  });