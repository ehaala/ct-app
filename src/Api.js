import React, { Component } from 'react';
import { Button, DropdownButton, MenuItem } from 'react-bootstrap';

class Api extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: "Choose Category",
			drink: "",
			thumb: ""
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
          base.setState({ 
          	drink: json.drinks[0].strDrink,
          	thumb: json.drinks[0].strDrinkThumb
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
    return (
      <div>

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
        <h1>{drink}</h1>
        <img src={'http://' + this.state.thumb} height='300px'/>
      </div>
     )
  }
}

export default Api;