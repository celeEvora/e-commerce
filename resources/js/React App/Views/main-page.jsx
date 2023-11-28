import React, { useEffect, useState } from 'react';
import Navbar from '../Components/navbar';
import '../../../css/main-page.css';
import { Outlet } from 'react-router-dom';
import BookDetails from './BookDetails';
import { Link, useNavigate } from 'react-router-dom';

const endpoint = '/catalog-genre';

const MainPage = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');

  async function showBookByGenre(signal) {
    try {
      const response = await axios.get(endpoint, { signal });
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error.message);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get('/sanctum/csrf-cookie');
        const abortController = new AbortController();
        const abortSignal = abortController.signal;

        await showBookByGenre(abortSignal);

        return function cleanup() {
          abortController.abort();
        };
      } catch (error) {
        console.error('Error setting CSRF cookie:', error.message);
      }
    };

    fetchData();
  }, []);

    // filter method
    let results = []
    if (!search) 
    {
        results = books
    } else {
        results = books.filter((data) =>
        data.title.toLowerCase().includes(search.toLowerCase()) ||
        data.author.toLowerCase().includes(search.toLowerCase()) ||
        data.ISBN.toLowerCase().includes(search.toLowerCase())        
        )
    }

    const searcher = (e) => {
        setSearch(e.target.value)
    }
    
    return (
        <div className="main">
            <div>
            <Navbar searcher={ searcher } search={search}/>
            </div>
            
            <div className='cards'>
                {results.map(book => (
                  
                    <figure key={book.book_id}>
                      <Link to={`/info/${book.book_id}`}>
                        <div>
                      <div className='image-container'>
                        <img src={book.image}/>
                      </div>
                        <figcaption>
                          <div>
                        <p id='title'>{book.title}</p>
                        <p>{book.author}</p>
                        </div>
                        <div>
                        <p id='price'>${book.sale_price}</p>
                        </div>
                        {/* <div id='figure-button'>
                          <button>
                          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" id='shoppingSymbol'>
                          <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
                          ADD TO CART
                          </button>
                        </div> */}
                        </figcaption>  
                        </div>
                        </Link>
                    </figure>
                    
                ))}
            </div>
        </div>
    )

}
export default MainPage