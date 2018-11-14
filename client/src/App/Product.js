import React, { Component } from 'react';

class Product extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isEdit: false
		};

		this.onDelete = this.onDelete.bind(this);
		this.onEdit = this.onEdit.bind(this);
		this.onEditSubmit = this.onEditSubmit.bind(this);
	}

	onDelete() {
		let data = {
			id: this.props.id
		}

		this.props.onDelete( data.id );

		fetch( '/api/delete-product', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify( data )
		}).then( function( response ) {
			if ( response.status >= 400 ) {
			  throw new Error( 'Bad response from server.' );
			}
			return response.json();
		}).then(function( data ) {
				console.log( 'Product deleted.' );
		}).catch( function( err ) {
			console.log( err );
		});

	}


	onEdit() {
		this.setState( { isEdit: true } );
	}

	onEditSubmit(event) {
		event.preventDefault();

		let data = {
			id: this.props.id,
			name: this.nameInput.value,
			price: this.priceInput.value
		}

		fetch( '/api/edit-product', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify( data )
		}).then( function( response ) {
			if ( response.status >= 400 ) {
			  throw new Error( 'Bad response from server.' );
			}
			return response.json();
		}).then(function( data ) {
				console.log( 'Product deleted.' );
		}).catch( function( err ) {
			console.log( err );
		});


		this.setState( { isEdit: false } );
	}

render() {
	const { name, price } = this.props;

	return (
			<React.Fragment>
				{
					this.state.isEdit ? (
						<form onSubmit={this.onEditSubmit}>
							<input placeholder="Name" defaultValue={name} ref={nameInput => this.nameInput = nameInput} />
							<input placeholder="Price" defaultValue={price} ref={priceInput => this.priceInput = priceInput} />
							<button>Save</button>
						</form>
					) : (
					<tr>
						<td>{name}</td>
						<td>{price}</td>
						<td><button className="edit-button" type="button" onClick={this.onEdit}>Edit</button>
						<button className="delete-button" type="button" onClick={this.onDelete}>Delete</button></td>
					</tr>
					)
				}
			</React.Fragment>
		);
  }
}

export default Product;
