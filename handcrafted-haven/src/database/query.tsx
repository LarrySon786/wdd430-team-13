import postgres from "postgres";
import bcrypt from "bcrypt";

const sql = postgres(process.env.DATABASE_URL!, { ssl: "require" });

//Database Tables

// Products
// productName, productCost, productDescription, imageUrl, userId (foreign key),

// Users
// firstName, lastName, email, accountType, password,

// Reviews
// userId (foreign key), productId (foreign key), Score, message

// TEAM TO DO LIST
//  1. Access to NEON POSTGRES database management?
//  ALSO share the .env connection string.
//  2. Review current database tables, columns, and data
//  3. Difficulties deploying to render. Errors in finding correct folder 404.

// UTILITY
async function hash(password: string) {
	if (typeof password !== "string" || password.length === 0) {
		throw new Error("Password must be a non-empty string.");
	}
	const salt = await bcrypt.genSalt(10);
	const hash = await bcrypt.hash(password, salt);

	return hash;
}

// USER table
async function selectUsers() {
	const data = await sql`
    SELECT *
    FROM users;`;
	console.log(data);
}

async function insertUser(
	firstName: string,
	lastName: string,
	email: string,
	password: string,
	accountType: string,
) {
	const hashedPassword = await hash(password);

	await sql`
    INSERT INTO users (firstname, lastname, email, password, accounttype)
    VALUES (${firstName}, ${lastName}, ${email}, ${hashedPassword}, ${accountType})
`;
}

// PRODUCT table
async function selectProducts() {
	const data = await sql`
    SELECT *
    FROM products;`;
	console.log(data);
}

async function insertProduct(
	name: string,
	description: string,
	price: number,
	imageUrl: string,
	userId: number,
) {
	await sql`
    INSERT INTO products (name, description, price, imageurl, userid)
    VALUES (${name}, ${description}, ${price}, ${imageUrl}, ${userId})
`;
}

// REVIEWS Table
async function selectReviews() {
	const data = await sql`
    SELECT *
    FROM reviews;`;
	console.log(data);
}

async function insertReview(
	score: number,
	message: string,
	userId: number,
	productId: number,
) {
	await sql`
    INSERT INTO reviews (score, message, userid, productid)
    VALUES (${score}, ${message}, ${userId}, ${productId})
    `;
}

export default async function seedDatabase() {
	// BELOW IS WORKING (Commented out to prevent adding excesive items to database)
	// USERS
	// try {
	//     await insertUser('Jose', 'Sanchez', 'testride@flying.com', 'evenfakerpassword', 'user')
	//     await selectUsers();
	//     console.log('Database seeding completed')
	// } catch (error) {
	//     console.log(error);
	// }
	// BELOW IS WORKING (Commented out to prevent adding excesive items to database)
	// PRODUCTS
	// try {
	//     await insertProduct('Cheese', 'Fresh off the farm', 3.00, '/none', 1)
	//     await selectProducts();
	//     console.log('Database seeding completed')
	// } catch (error) {
	//     console.log(error);
	// }
	// BELOW IS WORKING (Commented out to prevent adding excesive items to database)
	// REVIEWS
	// try {
	//     await insertReview(4, "This product is almost perfect", 1, 1)
	//     await selectReviews();
	//     console.log('Database seeding completed')
	// } catch (error) {
	//     console.log(error);
	// }
}
