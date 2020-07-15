import React, { Component } from 'react'
import formatCurrency from "../util";

export default class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            name:"",
            email:"",
            adress:"",
            showCheckout: false };
    }
    handleInput = (e) =>{
        this.setState({[e.target.name]: e.target.value});


    };

    createOrder = (e) =>{
        e.preventDefault();
        const order = {
            name: this.state.name,
            email: this.state.email,
            adress: this.state.adress,
            cartItems: this.props.cartItems,
        };
        this.props.createOrder(order)
    };
    showAllOrders = (e) =>{
        this.props.showAllOrders();
    }

    render() {
        const { cartItems } = this.props;
        return (
            <div>
                {cartItems.length === 0 ? (<div className="cart cart-header">Корзина пуста</div>
                ) : (<div className="cart cart-header">У вас {cartItems.length} товара в корзине{" "}
                </div>
                    )}

                <div className="cart">
                    <ul className="cart-items">
                        {cartItems.map(item => (
                            <li key={cartItems._id}>
                                <div>
                                    <img src={item.image} alt={cartItems.title}></img>
                                </div>
                                <div>{item.title}</div>

                                <div className="right">
                                    {formatCurrency(item.price)} x {item.count} {" "}
                                    <button className="button" onClick={() => this.props.removeFromCart(item)}>Удалить</button>

                                </div>

                            </li>))}

                    </ul>


                </div>
                {cartItems.length !== 0 && (
                    <div className="cart">
                        <div className="total">
                            <div>
                                Total:{" "}
                                {formatCurrency(
                                    cartItems.reduce((a, c) => a + c.price * c.count, 0)
                                )}
                            </div>
                        </div>
                        <button onClick={()=> {
                            this.setState({showCheckout: true});

                        }}
                         className="button primary">Оформить заказ</button>

                    </div>

                )}
            {this.state.showCheckout && (
                <div className="cart">
                <form onSubmit={this.createOrder}>
                    <ul className="form-container">
                        <li>
                            <label>Email</label>
                            <input
                            name="email"  
                            type="email" 
                            required 
                            onChange={this.handleInput}>

                            </input>


                        </li>
                        <li>
                            <label>Name</label>
                            <input
                            name="name"  
                            type="text" 
                            required 
                            onChange={this.handleInput}>

                            </input>


                        </li>
                        <li>
                            <label>Adress</label>
                            <input
                            name="adress"  
                            type="text" 
                            required 
                            onChange={this.handleInput}>

                            </input>


                        </li>
                        <li>
                            <button className="button primary" type="submit">Заказать</button>
                        </li>

                        <li>
                            <button className="button primary" type="submit" onClick={this.showAllOrders}>Получить список заказов</button>
                        </li>

                    </ul>
                </form>
             </div>)}
             </div>

        );
    }
}
