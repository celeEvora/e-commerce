import React, { useState } from 'react';

const AdminRole = ({ showUsers, close }) => {
    const [userId, setUserId] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [message, setMessage] = useState('');
  
    const makeAdmin = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(`/admin-role/${userId}`);
        console.log(response.data);
        setIsAdmin(true);
        showUsers();
        close();
        setMessage('User is now an admin');
      } catch (error) {
        console.error('Error making user admin:', error.message);
        setMessage('Error making user admin');
      }
    };

    const removeAdmin = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post(`/remove-admin/${userId}`);
          console.log(response.data);
          setIsAdmin(false);
          showUsers();
        close();
          setMessage('Admin privileges removed');
        } catch (error) {
          console.error('Error removing admin privileges:', error.message);
          setMessage('Error removing admin privileges');
        }
      };

  return (
    <div className='div-edit'>
      <button className="close" onClick={close}>
        &times;
      </button>
     
      <h3>Create or remove administrator privileges</h3>
      <form onSubmit={makeAdmin} className='admin-privileges'>
        <label >
          User ID:
        </label>
        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
        <div>
            <button onClick={makeAdmin} id='AdminRol'>Make Admin</button>
            <button onClick={removeAdmin} id='RemoveAdminRol'>Remove Admin</button>
        </div>
      </form>
      {message && <p>{message}</p>}
    
    </div>
  );
};

export default AdminRole;
