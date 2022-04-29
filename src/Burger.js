import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import './burger.css';

class Burger extends Component {
    state = {
        price:0,
        aloo_Tikki: 0,
        tomato: 0,
        cheese: 0,
        meat: 0
    }
     
    addRemoveIngredient = (action, items) => {
        let { aloo_Tikki, tomato, cheese, meat } = this.state;
        let value;
        switch (items) {
            case 'aloo_Tikki': {
                value = aloo_Tikki;
                break;
            }
            case 'tomato': {
                value = tomato;
                break;
            }
            case 'cheese': {
                value = cheese;
                break;
            }
            case 'meat': {
                value = meat;
                break;
            }
            default: break;
        }
        if (action === 'add') {
            value = value + 1;
            this.setState({
                price : this.state.price + 1.29
            })
        } else {
            value = value - 1.29;
            this.setState({
                price : this.state.price -  1.29 < 0 ? this.state.price : this.state.price - 1.29
            })
        }
            this.setState({
            [items]: value >= 0 ? value : 0
           });
    }

    burgerContent = () => {
        let { aloo_Tikki, tomato, cheese, meat } = this.state;
        let burger = [];

        //  aloo_Tikki
        for (let i = 0; i < aloo_Tikki; i++) {
            burger.push(<div key={burger.length} className="aloo_tikki"></div>);
        }
        //  tomato
        for (let i = 0; i < tomato; i++) {
            burger.push(<div key={burger.length} className="tomato"></div>);
        }
        // cheese
        for (let i = 0; i < cheese; i++) {
            burger.push(<div key={burger.length} className="cheese"></div>);
        }
        // meat
        for (let i = 0; i < meat; i++) {
            burger.push(<div key={burger.length} className="meat"></div>);
        }
        if (burger.length === 0)
            burger.push(<p key="id">Please add your deleicious ingredient</p>);
        return burger;
    }

    render() {
       return (
            <div>
                <div className="burgerIngredients">
                    <div className="BreadTop"></div>
                        {this.burgerContent()}
                    <div className="BreadBottom"></div>
                </div>
                <center>Current Price : <strong>{this.state.price}</strong></center>
                <div className="all_ingredients">
                    <p>aloo_Tikki</p>
                    <div className="btn">
                        <Button onClick={() => this.addRemoveIngredient('add', 'aloo_Tikki')} >+</Button>
                        <Button onClick={() => this.addRemoveIngredient('remove', 'aloo_Tikki')}>-</Button>
                    </div>
                    <p>TOMATO</p>
                    <div className="btn">
                        <Button onClick={() => this.addRemoveIngredient('add', 'tomato')}>+</Button>
                        <Button onClick={() => this.addRemoveIngredient('remove', 'tomato')}>-</Button>
                    </div>
                    <p>CHEESE</p>
                    <div className="btn">
                        <Button onClick={() => this.addRemoveIngredient('add', 'cheese')}>+</Button>
                        <Button onClick={() => this.addRemoveIngredient('remove', 'cheese')}>-</Button>
                    </div>
                    <p>MEAT</p>
                    <div className="btn">
                        <Button onClick={() => this.addRemoveIngredient('add', 'meat')}>+</Button>
                        <Button onClick={() => this.addRemoveIngredient('remove', 'meat')}>-</Button>
                    </div>
                </div>
            </div>
        );
    }
}
export default Burger