import React, { useEffect } from 'react';
import fakeData from '../../fakeData';
import { useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';
const Shop = () => {
    const frist10 = fakeData.slice(0,10)
    const [products,setProducts]= useState(frist10)
    const [cart,setCart] = useState([])


    useEffect(() =>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map (existingKey =>{
            const product = fakeData.find(pd =>pd.key === existingKey)
            product.quantity = savedCart[existingKey];
            return product;
        });
        setCart(previousCart)
    },[]);

    const handelAddProduct =(product)=>{
        const toBeeAddedKey = product.key;
        const sameProduct = cart.find(pd =>pd.key === toBeeAddedKey);
        let count = 1;
        let newCart;

        if (sameProduct) {
           count = sameProduct.quantity + count;
           sameProduct.quantity = sameProduct.quantity + 1;
           const others = cart.filter(pd => pd.key !== toBeeAddedKey)
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity =1;
            newCart = [...cart,product];
        }
     setCart(newCart)
    
     addToDatabaseCart(product.key,count);
    }

    return (
        <div className ="twin-container">
            <div className="product-container">
           {
               products.map(pd =><Product 
                key = {pd.key}
                showAddToCart={true}
                product={pd}
                handelAddProduct={handelAddProduct}
                >

                </Product>)
           }
       
        </div>
           <div className="cart-container">
            <Cart cart={cart}>
             <Link to="/review">
                <button className="main-btn">Review Order</button>
            </Link></Cart>
            
           </div>
        </div>
        
    );
};

export default Shop;