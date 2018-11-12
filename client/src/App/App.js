import React, { Component } from 'react';
import './App.css';
import Product from './Product';
import AddProduct from './AddProduct';

class App extends Component {

	// Initialize the state.
	constructor( props ) {
		super( props );

		this.state = {
		  products: []
		}

		this.onAdd = this.onAdd.bind( this );
		this.onDelete = this.onDelete.bind( this );
		this.onEditSubmit = this.onEditSubmit.bind( this );
	}

	// Retrieves the list of products from the Express app.
	getList = () => {
		fetch( '/api/products/' )
		.then( res => res.json() )
		.then( products => this.setState( { products } ) )
	}

	onAdd(name, price) {
		const products = this.getProducts();

		products.push({
			name,
			price
		});

		this.setState( { products } );
	}

	onDelete(name) {
		const products = this.getProducts();
		const filteredProducts = products.filter( product => {
			return product.name !== name;
		})

		this.setState( { products: filteredProducts } );
	}

	onEditSubmit(name, price, originalName) {
		let products = this.getProducts();
		products = products.map( product => {
			if ( product.name === originalName ) {
				product.name = name;
				product.price = price;
			}

			return product;
		});

		this.setState( { products } );
	}
	
	// Fetch the list of products on first mount.
	componentDidMount() {
		this.getList();
	}

	render() {
		return (
			<div>
				<h1>Products Manager</h1>
	
				<AddProduct
					onAdd={this.onAdd}
				/>
	
				{
					this.state.products.map( product => {
						return (
							<Product
							key={product.name}
							{...product}
							onDelete={this.onDelete}
							onEditSubmit={this.onEditSubmit}
							/>
						);
					})
				}
			</div>
		);
	  }
	}

export default App;