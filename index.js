const Joi = require( 'joi' );
const express = require( 'express' );
const mysql = require( 'mysql' );

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

const app = express();

app.use( express.json() );

// PORT
const port = process.env.PORT || 3000;
app.listen( port, () => console.log( `Listening on port ${port}...` ) );

// app.get();
// app.post();
// app.put();
// app.delete();

const courses = [
	{
		id: 1, name: 'course1'
	},
	{
		id: 2, name: 'course2'
	},
	{
		id: 3, name: 'course3'
	}
];


// Show products.
app.get( '/', ( req, res ) => {
	let sql = 'SELECT * FROM products';
	let query = db.query( sql, ( err, results ) => {
		if ( err ) {
			throw err;
		}

		res.send( results );
	});
});

app.post( '/api/courses', ( req, res ) => {
	
	const { error } = validateCourse( req.body ); // result.error

	if ( error ) {
		res.status( 400 ).send( error.details[0].message );
		return;
	}

	const course = {
		id: courses.length + 1,
		name: req.body.name
	};
	courses.push( course );
	res.send( course );
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

function validateCourse( course ) {
	const schema = {
		name: Joi.string().min(3).required()
	}

	return Joi.validate( course, schema );
}

app.get( '/api/courses/:id', ( req, res ) => {
	const course = courses.find( c => c.id === parseInt( req.params.id ) );

	if ( ! course ) {
		res.status( 404 ).send( 'The course with the given ID was not found.' );
		return;
	}

	res.send( course );
});