Redux Introdcution

=> Redux is not mandatory in building applications.
=> Redux is used for the data layer, it means that when we have a lot of components in the application, and there are a lot of write and fetching operations.then we should go for Redux.
=> Redux and React are not same, they are separate libraries.
=> we also have another library for managing state management Zustand.
=>we are not covering the zustand in this notes, better to explore it.
=>Redux offers easy debugging.

---

Redux is a old way of writing redux logic, and it is too complicated.
=>to use redux it needs a lot of other packages to work and redux need a lot of boiler code.
=>that's why we are using Redux toolkit, which is the modern way of writing redux, which reduces the complications which we have faced in the redux.
=>we need a redux global store. where we can store the all data in the form of slices. there might be a lot of slices which we can keep in the redux store. the slices can be userslice or cartSlice.

let's take an example .
=> in the food delivery apps, we have items to add we need to click on add buttton.
=> whenever we add ,the cart items changed from cart to cart-1, it's keep increasing the number as we added the items into the cart.

HOW REDUX IS WORKING HERE NOW?
=> when we add ,redux won't allow us to add the items in the cart.
=>we need to perform few things. that is when user clicks on add, first it dispatches the action and this action calls the reducer fucntion and it will modify the cart slice in the redux store.
=>as of now we are storing the data in the cart slice, but how do we read it in the ui?
=>we need to use selector, this phenomena is known as subscribing to the store.
=>it means whenever we updated something in the cart slice, redux will automatically updates the component. it's like our component is subscribing to the cart slice store. with the help of selector it is subscribing.

---

=>we need to install @reduxjs/toolkit and react-redux to use redux.
=>once installed the above packages , create the store in the utils folder. give it a name like store.js or appStore.js according to the requirement.
=>once created the file create the configureStore which comes from redux toolkit. and in this store we can add the slices too.
import {configureStore} from "@resuxjs/toolkit"
const appStore=configureStore({//here we add the slices}); export default appStore.
=>second step is to add the provider in the app.js file or wheerever we need the redux and wrap the components within the provider. and it accepts the prop that is store={//here we add the appStore whioch is coming from the appStore.js file}

let's understand the scenerio with examples.
u have few restaurents in your page, when u click a particular restarant, u see a different menus, and here u see the option called add cart, when u click on add cart, in the header cart-items should changes from 0 to 1 , it keeps increasing if u add more items, when u click on cart-items , it will show the added items. and u also have to show the clear cart button, if u click on cart, the cart should be empty., write the approach go with few things.

folder structure:
src/
├── app/
│ └── store.js
├── features/
│ └── cart/
│ └── cartSlice.js
├── components/
│ ├── Header.jsx
│ ├── RestaurantList.jsx
│ ├── Menu.jsx
│ └── Cart.jsx
└── App.jsx

1️⃣ Create Redux Store
app/store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";

export const store = configureStore({
reducer: {
cart: cartReducer,
},
});

---

2️⃣ Create Cart Slice (Core Logic)
features/cart/cartSlice.js

import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
name: "cart",
initialState: {
items: [], // all cart items
},
reducers: {
addItem: (state, action) => {
state.items.push(action.payload);
},
removeItem: (state, action) => {
state.items = state.items.filter(
item => item.id !== action.payload
);
},
clearCart: (state) => {
state.items = [];
},
},
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
✅ Redux Toolkit uses Immer, so direct mutations are safe.

---

3️⃣ Wrap App with Redux Provider
main.jsx / index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
<Provider store={store}>
<App />
</Provider>
);

4️⃣ Header – Show Cart Count (0 → 1 → 2…)
components/Header.jsx
import { useSelector } from "react-redux";

const Header = () => {
const cartItems = useSelector((state) => state.cart.items);

return (
<header>
<h2>Food App</h2>
<div>
🛒 Cart Items: {cartItems.length}
</div>
</header>
);
};

## export default Header;

📌 This updates automatically when cart changes.
5️⃣ Menu Page – Add Item to Cart
components/Menu.jsx
import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartSlice";

const Menu = ({ menuItems }) => {
const dispatch = useDispatch();

return (
<div>
<h3>Menu</h3>
{menuItems.map(item => (
<div key={item.id}>
<span>{item.name} - ₹{item.price}</span>
<button
onClick={() => dispatch(addItem(item))} >
Add to Cart
</button>
</div>
))}
</div>
);
};

export default Menu;
🟢 Clicking Add to Cart:

Dispatches addItem

Updates global cart state

Header cart count updates instantly

6️⃣ Cart Page – Show Items & Clear Cart
components/Cart.jsx

import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";

const Cart = () => {
const dispatch = useDispatch();
const cartItems = useSelector(state => state.cart.items);

return (
<div>
<h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <div key={index}>
              {item.name} - ₹{item.price}
            </div>
          ))}

          <button onClick={() => dispatch(clearCart())}>
            Clear Cart
          </button>
        </>
      )}
    </div>

);
};

export default Cart;
🧹 Clear Cart:

Empties cart

Header count becomes 0

Cart UI updates automatically
