import React, { Component } from 'react';

class AddProduct extends Component {
	constructor( props ) {
		super(props);
		this.state = {
			name: '',
			price: '',
		}

		this.onSubmit = this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		this.setState({[e.target.name]: e.target.value});  
	}

	onSubmit( event ) {
		event.preventDefault();

		var data = {
			name: this.state.name,
			price: this.state.price
		}

		// console.log( data );

		fetch( '/api/new-product', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify( data )
		}).then( function( response ) {
			if ( response.status >= 400 ) {
			  throw new Error( 'Bad response from server.' );
			}
			return response.json();
		}).then( function( data ) {
			console.log( data )
		}).catch( function( err ) {
			console.log( err )
		});
	}

	render() {
		return (
			<div>
				<h2>Add Product</h2>
				<form onSubmit={this.onSubmit} method="POST">
					<input type="text" placeholder="Name" name="name" onChange={this.onChange} ref={nameInput => this.nameInput = nameInput} />
					<input type="number" placeholder="Price" name="price" onChange={this.onChange} ref={priceInput => this.priceInput = priceInput} />
					<button>Add</button>
				</form>
			</div>
		);
	}
}

export default AddProduct;
