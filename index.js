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

db.connect( ( error ) => {
	if ( error ) {
		throw error;
	}
	console.log( 'MySQL connected...' );
});

// PORT
const port = process.env.PORT || 5000;
app.listen( port, () => console.log( `Listening on port ${port}...` ) );

// app.get();
// app.post(); -- ADD
// app.put(); -- UPDATE
// app.delete();

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


app.put( '/api/courses/:id', ( req, res ) => {
	const course = courses.find( c => c.id === parseInt( req.params.id ) );

	if ( ! course ) {
		res.status( 404 ).send( 'The course with the given ID was not found.' );
	}

	const { error } = validateCourse( req.body ); // result.error

	if ( error ) {
		res.status( 400 ).send( error.details[0].message );
		return;
	}

	course.name = req.body.name;
	res.send( course );

});

app.delete( '/api/courses/:id', ( req, res ) => {
	const course = courses.find( c => c.id === parseInt( req.params.id ) );

	if ( ! course ) {
		res.status( 404 ).send( 'The course with the given ID was not found.' );
		return;
	}

	const index = courses.indexOf( course );
	courses.splice( index, 1 );

	res.send( course );

});

app.get( '/api/courses/:id', ( req, res ) => {
	const course = courses.find( c => c.id === parseInt( req.params.id ) );

	if ( ! course ) {
		res.status( 404 ).send( 'The course with the given ID was not found.' );
		return;
	}

	res.send( course );
});