import React, { useEffect, useState } from 'react';
import '../../../css/admin.css';

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

const endpoint = '/users';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    showUsers(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  const showUsers = async (signal) => {
    try {
      setLoading(true);
      const response = await axios.get(endpoint, { signal });
      setUsers(response.data);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message);
      } else {
        console.error('Error:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (user_id) => {
    try {
      const res = await axios.delete(`${endpoint}/${user_id}`);
      if (res) {
        showUsers();
        alert('User Deleted');
      } else {
        console.error('Error deleting user');
      }
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

    return (       
            <div className='body-products'>
            <h1>Users</h1>
            <div className='div-table-user'>
            
                <table className='table-style'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        users.length === 0? <Loader/>:
                        users.map(user => (
                        <tr key={user.user_id}>
                            <td>{user.user_id}</td>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td><div className='table-buttons-users'>
                            <button>Edit</button>
                            <button onClick={() => deleteUser(user.user_id)}>Delete</button>
                            </div></td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>

    )
}

export default ManageUsers