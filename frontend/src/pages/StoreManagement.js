import React from 'react';
import axios from 'axios'; // don't forget this
import '../css/StoreManagement.css';
import { Redirect } from 'react-router-dom';

const StoreManagement = ({appUser, setAppUser}) => {
  // pass in default value into useState
  const [itemName, setItemName] = React.useState(''); // create a state variable + setter
  const [itemPrice, setItemPrice] = React.useState(''); 
  const [items, setItems] = React.useState(['Items']); // if map of undefined 

  const fetchItems = () => {
    // utility to get all items
    axios.get('/api/getAllItems')
      .then((res) => {
        console.log(res);
        setItems(res.data.items); // update state variable
      })
      .catch(console.log);
  };

  const submitItemName = () => { // arrow/lambda function
    console.log(itemName);
    const body = {
      itemName: itemName,
      itemPrice: itemPrice
    };
    axios.post('/api/addItem', body)
      .then(() => setItemName(''))
      .then(() => setItemPrice(''))
      .then(() => fetchItems()) // fetch after submit
      .catch(console.log);

    document.getElementById("success-message").innerHTML = "The item [" + itemName + "] has been successfully added!"; //returns success message when item added
  };

  const deleteFunction = async (itemName, i) => {
    const body = {
      itemName: itemName
    };
    axios.post('/api/deleteItem', body)
      .then(() => fetchItems()) // fetch updated list
      .catch(console.log);
      
  };

  // this is a hook
  React.useEffect(() => {
    // this will load items when the page loads
    fetchItems();
  }, []); // pass empty array

  if(!appUser) {
    return <Redirect to="/" /> //stops users from visiting without being logged in
  }

  // jsx
  return (
    <div className="StoreManagement">
      <h1 id="management-header">Store Management</h1>
      <p id="success-message"></p> 
      <div id="management-item-box">
        <div id="management-item-box-price">
          <input id="input-price" placeholder="Item Price ($)" value={itemPrice} onChange={e => setItemPrice(e.target.value)} />
        </div>
        <div id="management-item-box-name">
          <input id="input-name" placeholder="Item Name" value={itemName} onChange={e => setItemName(e.target.value)} />
        </div>
        <div id="management-item-box-button">
          <button id="input-bttn" onClick={submitItemName}>Add</button>
        </div>
      </div>
      <div>
        <div className="items">
            {items.map((item, i) => {
              // convert each array item to an element
              return (
                <div className="items-item" key={i}>
                  <div className="item-box itemPrice">{item.itemPrice}</div>
                  <div className="item-box itemName">{item.itemName}</div>
                  <button className="delete-button" onClick={() => deleteFunction(item.itemName, i)}>Delete</button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default StoreManagement;