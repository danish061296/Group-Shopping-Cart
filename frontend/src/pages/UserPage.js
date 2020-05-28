import React from 'react';
import axios from 'axios'; // don't forget this
import '../css/UserPage.css';
import Transactions from '../components/Transactions';
import Cart from '../components/Cart';
import { Redirect } from 'react-router-dom';

const UserPage = ({ appUser, setAppUser }) => {
    // pass in default value into useState
    const [item, setItem] = React.useState('Select Item'); // create a state variable + setter
    const [price, setPrice] = React.useState(0.00);
    const [transactions, setTransactions] = React.useState(['Transaction']); // if map of undefined 
    const [carts, setCarts] = React.useState(['Cart']);
    const [items, setItems] = React.useState(['Item']);
    const [cartNumber, setCartNumber] = React.useState((''));
    const [total, setTotal] = React.useState(0.00);
    const [transactionCode, setTransactionCode] = React.useState((0));

    if (item === '' && price === '') {
        setPrice(0.00);
        setItem('Select Item');

    }

    const addToCart = () => {
        //setTotal(parseFloat(total) + parseFloat(price));
        if (item !== 'Select Item') {

            const body = {
                itemName: item,
                itemPrice: price,
                total: total + parseFloat(price)
            };
            axios.post('/api/addToCart', body)


                .then(() => fetchCart())
                .catch(console.log);
        }
    }

    const clearCart = () => {

        axios.post('/api/removeFromCart')
            .then(() => fetchCart())
            .then(() => setTotal(0.00))
            .catch(console.log);

    }

    const fetchCart = () => {
        // utility to get all items from cart
        axios.get('/api/getFromCart')
            .then((res) => {
                console.log(res);
                setCarts(res.data.items);
                setCartNumber(res.data.items.length);
                setTotal(res.data.items[res.data.items.length - 1].total);

            })
            .catch(console.log);
        console.log(carts);

    };

    const fetchItems = () => {
        // utility to get all items
        axios.get('/api/getAllItems')
            .then((res) => {
                console.log(res);

                setItems(res.data.items);


            })
            .catch(console.log);
    }

    const selectItem = (item, price) => {
        setItem(item);
        setPrice(price);
    }

    const fetchTransactions = () => {
        // utility to get all transactions
        axios.get('/api/getAllTransactions')
            .then((res) => {
                console.log(res);
                setTransactions(res.data.transactions); // update state variable
                setTransactionCode(parseInt(res.data.transactions[res.data.transactions.length - 1].transactionCode) + 1)
            })
            .catch(console.log);

    };


    const submitTransaction = () => { // arrow/lambda function

        setTransactionCode(transactionCode + 1)
        for (let i = 0; i < carts.length; i++) {
            const body = {
                item: carts[i].item,
                price: carts[i].price,
                total: total,
                transactionCode: transactionCode
            };
            axios.post('/api/addTransaction', body)
                .then(() => setItem(''))
                .then(() => setPrice(''))
                .then(() => fetchTransactions()) // fetch after submit
                .catch(console.log);
        }
        clearCart();

    };

    // this is a hook
    React.useEffect(() => {
        fetchItems();
        fetchTransactions();
        fetchCart();

    }, []); // pass empty array

    if (!appUser) {
        return <Redirect to="/" />; // stops users from visiting without being logged in
    }
    // jsx
    return (
        <div class="main-content">
            <div>
                <h1 id="store-head">Store</h1>
                <p id="cart-number">Cart: {cartNumber}</p>


                <div className="flexbox">

                    <div className="flex-1">

                        <Cart carts={carts} />
                        <p id="total-price">Total: ${total.toFixed(2)}</p>

                        <div class="submitBtns">
                            <div>
                                <button className="button" onClick={addToCart}>Add</button>
                            </div>
                            <div>
                                <button className="button" onClick={e => clearCart()}>Clear Cart</button>
                            </div>
                            <div>
                                <button className="button" onClick={submitTransaction}>Checkout</button>
                            </div>
                        </div>

                        <div class="item-dropdown">
                            <li class="items-list">

                                <a href="#" class="itemSelectBtn">
                                    <li>
                                        <div className="item-box" id="price">
                                            ${price}
                                        </div>
                                        <div className="item-box" id="item">
                                            {item}
                                        </div>
                                    </li>
                                </a>
                                <ul>

                                    {items.map((item, i) => {
                                        return (
                                            <div className="items-item" key={i}>
                                                <div class="dropdown-content">
                                                    <a class="itemSelector" onClick={e => selectItem(item.itemName, item.itemPrice)}>
                                                        <li>
                                                            <div className="item-box" id="price">
                                                                ${item.itemPrice}
                                                            </div>
                                                            <div className="item-box" id="item">
                                                                {item.itemName}
                                                            </div>
                                                        </li>
                                                    </a>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </ul>
                            </li>

                        </div>
                    </div>
                    <Transactions transactions={transactions} />
                </div>

            </div>
        </div>
    );
};

export default UserPage;
