import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Components/navbar';
import '../../../css/cart.css'

const ShoppingCart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('/cart'); 
        console.log(response.data); 

        const cartArray = Object.values(response.data.cart);

        setCart(cartArray);
      } catch (error) {
        console.error('Error fetching cart:', error.message);
      }
    };

    fetchCart();
  }, []);

  const removeCartItem = async (id) => {
  try {
    const response = await axios.delete(`/cart-remove/${id}`);
    console.log(response.data);

    setCart(response.data.cart);
    console.log(cart);
  } catch (error) {
    console.error('Error removing item from cart:', error.message);
  }
};

const updateCartItem = async (id, quantity) => {
    try {
      const response = await axios.post('/cart-update', { id, quantity });
      console.log(response.data);

      setCart(response.data.cart);
    } catch (error) {
      console.error('Error updating item quantity:', error.message);
    }
  };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.sale_price * item.quantity, 0);
    };
  return (
    <>
      <Navbar />
      <div className='cart-body'>
        <h2>Shopping Cart</h2>
        {cart.length === 0 ? (
          <div className="empty-cart-message">Your cart is empty. Start shopping now!</div>
        ) : (
            <table className='cart-table'>
                <thead>
                    <tr className='cart-tr-h'>
                        <th className='th-left'>Item</th>
                        <th className='th-left'>Quantity</th>
                        <th className='th-right'>Price</th>
                        <th className='th-right'></th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(item => (
                <tr key={item.book_id} className='cart-item'>
                    <td>
                        <div className='item'>
                            <div className='cart-image'>
                                <img src={item.image} />
                            </div>
                    
                            <div className='cart-info'>
                                <h3>{item.title}</h3>
                                <p>{item.author}</p> 
                            </div>
                        </div>    
                    </td>
                    <td>
                        <div className='cart-qty'>
                            <input
                            type='number'
                            min='1'
                            max={item.stock}
                            value={item.quantity}
                            name='quantity'
                            onChange={(e) => updateCartItem(item.book_id, e.target.value)}
                            >
                            </input>
                        </div>
                    </td>
                    <td>
                        <div >
                            <p className='th-right'>${item.sale_price * item.quantity}</p>
                        </div>
                    </td>
                    <td>
                        <button onClick={() => removeCartItem(item.book_id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                        </button>
                    </td>
                </tr>
            ))}

                <tr className='cart-tr-h'>
                    <td><div><Link to='/checkout'>Checkout</Link></div></td>
                    <td className='th-right total'>Total</td>
                    <td className='th-right total'>${calculateTotal()}</td>
                    <td className='total'></td>
                </tr>
            </tbody>
          
            </table> 
            )}     
        </div>
    </>
  );
};

export default ShoppingCart;
