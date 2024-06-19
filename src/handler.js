// newman run "Bookshelf API Test.postman_collection.json" -e "Bookshelf API Test.postman_environment.json"

const {books} = require('./book');

const { nanoid } = require('nanoid');



//menambahkan buku

const addBookHandler = (request, h) => {

  const {name,year,author,summary,publisher,pageCount,readPage,reading} = request.payload;

  

  if(!name){

    const response = h.response({

     "status": "fail",

    "message": "Gagal menambahkan buku. Mohon isi nama buku"

    })

    response.code(400)

    return response

  }

  if(readPage > pageCount){

    const response = h.response({

       "status": "fail",

    "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"

    })

    response.code(400)

    return response

  }

  const id = nanoid(16);

  const insertedAt = new Date().toISOString();

  const updatedAt = insertedAt;

  const finished = pageCount === readPage;

  const newBook = {id, name, year, author,summary,publisher,pageCount,readPage,finished,reading,insertedAt,updatedAt}

  // Menambahkan buku baru

  books.push(newBook)

  const response = h.response({

    "status": "success",

    "message": "Buku berhasil ditambahkan",

    "data": {

        "bookId": id

    }

  })

  response.code(201)

  return response

}

//menampilkan semua buku

const getAllBookHandler = (request, h) => {

 // Mengembalikan semua buku yang ada dalam bentuk array

 return h.response({

  status: 'success',

  data: {

    books: books.map(book => {
     return {'id': book.id, 'name':book.name,'publisher':book.publisher }
    }),

  },

})

};

//memilih buku sesuai degan id

const getBookByIdHandler = (request, h) => {

  const { bookId } = request.params;

  const book = books.find(book => book.id === bookId);

  if (book) {
    const response = h.response({
      "status": "success",
      "data": {
          "book": 
              book
      }
    });
    response.code(200);
    return response;
  
 
  }

  const response = h.response({
    "status": "fail",
   "message": "Buku tidak ditemukan"
  })
  response.code(404)
  return response
  
};
//mengedit buku sesuai dengan id

const editBookByIdHandler = (request, h) => {

  const {name,year,author,summary,publisher,pageCount,readPage,reading} = request.payload;

  const {bookId} = request.params;

  const updatedAt = new Date().toISOString()

  //mencari id buku yang sesuai dengan buku yang ada 

  const index = books.findIndex(book => book.id === bookId)

  if(index === -1){

    const response = h.response({  

     "status": "fail",

     "message": "Gagal memperbarui buku. Id tidak ditemukan"

    })

    response.code(404)

    return response

  }

    if(!name){

      const response = h.response({

         "status": "fail",

         "message": "Gagal memperbarui buku. Mohon isi nama buku"

      })

      response.code(400)

      return response

    }

    if(readPage > pageCount){

      const response = h.response({

        "status": "fail",

        "message": "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"

      })

      response.code(400)

      return response

    }

    

    

    // edit buku sesuai yang disediakan 

    books[index] = {

      ...books[index], name, year, author, summary, publisher, pageCount, readPage, reading, finished: pageCount === readPage, updatedAt

    }

    const response = h.response({

      "status": "success",

      "message": "Buku berhasil diperbarui"

    })

    response.code(200)

    return response 

    

}



//menghapus buku sesuai dengan id

const deleteBookByIdHandler = (request, h) => {

  const { bookId } = request.params;

  const bookIndex = books.findIndex(b => b.id === bookId);

  // Memberikan respons jika buku dengan id yang diminta tidak ditemukan

  if (bookIndex === -1) {

    const response = h.response({

         "status": "fail",

    "message": "Buku gagal dihapus. Id tidak ditemukan"

    });

    response.code(404)

    return response

  }

  // Hapus buku dari array books

  books.splice(bookIndex, 1);

  // Memberikan respons sukses

  return h.response({

 "status": "success",

    "message": "Buku berhasil dihapus"

   });

}

module.exports = {

  addBookHandler,

  getAllBookHandler,

  getBookByIdHandler,

  editBookByIdHandler,

  deleteBookByIdHandler,

};


const r = [
  {nama: 'ruli', 
    usia: 20},
    {nama: 'lisa', usia: 20}
  ]
const a = r.filter(n => 
  n.nama )

console.log(a)

const nu= [
  {nama: 'ruli', 
    usia: 20},
    {nama: 'lisa', usia: 20}
  ]
const n = nu.map(n => 
 {n.nama,n.usia} )

console.log(n)

const number = [
  {nama: 'ruli', 
    usia: 20},
    {nama: 'lisa', usia: 20}
  ]
const name = number.find(n => 
  n.nama === 'ruli' )

console.log(name)