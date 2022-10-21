'use strict';

let cart = {};
let orderTotal = 0;

const addButtons = document.querySelectorAll('.add-to-order');
for (const button of addButtons) {
  button.addEventListener('click', () => {
    // const item = button.id; //"Regular Coffee" <- String
    //item[id] = item.get(id, 0)
    const  info = {
      item: button.id
    };

    fetch('/update-cart.json', {
      method: 'POST',
      body: JSON.stringify(info),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        cart = responseJson.cart;
        orderTotal = responseJson.total;
        displayCart(cart);
        displayOrderTotal(orderTotal);
      });
      // displayCart(cart);
      // displayOrderTotal(orderTotal);
    });
  }
  
  // fetch(`/update-cart.json`)
  //   .then((response) => response.json())
  //   .then((result) => {
  //     cart = result.cart;
  //     orderTotal = result.total;
  //   });
// Display the shopping cart items in the right-hand column of the page.
function displayCart(cartContents) {
  let tableContents = '';

  // Object.entries is like Python's dict.items --- it's a nice way to
  // loop over keys and values. Here's how this would look in Python:
  //
  //   for item, price in cart_contents.items():
  //       # etc.
  for (const [item, price] of Object.entries(cartContents)) {
    tableContents += `<tr><td>${item}</td><td>${price}</td></tr>`;
  }
  document.querySelector('#cart-items').innerHTML = tableContents;
}

// Display the order total using a dollar sign and two decimal places.
function displayOrderTotal(total) {
  document.querySelector('#cart-total').innerHTML = `${total.toFixed(2)}`;
}
