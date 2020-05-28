import React from 'react';

const Cart = ({ carts }) => {
    return (
        <div className="cart">
            <div className="cart-list">
                {carts.map((cart, i) => {
                    return (
                        <div className="cart-item" key={i}>
                            <div className="dropdown-content">
                                <div className="item-box" id="price">
                                    ${cart.price}
                                </div>
                                <div className="item-box" id="item">
                                    {cart.item}
                                </div>
                            </div>
                        </div>
                    );
                })}

            </div>
        </div>
    );
}

export default Cart;