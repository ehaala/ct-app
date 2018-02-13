import React, { Component } from 'react';
import { Button, Row, Col, MenuItem } from 'react-bootstrap';

import DrinkDetails from './DrinkDetails.js';

class DrinkMain extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: "Choose Category",
			drink: "",
			thumb: "",
			idDrink: "",
			total: ""
		}

		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.findDrink = this.findDrink.bind(this);
	}

	handleSelectChange(e) {
		if (e.target.name == 'type') {
			this.setState({
				type: e.target.value
			});
		}
	}

  findDrink() {
    var base = this;

    let url = 'http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
    let select = this.state.type;
    let drinkApi = url + select;
    fetch(drinkApi)
      .then((response) => {
        return response.json()
      }).then((json) => {
      		let total = json.drinks.length;
      		let random = Math.random();
      		let num = Math.floor(random * total);
          base.setState({ 
          	drink: json.drinks[num].strDrink,
          	thumb: json.drinks[num].strDrinkThumb,
          	idDrink: json.drinks[num].idDrink,
          	total: json.drinks.length
          });
      }).catch((ex) => {
        console.log('An error occured while parsing!', ex)
      })
  }

  componentDidMount() {
    // save a reference to `this` because the value of `this` will change
    // inside the different callback functions.
    var base = this;

    // fetch a poem
    let drinkApi = 'http://www.thecocktaildb.com/api/json/v1/1/random.php';
    fetch(drinkApi)
      .then((response) => {
        return response.json()
      }).then((json) => {
          base.setState({ drink: json.drinks[0].strDrink });
      }).catch((ex) => {
        console.log('An error occured while parsing!', ex)
      })
  }

  render() {
    let drink = this.state.drink;
    let total = this.state.total;
    return (
      <Row>
      	<Col xs={12} sm={6}>
	      	<fieldset>
	      		<label for="type">Type</label>
	      		<select id="type" name="type" value={this.state.type} onChange={this.handleSelectChange}>
	      			<option value="null" id="null">Select Type</option>
	      			<option value="Gin" id="Gin">Gin</option>
	      			<option value="Rum" id="Rum">Rum</option>
	      			<option value="Vodka" id="Vodka">Vodka</option>
	      		</select>
	      	</fieldset>
	      	<Button bsStyle="info" onClick={this.findDrink}>Find Drink</Button>
	      	<p>Total Drinks: {total}</p>
	        <h1>{drink}</h1>
	        <img src={'http://' + this.state.thumb} height='300px'/>
	        <p>{this.state.idDrink}</p>
        </Col>
        <Col xs={12} sm={6}>
        	<DrinkDetails idDrink={this.state.idDrink}/>
        </Col>
      </Row>
     )
  }
}

export default DrinkMain;