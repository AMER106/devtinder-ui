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

******************\*\*******************updated redux notes from line number 210****************\*\*\*\*****************

# Namate React - 12 Let's Build Our Store

# React Redux and Redux Toolkit Learning Notes

## 1. Redux is not a mandatory thing

Redux is a state management library that helps manage and centralize application state. However, it is not mandatory to use Redux in React applications. If your app’s state management needs are simple, you can rely on React’s built-in `useState` or `useReducer` hooks. Redux is typically used when an application has:

- Complex state management needs.
- A requirement to share state across multiple components.
- Predictable state update requirements.

In smaller applications, Redux may add unnecessary complexity, and simpler solutions are often preferred.

## 2. Exploring Redux

Redux operates on three core principles:

1. **Single Source of Truth**: The state of the application is stored in a single object called the "store."
2. **State is Read-Only**: The state can only be modified by dispatching actions.
3. **Changes are Made with Pure Functions**: Reducers, which are pure functions, specify how the state changes in response to actions.

The primary components of Redux include:

- **Store**: Holds the state.
- **Actions**: Plain JavaScript objects that describe what happened.
- **Reducers**: Functions that determine how the state changes based on actions.

## 3. Redux and React are Separate Libraries

Redux and React are independent libraries. Redux is a JavaScript library for managing state, and React is a JavaScript library for building user interfaces.

To use Redux with React, you typically use the `react-redux` library. This library provides tools like `Provider`, `useDispatch`, and `useSelector` to connect Redux’s state management to React components. The separation of concerns allows Redux to be used with other frameworks or vanilla JavaScript as well.

## 4. Exploring Redux Toolkit (RTK)

Redux Toolkit (RTK) is the official, recommended approach to writing Redux logic. It simplifies the setup and development process while avoiding common pitfalls of Redux. RTK provides:

- **`configureStore`**: Simplifies store setup.
- **`createSlice`**: Combines action creators and reducers into a single slice.
- **`createAsyncThunk`**: Handles asynchronous logic like API calls.
- Built-in support for immutability and debugging with Redux DevTools.

RTK reduces boilerplate code and makes Redux more approachable.

## 5. RTK Architecture

The architecture of RTK is designed to streamline the development process:

1. **Store**: Created using `configureStore`, which automatically sets up middleware and DevTools.
2. **Slices**: Encapsulate reducers and actions for specific pieces of state.
3. **Async Thunks**: Handle asynchronous logic in a structured way.
4. **Selectors**: Functions to retrieve and compute derived state.
5. **Middleware**: Extends Redux functionality, often for handling side effects.

This architecture encourages modularity and maintainability.

## 6. Slices

A "slice" in Redux Toolkit represents a piece of the Redux state and contains:

- **Initial State**: The default state for the slice.
- **Reducers**: Define how the state changes in response to actions.
- **Actions**: Automatically generated for each reducer.

The `createSlice` function simplifies the process by combining actions and reducers into a single unit. Each slice manages its own logic, promoting a modular structure.

## 7. Selector

Selectors are functions used to extract or derive specific parts of the state from the Redux store. They:

- Help keep components clean by abstracting state access logic.
- Can compute derived data efficiently using libraries like Reselect.

Selectors are typically defined alongside the slices they relate to and accessed using the `useSelector` hook in React components.

## 8. Provider and Reducers

### Provider:

The `Provider` component from `react-redux` is used to make the Redux store available to the entire application. It wraps the root component and passes the store as a prop.

### Reducers:

Reducers are pure functions that specify how the state changes based on dispatched actions. In RTK, reducers are often defined within slices, making them easier to manage.

## 9. useDispatch() and dispatch()

### `useDispatch()`:

This hook, provided by `react-redux`, gives access to the `dispatch` function. It is used to send actions to the Redux store.

### `dispatch()`:

The `dispatch` function is used to trigger actions, which then flow through the reducers to update the state. When using RTK, actions are automatically generated by slices and dispatched using this method.

By combining `useDispatch` and `dispatch`, you can easily integrate Redux actions into React components.
