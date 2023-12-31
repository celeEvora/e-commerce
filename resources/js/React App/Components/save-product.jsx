import React, { useState, useEffect } from 'react';
import '../../../css/admin.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../../../css/edit-save-form.css';

const endpoint = '/catalog';

const SaveProduct = ({ ShowBookByGenre, close }) => {
    const [formData, setFormData] = useState({
        ISBN: '',
        genre_id: '',
        publisher: '',
        author: '',
        year: '',
        title: '',
        description: '',
        image: '',
        buy_price: '',
        sale_price: '',
        stock: '',
      });
    
      const [genres, setGenres] = useState([]);

      useEffect(() => {
        const fetchGenres = async () => {
          try {
            const response = await axios.get('/genres');
            setGenres(response.data);
    
            if (response.data.length > 0) {
              setFormData({
                ...formData,
                genre_id: response.data[0].genre_id,
              });
            }
          } catch (error) {
            console.error('Error to get genres', error);
          }
        };
    
        axios.get('/sanctum/csrf-cookie');
        fetchGenres();
      }, []); 
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
          await axios.post(`${endpoint}/store-book`, formData);
          ShowBookByGenre();
          close();
          console.log('Book Added Succesfully');
        } catch (error) {
          console.error('Error adding book:', error);
        }
      };
    

    return (
        <div className='div-edit'>
            <form id="edit-book-form" onSubmit={handleSubmit}>
                <h1>Add Book</h1>

                <div className='inputs'>

                <div className='input'>
                    <label >ISBN</label>
                    <input 
                        type='text'
                        id='isbn-book'
                        name='ISBN' 
                        value={formData.ISBN}
                        onChange={handleChange}
                    />
                </div>

                <div className='input'>
                  <label>Genre</label>
                  <select
                    id='genre-book'
                    name='genre_id'
                    value={formData.genre_id}
                    onChange={handleChange}
                  >
                    {genres.map(genre => (
                      <option key={genre.genre_id} value={genre.genre_id}>
                        {genre.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className='input'>
                    <label>Publisher</label>
                    <input 
                        type='text'
                        id='publisher-book'
                        name='publisher' 
                        value={formData.publisher}
                        onChange={handleChange}
                    />
                </div>

                <div className='input'>
                    <label >Author</label>
                    <input 
                        type='text'
                        id='author-book'
                        name='author' 
                        value={formData.author}
                        onChange={handleChange}
                    />
                </div>

                <div className='input'>
                    <label >Year</label>
                    <input 
                        type='text'
                        id='year-book'
                        name='year' 
                        value={formData.year}
                        onChange={handleChange}
                    />
                </div>

                <div className='input'>
                    <label >Title</label>
                    <input 
                        type='text'
                        id='title-book'
                        name='title' 
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>

            

                <div className='input'>
                    <label >Description</label>
                    <input 
                        type='text'
                        id='descrip-book'
                        name='description' 
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                

                <div className='input'>
                    <label >Image</label>
                    <input 
                        type='text'
                        id='image-book'
                        name='image' 
                        value={formData.image}
                        onChange={handleChange}
                    />
                </div>

                <div className='input'>
                    <label >Buy_price</label>
                    <input 
                        type='text'
                        id='buy-book'
                        name='buy_price' 
                        value={formData.buy_price}
                        onChange={handleChange}
                    />
                </div>

                <div className='input'>
                    <label >Sale_price</label>
                    <input 
                        type='text'
                        id='sale-book'
                        name='sale_price' 
                        value={formData.sale_price}
                        onChange={handleChange}
                    />
                </div>

                <div className='input'>
                    <label >Stock</label>
                    <input 
                        type='text'
                        id='stock-book'
                        name='stock' 
                        value={formData.stock}
                        onChange={handleChange}
                    />
                </div>
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    )
    }
    
    export default SaveProduct
