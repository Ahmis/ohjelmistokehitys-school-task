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
		this.onChange = this.onChange.bind( this );
		this.onDelete = this.onDelete.bind( this );
		this.onEditSubmit = this.onEditSubmit.bind( this );
	}

	// Retrieves the list of products from the Express app.
	getList = () => {
		fetch( '/api/products/' )
		.then( res => res.json() )
		.then( products => this.setState( { products } ) )
	}

	onAdd( name, price ) {

		// Get products.
		const products = this.getProducts();

		// Set id for our new item.
		const id =  products[products.length - 1].id + 1;

		// Push new product to our array.
		products.push({
			id,
			name,
			price
		});

		// Update state so that it contains our new product.
		this.setState( { products } );
	}

	onChange(e) {
		this.setState({[e.target.name]: e.target.value});  
	}

	onDelete( id ) {

		// Get products.
		const products = this.getProducts();

		// Find product we want to delete from list.
		const filteredProducts = products.filter( product => {
			return product.id !== id;
		});

		// Show product list without deleted item.
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

	getProducts() {
		return this.state.products;
	}

	render() {
		return (
			<div>
				<h1>Products Manager</h1>
				
				<AddProduct
					onAdd={this.onAdd}
					onChange={this.onChange}
				/>
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Price</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
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
					</tbody>
				</table>
			</div>
		);
	  }
	}

export default App;