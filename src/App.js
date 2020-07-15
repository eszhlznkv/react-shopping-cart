import React from 'react';
import logo from './logo.svg';
import './App.css';
import data from "./data.json";
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';

class App extends React.Component{

  constructor(){
    super();
    this.state = {
      products: data.products,
      cartItems: localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")) : [],
      size:"",
      sort:"",
    };
  }


createOrder2 = (order) => {
  fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  })
    .then((res) => res.json())
}


showAllOrders = () => {
  fetch("/api/orders", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then((res) => res.json())
}


removeFromCart = (product)=>{
  const cartItems = this.state.cartItems.slice();
  this.setState({  cartItems: cartItems.filter(x=>x._id !== product._id),});
  localStorage.setItem("cartItems",JSON.stringify(cartItems.filter(x=>x._id !== product._id)));
}
addToCart = (product) => {
  const cartItems = this.state.cartItems.slice();
  let alreadyInCart = false;
  cartItems.forEach(item =>{
    if(item._id === product._id){
      item.count++;
      alreadyInCart = true;
    }
  });
  if (!alreadyInCart){
    cartItems.push({...product, count:1});
  }
  this.setState({cartItems});
localStorage.setItem("cartItems",JSON.stringify(this.state.cartItems));

}

render(){
  return (
    <div className="grid-container">
      <header>
        <a href="/">Нагрузочный суши шоп</a>
      </header>
      <main>
        <div className="content">
        <div className="main">
          <Products products={this.state.products} addToCart={this.addToCart}></Products>
        

        </div>
        <div className="sidebar">
          <Cart 
            cartItems={this.state.cartItems}
            removeFromCart={this.removeFromCart}
            createOrder={this.createOrder2}
            showAllOrders={this.showAllOrders}
          
          /> 


        </div>



        </div>
        
      </main>
      <footer>
        All rights reserved. Using for education.
      </footer>

    </div>
  );
}
}

export default App;