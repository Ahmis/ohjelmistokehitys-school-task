import React, { Component } from 'react';

class List extends Component {
  // Initialize the state
  constructor(props){
    super(props);
    this.state = {
      products: []
    }
  }

  // Fetch the list of products on first mount.
  componentDidMount() {
    this.getList();
  }

  // Retrieves the list of products from the Express app.
  getList = () => {
    fetch( '/api/products/' )
    .then( res => res.json() )
    .then( products => this.setState( { products } ) )
  }

  render() {
	const { products } = this.state;

    return (
      <div className="App">
        <h1>List of Items</h1>
		
		  <table>
		 { products.map( ( item, index ) => {
			return (
				<tr key={`${item.id}`}>
					<td>{item.id}</td>
					<td>{item.name}</td>
					<td>{item.price}</td>
				</tr>
			);
		}) }
		  </table>
      </div>
    );
  }
}

export default List;