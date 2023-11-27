import React, { useEffect, useState } from 'react';
import '../../../css/admin.css';
import { Link } from 'react-router-dom';
import NavbarAdmin from '../Views/NavbarAdmin';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import EditSaveForm from './edit-save';
import SaveProduct from './save-product';
import AddGenre from './addGenre';

function Loader() {
  return (
    <>
      <tr>
        <td colSpan="15" className="loading-cell">
          <div className="loader"></div>
        </td>
      </tr>
    </>
  );
}

const endpoint = '/catalog';

const ManageProducts = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    ShowBookByGenre(controller.signal);
    return () => {
      controller.abort();
    };
  }, []);

  const ShowBookByGenre = async (signal) => {
    try {
      setLoading(true);
      const response = await fetch(`${endpoint}-genre`, { signal });
      if (response.ok) {
        const data = await response.json();
        setBooks(data);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Request canceled:', error.message);
      } else {
        console.error('Error:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteBook = async (book_id) => {
    try {
      const response = await axios.delete(`${endpoint}/${book_id}`);
      
      if (response) {
        ShowBookByGenre();
        alert('Book Deleted');
      } else {
        console.error('Error deleting book');
      }
    } catch (error) {
      console.error('Error deleting book', error);
    }
  };

    return (
<>
        <div className='body-products'>
            <div className='title-add'>
                <h1>Products</h1>
                <div className='buttons'>
                  <Popup trigger={<button>Add New Product</button>} modal>
                      {(close)=> (
                          <SaveProduct ShowBookByGenre={ShowBookByGenre} close={close} />
                      )}
                  </Popup>
                  <Popup trigger={<button>Add New Genre</button>} modal>
                      {(close)=> (
                          <AddGenre ShowBookByGenre={ShowBookByGenre} close={close} />
                      )}
                  </Popup>
                </div>
            </div>
            <div className='div-table'>
                    

                <table className='table-style'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>ISBN</th>
                            <th>Genre</th>
                            <th>Publisher</th>
                            <th>Author</th>
                            <th>Year</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>Buy_price</th>
                            <th>Sale_price</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        books.length === 0? <Loader/>: 
                        books.map(book => (
                            <tr key={book.book_id}>
                                <td>{book.book_id}</td>
                                <td>{book.ISBN}</td>
                                <td>{book.genre.name}</td>
                                <td>{book.publisher}</td>
                                <td>{book.author}</td>
                                <td>{book.year}</td>
                                <td>{book.title}</td>
                                <td id='descrip'>{book.description}</td>
                                {/* <td><img src={book.image} /></td> */}
                                <td>
                                    <img src={book.image} alt={`Book cover for ${book.title}`} />
                                </td>
                                <td>${book.buy_price}</td>
                                <td>${book.sale_price}</td>
                                <td>{book.stock}</td>
                                <td><div className='table-buttons'>
                                    <Popup trigger={<button>Edit</button>} modal>
                                        {(close) => ( 
                                        <EditSaveForm book={book} ShowBookByGenre={ShowBookByGenre} close={close}/> 
                                        )}
                                    </Popup>
                                    <button onClick={() => deleteBook(book.book_id)}>Delete</button>
                                </div></td>
                            </tr>
                        ))}
                    </tbody>
                    
                </table>
                
            </div>
        </div>
        </>
    )
}

export default ManageProducts