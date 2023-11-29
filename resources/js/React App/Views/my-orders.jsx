import React, { useEffect, useState } from 'react';
import Navbar from '../Components/navbar'
import '../../../css/my-orders.css'
import storage from '../../../Storage/storage';

function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [orderDetails, setOrderDetails] = useState(null);

    const user = storage.get('authUser')
    console.log(user)
    useEffect(() => {
        const fetchOrder = async () => {
        try {
            const response = await axios.get(`/show-my-orders/${user.user_id}`); 
            console.log(response.data); 
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error.message);
        }
        };

        fetchOrder();
    }, []);

    const handleRowClick = async (orderId) => {
        try {
            setOrderDetails(null);
            const response = await axios.get(`/order-details/${orderId}`);
            console.log(response.data);
            setOrderDetails(response.data);
            setSelectedOrderId(orderId);
        } catch (error) {
          console.error('Error fetching order details:', error.message);
        }
      };

  return (
    <>
        <Navbar />
        <div className='my-orders-container'>
            <div className='table-orders'>
                <h2>My Orders</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Status</th>
                                <th>Payment Method</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                        {orders.map(item => (
                            <tr key={item.order_id} onClick={() => handleRowClick(item.order_id)}>
                                <td>{item.order_id}</td>
                                <td>{item.status}</td>
                                <td>{item.payment_method}</td>
                                <td>${item.payment_amount}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
            </div>
            <div className='orders-details'>
                <h2>Order Details</h2>
                {selectedOrderId && orderDetails && Array.isArray(orderDetails) && (                    
                    <>
                    {orderDetails.map(item => (
                        <div key={item.order_id}>
                            <p>Book: {item.book ? item.book.title : ' '}</p>
                            <p>Quantity: {item.quantity_order}</p>
                            <p>Price: ${item.price}</p>
                        </div>
                    ))}
                    </>
                   
                )}
            </div>
        </div>
    </>
  )
}

export default MyOrders