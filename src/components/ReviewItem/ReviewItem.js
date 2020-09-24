import React from 'react';

const ReviewItem = (props) => {

    const {name,quantity,key,price}= props.product;
    const ReviewItemStyle={
        borderBottom:'1px solid black',
        marginBottom:'5px',
        paddingBottom:'5px',
        marginLeft:'200px',
      
    }
    return (
        <div style={ReviewItemStyle} className="review-item">
            <h3 className="product-name">{name}</h3>
            <p>Quantity:{quantity}</p>
             <p><small>${price}</small></p>
            <br/>
            <button
             className="main-btn"
             onClick={() => props.removeProduct(key)}
            
            >Remove</button>
            
        </div>
    );
};

export default ReviewItem;