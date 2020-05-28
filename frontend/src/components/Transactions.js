
import React from 'react'; // step 1

const Transactions = ({ transactions }) => { // step 2 declare component


    return (
        <div className="flex-2">
            <div className="transactions-list">
                <p id="history-head">Purchase History</p>
                {transactions.map((transaction, i) => {
                    return (
                        <div className="transactions-item" key={i}>
                            <div class="dropdown-content">

                                <div id="price" className="item-box" >
                                    ${transaction.price}
                                </div>
                                <div id="item" className="item-box" >
                                    {transaction.item}
                                </div>
                            </div>
                            <div className="transactions-total">

                                {(i < transactions.length - 1 && transactions[i].transactionCode === transactions[i + 1].transactionCode) ? '' : 'Total: $' + parseFloat(transactions[i].total).toFixed(2)}

                            </div>
                        </div>
                    );
                })}

            </div>
        </div>
    );
};

// step 3
export default Transactions;