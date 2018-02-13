import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

class DrinkDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			drink: "",
			instructions: ""
		}
	}

  componentWillReceiveProps(nextProps) {
    // save a reference to `this` because the value of `this` will change
    // inside the different callback functions.
    var base = this;

    let url = 'http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
    let idDrink = nextProps.idDrink;
    let drinkApi = url + idDrink;
    fetch(drinkApi)
      .then((response) => {
        return response.json()
      }).then((json) => {
          base.setState({
          	drink: json.drinks[0].strDrink,
          	instructions: json.drinks[0].strInstructions
          });
      }).catch((ex) => {
        console.log('An error occured while parsing!', ex)
      })
  }

  render() {
  	return (
      <Row>
        <Col xs={12} sm={6}>
        	<p>{this.state.drink}</p>
        	<p>{this.state.instructions}</p>
        </Col>
      </Row>
  	)
  }
}

export default DrinkDetails;