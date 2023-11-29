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