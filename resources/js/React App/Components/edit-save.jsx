import React, { useEffect, useState } from 'react';
import '../../../css/admin.css';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import '../../../css/edit-save-form.css';

const EditSaveForm = ({ book, ShowBookByGenre, close }) => {
  const [formData, setFormData] = useState({
    id: book.book_id,
    ISBN: book.ISBN,
    genre_id: book.genre_id,
    publisher: book.publisher,
    author: book.author,
    year: book.year,
    title: book.title,
    description: book.description,
    image: book.image,
    buy_price: book.buy_price,
    sale_price: book.sale_price,
    stock: book.stock,
  });

  const [genres, setGenres] = useState([]);


  useEffect(() => {
    axios.get('/sanctum/csrf-cookie');

    axios.get(`/genres`)
    .then(response => {
      setGenres(response.data);
    })
    .catch(error => {
      console.error('Error fetching genres:', error);
    });

    setFormData({
      id: book.book_id,
      ISBN: book.ISBN,
      genre_id: book.genre_id,
      publisher: book.publisher,
      author: book.author,
      year: book.year,
      title: book.title,
      description: book.description,
      image: book.image,
      buy_price: book.buy_price,
      sale_price: book.sale_price,
      stock: book.stock,
    });
  }, [book]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/catalog/${formData.id}`, formData);
      ShowBookByGenre();
      close();
      console.log('Datos actualizados exitosamente');
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
    }
  };

  

    return (
        <div className='div-edit'>

            <button className="close" onClick={close}>
            &times;
            </button>

            <form id="edit-book-form" onSubmit={handleSubmit}>
                <h1>Edit Book</h1>

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

                {/* <div className='input'>
                    <label >Genre</label>          
                    <input 
                        type='text'
                        id='genre-book'
                        name='genre_id' 
                        value={formData.genre_id}
                        onChange={handleChange}
                    />
                </div> */}

<div className='input'>
  <label>Genre</label>
  <select
    id='genre-book'
    name='genre_id'  // Corrected name to 'genre_id'
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
    
    export default EditSaveForm
