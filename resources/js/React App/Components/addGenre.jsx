import React, { useState } from 'react';
import axios from 'axios'; // Asegúrate de importar axios

const AddGenre = ({ ShowBookByGenre, close }) => {
  const [genreName, setGenreName] = useState('');

  const addGenre = async () => {
    try {
      const response = await axios.post('/genres', { name: genreName });

      if (response.data) {
        alert('Genre Added Succesfully');
        ShowBookByGenre();
        close();
      } else {
        console.error('error');
      }
    } catch (error) {
      console.error('Error adding genre', error);
    }
  };

  const handleChange = (e) => {
    setGenreName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addGenre();
  };

  return (
    <div className='div-edit'>
      <button className="close" onClick={close}>
        &times;
      </button>
      <form id="add-genre-form" onSubmit={handleSubmit}>
        <h1>Add New Genre</h1>
        <div className='inputs'>
          <div className='input'>
            <label>Genre Name</label>
            <input
              type='text'
              id='genre-book'
              name='name'
              value={genreName}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AddGenre;
