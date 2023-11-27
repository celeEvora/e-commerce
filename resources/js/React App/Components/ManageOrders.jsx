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

const endpoint = '/orders';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    showOrders(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  const showOrders = async (signal) => {
    try {
      setLoading(true);
      const response = await axios.get(endpoint, { signal });
      setOrders(response.data);
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

  const cancelOrder = async (orderId) => {
    try {
      const response = await axios.put(`${endpoint}/${orderId}`);

      if (response.status === 200) {
        showOrders();
        alert('Order Canceled');
      } else {
        console.error('Error canceling order');
      }
    } catch (error) {
      console.error('Error canceling order', error);
    }
  };

    return (       
            <div className='body-orders'>
            <h1>Orders</h1>
            <div className='div-table-user'>
            
                <table className='table-style'>
                    <thead>
                        <tr>
                            <th>order_id</th>
                            <th>user_id</th>
                            <th>status</th>
                            <th>payment_method</th>
                            <th>payment_amount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        orders.length === 0? <Loader/>:
                        orders.map(order => (
                        <tr key={order.order_id}>
                            <td>{order.order_id}</td>
                            <td>{order.user_id}</td>
                            <td>{order.status}</td>
                            <td>{order.payment_method}</td>
                            <td>{order.payment_amount}</td>
                            <td><div className='table-buttons-orders'>
                            <button onClick={() => cancelOrder(order.order_id)}>Cancel Order</button>
                            </div></td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                </div>
        </div>

    )
}

export default ManageOrders