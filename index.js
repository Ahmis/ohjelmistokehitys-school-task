const express = require( 'express' );
const mysql = require( 'mysql' );
const path = require('path');

const app = express();

app.use( express.json() );

// Serve the static files from the React app.
app.use( express.static( path.join( __dirname, 'client/build' ) ) );

// Create database connection.
const db = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'root',
	database : 'ohjelmistokehitys',

	// FOR MAMP.
	socketPath : '/Applications/MAMP/tmp/mysql/mysql.sock'
});

// Connect to MySQL.
db.connect( ( error ) => {
	if ( error ) {
		throw error;
	}
	console.log( 'MySQL connected...' );
});

// PORT
const port = process.env.PORT || 5000;
app.listen( port, () => console.log( `Listening on port ${port}...` ) );

// Show products.
app.get( '/api/products', ( req, res ) => {
	let sql = 'SELECT * FROM products';
	let query = db.query( sql, ( err, results ) => {
		if ( err ) {
			throw err;
		}

		res.send( results );
	});
});

// Add new product to db.
app.post( '/api/new-product', ( req, res ) => {
	let product = {
		name: req.body.name,
		price: req.body.price
	};

	let stmt = 'INSERT INTO products ( name, price ) VALUES ( ?, ? )';
	let values = [ product.name, product.price ];

	db.query( stmt, values, ( err, results ) => {
		if ( err ) {
			throw err;
		}

		res.send( results );
	});

});

// Remove product from db.
app.post( '/api/delete-product', function( req, res ) {
	let stmt = 'DELETE FROM products WHERE id = ?';
	let value = req.body.id;

	db.query( stmt, value, ( err, results ) => {
		if ( err ) {
			throw err;
		}
		res.send( results );
	});
});

// Edit product.
app.post( '/api/edit-product', function( req, res ) {
	let stmt = 'UPDATE products SET name = ?, price = ? WHERE id = ?';
	let values = [req.body.name, req.body.price, req.body.id];

	db.query( stmt, values, ( err, results ) => {
		if ( err ) {
			throw err;
		}
		res.send( results );
	});

});
