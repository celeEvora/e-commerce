import React, { useEffect, useState } from 'react';
import Navbar from '../Components/navbar'
import '../../../css/book-details.css'
import { useParams } from 'react-router-dom';

const endpoint = '/catalog';

const BookDetails = () => {
    const { id } = useParams();

    const [book, setBook] = useState([]);

    async function showBook(signal) {
        try {
        const response = await axios.get(`${endpoint}/${id}`, { signal });
        setBook(response.data);
        } catch (error) {
        console.error('Error fetching book:', error.message);
        }
    }

    const addToCart = async () => {
        try {
            const response = await axios.post(`/cart-add/${id}`);
            console.log(response.data); 
            alert(response.data.message)
        } catch (error) {
            console.error('Error adding to cart:', error.message);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
        try {
            const abortController = new AbortController();
            const abortSignal = abortController.signal;

            await showBook(abortSignal);

            return function cleanup() {
            abortController.abort();
            };
        } catch (error) {
            console.error('Error setting CSRF cookie:', error.message);
        }
        };

        fetchData();
    }, []);

    console.log(book)

  return (
    <>
    <Navbar /> 
    <div className='info-body'>
    <article className='Info-container'>
        <div className='info-container-image'>
            <img src={book.image}></img>
        </div>
        <div className='info-container-information'>
            <h2>{book.title}</h2> 
            <h3>{book.author}</h3>
            <hr />
            <p id='book_price'>${book.sale_price}</p>
            <p id='status'>IN STOCK {book.stock}</p>
            <div id='figure-button'>
                <button onClick={addToCart}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" id='shoppingSymbol'>
                    <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
                    ADD TO CART
                </button>
            </div>
            <div className='Details-description'>
                <h3>Description</h3>
                <p>{book.description}</p>
                <h3>Product Details</h3>
                <p>Publisher: {book.publisher}</p>
                <p>ISBN-13: {book.ISBN}</p>
                <p>Year: {book.year}</p>
                <p>Genre: {book.genre?.name || 'N/A'}</p>
            </div>
        </div>
    </article>
    </div>
    </>
  )
}

export default BookDetails