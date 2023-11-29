import React, { useEffect, useState } from 'react';
import Navbar from '../Components/navbar'
import '../../../css/checkout.css'
import { useNavigate, Link } from 'react-router-dom';

function Checkout() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    payment_method: '',
    street: '',
    city: '',
    state: '',
    country: '',
    postal_code: '',
    payment_amount: 0,
    books: [], 
  });

  const go = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get('/cart');
        console.log(response.data);

        const productArray = Object.values(response.data.cart).map(item => {
          return {
            ...item,
            quantity: parseInt(item.quantity, 10) 
          };
        });
        
        setProducts(productArray);
        
      } catch (error) {
        console.error('Error fetching cart:', error.message);
      }
    };

    fetchProduct();
  }, []); 

  useEffect(() => {
    setFormData({
      ...formData,
      books: products,
      payment_amount: calculateTotal(),
    });
  }, [products]); 

  const calculateTotal = () => {
    return products.reduce((total, item) => total + item.sale_price * item.quantity, 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  console.log(formData)

  const handleCheckout = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('/checkout', formData);
      console.log(response.data);
      alert('Order placed successfully')
      go('/');
    } catch (error) {
      console.error('Error during checkout:', error.message);
      }
  };

  return (
    <>
        <Navbar />
        
          <form id='form-checkout' onSubmit={handleCheckout}>
          <div className='checkout-container'>
            <div className='left-side'>
              <div className='payment-container'>
                <h2>Payment method</h2>
                <input type='radio' 
                name='payment_method'                 
                required='required' 
                value='CREDIT CARD'
                onChange={handleInputChange}
                />
                <label>CREDIT CARD</label>
                
                <input type='radio' 
                name='payment_method' 
                required='required' 
                value='APPLE PAY'
                onChange={handleInputChange}
                />
                <label>APPLE PAY</label>
                
                <input type='radio' 
                name='payment_method' 
                required='required' 
                value='PAYPAL'
                onChange={handleInputChange}
                />
                <label>PAYPAL</label>
              </div>

              <div className='address-container'>
                <h2>Enter your address</h2>
                <label>Street</label>
                <input 
                type='text' 
                name='street'
                required='required' 
                onChange={handleInputChange}
                />

                <label>City</label>
                <input 
                type='text' 
                name='city'
                required='required' 
                onChange={handleInputChange}
                />

                <label>State</label>
                <input 
                type='text' 
                name='state'
                required='required' 
                onChange={handleInputChange}
                />

                <label>Country</label>
                <input 
                type='text' 
                name='country'
                required='required' 
                onChange={handleInputChange}
                />

                <label>Postal Code</label>
                <input type='text' 
                name='postal_code'
                required='required' 
                onChange={handleInputChange}
                />
              </div>
            </div>

            <div className='voucher-container'>
              <h2>Order Details</h2>
              <table>
                <thead>
                  <tr>
                    <th colSpan={2} id='left'>Items</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(item => (
                  <tr key={item.book_id} className='cart-item'>
                    <td>
                      {item.title} <em>x{item.quantity}</em>
                    </td>
                    <td id='right'>
                      ${item.sale_price * item.quantity}
                    </td>
                  </tr>
                  ))}
                  
                <tr>
                  <td >
                  <hr />
                    Total
                  </td>
                  <td id='right' name='payment_amount'>
                  <hr />
                    ${calculateTotal()}
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            </div>
          <button type='submit'>Finish & Pay</button>
          </form>
        
    </>
  )
}

export default Checkout