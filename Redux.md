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

Why Universal Links don't work (or are unreliable) in Chrome on iOS

Safari is the only browser with full, deep OS-level integration for Universal Links. Apple designed and controls this feature, so it works best (and most consistently) there.
Third-party browsers like Chrome, Firefox, Brave, Edge etc. on iOS:
Use WebKit under the hood (Apple requirement), but
Do NOT get the same system-level hooks for intercepting and routing Universal Links to your app.
Result: Tapping a Universal Link usually just loads the web page in that browser → no app launch.

This is not a bug in your setup (AASA file, entitlements etc.). It's how Apple restricts third-party browsers for security/privacy reasons.
Recent developer reports (2025–2026) on forums, Reddit, and Stack Overflow consistently confirm: Universal Links only reliably work in Safari.
